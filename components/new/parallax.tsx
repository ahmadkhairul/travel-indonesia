"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ParallaxSectionProps {
  id: string;
  title: string;
  description: string;
  image: string;
  history?: string[];
}

export default function ParallaxSection({
  id,
  title,
  description,
  image,
  history = [],
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [showHistory, setShowHistory] = useState(false);

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center min-h-[100vh] bg-[#2A2A33] px-4"
      id={id}
    >
      {/* Parallax image container */}
      <div className="relative w-full max-w-5xl h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 1.5 }}
            viewport={{ once: false }}
            className="w-full h-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Overlay filter */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

        {/* Text content */}
        <div
          className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-6 cursor-pointer"
          onClick={() => setShowHistory(true)}
        >
          <motion.h2
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            viewport={{ once: false }}
            className="font-extrabold drop-shadow-lg text-3xl sm:text-5xl"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            viewport={{ once: false }}
            className="mt-3 drop-shadow-md text-lg sm:text-xl"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* History overlay */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={
            showHistory ? { opacity: 1, x: 0 } : { opacity: 0, x: "100%" }
          }
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={showHistory ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="max-w-xl text-center text-white"
          >
            {history.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.2 }}
                className="mb-3 text-lg"
              >
                {line}
              </motion.div>
            ))}
            <button
              onClick={() => setShowHistory(false)}
              className="mt-8 bg-white/20 hover:bg-white/40 px-6 py-2 rounded-full text-white font-semibold transition cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
