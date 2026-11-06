"use client";

import { useEffect, useState } from "react";

export default function FallingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate 12 persistent floating petal particles
    const items = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: Math.random() * 95,
      size: Math.random() * 8 + 6,
      delay: Math.random() * 8,
      duration: Math.random() * 7 + 10,
    }));
    setPetals(items);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-40px] animate-petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size * 1.4}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        >
          {/* Petal Shape with soft gold/rose hue */}
          <div
            className="w-full h-full rounded-[50%_0_50%_50%] opacity-40 shadow-sm"
            style={{
              background: "linear-gradient(135deg, rgba(254, 243, 199, 0.7) 0%, rgba(244, 212, 172, 0.5) 50%, rgba(190, 130, 145, 0.3) 100%)",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
