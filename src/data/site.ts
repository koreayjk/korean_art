// Values shared by every language. Values in [BRACKETS] are not decided yet:
// replace them here and they update everywhere on the site, in both languages.
// The words themselves live in copy.ts.

export const site = {
  name: 'ARAM',

  // While true, a small "preview" badge is shown and images are treated as
  // temporary stand-ins. Set to false only after every image has been
  // replaced with a real photograph of the workshop and the works.
  tempImages: true,

  email: '[CONTACT EMAIL]',
  priceFrom: '$[PRICE]',
  deposit: '[DEPOSIT %]',

  // Where the inquiry forms are sent (for example a Formspree address such as
  // 'https://formspree.io/f/xxxxxxxx'). Until this is set the forms check the entries
  // but do not send anything, and tell the visitor so.
  formEndpoint: '',
};
