import React, { useState, useEffect } from 'react';
import { mockMedications, mockSuppliers } from '../../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
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
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload,
  Search,
  AlertTriangle
} from 'lucide-react';

const MedicationsManager = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState(mockMedications);
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    supplierId: '',
    barcode: '',
    prescription: false,
    description: ''
  });

  const categories = [
    'Analgésique',
    'Anti-inflammatoire', 
    'Antibiotique',
    'Antidépresseur',
    'Respiratoire',
    'Complément',
    'Générique',
    'Homéopathie',
    'Autres'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update medication
      setMedications(prev => prev.map(med => 
        med.id === editingId 
          ? { 
              ...med, 
              ...formData, 
              price: parseFloat(formData.price),
              stock: parseInt(formData.stock),
              supplierId: parseInt(formData.supplierId)
            }
          : med
      ));
      toast({
        title: "Médicament modifié",
        description: `${formData.name} a été mis à jour avec succès.`,
      });
      setEditingId(null);
    } else {
      // Add new medication
      const newMedication = {
        id: Math.max(...medications.map(m => m.id), 0) + 1,
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        supplierId: parseInt(formData.supplierId)
      };
      setMedications(prev => [...prev, newMedication]);
      toast({
        title: "Médicament ajouté",
        description: `${formData.name} a été ajouté au catalogue.`,
      });
    }

    // Reset form
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      supplierId: '',
      barcode: '',
      prescription: false,
      description: ''
    });
  };

  const handleEdit = (medication) => {
    setFormData({
      name: medication.name,
      category: medication.category,
      price: medication.price.toString(),
      stock: medication.stock.toString(),
      supplierId: medication.supplierId.toString(),
      barcode: medication.barcode,
      prescription: medication.prescription,
      description: medication.description || ''
    });
    setEditingId(medication.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce médicament ?')) {
      setMedications(prev => prev.filter(med => med.id !== id));
      toast({
        title: "Médicament supprimé",
        description: "Le médicament a été supprimé du catalogue.",
        variant: "destructive",
      });
    }
  };

  const filteredMedications = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.barcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Non assigné';
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { color: 'bg-red-500', text: 'Rupture' };
    if (stock <= 10) return { color: 'bg-orange-500', text: 'Faible' };
    return { color: 'bg-green-500', text: 'Normal' };
  };

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            {editingId ? 'Modifier le Médicament' : 'Ajouter un Médicament'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du Médicament</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ex: Ibuprofène 400mg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplierId">Fournisseur</Label>
              <Select value={formData.supplierId} onValueChange={(value) => handleSelectChange('supplierId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un fournisseur" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.id.toString()}>{supplier.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="barcode">Code-barres</Label>
              <Input
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleInputChange}
                placeholder="Ex: 3401579808539"
                required
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description du médicament"
              />
            </div>

            <div className="md:col-span-3 flex items-center space-x-2">
              <Checkbox
                id="prescription"
                name="prescription"
                checked={formData.prescription}
                onCheckedChange={(checked) => handleSelectChange('prescription', checked)}
              />
              <Label htmlFor="prescription">Nécessite une ordonnance</Label>
            </div>

            <div className="md:col-span-3 flex gap-2">
              <Button type="submit" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                {editingId ? 'Modifier' : 'Ajouter'}
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      name: '',
                      category: '',
                      price: '',
                      stock: '',
                      supplierId: '',
                      barcode: '',
                      prescription: false,
                      description: ''
                    });
                  }}
                >
                  Annuler
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Medications List Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Liste des Médicaments ({filteredMedications.length})</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Import CSV
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Rechercher par nom, catégorie ou code-barres..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Fournisseur</TableHead>
                  <TableHead>Ordonnance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMedications.map((medication) => {
                  const stockStatus = getStockStatus(medication.stock);
                  return (
                    <TableRow key={medication.id}>
                      <TableCell className="font-medium">{medication.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{medication.category}</Badge>
                      </TableCell>
                      <TableCell>€{medication.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${stockStatus.color}`}></div>
                          <span className={medication.stock <= 10 ? 'font-bold text-orange-600' : ''}>
                            {medication.stock}
                          </span>
                          {medication.stock <= 10 && (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">
                        {getSupplierName(medication.supplierId)}
                      </TableCell>
                      <TableCell>
                        {medication.prescription ? (
                          <Badge variant="destructive">Oui</Badge>
                        ) : (
                          <Badge variant="secondary">Non</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(medication)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(medication.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {filteredMedications.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                Aucun médicament trouvé
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicationsManager;