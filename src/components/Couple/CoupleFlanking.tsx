import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { groom, bride, coupleQuote } from '../../data/wedding'
import { Khatim, StarEight } from '../ui/Ornaments'

/**
 * CoupleFlanking — Responsive Childhood Showcase in The Couple Section
 *
 * Designed for perfect fluid responsiveness across mobile (320px+),
 * tablet (640px - 1024px), and desktop viewports:
 * - On mobile: Centered stacked cards with comfortable widths (w-40 to w-48)
 *   and gentle inward glide that never clips or triggers horizontal scroll.
 * - On tablet & desktop (sm+): Side-by-side two-column presentation
 *   flanking the central Khatim & ampersand divider.
 */
export function CoupleFlanking() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll into this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  })

  // Responsive spring with higher stiffness for snappier, faster slide speed
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  })

  // Faster translation: completes in the first 45% of scroll with greater travel distance (-110px / +110px)
  const leftX = useTransform(smooth, [0.0, 0.45], [-110, 0])
  const leftOpacity = useTransform(smooth, [0.0, 0.25], [0, 1])
  const leftRotate = useTransform(smooth, [0.0, 0.45], [-5, 0])

  const rightX = useTransform(smooth, [0.0, 0.45], [110, 0])
  const rightOpacity = useTransform(smooth, [0.0, 0.25], [0, 1])
  const rightRotate = useTransform(smooth, [0.0, 0.45], [5, 0])

  // Central Khatim seal arrives promptly with the images
  const centerScale = useTransform(smooth, [0.15, 0.48], [0.5, 1])
  const centerOpacity = useTransform(smooth, [0.12, 0.35], [0, 1])

  // Toddler childhood portraits
  const groomPhoto = groom.childhoodPhotos?.[0] ?? { src: '/images/groom1.webp', caption: 'Young Salman' }
  const bridePhoto = bride.childhoodPhotos?.[0] ?? { src: '/images/bride2_cropped.webp', caption: 'Little Alana' }

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl mx-auto overflow-hidden px-1">
      
      {/* Responsive Grid: Stacks cleanly on mobile (<640px), 2 columns on tablet/desktop (>=640px) */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8 md:gap-16 items-start">
        
        {/* ================================================================== */}
        {/* GROOM (Salman) — Left Column                                       */}
        {/* ================================================================== */}
        <div className="flex flex-col items-center text-center w-full">
          
          {/* Arched Photo: Fluid sizing and inward scroll translation */}
          <motion.div
            style={{
              x: leftX,
              opacity: leftOpacity,
              rotate: leftRotate,
            }}
            className="group relative select-none mb-5 sm:mb-7 w-40 xs:w-44 sm:w-48 md:w-56 lg:w-60 max-w-[72vw] transition-transform duration-300"
          >
            <div className="relative rounded-t-[3.4rem] xs:rounded-t-[3.8rem] sm:rounded-t-[4.5rem] md:rounded-t-[5rem] rounded-b-xl p-1.5 sm:p-2 bg-gradient-to-b from-[#fffefc] via-ivory to-[#f3ecdf] border border-gold/45 shadow-card transition-all duration-300 group-hover:border-gold group-hover:shadow-luxe">
              
              <div className="relative overflow-hidden rounded-t-[3rem] xs:rounded-t-[3.4rem] sm:rounded-t-[4.1rem] md:rounded-t-[4.6rem] rounded-b-lg border border-gold/30 bg-ink/5 aspect-[4/5] w-full">
                <img
                  src={groomPhoto.src}
                  alt={groom.fullName}
                  className="h-full w-full object-cover object-center filter saturate-[0.93] contrast-[1.02]"
                  loading="eager"
                  decoding="async"
                />

                {/* Subtle vintage vignette & gold sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-t-[3rem] xs:rounded-t-[3.4rem] sm:rounded-t-[4.1rem] md:rounded-t-[4.6rem] rounded-b-lg" />

                {/* Corner ornament */}
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 text-gold/60">
                  <StarEight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Groom Names & Family Lineage */}
          <div className="flex flex-col items-center w-full px-2">
            <h3 className="display relative text-[clamp(1.35rem,4vw,1.85rem)] leading-tight text-emerald font-normal">
              {groom.fullName}
              <span
                className="absolute -bottom-2 left-1/2 h-px w-full max-w-[6.5rem] sm:max-w-[7rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
                aria-hidden="true"
              />
            </h3>

            {groom.arabicName && (
              <p
                className="arabic mt-4 sm:mt-5 block text-[1.15rem] sm:text-[1.25rem] leading-[2] text-gold-deep/90"
                lang="ar"
              >
                {groom.arabicName}
              </p>
            )}

            <div className="mt-2.5 sm:mt-3 text-[0.74rem] sm:text-[0.78rem] leading-relaxed font-light text-muted">
              <span className="mb-0.5 sm:mb-1 block text-[0.52rem] sm:text-[0.55rem] tracking-[0.28em] text-gold-deep uppercase font-medium">
                Beloved child of
              </span>
              <p className="font-normal text-ink">
                {groom.father}
                <span className="mx-1.5 text-gold">&amp;</span>
                {groom.mother}
              </p>
              {(groom.house || groom.place) && (
                <p className="mt-0.5 sm:mt-1 text-[0.7rem] sm:text-[0.74rem] font-light text-muted/80">
                  {[groom.house, groom.place].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Central Vertical Connector for Tablet & Desktop (>= 640px) */}
        <div className="hidden sm:flex absolute top-0 bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 flex-col items-center justify-center pointer-events-none z-10">
          <div className="h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
          <motion.div
            style={{
              scale: centerScale,
              opacity: centerOpacity,
            }}
            className="my-auto relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-bg via-ivory to-gold-soft/30 border border-gold/60 shadow-xs p-1"
          >
            <Khatim className="w-full h-full text-gold-deep" rings={false} strokeWidth={1} />
            <span className="absolute font-display text-sm sm:text-base text-emerald font-semibold italic select-none">
              &
            </span>
          </motion.div>
          <div className="h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        </div>

        {/* Mobile Mid-Divider with & seal (< 640px) */}
        <div className="sm:hidden flex items-center justify-center gap-3 my-2 text-gold/60 w-full">
          <span className="h-px flex-1 max-w-[5rem] bg-gradient-to-r from-transparent to-gold/40" />
          <div className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gold/40 bg-gradient-to-br from-bg to-ivory shadow-xs">
            <Khatim className="w-6 h-6 text-gold/40" rings={false} strokeWidth={0.8} />
            <span className="absolute font-display text-sm text-emerald font-semibold italic">&</span>
          </div>
          <span className="h-px flex-1 max-w-[5rem] bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        {/* ================================================================== */}
        {/* BRIDE (Alana) — Right Column                                       */}
        {/* ================================================================== */}
        <div className="flex flex-col items-center text-center w-full">
          
          {/* Arched Photo: Fluid sizing and inward scroll translation */}
          <motion.div
            style={{
              x: rightX,
              opacity: rightOpacity,
              rotate: rightRotate,
            }}
            className="group relative select-none mb-5 sm:mb-7 w-40 xs:w-44 sm:w-48 md:w-56 lg:w-60 max-w-[72vw] transition-transform duration-300"
          >
            <div className="relative rounded-t-[3.4rem] xs:rounded-t-[3.8rem] sm:rounded-t-[4.5rem] md:rounded-t-[5rem] rounded-b-xl p-1.5 sm:p-2 bg-gradient-to-b from-[#fffefc] via-ivory to-[#f3ecdf] border border-gold/45 shadow-card transition-all duration-300 group-hover:border-gold group-hover:shadow-luxe">
              
              <div className="relative overflow-hidden rounded-t-[3rem] xs:rounded-t-[3.4rem] sm:rounded-t-[4.1rem] md:rounded-t-[4.6rem] rounded-b-lg border border-gold/30 bg-ink/5 aspect-[4/5] w-full">
                <img
                  src={bridePhoto.src}
                  alt={bride.fullName}
                  className="h-full w-full object-cover object-center filter saturate-[0.93] contrast-[1.02]"
                  loading="eager"
                  decoding="async"
                />

                {/* Subtle vintage vignette & gold sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/10" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/20 rounded-t-[3rem] xs:rounded-t-[3.4rem] sm:rounded-t-[4.1rem] md:rounded-t-[4.6rem] rounded-b-lg" />

                {/* Corner ornament */}
                <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 text-gold/60">
                  <StarEight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bride Names & Family Lineage */}
          <div className="flex flex-col items-center w-full px-2">
            <h3 className="display relative text-[clamp(1.35rem,4vw,1.85rem)] leading-tight text-emerald font-normal">
              {bride.fullName}
              <span
                className="absolute -bottom-2 left-1/2 h-px w-full max-w-[6.5rem] sm:max-w-[7rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent"
                aria-hidden="true"
              />
            </h3>

            {bride.arabicName && (
              <p
                className="arabic mt-4 sm:mt-5 block text-[1.15rem] sm:text-[1.25rem] leading-[2] text-gold-deep/90"
                lang="ar"
              >
                {bride.arabicName}
              </p>
            )}

            <div className="mt-2.5 sm:mt-3 text-[0.74rem] sm:text-[0.78rem] leading-relaxed font-light text-muted">
              <span className="mb-0.5 sm:mb-1 block text-[0.52rem] sm:text-[0.55rem] tracking-[0.28em] text-gold-deep uppercase font-medium">
                Beloved child of
              </span>
              <p className="font-normal text-ink">
                {bride.father}
                <span className="mx-1.5 text-gold">&amp;</span>
                {bride.mother}
              </p>
              {(bride.house || bride.place) && (
                <p className="mt-0.5 sm:mt-1 text-[0.7rem] sm:text-[0.74rem] font-light text-muted/80">
                  {[bride.house, bride.place].filter(Boolean).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Surah Ar-Rum Reflection at the Base */}
      <div className="mt-12 sm:mt-16 text-center max-w-xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-2 text-gold/70">
          <span className="h-px w-6 sm:w-16 bg-gradient-to-r from-transparent to-gold/40" />
          <Khatim className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-deep" rings={false} />
          <span className="h-px w-6 sm:w-16 bg-gradient-to-l from-transparent to-gold/40" />
        </div>

        <blockquote className="font-display italic text-xs sm:text-sm text-ink/80 leading-relaxed">
          {coupleQuote.quote}
        </blockquote>

        <cite className="block not-italic text-[0.6rem] sm:text-[0.68rem] text-gold-deep tracking-widest uppercase font-medium mt-1.5">
          {coupleQuote.surah}
        </cite>
      </div>

    </div>
  )
}
