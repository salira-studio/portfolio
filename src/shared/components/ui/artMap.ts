/**
 * Maps a food image path (e.g. /food/ghee-roast-dosa.jpg) to the
 * illustrated archetype used when no photograph is present.
 */
import type { Archetype } from './dishArtParts'

const MAP: Record<string, Archetype> = {
  hero: 'dosa',
  kitchen: 'kitchen',
  'ghee-roast-dosa': 'dosa',
  'masala-dosa': 'dosa',
  'paper-roast-dosa': 'dosa',
  'mysore-masala-dosa': 'dosa',
  'rava-dosa': 'dosa',
  idli: 'idli',
  'medu-vada': 'vada',
  'upma-kichadi': 'upma',
  'kongu-chicken-biryani': 'biryani',
  'veg-biryani': 'biryani-veg',
  'lemon-rice': 'rice',
  'curd-rice': 'rice-curd',
  puliyodarai: 'rice-tamarind',
  'south-indian-meals': 'meals',
  'nonveg-meals': 'meals',
  thali: 'meals',
  'chicken-65': 'starter',
  'pepper-chicken': 'starter-pepper',
  'chicken-sukka': 'starter-sukka',
  'mutton-chukka': 'starter-sukka',
  'paneer-ghee-roast': 'starter-paneer',
  'gobi-65': 'starter-gobi',
  sambar: 'soup',
  rasam: 'soup-rasam',
  'boondi-raita': 'raita',
  appalam: 'appalam',
  'oorga-pickle': 'pickle',
  'filter-coffee': 'tumbler-coffee',
  'masala-chai': 'tumbler-chai',
  'neer-mor': 'tumbler-white',
  'tender-coconut': 'coconut',
  'lime-soda': 'soda',
  'rose-milk': 'rose-milk',
  'tender-coconut-payasam': 'payasam',
  kesari: 'kesari',
  'gulab-jamun': 'jamun',
  'mysore-pak': 'mysore-pak',
}

export function artFor(src: string): Archetype {
  const slug = src.replace(/^.*\//, '').replace(/\.[a-z]+$/i, '')
  return MAP[slug] ?? 'dosa'
}
