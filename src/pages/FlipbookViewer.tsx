import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowLeft, Share2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import PDFViewer from "@/components/PDFViewer";

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
  fileName?: string;
}

const FlipbookViewer = () => {
  const { slug } = useParams<{ slug: string }>();
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadCatalog(slug);
    }
  }, [slug]);

  const loadCatalog = (catalogSlug: string) => {
    try {
      const storedCatalogs = localStorage.getItem('catalogos_data');
      if (storedCatalogs) {
        const catalogs: Catalog[] = JSON.parse(storedCatalogs);
        const foundCatalog = catalogs.find(c => c.slug === catalogSlug && c.status === 'converted');
        setCatalog(foundCatalog || null);
      }
    } catch (error) {
      console.error('Erro ao carregar catálogo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: catalog?.title,
        text: catalog?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copiado!",
        description: "O link do catálogo foi copiado para a área de transferência",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto text-brand-600 animate-pulse mb-4" />
          <p className="text-gray-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  if (!catalog) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{catalog.title}</h1>
                <p className="text-sm text-gray-600">{catalog.brand}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Catalog Info */}
      <div className="bg-white border-b flex-shrink-0">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">{catalog.title}</h2>
              <p className="text-gray-600 mb-2">{catalog.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Marca: {catalog.brand}</span>
                <span>{catalog.pages} páginas</span>
                <span>{catalog.fileSize}</span>
                <span>Publicado em {new Date(catalog.uploadDate).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
          <PDFViewer 
            fileName={catalog.fileName || 'catalog.pdf'} 
            catalogTitle={catalog.title}
          />
        </div>
      </main>
    </div>
  );
};

export default FlipbookViewer;
