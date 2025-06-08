import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { createMockCatalogs } from "@/utils/mockData";

interface Catalog {
  id: string;
  title: string;
  description: string;
  brand: string;
  uploadDate: string;
  status: string;
  slug: string;
  fileSize: string;
  pages: number;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    // Criar dados de exemplo se não existirem
    createMockCatalogs();
    loadCatalogs();
  }, []);

  const loadCatalogs = () => {
    const storedCatalogs = localStorage.getItem('catalogos_data');
    if (storedCatalogs) {
      const catalogsData: Catalog[] = JSON.parse(storedCatalogs);
      const convertedCatalogs = catalogsData.filter((catalog: Catalog) => catalog.status === 'converted');
      setCatalogs(convertedCatalogs);
      
      // Extrair marcas únicas
      const uniqueBrands = [...new Set(convertedCatalogs.map((catalog: Catalog) => catalog.brand))];
      setBrands(uniqueBrands);
    } else {
      // Adicionar dados de exemplo se não houver catálogos
      const sampleCatalogs = [
        {
          id: "1",
          title: "Catálogo de Teste",
          description: "Catálogo de demonstração do sistema",
          brand: "teste",
          uploadDate: new Date().toISOString(),
          status: "converted",
          slug: "teste",
          fileSize: "0.6 MB",
          pages: 110,
          fileName: "teste.pdf"
        }
      ];
      localStorage.setItem('catalogos_data', JSON.stringify(sampleCatalogs));
      setCatalogs(sampleCatalogs);
      setBrands(["teste"]);
    }
  };

  const filteredCatalogs = catalogs.filter(catalog =>
    catalog.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    catalog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      
      {/* Seção de Busca e Catálogos */}
      <section id="marcas" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossos Catálogos
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore nossos catálogos digitais por marca
            </p>
            
            {/* Barra de Pesquisa */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar marcas ou catálogos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>
            </div>
          </div>

          {/* Resultados da Busca */}
          {searchTerm && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Resultados para "{searchTerm}":
              </h3>
              {filteredBrands.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2 text-gray-700">Marcas encontradas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {filteredBrands.map((brand, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchTerm(brand)}
                        className="text-brand-600 border-brand-200 hover:bg-brand-50"
                      >
                        {brand}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Grid de Catálogos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCatalogs.length > 0 ? (
              filteredCatalogs.map((catalog) => (
                <Card key={catalog.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {catalog.title}
                        </h3>
                        <p className="text-sm font-medium text-brand-600 mb-2">
                          {catalog.brand}
                        </p>
                        <p className="text-gray-600 text-sm mb-4">
                          {catalog.description}
                        </p>
                      </div>
                      <BookOpen className="h-8 w-8 text-brand-600 flex-shrink-0" />
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{catalog.pages} páginas</span>
                      <span>{catalog.fileSize}</span>
                    </div>
                    
                    <Link to={`/visualizar/${catalog.slug}`}>
                      <Button className="w-full bg-brand-600 hover:bg-brand-700">
                        <Eye className="h-4 w-4 mr-2" />
                        Visualizar Catálogo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : catalogs.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum catálogo disponível
                </h3>
                <p className="text-gray-600">
                  Os catálogos aparecerão aqui assim que forem adicionados pelos administradores.
                </p>
              </div>
            ) : (
              <div className="col-span-full text-center py-12">
                <Search className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600">
                  Tente buscar por outro termo ou marca.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
