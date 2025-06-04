
import { Upload, BookOpen, Share, Shield, Zap, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload Simples",
      description: "Faça upload de PDFs em segundos e veja a conversão automática para flipbook"
    },
    {
      icon: BookOpen,
      title: "Flipbook Interativo",
      description: "Efeito realista de virar páginas, zoom, navegação e experiência imersiva"
    },
    {
      icon: Share,
      title: "Compartilhamento Fácil",
      description: "Links únicos para cada catálogo, fácil compartilhamento em redes sociais"
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Seus arquivos protegidos com criptografia e backup automático"
    },
    {
      icon: Zap,
      title: "Conversão Rápida",
      description: "Processamento em tempo real, seu flipbook fica pronto em minutos"
    },
    {
      icon: Users,
      title: "Analytics Integrado",
      description: "Acompanhe visualizações, tempo de leitura e engajamento dos usuários"
    }
  ];

  return (
    <section id="recursos" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Recursos Poderosos para seu Negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tudo que você precisa para criar catálogos digitais profissionais
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30">
              <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-200 transition-colors">
                <feature.icon className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
