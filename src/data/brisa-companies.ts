
export interface Company {
  id: string;
  name: string;
  logo: string;
  logoImage?: string;
  color: string;
}

export const brisaCompanies: Company[] = [
  {
    id: "via-verde",
    name: "Via Verde",
    logo: "V",
    logoImage: "/lovable-uploads/cf00282f-5f52-47a5-8a35-932c882157ef.png",
    color: "bg-green-600"
  },
  {
    id: "brisa",
    name: "Brisa",
    logo: "📍",
    logoImage: "/lovable-uploads/5f73c561-5fd8-4021-81ac-8e5f8d9c5642.png",
    color: "bg-yellow-500"
  },
  {
    id: "controlauto",
    name: "Controlauto",
    logo: "C",
    logoImage: "/lovable-uploads/18f1d911-ccbe-4692-a3fc-57908a2baf0d.png",
    color: "bg-gray-700"
  },
  {
    id: "colibri",
    name: "Colibri",
    logo: "🌿",
    logoImage: "/lovable-uploads/87249fee-bffb-4102-a888-a85e6d427008.png",
    color: "bg-green-500"
  },
  {
    id: "a-to-be",
    name: "A-To-Be",
    logo: "🔒",
    logoImage: "/lovable-uploads/ed8686da-eeb0-479b-bb68-0509ccd0e480.png",
    color: "bg-blue-600"
  }
];
