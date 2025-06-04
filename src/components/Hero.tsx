
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-700 to-brand-900 bg-clip-text text-transparent">
            Transforme seus PDFs em 
            <span className="block">Flipbooks Interativos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Crie catálogos digitais impressionantes com efeito de virar página, 
            zoom interativo e compartilhamento instantâneo. Perfeito para empresas 
            que querem se destacar no digital.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link to="/dashboard">
            <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-full border-2 border-brand-200 hover:border-brand-300">
            <Play className="mr-2 h-5 w-5" />
            Ver Demo
          </Button>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border">
            <div className="bg-gradient-to-br from-brand-50 to-blue-50 rounded-xl p-8 aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-12 w-12 text-brand-600" />
                </div>
                <p className="text-brand-700 font-medium">Prévia do Flipbook Interativo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
