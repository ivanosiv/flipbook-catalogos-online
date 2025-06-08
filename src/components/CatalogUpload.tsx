
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileText, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CatalogUploadProps {
  onUploadSuccess: () => void;
}

const CatalogUpload = ({ onUploadSuccess }: CatalogUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [catalogData, setCatalogData] = useState({
    title: "",
    description: "",
    brand: "",
    file: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.size <= 50 * 1024 * 1024) { // 50MB limit
        setCatalogData({ ...catalogData, file });
      } else {
        toast({
          title: "Erro no arquivo",
          description: "Apenas arquivos PDF até 50MB são aceitos",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!catalogData.file || !catalogData.title || !catalogData.brand) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos e selecione um arquivo",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Simular upload e conversão
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Salvar dados do catálogo no localStorage
      const existingCatalogs = JSON.parse(localStorage.getItem('catalogos_data') || '[]');
      const newCatalog = {
        id: Date.now().toString(),
        title: catalogData.title,
        description: catalogData.description,
        brand: catalogData.brand,
        uploadDate: new Date().toISOString(),
        status: "converted",
        slug: catalogData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        fileSize: `${(catalogData.file.size / (1024 * 1024)).toFixed(1)} MB`,
        pages: Math.floor(Math.random() * 100) + 20, // Simular número de páginas
        fileName: catalogData.file.name
      };
      
      const updatedCatalogs = [...existingCatalogs, newCatalog];
      localStorage.setItem('catalogos_data', JSON.stringify(updatedCatalogs));
      
      toast({
        title: "Upload realizado com sucesso!",
        description: "Catálogo foi processado e está disponível para visualização",
      });
      
      setCatalogData({ title: "", description: "", brand: "", file: null });
      setIsOpen(false);
      onUploadSuccess();
      
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao processar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-600 hover:bg-brand-700">
          <Upload className="h-4 w-4 mr-2" />
          Novo Catálogo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Upload de Catálogo</DialogTitle>
          <DialogDescription>
            Faça upload de um novo catálogo em PDF
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título do Catálogo *</Label>
            <Input
              id="title"
              value={catalogData.title}
              onChange={(e) => setCatalogData({ ...catalogData, title: e.target.value })}
              placeholder="Ex: Catálogo Primavera 2024"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="brand">Marca *</Label>
            <Input
              id="brand"
              value={catalogData.brand}
              onChange={(e) => setCatalogData({ ...catalogData, brand: e.target.value })}
              placeholder="Nome da marca"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={catalogData.description}
              onChange={(e) => setCatalogData({ ...catalogData, description: e.target.value })}
              placeholder="Descrição do catálogo..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Arquivo PDF *</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
                required
              />
            </div>
            {catalogData.file && (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Check className="h-4 w-4" />
                <span>{catalogData.file.name}</span>
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brand-600 hover:bg-brand-700"
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <FileText className="h-4 w-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Fazer Upload
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogUpload;
