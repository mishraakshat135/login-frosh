import SponsorBg from "../assets/SponsorBg.webp";
import sponsor1 from "../assets/sponsor1.webp";
import sponsor2 from "../assets/sponsor2.webp";
import sponsor3 from "../assets/sponsor3.webp";
import sponsor4 from "../assets/sponsor4.webp";

export default function Sponsors() {
    const sponsors = [sponsor1, sponsor2, sponsor3, sponsor4];

    return (
        <section id="sponsors" className="relative flex min-h-screen items-center overflow-hidden bg-cover bg-center px-6 py-28 text-white md:px-12" style={{ backgroundImage: `url(${SponsorBg})` }}>      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.49),rgba(0,0,0,0.28),rgba(0,0,0,0.49))]" />
            <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />

            <div className="relative z-10 mx-auto w-full max-w-7xl">
                <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.55em] text-cyan-200/80">
                            Our Sponsors
                        </p>
                        <h2 className="mt-5 mb-20 text-4xl font-black uppercase tracking-[0.12em] md:text-6xl">
                            Powered by the people behind the lights.
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {sponsors.map((sponsor, index) => (
                            <article key={sponsor} className="group rounded-lg border border-white/12 bg-white/10 p-5 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-cyan-200/60 hover:bg-white/14 hover:shadow-[0_0_38px_rgba(34,211,238,0.22)]">
                                <div className="flex h-32 items-center justify-center overflow-hidden rounded-md bg-white p-5">
                                    <img src={sponsor} alt={`Sponsor ${index + 1}`} className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105" />
                                </div>
                                <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-cyan-100/70">
                                    Partner 0{index + 1}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
