import { useEffect, useRef, useState } from 'react';
import Intro from "../components/Intro/Intro";
import LogoSplit from "../components/LogoSplits"
import { AnimatePresence, motion } from "framer-motion";
import Events from "./Events"
import About from "./aboutUs"
import Map from "./map"
import Sponsors from "./sponsors"

const user = JSON.parse(localStorage.getItem("user"));
const FRAME_COUNT = 121;
const FRAME_PATH = (i) => `/webp_frames/frame_${String(i).padStart(3, '0')}.webp`;

export default function Hero({ scrollHeight = '400vh' }) {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null)
    const imagesRef = useRef([]);
    const currentFrameRef = useRef(0)
    const [frame, setFrame] = useState(0)

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current
        const ctx = canvas.getContext('2d');

        function drawFrame(index) {
            const img = imagesRef.current[index]
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.naturalWidth / img.naturalHeight;

            let drawWidth, drawHeight, offsetX, offsetY;
            if (imgRatio > canvasRatio) {
                drawHeight = canvas.height;
                drawWidth = drawHeight * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = drawWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(currentFrameRef.current);
        }

        function updateFrameFromScroll() {
            const rect = wrapper.getBoundingClientRect();
            const scrollableHeight = wrapper.offsetHeight - window.innerHeight
            const scrolled = -rect.top;
            const progress = Math.min(Math.max(scrolled / scrollableHeight, 0), 1)


            const frameIndex = Math.min(
                FRAME_COUNT - 1,
                Math.floor(progress * (FRAME_COUNT - 1))
            );

            currentFrameRef.current = frameIndex
            setFrame(frameIndex)
            drawFrame(frameIndex)
        }

        let ticking = false;
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateFrameFromScroll();
                    ticking = false;
                })
                ticking = true;
            }
        }

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = FRAME_PATH(i);
            if (i === 1) img.onload = () => drawFrame(0);
            imagesRef.current[i - 1] = img;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', onScroll);
        }
    }, [])

    return (
        <>
            <Intro />
            <LogoSplit />
            <section ref={wrapperRef} className="relative" style={{ height: scrollHeight }}>
                <div className="fixed top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                    <AnimatePresence>
                        {frame >= 90 && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 500,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: -180,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 500,
                                }}
                                transition={{
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                                <div className="relative">

                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1.2 }}
                                        className="absolute inset-0 -z-10 m-auto w-125 h-125 rounded-full bg-cyan-400/20 blur-[160px]"
                                    />

                                    <motion.div
                                        animate={{
                                            boxShadow: [
                                                "0 0 10px rgba(34,211,238,.3)",
                                                "0 0 35px rgba(34,211,238,.8)",
                                                "0 0 10px rgba(34,211,238,.3)",
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="flex flex-col text-center rounded-3xl border  border-cyan-300/60  bg-white/5 backdrop-blur-xl px-14 py-10" >

                                        <h1 className="text-6xl md:text-7xl font-bold tracking-[12px] text-white">
                                            WELCOME
                                        </h1>

                                        <h2 className="mt-5 text-4xl md:text-5xl font-light tracking-[8px] text-cyan-300">
                                            {user?.username?.toUpperCase()}
                                        </h2>
                                    </motion.div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <canvas ref={canvasRef} className="h-full w-full" />
                </div>
            </section>
        </>
    )
}
