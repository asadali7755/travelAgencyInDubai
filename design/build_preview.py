"""Build a standalone preview page from the .dc.html design sources.

Each artboard's markup is lifted out of its <x-dc> wrapper and its <helmet> CSS is
scoped to that page, so all of them can live in one document without colliding.
Desktop pages (1440px) are scaled to fit the viewport; phone pages (390px) always
render at 1:1 so sticky bars behave the way they will on a real phone.

Run:  python design/build_preview.py
Out:  design/preview.html
"""

import pathlib
import re

HERE = pathlib.Path(__file__).parent

# (file, id, tab label, group, width, fixed_height)
PAGES = [
    ("Main.dc.html",          "home",     "Home",        "desktop", 1440, None),
    ("ToursHub.dc.html",      "tours",    "Tours hub",   "desktop", 1440, None),
    ("PackageDetail.dc.html", "tour",     "Tour detail", "desktop", 1440, None),
    ("Guide.dc.html",         "guide",    "Guide",       "desktop", 1440, None),
    ("Enquiry.dc.html",       "enquiry",  "Enquiry",     "desktop", 1440, None),

    ("MobileHome.dc.html",    "m-home",   "Home",        "mobile",  390, None),
    ("MobileTour.dc.html",    "m-tour",   "Tour detail", "mobile",  390, None),
    ("MobileGuide.dc.html",   "m-guide",  "Guide",       "mobile",  390, None),

    ("AppHome.dc.html",       "a-home",    "App · Home",    "app", 390, 844),
    ("AppExplore.dc.html",    "a-explore", "App · Explore", "app", 390, 844),
    ("AppPackage.dc.html",    "a-tour",    "App · Tour",    "app", 390, 844),
    ("AppRewards.dc.html",    "a-rewards", "App · Rewards", "app", 390, 844),
    ("AppProfile.dc.html",    "a-profile", "App · Profile", "app", 390, 844),
]

FONT_LINKS = [
    'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap',
]


def extract(path: pathlib.Path) -> tuple[str, str]:
    """Return (helmet css, body markup) from a .dc.html source."""
    src = path.read_text(encoding="utf-8")

    css = ""
    m = re.search(r"<style>(.*?)</style>", src, re.S)
    if m:
        css = m.group(1)

    m = re.search(r"</helmet>(.*?)</x-dc>", src, re.S)
    if not m:
        raise ValueError(f"no artboard markup found in {path.name}")
    return css, m.group(1).strip()


def scope_css(css: str, scope: str) -> str:
    """Prefix every selector with `scope`; map the file's body rule onto the scope itself."""
    out = []
    for chunk in css.split("}"):
        if "{" not in chunk:
            continue
        sel, decls = chunk.split("{", 1)
        sel = sel.strip()
        if not sel or sel.startswith("@"):
            continue
        parts = []
        for one in sel.split(","):
            one = one.strip()
            if not one:
                continue
            parts.append(scope if one == "body" else f"{scope} {one}")
        out.append(f"{', '.join(parts)} {{{decls}}}")
    return "\n".join(out)


