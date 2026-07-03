import { jsonLdScript } from '@/lib/jsonld'

/** Renders a JSON-LD structured-data block. Server component. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(data)} />
}
