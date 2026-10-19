import { LatticePattern } from '../ui/Ornaments'
import { SectionHeading } from '../ui/SectionHeading'
import { CoupleFlanking } from './CoupleFlanking'

/**
 * The Couple — Concept 1: Flanking Family Showcase
 *
 * Salman and Alana's ancestral lineages are flanked by their heirloom
 * childhood portraits that glide inward from opposite sides on scroll.
 */
export function Couple() {
  return (
    <section
      id="couple"
      className="section-y relative overflow-hidden bg-ivory"
      aria-label="The Couple"
    >
      <LatticePattern
        id="couple-lattice"
        className="pointer-events-none absolute inset-0 text-gold/[0.06]"
        scale={52}
      />
      {/* Edge fades so the pattern never terminates on a hard line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Bismillah — the two families"
          arabic="العروسان"
          title="The Couple"
          subtitle="Two families, one intention — brought together by the mercy of Allah."
          className="mb-12 md:mb-16"
        />

        <CoupleFlanking />
      </div>
    </section>
  )
}
