import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center">
      {/* Tooltip */}
      <span
        onClick={scrollToTop}
        className="mb-2 px-3 py-1 rounded-full bg-blue-900 text-white text-xs transform transition-all duration-300
                   hover:scale-110 hover:shadow-xl
                   active:scale-105 cursor-pointer font-medium shadow-lg opacity-80 animate-fade-in"
      >
        Back to Top
      </span>
    </div>
  );
}
