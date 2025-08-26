"use client";
import ParallaxSection from "@/components/old/parallax";
import { useEffect, useState } from "react";
import { sections } from "@/data/section";
import Navbar from "@/components/navbar";

export default function Home() {
  // Fade-in/slide-in animation on scroll
  useEffect(() => {
    const sections = document.querySelectorAll(".fade-in-section");
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach((section) => {
      observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  // Smooth scroll to first section with transition
  const handleStartExploring = () => {
    const firstSection = document.getElementById(sections[0].id);
    if (firstSection) {
      firstSection.scrollIntoView({ behavior: "smooth" });
      firstSection.classList.add(
        "ring-4",
        "ring-accent",
        "transition-all",
        "duration-700"
      );
      setTimeout(() => {
        firstSection.classList.remove(
          "ring-4",
          "ring-accent",
          "transition-all",
          "duration-700"
        );
      }, 900);
    }
  };

  // Hero section animation states
  const [flagVisible, setFlagVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    // Animate flag, then text, then button
    setTimeout(() => setFlagVisible(true), 200);
    setTimeout(() => setTextVisible(true), 900);
    setTimeout(() => setButtonVisible(true), 1500);
  }, []);

  useEffect(() => {
    const sun = document.getElementById("sun");
    const sky = document.getElementById("sky");

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight;

      const progress = Math.min(scrollY / maxScroll, 1);

      // Move sun down and fade it out
      if (sun) {
        sun.style.transform = `translate(-50%, ${progress * 1000}px)`;
        sun.style.opacity = `${1 - progress}`;

        // Change sun color from yellow to reddish
        const sunColor = `rgb(${250 - progress * 100}, ${
          204 - progress * 150
        }, ${21 + progress * 100})`; // yellow → orange-red
        sun.style.backgroundColor = sunColor;
      }

      // Sky gradient darkens (optional, via filter)
      if (sky) {
        sky.style.filter = `brightness(${1 - progress * 0.4})`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans">
      <Navbar />

      {/* Hero Section with Indonesian flag background and staged animation */}
      <section
        id="hero"
        className="relative min-h-[80vh] sm:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Indonesian flag background with fade from top */}
        {/* Background container: sky, sun, mountain */}
        <div
          className={`absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-sky-300 to-blue-900 transition-all duration-700  ${
            flagVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-16"
          }`}
          id="sky"
        >
          {/* Sun */}
          <div
            id="sun"
            className="absolute left-1/2 top-[20%] w-32 h-32 rounded-full shadow-xl transition-transform duration-300 ease-out -translate-x-1/2"
            style={{ backgroundColor: "#facc15" }} // Tailwind yellow-400
          ></div>

          {/* Mountain layer (foreground) */}
          <div className="absolute bottom-0 w-full h-1/2 z-10 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <polygon
                points="0,100 20,60 40,80 60,50 80,75 100,60 100,100"
                fill="#374151"
              />{" "}
              {/* Tailwind gray-700 */}
            </svg>
          </div>

          {/* Mountain layer (background) */}
          <div className="absolute bottom-0 w-full h-1/2 z-0 pointer-events-none">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="w-full h-full opacity-60"
            >
              <polygon
                points="0,100 30,70 50,80 70,60 100,90 100,100"
                fill="#1f2937"
              />{" "}
              {/* Tailwind gray-900 */}
            </svg>
          </div>
        </div>

        {/* Text fade in */}
        <div
          className={`relative z-10 text-center px-4 max-w-2xl mx-auto drop-shadow-lg transition-all duration-700
            ${
              textVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 tracking-tight text-white drop-shadow-lg">
            Discover Indonesia
          </h1>
          <p className="text-lg sm:text-2xl font-medium mb-8 text-white drop-shadow">
            A Parallax Journey Through The Archipelago
          </p>
        </div>
        {/* Button fade in from bottom, now outside text container */}
        <button
          onClick={handleStartExploring}
          className={`mt-4 px-8 mb-14 py-3 rounded-full bg-[#d90000] text-white font-bold text-lg shadow-lg hover:bg-[#b30000] transition-all duration-700 focus:outline-none focus:ring-4 focus:ring-accent relative z-10
            ${
              buttonVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
        >
          Start Exploring
        </button>
      </section>

      {/* Parallax Sections */}
      {sections.map((section, idx) => (
        <section
          id={section.id}
          key={section.title}
          className={`fade-in-section opacity-0 translate-y-8 transition-all duration-1000 will-change-transform`}
          style={{
            // Simple vertical parallax effect
            transform: `translateY(${idx * 20}px)`,
          }}
        >
          <ParallaxSection
            title={section.title}
            description={section.description}
            image={section.image}
            history={section.history}
          />
        </section>
      ))}

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
