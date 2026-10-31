/**
 * project-cards.ts — card artwork and result-line keys for the case studies,
 * shared by the homepage work grid (V2Work) and /projects (V2ProjectsContent).
 * The result lines live under home.v2_result_<slug with underscores>.
 */
export const PROJECT_IMAGES: Record<string, string> = {
  'coach-luki': '/images/projects/coachluki.jpg',
  'bronco-plumbing': '/images/projects/bronco.webp',
  'coach-kofi': '/images/projects/coachkofi.webp',
  'exotic-ripz': '/images/projects/exoticripz.jpg',
  'kds-systems': '/images/projects/kdssys.webp',
  'public-affair': '/images/projects/public-affair.webp',
  'military-newschool': '/images/projects/military-newschool.webp',
  'grant-parkhurst': '/images/projects/grantparkhurst.webp',
};

export const PROJECT_RESULT_KEYS: Record<string, string> = {
  'coach-luki': 'v2_result_coach_luki',
  'bronco-plumbing': 'v2_result_bronco_plumbing',
  'coach-kofi': 'v2_result_coach_kofi',
  'exotic-ripz': 'v2_result_exotic_ripz',
  'kds-systems': 'v2_result_kds_systems',
  'public-affair': 'v2_result_public_affair',
  'military-newschool': 'v2_result_military_newschool',
  'grant-parkhurst': 'v2_result_grant_parkhurst',
};
