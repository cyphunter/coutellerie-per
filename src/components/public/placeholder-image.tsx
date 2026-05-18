/**
 * Placeholder visuel pour les images de couteaux en attendant les vraies
 * photos du client. Génère un dégradé subtil + silhouette stylisée d'un
 * couteau en SVG inline. Aucun dépendance image, 0 KB réseau.
 *
 * Le `seed` change le dégradé pour éviter que toutes les vignettes soient
 * identiques.
 */
import { cn } from "@/lib/utils";

type PlaceholderImageProps = {
  seed: string;
  alt: string;
  className?: string;
  variant?: "knife" | "atelier";
};

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const PALETTES = [
  ["#2a1f17", "#5a3a1f", "#b8722f"],
  ["#1a1410", "#3a2a1a", "#d99c5b"],
  ["#2a1f17", "#4a3520", "#a86329"],
  ["#1a1410", "#2c2218", "#bf7a30"],
  ["#241813", "#4a311b", "#c98841"],
  ["#1f1611", "#3d2a18", "#b06820"],
] as const;

export function PlaceholderImage({
  seed,
  alt,
  className,
  variant = "knife",
}: PlaceholderImageProps) {
  const palette = PALETTES[hash(seed) % PALETTES.length]!;
  const angle = (hash(seed) % 90) - 45;

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "relative overflow-hidden bg-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 600 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette[0]} />
            <stop offset="55%" stopColor={palette[1]} />
            <stop offset="100%" stopColor={palette[2]} />
          </linearGradient>
          <radialGradient id={`vignette-${seed}`} cx="50%" cy="50%" r="70%">
            <stop offset="60%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </radialGradient>
        </defs>
        <rect width="600" height="400" fill={`url(#g-${seed})`} />
        <g transform={`rotate(${angle} 300 200)`} opacity="0.92">
          {variant === "knife" ? (
            <>
              {/* Lame */}
              <path
                d="M 90 200 L 360 188 L 380 200 L 360 212 Z"
                fill="rgba(245,239,230,0.35)"
                stroke="rgba(245,239,230,0.6)"
                strokeWidth="0.5"
              />
              {/* Soie */}
              <rect x="360" y="196" width="40" height="8" fill="rgba(245,239,230,0.25)" />
              {/* Mitre */}
              <rect x="395" y="190" width="10" height="20" fill={palette[2]} opacity="0.85" />
              {/* Manche */}
              <path
                d="M 405 190 L 510 188 L 515 200 L 510 212 L 405 210 Z"
                fill={palette[1]}
                stroke={palette[0]}
                strokeWidth="0.5"
              />
              {/* Pommeau */}
              <circle cx="510" cy="200" r="6" fill={palette[2]} opacity="0.9" />
            </>
          ) : (
            <>
              {/* Enclume + marteau stylisé */}
              <rect x="200" y="240" width="200" height="40" fill="rgba(0,0,0,0.5)" />
              <rect x="180" y="280" width="240" height="20" fill="rgba(0,0,0,0.7)" />
              <rect x="280" y="120" width="40" height="120" fill={palette[2]} opacity="0.85" />
              <rect x="240" y="100" width="120" height="40" fill={palette[2]} opacity="0.85" />
            </>
          )}
        </g>
        <rect width="600" height="400" fill={`url(#vignette-${seed})`} />
      </svg>
    </div>
  );
}
