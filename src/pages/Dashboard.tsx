
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen, Upload, Eye, Edit, Trash2, Share, Download, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [catalogs, setCatalogs] = useState([
    {
      id: 1,
      title: "Catálogo Primavera 2024",
      description: "Nova coleção de roupas e acessórios para a temporada",
      status: "publicado",
      views: 1247,
      slug: "catalogo-primavera-2024",
      created_at: "2024-03-15",
      file_size: "2.3 MB"
    },
    {
      id: 2,
      title: "Móveis de Escritório",
      description: "Linha completa de móveis corporativos",
      status: "processando",
      views: 0,
      slug: "moveis-escritorio",
      created_at: "2024-03-14",
      file_size: "4.7 MB"
    },
    {
      id: 3,
      title: "Eletrônicos 2024",
      description: "Smartphones, tablets e acessórios",
      status: "publicado",
      views: 892,
      slug: "eletronicos-2024",
      created_at: "2024-03-10",
      file_size: "1.8 MB"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newCatalog, setNewCatalog] = useState({ title: "", description: "", file: null });

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatalog.title || !newCatalog.file) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simulate upload
    const newId = catalogs.length + 1;
    const slug = newCatalog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    setCatalogs([
      {
        id: newId,
        title: newCatalog.title,
        description: newCatalog.description,
        status: "processando",
        views: 0,
        slug: slug,
        created_at: new Date().toISOString().split('T')[0],
        file_size: "2.1 MB"
      },
      ...catalogs
    ]);

    setNewCatalog({ title: "", description: "", file: null });
    
    toast({
      title: "Upload iniciado!",
      description: "Seu catálogo está sendo processado. Você será notificado quando estiver pronto.",
    });
  };

  const deleteCatalog = (id: number) => {
    setCatalogs(catalogs.filter(catalog => catalog.id !== id));
    toast({
      title: "Catálogo removido",
      description: "O catálogo foi removido com sucesso.",
    });
  };

  const copyLink = (slug: string) => {
    const link = `${window.location.origin}/visualizar/${slug}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link do catálogo foi copiado para a área de transferência.",
    });
  };

  const filteredCatalogs = catalogs.filter(catalog =>
    catalog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    catalog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "publicado":
        return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
      case "processando":
        return <Badge className="bg-yellow-100 text-yellow-800">Processando</Badge>;
      case "erro":
        return <Badge variant="destructive">Erro</Badge>;
      default:
        return <Badge variant="secondary">Rascunho</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-brand-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-700 bg-clip-text text-transparent">
              Leililind Catálogos
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Olá, Admin</span>
            <Button variant="outline" size="sm">
              Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Catálogos</p>
                  <p className="text-3xl font-bold text-gray-900">{catalogs.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Visualizações Totais</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {catalogs.reduce((acc, cat) => acc + cat.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Publicados</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {catalogs.filter(cat => cat.status === "publicado").length}
                  </p>
                </div>
                <Share className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processando</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {catalogs.filter(cat => cat.status === "processando").length}
                  </p>
                </div>
                <Upload className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar catálogos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-600 hover:bg-brand-700">
                <Plus className="mr-2 h-4 w-4" />
                Novo Catálogo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Novo Catálogo</DialogTitle>
                <DialogDescription>
                  Faça upload de um arquivo PDF para criar um novo flipbook
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={newCatalog.title}
                    onChange={(e) => setNewCatalog({...newCatalog, title: e.target.value})}
                    placeholder="Ex: Catálogo Verão 2024"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newCatalog.description}
                    onChange={(e) => setNewCatalog({...newCatalog, description: e.target.value})}
                    placeholder="Descreva o conteúdo do catálogo..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Arquivo PDF *</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNewCatalog({...newCatalog, file: e.target.files?.[0] || null})}
                    required
                  />
                  <p className="text-xs text-gray-500">Máximo 10MB</p>
                </div>
                <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                  <Upload className="mr-2 h-4 w-4" />
                  Fazer Upload
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Catalogs List */}
        <div className="grid gap-6">
          {filteredCatalogs.map((catalog) => (
            <Card key={catalog.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {catalog.title}
                      </h3>
                      {getStatusBadge(catalog.status)}
                    </div>
                    <p className="text-gray-600 mb-2">{catalog.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Criado em {new Date(catalog.created_at).toLocaleDateString('pt-BR')}</span>
                      <span>{catalog.file_size}</span>
                      {catalog.status === "publicado" && (
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {catalog.views.toLocaleString()} visualizações
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {catalog.status === "publicado" && (
                      <>
                        <Link to={`/visualizar/${catalog.slug}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyLink(catalog.slug)}
                        >
                          <Share className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteCatalog(catalog.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredCatalogs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? "Nenhum catálogo encontrado" : "Nenhum catálogo criado"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm 
                    ? "Tente usar outros termos de busca"
                    : "Comece criando seu primeiro catálogo digital"
                  }
                </p>
                {!searchTerm && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-brand-600 hover:bg-brand-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Criar Primeiro Catálogo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      {/* Same dialog content as above */}
                    </DialogContent>
                  </Dialog>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
