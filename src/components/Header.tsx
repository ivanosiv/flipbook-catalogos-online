
import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <BookOpen className="h-8 w-8 text-brand-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
            Leililind Catálogos
          </span>
        </Link>
        
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
          <Link to="/dashboard">
            <Button className="bg-brand-600 hover:bg-brand-700">
              Ver Catálogos
            </Button>
          </Link>
        </nav>
        
        <div className="md:hidden flex items-center">
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
              <a href="#recursos" className="text-gray-600 hover:text-brand-600 transition-colors">
                Recursos
              </a>
              <a href="#marcas" className="text-gray-600 hover:text-brand-600 transition-colors">
                Nossas Marcas
              </a>
              <a href="#contato" className="text-gray-600 hover:text-brand-600 transition-colors">
                Contato
              </a>
              <Link to="/dashboard">
                <Button className="bg-brand-600 hover:bg-brand-700 w-full">
                  Ver Catálogos
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
