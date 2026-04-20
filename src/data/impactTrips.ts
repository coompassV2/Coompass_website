
import { v4 as uuidv4 } from 'uuid';

export interface ImpactTrip {
  id: string;
  title: string;
  organization: string;
  description: string;
  duration: number;
  location: string;
  country: string;
  image: string;
  startDate: string;
  endDate: string;
  price: number;
  categories: string[];
  focus: string[];
  isActive: boolean;
}

export const tripCategories = [
  "Environmental Conservation",
  "Social Development",
  "Education",
  "Cultural Exchange",
  "Wildlife Protection",
  "Community Building",
  "Sustainable Agriculture",
  "Climate Action"
];

export const tripFocus = [
  "Marine Conservation",
  "Forest Preservation",
  "Teaching",
  "Youth Development",
  "Animal Welfare",
  "Health Support",
  "Ecological Restoration",
  "Urban Farming",
  "Community Empowerment",
  "Environmental Education"
];

export const impactTrips: ImpactTrip[] = [
  {
    id: uuidv4(),
    title: "Ocean Conservation in Portugal",
    organization: "ImpactTrip",
    description: "Help protect marine ecosystems along Portugal's beautiful coast. This program focuses on beach cleanup, monitoring marine life, and educating local communities about ocean conservation.",
    duration: 14,
    location: "Lisbon Coast",
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-06-10",
    endDate: "2025-06-24",
    price: 980,
    categories: ["Environmental Conservation", "Wildlife Protection"],
    focus: ["Marine Conservation", "Environmental Education"],
    isActive: true
  },
  {
    id: uuidv4(),
    title: "Sustainable Agriculture in Spain",
    organization: "ImpactTrip",
    description: "Learn about and contribute to sustainable farming practices in rural Spain. Work with local farmers to implement eco-friendly techniques while enjoying the beautiful Spanish countryside.",
    duration: 10,
    location: "Valencia Region",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-07-05",
    endDate: "2025-07-15",
    price: 850,
    categories: ["Sustainable Agriculture", "Environmental Conservation"],
    focus: ["Ecological Restoration", "Community Empowerment"],
    isActive: true
  },
  {
    id: uuidv4(),
    title: "Teaching Program in Greece",
    organization: "ImpactTrip",
    description: "Teach English and other subjects to children in underserved communities in Greece. This rewarding experience allows you to make a direct impact on young lives while experiencing Greek culture.",
    duration: 21,
    location: "Athens",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-08-01",
    endDate: "2025-08-22",
    price: 1200,
    categories: ["Education", "Social Development"],
    focus: ["Teaching", "Youth Development"],
    isActive: true
  },
  {
    id: uuidv4(),
    title: "Wildlife Sanctuary Volunteer in Italy",
    organization: "ImpactTrip",
    description: "Work at a wildlife sanctuary in Italy helping to care for rescued and rehabilitating animals. Learn about wildlife conservation while contributing to animal welfare.",
    duration: 12,
    location: "Tuscany",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-09-03",
    endDate: "2025-09-15",
    price: 920,
    categories: ["Wildlife Protection", "Environmental Conservation"],
    focus: ["Animal Welfare", "Environmental Education"],
    isActive: true
  },
  {
    id: uuidv4(),
    title: "Forest Conservation in France",
    organization: "ImpactTrip",
    description: "Join efforts to protect and restore forest habitats in southern France. Activities include tree planting, trail maintenance, and biodiversity monitoring.",
    duration: 14,
    location: "Provence",
    country: "France",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-05-15",
    endDate: "2025-05-29",
    price: 990,
    categories: ["Environmental Conservation", "Climate Action"],
    focus: ["Forest Preservation", "Ecological Restoration"],
    isActive: true
  },
  {
    id: uuidv4(),
    title: "Community Garden Project in Netherlands",
    organization: "ImpactTrip",
    description: "Help establish and maintain community gardens in urban areas of the Netherlands. This project combines sustainable agriculture with community building.",
    duration: 7,
    location: "Amsterdam",
    country: "Netherlands",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-06-05",
    endDate: "2025-06-12",
    price: 750,
    categories: ["Community Building", "Sustainable Agriculture"],
    focus: ["Urban Farming", "Community Empowerment"],
    isActive: true
  },
  {
    id: uuidv4(),
    title: "Cultural Heritage Preservation in Croatia",
    organization: "ImpactTrip",
    description: "Work alongside local experts to help preserve historical sites and cultural heritage in Croatia. This program includes restoration work and community engagement.",
    duration: 10,
    location: "Dubrovnik",
    country: "Croatia",
    image: "https://images.unsplash.com/photo-1555990633-d0da1b761d8c?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-07-20",
    endDate: "2025-07-30",
    price: 880,
    categories: ["Cultural Exchange", "Community Building"],
    focus: ["Community Empowerment", "Environmental Education"],
    isActive: true
  },
  {
    id: uuidv4(),
    title: "Eco-Tourism Development in Slovenia",
    organization: "ImpactTrip",
    description: "Help develop sustainable eco-tourism initiatives in Slovenia's beautiful natural areas. Focus on minimizing environmental impact while supporting local economies.",
    duration: 14,
    location: "Ljubljana & Bled",
    country: "Slovenia",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&h=600&fit=crop&crop=center",
    startDate: "2025-08-10",
    endDate: "2025-08-24",
    price: 1050,
    categories: ["Environmental Conservation", "Community Building"],
    focus: ["Environmental Education", "Community Empowerment"],
    isActive: true
  }
];
