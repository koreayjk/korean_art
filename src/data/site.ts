// Site-wide content. Values in [BRACKETS] are not decided yet:
// replace them here and they update everywhere on the site.

export const site = {
  name: 'ARAM',
  title: 'ARAM — Korean silk embroidery by Mi-ae Park',
  description:
    'Traditional Korean silk embroidery by Mi-ae Park, stitched by hand in Gochang, Korea, and made to commission.',

  // While true, a small "preview" badge is shown and images are treated as
  // temporary stand-ins. Set to false only after every image has been
  // replaced with a real photograph of the workshop and the works.
  tempImages: true,

  email: '[CONTACT EMAIL]',
  priceFrom: '$[PRICE]',
  deposit: '[DEPOSIT %]',
  location: 'Gochang, Jeonbuk, Korea',
};

export const nav = [
  { label: 'Works', href: '#works' },
  { label: 'The master', href: '#master' },
  { label: 'Commission', href: '#commission' },
  { label: 'Journal', href: '#jasu' },
];

export const works = [
  { key: 'work1', title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'Cranes and pine embroidered on indigo silk' },
  { key: 'work2', title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'A pair of embroidered pillow ends on crimson silk' },
  { key: 'work3', title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'An embroidered wrapping cloth on yellow silk' },
  { key: 'work4', title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'Flowers and butterflies embroidered on a jade-green screen panel' },
  { key: 'work5', title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'An embroidered silk pouch with a tassel' },
] as const;

export const steps = [
  { title: 'Inquiry', body: 'Tell us about the space, the occasion and the design you have in mind.' },
  { title: 'Consultation', body: 'Choose a design and agree on colour, size and any inscription. You receive a written quote.' },
  { title: 'Making', body: `A deposit of ${site.deposit} begins the work. Progress photographs are shared over about six months.` },
  { title: 'Delivery', body: 'The finished work ships insured, signed and numbered, with a certificate of authenticity.' },
];
