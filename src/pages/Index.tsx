
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Mail, Phone, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const brands = [
    {
      name: "Marca Premium A",
      description: "Produtos de alta qualidade para segmento premium",
      catalogCount: 3,
      category: "Premium"
    },
    {
      name: "Marca Tecnológica B",
      description: "Soluções inovadoras e tecnológicas",
      catalogCount: 5,
      category: "Tecnologia"
    },
    {
      name: "Marca Sustentável C",
      description: "Produtos eco-friendly e sustentáveis",
      catalogCount: 2,
      category: "Sustentabilidade"
    },
    {
      name: "Marca Industrial D",
      description: "Equipamentos e soluções industriais",
      catalogCount: 4,
      category: "Industrial"
    }
  ];

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    brand.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <Hero />
      <Features />
      
      {/* Brands Section */}
      <section id="marcas" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
              Nossas Marcas Representadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Trabalhamos com as principais marcas do mercado, oferecendo qualidade e inovação
            </p>
            
            {/* Search Bar for Brands */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Buscar por marca, categoria ou produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          {searchTerm && (
            <div className="text-center mb-6">
              <p className="text-gray-600">
                {filteredBrands.length === 0 
                  ? "Nenhuma marca encontrada" 
                  : `${filteredBrands.length} marca${filteredBrands.length !== 1 ? 's' : ''} encontrada${filteredBrands.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBrands.map((brand, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-brand-100 text-brand-700 text-xs rounded-full">
                      {brand.category}
                    </span>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-800">{brand.name}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {brand.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-brand-600 font-medium mb-3">
                    {brand.catalogCount} catálogos disponíveis
                  </p>
                  <Link to="/dashboard">
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Catálogos
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* No Results Message */}
          {searchTerm && filteredBrands.length === 0 && (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Marca não encontrada
                </h3>
                <p className="text-gray-600 mb-4">
                  Não encontramos nenhuma marca que corresponda à sua busca.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                >
                  Ver todas as marcas
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
              Entre em Contato
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fale conosco para mais informações sobre nossos produtos e representações
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Telefone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">(11) 99999-9999</p>
                <p className="text-gray-600">(11) 3333-3333</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">contato@leililind.com.br</p>
                <p className="text-gray-600">vendas@leililind.com.br</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Endereço</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">São Paulo - SP</p>
                <p className="text-gray-600">Brasil</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
