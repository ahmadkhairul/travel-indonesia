"use client";
import ParallaxSection from "./ParallaxSection";
import { useEffect, useState } from "react";

const sections = [
  {
    id: "bali",
    title: "Bali",
    image: "/images/bali.jpg",
    description:
      "The Island of the Gods, famous for its beaches, temples, and vibrant culture.",
  },
  {
    id: "bandung",
    title: "Bandung",
    image: "/images/bandung.jpg",
    description:
      "The Paris of Java, known for its cool climate, art deco architecture, and culinary delights.",
  },
  {
    id: "bogor",
    title: "Bogor",
    image: "/images/bogor.jpg",
    description:
      "The City of Rain, home to the famous Bogor Botanical Gardens and lush landscapes.",
  },
  {
    id: "jogjakarta",
    title: "Jogjakarta",
    image: "/images/jogjakarta.jpg",
    description:
      "The cultural heart of Java, gateway to Borobudur and Prambanan temples.",
  },
  {
    id: "papua",
    title: "Papua",
    image: "/images/papua.jpg",
    description:
      "Untamed wilderness, rich tribal culture, and the breathtaking Raja Ampat islands.",
  },
  {
    id: "sumatera",
    title: "Sumatera",
    image: "/images/sumatera.jpg",
    description:
      "Vast rainforests, volcanic lakes, and the home of the endangered Sumatran tiger.",
  },
  {
    id: "surakarta",
    title: "Surakarta",
    image: "/images/surakarta.jpg",
    description:
      "Also known as Solo, a city steeped in Javanese tradition and royal heritage.",
  },
];

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

  return (
    <div className="w-full min-h-screen bg-background text-foreground font-sans">
      {/* Navigation Bar */}
      <nav className="w-screen navbar flex items-center justify-start py-3 gap-4 sm:hidden overflow-x-auto px-4 whitespace-nowrap scrollbar-hide">
        <a href="#hero" className="navbar-link">
          Home
        </a>
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="navbar-link">
            {section.title}
          </a>
        ))}
      </nav>

      {/* Hero Section with Indonesian flag background and staged animation */}
      <section
        id="hero"
        className="relative min-h-[80vh] sm:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Indonesian flag background with fade from top */}
        <div
          className={`absolute inset-0 z-0 flex flex-col transition-all duration-700 ease-out
            ${
              flagVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-16"
            }`}
        >
          <div className="flex-1 bg-[#d90000]" />
          <div className="flex-1 bg-white" />
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
            history={
              section.title === "Bali"
                ? [
                    "Bali has a rich history dating back to the 9th century.",
                    "It was once a major Hindu kingdom in Indonesia.",
                    "Today, Bali is renowned for its unique culture and traditions.",
                  ]
                : section.title === "Bandung"
                ? [
                    "Bandung was founded in 1810 by the Dutch colonial government.",
                    "It became a center for art deco architecture in the 20th century.",
                    "Bandung is known as the 'Paris of Java'.",
                  ]
                : section.title === "Bogor"
                ? [
                    "Bogor is famous for its botanical gardens, established in 1817.",
                    "It was a retreat for Dutch governors during colonial times.",
                    "Bogor is nicknamed the 'City of Rain'.",
                  ]
                : section.title === "Jogjakarta"
                ? [
                    "Jogjakarta is a center of classical Javanese fine art and culture.",
                    "It was the capital of Indonesia during the independence war.",
                    "Home to the Sultan's Palace and Borobudur temple.",
                  ]
                : section.title === "Papua"
                ? [
                    "Papua is Indonesia's easternmost province, rich in biodiversity.",
                    "It is home to hundreds of indigenous tribes.",
                    "Raja Ampat in Papua is a world-class diving destination.",
                  ]
                : section.title === "Sumatera"
                ? [
                    "Sumatera is the sixth largest island in the world.",
                    "It has a history of powerful kingdoms and sultanates.",
                    "Sumatera is known for its rainforests and wildlife.",
                  ]
                : section.title === "Surakarta"
                ? [
                    "Surakarta, also known as Solo, is a royal city in Central Java.",
                    "It is famous for its traditional Javanese culture and batik.",
                    "The city is home to two royal palaces: Kraton and Mangkunegaran.",
                  ]
                : []
            }
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
