export interface SdgItem {
  id: number;
  name: string;
  key: string;
}

export const SDGs: SdgItem[] = [
  { id: 1, name: "No Poverty", key: "no_poverty" },
  { id: 2, name: "Zero Hunger", key: "zero_hunger" },
  { id: 3, name: "Good Health and Well-being", key: "good_health_and_well_being" },
  { id: 4, name: "Quality Education", key: "quality_education" },
  { id: 5, name: "Gender Equality", key: "gender_equality" },
  { id: 6, name: "Clean Water and Sanitation", key: "clean_water_and_sanitation" },
  { id: 7, name: "Affordable and Clean Energy", key: "affordable_and_clean_energy" },
  { id: 8, name: "Decent Work and Economic Growth", key: "decent_work_and_economic_growth" },
  { id: 9, name: "Industry, Innovation, and Infrastructure", key: "industry_innovation_and_infrastructure" },
  { id: 10, name: "Reduced Inequality", key: "reduced_inequality" },
  { id: 11, name: "Sustainable Cities and Communities", key: "sustainable_cities_and_communities" },
  { id: 12, name: "Responsible Consumption and Production", key: "responsible_consumption_and_production" },
  { id: 13, name: "Climate Action", key: "climate_action" },
  { id: 14, name: "Life Below Water", key: "life_below_water" },
  { id: 15, name: "Life on Land", key: "life_on_land" },
  { id: 16, name: "Peace, Justice, and Strong Institutions", key: "peace_justice_and_strong_institutions" },
  { id: 17, name: "Partnerships for the Goals", key: "partnerships_for_the_goals" },
];
