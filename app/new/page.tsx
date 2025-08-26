"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { sections } from "@/data/section";
import ParallaxSection from "@/components/new/parallax";

// Assets
import background from "@/svgs/background.svg";
import sun from "@/svgs/sun.svg";
import cloud from "@/svgs/cloud.svg";
import hill from "@/svgs/hill.svg";
import hill2 from "@/svgs/hill-2.svg";
import mountain from "@/svgs/mountain.svg";
import hillForeground from "@/svgs/hill-foreground.svg";
import bird from "@/svgs/bird.svg";
import BackToTopButton from "@/components/new/backToTop";

export default function Home() {
  const { scrollY } = useScroll();

  // Global transforms
  const sunY = useTransform(scrollY, [0, 300], [0, 499]);
  const skyOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Satu base transform → nanti dikali speed masing-masing layer
  const baseY = useTransform(scrollY, [0, 300], [0, 300]);

  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: false, margin: "-100px" });

  const yVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" as const, delay: i * 0.3 },
    }),
  };

  const xVariant = {
    hidden: { opacity: 0, x: 100 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" as const, delay: i * 0.3 },
    }),
  };

  const layers = [
    { src: hill, z: 10, height: 400, speed: 0.3 },
    { src: mountain, z: 20, height: 500, speed: 0.6 },
    { src: hill2, z: 30, height: 450, speed: 0.15 },
    { src: hillForeground, z: 40, height: 500, speed: 0 }, // foreground fix
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans">
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[125vh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Sky */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: skyOpacity }}
        >
          <Image src={background} alt="Sky" fill className="object-cover" />
        </motion.div>

        {/* Sun */}
        <motion.div
          id="sun"
          custom={5}
          className="absolute top-20 right-10"
          initial="hidden"
          animate="visible"
          variants={yVariant}
          style={{ y: sunY }}
        >
          <Image
            src={sun}
            alt="Sun"
            width={120}
            height={120}
            className="object-contain"
          />
        </motion.div>

        {/* Clouds */}
        {[
          { position: "top-60 left-20" },
          { position: "top-32 right-30" },
          { position: "top-24 left-10" },
          { position: "top-36 right-0" },
        ].map((c, i) => (
          <motion.div
            key={i}
            className={`absolute z-10 ${c.position}`}
            custom={i}
            variants={yVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Image src={cloud} alt="Cloud" width={150} height={110} />
          </motion.div>
        ))}

        {/* Birds */}
        {[
          { position: "top-60 right-20", width: 80, height: 50 },
          { position: "top-120 left-20", width: 200, height: 160 },
          { position: "top-30", width: 120, height: 80 },
          { position: "top-40 right-40", width: 100, height: 70 },
        ].map((c, i) => (
          <motion.div
            key={i}
            className={`absolute z-60 ${c.position}`}
            custom={i}
            variants={xVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Image src={bird} alt="Bird" width={c.width} height={c.height} />
          </motion.div>
        ))}

        {/* Hills & Mountains via array */}
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            className={`absolute bottom-0 w-full flex justify-center z-${layer.z} pointer-events-none`}
            initial="hidden"
            variants={yVariant}
            animate="visible"
            custom={i * 2}
            style={{
              y: useTransform(baseY, (val) => val * layer.speed),
            }}
          >
            <Image
              className="w-full"
              src={layer.src}
              alt={`Layer ${i}`}
              width={1440}
              height={layer.height}
            />
          </motion.div>
        ))}

        {/* Text */}
        <motion.h1
          className="relative z-50 text-center px-4 max-w-2xl mx-auto text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight text-white drop-shadow-lg"
          variants={yVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={6}
        >
          Discover Indonesia
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="relative z-50 text-center px-4 max-w-2xl mx-auto text-lg sm:text-2xl font-medium mb-8 text-white drop-shadow"
          variants={yVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={8}
        >
          A Parallax Journey Through The Archipelago
        </motion.p>

        {/* Button */}
        <motion.div
          className="relative z-50"
          variants={yVariant}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={10}
        >
          <motion.button
            className="mt-4 px-8 mb-14 py-3 rounded-full bg-blue-400 text-white font-bold text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-accent"
            animate={{
              y: [0, -8, 0], // naik → balik
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Scroll Down ↓
          </motion.button>
        </motion.div>
      </section>

      {sections.map((section) => (
        <ParallaxSection
          id={section.id}
          key={section.id}
          title={section.title}
          description={section.description}
          image={section.image}
          history={section.history}
        />
      ))}

      <BackToTopButton />

      {/* Footer */}
      <footer className="fixed bottom-0 w-screen bg-background py-4 px-2 text-center text-[10px] sm:text-xs text-foreground/60 z-50">
        <p className="line-clamp-2">
          Ahmad Khairul Anwar &copy; 2025 Discover Indonesia – A Parallax
          Journey Through The Archipelago
        </p>
      </footer>
    </div>
  );
}
