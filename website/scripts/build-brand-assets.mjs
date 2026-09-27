/**
 * Builds the Prosperous Logic logo SVGs from code so every variant shares one geometry.
 *
 * Outputs:
 *   public/brand/*.svg                         standalone logo files (text converted to paths)
 *   src/components/brand/mark.generated.ts     the same mark geometry, for the <Mark> component
 *
 * Run from website/:  npm run brand
 * Re-run only when the logo itself changes. Outputs are committed.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public", "brand");
const GENERATED_TS = join(ROOT, "src", "components", "brand", "mark.generated.ts");

// ---------------------------------------------------------------------------
// Brand palette (must match src/app/globals.css)
// ---------------------------------------------------------------------------
const COLOR = {
  ink: "#16181A",
  brand: "#0F8A8A", // Signal Teal: logo facet only
  onInk: "#FFFFFF",
};

// ---------------------------------------------------------------------------
// Fonts (used only to convert logo lettering to outlines)
// ---------------------------------------------------------------------------
const loadFont = (pkg, file) =>
  opentype.parse(readFileSync(require.resolve(`@fontsource/${pkg}/files/${file}`)).buffer);

const FONT = {
  display: loadFont("inter-tight", "inter-tight-latin-800-normal.woff"),
  wordmark: loadFont("inter-tight", "inter-tight-latin-700-normal.woff"),
};

/** Lays out a line of text as a single SVG path, with optional tracking (em). */
function textPath(font, text, { x = 0, y = 0, size, tracking = 0 }) {
  // Plain char -> glyph mapping. Logo text needs no ligatures, and full
  // shaping trips on GSUB lookups opentype.js doesn't support.
  const glyphs = [...text].map((ch) => font.charToGlyph(ch));
  const scale = size / font.unitsPerEm;
  const path = new opentype.Path();
  let cursor = x;
  glyphs.forEach((glyph, i) => {
    path.extend(glyph.getPath(cursor, y, size));
    cursor += glyph.advanceWidth * scale + tracking * size;
    const next = glyphs[i + 1];
    if (next) cursor += font.getKerningValue(glyph, next) * scale;
  });
  const width = cursor - x - (glyphs.length ? tracking * size : 0);
  return { d: path.toPathData(2), bbox: path.getBoundingBox(), width };
}

// ---------------------------------------------------------------------------
// Mark geometry: pointy-top hexagon outline, with the top-right edge replaced
// by a thicker "faceted plane" in Signal Teal.
// ---------------------------------------------------------------------------
const MARK_W = 100;
const MARK_H = 110;
const CX = 50;
const CY = 55;
const RADIUS = 46; // centre line of the outline stroke
const STROKE = 7;
const FACET = 13; // facet thickness, measured inward from the outline's outer edge

// Offsetting a hexagon's edges by d moves its vertices by d / cos(30°).
const COS30 = Math.cos(Math.PI / 6);
const vertex = (deg, r = RADIUS) => {
  const rad = (deg * Math.PI) / 180;
  return [+(CX + r * Math.cos(rad)).toFixed(2), +(CY + r * Math.sin(rad)).toFixed(2)];
};
const ANGLES = [-90, -30, 30, 90, 150, 210]; // clockwise from the top vertex
const HEX = ANGLES.map((a) => vertex(a));
const OUTER_R = RADIUS + STROKE / 2 / COS30;
const INNER_R = OUTER_R - FACET / COS30;
// Filled quadrilateral covering the top -> upper-right edge.
const FACET_POLY = [vertex(-90, OUTER_R), vertex(-30, OUTER_R), vertex(-30, INNER_R), vertex(-90, INNER_R)];
const pts = (list) => list.map(([x, y]) => `${x},${y}`).join(" ");

