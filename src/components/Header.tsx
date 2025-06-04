
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Menu, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock brands data for search
  const brands = [
    "Marca Premium A",
    "Marca Tecnológica B", 
    "Marca Sustentável C",
    "Marca Industrial D"
  ];

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Scroll to brands section
      document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <BookOpen className="h-8 w-8 text-brand-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
            Leililind Catálogos
          </span>
        </Link>
        
        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <form onSubmit={handleSearch} className="w-full relative">
            <Input
              type="text"
              placeholder="Buscar marcas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </form>
          
          {/* Search Results Dropdown */}
          {searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      setSearchTerm("");
                      document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {brand}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500">
                  Nenhuma marca encontrada
                </div>
              )}
            </div>
          )}
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#recursos" className="text-gray-600 hover:text-brand-600 transition-colors">
            Recursos
          </a>
          <a href="#marcas" className="text-gray-600 hover:text-brand-600 transition-colors">
            Nossas Marcas
          </a>
          <a href="#contato" className="text-gray-600 hover:text-brand-600 transition-colors">
            Contato
          </a>
          <Link to="/login">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </Link>
        </nav>
        
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile Search */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => document.getElementById('marcas')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Search className="h-5 w-5" />
          </Button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg md:hidden">
            <nav className="flex flex-col p-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Buscar marcas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
              
              <a href="#recursos" className="text-gray-600 hover:text-brand-600 transition-colors">
                Recursos
              </a>
              <a href="#marcas" className="text-gray-600 hover:text-brand-600 transition-colors">
                Nossas Marcas
              </a>
              <a href="#contato" className="text-gray-600 hover:text-brand-600 transition-colors">
                Contato
              </a>
              <Link to="/login">
                <Button variant="outline" size="sm" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Login Administrativo
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
