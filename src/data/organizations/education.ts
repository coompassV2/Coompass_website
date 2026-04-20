
import { Organization } from "@/types/organization";

export const educationOrganizations: Organization[] = [
  {
    id: 1,
    name: "Center of Digital Inclusion",
    description: "Procuramos uma integração plena entre educação, tecnologia, cidadania e empreendedorismo.",
    activeMissions: 0,
    isPartner: true,
    goals: [4, 5, 8, 11, 12, 17]
  },
  {
    id: 13,
    name: "Web3EduBrasil",
    description: "Impulsionando a inovação na Web3",
    activeMissions: 0,
    isPartner: false,
    goals: [4, 5]
  },
  {
    id: 14,
    name: "Pista Mágica - Associação",
    description: "A Pista Mágica é uma associação sem fins lucrativos, reconhecida como Organização Não Governamental para o Desenvolvimento (ONGD).",
    activeMissions: 1,
    isPartner: false,
    goals: [10, 17, 16, 5, 4]
  },
  // Adding education-focused organizations
  {
    id: 4,
    name: "Uma Causa Por Dia",
    description: "Uma Causa Por Dia é um projecto sem fins lucrativos, focado na comunicação e conscienclialização.",
    activeMissions: 0,
    isPartner: false,
    goals: [4, 16, 13, 17]
  },
  {
    id: 7,
    name: "CAID",
    description: "CAID",
    activeMissions: 0,
    isPartner: false,
    goals: [3, 4, 10, 17]
  }
];
