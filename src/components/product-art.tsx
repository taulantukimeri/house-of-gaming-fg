import type { ProductArt as ArtKind } from "@/lib/types";

const stroke = 1.5;

export function ProductArt({
  kind,
  size,
}: {
  kind: ArtKind | "package";
  size?: number;
}) {
  const style = size ? { width: size, height: size } : undefined;

  switch (kind) {
    case "mouse":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="miter"
          strokeLinecap="square"
          style={style}
        >
          <path d="M40 30 Q40 18 60 18 Q80 18 80 30 V82 Q80 100 60 100 Q40 100 40 82 Z" />
          <path d="M60 18 V52" />
          <path d="M40 44 H80" />
          <rect x="56" y="28" width="8" height="14" rx="2" />
        </svg>
      );
    case "keyboard":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="miter"
          strokeLinecap="square"
          style={style}
        >
          <rect x="10" y="40" width="100" height="44" rx="3" />
          {[18, 30, 42, 54, 66, 78, 90].map((x) => (
            <rect key={x} x={x} y="48" width="10" height="10" />
          ))}
          {[18, 30, 42, 54, 66, 78, 90].map((x) => (
            <rect key={`${x}b`} x={x} y="60" width="10" height="10" />
          ))}
          <rect x="30" y="72" width="58" height="8" />
        </svg>
      );
    case "headset":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="miter"
          strokeLinecap="square"
          style={style}
        >
          <path d="M20 64 Q20 22 60 22 Q100 22 100 64" />
          <rect x="14" y="60" width="20" height="34" rx="3" />
          <rect x="86" y="60" width="20" height="34" rx="3" />
          <path d="M86 78 H76 V94 H86" />
        </svg>
      );
    case "chair":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="miter"
          strokeLinecap="square"
          style={style}
        >
          <path d="M30 30 Q30 14 46 14 H74 Q90 14 90 30 V62 Q90 70 82 70 H38 Q30 70 30 62 Z" />
          <path d="M40 70 V94 H80 V70" />
          <path d="M60 94 V104" />
          <path d="M44 104 H76" />
          <path d="M40 36 H30 V52" />
          <path d="M80 36 H90 V52" />
        </svg>
      );
    case "desk":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="miter"
          strokeLinecap="square"
          style={style}
        >
          <rect x="10" y="38" width="100" height="8" />
          <path d="M18 46 V96" />
          <path d="M102 46 V96" />
          <path d="M18 96 H102" />
          <path d="M30 46 V70 H90 V46" />
          <rect x="50" y="22" width="30" height="16" />
          <path d="M60 22 V14" />
          <path d="M50 14 H80" />
        </svg>
      );
    case "controller":
      return (
        <svg
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinejoin="miter"
          strokeLinecap="square"
          style={style}
        >
          <path d="M22 50 Q22 36 38 36 H82 Q98 36 98 50 V72 Q98 92 82 92 Q70 92 64 80 H56 Q50 92 38 92 Q22 92 22 72 Z" />
          <circle cx="40" cy="60" r="6" />
          <circle cx="80" cy="68" r="4" />
          <circle cx="72" cy="56" r="3" />
          <circle cx="88" cy="56" r="3" />
        </svg>
      );
    case "package":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={style}
        >
          <path d="M16.5 9.4 7.5 4.21M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
        </svg>
      );
    default:
      return null;
  }
}
