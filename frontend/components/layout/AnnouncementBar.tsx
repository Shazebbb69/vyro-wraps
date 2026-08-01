"use client";

import { useEffect, useState } from "react";

const messages = [
  "🔥 LIMITED STOCK AVAILABLE",
  "🛡️ PATENTED DESIGN",
  "🚚 PAN INDIA SHIPPING",
  "⭐ PREMIUM QUALITY LIFTING STRAPS",
];

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % messages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 flex h-10 w-full items-center justify-center overflow-hidden bg-[#D4A017] text-black shadow-md">
      <div
        key={current}
        className="animate-[slideFade_0.45s_ease] text-center text-sm font-bold uppercase tracking-[0.12em] md:text-base"
      >
        {messages[current]}
      </div>

      <style jsx>{`
        @keyframes slideFade {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}