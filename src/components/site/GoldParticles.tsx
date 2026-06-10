import { useMemo } from "react";

export function GoldParticles({ count = 28 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 14,
        duration: 14 + Math.random() * 16,
        opacity: 0.25 + Math.random() * 0.5,
        key: i,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.key}
          style={{
            position: "absolute",
            bottom: "-10px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, #F4D27A 0%, #D4AF37 60%, transparent 100%)",
            boxShadow: "0 0 8px rgba(212, 175, 55, 0.7)",
            opacity: p.opacity,
            animation: `gold-float ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}