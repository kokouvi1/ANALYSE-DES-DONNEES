import React, { useState } from 'react';
import { mockMedications } from '../../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
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
  Package, 
  Plus, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  RefreshCw
} from 'lucide-react';

const InventoryManager = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState(mockMedications);
  const [receiveForm, setReceiveForm] = useState({
    medicationId: '',
    quantity: '',
    batchNumber: '',
    expiryDate: ''
  });
  const [adjustForm, setAdjustForm] = useState({
    medicationId: '',
    adjustment: '',
    reason: ''
  });

  const handleReceiveFormChange = (field, value) => {
    setReceiveForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdjustFormChange = (field, value) => {
    setAdjustForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReceiveStock = (e) => {
    e.preventDefault();
    
    const quantity = parseInt(receiveForm.quantity);
    if (quantity <= 0) {
      toast({
        title: "Erreur",
        description: "La quantité doit être supérieure à 0",
        variant: "destructive",
      });
      return;
    }

    setMedications(prev => prev.map(med =>
      med.id === parseInt(receiveForm.medicationId)
        ? { ...med, stock: med.stock + quantity }
        : med
    ));

    const medication = medications.find(m => m.id === parseInt(receiveForm.medicationId));
    
    toast({
      title: "Stock reçu",
      description: `${quantity} unités de ${medication?.name} ajoutées au stock`,
    });

    setReceiveForm({
      medicationId: '',
      quantity: '',
      batchNumber: '',
      expiryDate: ''
    });
  };

  const handleStockAdjustment = (e) => {
    e.preventDefault();
    
    const adjustment = parseInt(adjustForm.adjustment);
    const medication = medications.find(m => m.id === parseInt(adjustForm.medicationId));
    
    if (!medication) return;
    
    const newStock = Math.max(0, medication.stock + adjustment);
    
    setMedications(prev => prev.map(med =>
      med.id === parseInt(adjustForm.medicationId)
        ? { ...med, stock: newStock }
        : med
    ));

    toast({
      title: "Ajustement effectué",
      description: `Stock de ${medication.name} ajusté: ${adjustment > 0 ? '+' : ''}${adjustment} unités`,
    });

    setAdjustForm({
      medicationId: '',
      adjustment: '',
      reason: ''
    });
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { 
      status: 'Rupture', 
      color: 'bg-red-500', 
      textColor: 'text-red-600',
      icon: AlertTriangle 
    };
    if (stock <= 10) return { 
      status: 'Faible', 
      color: 'bg-yellow-500', 
      textColor: 'text-yellow-600',
      icon: TrendingDown 
    };
    return { 
      status: 'Normal', 
      color: 'bg-green-500', 
      textColor: 'text-green-600',
      icon: TrendingUp 
    };
  };

  const lowStockMedications = medications.filter(med => med.stock <= 10);
  const outOfStockMedications = medications.filter(med => med.stock === 0);
  const totalValue = medications.reduce((total, med) => total + (med.price * med.stock), 0);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Articles totaux</p>
                <p className="text-3xl font-bold">{medications.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Stock faible</p>
                <p className="text-3xl font-bold text-yellow-600">{lowStockMedications.length}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-500">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Rupture stock</p>
                <p className="text-3xl font-bold text-red-600">{outOfStockMedications.length}</p>
              </div>
              <div className="p-3 rounded-full bg-red-500">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Valeur totale</p>
                <p className="text-3xl font-bold text-green-600">€{totalValue.toFixed(0)}</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Receive Stock Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Réception de Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleReceiveStock} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receive-medication">Médicament</Label>
                <Select 
                  value={receiveForm.medicationId} 
                  onValueChange={(value) => handleReceiveFormChange('medicationId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un médicament" />
                  </SelectTrigger>
                  <SelectContent>
                    {medications.map(med => (
                      <SelectItem key={med.id} value={med.id.toString()}>
                        {med.name} (Stock actuel: {med.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receive-quantity">Quantité reçue</Label>
                <Input
                  id="receive-quantity"
                  type="number"
                  min="1"
                  value={receiveForm.quantity}
                  onChange={(e) => handleReceiveFormChange('quantity', e.target.value)}
                  placeholder="Quantité"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch-number">Numéro de lot</Label>
                <Input
                  id="batch-number"
                  value={receiveForm.batchNumber}
                  onChange={(e) => handleReceiveFormChange('batchNumber', e.target.value)}
                  placeholder="LOT123456"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry-date">Date d'expiration</Label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={receiveForm.expiryDate}
                  onChange={(e) => handleReceiveFormChange('expiryDate', e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                <Package className="h-4 w-4 mr-2" />
                Enregistrer la réception
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Stock Adjustment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              Ajustement de Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleStockAdjustment} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="adjust-medication">Médicament</Label>
                <Select 
                  value={adjustForm.medicationId} 
                  onValueChange={(value) => handleAdjustFormChange('medicationId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un médicament" />
                  </SelectTrigger>
                  <SelectContent>
                    {medications.map(med => (
                      <SelectItem key={med.id} value={med.id.toString()}>
                        {med.name} (Stock actuel: {med.stock})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adjustment">Ajustement (+/-)</Label>
                <Input
                  id="adjustment"
                  type="number"
                  value={adjustForm.adjustment}
                  onChange={(e) => handleAdjustFormChange('adjustment', e.target.value)}
                  placeholder="Ex: +10 ou -5"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Raison</Label>
                <Select 
                  value={adjustForm.reason} 
                  onValueChange={(value) => handleAdjustFormChange('reason', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une raison" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="damage">Produit endommagé</SelectItem>
                    <SelectItem value="expiry">Produit expiré</SelectItem>
                    <SelectItem value="inventory">Correction inventaire</SelectItem>
                    <SelectItem value="return">Retour fournisseur</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Effectuer l'ajustement
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Stock Overview Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Vue d'ensemble du Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Médicament</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Stock actuel</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Valeur</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medications.map((medication) => {
                  const stockStatus = getStockStatus(medication.stock);
                  const Icon = stockStatus.icon;
                  
                  return (
                    <TableRow key={medication.id}>
                      <TableCell className="font-medium">{medication.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{medication.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${stockStatus.textColor}`}>
                            {medication.stock}
                          </span>
                          <Icon className={`h-4 w-4 ${stockStatus.textColor}`} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${stockStatus.color} hover:${stockStatus.color}`}>
                          {stockStatus.status}
                        </Badge>
                      </TableCell>
                      <TableCell>€{(medication.price * medication.stock).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryManager;