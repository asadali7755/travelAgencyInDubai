import type { Emirate } from "@/lib/data/attractions";

/**
 * Simplified emirate outlines for the clickable map.
 *
 * HONEST LABEL: this is a schematic, not a survey. The rings below are
 * hand-simplified from the real coastline and the real internal borders, and
 * they are accurate enough to recognise the country and to know which shape to
 * click. They are not accurate enough to settle a boundary question, and the
 * map caption says so on the page.
 *
 * Stored as [longitude, latitude] pairs rather than pre-baked SVG path strings
 * so the geography stays readable and correctable. `project()` turns them into
 * the drawing coordinates.
 *
 * Simplifications worth knowing about:
 *  - Oman's Musandam peninsula north of Ras Al Khaimah and its Madha enclave
 *    are not drawn; neither is the Omani border in detail.
 *  - Sharjah's three east-coast exclaves are drawn; Ajman's two inland ones
 *    (Masfout and Manama) are not.
 *  - Dubai's Hatta exclave is drawn separately because visitors go there.
 */

/**
 * Equirectangular projection. The x scale is the y scale times cos(25°N), which
 * is what stops the country looking stretched sideways.
 */
const LON_ORIGIN = 51.3;
const LAT_ORIGIN = 26.3;
const Y_SCALE = 165;
const X_SCALE = Y_SCALE * Math.cos((25 * Math.PI) / 180);

/**
 * Wider than the country needs. The extra 130 units on the right are label
 * gutter: Ajman is 260 km2 and Umm Al Quwain 777, and at true scale their names
 * will not fit inside them at any font size worth reading. Those four get
 * labels in a column with leader lines instead.
 */
export const VIEW_BOX = "0 0 930 640";

export type Ring = [number, number][];

export const project = ([lon, lat]: [number, number]): [number, number] => [
  Math.round((lon - LON_ORIGIN) * X_SCALE * 10) / 10,
  Math.round((LAT_ORIGIN - lat) * Y_SCALE * 10) / 10,
];

export const toPath = (rings: Ring[]): string =>
  rings
    .map(
      (ring) =>
        ring
          .map((point, i) => `${i === 0 ? "M" : "L"}${project(point).join(",")}`)
          .join(" ") + " Z",
    )
    .join(" ");

/**
 * One entry per emirate. The first ring is the main territory; any further
 * rings are exclaves. `labelAt` is a lon/lat point chosen so the name sits
 * inside the shape rather than on a border.
 */
/**
 * Where an emirate's name goes.
 *
 * `inside` puts it at a lon/lat point within the shape. `leader` puts it at a
 * fixed drawing position in the right-hand gutter with a line back to the
 * shape, which is the only way the northern cluster is legible at true scale.
 */
export type LabelPlacement =
  | { mode: "inside"; at: [number, number] }
  | { mode: "leader"; from: [number, number]; to: [number, number] };

