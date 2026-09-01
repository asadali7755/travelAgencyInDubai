/**
 * Renders JSON-LD. Kept in one component so every page emits it the same way,
 * and so the escaping of `<` is never forgotten — without it a "</script>"
 * inside any string would end the block early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // The payload is built by us from typed data, never from user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