// "PL" centred optically inside the hexagon (nudged down slightly under the facet).
const GLYPH = (() => {
  const size = 40;
  const raw = textPath(FONT.display, "PL", { size, tracking: -0.02 });
  const b = raw.bbox;
  const dx = CX - (b.x1 + b.x2) / 2;
  const dy = CY + 1 - (b.y1 + b.y2) / 2;
  return textPath(FONT.display, "PL", { x: dx, y: dy, size, tracking: -0.02 }).d;
})();

/** Mark as SVG markup, positioned at (x, y) and scaled to `height`. */
function markGroup({ x = 0, y = 0, height = MARK_H, stroke, letters }) {
  const s = height / MARK_H;
  return `<g transform="translate(${x} ${y}) scale(${+s.toFixed(4)})">
    <polygon points="${pts(HEX)}" fill="none" stroke="${stroke}" stroke-width="${STROKE}" stroke-linejoin="miter"/>
    <polygon points="${pts(FACET_POLY)}" fill="${COLOR.brand}"/>
    <path d="${GLYPH}" fill="${letters}"/>
  </g>`;
}

const svg = (viewBox, title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-labelledby="t">
  <title id="t">${title}</title>
  ${body}
</svg>
`;

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------
const PAD = 6; // room for the stroke's miter points
const NAME = "Prosperous Logic Solutions";

function buildMark({ stroke, letters }) {
  return svg(`${-PAD} ${-PAD} ${MARK_W + PAD * 2} ${MARK_H + PAD * 2}`, NAME, markGroup({ stroke, letters }));
}

function buildTile() {
  const size = 512;
  const h = 300;
  const w = (h / MARK_H) * MARK_W;
  return svg(
    `0 0 ${size} ${size}`,
    NAME,
    `<rect width="${size}" height="${size}" fill="${COLOR.ink}"/>
  ${markGroup({ x: (size - w) / 2, y: (size - h) / 2, height: h, stroke: COLOR.onInk, letters: COLOR.onInk })}`,
  );
}

/** Mark + two-line "Prosperous / Logic" wordmark, as on the brand board. */
function buildLockup({ primary }) {
  const markH = 220;
  const markW = (markH / MARK_H) * MARK_W;
  const textX = markW + 44;
  const size = 88;
  const lead = 84;
  const first = 100;

  const lines = ["Prosperous", "Logic"].map((word, i) =>
    textPath(FONT.wordmark, word, { x: textX, y: first + i * lead, size, tracking: -0.02 }),
  );
  const right = Math.max(...lines.map((l) => l.bbox.x2));

  return svg(
    `${-PAD} ${-PAD} ${Math.ceil(right) + PAD * 2} ${markH + PAD * 2}`,
    NAME,
    `${markGroup({ height: markH, stroke: primary, letters: primary })}
  <path d="${lines.map((l) => l.d).join(" ")}" fill="${primary}"/>`,
  );
}

// ---------------------------------------------------------------------------
// Write
// ---------------------------------------------------------------------------
mkdirSync(OUT_DIR, { recursive: true });

const files = {
  "pl-mark.svg": buildMark({ stroke: COLOR.ink, letters: COLOR.ink }),
  "pl-mark-reverse.svg": buildMark({ stroke: COLOR.onInk, letters: COLOR.onInk }),
  "pl-mark-tile.svg": buildTile(),
  "pl-logo.svg": buildLockup({ primary: COLOR.ink }),
  "pl-logo-reverse.svg": buildLockup({ primary: COLOR.onInk }),
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT_DIR, name), content);
  console.log(`wrote public/brand/${name}`);
}

writeFileSync(
  GENERATED_TS,
  `// Generated by scripts/build-brand-assets.mjs. Do not edit by hand.
export const MARK = {
  viewBox: "${-PAD} ${-PAD} ${MARK_W + PAD * 2} ${MARK_H + PAD * 2}",
  strokeWidth: ${STROKE},
  hexagon: "${pts(HEX)}",
  facet: "${pts(FACET_POLY)}",
  letters: "${GLYPH}",
} as const;
`,
);
console.log("wrote src/components/brand/mark.generated.ts");
