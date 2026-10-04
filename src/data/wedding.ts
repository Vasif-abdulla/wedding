/* ============================================================================
 * WEDDING DATA — the single source of truth for the whole invitation.
 *
 *  ▸ Every user-facing string, date, name and link lives here.
 *  ▸ No component hardcodes content. Edit this file only.
 *  ▸ Fields marked  // VERIFY:  are derived or assumed — please confirm them.
 *
 *  The one exception is the boot shell in index.html (the couple's initials),
 *  which must paint before JavaScript loads. See README.
 * ========================================================================== */

export interface Person {
  /** Given name shown large in the Hero */
  firstName: string
  /** Full formal name shown in the Couple section */
  fullName: string
  /** Arabic rendering — optional, omit to hide */
  arabicName?: string
  father: string
  mother: string
  /** Path under /public. Drop the real photo at this exact path. */
  image: string
  /** Single initial used by the preloader monogram */
  initial: string
}

export interface WeddingEvent {
  id: string
  name: string
  arabicName?: string
  /** ISO 8601 with offset. Null when the timing isn't fixed yet — the card
   *  then shows the venue alone and the countdown ignores it. */
  dateTime: string | null
  /** Human-readable time, e.g. "5:00 PM". Empty string hides the row. */
  timeLabel: string
  venue: string
  address: string
  description: string
  icon: 'nikkah' | 'walima' | 'reception'
  mapsUrl: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'instagram' | 'facebook' | 'mail' | 'phone'
}

/* -------------------------------------------------------------------------- */
/*  COUPLE                                                                     */
/* -------------------------------------------------------------------------- */

// VERIFY: `arabicName` should mirror `fullName` in full, not just the given
// name. These are the standard Arabic renderings — نشاد محمد and لبنى محمود —
// but names admit more than one spelling, so please have the families confirm
// them before this goes out.
export const groom: Person = {
  firstName: 'Salman',
  fullName: 'Salmanul Fariz',
  arabicName: 'سلمان الفارس',
  father: 'Kunhi Muhammed',
  mother: 'Sumayya',
  image: '/images/groom.jpg',
  initial: 'S',
}

export const bride: Person = {
  firstName: 'Alana',
  fullName: 'Alana Fathima',
  arabicName: 'ألانا فاطمة',
  father: 'Abdul Nazeer',
  mother: 'Aneesha',
  image: '/images/bride.jpg',
  initial: 'A',
}

/* -------------------------------------------------------------------------- */
/*  COUPLE PHOTOS — the slider in the Couple section                           */
/* -------------------------------------------------------------------------- */

export interface CouplePhoto {
  /** Path under /public */
  src: string
  /** Optional line under the photo — a place, a moment. Omit to show none. */
  caption?: string
}

/**
 * Photos of Salman and Alana TOGETHER.
 *
 * Add, remove or reorder freely — the slider, the dots and the counter all
 * follow this list. Drop the files at these exact paths (or change the paths to
 * match your filenames). Any that are missing show a gold-seal panel rather
 * than a broken image, so the section never looks broken while you gather them.
 */
export const couplePhotos: CouplePhoto[] = [
  { src: '/images/couple-1.jpg' },
  { src: '/images/couple-2.jpg' },
  { src: '/images/couple-3.jpg' },
]

/**
 * The frame the photos sit in, as a raw CSS aspect-ratio (applied inline —
 * Tailwind's scanner doesn't pick arbitrary classes out of this data file).
 *
 * They're clipped to a mihrab arch, so a PORTRAIT ratio suits them best. If
 * your photos are landscape, set this to '4 / 3' or '3 / 2' — otherwise cover
 * will crop the sides to fill a tall frame.
 */
export const couplePhotoAspect = '5 / 6'

/* -------------------------------------------------------------------------- */
/*  HOSTS — the invitation is extended by the groom's grandparents             */
/* -------------------------------------------------------------------------- */

export const hosts = {
  grandfather: 'Mr. Kunhi Muhammed',
  grandmother: 'Mrs. Sumayya',

} as const



/* -------------------------------------------------------------------------- */
/*  THE OCCASION                                                               */
/* -------------------------------------------------------------------------- */

