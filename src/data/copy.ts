// All the words on the site, in English and Korean. The design, photographs and motion
// are shared; only the text differs. Edit a sentence here and it changes on that
// language's page only. Values in [BRACKETS] are not decided yet (see site.ts).
//
// The Korean text is a first draft: have a native speaker and Mi-ae Park confirm it,
// above all the biography and her official title (marked "CONFIRM").

import { site } from './site';

export type Locale = 'en' | 'ko';

const en = {
  lang: 'en',
  path: '',
  title: 'ARAM — Korean silk embroidery by Mi-ae Park',
  description:
    'Traditional Korean silk embroidery by Mi-ae Park, stitched by hand in Gochang, Korea, and made to commission.',
  badge: 'Preview · temporary images',
  menu: 'Menu',
  menuClose: 'Close',
  homeLabel: 'ARAM, home',
  nav: [
    { label: 'Works', href: '#works' },
    { label: 'The master', href: '#master' },
    { label: 'Commission', href: '#commission' },
    { label: 'Journal', href: '#jasu' },
  ],
  inquiry: 'Inquiry',
  institutions: 'For institutions',
  hero: {
    eyebrow: 'Korean traditional embroidery',
    title: 'Silk embroidery by Mi-ae Park, made to commission',
    cta: 'Begin a commission',
    corner: 'Gochang, Korea',
    scroll: 'Scroll',
  },
  craft: {
    aria: 'The craft of jasu',
    label: ['The craft', '자수'],
    sentences: [
      'Jasu is the Korean art of stitching coloured silk thread onto silk.',
      'Recorded since the Three Kingdoms period, it grew into two traditions: gungsu, made in the royal court, and minsu, made in homes and local workshops.',
      'Mi-ae Park carries the minsu tradition into the present.',
    ],
    link: 'Read the Journal',
  },
  master: {
    label: ['The master', '장인'],
    name: 'Mi-ae Park',
    nameSub: '박미애 · 호 아람',
    text: "Mi-ae Park has practiced traditional embroidery for more than 45 years. She is the third generation of her family in the craft and took over the family workshop in Gochang from her mother in 1990. She trained under Han Sang-soo, the first embroidery master named a holder of Korea's national intangible heritage.",
    facts: [
      ['Practice', 'More than 45 years'],
      ['Workshop', 'Gochang, third generation'],
      ['Recognition', 'Heritage holder, Jeonbuk, 2022'],
    ],
    link: 'Read her story',
  },
  stitch: { aria: 'Stitch by stitch', ko: '한 땀, 한 땀', en: 'Stitch by Stitch' },
  works: {
    label: ['Works', '작품'],
    title: 'Designs to commission',
    link: 'View all works',
    region: 'Works. Scroll horizontally.',
    items: [
      { title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'Cranes and pine embroidered on indigo silk' },
      { title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'A pair of embroidered pillow ends on crimson silk' },
      { title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'An embroidered wrapping cloth on yellow silk' },
      { title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'Flowers and butterflies embroidered on a jade-green screen panel' },
      { title: '[Work title]', meta: '[Size] · silk thread on silk', alt: 'An embroidered silk pouch with a tassel' },
    ],
  },
  making: {
    label: ['The making', '제작'],
    title: 'About six months of handwork goes into every piece',
    text: 'The design is drawn onto silk stretched on a wooden frame, then filled stitch by stitch in silk thread. Progress photographs are shared along the way.',
    link: 'How a commission works',
  },
  commission: {
    label: ['Commission', '주문'],
    title: 'How a commission works',
    text: 'Every piece is made to order, and only a limited number of commissions are accepted each year.',
    steps: [
      { title: 'Inquiry', body: 'Tell us about the space, the occasion and the design you have in mind.' },
      { title: 'Consultation', body: 'Choose a design and agree on colour, size and any inscription. You receive a written quote.' },
      { title: 'Making', body: `A deposit of ${site.deposit} begins the work. Progress photographs are shared over about six months.` },
      { title: 'Delivery', body: 'The finished work ships insured, signed and numbered, with a certificate of authenticity.' },
    ],
  },
  closing: {
    label: 'Inquiry',
    title: 'Commission a work',
    text: `Commissions from ${site.priceFrom}. Larger works are quoted individually.`,
    consultation: 'Request a consultation',
    institutions: 'For institutions',
  },
  footer: {
    blurb: 'Korean traditional embroidery by Mi-ae Park, made to commission in Gochang, Korea.',
    location: 'Gochang, Jeonbuk, Korea',
  },
};

const ko: typeof en = {
  lang: 'ko',
  path: 'ko/',
  title: 'ARAM — 박미애의 한국 전통 자수',
  description: '박미애가 전북 고창에서 한 땀 한 땀 수놓는 한국 전통 비단 자수. 주문을 받아 만듭니다.',
  badge: '미리보기 · 임시 이미지',
  menu: '메뉴',
  menuClose: '닫기',
  homeLabel: 'ARAM, 홈',
  nav: [
    { label: '작품', href: '#works' },
    { label: '장인', href: '#master' },
    { label: '주문', href: '#commission' },
    { label: '저널', href: '#jasu' },
  ],
  inquiry: '문의',
  institutions: '기관 문의',
  hero: {
    eyebrow: '한국 전통 자수',
    title: '박미애의 비단 자수, 주문으로 완성합니다',
    cta: '주문 시작하기',
    corner: '전북 고창',
    scroll: '스크롤',
  },
  craft: {
    aria: '자수 이야기',
    label: ['자수', 'The craft'],
    sentences: [
      '자수는 색실로 비단 위에 바늘땀을 놓는 한국의 전통 공예입니다.',
      '삼국시대부터 기록이 전해지며, 궁중에서 만든 궁수와 가정과 공방에서 이어 온 민수, 두 갈래로 발전했습니다.',
      '박미애는 민수의 전통을 오늘로 잇고 있습니다.',
    ],
    link: '저널 읽기',
  },
  master: {
    label: ['장인', 'The master'],
    name: '박미애',
    nameSub: 'Mi-ae Park · 호 아람',
    // CONFIRM with Mi-ae Park: every fact below was written from press coverage.
    text: '박미애는 45년 넘게 전통 자수를 해 왔습니다. 가업을 잇는 3대째 자수장으로, 1990년 어머니에게서 고창의 가족 공방을 이어받았습니다. 국가무형유산 자수장 보유자로 처음 인정된 한상수 선생에게 사사했습니다.',
    facts: [
      ['수련', '45년 이상'],
      ['공방', '고창, 3대째'],
      // CONFIRM the official Korean title; the designating body is Jeonbuk Special Self-Governing Province.
      ['인정', '전북특별자치도 무형유산 보유자, 2022'],
    ],
    link: '장인 이야기 보기',
  },
  stitch: { aria: '한 땀 한 땀', ko: '한 땀, 한 땀', en: 'Stitch by Stitch' },
  works: {
    label: ['작품', 'Works'],
    title: '주문 제작 도안',
    link: '모든 작품 보기',
    region: '작품 목록. 가로로 스크롤하세요.',
    items: [
      { title: '[작품명]', meta: '[크기] · 비단에 명주실', alt: '남색 비단에 수놓은 학과 소나무' },
      { title: '[작품명]', meta: '[크기] · 비단에 명주실', alt: '연지색 비단에 수놓은 한 쌍의 베갯모' },
      { title: '[작품명]', meta: '[크기] · 비단에 명주실', alt: '노란 비단에 수놓은 보자기' },
      { title: '[작품명]', meta: '[크기] · 비단에 명주실', alt: '옥색 병풍 판에 수놓은 꽃과 나비' },
      { title: '[작품명]', meta: '[크기] · 비단에 명주실', alt: '술이 달린 수놓은 비단 주머니' },
    ],
  },
  making: {
    label: ['제작', 'The making'],
    title: '작품 하나에 약 여섯 달의 손길이 들어갑니다',
    text: '도안을 나무틀에 팽팽히 건 비단 위에 그린 뒤, 명주실로 한 땀 한 땀 채워 갑니다. 제작하는 동안 진행 사진을 보내 드립니다.',
    link: '주문 과정 보기',
  },
  commission: {
    label: ['주문', 'Commission'],
    title: '주문은 이렇게 진행됩니다',
    text: '모든 작품은 주문을 받아 만들며, 한 해에 받을 수 있는 주문은 한정되어 있습니다.',
    steps: [
      { title: '문의', body: '작품을 놓을 공간과 용도, 마음에 두신 도안을 알려 주세요.' },
      { title: '상담', body: '도안을 고르고 색, 크기, 문구를 정합니다. 서면 견적을 받으시게 됩니다.' },
      { title: '제작', body: `계약금 ${site.deposit}를 받고 제작을 시작합니다. 약 여섯 달 동안 진행 사진을 보내 드립니다.` },
      { title: '전달', body: '완성된 작품은 보험에 가입해 배송하며, 서명과 번호, 진품 보증서가 함께 갑니다.' },
    ],
  },
  closing: {
    label: '문의',
    title: '작품 주문하기',
    text: `주문은 ${site.priceFrom}부터 시작합니다. 더 큰 작품은 따로 견적을 드립니다.`,
    consultation: '상담 요청하기',
    institutions: '기관 문의',
  },
  footer: {
    blurb: '박미애의 한국 전통 자수. 전북특별자치도 고창에서 주문을 받아 만듭니다.',
    location: '전북특별자치도 고창',
  },
};

export const copy = { en, ko } as const;
export type Copy = typeof en;
