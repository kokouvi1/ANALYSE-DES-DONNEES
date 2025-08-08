import React, { useState } from 'react';
import { mockSales, mockMedications, mockSuppliers } from '../../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';
import { 
  FileSpreadsheet, 
  Download, 
  Calendar,
  BarChart3,
  FileText,
  TrendingUp,
  Package
} from 'lucide-react';

const ReportsManager = () => {
  const { toast } = useToast();
  const [reportConfig, setReportConfig] = useState({
    type: '',
    startDate: '',
    endDate: '',
    format: 'html'
  });
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Set default dates
  React.useEffect(() => {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    
    setReportConfig(prev => ({
      ...prev,
      startDate: lastMonth.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    }));
  }, []);

  const handleConfigChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateSalesReport = (startDate, endDate) => {
    const filteredSales = mockSales.filter(sale => {
      const saleDate = new Date(sale.date);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });

    const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalTransactions = filteredSales.length;
    const averageOrderValue = totalTransactions > 0 ? totalSales / totalTransactions : 0;

    return {
      title: `Rapport de Ventes - ${startDate} au ${endDate}`,
      summary: {
        totalSales: totalSales,
        totalTransactions: totalTransactions,
        averageOrderValue: averageOrderValue,
        period: `${startDate} au ${endDate}`
      },
      details: filteredSales,
      type: 'sales'
    };
  };

  const generateInventoryReport = () => {
    const lowStockItems = mockMedications.filter(med => med.stock <= 10);
    const outOfStockItems = mockMedications.filter(med => med.stock === 0);
    const totalValue = mockMedications.reduce((sum, med) => sum + (med.stock * med.price), 0);

    return {
      title: 'Rapport d\'Inventaire',
      summary: {
        totalItems: mockMedications.length,
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length,
        totalValue: totalValue
      },
      details: {
        lowStockItems,
        outOfStockItems,
        allItems: mockMedications
      },
      type: 'inventory'
    };
  };

  const generateLowStockReport = () => {
    const lowStockItems = mockMedications.filter(med => med.stock <= 10);
    
    return {
      title: 'Rapport de Stock Faible',
      summary: {
        totalLowStock: lowStockItems.length,
        criticalItems: lowStockItems.filter(med => med.stock <= 5).length,
        estimatedReorderValue: lowStockItems.reduce((sum, med) => sum + (med.price * 20), 0)
      },
      details: lowStockItems,
      type: 'lowstock'
    };
  };

  const handleGenerateReport = async () => {
    if (!reportConfig.type) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un type de rapport.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate report generation delay
    setTimeout(() => {
      let report;
      
      switch (reportConfig.type) {
        case 'sales':
          report = generateSalesReport(reportConfig.startDate, reportConfig.endDate);
          break;
        case 'inventory':
          report = generateInventoryReport();
          break;
        case 'lowstock':
          report = generateLowStockReport();
          break;
        default:
          report = null;
      }

      if (report) {
        setGeneratedReport(report);
        toast({
          title: "Rapport généré",
          description: "Le rapport a été généré avec succès.",
        });
      }

      setIsGenerating(false);
    }, 1500);
  };

  const handleExportReport = (format) => {
    if (!generatedReport) return;

    if (format === 'csv') {
      // Simple CSV export simulation
      toast({
        title: "Export CSV",
        description: "Le rapport a été exporté en format CSV.",
      });
    } else if (format === 'pdf') {
      toast({
        title: "Export PDF",
        description: "Le rapport a été exporté en format PDF.",
      });
    }
  };

  const renderReportContent = () => {
    if (!generatedReport) return null;

    switch (generatedReport.type) {
      case 'sales':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Chiffre d'Affaires</h3>
                <p className="text-2xl font-bold text-blue-800">€{generatedReport.summary.totalSales.toFixed(2)}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="text-sm font-medium text-green-600">Transactions</h3>
                <p className="text-2xl font-bold text-green-800">{generatedReport.summary.totalTransactions}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600">Panier Moyen</h3>
                <p className="text-2xl font-bold text-purple-800">€{generatedReport.summary.averageOrderValue.toFixed(2)}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Détail des Ventes</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {generatedReport.details.map((sale) => (
                  <div key={sale.id} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                    <div>
                      <span className="font-medium">Vente #{sale.id}</span>
                      <span className="text-sm text-slate-600 ml-2">{new Date(sale.date).toLocaleDateString()}</span>
                    </div>
                    <span className="font-bold text-green-600">€{sale.total.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'inventory':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Articles Totaux</h3>
                <p className="text-2xl font-bold text-blue-800">{generatedReport.summary.totalItems}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600">Stock Faible</h3>
                <p className="text-2xl font-bold text-yellow-800">{generatedReport.summary.lowStockCount}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-sm font-medium text-red-600">Rupture</h3>
                <p className="text-2xl font-bold text-red-800">{generatedReport.summary.outOfStockCount}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="text-sm font-medium text-green-600">Valeur Totale</h3>
                <p className="text-2xl font-bold text-green-800">€{generatedReport.summary.totalValue.toFixed(0)}</p>
              </div>
            </div>

            {generatedReport.details.lowStockItems.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Articles en Stock Faible</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {generatedReport.details.lowStockItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-slate-600 ml-2">{item.category}</span>
                      </div>
                      <span className="font-bold text-yellow-600">{item.stock} unités</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'lowstock':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-600">Stock Faible</h3>
                <p className="text-2xl font-bold text-yellow-800">{generatedReport.summary.totalLowStock}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h3 className="text-sm font-medium text-red-600">Articles Critiques</h3>
                <p className="text-2xl font-bold text-red-800">{generatedReport.summary.criticalItems}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600">Valeur Réapprovisionnement</h3>
                <p className="text-2xl font-bold text-blue-800">€{generatedReport.summary.estimatedReorderValue.toFixed(0)}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Articles à Réapprovisionner</h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {generatedReport.details.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-slate-600 ml-2">{item.category}</span>
                      <span className="text-sm text-slate-500 ml-2">• €{item.price}</span>
                    </div>
                    <div className="text-right">
                      <span className={`font-bold ${item.stock <= 5 ? 'text-red-600' : 'text-yellow-600'}`}>
                        {item.stock} unités
                      </span>
                      <p className="text-xs text-slate-500">Recommandé: 20 unités</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Rapports générés</p>
                <p className="text-3xl font-bold text-blue-600">24</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <FileSpreadsheet className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Ce mois</p>
                <p className="text-3xl font-bold text-green-600">8</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Automatisés</p>
                <p className="text-3xl font-bold text-purple-600">5</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Programmés</p>
                <p className="text-3xl font-bold text-orange-600">3</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Générateur de Rapports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Type de Rapport</Label>
              <Select value={reportConfig.type} onValueChange={(value) => handleConfigChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Rapport de Ventes</SelectItem>
                  <SelectItem value="inventory">Rapport d'Inventaire</SelectItem>
                  <SelectItem value="lowstock">Rapport de Stock Faible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-date">Date de Début</Label>
              <Input
                id="start-date"
                type="date"
                value={reportConfig.startDate}
                onChange={(e) => handleConfigChange('startDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">Date de Fin</Label>
              <Input
                id="end-date"
                type="date"
                value={reportConfig.endDate}
                onChange={(e) => handleConfigChange('endDate', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select value={reportConfig.format} onValueChange={(value) => handleConfigChange('format', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            onClick={handleGenerateReport} 
            disabled={isGenerating}
            className="w-full md:w-auto"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Génération en cours...
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4 mr-2" />
                Générer le Rapport
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Report */}
      {generatedReport && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {generatedReport.title}
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportReport('csv')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  CSV
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportReport('pdf')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderReportContent()}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Rapports Prédéfinis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-100">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Rapport Mensuel</h4>
                  <p className="text-sm text-slate-600">Synthèse des performances du mois</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-orange-100">
                  <Package className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Alerte Stock</h4>
                  <p className="text-sm text-slate-600">Articles nécessitant un réapprovisionnement</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-100">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Top Ventes</h4>
                  <p className="text-sm text-slate-600">Médicaments les plus vendus</p>
                </div>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsManager;