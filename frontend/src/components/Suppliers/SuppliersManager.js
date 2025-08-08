import React, { useState } from 'react';
import { mockSuppliers } from '../../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
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
  Truck, 
  Plus, 
  Edit, 
  Trash2, 
  Phone,
  Mail,
  MapPin,
  Building
} from 'lucide-react';

const SuppliersManager = () => {
  const { toast } = useToast();
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update supplier
      setSuppliers(prev => prev.map(supplier => 
        supplier.id === editingId 
          ? { ...supplier, ...formData }
          : supplier
      ));
      toast({
        title: "Fournisseur modifié",
        description: `${formData.name} a été mis à jour avec succès.`,
      });
      setEditingId(null);
    } else {
      // Add new supplier
      const newSupplier = {
        id: Math.max(...suppliers.map(s => s.id), 0) + 1,
        ...formData
      };
      setSuppliers(prev => [...prev, newSupplier]);
      toast({
        title: "Fournisseur ajouté",
        description: `${formData.name} a été ajouté à la liste des fournisseurs.`,
      });
    }

    // Reset form
    setFormData({
      name: '',
      contact: '',
      phone: '',
      address: ''
    });
  };

  const handleEdit = (supplier) => {
    setFormData({
      name: supplier.name,
      contact: supplier.contact,
      phone: supplier.phone,
      address: supplier.address
    });
    setEditingId(supplier.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
      setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
      toast({
        title: "Fournisseur supprimé",
        description: "Le fournisseur a été supprimé de la liste.",
        variant: "destructive",
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      contact: '',
      phone: '',
      address: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Fournisseurs actifs</p>
                <p className="text-3xl font-bold text-blue-600">{suppliers.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <Truck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Commandes en cours</p>
                <p className="text-3xl font-bold text-orange-600">7</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500">
                <Building className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Livraisons attendues</p>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <Truck className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? 'Modifier le Fournisseur' : 'Ajouter un Fournisseur'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du Fournisseur</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Pharma Distribution"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact">Email de Contact</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="contact"
                  name="contact"
                  type="email"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="contact@fournisseur.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+33 1 23 45 67 89"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Rue de la Santé, 75014 Paris"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:col-span-2 flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingId ? 'Modifier' : 'Ajouter'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Annuler
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Suppliers List Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Liste des Fournisseurs ({suppliers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Adresse</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppliers.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Building className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <p className="text-sm text-slate-600">ID: {supplier.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <a 
                          href={`mailto:${supplier.contact}`}
                          className="text-blue-600 hover:underline"
                        >
                          {supplier.contact}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <a 
                          href={`tel:${supplier.phone}`}
                          className="text-blue-600 hover:underline"
                        >
                          {supplier.phone}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{supplier.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Actif
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEdit(supplier)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(supplier.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {suppliers.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <Building className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p>Aucun fournisseur enregistré</p>
                <p className="text-sm">Ajoutez votre premier fournisseur pour commencer</p>
              </div>
            )}
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
                  <Plus className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Nouvelle Commande</h4>
                  <p className="text-sm text-slate-600">Passer une commande fournisseur</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Truck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Suivi Livraisons</h4>
                  <p className="text-sm text-slate-600">Suivre les livraisons en cours</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Évaluation</h4>
                  <p className="text-sm text-slate-600">Évaluer les fournisseurs</p>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuppliersManager;