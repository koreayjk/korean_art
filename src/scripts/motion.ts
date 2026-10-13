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
  toggle.textContent = open ? 'Close' : 'Menu';
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
        ? { trigger: section, start: 'center center', end: '+=90%', pin: true, scrub: 0.5 }
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
        ? { trigger: section, start: 'center center', end: '+=70%', pin: true, scrub: 0.5 }
        : { trigger: stitch, start: 'top 84%', end: 'top 30%', scrub: 0.5 };
    const dissolve = { opacity: 0, filter: 'blur(10px)' };
    const clear = { opacity: 1, filter: 'blur(0px)', ease: 'none', duration: 1 };
    const tl = gsap.timeline({ scrollTrigger });
    tl.fromTo(stitch, dissolve, clear, 0);
    if (english) tl.fromTo(english, dissolve, clear, 0.4);
    if (thread) tl.fromTo(thread, { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0);
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
    ['.process__list', 168],
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
  } else {
    $('[data-intro]')?.remove();
  }
  ScrollTrigger.refresh();
});

window.addEventListener('load', () => ScrollTrigger.refresh());
