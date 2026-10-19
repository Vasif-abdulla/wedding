import { motion } from 'framer-motion'
import { sharingOurJoy } from '../../data/wedding'
import { SectionHeading } from '../ui/SectionHeading'
import { Divider, GirihPattern, Lozenge, StarEight } from '../ui/Ornaments'

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

/**
 * "Sharing Our Joy" — the family standing with the couple.
 *
 * Rendered with Framer Motion stagger for GPU-accelerated entrance
 * and zero GSAP dependencies.
 */
export function SharingJoy() {
  return (
    <section
      id="sharing-joy"
      className="section-y relative overflow-hidden bg-ivory"
      aria-label="Sharing Our Joy"
    >
      <GirihPattern
        id="joy-girih"
        className="pointer-events-none absolute inset-0 text-gold/[0.05]"
        scale={92}
      />
      {/* Edge fades so the ivory band never terminates on a hard line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />

      <div className="shell-narrow relative">
        <SectionHeading
          eyebrow="With gratitude"
          arabic="مشاركة فرحتنا"
          title={sharingOurJoy.title}
          subtitle={sharingOurJoy.subtitle}
          className="mb-14"
        />

        <div className="flex flex-col items-center">
          <motion.ul
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex w-full max-w-xl flex-col items-center"
          >
            {sharingOurJoy.names.map((name, i) => (
              <motion.li
                key={name}
                variants={itemVariants}
                className="group flex w-full flex-col items-center"
              >
                <span className="display text-center text-[clamp(1.35rem,3.2vw,1.85rem)] leading-snug text-ink transition-colors duration-500 group-hover:text-emerald">
                  {name}
                </span>

                {/* Hairline between names, never after the last */}
                {i < sharingOurJoy.names.length - 1 && (
                  <span
                    className="my-5 flex items-center gap-3 text-gold/60"
                    aria-hidden="true"
                  >
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
                    <Lozenge className="h-1 w-1" />
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>

          <Divider variant="star" className="mt-12 max-w-xs" />

          <p className="mt-8 flex items-center gap-3 text-[0.72rem] font-light tracking-[0.08em] text-muted">
            <StarEight className="h-3 w-3 text-gold/60" aria-hidden="true" />
            <span>and all our beloved family and friends</span>
            <StarEight className="h-3 w-3 text-gold/60" aria-hidden="true" />
          </p>
        </div>
      </div>
    </section>
  )
}
