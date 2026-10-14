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
  title: 'ARAM',
  description:
    'Traditional Korean embroidery, stitched by hand by a master in Gochang, Korea, and made to commission.',
  badge: 'Preview · temporary images',
  menu: 'Menu',
  menuClose: 'Close',
  homeLabel: 'ARAM, home',
  nav: [
    { label: 'Works', key: 'works' },
    { label: 'The master', key: 'master' },
    { label: 'Commission', key: 'commission' },
    { label: 'Journal', key: 'journal' },
  ],
  inquiry: 'Inquiry',
  hero: {
    eyebrow: 'Korean traditional embroidery',
    title: "A master’s embroidery",
    cta: 'Begin a commission',
    corner: 'Gochang, Korea',
    scroll: 'Scroll',
  },
  craft: {
    aria: 'The craft of jasu',
    label: ['The craft', '자수'],
    sentences: [
      'Jasu is the Korean art of embroidering with coloured thread.',
      'Recorded since the Three Kingdoms period, it grew into two traditions: gungsu, made in the royal court, and minsu, made in homes and local workshops.',
      'The master carries the minsu tradition into the present.',
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
      { title: '[Work title]', meta: '[Size] · embroidery', alt: 'Cranes and pine embroidered on indigo cloth' },
      { title: '[Work title]', meta: '[Size] · embroidery', alt: 'A pair of embroidered pillow ends on crimson cloth' },
      { title: '[Work title]', meta: '[Size] · embroidery', alt: 'An embroidered wrapping cloth in yellow' },
      { title: '[Work title]', meta: '[Size] · embroidery', alt: 'Flowers and butterflies embroidered on a jade-green screen panel' },
      { title: '[Work title]', meta: '[Size] · embroidery', alt: 'An embroidered pouch with a tassel' },
    ],
  },
  commission: {
    label: ['Commission', '주문'],
    title: 'How a commission works',
    text: 'Every piece is made to order and can take six months or more.',
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
  },
  pages: {
    back: 'Back to home',
    journal: {
      title: 'Journal',
      label: ['Journal', '저널'],
      lead: 'Notes on jasu, the Korean art of embroidery, and the people who keep it.',
      entries: [
        {
          title: 'What is jasu?',
          paragraphs: [
            'Jasu is the Korean art of embroidering with coloured thread.',
            'It has been recorded since the Three Kingdoms period. Over time it grew into two traditions: gungsu, made in the royal court, and minsu, made in homes and local workshops.',
            'Mi-ae Park carries the minsu tradition into the present, in the family workshop in Gochang.',
          ],
        },
        // The entries below were written from press coverage and a Gochang County blog report.
        // CONFIRM each fact with Mi-ae Park before the site goes public.
        {
          title: 'Three generations in Gochang',
          paragraphs: [
            'The Gochang line of embroidery began with Kang Ji-san, passed to her daughter Choi In-sun, and then to Park Mi-ae. Together they span more than a century.',
            'Choi In-sun first learned embroidery at school in 1940 and trained in Seoul, where she opened a workshop in 1964. In 1972 she returned to Gochang and opened a workshop in a converted hanok, employing around twenty local women.',
            'Park Mi-ae began learning in her mother’s workshop in 1977, helped run it from 1978, and took it over in 1990. Four successors now carry the line.',
          ],
        },
        {
          title: 'Gungsu and minsu, both',
          paragraphs: [
            'Minsu was the first thing she learned. It was embroidered by women outside the court for pictures, screens and pillow ends: everyday pieces without polish, but with a plain, honest charm.',
            'Gungsu, the court tradition, came through her older sister Park Seong-hui, who trained under Han Yeong-hwa and Han Sang-soo. Gungsu was made by the royal embroidery office, to strict patterns and with great precision.',
            'Park Mi-ae later worked in both masters’ workshops, restoring court embroidery. Few makers can restore both traditions.',
          ],
        },
        {
          title: 'The third public demonstration, 2024',
          paragraphs: [
            'From 25 to 29 November 2024, Mi-ae Park and her successors held their third public demonstration at the Gochang Culture Hall, under the title “Dreaming of the student surpassing the teacher”. Entry was free.',
            'The exhibition showed court and folk pieces side by side: eight-panel screens, pillows, rank badges, knotted tassels and sewing boxes, with work by the successors alongside.',
          ],
        },
        {
          title: 'Still to be stitched',
          paragraphs: [
            'There are pieces she has not yet embroidered. She hopes to restore court screens such as the eight-panel flower-and-bird screen and the bookshelf screen, and to recreate the rank badges once sewn onto Joseon officials’ robes.',
            'She also wants to remake the wedding pillows of the folk tradition, and to put the story of the Gochang line into a book.',
          ],
        },
      ],
      more: 'More entries will follow.',
      cta: 'Meet the master',
    },
    master: {
      title: 'Mi-ae Park',
      label: ['The master', '장인'],
      sub: '박미애 · 호 아람',
      lead: 'A third-generation embroiderer in Gochang, Korea.',
      // CONFIRM with Mi-ae Park: every fact below was written from press coverage.
      story: [
        'Mi-ae Park has practiced traditional embroidery for more than 45 years. She is the third generation of her family in the craft.',
        'In 1990 she took over the family workshop in Gochang from her mother. She trained under Han Sang-soo, the first embroidery master named a holder of Korea’s national intangible heritage.',
        'In 2022 she was recognised as a heritage holder of embroidery in Jeonbuk.',
      ],
      quote: { text: 'Embroidery is my whole life.', source: 'Mi-ae Park, Daedong Munhwa, no. 137 (2023)' },
      timelineTitle: 'Lineage',
      timeline: [
        ['First generation', 'Kang Ji-san, her grandmother'],
        ['Second generation', 'Choi In-sun, her mother'],
        ['Third generation', 'Park Mi-ae'],
        ['Today', 'Four successors carry the line'],
      ],
      // From press coverage and a Gochang County blog report. CONFIRM with Mi-ae Park.
      career: {
        biography: {
          title: 'Biography',
          items: [
            ['1977', 'Begins learning embroidery and knotting in her mother’s workshop'],
            ['1983', 'Works in Han Yeong-hwa’s workshop on court embroidery'],
            ['1987', 'Works in Han Sang-soo’s workshop on court and original pieces'],
            ['1990', 'Takes over the Gochang workshop from her mother'],
            ['2019', 'Registers the business as Gochang Traditional Embroidery'],
            ['2022', 'Designated a heritage holder of embroidery, Jeonbuk'],
            ['2022', 'Certified a Thousand-Year Family House of Jeonbuk'],
          ],
        },
        exhibitions: {
          title: 'Exhibitions',
          items: [
            ['1984–2019', 'Six family exhibitions'],
            ['1996', 'Kintetsu Department Store, Osaka, Japan'],
            ['1998', 'Korea Trade Fair, Qingdao, China'],
            ['2019', 'Jeonbuk–New Jersey sister-state exhibition, New Jersey, USA'],
            ['2019', 'Solo show, “Gochang Traditional Embroidery with a Story”'],
            ['2021', 'Solo show, “Stitch by Stitch, Carrying On the Master’s Path”'],
            ['2024', 'Third public demonstration, Gochang Culture Hall'],
          ],
        },
      },
      cta: 'Request a consultation',
    },
    inquiry: {
      title: 'Request a consultation',
      label: ['Inquiry', '문의'],
      lead: 'Tell us about the space, the occasion and the design you have in mind. We reply by email, and a written quote follows the consultation.',
      note: `Commissions from ${site.priceFrom}. Larger works are quoted individually.`,
      formTitle: 'Send an inquiry',
      tabs: [
        { label: 'For yourself or a collection', note: 'Tell us about the space, the occasion and the design you have in mind.' },
        { label: 'For an institution', note: 'For museums, universities and companies. Tell us about the place the work is intended for and what you need.' },
      ],
    },
    form: {
      required: 'Required',
      optional: 'Optional',
      send: 'Send inquiry',
      sending: 'Sending…',
      sent: 'Thank you. Your inquiry has been sent. We will reply by email.',
      error: 'Something went wrong and the inquiry was not sent. Please try again.',
      notConnected: 'The form is not connected yet, so nothing was sent. Please try again soon.',
      invalid: 'Please complete the required fields.',
      consultation: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'country', label: 'Country', type: 'text', required: false },
        { name: 'design', label: 'Design you have in mind', type: 'text', required: false },
        { name: 'size', label: 'Approximate size', type: 'text', required: false },
        { name: 'space', label: 'Space and occasion', type: 'textarea', required: true },
        { name: 'message', label: 'Anything else (colours, inscription, timing)', type: 'textarea', required: false },
      ],
      institutions: [
        { name: 'organisation', label: 'Organisation', type: 'text', required: true },
        { name: 'name', label: 'Your name', type: 'text', required: true },
        { name: 'role', label: 'Your role', type: 'text', required: false },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'country', label: 'Country', type: 'text', required: false },
        { name: 'type', label: 'Type of organisation', type: 'select', required: true, options: ['Museum or gallery', 'University or school', 'Company', 'Other'] },
        { name: 'project', label: 'The project and where the work will be placed', type: 'textarea', required: true },
        { name: 'timing', label: 'Timing', type: 'text', required: false },
        { name: 'message', label: 'Anything else', type: 'textarea', required: false },
      ],
    },
  },
  footer: {
    blurb: 'Korean traditional embroidery by a master, made to commission in Gochang, Korea.',
    location: 'Gochang, Jeonbuk, Korea',
  },
};

const ko: typeof en = {
  lang: 'ko',
  path: 'ko/',
  title: 'ARAM',
  description: '전북 고창에서 장인이 한 땀 한 땀 수놓는 한국 전통 자수. 주문을 받아 만듭니다.',
  badge: '미리보기 · 임시 이미지',
  menu: '메뉴',
  menuClose: '닫기',
  homeLabel: 'ARAM, 홈',
  nav: [
    { label: '작품', key: 'works' },
    { label: '장인', key: 'master' },
    { label: '주문', key: 'commission' },
    { label: '저널', key: 'journal' },
  ],
  inquiry: '문의',
  hero: {
    eyebrow: '한국 전통 자수',
    title: 'A master’s embroidery',
    cta: '주문 시작하기',
    corner: '전북 고창',
    scroll: '스크롤',
  },
  craft: {
    aria: '자수 이야기',
    label: ['자수', 'The craft'],
    sentences: [
      '자수는 색실로 바늘땀을 놓아 무늬를 수놓는 한국의 전통 공예입니다.',
      '삼국시대부터 기록이 전해지며, 궁중에서 만든 궁수와 가정과 공방에서 이어 온 민수, 두 갈래로 발전했습니다.',
      '장인은 민수의 전통을 오늘로 잇고 있습니다.',
    ],
    link: '저널 읽기',
  },
  master: {
    label: ['장인', 'The master'],
    name: '박미애',
    nameSub: 'Mi-ae Park · 호 아람',
    // CONFIRM with Mi-ae Park: every fact below was written from press coverage.
    text: '박미애 자수장은 45년 넘게 전통 자수를 해 왔습니다. 가업을 잇는 3대째 자수장으로, 1990년 어머니에게서 고창의 가족 공방을 이어받았습니다. 국가무형유산 자수장 보유자로 처음 인정된 한상수 선생에게 사사했습니다.',
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
      { title: '[작품명]', meta: '[크기] · 자수', alt: '남색 천에 수놓은 학과 소나무' },
      { title: '[작품명]', meta: '[크기] · 자수', alt: '연지색 천에 수놓은 한 쌍의 베갯모' },
      { title: '[작품명]', meta: '[크기] · 자수', alt: '노란색 보자기에 놓은 수' },
      { title: '[작품명]', meta: '[크기] · 자수', alt: '옥색 병풍 판에 수놓은 꽃과 나비' },
      { title: '[작품명]', meta: '[크기] · 자수', alt: '술이 달린 수놓은 주머니' },
    ],
  },
  commission: {
    label: ['주문', 'Commission'],
    title: '주문은 이렇게 진행됩니다',
    text: '모든 작품은 주문 제작되며 6개월 이상 기간이 소요될 수 있습니다.',
    steps: [
      { title: '문의', body: '작품을 놓을 공간과 용도, 마음에 두신 도안을 알려 주세요.' },
      { title: '상담', body: '도안을 고르고 색, 크기, 문구를 정합니다. 서면 견적을 받으시게 됩니다.' },
      { title: '제작', body: `계약금 ${site.deposit}를 받고 제작을 시작합니다. 약 여섯 달 동안 진행 사진을 보내 드립니다.` },
      { title: '배송', body: '완성된 작품은 보험에 가입해 배송하며, 서명과 번호, 진품 보증서가 함께 갑니다.' },
    ],
  },
  closing: {
    label: '문의',
    title: '작품 주문하기',
    text: `주문은 ${site.priceFrom}부터 시작합니다. 더 큰 작품은 따로 견적을 드립니다.`,
    consultation: '상담 요청하기',
  },
  pages: {
    back: '홈으로',
    journal: {
      title: '저널',
      label: ['저널', 'Journal'],
      lead: '한국의 전통 공예 자수와 그것을 이어 가는 사람들에 대한 기록입니다.',
      entries: [
        {
          title: '자수란 무엇인가',
          paragraphs: [
            '자수는 색실로 바늘땀을 놓아 무늬를 수놓는 한국의 전통 공예입니다.',
            '삼국시대부터 기록이 전해지며, 궁중에서 만든 궁수와 가정과 공방에서 이어 온 민수, 두 갈래로 발전했습니다.',
            '박미애 장인은 고창의 가족 공방에서 민수의 전통을 오늘로 잇고 있습니다.',
          ],
        },
        // 아래 글은 언론 보도와 고창군 블로그 기사를 바탕으로 썼습니다. 공개 전에 박미애 장인께 사실 확인(CONFIRM) 필요.
        {
          title: '고창에서 이어진 3대',
          paragraphs: [
            '고창 자수의 맥은 외할머니 강지산 선생에서 어머니 최인순 선생으로, 그리고 박미애 장인으로 이어졌습니다. 100년이 넘는 세월입니다.',
            '최인순 선생은 1940년 학교에서 처음 자수를 배웠고, 서울에서 정식으로 자수를 익혀 1964년 공방을 열었습니다. 1972년 고창으로 돌아와 한옥을 고쳐 공방을 열고, 고창 주변의 여성 20여 명과 함께 일했습니다.',
            '박미애 장인은 1977년 어머니의 공방에서 본격적으로 자수를 배우기 시작해 1978년부터 공방 운영에 참여했고, 1990년 공방을 이어받았습니다. 지금은 4명의 이수자가 그 맥을 잇고 있습니다.',
          ],
        },
        {
          title: '민수와 궁수를 모두',
          paragraphs: [
            '처음 배운 것은 민수였습니다. 민수는 궁궐 밖 부녀자들이 액자와 병풍, 베갯모 등에 놓던 자수로, 세련됨보다는 소박하고 단순한 아름다움이 있습니다.',
            '궁수는 언니 박성희 선생을 통해 배웠습니다. 박성희 선생은 한영화, 한상수 선생에게 궁수를 배운 분입니다. 궁수는 궁중의 수방에서 조선시대 내내 이어진 기술로, 정해진 양식에 따라 정교하고 치밀하게 수를 놓았습니다.',
            '박미애 장인은 이후 두 선생의 공방에서 일하며 궁수 유물 복원 작업을 했습니다. 민수와 궁수를 모두 복원할 수 있는 장인은 많지 않습니다.',
          ],
        },
        {
          title: '제3회 공개시연회, 2024',
          paragraphs: [
            '2024년 11월 25일부터 29일까지 고창 문화의 전당에서 박미애 장인과 이수자들의 제3회 공개시연회가 열렸습니다. 주제는 ‘청출어람을 꿈꾸며’였고, 관람은 무료였습니다.',
            '전시장에는 궁중과 민가의 자수가 함께 놓였습니다. 8폭 병풍, 베개, 흉배, 노리개, 반짇고리와 함께 이수자들의 작품도 만날 수 있었습니다.',
          ],
        },
        {
          title: '아직 수놓지 못한 작품',
          paragraphs: [
            '아직 수놓지 못한 작품이 있습니다. 화조 8폭 병풍과 책가도 같은 궁중 병풍 유물을 복원하고, 조선시대 관복에 붙이던 흉배를 재현해 보고 싶다고 합니다.',
            '또 민수의 혼수 전통베개를 다시 만들고, 고창 자수의 이야기를 한 권의 책으로 엮는 것도 바라고 있습니다.',
          ],
        },
      ],
      more: '앞으로 글이 더 올라옵니다.',
      cta: '장인 만나기',
    },
    master: {
      title: '박미애',
      label: ['장인', 'The master'],
      sub: 'Mi-ae Park · 호 아람',
      lead: '전북 고창의 3대째 자수장입니다.',
      // CONFIRM with Mi-ae Park: every fact below was written from press coverage.
      story: [
        '박미애 자수장은 45년 넘게 전통 자수를 해 왔습니다. 가업을 잇는 3대째 자수장입니다.',
        '1990년 어머니에게서 고창의 가족 공방을 이어받았습니다. 국가무형유산 자수장 보유자로 처음 인정된 한상수 선생에게 사사했습니다.',
        '2022년 전북특별자치도 자수 보유자로 인정되었습니다.',
      ],
      quote: { text: '자수는 제 삶의 전부입니다.', source: '박미애, <대동문화> 137호 (2023)' },
      timelineTitle: '계보',
      timeline: [
        ['1대', '외할머니 강지산'],
        ['2대', '어머니 최인순'],
        ['3대', '박미애'],
        ['현재', '4명의 이수자가 맥을 잇고 있음'],
      ],
      // 언론 보도와 고창군 블로그 기사 기준. 박미애 장인께 확인(CONFIRM) 필요.
      career: {
        biography: {
          title: '약력',
          items: [
            ['1977', '어머니의 공방에서 전통자수와 전통매듭을 배우기 시작'],
            ['1983', '한영화 선생 공방에서 궁수 유물 복원과 작품 제작'],
            ['1987', '한상수 선생 공방에서 궁수와 창작품 제작'],
            ['1990', '어머니에게서 고창 자수 공방을 인수'],
            ['2019', '‘고창전통자수’로 사업자 등록'],
            ['2022', '전북특별자치도 무형유산 자수장 보유자 인정'],
            ['2022', '전북 천년명가 인증'],
          ],
        },
        exhibitions: {
          title: '전시',
          items: [
            ['1984–2019', '가족전 6회'],
            ['1996', '일본 오사카 긴테츠백화점'],
            ['1998', '중국 칭다오 한국무역박람회'],
            ['2019', '미국 뉴저지-전북 자매결연 한스타일 전시회'],
            ['2019', '개인전 ‘이야기가 있는 고창 전통자수’'],
            ['2021', '개인전 ‘한땀 한땀 장인의 길을 잇다’'],
            ['2024', '제3회 공개시연회, 고창 문화의 전당'],
          ],
        },
      },
      cta: '상담 요청하기',
    },
    inquiry: {
      title: '상담 요청하기',
      label: ['문의', 'Inquiry'],
      lead: '작품을 놓을 공간과 용도, 마음에 두신 도안을 알려 주세요. 이메일로 답을 드리고, 상담 뒤에 서면 견적을 보내 드립니다.',
      note: `주문은 ${site.priceFrom}부터 시작합니다. 더 큰 작품은 따로 견적을 드립니다.`,
      formTitle: '문의 보내기',
      tabs: [
        { label: '개인·소장용', note: '작품을 놓을 공간과 용도, 마음에 두신 도안을 알려 주세요.' },
        { label: '기관', note: '박물관, 대학, 기업을 위한 문의입니다. 작품이 놓일 장소와 필요하신 내용을 알려 주세요.' },
      ],
    },
    form: {
      required: '필수',
      optional: '선택',
      send: '문의 보내기',
      sending: '보내는 중…',
      sent: '감사합니다. 문의가 전달되었습니다. 이메일로 답을 드리겠습니다.',
      error: '문제가 생겨 문의가 전달되지 않았습니다. 다시 시도해 주세요.',
      notConnected: '문의 양식이 아직 연결되지 않아 아무것도 전송되지 않았습니다. 잠시 뒤에 다시 시도해 주세요.',
      invalid: '필수 항목을 모두 입력해 주세요.',
      consultation: [
        { name: 'name', label: '이름', type: 'text', required: true },
        { name: 'email', label: '이메일', type: 'email', required: true },
        { name: 'country', label: '거주 국가', type: 'text', required: false },
        { name: 'design', label: '마음에 두신 도안', type: 'text', required: false },
        { name: 'size', label: '원하시는 크기', type: 'text', required: false },
        { name: 'space', label: '작품을 놓을 공간과 용도', type: 'textarea', required: true },
        { name: 'message', label: '그 밖의 내용 (색, 문구, 시기 등)', type: 'textarea', required: false },
      ],
      institutions: [
        { name: 'organisation', label: '기관명', type: 'text', required: true },
        { name: 'name', label: '담당자 이름', type: 'text', required: true },
        { name: 'role', label: '직책', type: 'text', required: false },
        { name: 'email', label: '이메일', type: 'email', required: true },
        { name: 'country', label: '국가', type: 'text', required: false },
        { name: 'type', label: '기관 유형', type: 'select', required: true, options: ['박물관·갤러리', '대학·학교', '기업', '기타'] },
        { name: 'project', label: '프로젝트와 작품이 놓일 장소', type: 'textarea', required: true },
        { name: 'timing', label: '희망 시기', type: 'text', required: false },
        { name: 'message', label: '그 밖의 내용', type: 'textarea', required: false },
      ],
    },
  },
  footer: {
    blurb: '장인의 한국 전통 자수. 전북특별자치도 고창에서 주문을 받아 만듭니다.',
    location: '전북특별자치도 고창',
  },
};

export const copy = { en, ko } as const;
export type Copy = typeof en;
