import FAQ from '@/components/FAQ'
import JsonLd from '@/components/JsonLd'
import { faqPageLd } from '@/lib/jsonld'
import type { FaqItem } from '@/lib/faq'

/**
 * FAQ section plus its FAQPage markup. Both come from the same array so the
 * schema can never claim a question the page doesn't actually show.
 */
export default function PageFaq({ items }: { items: FaqItem[] }) {
  if (!items || items.length === 0) return null

  return (
    <section className="mt-20" aria-labelledby="page-faq-heading">
      <JsonLd data={faqPageLd(items)} />
      <h2
        id="page-faq-heading"
        className="text-center text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
      >
        Frequently asked questions
      </h2>
      <div className="mt-8">
        <FAQ items={items} />
      </div>
    </section>
  )
}
