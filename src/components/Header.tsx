
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <a href="#como-funciona" className="text-gray-600 hover:text-brand-600 transition-colors">
            Como Funciona
          </a>
          <Link to="/login">
            <Button variant="outline" className="mr-2">
              Entrar
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-brand-600 hover:bg-brand-700">
              Dashboard
            </Button>
          </Link>
        </nav>
        
        <div className="md:hidden">
          <Link to="/login">
            <Button size="sm" className="bg-brand-600 hover:bg-brand-700">
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
