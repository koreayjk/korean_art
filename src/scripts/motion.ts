// All motion on the site lives here.
// Rules kept throughout: one easing family (expo.out for entrances,
// power/expo.inOut for wipes), long durations, and nothing that moves
// unless the visitor scrolls or the page has just loaded.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

// Motion plays for everyone, including visitors whose device is set to "reduce motion":
// the site is built around it. Adding ?motion=off to the address turns it off.
const reduce = new URLSearchParams(location.search).get('motion') === 'off';

const $ = <T extends HTMLElement = HTMLElement>(selector: string, root: ParentNode = document) =>
  root.querySelector<T>(selector);
const $$ = <T extends HTMLElement = HTMLElement>(selector: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(selector));
const pad = (n: number) => String(n).padStart(2, '0');

let lenis: Lenis | null = null;

/* ---------- Smooth scrolling ---------- */

function smoothScroll() {
  if (reduce) return;
  lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Mobile menu ---------- */

function setMenu(open: boolean) {
  const menu = $('[data-menu]');
  const toggle = $('[data-menu-toggle]');
  if (!menu || !toggle) return;
  menu.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '';
  if (open) lenis?.stop();
  else lenis?.start();
}

function menu() {
  const toggle = $('[data-menu-toggle]');
  toggle?.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
}

/* ---------- In-page links ---------- */

function anchors() {
  document.addEventListener('click', (event) => {
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href') ?? '';
    const target = id.length > 1 ? document.querySelector<HTMLElement>(id) : null;
    if (!target) return;
    event.preventDefault();
    setMenu(false);
    if (lenis) lenis.scrollTo(id === '#top' ? 0 : target, { duration: 1.6 });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  });
}

/* ---------- Intro and hero entrance ---------- */

function intro() {
  const overlay = $('[data-intro]');
  if (!overlay) return;

  const fill = $('[data-intro-fill]', overlay);
  const count = $('[data-intro-count]', overlay);
  const title = $('[data-hero-title]');
  const counter = { value: 0 };

  lenis?.stop();

  const split = title ? SplitText.create(title, { type: 'lines', mask: 'lines' }) : null;

  const tl = gsap.timeline({
    onComplete: () => split?.revert(),
  });

  tl.to(counter, {
    value: 100,
    duration: 1.5,
    ease: 'power2.inOut',
    onUpdate: () => {
      if (count) count.textContent = String(Math.round(counter.value));
    },
  })
    .to(fill, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0)
    .to(overlay, { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, '+=0.15')
    .add(() => {
      overlay.remove();
      lenis?.start();
    })
    .from('[data-hero-image]', { scale: 1.14, duration: 2.8, ease: 'expo.out' }, '-=1.0')
    .from('[data-header]', { autoAlpha: 0, duration: 1.4, ease: 'power2.out' }, '<0.3');

  if (split) {
    tl.from(split.lines, { yPercent: 110, duration: 1.5, ease: 'expo.out', stagger: 0.1 }, '<0.1');
  }

  tl.from('[data-hero-item]', { y: 18, autoAlpha: 0, duration: 1.5, ease: 'expo.out', stagger: 0.1 }, '<0.25');
}

/* ---------- Header ---------- */

function header() {
  const el = $('[data-header]');
  const hero = $('[data-hero]');
  if (!el || !hero) return;

  // Solid background once the hero has passed.
  ScrollTrigger.create({
    trigger: hero,
    start: 'bottom top+=68',
    onEnter: () => el.classList.add('is-solid'),
    onLeaveBack: () => el.classList.remove('is-solid'),
  });

  if (reduce) return;

  // Reading progress along the bottom edge.
  gsap.to('[data-progress]', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  // Step aside while scrolling down, return when scrolling up.
  let hidden = false;
  const show = (visible: boolean) => {
    if (hidden === !visible) return;
    hidden = !visible;
    gsap.to(el, { yPercent: visible ? 0 : -100, duration: 0.7, ease: 'expo.out', overwrite: 'auto' });
  };
  ScrollTrigger.create({
    start: () => window.innerHeight,
    end: 'max',
    onUpdate: (self) => show(self.direction === -1),
    onLeaveBack: () => show(true),
  });

  // The wordmark starts large over the hero and settles into the header. It is set in
  // CSS at 5x its resting size and scaled down, which keeps it sharp when large.
  const logo = $('[data-logo]');
  if (logo) {
    const BIG = 5;
    const rest = 1 / BIG;
    // How much larger than its resting size the wordmark appears over the hero.
    const enlarge = () => {
      const target = window.innerWidth < 820 ? window.innerWidth * 0.5 : Math.min(window.innerWidth * 0.3, 460);
      return gsap.utils.clamp(1, 4.8, target / (logo.offsetWidth * rest));
    };
    gsap.fromTo(
      logo,
      {
        scale: () => enlarge() * rest,
        y: () => (window.innerWidth < 820 ? 28 : 44) + (enlarge() - 1) * 10,
      },
      {
        scale: rest,
        y: 0,
        ease: 'none',
        scrollTrigger: { start: 0, end: 420, scrub: 0.4, invalidateOnRefresh: true },
      },
    );
  }
}

/* ---------- Hero on scroll ---------- */

function heroScroll() {
  const hero = $('[data-hero]');
  if (!hero) return;
  gsap.to('[data-hero-media]', {
    yPercent: 5.6,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('[data-hero-content]', {
    y: -40,
    autoAlpha: 0,
    ease: 'none',
    scrollTrigger: { trigger: hero, start: 'top top', end: '55% top', scrub: true },
  });
}

/* ---------- Text ---------- */

function text() {
  const pinned = window.matchMedia('(min-width: 900px) and (min-height: 600px)').matches;

  // Statement: the section holds still while the words come up to full strength,
  // like a title card. Small screens read it as they scroll past.
  $$('[data-words]').forEach((paragraph) => {
    const split = SplitText.create(paragraph.querySelectorAll('span'), { type: 'words' });
    const section = paragraph.closest<HTMLElement>('section');
    const scrollTrigger =
      pinned && section
        ? { trigger: section, start: 'center center', end: '+=90%', pin: true, scrub: 0.5, refreshPriority: 1 }
        : { trigger: paragraph, start: 'top 82%', end: 'bottom 55%', scrub: 0.4 };
    gsap.fromTo(split.words, { opacity: 0.16 }, { opacity: 1, ease: 'none', stagger: 0.05, scrollTrigger });
  });

  // "한 땀, 한 땀": the embroidered lines dissolve in on the spot, the Korean first and the
  // English just after it, with the section held in place (desktop) and the five-colour
  // thread drawn alongside.
  $$('[data-stitch]').forEach((stitch) => {
    const section = stitch.closest<HTMLElement>('section');
    const english = section?.querySelector('[data-stitch-en]');
    const thread = section?.querySelector('[data-thread]');
    const scrollTrigger =
      pinned && section
        ? { trigger: section, start: 'center center', end: '+=70%', pin: true, scrub: 0.5, refreshPriority: 1 }
        : { trigger: stitch, start: 'top 84%', end: 'top 30%', scrub: 0.5 };
    // The dissolves finish early (the Korean by about half-way through the scroll, the
    // English by two thirds) and the rest of the scroll just holds the finished picture.
    const dissolve = { opacity: 0, filter: 'blur(10px)' };
    const clear = { opacity: 1, filter: 'blur(0px)', ease: 'none', duration: 0.5 };
    const tl = gsap.timeline({ scrollTrigger });
    tl.fromTo(stitch, dissolve, clear, 0);
    if (english) tl.fromTo(english, dissolve, clear, 0.2);
    if (thread) tl.fromTo(thread, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 0.6 }, 0);
    tl.to({}, { duration: 0.35 }, 0.7);
  });

  // Headings: each line rises out of its own mask.
  $$('h2.display').forEach((heading) => {
    const split = SplitText.create(heading, { type: 'lines', mask: 'lines' });
    gsap.from(split.lines, {
      yPercent: 115,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: heading, start: 'top 92%', once: true },
    });
  });

  // Single elements.
  $$('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 28,
      autoAlpha: 0,
      duration: 1.8,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 96%', once: true },
    });
  });

  // Groups: children follow one another.
  $$('[data-reveal-group]').forEach((group) => {
    gsap.from(group.children, {
      y: 32,
      autoAlpha: 0,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 88%', once: true },
    });
  });

  // Process steps.
  $$('[data-steps]').forEach((list) => {
    gsap.from(list.children, {
      y: 28,
      autoAlpha: 0,
      duration: 1.7,
      ease: 'expo.out',
      stagger: 0.14,
      scrollTrigger: { trigger: list, start: 'top 90%', once: true },
    });
  });
}

/* ---------- Subjects: the piece or the hands grow, the background stays ---------- */

// Where the subject sits inside the element once object-fit: cover has cropped it,
// so it grows from its own centre rather than from the middle of the frame.
function subjectOrigin(img: HTMLElement) {
  const cx = Number(img.dataset.cx);
  const cy = Number(img.dataset.cy);
  const nw = Number(img.getAttribute('width')) || 1;
  const nh = Number(img.getAttribute('height')) || 1;
  const bw = img.clientWidth;
  const bh = img.clientHeight;
  const scale = Math.max(bw / nw, bh / nh);
  const [px, py] = getComputedStyle(img)
    .objectPosition.split(' ')
    .map((v) => parseFloat(v) / 100);
  const dw = nw * scale;
  const dh = nh * scale;
  return `${(bw - dw) * px + cx * dw}px ${(bh - dh) * py + cy * dh}px`;
}

function grow(img: HTMLElement, trigger: ScrollTrigger.Vars, to: number) {
  gsap.fromTo(
    img,
    { scale: 1, transformOrigin: () => subjectOrigin(img) },
    { scale: to, ease: 'none', scrollTrigger: { ...trigger, scrub: 0.6, invalidateOnRefresh: true } },
  );
}

function subjects() {
  const hero = $('[data-hero]');
  const heroSubject = $('[data-subject="hero"]');
  if (hero && heroSubject) {
    grow(heroSubject, { trigger: hero, start: 'top top', end: 'bottom top' }, 1.8);
  }
  $$('[data-subject="frame"]').forEach((img) => {
    const frame = img.closest<HTMLElement>('[data-image]');
    if (frame) grow(img, { trigger: frame, start: 'top bottom', end: 'center 35%' }, 2);
  });
}

/* ---------- Depth: text floats on its own layer above the background ---------- */

// Text travels faster than the page while it crosses the screen (and the photographs
// travel slower), so words and backgrounds read as separate layers moving at
// different speeds, like a camera moving through a scene.
function depth() {
  const layers: [string, number][] = [
    ['.split__body', 128],
    ['.process__intro', 96],
    ['.process__track', 168],
    ['.closing__content', 128],
    ['.interlude', 80],
    ['.works__head', 104],
    ['.statement__label', 72],
    ['.statement__body', 144],
  ];
  const pinned = window.matchMedia('(min-width: 900px) and (min-height: 600px)').matches;
  layers.forEach(([selector, distance]) => {
    $$(selector).forEach((el) => {
      const section = el.closest<HTMLElement>('section') ?? el;
      // Sections that hold still while their text fills in keep their text in place.
      if (pinned && el.matches('.process__intro, .process__track')) return;
      if (pinned && (el.matches('.interlude') || el.matches('.statement__label, .statement__body'))) return;
      gsap.fromTo(
        el,
        { y: distance },
        {
          y: -distance,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
        },
      );
    });
  });
}

/* ---------- Images ---------- */

function images() {
  // Each frame rises into place; the subject inside grows (see subjects()).
  $$('[data-image]').forEach((frame) => {
    gsap.fromTo(
      frame,
      { y: 104 },
      { y: 0, ease: 'power2.out', scrollTrigger: { trigger: frame, start: 'top 100%', end: 'top 30%', scrub: 0.6 } },
    );
  });

  // Slow drift inside the frame while it crosses the screen.
  $$('[data-parallax]').forEach((layer) => {
    gsap.fromTo(
      layer,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: layer.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });
}

/* ---------- Works: sideways gallery ---------- */

function works() {
  const section = $('[data-works]');
  const track = $('[data-works-track]');
  const current = $('[data-works-current]');
  if (!section || !track) return;
  const cards = $$('[data-card]', section);

  gsap.from(cards, {
    y: 40,
    autoAlpha: 0,
    duration: 1.8,
    ease: 'expo.out',
    stagger: 0.1,
    scrollTrigger: { trigger: section, start: 'top 65%', once: true },
  });

  // Desktop: the section holds still and vertical scrolling moves the row.
  // Touch screens keep the native sideways swipe.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (hover: hover) and (pointer: fine)', () => {
    section.classList.add('is-pinned');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const slide = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        refreshPriority: 1,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!current) return;
          const index = Math.min(cards.length, Math.floor(self.progress * cards.length) + 1);
          current.textContent = pad(index);
        },
      },
    });

    // The pieces grow as they slide across; the background of each card stays put.
    cards.forEach((card) => {
      const subject = card.querySelector<HTMLElement>('[data-subject]');
      if (subject) grow(subject, { trigger: card, containerAnimation: slide, start: 'left 100%', end: 'left 30%' }, 1.64);
    });

    return () => {
      section.classList.remove('is-pinned');
      gsap.set(track, { clearProps: 'transform' });
    };
  });
}

/* ---------- Commission: four scenes that cut into one another ---------- */

function commission() {
  const section = $('#commission');
  const track = $('[data-process-track]');
  const intro = $('[data-process-intro]');
  if (!section || !track || !intro) return;
  const steps = $$('.step', track);
  const thread = $('[data-process-thread]', track);
  const mm = gsap.matchMedia();

  // Large screens: the section holds still and plays like a short film. The title
  // fades out, then each step arrives as its own scene (the illustration is stitched
  // in, the words rise, the background turns to the step's colour) and cuts to the next.
  mm.add('(min-width: 900px) and (min-height: 600px)', () => {
    section.classList.add('is-stage');
    const bar = $('[data-process-bar]', section);
    const dots = $$('[data-process-dot]', section);
    const object = $('.process__object', section);
    const colours = ['#242120', '#1a2638', '#3a1a19', '#242120'];
    const wordsOf = (step: HTMLElement) => Array.from(step.querySelectorAll('.step__num, .step__title, .step__body'));
    const po = (name: string) => section.querySelector<SVGElement>(`[data-po="${name}"]`);
    const parts = {
      all: po('all'),
      envBack: po('env-back'),
      envFront: po('env-front'),
      pocket: po('pocket'),
      flap: po('flap'),
      seal: po('seal'),
      piece: po('piece'),
      sheet: po('sheet'),
      motif: po('motif'),
      hoop: po('hoop-parts'),
      ring: po('inner-ring'),
      screw: po('screw'),
      flower: po('flower'),
      needle: po('needle'),
      parcel: po('parcel'),
      speed: po('speed'),
    };
    if (!object || Object.values(parts).some((part) => !part)) return;
    const P = parts as Record<keyof typeof parts, SVGElement>;
    const flowerPetals = Array.from(P.flower.children);

    // Starting states.
    gsap.set(section, { backgroundColor: colours[0] });
    gsap.set(steps, { autoAlpha: 0 });
    steps.forEach((step) => gsap.set(wordsOf(step), { y: 36, opacity: 0 }));
    gsap.set(dots, { opacity: 0.35 });
    if (bar) gsap.set(bar, { scaleX: 0 });
    gsap.set(object, { autoAlpha: 0 });
    gsap.set([P.envBack, P.envFront], { opacity: 0, scale: 0.6, transformOrigin: '50% 50%' });
    gsap.set(P.flap, { transformOrigin: '50% 0%', scaleY: 1 });
    gsap.set(P.motif, { opacity: 0 });
    gsap.set([P.hoop, P.needle, P.parcel], { opacity: 0 });
    gsap.set(flowerPetals, { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(P.piece, { transformOrigin: '50% 50%' });
    gsap.set(P.needle, { x: 40, y: -30 });
    gsap.set(P.parcel, { scale: 0.7, transformOrigin: '50% 50%' });
    gsap.set(P.all, { transformOrigin: '50% 50%' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=640%',
        pin: true,
        scrub: 0.9,
        refreshPriority: 1,
        invalidateOnRefresh: true,
      },
    });

    // The title leaves first.
    tl.to(intro, { autoAlpha: 0, y: -70, scale: 1.06, filter: 'blur(14px)', ease: 'power2.in', duration: 0.5 }, 0.55);

    const first = 1.0;
    // How long each scene lasts. Making is the longest, so the embroidery can be seen
    // being finished and admired before it is wrapped up.
    const lengths = [1.3, 1.3, 3.2, 1.9];
    const starts = lengths.map((_, i) => first + lengths.slice(0, i).reduce((a, b) => a + b, 0));
    const at = (i: number) => starts[i];

    // Words and background: one scene per step.
    steps.forEach((step, i) => {
      const words = wordsOf(step);
      tl.set(step, { autoAlpha: 1 }, at(i));
      tl.to(section, { backgroundColor: colours[i], ease: 'none', duration: 0.6 }, at(i));
      tl.to(words, { y: 0, opacity: 1, ease: 'power3.out', duration: 0.45, stagger: 0.08 }, at(i) + 0.15);
      if (dots[i]) tl.to(dots[i], { opacity: 1, duration: 0.2 }, at(i));
      if (i < steps.length - 1) {
        const out = at(i) + lengths[i] - 0.12;
        tl.to(words, { y: -34, opacity: 0, ease: 'power2.in', duration: 0.3, stagger: 0.04 }, out);
        tl.set(step, { autoAlpha: 0 }, out + 0.45);
      }
    });

    // The object. 1 Inquiry: an envelope arrives and its flap opens.
    const s1 = at(0);
    tl.to(object, { autoAlpha: 1, duration: 0.3 }, s1);
    tl.to([P.envBack, P.envFront], { opacity: 1, scale: 1, ease: 'back.out(1.4)', duration: 0.6 }, s1);
    tl.to(P.seal, { scale: 0, transformOrigin: '50% 50%', ease: 'power2.in', duration: 0.25 }, s1 + 0.75);
    tl.to(P.flap, { scaleY: -1, ease: 'power2.inOut', duration: 0.5 }, s1 + 0.85);

    // 2 Consultation: the sheet slides out, the envelope drops away and the sheet grows.
    const s2 = at(1);
    tl.to(P.sheet, { attr: { y: 50 }, ease: 'power2.out', duration: 0.7 }, s2 - 0.3);
    tl.to([P.envBack, P.envFront], { y: 90, opacity: 0, scale: 0.9, ease: 'power2.in', duration: 0.55 }, s2 + 0.3);
    tl.to(P.sheet, { attr: { x: 60, y: 90, width: 280, height: 220 }, ease: 'power3.inOut', duration: 0.7 }, s2 + 0.35);
    tl.to(P.motif, { opacity: 1, duration: 0.4 }, s2 + 0.8);

    // 3 Making: the sheet turns into a hoop and the flower is stitched in with a needle.
    const s3 = at(2);
    tl.to(P.motif, { opacity: 0, duration: 0.3 }, s3 - 0.1);
    tl.to(P.sheet, { attr: { x: 95, y: 95, width: 210, height: 210, rx: 105 }, stroke: '#ece6d8', strokeWidth: 8, fill: 'rgba(46,42,40,0)', ease: 'power3.inOut', duration: 0.8 }, s3);
    tl.set(P.sheet, { strokeDasharray: '1 0' }, s3 + 0.4);
    tl.to(P.hoop, { opacity: 1, duration: 0.3 }, s3 + 0.55);
    tl.to(P.needle, { opacity: 1, x: 0, y: 0, ease: 'power2.out', duration: 0.5 }, s3 + 0.6);
    // The needle pricks in and out as each petal is stitched.
    flowerPetals.forEach((petal, k) => {
      const t = s3 + 0.95 + k * 0.32;
      tl.to(P.needle, { x: -16, y: 12, ease: 'power1.in', duration: 0.1 }, t - 0.1);
      tl.to(petal, { scale: 1, ease: 'back.out(2)', duration: 0.3 }, t);
      tl.to(P.needle, { x: 0, y: 0, ease: 'power1.out', duration: 0.12 }, t + 0.04);
    });
    // The needle leaves and the finished piece gets a soft glint, then rests.
    tl.to(P.needle, { x: 180, y: -130, opacity: 0, ease: 'power2.in', duration: 0.6 }, s3 + 2.65);
    tl.to(P.ring, { stroke: '#f2d58a', strokeWidth: 5, ease: 'power1.inOut', duration: 0.35, yoyo: true, repeat: 1 }, s3 + 2.7);

    // 4 Delivery: the finished piece is wrapped and sent away.
    const s4 = at(3);
    tl.to(P.piece, { scale: 0.55, ease: 'power3.inOut', duration: 0.6 }, s4);
    tl.to(P.parcel, { opacity: 1, scale: 1, ease: 'back.out(1.6)', duration: 0.6 }, s4 + 0.25);
    tl.to(P.piece, { opacity: 0, duration: 0.3 }, s4 + 0.5);
    tl.set(P.speed, { opacity: 0 }, s4);
    tl.to(P.speed, { opacity: 1, duration: 0.2 }, s4 + 1.0);
    // The parcel flies on until it touches the right edge of the window, and the timeline
    // (and so the pinned section) ends at that moment: the page scrolls on straight away.
    tl.to(
      P.all,
      {
        x: () => {
          const box = object.getBoundingClientRect();
          // Pixels from the centre of the object to the window edge, in drawing units.
          const toEdge = window.innerWidth - (box.left - Number(gsap.getProperty(object, 'x')) + box.width / 2);
          return (toEdge * 400) / box.width - 40;
        },
        y: 140,
        rotation: 6,
        scale: 0.7,
        ease: 'power2.in',
        duration: 0.9,
      },
      s4 + 1.0,
    );

    const last = at(steps.length - 1);
    if (bar) tl.to(bar, { scaleX: 1, ease: 'none', duration: last - first }, first);

    return () => {
      section.classList.remove('is-stage');
      gsap.set([section, steps, intro, track, object, Object.values(P)], { clearProps: 'all' });
    };
  });

  // Small screens and short windows: the four steps stay on the page as a diagram, and
  // a stitched thread is drawn through them while each one comes alive in turn.
  mm.add('(max-width: 899px), (max-height: 599px)', () => {
    if (!thread || steps.length === 0) return;
    const vertical = () => window.matchMedia('(max-width: 860px)').matches;
    gsap.from(intro.children, {
      y: 36,
      autoAlpha: 0,
      duration: 1.6,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: intro, start: 'top 85%', once: true },
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: track, start: 'top 78%', end: 'bottom 62%', scrub: 0.7, invalidateOnRefresh: true },
    });
    const arts = steps.map((step) => step.querySelector('.step__art')).filter(Boolean) as Element[];
    const icons = steps.map((step) => step.querySelector('.step-icon')).filter(Boolean) as Element[];
    gsap.set(thread, { scaleX: vertical() ? 1 : 0, scaleY: vertical() ? 0 : 1 });
    gsap.set(arts, { scale: 0.55, opacity: 0 });
    gsap.set(icons, { clipPath: 'inset(-10% 100% -10% -10%)' });
    gsap.set(steps.flatMap((step) => Array.from(step.querySelectorAll('.step__num, .step__title, .step__body'))), {
      y: 26,
      opacity: 0,
    });
    tl.to(thread, { scaleX: 1, scaleY: 1, ease: 'none', duration: 1 }, 0);
    steps.forEach((step, i) => {
      const at = (i / steps.length) * 0.82;
      const art = step.querySelector('.step__art');
      const icon = step.querySelector('.step-icon');
      const words = step.querySelectorAll('.step__num, .step__title, .step__body');
      if (art) tl.to(art, { scale: 1, opacity: 1, ease: 'power2.out', duration: 0.16 }, at);
      if (icon) tl.to(icon, { clipPath: 'inset(-10% -10% -10% -10%)', ease: 'none', duration: 0.2 }, at + 0.02);
      tl.to(words, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.18, stagger: 0.03 }, at + 0.1);
    });
  });
}

/* ---------- Start ---------- */

history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

smoothScroll();
menu();
anchors();

// Wait for the fonts so lines and words are measured at their real size.
const fontsReady = Promise.race([document.fonts.ready, new Promise((resolve) => setTimeout(resolve, 1500))]);

fontsReady.then(() => {
  header();
  if (!reduce) {
    intro();
    heroScroll();
    text();
    images();
    subjects();
    depth();
    works();
    commission();
  } else {
    $('[data-intro]')?.remove();
  }
  ScrollTrigger.refresh();
});

window.addEventListener('load', () => ScrollTrigger.refresh());
