import React, { useState, useEffect } from 'react';
import { mockSales, mockMedications, mockSuppliers, generateMockAnalytics } from '../../mock';
import StatCard from './StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { 
  ShoppingBasket, 
  Pill, 
  AlertTriangle, 
  Truck,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const Dashboard = () => {
  const [salesData, setSalesData] = useState(mockSales);
  const [medicationsData, setMedicationsData] = useState(mockMedications);
  const [suppliersData, setSuppliersData] = useState(mockSuppliers);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    // Generate analytics data
    const analyticsData = generateMockAnalytics();
    setAnalytics(analyticsData);
  }, []);

  // Calculate today's sales
  const todaySales = salesData
    .filter(sale => sale.date === new Date().toISOString().split('T')[0])
    .reduce((total, sale) => total + sale.total, 0);

  // Calculate low stock items
  const lowStockItems = medicationsData.filter(med => med.stock <= 10);

  // Calculate previous period comparison for trends
  const yesterdaySales = salesData
    .filter(sale => sale.date === new Date(Date.now() - 86400000).toISOString().split('T')[0])
    .reduce((total, sale) => total + sale.total, 0);
  
  const salesTrend = todaySales > yesterdaySales ? 'up' : todaySales < yesterdaySales ? 'down' : 'stable';
  const salesTrendValue = yesterdaySales > 0 ? 
    `${Math.abs(((todaySales - yesterdaySales) / yesterdaySales) * 100).toFixed(1)}% vs hier` : 
    'Nouveau';

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Ventes du jour"
          value={`€${todaySales.toFixed(2)}`}
          icon={ShoppingBasket}
          iconColor="bg-blue-500"
          trend={salesTrend}
          trendValue={salesTrendValue}
        />
        
        <StatCard
          title="Médicaments en stock"
          value={medicationsData.length}
          icon={Pill}
          iconColor="bg-green-500"
          trend="up"
          trendValue="+2 cette semaine"
        />
        
        <StatCard
          title="Stock faible"
          value={lowStockItems.length}
          icon={AlertTriangle}
          iconColor="bg-orange-500"
          trend={lowStockItems.length > 3 ? 'up' : 'down'}
          trendValue={`${lowStockItems.length} articles`}
        />
        
        <StatCard
          title="Fournisseurs"
          value={suppliersData.length}
          icon={Truck}
          iconColor="bg-purple-500"
          trend="stable"
          trendValue="3 actifs"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Ventes des 6 derniers mois
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.monthlySales.labels.map((month, index) => (
                <div key={month} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{month}</span>
                  <div className="flex items-center gap-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(analytics.monthlySales.data[index] / Math.max(...analytics.monthlySales.data)) * 100}px` }}
                    ></div>
                    <span className="text-sm text-slate-600">
                      €{analytics.monthlySales.data[index].toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertes Stock Faible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.length === 0 ? (
                <p className="text-slate-500 text-center py-4">
                  Aucune alerte de stock faible
                </p>
              ) : (
                lowStockItems.slice(0, 5).map((med) => (
                  <div key={med.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-3">
                      <Pill className="h-4 w-4 text-orange-500" />
                      <div>
                        <p className="font-medium text-sm">{med.name}</p>
                        <p className="text-xs text-slate-600">{med.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-600">
                        {med.stock} unités
                      </p>
                      <p className="text-xs text-slate-500">Restantes</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité Récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {salesData.slice(0, 5).map((sale) => (
              <div key={sale.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <ShoppingBasket className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-sm">Vente #{sale.id}</p>
                    <p className="text-xs text-slate-600">
                      {sale.items.length} article(s) - {new Date(sale.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">
                    €{sale.total.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;