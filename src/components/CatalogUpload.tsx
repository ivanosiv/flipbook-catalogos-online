
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileText, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CatalogUploadProps {
  onUploadSuccess?: () => void;
}

const CatalogUpload = ({ onUploadSuccess }: CatalogUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    brand: "",
    file: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Formato inválido",
          description: "Por favor, selecione apenas arquivos PDF",
          variant: "destructive",
        });
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB
        toast({
          title: "Arquivo muito grande",
          description: "O arquivo deve ter no máximo 50MB",
          variant: "destructive",
        });
        return;
      }
      setFormData({ ...formData, file });
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.brand || !formData.file) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Simular upload e conversão
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newCatalog = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        brand: formData.brand,
        uploadDate: new Date().toISOString(),
        status: "converted",
        slug: generateSlug(formData.title),
        fileSize: `${(formData.file.size / 1024 / 1024).toFixed(1)} MB`,
        pages: Math.floor(Math.random() * 50) + 10, // Simular número de páginas
        fileName: formData.file.name,
      };

      // Salvar no localStorage
      const existingCatalogs = JSON.parse(localStorage.getItem('catalogos_data') || '[]');
      const updatedCatalogs = [...existingCatalogs, newCatalog];
      localStorage.setItem('catalogos_data', JSON.stringify(updatedCatalogs));

      toast({
        title: "Upload concluído!",
        description: "O catálogo foi enviado e convertido com sucesso",
      });

      setFormData({
        title: "",
        description: "",
        brand: "",
        file: null,
      });
      setIsOpen(false);
      onUploadSuccess?.();
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Ocorreu um erro ao enviar o catálogo",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Novo Catálogo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Catálogo</DialogTitle>
          <DialogDescription>
            Faça upload de um arquivo PDF para criar um novo catálogo digital
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Nome do catálogo"
              required
            />
          </div>

          <div>
            <Label htmlFor="brand">Marca *</Label>
            <Input
              id="brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Nome da marca"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Breve descrição do catálogo"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="file">Arquivo PDF *</Label>
            <div className="mt-1">
              <Input
                id="file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              {formData.file && (
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <Check className="h-4 w-4 mr-1" />
                  {formData.file.name} ({(formData.file.size / 1024 / 1024).toFixed(1)} MB)
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Formato: PDF • Tamanho máximo: 50MB
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={uploading}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enviando...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Enviar Catálogo
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CatalogUpload;
