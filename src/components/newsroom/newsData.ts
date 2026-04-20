
import { NewsItem } from "./types";

// Array of news items with diverse content
export const newsItems: NewsItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1623177579213-7efd0e3c936c?q=80&w=1000&auto=format&fit=crop",
    category: "ESG Initiative",
    date: "May 12, 2023",
    title: "Company XYZ Launches Carbon Neutrality Program",
    summary: "Company XYZ has announced a comprehensive carbon neutrality program, aiming to eliminate its carbon footprint by 2030. The initiative includes investments in renewable energy, reforestation projects, and a complete overhaul of its supply chain operations.",
    authorAvatar: "/lovable-uploads/dda040f3-1903-42ce-8353-38437cdfb687.png",
    authorName: "Company XYZ"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1473893604213-3df9c15611c0?q=80&w=1000&auto=format&fit=crop",
    category: "Renewable Energy",
    date: "June 3, 2023",
    title: "SunPower Corp Expands Solar Panel Recycling Initiative",
    summary: "SunPower Corporation has announced the expansion of its industry-leading solar panel recycling program, aiming to reuse or recycle 100% of panel materials by 2025. This circular economy approach addresses end-of-life solar panel waste.",
    authorAvatar: "/lovable-uploads/77de6351-2f0b-46e0-9492-34f7f0bbf4c5.png",
    authorName: "SunPower Corp"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop",
    category: "Social Impact",
    date: "July 18, 2023",
    title: "GreenTech Initiative Brings Clean Water to Rural Communities",
    summary: "GreenTech's new water purification technology has been deployed in 50 rural communities across Southeast Asia, providing clean drinking water to over 100,000 people. The solar-powered systems require minimal maintenance and use locally sourced materials.",
    authorAvatar: "/lovable-uploads/624a17aa-7d5d-43ab-b570-6125b1bf6599.png",
    authorName: "GreenTech Solutions"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=1000&auto=format&fit=crop",
    category: "Sustainable Agriculture",
    date: "August 5, 2023",
    title: "AgriTech Develops AI-Powered Crop Management System",
    summary: "AgriTech has unveiled an artificial intelligence system that reduces water usage by 40% while increasing crop yields. The technology monitors soil conditions, weather patterns, and plant health to optimize resource allocation and minimize environmental impact.",
    authorAvatar: "/lovable-uploads/4be2e00f-693c-4dd3-be7d-8a3ddce5c065.png",
    authorName: "AgriTech Innovations"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000&auto=format&fit=crop",
    category: "Corporate Responsibility",
    date: "September 22, 2023",
    title: "Retail Giant Commits to Zero Waste Operations by 2028",
    summary: "One of the world's largest retail chains has pledged to achieve zero waste across all operations within five years. The comprehensive strategy includes packaging redesign, supply chain optimization, and innovative recycling partnerships with local communities.",
    authorAvatar: "/lovable-uploads/70245805-0d4d-40c4-a0fd-3bb7a89fe469.png",
    authorName: "Global Retail Solutions"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?q=80&w=1000&auto=format&fit=crop",
    category: "Biodiversity",
    date: "October 10, 2023",
    title: "Conservation Fund Launches $500M Rainforest Protection Initiative",
    summary: "The Global Conservation Fund has secured $500 million to protect critical rainforest ecosystems in South America and Southeast Asia. The project will preserve biodiversity hotspots while creating sustainable economic opportunities for indigenous communities.",
    authorAvatar: "/lovable-uploads/9d3899a5-75ba-4db8-997c-7a8570e933ef.png",
    authorName: "Global Conservation Fund"
  }
];

// News items for ESG tab
export const esgNewsItems: NewsItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1508614999368-9260051292e5?q=80&w=1000&auto=format&fit=crop",
    category: "ESG Initiative",
    date: "May 12, 2023",
    title: "New ESG Reporting Standards Announced",
    summary: "The International Sustainability Standards Board (ISSB) has released new ESG reporting standards aimed at providing investors with more consistent, complete, comparable, and verifiable sustainability information.",
    authorAvatar: "/lovable-uploads/dda040f3-1903-42ce-8353-38437cdfb687.png",
    authorName: "ISSB"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1601574115390-005d805b195a?q=80&w=1000&auto=format&fit=crop",
    category: "ESG Initiative",
    date: "June 15, 2023",
    title: "Global ESG Investment Reaches Record $35 Trillion",
    summary: "ESG investments have reached an all-time high of $35 trillion globally, representing more than a third of all professionally managed assets. The surge reflects growing investor concern about climate change and social issues.",
    authorAvatar: "/lovable-uploads/64bf3f4b-fc78-489a-8ff5-4ec2e9fe9032.png",
    authorName: "Investment Trends"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    category: "ESG Initiative",
    date: "July 2, 2023",
    title: "Study Shows ESG-Focused Companies Outperform Peers",
    summary: "A new five-year study has found that companies with strong ESG practices demonstrated better financial performance, with 17% higher returns compared to industry peers. The research examined over 1,000 public companies across 15 sectors.",
    authorAvatar: "/lovable-uploads/fd0533df-ac10-4352-8b0a-d1313ab064bb.png",
    authorName: "ESG Research Institute"
  }
];

