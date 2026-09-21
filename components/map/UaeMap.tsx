"use client";

import Link from "next/link";
import { useState } from "react";
import { VIEW_BOX, emirateShapes, project, toPath } from "@/components/map/uae-geometry";
import type { Emirate } from "@/lib/data/attractions";

/**
 * The clickable emirate map.
 *
 * Deliberately paired with the button list in EmiratePicker rather than
 * replacing it. A map alone fails on a phone, fails for anyone using a keyboard
 * or a screen reader, and fails when the shapes are too small to hit — Ajman is
 * 260 km² next to Abu Dhabi's 67,000. The map is the attractive way in; the
 * list is the one that always works.
 *
 * Every shape is a link, so tab order and Enter work without any key handling
 * of our own. Labels for the four smallest emirates sit in a right-hand gutter
 * with leader lines, because at true scale their names do not fit inside them.
 */
export function UaeMap({
  counts,
  hrefs,
  activeId,
}: {
  /** Attraction count per emirate, shown in the badge. */
  counts: Record<string, number>;
  /**
   * Destination per emirate, as a plain object rather than a function. A Server
   * Component cannot pass a function across the boundary into a Client
   * Component, and a lookup keeps the map reusable for other link targets.
   */
  hrefs: Record<string, string>;
  activeId?: Emirate;
}) {
  const [hovered, setHovered] = useState<Emirate | null>(null);
  const focus = hovered ?? activeId ?? null;
  const focused = emirateShapes.find((shape) => shape.id === focus);

  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-[var(--radius-xl2)] bg-sea-tint/40 p-2 sm:p-3">
        <svg
          viewBox={VIEW_BOX}
          className="h-auto w-full"
          role="group"
          aria-label="Map of the United Arab Emirates. Each emirate is a link."
        >
          <title>United Arab Emirates by emirate</title>

          {emirateShapes.map((shape) => {
            const on = focus === shape.id;
            const dim = focus !== null && !on;

            const labelPoint =
              shape.label.mode === "inside" ? project(shape.label.at) : shape.label.to;
            const leaderFrom =
              shape.label.mode === "leader" ? project(shape.label.from) : null;

            return (
              <Link
                key={shape.id}
                href={hrefs[shape.id] ?? "/uae-attractions"}
                aria-label={`${shape.name} — ${counts[shape.id] ?? 0} places`}
                className="outline-none"
                onMouseEnter={() => setHovered(shape.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(shape.id)}
                onBlur={() => setHovered(null)}
              >
                <path
                  d={toPath(shape.rings)}
                  fill={shape.fill}
                  stroke="var(--color-page)"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  className="cursor-pointer transition-opacity duration-200"
                  opacity={on ? 1 : dim ? 0.35 : 0.72}
                />

                {leaderFrom ? (
                  <line
                    x1={leaderFrom[0]}
                    y1={leaderFrom[1]}
                    x2={shape.label.mode === "leader" ? shape.label.to[0] - 8 : 0}
                    y2={shape.label.mode === "leader" ? shape.label.to[1] - 4 : 0}
                    stroke={shape.fill}
                    strokeWidth={1.5}
                    className="transition-opacity duration-200"
                    opacity={on ? 1 : dim ? 0.25 : 0.55}
                  />
                ) : null}

                <text
                  x={labelPoint[0]}
                  y={labelPoint[1]}
                  textAnchor={shape.label.mode === "leader" ? "start" : "middle"}
                  className="pointer-events-none select-none text-[17px] font-bold transition-opacity duration-200"
                  fill={on ? "var(--color-ink)" : "var(--color-ink)"}
                  opacity={dim ? 0.4 : 1}
                  // paint-order keeps the halo behind the glyphs rather than
                  // over them, which is what makes the text legible on top of a
                  // saturated fill.
                  style={{ paintOrder: "stroke", stroke: "var(--color-page)", strokeWidth: 5 }}
                >
                  {shape.short}
                </text>
              </Link>
            );
          })}
        </svg>

        <div
          aria-hidden
          className={`pointer-events-none absolute left-4 top-4 rounded-full bg-surface px-4 py-2 text-[14px] font-semibold shadow-[var(--shadow-card)] transition-opacity duration-200 ${
            focused ? "opacity-100" : "opacity-0"
          }`}
        >
          {focused ? (
            <>
              {focused.name}
              <span className="ml-2 font-normal text-ink/55">
                {counts[focused.id] ?? 0} places
              </span>
            </>
          ) : null}
        </div>
      </div>

      <figcaption className="mt-3 text-[13px] leading-relaxed text-ink/50">
        A simplified guide map. Borders and coastlines are drawn schematically so each
        emirate is easy to pick out, and are not survey-accurate.
      </figcaption>
    </figure>
  );
}
