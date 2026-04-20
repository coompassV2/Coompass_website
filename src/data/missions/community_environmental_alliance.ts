import { Mission } from "@/types/organization";

/** Missions created by the demo nonprofit (Community Environmental Alliance). */
export const community_environmental_alliance: Mission[] = [
  {
    id: "cea-1",
    title: "Urban Tree Planting",
    organization: "Community Environmental Alliance",
    description: "Plant and maintain trees in urban areas to improve air quality and green spaces.",
    hours: 8,
    volunteers: 15,
    location: "In-Person",
    postedDate: "1 week ago",
    isActive: true,
    causes: ["Environment", "Community"],
    skills: ["Gardening", "Organization"],
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=CEA1"
  },
  {
    id: "cea-2",
    title: "Coastal Cleanup Day",
    organization: "Community Environmental Alliance",
    description: "Monthly beach and coastal cleanup to remove plastic and debris.",
    hours: 4,
    volunteers: 30,
    location: "In-Person",
    postedDate: "3 days ago",
    isActive: true,
    causes: ["Environment"],
    skills: ["Environmental Awareness", "Teamwork"],
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=CEA2"
  },
  {
    id: "cea-3",
    title: "Environmental Education Workshop",
    organization: "Community Environmental Alliance",
    description: "One-day workshop for schools on recycling and sustainability.",
    hours: 6,
    volunteers: 5,
    location: "In-Person",
    postedDate: "2 weeks ago",
    isActive: false,
    causes: ["Education", "Environment"],
    skills: ["Teaching", "Communication"],
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=CEA3"
  }
];
