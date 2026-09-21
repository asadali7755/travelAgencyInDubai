# SEO working files

## `keywords-source.csv`
The client's keyword sheet, exported verbatim from Google Sheets in September 2026.
243 rows, 231 unique terms after de-duplication. Never edited — it is the input.

## `keyword-map.csv`
Generated. Every keyword from the source sheet against the page on this site that
answers it, ready to paste back into the client's own sheet.

**Do not edit this by hand.** It is produced from `lib/seo-keywords.ts`, which in turn
reads the `keywords` arrays on each attraction, category and package. Adding a keyword
to a page is the only step needed; the map follows.

Regenerate it, or download the current version, from `/admin/keywords` in the admin
panel — that page is always live and this file is a snapshot.

## `build_keyword_map.py`
The first version of the mapping, from before the site had the content to map onto.
Superseded by `lib/seo-keywords.ts`. Kept because the meta title and description
wording in it was approved by the client and several pages still use it.

## How the keywords were actually used

They decided **which pages exist and what each is about** — the beaches, nightlife,
spa, camping, kids, souks and dining categories all exist because the sheet asked for
them, as does the Al Ain, Fujairah, Ras Al Khaimah and Umm Al Quwain coverage.

They were **not** inserted into sentences. Copy written to contain a phrase reads like
copy written to contain a phrase, ranks worse than copy written to be useful, and is
the specific thing Google's helpful-content work demotes. The 29 terms deliberately
left untargeted — competitor brand names, hotel brands, single businesses and one
jobs query — are listed with their reasons in `lib/seo-keywords.ts`.