export const emirateShapes: {
  id: Emirate;
  name: string;
  short: string;
  rings: Ring[];
  label: LabelPlacement;
  /** Categorical fill so the seven read as seven, not as one landmass. */
  fill: string;
}[] = [
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    short: "Abu Dhabi",
    label: { mode: "inside", at: [53.6, 23.6] },
    fill: "var(--color-gold)",
    rings: [
      [
        [51.6, 24.12],
        [52.1, 24.05],
        [52.6, 24.3],
        [53.3, 24.15],
        [53.75, 24.1],
        [54.1, 24.45],
        [54.4, 24.48],
        [54.75, 24.72],
        [55.05, 24.98],
        [55.3, 24.78],
        [55.6, 24.8],
        [55.85, 24.35],
        [55.83, 24.05],
        [55.55, 23.55],
        [55.2, 23.0],
        [54.5, 22.65],
        [52.55, 22.7],
        [51.59, 24.0],
      ],
    ],
  },
  {
    id: "dubai",
    name: "Dubai",
    short: "Dubai",
    label: { mode: "inside", at: [55.36, 25.02] },
    fill: "var(--color-sea)",
    rings: [
      [
        [55.05, 24.98],
        [55.15, 25.08],
        [55.27, 25.25],
        [55.33, 25.3],
        [55.55, 25.1],
        [55.75, 24.92],
        [55.6, 24.8],
        [55.3, 24.78],
      ],
      // Hatta, the mountain exclave on the Omani border.
      [
        [56.0, 24.88],
        [56.2, 24.86],
        [56.22, 24.7],
        [56.02, 24.72],
      ],
    ],
  },
  {
    id: "sharjah",
    name: "Sharjah",
    short: "Sharjah",
    label: { mode: "inside", at: [55.72, 25.14] },
    fill: "var(--color-palm)",
    rings: [
      [
        [55.33, 25.3],
        [55.42, 25.38],
        [55.47, 25.36],
        [55.53, 25.44],
        [55.68, 25.5],
        [55.92, 25.2],
        [55.9, 25.0],
        [55.75, 24.92],
        [55.55, 25.1],
      ],
      // Dibba Al-Hisn, Khor Fakkan and Kalba, on the Gulf of Oman.
      [
        [56.22, 25.64],
        [56.3, 25.63],
        [56.29, 25.55],
        [56.21, 25.56],
      ],
      [
        [56.28, 25.42],
        [56.38, 25.4],
        [56.37, 25.27],
        [56.27, 25.29],
      ],
      [
        [56.28, 25.09],
        [56.39, 25.07],
        [56.37, 24.94],
        [56.27, 24.96],
      ],
    ],
  },
  {
    id: "ajman",
    name: "Ajman",
    short: "Ajman",
    label: { mode: "leader", from: [55.47, 25.42], to: [800, 164] },
    fill: "var(--color-sun)",
    rings: [
      [
        [55.42, 25.38],
        [55.44, 25.45],
        [55.52, 25.47],
        [55.53, 25.44],
        [55.47, 25.36],
      ],
    ],
  },
  {
    id: "umm-al-quwain",
    name: "Umm Al Quwain",
    short: "Umm Al Quwain",
    label: { mode: "leader", from: [55.63, 25.54], to: [800, 118] },
    fill: "var(--color-coral)",
    rings: [
      [
        [55.44, 25.45],
        [55.56, 25.6],
        [55.74, 25.6],
        [55.68, 25.5],
        [55.53, 25.44],
        [55.52, 25.47],
      ],
    ],
  },
  {
    id: "ras-al-khaimah",
    name: "Ras Al Khaimah",
    short: "Ras Al Khaimah",
    label: { mode: "leader", from: [55.95, 25.8], to: [800, 72] },
    fill: "var(--color-sea-dark)",
    rings: [
      [
        [55.56, 25.6],
        [55.8, 25.74],
        [55.98, 25.84],
        [56.08, 26.06],
        [56.2, 25.98],
        [56.06, 25.68],
        [55.92, 25.5],
        [55.74, 25.6],
      ],
      // The southern exclave in the mountains, next to Hatta.
      [
        [56.0, 25.05],
        [56.14, 25.04],
        [56.13, 24.9],
        [56.0, 24.9],
      ],
    ],
  },
  {
    id: "fujairah",
    name: "Fujairah",
    short: "Fujairah",
    label: { mode: "leader", from: [56.3, 25.2], to: [800, 210] },
    fill: "var(--color-sun-dark)",
    rings: [
      [
        [56.19, 25.62],
        [56.24, 25.64],
        [56.21, 25.56],
        [56.29, 25.55],
        [56.28, 25.42],
        [56.27, 25.29],
        [56.37, 25.27],
        [56.38, 25.12],
        [56.39, 25.07],
        [56.28, 25.09],
        [56.27, 24.96],
        [56.18, 24.95],
        [56.1, 25.2],
        [56.12, 25.45],
      ],
    ],
  },
];
