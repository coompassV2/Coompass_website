import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cruzVermelhaCompanies } from "@/data/cruzvermelha-companies";
import { 
  Heart, 
  Hospital, 
  Leaf, 
  Users, 
  BarChart, 
  Target, 
  TrendingUp, 
  Handshake,
  MapPin,
  Phone,
  Mail,
  Siren,
  Building2,
  FileText,
  Globe,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";

type ModalType = "about" | "partners" | "contacts" | null;

export function CruzVermelhaNavbar() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const navLinks = [
    { id: "about", label: "Sobre Nós" },
    { id: "partners", label: "Parceiros Corporativos" },
    { id: "contacts", label: "Contactos" },
  ];

  const modalContent: Record<ModalType, {
    title: string;
    description: string;
    content?: React.ReactNode;
  }> = {
    about: {
      title: "Sobre a Cruz Vermelha Portuguesa e Coompass",
      description: "Uma parceria inovadora para o voluntariado corporativo e relatórios ESG",
      content: (
        <div className="space-y-6">
          {/* Mission Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Missão
            </h3>
            <p className="text-gray-700 leading-relaxed">
              A Cruz Vermelha Portuguesa, em parceria com a Coompass, promove o voluntariado corporativo 
              como ferramenta estratégica para o desenvolvimento sustentável. Através da tecnologia 
              inovadora da Coompass, facilitamos a gestão de programas de voluntariado empresarial e 
              a geração de relatórios ESG precisos e transparentes.
            </p>
          </div>

          {/* Technology Partnership */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Tecnologia Coompass
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Gestão de Voluntariado</h4>
                <p className="text-sm text-gray-600">
                  Plataforma completa para organizar, acompanhar e medir o impacto das atividades 
                  de voluntariado corporativo.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Relatórios ESG</h4>
                <p className="text-sm text-gray-600">
                  Geração automática de relatórios ESG com métricas precisas de impacto social 
                  e ambiental.
                </p>
              </div>
            </div>
          </div>

          {/* Impact Areas */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Áreas de Impacto
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-700">Assistência Social</span>
              </div>
              <div className="flex items-center space-x-2">
                <Hospital className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">Serviços de Saúde</span>
              </div>
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Sustentabilidade</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-700">Voluntariado Jovem</span>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Valores da Parceria
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Humanidade", "Transparência", "Inovação", "Impacto Mensurável", "Sustentabilidade"].map((value) => (
                <span key={value} className="px-3 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
                  {value}
                </span>
              ))}
            </div>
          </div>
        </div>
      )
    },
    partners: {
      title: "Parceiros Corporativos",
      description: "Empresas que colaboram connosco através da plataforma Coompass para promover o voluntariado corporativo e relatórios ESG",
      content: (
        <div className="space-y-6">
          {/* Current Partners Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Parceiros Atuais
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cruzVermelhaCompanies.map((company) => (
                <div key={company.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden bg-white">
                      {company.logoImage ? (
                        <img 
                          src={company.logoImage} 
                          alt={company.name}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <span className="text-lg">{company.logo}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{company.name}</h4>
                      <p className="text-xs text-gray-500">Parceiro Ativo</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Statistics */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Impacto Coletivo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">2,500+</div>
                <div className="text-xs text-gray-600">Voluntários Ativos</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">15,000+</div>
                <div className="text-xs text-gray-600">Horas de Voluntariado</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-xs text-gray-600">Projetos Concluídos</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">10,000+</div>
                <div className="text-xs text-gray-600">Pessoas Ajudadas</div>
              </div>
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Benefícios da Parceria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BarChart className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Relatórios ESG Automatizados</h4>
                    <p className="text-xs text-gray-600">Geração automática de relatórios de impacto social e ambiental</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Gestão de Voluntariado</h4>
                    <p className="text-xs text-gray-600">Plataforma completa para organizar e acompanhar atividades</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Métricas de Impacto</h4>
                    <p className="text-xs text-gray-600">Medição precisa do impacto social das iniciativas</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Handshake className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Colaboração Simplificada</h4>
                    <p className="text-xs text-gray-600">Comunicação e coordenação eficiente entre parceiros</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 rounded-lg border border-red-200">
            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-2">Torne-se um Parceiro Corporativo</h4>
              <p className="text-sm text-gray-600 mb-3">
                Junte-se às empresas líderes que já estão a fazer a diferença através do voluntariado corporativo
              </p>
              <Button className="bg-red-500 hover:bg-red-600 text-white text-sm">
                Contactar para Parceria
              </Button>
            </div>
          </div>
        </div>
      )
    },
    contacts: {
      title: "Contactos",
      description: "Informações de contacto e escritórios regionais da Cruz Vermelha Portuguesa",
      content: (
        <div className="space-y-6">
          {/* Headquarters */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
              Sede Nacional
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Morada</h4>
                    <p className="text-xs text-gray-600">Jardim 9 de Abril, 1-5<br />1249-083 Lisboa, Portugal</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Telefone</h4>
                    <p className="text-xs text-gray-600">+351 213 913 900</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">Email Geral</h4>
                    <p className="text-xs text-gray-600">geral@cruzvermelha.pt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Offices */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              Escritórios Regionais
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Norte</h4>
                <p className="text-xs text-gray-600 mb-2">Rua do Campo Alegre, 1051<br />4150-179 Porto</p>
                <p className="text-xs text-gray-600">+351 226 001 000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Centro</h4>
                <p className="text-xs text-gray-600 mb-2">Rua da Misericórdia, 1<br />3000-012 Coimbra</p>
                <p className="text-xs text-gray-600">+351 239 851 000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Alentejo</h4>
                <p className="text-xs text-gray-600 mb-2">Rua de S. Domingos, 1<br />7000-841 Évora</p>
                <p className="text-xs text-gray-600">+351 266 001 000</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Algarve</h4>
                <p className="text-xs text-gray-600 mb-2">Rua do Hospital, 1<br />8000-386 Faro</p>
                <p className="text-xs text-gray-600">+351 289 001 000</p>
              </div>
            </div>
          </div>

          {/* Specific Contact Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Contactos Específicos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium text-red-900 text-sm mb-2 flex items-center"><Siren className="w-4 h-4 mr-2"/> Emergências 24/7</h4>
                  <p className="text-xs text-red-700 font-medium">112</p>
                  <p className="text-xs text-red-600">Número de emergência nacional</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-900 text-sm mb-2 flex items-center"><Users className="w-4 h-4 mr-2"/> Voluntariado</h4>
                  <p className="text-xs text-blue-700">voluntariado@cruzvermelha.pt</p>
                  <p className="text-xs text-blue-600">Para oportunidades de voluntariado</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h4 className="font-medium text-purple-900 text-sm mb-2 flex items-center"><Building2 className="w-4 h-4 mr-2"/> Parcerias Corporativas</h4>
                  <p className="text-xs text-purple-700">parcerias@cruzvermelha.pt</p>
                  <p className="text-xs text-purple-600">Para empresas interessadas em parcerias</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 text-sm mb-2 flex items-center"><FileText className="w-4 h-4 mr-2"/> Relatórios ESG</h4>
                  <p className="text-xs text-green-700">esg@cruzvermelha.pt</p>
                  <p className="text-xs text-green-600">Suporte técnico da plataforma Coompass</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Additional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
              Redes Sociais e Informações
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg mb-1"><Globe className="w-6 h-6 mx-auto text-gray-500" /></div>
                <p className="text-xs text-gray-600">Website</p>
                <p className="text-xs text-gray-500">cruzvermelha.pt</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg mb-1"><Facebook className="w-6 h-6 mx-auto text-gray-500" /></div>
                <p className="text-xs text-gray-600">Facebook</p>
                <p className="text-xs text-gray-500">@cruzvermelha.pt</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg mb-1"><Instagram className="w-6 h-6 mx-auto text-gray-500" /></div>
                <p className="text-xs text-gray-600">Instagram</p>
                <p className="text-xs text-gray-500">@cruzvermelha.pt</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-lg mb-1"><Twitter className="w-6 h-6 mx-auto text-gray-500" /></div>
                <p className="text-xs text-gray-600">Twitter</p>
                <p className="text-xs text-gray-500">@cruzvermelha.pt</p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Horário de Funcionamento</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <p><strong>Segunda a Sexta:</strong> 9:00 - 18:00</p>
                <p><strong>Sábado:</strong> 9:00 - 13:00</p>
              </div>
              <div>
                <p><strong>Domingo:</strong> Encerrado</p>
                <p><strong>Emergências:</strong> 24/7</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
  };

  const currentContent = activeModal ? modalContent[activeModal] : null;

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Combined Cruz Vermelha + Coompass Logo */}
          <img 
            src="/logos/cvp-coompass.png"
            alt="Cruz Vermelha + Coompass"
            className="h-12"
          />
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveModal(link.id as ModalType)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <Dialog open={!!activeModal} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {currentContent && (
            <>
              <DialogHeader>
                <DialogTitle>{currentContent.title}</DialogTitle>
                <DialogDescription>
                  {currentContent.description}
                </DialogDescription>
              </DialogHeader>
              
              {currentContent.content && (
                <div className="py-4">
                  {currentContent.content}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
} 