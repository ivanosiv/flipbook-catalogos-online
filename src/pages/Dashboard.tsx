
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Upload, Eye, Download, Settings, LogOut, Users, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import UserManagement from "@/components/UserManagement";

// Mock data for catalogs
const mockCatalogs = [
  {
    id: "1",
    title: "Catálogo Primavera/Verão 2024",
    description: "Coleção completa da temporada com todas as novidades",
    uploadDate: "2024-01-15",
    status: "converted",
    slug: "primavera-verao-2024",
    fileSize: "15.2 MB",
    pages: 64,
  },
  {
    id: "2",
    title: "Linha Executiva Corporativa",
    description: "Produtos profissionais para ambiente corporativo",
    uploadDate: "2024-01-10",
    status: "converting",
    slug: "",
    fileSize: "8.7 MB",
    pages: 32,
  },
  {
    id: "3",
    title: "Catálogo Infantil",
    description: "Produtos especiais para o público infantil",
    uploadDate: "2024-01-08",
    status: "converted",
    slug: "catalogo-infantil",
    fileSize: "22.1 MB",
    pages: 96,
  },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("catalogs");

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    navigate("/login");
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      converted: { label: "Convertido", className: "bg-green-100 text-green-800" },
      converting: { label: "Convertendo", className: "bg-yellow-100 text-yellow-800" },
      error: { label: "Erro", className: "bg-red-100 text-red-800" },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.error;
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="flex items-center space-x-2">
                  <BookOpen className="h-8 w-8 text-brand-600" />
                  <span className="text-xl font-bold text-brand-600">
                    Leililind Catálogos
                  </span>
                </Link>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">Painel Administrativo</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Olá, <strong>{user?.username}</strong>
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Gerencie seus catálogos e configurações</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Catálogos</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockCatalogs.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Convertidos</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockCatalogs.filter(c => c.status === 'converted').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Conversão</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockCatalogs.filter(c => c.status === 'converting').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuários</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="catalogs">Catálogos</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
            </TabsList>

            <TabsContent value="catalogs">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Catálogos</CardTitle>
                      <CardDescription>
                        Gerencie seus catálogos digitais
                      </CardDescription>
                    </div>
                    <Button className="bg-brand-600 hover:bg-brand-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Novo Catálogo
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCatalogs.map((catalog) => (
                      <div key={catalog.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{catalog.title}</h3>
                            {getStatusBadge(catalog.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{catalog.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Enviado em {new Date(catalog.uploadDate).toLocaleDateString('pt-BR')}</span>
                            <span>{catalog.fileSize}</span>
                            <span>{catalog.pages} páginas</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {catalog.status === 'converted' && catalog.slug && (
                            <Link to={`/visualizar/${catalog.slug}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                Visualizar
                              </Button>
                            </Link>
                          )}
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações</CardTitle>
                  <CardDescription>
                    Configure as opções do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Configurações gerais do sistema em desenvolvimento...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
