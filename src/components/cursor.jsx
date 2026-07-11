import { useEffect, useRef } from "react";
import "../index.css"
import { gsap } from "../lib/gsap"

export default function Cursor() {
  const cursor = useRef(null)
  const trail = useRef([])
  const trail_count = 20
  const FOLLOW_SPEED = 0.18;


  useEffect(() => {
    const mouse = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }

    const pos = {
      x: mouse.x,
      y: mouse.y,
    }


    const blobs = Array.from({ length: trail_count }, () => ({
      x: mouse.x,
      y: mouse.y,
    }))

    let velocity = 0;

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const section = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-cursor]")

      if (!section)
        return
      const color = section.dataset.cursor

      if (color === currentColor)
        return;

      currentColor = color

      gsap.to(cursor.current, {
        backgroundColor: color,
        duration: 0.35
      })

      gsap.to(cursor.current, {
        boxShadow: `
      0 0 20px ${color},
      0 0 50px ${color}
    `,
        duration: 0.35,
      })

      trail.current.forEach((blob) => {
        blob.style.background = `radial-gradient(circle, ${color}, transparent)`
      })
    }

    window.addEventListener("mousemove", move);
    let currentColor = "#22d3ee"

    function animate() {
      const dx = mouse.x - pos.x
      const dy = mouse.y - pos.y

      pos.x += dx * 0.18
      pos.y += dy * 0.18

      velocity = Math.sqrt(dx * dx + dy * dy)

      cursor.current.style.transform = `
        translate(${pos.x}px,${pos.y}px)
        translate(-50%,-50%)`


      blobs[0].x += (mouse.x - blobs[0].x) * FOLLOW_SPEED
      blobs[0].y += (mouse.y - blobs[0].y) * FOLLOW_SPEED

      for (let i = 1; i < blobs.length; i++) {
        blobs[i].x += (blobs[i - 1].x - blobs[i].x) * FOLLOW_SPEED
        blobs[i].y += (blobs[i - 1].y - blobs[i].y) * FOLLOW_SPEED
      }


      trail.current.forEach((blob, i) => {
        blob.style.transform = `
          translate(${blobs[i].x}px,${blobs[i].y}px)
          translate(-50%,-50%)
          scale(${Math.max(0.25, 1 - i * 0.025)})`

        blob.style.opacity = Math.max(0.05, 1 - i * 0.03)

      })


      requestAnimationFrame(animate)
    }

    const handleClick = (e) => {
      const ripple = document.createElement("div")

      ripple.className = "cursor-ripple"

      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`

      ripple.style.border = `2px solid ${currentColor}`

      ripple.style.boxShadow = `
      0 0 12px ${currentColor},
      0 0 40px ${currentColor}`

      document.body.appendChild(ripple)

      ripple.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: 0.9,
          },
          {
            transform: "translate(-50%, -50%) scale(6)",
            opacity: 0,
          },
        ],
        {
          duration: 700,
          easing: "cubic-bezier(.22,1,.36,1)",
        }
      )

      setTimeout(() => ripple.remove(), 700)
    }

    window.addEventListener("click", handleClick)

    animate();

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("click", handleClick)
    }


  }, [])

  return (
    <>
      {Array.from({ length: trail_count }).map((_, i) => (
        <div key={i} ref={(el) => (trail.current[i] = el)} className="cursor-trail" />
      ))}

      <div ref={cursor} className="cursor-main" />
    </>
  )
}