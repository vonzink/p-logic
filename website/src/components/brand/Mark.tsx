import { MARK } from "./mark.generated";

type MarkProps = {
  /** "light" = graphite on bone/white. "reverse" = white on graphite. The teal facet never changes. */
  tone?: "light" | "reverse";
  className?: string;
  /** Accessible name. Omit when the mark sits next to visible company text. */
  title?: string;
};

/** The Prosperous Logic hexagon mark, drawn inline so it stays crisp at any size. */
export function Mark({ tone = "light", className, title }: MarkProps) {
  const color = tone === "light" ? "var(--color-ink)" : "var(--color-on-ink)";
  return (
    <svg
      viewBox={MARK.viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <polygon
        points={MARK.hexagon}
        fill="none"
        stroke={color}
        strokeWidth={MARK.strokeWidth}
        strokeLinejoin="miter"
      />
      <polygon points={MARK.facet} fill="var(--color-brand)" />
      <path d={MARK.letters} fill={color} />
    </svg>
  );
}
