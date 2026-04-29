
// Export all missions data
import { pista_magica } from "./pista_magica";
import { cepac } from "./cepac";
import { associacao_cais } from "./associacao_cais";
import { crescer } from "./crescer";
import { gasporto } from "./gasporto";
import { albergues_do_porto } from "./albergues_do_porto";
import { apadrinha_uma_oliveira } from "./apadrinha_uma_oliveira";
import { serve_the_city } from "./serve_the_city";
import { future_leaders } from "./future_leaders";
import { clean_seas } from "./clean_seas";
import { digital_age_connect } from "./digital_age_connect";
import { example_missions } from "./example_missions";
import { community_environmental_alliance } from "./community_environmental_alliance";

// Export cause areas and skills for usage in filters
export { CAUSE_AREA_NAMES as causeAreas } from "@/data/causeAreas";

export const skills = [
  "Programming",
  "Design",
  "Writing",
  "Marketing",
  "Teaching",
  "Project Management",
  "Research",
  "Social Media",
  "Gardening",
  "Environmental Knowledge",
  "Communication",
  "Organization",
  "Logistics",
  "Mentoring",
  "Web Development",
  "Content Writing",
  "Strategy"
];

// Combine all missions into a single array
export const missions = [
  ...pista_magica,
  ...cepac,
  ...associacao_cais,
  ...crescer,
  ...gasporto,
  ...albergues_do_porto,
  ...apadrinha_uma_oliveira,
  ...serve_the_city,
  ...future_leaders,
  ...clean_seas,
  ...digital_age_connect,
  ...example_missions,
  ...community_environmental_alliance
];
