import React, { useState } from 'react';
import { mockPrescriptions } from '../../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
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
  FileText, 
  Eye, 
  Check, 
  RefreshCw,
  Calendar,
  User,
  Stethoscope
} from 'lucide-react';

const PrescriptionsManager = () => {
  const { toast } = useToast();
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-yellow-500';
      case 'En cours':
        return 'bg-blue-500';
      case 'Traité':
        return 'bg-green-500';
      case 'Refusé':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'En attente':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">En attente</Badge>;
      case 'En cours':
        return <Badge className="bg-blue-500 hover:bg-blue-600">En cours</Badge>;
      case 'Traité':
        return <Badge className="bg-green-500 hover:bg-green-600">Traité</Badge>;
      case 'Refusé':
        return <Badge variant="destructive">Refusé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleViewPrescription = (prescription) => {
    toast({
      title: `Ordonnance #${prescription.id}`,
      description: `Patient: ${prescription.patient} | Médecin: ${prescription.doctor}`,
    });
  };

  const handleMarkAsProcessed = (id) => {
    setPrescriptions(prev => prev.map(p =>
      p.id === id ? { ...p, status: 'Traité' } : p
    ));
    
    toast({
      title: "Ordonnance traitée",
      description: "L'ordonnance a été marquée comme traitée avec succès.",
    });
  };

  const handleRefreshPrescriptions = () => {
    // Simulate refresh
    toast({
      title: "Liste actualisée",
      description: "La liste des ordonnances a été actualisée.",
    });
  };

  const pendingCount = prescriptions.filter(p => p.status === 'En attente').length;
  const processingCount = prescriptions.filter(p => p.status === 'En cours').length;
  const processedCount = prescriptions.filter(p => p.status === 'Traité').length;

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">En attente</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-500">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">En cours</p>
                <p className="text-3xl font-bold text-blue-600">{processingCount}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Traitées</p>
                <p className="text-3xl font-bold text-green-600">{processedCount}</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prescriptions List */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Gestion des Ordonnances ({prescriptions.length})
            </CardTitle>
            <Button onClick={handleRefreshPrescriptions} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Médicaments</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">
                      #{prescription.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-slate-400" />
                        <span>{prescription.patient}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-slate-400" />
                        <span>{prescription.doctor}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>{new Date(prescription.date).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {prescription.medications.map((med, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1">
                            {med}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(prescription.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewPrescription(prescription)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {prescription.status !== 'Traité' && (
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleMarkAsProcessed(prescription.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {prescriptions.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <FileText className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p>Aucune ordonnance en attente</p>
                <p className="text-sm">Les nouvelles ordonnances apparaîtront ici</p>
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
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Nouvelle Ordonnance</h4>
                  <p className="text-sm text-slate-600">Enregistrer une nouvelle ordonnance</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <Check className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Traitement Rapide</h4>
                  <p className="text-sm text-slate-600">Traiter plusieurs ordonnances</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-purple-100">
                  <RefreshCw className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Synchronisation</h4>
                  <p className="text-sm text-slate-600">Sync avec le système médical</p>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrescriptionsManager;