// All motion on the site lives here.
// Rules kept throughout: one easing family (expo.out for entrances,
// power/expo.inOut for wipes), long durations, and nothing that moves
// unless the visitor scrolls or the page has just loaded.

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // The wordmark starts large over the hero and settles into the header.
  const logo = $('[data-logo]');
  if (logo) {
    const startScale = () => {
      const target = window.innerWidth < 820 ? window.innerWidth * 0.5 : Math.min(window.innerWidth * 0.3, 460);
      return gsap.utils.clamp(1, 4.8, target / logo.offsetWidth);
    };
    gsap.fromTo(
      logo,
      { scale: startScale, y: () => (window.innerWidth < 820 ? 28 : 44) },
      {
        scale: 1,
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
    yPercent: 14,
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
  // Statement: words come up to full strength as the paragraph is read.
  $$('[data-words]').forEach((paragraph) => {
    const split = SplitText.create(paragraph.querySelectorAll('span'), { type: 'words' });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.05,
        scrollTrigger: { trigger: paragraph, start: 'top 82%', end: 'bottom 55%', scrub: 0.4 },
      },
    );
  });

  // "한 땀, 한 땀": one syllable at a time.
  $$('[data-syllables]').forEach((line) => {
    gsap.fromTo(
      line.children,
      { opacity: 0.14, y: 16 },
      {
        opacity: 1,
        y: 0,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: { trigger: line, start: 'top 84%', end: 'top 42%', scrub: 0.5 },
      },
    );
  });

  // Single elements.
  $$('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 26,
      autoAlpha: 0,
      duration: 1.5,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // Groups: children follow one another.
  $$('[data-reveal-group]').forEach((group) => {
    gsap.from(group.children, {
      y: 26,
      autoAlpha: 0,
      duration: 1.5,
      ease: 'expo.out',
      stagger: 0.09,
      scrollTrigger: { trigger: group, start: 'top 78%', once: true },
    });
  });

  // Process steps.
  $$('[data-steps]').forEach((list) => {
    gsap.from(list.children, {
      y: 22,
      autoAlpha: 0,
      duration: 1.4,
      ease: 'expo.out',
      stagger: 0.1,
      scrollTrigger: { trigger: list, start: 'top 82%', once: true },
    });
  });
}

/* ---------- Images ---------- */

function images() {
  // Wipe open from the bottom while the picture settles from a slight zoom.
  $$('[data-image]').forEach((frame) => {
    const img = frame.querySelector('img');
    const trigger = { trigger: frame, start: 'top 85%', once: true };
    gsap.fromTo(
      frame,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: trigger },
    );
    if (img) gsap.from(img, { scale: 1.2, duration: 2.4, ease: 'expo.out', scrollTrigger: trigger });
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
    duration: 1.5,
    ease: 'expo.out',
    stagger: 0.08,
    scrollTrigger: { trigger: section, start: 'top 65%', once: true },
  });

  // Desktop: the section holds still and vertical scrolling moves the row.
  // Touch screens keep the native sideways swipe.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (hover: hover) and (pointer: fine)', () => {
    section.classList.add('is-pinned');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

    gsap.to(track, {
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
    works();
  } else {
    $('[data-intro]')?.remove();
  }
  ScrollTrigger.refresh();
});

window.addEventListener('load', () => ScrollTrigger.refresh());
