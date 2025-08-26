"use client";
import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
  title: string;
  description: string;
  image: string;
  isHero?: boolean;
  history?: string[];
}

export default function ParallaxSection({
  title,
  description,
  image,
  isHero = false,
  history = [],
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [scrollDir, setScrollDir] = useState<"down" | "up">("down");
  const lastScrollY = useRef(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showHistoryText, setShowHistoryText] = useState(false);
  const [tooltip, setTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDir(currentScrollY > lastScrollY.current ? "down" : "up");
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting && showHistory) {
          setShowHistory(false);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [showHistory]);

  // Animate history text after overlay slides in
  useEffect(() => {
    if (showHistory) {
      const timer = setTimeout(() => setShowHistoryText(true), 400);
      return () => clearTimeout(timer);
    } else {
      setShowHistoryText(false);
    }
  }, [showHistory]);

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center overflow-hidden min-h-[80vh] sm:min-h-[90vh]`}
    >
      {/* Parallax background image with fade in/out */}
      <div
        className={`absolute inset-0 z-0 will-change-transform transition-opacity duration-1000 ${
          inView ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "brightness(0.7)",
        }}
        aria-hidden="true"
      />
      <div className="parallax-overlay" aria-hidden="true" />
      {/* Text content with direction-aware animation */}
      <div
        className={`relative z-10 text-center text-white px-4 max-w-2xl mx-auto drop-shadow-lg transition-all duration-1000
          ${
            inView
              ? scrollDir === "down"
                ? "opacity-100 translate-y-0"
                : "opacity-100 -translate-y-0"
              : scrollDir === "down"
              ? "opacity-0 translate-y-12"
              : "opacity-0 -translate-y-12"
          }
        `}
      >
        <div className="relative inline-block">
          <h2
            className={`font-extrabold mb-2 drop-shadow-lg cursor-pointer ${
              isHero ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl"
            }`}
            tabIndex={0}
            onClick={() => setShowHistory((v) => !v)}
            onMouseEnter={() => setTooltip(true)}
            onMouseLeave={() => setTooltip(false)}
            onFocus={() => setTooltip(true)}
            onBlur={() => setTooltip(false)}
          >
            {title}
          </h2>
          {/* Tooltip for show history */}
          {!isHero && (
            <div
              className={`absolute left-1/2 -translate-x-1/2 -top-12 bg-black bg-opacity-90 text-base font-medium text-white px-4 py-2 rounded-lg shadow-lg pointer-events-none transition-opacity duration-300 z-50
                ${tooltip ? "opacity-100 animate-fadein" : "opacity-0"}`}
              style={{ whiteSpace: "nowrap" }}
            >
              show history
            </div>
          )}
        </div>
        <p
          className={`drop-shadow-md ${
            isHero ? "text-lg sm:text-2xl font-medium" : "text-lg sm:text-xl"
          }`}
        >
          {description}
        </p>
      </div>
      {/* Animated overlay and city history */}
      {!isHero && (
        <>
          {/* Black overlay slides in from right, now with smoother opacity and blur */}
          <div
            className={`fixed sm:absolute top-0 right-0 h-full w-full bg-black z-20 pointer-events-none transition-all duration-700 ease-in-out
              ${
                showHistory
                  ? "opacity-85 blur-sm shadow-2xl"
                  : "opacity-0 blur-none"
              }`}
            style={{
              transitionProperty: "transform, opacity, filter, box-shadow",
            }}
          />
          {/* City history text fade in from bottom */}
          <div
            className={`fixed sm:absolute p-4 top-1/2 left-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 z-30 text-white text-lg font-medium text-center pointer-events-auto transition-all duration-500
              ${
                showHistory && showHistoryText
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
          >
            {history.map((line, i) => (
              <div key={i} className="mb-2 last:mb-0 animate-fadein">
                {line}
              </div>
            ))}
            {/* Close button at bottom center */}
            <button
              onClick={() => setShowHistory(false)}
              className="mx-auto mt-8 block bg-white/20 hover:bg-white/40 text-white rounded-full px-6 py-2 text-base font-bold shadow-lg focus:outline-none focus:ring-2 focus:ring-white transition"
              aria-label="Close history"
              tabIndex={0}
            >
              Close
            </button>
          </div>
        </>
      )}
    </section>
  );
}
