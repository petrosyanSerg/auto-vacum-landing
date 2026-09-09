/**
 * Emits one JSON-LD graph. Kept as a Server Component so the payload is part of
 * the HTML document rather than something the browser has to execute.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const graph = Array.isArray(data) ? data : [data];

  return (
    <>
      {graph.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          // The payload is built from typed literals in lib/seo/jsonld.ts, never
          // from user input. `<` is escaped so a stray value cannot close the tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
        />
      ))}
    </>
  );
}
