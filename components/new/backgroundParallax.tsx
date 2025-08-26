"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface BackgroundParallaxProps {
  src: StaticImageData;
  z: number;
  y: number;
  height: number;
  speed: number;
  variants: Variants;
  custom: number;
}

export default function BackgroundParallax({
  src,
  z,
  y,
  height,
  speed,
  variants,
  custom,
}: BackgroundParallaxProps) {
  const { scrollY } = useScroll();

  // bikin parallax effect
  const yVar = useTransform(scrollY, [0, y], [0, 300 * speed]);

  return (
    <motion.div
      className={`absolute bottom-0 w-full flex justify-center z-[${z}] pointer-events-none`}
      initial="hidden"
      variants={variants}
      animate="visible"
      custom={custom}
      style={{ y: yVar }}
    >
      <Image
        className="w-full"
        src={src}
        alt={`Layer ${z}`}
        width={1440}
        height={height}
      />
    </motion.div>
  );
}