// News items for Partners tab
export const partnersNewsItems: NewsItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1000&auto=format&fit=crop",
    category: "Strategic Partnership",
    date: "April 5, 2023",
    title: "EcoSolutions Partners with Global Tech Giant on Carbon Capture",
    summary: "EcoSolutions has announced a strategic partnership with a leading tech company to develop and deploy advanced carbon capture technology. The collaboration aims to remove 1 million tons of CO2 from the atmosphere annually by 2025.",
    authorAvatar: "/lovable-uploads/1fd9e26c-a56f-4870-a728-f8fa7142e383.png",
    authorName: "EcoSolutions"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582213782179-e0d4d3cce33a?q=80&w=1000&auto=format&fit=crop",
    category: "Partnership Announcement",
    date: "July 8, 2023",
    title: "Renewable Alliance Forms to Accelerate Clean Energy Transition",
    summary: "Five major energy companies have formed the Renewable Alliance, a collaborative initiative aimed at accelerating the transition to clean energy. The partnership will invest $2 billion in wind, solar, and energy storage projects over the next decade.",
    authorAvatar: "/lovable-uploads/819dade2-f0a4-42b3-acf3-3f4c9f613307.png",
    authorName: "Renewable Alliance"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop",
    category: "Partnership Expansion",
    date: "August 21, 2023",
    title: "GreenFinance Expands Partnership Network to 50 Countries",
    summary: "GreenFinance has expanded its sustainable investment partnership network to cover 50 countries across six continents. The expansion will enable the company to connect investors with environmentally responsible projects in emerging markets.",
    authorAvatar: "/lovable-uploads/b67bd8ef-4464-49b8-a9ee-eacb70704a06.png",
    authorName: "GreenFinance"
  }
];

// News items for Missions tab
export const missionsNewsItems: NewsItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1456086272967-b61175b57845?q=80&w=1000&auto=format&fit=crop",
    category: "New Mission",
    date: "March 15, 2023",
    title: "Ocean Cleanup Mission Launches in Pacific Garbage Patch",
    summary: "The Pacific Cleanup Initiative has launched its most ambitious mission to date, deploying advanced collection systems to remove plastic waste from the Great Pacific Garbage Patch. The two-year mission aims to collect over 50,000 tons of debris.",
    authorAvatar: "/lovable-uploads/de0442a2-ab25-4aae-b0a6-5c090891c79a.png",
    authorName: "Pacific Cleanup Initiative"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1000&auto=format&fit=crop",
    category: "Mission Success",
    date: "June 11, 2023",
    title: "Reforestation Mission Completes Planting of 5 Million Trees",
    summary: "The Amazon Restoration Mission has successfully completed its five-year initiative to plant 5 million native trees across previously deforested areas. The project engaged over 10,000 volunteers and restored approximately 12,000 acres of rainforest.",
    authorAvatar: "/lovable-uploads/fd0208b4-d298-404c-ab23-20985febf041.png",
    authorName: "Amazon Restoration"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=1000&auto=format&fit=crop",
    category: "Mission Expansion",
    date: "September 3, 2023",
    title: "Clean Water Mission Extends to 15 Additional Countries",
    summary: "The Global Water Access Project is expanding its clean water mission to 15 additional countries in Africa and Southeast Asia. The initiative will construct sustainable water collection and purification systems, benefiting an estimated 3 million people.",
    authorAvatar: "/lovable-uploads/7c3b40ae-21de-42f7-a399-eaec5c015399.png",
    authorName: "Global Water Access Project"
  }
];

// News items for Events tab
export const eventsNewsItems: NewsItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    category: "Upcoming Conference",
    date: "October 5, 2023",
    title: "Global Sustainability Summit to Host 150 World Leaders",
    summary: "The annual Global Sustainability Summit will bring together 150 world leaders, corporate executives, and environmental experts to discuss climate action strategies. The three-day conference in Geneva will feature keynote speeches, panel discussions, and networking events.",
    authorAvatar: "/lovable-uploads/ec917126-d060-45e5-bd90-cb0b702e4cfb.png",
    authorName: "Global Sustainability Alliance"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
    category: "Virtual Event",
    date: "November 12, 2023",
    title: "EcoTech Innovation Showcase Goes Virtual for Global Audience",
    summary: "The prestigious EcoTech Innovation Showcase is transitioning to a virtual format this year to accommodate a global audience. The event will feature demonstrations of groundbreaking environmental technologies from startups and established companies alike.",
    authorAvatar: "/lovable-uploads/ec57a2e2-967a-4284-ac97-783fc2573244.png",
    authorName: "EcoTech Association"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
    category: "Annual Awards",
    date: "December 8, 2023",
    title: "Sustainable Business Awards to Honor Environmental Leadership",
    summary: "The 15th annual Sustainable Business Awards will recognize outstanding corporate environmental leadership across 12 categories. The gala event in New York City will highlight innovative approaches to sustainability challenges and celebrate measurable impact.",
    authorAvatar: "/lovable-uploads/a65eccb4-8790-4e65-a49e-acb1aceeb283.png",
    authorName: "Sustainable Business Foundation"
  }
];
