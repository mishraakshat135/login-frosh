import { motion } from "framer-motion";
import AboutBg from "../assets/AboutBg.webp";
import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.webp";

export default function About() {
  return (
    <section id="about" className="relative flex min-h-screen items-center bg-cover bg-center px-6 py-28 text-white md:px-12" style={{ backgroundImage: `url(${AboutBg})` }}>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.49),rgba(0,0,0,0.28),rgba(0,0,0,0.49))]" />
      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <h2 className="mt-5 text-4xl font-black uppercase tracking-[0.12em] md:text-6xl">
            Our Story
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/66 md:text-base">
            Frosh is the official Admissions Cell of Thapar Institute dedicated to making the first-year experience unforgettable. We host events, guide freshers, and foster a welcoming campus environment.
          </p>
        </div>

        <div className="relative min-h-140 overflow-visible">
          <motion.figure
            whileHover={{ y: -14, rotate: -2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="absolute left-0 top-30 w-[64%] overflow-hidden rounded-lg border border-amber-200/45 bg-black/35 p-3 shadow-[0_0_55px_rgba(251,191,36,0.18),0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <img src={about1} className="h-50 w-full rounded-md object-cover" />
          </motion.figure>

          <motion.figure
            whileHover={{ y: -14, rotate: 2, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="absolute bottom-24 right-0 w-[58%] overflow-hidden rounded-lg border border-cyan-200/45 bg-black/35 p-3 shadow-[0_0_55px_rgba(34,211,238,0.18),0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
          >
            <img src={about2}  className="h-50 w-full rounded-md object-cover" />
          </motion.figure>

        </div>
      </div>
    </section>
  );
}
