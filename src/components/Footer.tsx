
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-brand-400" />
              <span className="text-2xl font-bold">Leililind Catálogos</span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              Escritório de representação especializado em conectar marcas e clientes 
              através de catálogos digitais interativos e modernos.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>contato@leililind.com.br</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>São Paulo - SP, Brasil</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#recursos" className="hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#marcas" className="hover:text-white transition-colors">Nossas Marcas</a></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Ver Catálogos</Link></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Representações</h3>
            <ul className="space-y-2 text-gray-400">
              <li><span className="hover:text-white transition-colors">Marca Premium A</span></li>
              <li><span className="hover:text-white transition-colors">Marca Tecnológica B</span></li>
              <li><span className="hover:text-white transition-colors">Marca Sustentável C</span></li>
              <li><span className="hover:text-white transition-colors">Marca Industrial D</span></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Leililind Catálogos. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
