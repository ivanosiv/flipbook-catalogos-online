
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Share, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Home } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const FlipbookViewer = () => {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Mock catalog data
  const catalog = {
    title: "Catálogo Primavera 2024",
    description: "Nova coleção de roupas e acessórios para a temporada",
    totalPages: 24,
    author: "Leililind Store"
  };

  // Mock pages - in reality these would be converted PDF pages
  const pages = Array.from({ length: catalog.totalPages }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://via.placeholder.com/400x600/f0f9ff/0369a1?text=Página ${i + 1}`
  }));

  const nextPage = () => {
    if (currentPage < catalog.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    if (zoom < 200) {
      setZoom(zoom + 25);
    }
  };

  const zoomOut = () => {
    if (zoom > 50) {
      setZoom(zoom - 25);
    }
  };

  const shareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description: "O link do catálogo foi copiado para a área de transferência.",
    });
  };

  const downloadPDF = () => {
    toast({
      title: "Download iniciado",
      description: "O arquivo PDF será baixado em breve.",
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFullscreen]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-brand-400 hover:text-brand-300">
              <BookOpen className="h-6 w-6" />
              <span className="font-semibold">Leililind</span>
            </Link>
            <div className="hidden md:block">
              <h1 className="text-lg font-semibold">{catalog.title}</h1>
              <p className="text-sm text-gray-400">{catalog.author}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={shareLink} className="bg-gray-700 border-gray-600 hover:bg-gray-600">
              <Share className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm" onClick={downloadPDF} className="bg-gray-700 border-gray-600 hover:bg-gray-600">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Controls */}
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="bg-gray-700 border-gray-600 hover:bg-gray-600 disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-3 py-1 bg-gray-700 rounded">
                {currentPage} / {catalog.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === catalog.totalPages}
                className="bg-gray-700 border-gray-600 hover:bg-gray-600 disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={zoomOut}
              disabled={zoom <= 50}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 disabled:opacity-50"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-3 py-1 bg-gray-700 rounded min-w-[60px] text-center">
              {zoom}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={zoomIn}
              disabled={zoom >= 200}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 disabled:opacity-50"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Flipbook Viewer */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="container mx-auto h-full flex items-center justify-center">
          <div 
            className="relative max-w-4xl mx-auto"
            style={{ transform: `scale(${zoom / 100})` }}
          >
            {/* Current Page */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="aspect-[3/4] relative group">
                <img
                  src={pages[currentPage - 1]?.imageUrl}
                  alt={`Página ${currentPage}`}
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                {/* Page Turn Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Navigation Areas */}
                <div 
                  className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-10"
                  onClick={prevPage}
                  title="Página anterior"
                />
                <div 
                  className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-10"
                  onClick={nextPage}
                  title="Próxima página"
                />
              </div>
            </div>
            
            {/* Page Info */}
            <div className="text-center mt-4">
              <p className="text-gray-400 text-sm">
                Use as setas do teclado ou clique nas laterais para navegar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Page Thumbnails */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <div className="container mx-auto">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.id)}
                className={`flex-shrink-0 w-12 h-16 rounded border-2 overflow-hidden transition-all ${
                  currentPage === page.id
                    ? 'border-brand-400 ring-2 ring-brand-400/50'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <img
                  src={page.imageUrl}
                  alt={`Página ${page.id}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipbookViewer;
