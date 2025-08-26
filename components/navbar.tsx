import { sections } from "@/data/section";

export default function Navbar() {
  return (
    <nav className="w-screen navbar flex items-center justify-start py-3 gap-4 overflow-x-auto px-4 whitespace-nowrap scrollbar-hide">
      <a href="#hero" className="navbar-link">
        Home
      </a>
      {sections.map((section) => (
        <a key={section.id} href={`#${section.id}`} className="navbar-link">
          {section.title}
        </a>
      ))}
    </nav>
  );
}