export const wedding = {
  /** Primary date — the countdown target. ISO 8601, IST (+05:30). */
  date: '2027-01-09T11:00:00+05:30',
  /** Pre-formatted so the Hero never waits on a date library */
  dateLabel: '9 January 2027',
  dayLabel: 'Saturday',
  // VERIFY: Umm al-Qura reckoning. Local moon sighting may differ by a day.
  hijriLabel: '1 Shaʻban 1448',
  /** Hero section eyebrow and date */
  heroEyebrow: 'Reception Invitation',
  heroDateLabel: '9 January 2027',
  heroDayLabel: 'Saturday',
  quote: {
    text: 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquillity with them, and He has put love and mercy between your hearts.',
    source: 'Surah Ar-Rum, 30:21',
  },
  bismillah: {
    arabic: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    translation: 'In the Name of Allah, the Most Compassionate, the Most Merciful',
  },
  invitationMessage:
    'Together with our families, we request the honour of your presence at our Reception.',
  invitationSubtext:
    'With hearts full of gratitude to Allah, we invite you to share in the joy of this blessed union — and to remember us in your prayers.',
} as const

/* -------------------------------------------------------------------------- */
/*  VENUE & MAPS                                                               */
/* -------------------------------------------------------------------------- */

export const venue = {
  name: 'Malayil Crysta Convention Center',
  address: 'Kolathur–Malappuram Road, Kodur, Malappuram, Kerala 676504',
  mapsUrl: 'https://maps.app.goo.gl/ksSpA4i19buehNxf6',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Malayil+Crysta+Convention+Center+Kodur+Malappuram',
  /** Keyless embed — `output=embed` needs no API key and no billing account. */
  embedUrl:
    'https://maps.google.com/maps?q=Malayil+Crysta+Convention+Center+Kodur+Malappuram&z=15&output=embed',
} as const

/* -------------------------------------------------------------------------- */
/*  EVENTS                                                                     */
/* -------------------------------------------------------------------------- */

export const events: WeddingEvent[] = [
  {
    id: 'reception',
    name: 'Reception',
    arabicName: 'استقبال',
    dateTime: '2027-01-09T11:00:00+05:30',
    timeLabel: '11:00 AM',
    venue: 'Malayil Crysta Convention Center',
    address: 'Kolathur–Malappuram Road, Kodur, Malappuram, Kerala 676504',
    description:
      'A celebration of food, warmth and gratitude in the company of family and friends. We look forward to welcoming you.',
    icon: 'reception',
    mapsUrl: 'https://maps.app.goo.gl/ksSpA4i19buehNxf6',
  },
]

/* -------------------------------------------------------------------------- */
/*  SHARING OUR JOY — family standing with the couple                          */
/* -------------------------------------------------------------------------- */

export const sharingOurJoy = {
  title: 'Sharing Our Joy',
  subtitle: 'With love and prayers from those who stand beside us.',
  names: [
    'Vasif',
    'Riftha',
    'Nusurath',
    'Adnan',
    'Naira',
  ],
} as const

/* -------------------------------------------------------------------------- */
/*  CONTACT & SOCIAL                                                           */
/* -------------------------------------------------------------------------- */

export const contact = {
  // VERIFY: the floating WhatsApp button opens a chat to this number. International
  // format, digits only. Confirm it is actually on WhatsApp — updated to match
  // the contact number below; revert if WhatsApp is on a different SIM.
  whatsapp: '918590792535',
  /** Shown in the footer and dialable on mobile. */
  phones: ['+91 85907 92535', '+91 95449 59594'],
  email: 'salmanulfariz@gmail.com',
} as const

export const socials: SocialLink[] = [
  { label: 'Email us', href: 'mailto:salmanulfariz@gmail.com', icon: 'mail' },
  { label: 'Call us', href: 'tel:+918590792535', icon: 'phone' },
]

/* -------------------------------------------------------------------------- */
/*  MUSIC                                                                      */
/* -------------------------------------------------------------------------- */

export const music = {
  /** Missing or undecodable file → the toggle disables itself silently. */
  src: '/music/bg-music.mp3',
  title: 'Background music',
  volume: 0.32,
  /** Try music on page entry, then retry from the opening gesture if blocked. */
  autoplayAfterOpen: true,
} as const

/* -------------------------------------------------------------------------- */
/*  SHARE / SEO                                                                */
/* -------------------------------------------------------------------------- */

export const site = {
  title: `${groom.firstName} & ${bride.firstName} — Reception Invitation`,
  shareText: `You are cordially invited to the Reception of ${groom.firstName} & ${bride.firstName}, 9 January 2027.`,
  url: typeof window !== 'undefined' ? window.location.href : '',
} as const

/* -------------------------------------------------------------------------- */
/*  THEME TOKENS (mirrors styles/index.css — for JS-side consumers)            */
/* -------------------------------------------------------------------------- */

export const theme = {
  bg: '#FFFCF8',
  gold: '#C8A96A',
  goldSoft: '#E3D3AE',
  goldDeep: '#A8863F',
  emerald: '#0E5A4E',
  emeraldDeep: '#083830',
  ivory: '#F8F5EF',
  ink: '#2D2926',
  muted: '#6B625A',
  glass: 'rgba(255,255,255,0.65)',
} as const
