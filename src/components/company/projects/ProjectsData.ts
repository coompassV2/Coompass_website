import type { CompanyProject } from "./types";

export const allProjects: CompanyProject[] = [
  {
    id: "1",
    title: "Campanha de Sensibilização ESG",
    description: "Iniciativa organizacional para sensibilizar sobre práticas ambientais, sociais e de governança",
    startDate: "Mar 15, 2025",
    endDate: "Jun 30, 2025",
    progress: 45,
    employees: 18,
    partners: 3,
    category: "Parceria estratégica",
    status: "active",
    nonprofits: ["Crescer", "Pista Mágica"],
    invitedParticipants: [1, 2, 3],
    district: "Lisboa",
    projectMode: "presencial",
    periodicidade: "recorrente",
    causes: ["Ambiente", "Governança"]
  },
  {
    id: "2",
    title: "Transição para Energias Renováveis",
    description: "Iniciativa empresarial para transição das instalações para fontes de energia renovável",
    startDate: "Feb 10, 2025",
    endDate: "Dec 15, 2025",
    progress: 30,
    employees: 12,
    partners: 2,
    category: "Voluntariado",
    status: "active",
    nonprofits: ["Clean Seas"],
    invitedParticipants: [4, 5],
    district: "Porto",
    projectMode: "presencial",
    periodicidade: "pontual",
    causes: ["Ambiente"]
  },
  {
    id: "3",
    title: "Programa de Literacia Digital",
    description: "Ensino de competências digitais a comunidades carenciadas através de voluntariado de colaboradores",
    startDate: "Apr 5, 2025",
    endDate: "Aug 20, 2025",
    progress: 65,
    employees: 25,
    partners: 4,
    category: "Workshop",
    status: "active",
    nonprofits: ["Digital Age Connect", "CEPAC"],
    invitedParticipants: [7, 8],
    district: "Coimbra",
    projectMode: "virtual",
    periodicidade: "recorrente",
    causes: ["Educação", "Inclusão"]
  },
  {
    id: "4",
    title: "Auditoria de Sustentabilidade da Cadeia de Abastecimento",
    description: "Análise abrangente das práticas dos fornecedores para garantir standards de sustentabilidade",
    startDate: "Jan 20, 2025",
    endDate: "Mar 30, 2025",
    progress: 100,
    employees: 10,
    partners: 0,
    category: "Parceria estratégica",
    status: "completed",
    nonprofits: [],
    endedAt: "2025-03-30T23:59:59.000Z",
    readyForReport: true,
    district: "Braga",
    projectMode: "presencial",
    periodicidade: "pontual",
    causes: ["Sustentabilidade"]
  },
  {
    id: "5",
    title: "Iniciativa de Saúde Mental dos Colaboradores",
    description: "Programa para apoiar o bem-estar mental e o equilíbrio entre vida profissional e pessoal",
    startDate: "Nov 5, 2024",
    endDate: "Feb 28, 2025",
    progress: 100,
    employees: 40,
    partners: 1,
    category: "Inclusão e diversidade",
    status: "completed",
    nonprofits: ["Associacao CAIS"],
    endedAt: "2025-02-28T23:59:59.000Z",
    readyForReport: true,
    district: "Setúbal",
    projectMode: "presencial",
    periodicidade: "recorrente",
    causes: ["Saúde", "Bem-estar"]
  },
];

export function getProjectById(
  projects: CompanyProject[],
  id: string | number
): CompanyProject | undefined {
  const sid = String(id);
  return projects.find((p) => String(p.id) === sid);
}

export function filterProjects(
  projects: CompanyProject[],
  status: string,
  searchQuery: string
): CompanyProject[] {
  return projects.filter((project) => {
    const matchesStatus = project.status === status;
    if (!matchesStatus) return false;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
}
