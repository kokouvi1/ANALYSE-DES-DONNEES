import React, { useState } from 'react';
import { mockUsers } from '../../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useToast } from '../../hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { 
  Users, 
  UserPlus, 
  Edit, 
  Trash2, 
  Shield,
  Mail,
  Phone,
  Calendar,
  UserCheck,
  UserX
} from 'lucide-react';

const UsersManager = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500';
      case 'pharmacist':
        return 'bg-blue-500';
      case 'assistant':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getRoleBadge = (role) => {
    const baseClass = "hover:opacity-80";
    switch (role) {
      case 'admin':
        return <Badge className={`bg-red-500 ${baseClass}`}>Administrateur</Badge>;
      case 'pharmacist':
        return <Badge className={`bg-blue-500 ${baseClass}`}>Pharmacien</Badge>;
      case 'assistant':
        return <Badge className={`bg-green-500 ${baseClass}`}>Assistant</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès.",
        variant: "destructive",
      });
    }
  };

  const handleToggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus }
        : user
    ));
    
    toast({
      title: `Utilisateur ${newStatus === 'active' ? 'activé' : 'désactivé'}`,
      description: `Le statut de l'utilisateur a été modifié.`,
    });
  };

  const filteredUsers = users.filter(user =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUsers = users.filter(u => !u.status || u.status === 'active').length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const pharmacistCount = users.filter(u => u.role === 'pharmacist').length;
  const assistantCount = users.filter(u => u.role === 'assistant').length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Utilisateurs</p>
                <p className="text-3xl font-bold text-blue-600">{users.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Utilisateurs Actifs</p>
                <p className="text-3xl font-bold text-green-600">{activeUsers}</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Administrateurs</p>
                <p className="text-3xl font-bold text-red-600">{adminCount}</p>
              </div>
              <div className="p-3 rounded-full bg-red-500">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Pharmaciens</p>
                <p className="text-3xl font-bold text-blue-600">{pharmacistCount}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users List Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Gestion des Utilisateurs ({filteredUsers.length})
            </CardTitle>
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Nouvel Utilisateur
            </Button>
          </div>
          <div className="relative">
            <Input
              placeholder="Rechercher par nom, email ou nom d'utilisateur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière Connexion</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.photo} alt={user.fullname} />
                          <AvatarFallback className="bg-slate-200">
                            {user.fullname.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.fullname}</p>
                          <p className="text-sm text-slate-600">@{user.username}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <a 
                          href={`mailto:${user.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {user.email}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {(!user.status || user.status === 'active') ? (
                        <Badge className="bg-green-500 hover:bg-green-600">Actif</Badge>
                      ) : (
                        <Badge variant="destructive">Inactif</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date().toLocaleDateString('fr-FR')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleToggleUserStatus(user.id, user.status || 'active')}
                        >
                          {(!user.status || user.status === 'active') ? (
                            <UserX className="h-4 w-4 text-red-600" />
                          ) : (
                            <UserCheck className="h-4 w-4 text-green-600" />
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Users className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p>Aucun utilisateur trouvé</p>
                <p className="text-sm">Ajustez vos critères de recherche</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Role Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Répartition des Rôles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="p-4 bg-red-50 rounded-lg">
                <Shield className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-800">Administrateurs</h3>
                <p className="text-3xl font-bold text-red-600">{adminCount}</p>
                <p className="text-sm text-red-600">Accès complet</p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-800">Pharmaciens</h3>
                <p className="text-3xl font-bold text-blue-600">{pharmacistCount}</p>
                <p className="text-sm text-blue-600">Gestion médicaments</p>
              </div>
            </div>

            <div className="text-center space-y-3">
              <div className="p-4 bg-green-50 rounded-lg">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Assistants</h3>
                <p className="text-3xl font-bold text-green-600">{assistantCount}</p>
                <p className="text-sm text-green-600">Vente et support</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <UserPlus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Inviter Utilisateurs</h4>
                  <p className="text-sm text-slate-600">Envoyer des invitations par email</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Gérer Permissions</h4>
                  <p className="text-sm text-slate-600">Configurer les droits d'accès</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Import/Export</h4>
                  <p className="text-sm text-slate-600">Gestion en masse des utilisateurs</p>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManager;