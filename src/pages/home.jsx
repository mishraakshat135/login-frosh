
import Hero from "./hero"
import Events from "./Events"
import About from "./aboutUs"
import Map from "./map"
import Sponsors from "./sponsors"


export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white scroll-smooth">
      <>
        <section id="home">
          <Hero />
        </section>

        <section id="events">
          <Events />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="map">
          <Map />
        </section>

        <section id="sponsors">
          <Sponsors />
        </section>
      </>
    </main>

  )
}
