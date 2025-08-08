import React, { useState, useEffect } from 'react';
import { mockMedications, mockSales } from '../../mock';
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
  ShoppingCart, 
  Plus, 
  Trash2, 
  Search,
  CreditCard,
  AlertTriangle
} from 'lucide-react';

const SalesManager = () => {
  const { toast } = useToast();
  const [medications, setMedications] = useState(mockMedications);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [filteredMedications, setFilteredMedications] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = medications.filter(med =>
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.barcode.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5);
      setFilteredMedications(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredMedications([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, medications]);

  const handleMedicationSelect = (medication) => {
    setSelectedMedication(medication);
    setSearchTerm(medication.name);
    setShowSuggestions(false);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    
    if (!selectedMedication) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un médicament.",
        variant: "destructive",
      });
      return;
    }

    if (quantity > selectedMedication.stock) {
      toast({
        title: "Stock insuffisant",
        description: `Stock disponible: ${selectedMedication.stock} unités`,
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find(item => item.medication.id === selectedMedication.id);
    
    if (existingItem) {
      if (existingItem.quantity + quantity > selectedMedication.stock) {
        toast({
          title: "Stock insuffisant",
          description: `Total demandé dépasse le stock disponible`,
          variant: "destructive",
        });
        return;
      }
      
      setCart(prev => prev.map(item =>
        item.medication.id === selectedMedication.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart(prev => [...prev, { 
        medication: selectedMedication, 
        quantity: quantity,
        unitPrice: selectedMedication.price
      }]);
    }

    // Reset form
    setSearchTerm('');
    setSelectedMedication(null);
    setQuantity(1);

    toast({
      title: "Article ajouté",
      description: `${quantity}x ${selectedMedication.name} ajouté au panier`,
    });
  };

  const handleRemoveFromCart = (medicationId) => {
    setCart(prev => prev.filter(item => item.medication.id !== medicationId));
    toast({
      title: "Article retiré",
      description: "L'article a été retiré du panier",
    });
  };

  const handleUpdateQuantity = (medicationId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(medicationId);
      return;
    }

    const medication = medications.find(m => m.id === medicationId);
    if (newQuantity > medication.stock) {
      toast({
        title: "Stock insuffisant",
        description: `Stock disponible: ${medication.stock} unités`,
        variant: "destructive",
      });
      return;
    }

    setCart(prev => prev.map(item =>
      item.medication.id === medicationId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.medication.price * item.quantity), 0);
  };

  const handleProcessSale = () => {
    if (cart.length === 0) {
      toast({
        title: "Panier vide",
        description: "Veuillez ajouter des articles au panier",
        variant: "destructive",
      });
      return;
    }

    // Check for prescription requirements
    const requiresPrescription = cart.some(item => item.medication.prescription);
    if (requiresPrescription) {
      const confirmed = window.confirm("Cette vente contient des médicaments sur ordonnance. Avez-vous vérifié l'ordonnance ?");
      if (!confirmed) return;
    }

    // Update stock
    setMedications(prev => prev.map(med => {
      const cartItem = cart.find(item => item.medication.id === med.id);
      if (cartItem) {
        return { ...med, stock: med.stock - cartItem.quantity };
      }
      return med;
    }));

    // Clear cart
    setCart([]);

    toast({
      title: "Vente enregistrée",
      description: `Vente d'un montant de €${calculateTotal().toFixed(2)} enregistrée avec succès`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Add to Cart Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Ajouter au Panier
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddToCart} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2 relative">
              <Label htmlFor="medication-search">Rechercher un médicament</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="medication-search"
                  type="text"
                  placeholder="Nom ou code-barres..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  autoComplete="off"
                />
              </div>
              
              {/* Suggestions dropdown */}
              {showSuggestions && filteredMedications.length > 0 && (
                <div className="absolute z-10 w-full bg-white border border-slate-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                  {filteredMedications.map((med) => (
                    <div
                      key={med.id}
                      className="p-3 hover:bg-slate-100 cursor-pointer border-b last:border-b-0"
                      onClick={() => handleMedicationSelect(med)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{med.name}</p>
                          <p className="text-xs text-slate-600">{med.category} • €{med.price}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Stock: {med.stock}</p>
                          {med.prescription && (
                            <Badge variant="destructive" className="text-xs">Ordonnance</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantité</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className="flex items-end">
              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Shopping Cart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Panier de Vente ({cart.length} articles)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <p>Le panier est vide</p>
              <p className="text-sm">Ajoutez des médicaments pour commencer une vente</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Médicament</TableHead>
                      <TableHead>Prix unitaire</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.medication.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{item.medication.name}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">
                                {item.medication.category}
                              </Badge>
                              {item.medication.prescription && (
                                <Badge variant="destructive" className="text-xs">
                                  Ordonnance
                                </Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>€{item.medication.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => handleUpdateQuantity(item.medication.id, parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        </TableCell>
                        <TableCell className="font-semibold">
                          €{(item.medication.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveFromCart(item.medication.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Total and Checkout */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>Total à payer :</span>
                  <span>€{calculateTotal().toFixed(2)}</span>
                </div>
                
                <Button 
                  onClick={handleProcessSale}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  size="lg"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  Valider la Vente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesManager;