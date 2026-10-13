// Addresses of every page, in both languages. The home page sections (works, commission)
// are anchors on the home page; on the home page itself they stay in-page links so they
// scroll smoothly instead of reloading.
import { copy, type Locale } from './copy';

export type LinkKey = 'home' | 'works' | 'commission' | 'master' | 'journal' | 'inquiry' | 'institutions';

const slugs: Record<LinkKey, string> = {
  home: '',
  works: '',
  commission: '',
  master: 'master/',
  journal: 'journal/',
  inquiry: 'inquiry/',
  institutions: 'institutions/',
};

export function url(locale: Locale, key: LinkKey, onHome = false): string {
  const base = import.meta.env.BASE_URL;
  const home = `${base}${copy[locale].path}`;
  if (key === 'works' || key === 'commission') return onHome ? `#${key}` : `${home}#${key}`;
  if (key === 'home') return onHome ? '#top' : home;
  return `${home}${slugs[key]}`;
}
