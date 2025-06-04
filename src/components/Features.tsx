
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Search, Download, Share2, Zap, Shield } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Catálogos Interativos",
      description: "Navegue pelos catálogos das marcas com efeito de virar página e zoom para ver detalhes dos produtos."
    },
    {
      icon: Search,
      title: "Busca Avançada",
      description: "Encontre produtos específicos rapidamente através de nossa ferramenta de busca inteligente."
    },
    {
      icon: Download,
      title: "Download PDF",
      description: "Baixe os catálogos em formato PDF para visualização offline ou impressão."
    },
    {
      icon: Share2,
      title: "Compartilhamento Fácil",
      description: "Compartilhe catálogos ou produtos específicos com clientes através de links diretos."
    },
    {
      icon: Zap,
      title: "Carregamento Rápido",
      description: "Tecnologia otimizada para carregamento rápido, mesmo em conexões mais lentas."
    },
    {
      icon: Shield,
      title: "Sempre Atualizado",
      description: "Catálogos sempre atualizados com os lançamentos mais recentes das marcas."
    }
  ];

  return (
    <section id="recursos" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
            Por que escolher nossos catálogos?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Uma experiência completa para explorar e conhecer os produtos das marcas que representamos
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
