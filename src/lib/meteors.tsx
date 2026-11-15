import * as React from "react";
import { cn } from "@/lib/utils";

interface MeteorsProps {
  className?: string;
  /** Number of meteors */
  number?: number;
  /** Skip the blurred galaxy glow band (biggest GPU cost) */
  noGlow?: boolean;
}

interface MeteorConfig {
  left: string;
  top: string;
  delay: string;
  duration: string;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMeteors(count: number): MeteorConfig[] {
  const rand = mulberry32(0x5eed);
  return Array.from({ length: count }, () => {
    const isTopStart = rand() < 0.5;
    let left = "0%";
    let top = "0%";

    if (isTopStart) {
      left = `${(rand() * 100).toFixed(2)}%`;
      top = `${(rand() * -10 - 20).toFixed(2)}px`;
    } else {
      left = `${(rand() * -10 - 40).toFixed(2)}px`;
      top = `${(rand() * 80).toFixed(2)}%`;
    }

    const delay = `${(rand() * 8).toFixed(2)}s`;
    const duration = `${(rand() * (18 - 10) + 10).toFixed(2)}s`;

    return { left, top, delay, duration };
  });
}

export function Meteors({ className, number = 30, noGlow = false }: MeteorsProps) {
  // Build once per count — previously rebuilt on every render (scroll-driven
  // re-renders re-created 30 style objects + restarted CSS animations).
  const meteors = React.useMemo(() => buildMeteors(number), [number]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {/* Subtle galaxy/nebula glow band — skipped on low-power (blur 120px + blend is the top GPU cost here) */}
      {!noGlow && (
        <div
          className="absolute inset-0 z-[-1] pointer-events-none mix-blend-screen"
          style={{
            background: "linear-gradient(135deg, transparent 15%, rgba(29, 78, 216, 0.12) 35%, rgba(6, 182, 212, 0.08) 50%, rgba(13, 148, 136, 0.04) 65%, transparent 85%)",
            filter: "blur(120px)",
            opacity: 0.3,
          }}
        />
      )}
      {meteors.map((meteor, idx) => (
        <span
          key={idx}
          className="animate-meteor absolute h-0.5 w-0.5 rounded-[9999px] bg-foreground shadow-[0_0_0_1px_#ffffff10] before:absolute before:right-1/2 before:top-1/2 before:h-px before:w-12.5 before:-translate-y-1/2 before:bg-linear-to-l before:from-foreground before:to-transparent before:content-['']"
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
            willChange: "transform, opacity",
            contain: "layout style",
          }}
        />
      ))}
    </div>
  );
}
