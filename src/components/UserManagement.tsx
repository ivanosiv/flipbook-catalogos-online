
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { UserPlus, Key, Trash2, Shield, User } from "lucide-react";

const UserManagement = () => {
  const { users, addUser, changePassword, deleteUser, user: currentUser } = useAuth();
  const [newUser, setNewUser] = useState({ username: "", password: "", role: "user" as "admin" | "user" });
  const [passwordChange, setPasswordChange] = useState({ userId: "", newPassword: "" });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newUser.username.length < 3) {
      toast({
        title: "Erro",
        description: "O nome de usuário deve ter pelo menos 3 caracteres",
        variant: "destructive",
      });
      return;
    }

    if (newUser.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    const success = addUser(newUser.username, newUser.password, newUser.role);
    
    if (success) {
      toast({
        title: "Usuário criado com sucesso!",
        description: `Usuário ${newUser.username} foi adicionado`,
      });
      setNewUser({ username: "", password: "", role: "user" });
      setIsAddDialogOpen(false);
    } else {
      toast({
        title: "Erro",
        description: "Nome de usuário já existe",
        variant: "destructive",
      });
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordChange.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres",
        variant: "destructive",
      });
      return;
    }

    const success = changePassword(passwordChange.userId, passwordChange.newPassword);
    
    if (success) {
      toast({
        title: "Senha alterada com sucesso!",
        description: "A nova senha foi definida",
      });
      setPasswordChange({ userId: "", newPassword: "" });
      setIsPasswordDialogOpen(false);
    }
  };

  const handleDeleteUser = (userId: string, username: string) => {
    if (userId === currentUser?.id) {
      toast({
        title: "Erro",
        description: "Você não pode excluir sua própria conta",
        variant: "destructive",
      });
      return;
    }

    if (confirm(`Tem certeza que deseja excluir o usuário "${username}"?`)) {
      deleteUser(userId);
      toast({
        title: "Usuário excluído",
        description: `Usuário ${username} foi removido`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Gerenciamento de Usuários
            </CardTitle>
            <CardDescription>
              Gerencie os usuários com acesso ao painel administrativo
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-brand-600 hover:bg-brand-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Crie uma nova conta de acesso ao painel administrativo
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-username">Nome de Usuário</Label>
                  <Input
                    id="new-username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Digite o nome de usuário"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Senha</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Digite a senha"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-role">Tipo de Usuário</Label>
                  <Select value={newUser.role} onValueChange={(value: "admin" | "user") => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="admin">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Criar Usuário
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {user.role === 'admin' ? (
                        <Shield className="h-4 w-4 text-orange-500" />
                      ) : (
                        <User className="h-4 w-4 text-blue-500" />
                      )}
                      {user.username}
                      {user.id === currentUser?.id && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Você
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Administrador' : 'Usuário'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setPasswordChange({ ...passwordChange, userId: user.id })}
                          >
                            <Key className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Alterar Senha</DialogTitle>
                            <DialogDescription>
                              Definir nova senha para {user.username}
                            </DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleChangePassword} className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-password-change">Nova Senha</Label>
                              <Input
                                id="new-password-change"
                                type="password"
                                value={passwordChange.newPassword}
                                onChange={(e) => setPasswordChange({ ...passwordChange, newPassword: e.target.value })}
                                placeholder="Digite a nova senha"
                                required
                              />
                            </div>
                            <Button type="submit" className="w-full">
                              Alterar Senha
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      {user.id !== currentUser?.id && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id, user.username)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
