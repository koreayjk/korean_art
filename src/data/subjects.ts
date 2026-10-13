// Centre of the main subject (the person's hands or the embroidered piece) in each
// photograph, as a fraction of the image width and height. The subject is cut out
// into src/assets/cutouts/ so it can grow on scroll while the background stays put.
export const subjects = {
  hero: [0.537, 0.333],
  master: [0.262, 0.654],
  making: [0.784, 0.429],
  work1: [0.54, 0.444],
  work2: [0.516, 0.394],
  work3: [0.488, 0.491],
  work4: [0.608, 0.547],
  work5: [0.57, 0.418],
} as const;
