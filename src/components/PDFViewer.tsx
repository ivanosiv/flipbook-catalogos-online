
import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Configurar o worker do PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

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

  // Para fins de demonstração, vamos simular um PDF
  const pdfUrl = `/sample-catalog.pdf`;

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    toast({
      title: "PDF carregado com sucesso!",
      description: `${numPages} páginas disponíveis`,
    });
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Erro ao carregar PDF:', error);
    setLoading(false);
    toast({
      title: "Erro ao carregar PDF",
      description: "Não foi possível carregar o arquivo PDF",
      variant: "destructive",
    });
  }, []);

  const goToPrevPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleDownload = () => {
    // Simular download do PDF
    toast({
      title: "Download iniciado",
      description: `Baixando ${catalogTitle}...`,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Barra de controles */}
      <div className="bg-white border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium px-3">
            {pageNumber} de {numPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <span className="text-sm font-medium px-2">
            {Math.round(scale * 100)}%
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={zoomIn}
            disabled={scale >= 3.0}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={rotate}
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Área do visualizador */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="flex justify-center">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando PDF...</p>
            </div>
          ) : (
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando documento...</p>
                </div>
              }
              error={
                <div className="text-center py-20">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                    <h3 className="text-lg font-medium text-red-800 mb-2">
                      Erro ao carregar PDF
                    </h3>
                    <p className="text-red-600 mb-4">
                      Não foi possível carregar o arquivo PDF. Isso pode ser um problema temporário.
                    </p>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Nota:</strong> Este é um ambiente de demonstração. 
                        Em produção, o PDF seria carregado do servidor com o arquivo real.
                      </p>
                    </div>
                  </div>
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                className="shadow-lg"
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          )}
        </div>
      </div>

      {/* Navegação por páginas na parte inferior */}
      <div className="bg-white border-t p-4">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => setPageNumber(1)}
            disabled={pageNumber === 1}
          >
            Primeira
          </Button>
          <Button
            variant="outline"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            Próxima
          </Button>
          <Button
            variant="outline"
            onClick={() => setPageNumber(numPages)}
            disabled={pageNumber === numPages}
          >
            Última
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
