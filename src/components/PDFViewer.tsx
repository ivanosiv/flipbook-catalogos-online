
import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Configurar o worker do PDF.js corretamente
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFViewerProps {
  fileName: string;
  catalogTitle: string;
}

const PDFViewer = ({ fileName, catalogTitle }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // URL do PDF - usando um PDF de exemplo público
  const pdfUrl = "https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf";

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    console.log('PDF carregado com sucesso:', numPages, 'páginas');
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    toast({
      title: "PDF carregado com sucesso!",
      description: `${numPages} páginas disponíveis`,
    });
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Erro ao carregar PDF:', error);
    setLoading(false);
    setError(error.message);
    toast({
      title: "Erro ao carregar PDF",
      description: "Não foi possível carregar o arquivo PDF",
      variant: "destructive",
    });
  }, []);

  const onPageLoadSuccess = useCallback(() => {
    console.log(`Página ${pageNumber} carregada com sucesso`);
  }, [pageNumber]);

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const goToFirstPage = () => {
    setPageNumber(1);
  };

  const goToLastPage = () => {
    setPageNumber(numPages);
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = () => {
    // Simular download do PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${catalogTitle}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download iniciado",
      description: `Baixando ${catalogTitle}...`,
    });
  };

  if (error) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-lg font-medium text-red-800 mb-2">
                Erro ao carregar PDF
              </h3>
              <p className="text-red-600 mb-4">
                {error}
              </p>
              <Button 
                onClick={() => {
                  setError(null);
                  setLoading(true);
                }} 
                variant="outline"
              >
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Barra de controles superior */}
      <div className="bg-white border-b p-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium px-3 whitespace-nowrap">
            {loading ? "Carregando..." : `${pageNumber} de ${numPages}`}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages || loading}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            disabled={scale <= 0.5 || loading}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <button
            onClick={resetZoom}
            className="text-sm font-medium px-2 hover:underline"
            disabled={loading}
          >
            {Math.round(scale * 100)}%
          </button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={zoomIn}
            disabled={scale >= 3.0 || loading}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={rotate}
            disabled={loading}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={loading}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Área do visualizador */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="flex justify-center min-h-full">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Carregando documento...</p>
              </div>
            }
            error={null}
            options={{
              cMapUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/cmaps/',
              cMapPacked: true,
              standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.11.174/standard_fonts/',
            }}
          >
            {!loading && numPages > 0 && (
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                className="shadow-lg bg-white"
                renderTextLayer={false}
                renderAnnotationLayer={false}
                onLoadSuccess={onPageLoadSuccess}
                loading={
                  <div className="bg-white border rounded p-8 text-center">
                    <div className="animate-pulse">
                      <div className="bg-gray-200 h-96 w-72 mx-auto"></div>
                    </div>
                  </div>
                }
              />
            )}
          </Document>
        </div>
      </div>

      {/* Navegação por páginas na parte inferior */}
      {!loading && numPages > 0 && (
        <div className="bg-white border-t p-4">
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={goToFirstPage}
              disabled={pageNumber === 1}
            >
              Primeira
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
            >
              Próxima
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToLastPage}
              disabled={pageNumber === numPages}
            >
              Última
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