def main() -> None:
    blocks, styles, tabs = [], [], []

    for fname, pid, label, group, width, fixed_h in PAGES:
        css, markup = extract(HERE / fname)
        styles.append(f"/* ---- {fname} ---- */\n" + scope_css(css, f"#pg-{pid}"))
        height_attr = f' data-h="{fixed_h}"' if fixed_h else ""
        blocks.append(
            f'<section class="screen" id="screen-{pid}" data-group="{group}" '
            f'data-w="{width}"{height_attr} hidden>\n'
            f'  <div class="frame {"phone" if width == 390 else "desk"}">\n'
            f'    <div class="scaler"><div class="page" id="pg-{pid}">\n{markup}\n</div></div>\n'
            f"  </div>\n</section>"
        )
        tabs.append(
            f'<button class="tab" role="tab" data-target="{pid}" data-group="{group}">{label}</button>'
        )

    links = "\n".join(f'  <link rel="stylesheet" href="{h}">' for h in FONT_LINKS)

    html = f"""<title>Travel Agency in Dubai Screens</title>
{links}
<style>
:root {{
  --bg: #EDEEF1; --panel: #FFFFFF; --ink: #15181D; --muted: #5E646E;
  --line: #D8DBE1; --accent: #2F5F7A; --stage: #E3E5E9;
}}
@media (prefers-color-scheme: dark) {{
  :root:not([data-theme="light"]) {{
    --bg: #121418; --panel: #1B1E24; --ink: #E7EAEF; --muted: #98A0AB;
    --line: #2A2E36; --accent: #82B5D1; --stage: #0D0F12;
  }}
}}
:root[data-theme="dark"] {{
  --bg: #121418; --panel: #1B1E24; --ink: #E7EAEF; --muted: #98A0AB;
  --line: #2A2E36; --accent: #82B5D1; --stage: #0D0F12;
}}

body {{
  margin: 0; background: var(--bg); color: var(--ink);
  font-family: "IBM Plex Sans", system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}}

.bar {{
  position: sticky; top: 0; z-index: 50;
  background: var(--panel); border-bottom: 1px solid var(--line);
}}
.bar-row {{
  display: flex; align-items: center; gap: 16px;
  padding: 12px 16px; flex-wrap: wrap;
}}
.brand {{ font-size: 14px; font-weight: 600; letter-spacing: -.01em; }}
.brand span {{ color: var(--muted); font-weight: 400; }}

.modes {{ display: flex; gap: 2px; background: var(--stage); border-radius: 8px; padding: 3px; }}
.mode {{
  appearance: none; border: 0; background: transparent; color: var(--muted);
  font: inherit; font-size: 13px; font-weight: 500; padding: 8px 14px;
  border-radius: 6px; cursor: pointer; min-height: 36px;
}}
.mode[aria-pressed="true"] {{ background: var(--panel); color: var(--ink); box-shadow: 0 1px 2px rgba(0,0,0,.12); }}
.mode:focus-visible, .tab:focus-visible {{ outline: 2px solid var(--accent); outline-offset: 2px; }}

.size {{
  margin-left: auto; font-family: "IBM Plex Mono", ui-monospace, monospace;
  font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums;
}}

.tabs {{
  display: flex; gap: 6px; padding: 0 16px 12px;
  overflow-x: auto; scrollbar-width: thin;
}}
.tab {{
  appearance: none; border: 1px solid var(--line); background: transparent;
  color: var(--muted); font: inherit; font-size: 13px; padding: 9px 14px;
  border-radius: 999px; cursor: pointer; white-space: nowrap; min-height: 38px;
}}
.tab[aria-selected="true"] {{ background: var(--ink); border-color: var(--ink); color: var(--bg); font-weight: 500; }}

.stage {{ padding: 24px 16px 64px; display: flex; justify-content: center; }}
.frame {{ background: var(--panel); border: 1px solid var(--line); overflow: hidden; }}
.frame.desk {{ border-radius: 10px; width: 100%; max-width: 1440px; }}
.frame.phone {{ border-radius: 22px; width: 390px; flex: 0 0 390px; }}
.scaler {{ transform-origin: top left; }}
.page {{ overflow: hidden; }}

.note {{
  max-width: 640px; margin: 0 auto; padding: 0 16px 40px;
  font-size: 13px; line-height: 1.6; color: var(--muted); text-align: center;
}}
@media (prefers-reduced-motion: no-preference) {{
  .screen {{ animation: fade .18s ease-out; }}
  @keyframes fade {{ from {{ opacity: 0; }} to {{ opacity: 1; }} }}
}}

/* ===== design sources, scoped per page ===== */
{chr(10).join(styles)}
</style>

<div class="bar">
  <div class="bar-row">
    <div class="brand">Travel Agency in Dubai <span>· screen preview</span></div>
    <div class="modes" role="group" aria-label="Screen size">
      <button class="mode" data-mode="desktop" aria-pressed="true">Desktop</button>
      <button class="mode" data-mode="mobile" aria-pressed="false">Mobile web</button>
      <button class="mode" data-mode="app" aria-pressed="false">App</button>
    </div>
    <div class="size" id="size">—</div>
  </div>
  <div class="tabs" role="tablist" id="tabs">
{chr(10).join("    " + t for t in tabs)}
  </div>
</div>

<div class="stage" id="stage">
{chr(10).join(blocks)}
</div>

<p class="note">Values in [brackets] are facts still to come from the client — prices, phone number, licence number.
Crosshatched blocks are photo slots, labelled with the shot each one needs.</p>

<script>
(function () {{
  var mode = "desktop", current = null;
  var tabs = Array.prototype.slice.call(document.querySelectorAll(".tab"));
  var modes = Array.prototype.slice.call(document.querySelectorAll(".mode"));
  var sizeEl = document.getElementById("size");

  function show(id) {{
    current = id;
    document.querySelectorAll(".screen").forEach(function (s) {{ s.hidden = s.id !== "screen-" + id; }});
    tabs.forEach(function (t) {{ t.setAttribute("aria-selected", String(t.dataset.target === id)); }});
    fit();
  }}

  function setMode(m) {{
    mode = m;
    modes.forEach(function (b) {{ b.setAttribute("aria-pressed", String(b.dataset.mode === m)); }});
    var visible = tabs.filter(function (t) {{
      var on = t.dataset.group === m;
      t.hidden = !on;
      return on;
    }});
    if (visible.length) show(visible[0].dataset.target);
  }}

  function fit() {{
    var screen = document.getElementById("screen-" + current);
    if (!screen) return;
    var frame = screen.querySelector(".frame");
    var scaler = screen.querySelector(".scaler");
    var page = screen.querySelector(".page");
    var w = parseInt(screen.dataset.w, 10);

    // Phone widths always render 1:1 so sticky bars behave normally.
    var avail = frame.clientWidth || w;
    var scale = w === 390 ? 1 : Math.min(1, avail / w);

    scaler.style.width = w + "px";
    scaler.style.transform = scale === 1 ? "none" : "scale(" + scale + ")";

    var natural = screen.dataset.h ? parseInt(screen.dataset.h, 10) : page.scrollHeight;
    page.style.height = screen.dataset.h ? natural + "px" : "auto";
    frame.style.height = Math.round(natural * scale) + "px";

    sizeEl.textContent = w + " x " + natural + " px" + (scale < 1 ? "  ·  " + Math.round(scale * 100) + "%" : "");
  }}

  tabs.forEach(function (t) {{ t.addEventListener("click", function () {{ show(t.dataset.target); }}); }});
  modes.forEach(function (b) {{ b.addEventListener("click", function () {{ setMode(b.dataset.mode); }}); }});
  window.addEventListener("resize", fit);
  document.fonts && document.fonts.ready.then(fit);

  setMode(window.matchMedia("(max-width: 700px)").matches ? "mobile" : "desktop");
}})();
</script>
"""

    out = HERE / "preview.html"
    out.write_text(html, encoding="utf-8")
    print(f"wrote {out.name} — {len(PAGES)} screens, {len(html) // 1024} KB")


if __name__ == "__main__":
    main()
