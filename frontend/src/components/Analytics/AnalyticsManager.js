import React, { useState, useEffect } from 'react';
import { generateMockAnalytics, mockSales, mockMedications } from '../../mock';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity,
  Calendar,
  DollarSign
} from 'lucide-react';

const AnalyticsManager = () => {
  const [analytics, setAnalytics] = useState(null);
  const [timeframe, setTimeframe] = useState('6months');

  useEffect(() => {
    const analyticsData = generateMockAnalytics();
    setAnalytics(analyticsData);
  }, []);

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Calculate revenue trends
  const totalRevenue = mockSales.reduce((sum, sale) => sum + sale.total, 0);
  const averageOrderValue = totalRevenue / mockSales.length;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Chiffre d'affaires</p>
                <p className="text-3xl font-bold text-green-600">€{totalRevenue.toFixed(2)}</p>
                <p className="text-xs text-green-600">+12.5% ce mois</p>
              </div>
              <div className="p-3 rounded-full bg-green-500">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Panier moyen</p>
                <p className="text-3xl font-bold text-blue-600">€{averageOrderValue.toFixed(2)}</p>
                <p className="text-xs text-blue-600">+8.2% ce mois</p>
              </div>
              <div className="p-3 rounded-full bg-blue-500">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Ventes totales</p>
                <p className="text-3xl font-bold text-purple-600">{mockSales.length}</p>
                <p className="text-xs text-purple-600">+15.3% ce mois</p>
              </div>
              <div className="p-3 rounded-full bg-purple-500">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Rotation stock</p>
                <p className="text-3xl font-bold text-orange-600">4.2x</p>
                <p className="text-xs text-orange-600">+5.1% ce mois</p>
              </div>
              <div className="p-3 rounded-full bg-orange-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Évolution des Ventes (6 derniers mois)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.monthlySales.labels.map((month, index) => (
                <div key={month} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{month}</span>
                    <span className="text-sm font-bold text-blue-600">
                      €{analytics.monthlySales.data[index].toLocaleString()}
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(analytics.monthlySales.data[index] / Math.max(...analytics.monthlySales.data)) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Medications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Top 5 Médicaments les Plus Vendus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topMedications.map((medication, index) => (
                <div key={medication.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 hover:bg-green-600 text-xs px-2 py-1">
                        #{index + 1}
                      </Badge>
                      <span className="text-sm font-medium">{medication.name}</span>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {medication.quantity} unités
                    </span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(medication.quantity / Math.max(...analytics.topMedications.map(m => m.quantity))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-purple-500" />
              Ventes par Catégorie
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.salesByCategory.labels.map((category, index) => {
                const percentage = (analytics.salesByCategory.data[index] / analytics.salesByCategory.data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
                const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500'];
                
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`}></div>
                        <span className="text-sm font-medium">{category}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold">€{analytics.salesByCategory.data[index].toLocaleString()}</span>
                        <span className="text-xs text-slate-600 ml-2">({percentage}%)</span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className={`${colors[index % colors.length]} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Stock Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-500" />
              Santé du Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Stock Normal</span>
                  <span className="text-sm font-bold text-green-600">{analytics.stockStatus.inStock} articles</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(analytics.stockStatus.inStock / (analytics.stockStatus.inStock + analytics.stockStatus.lowStock + analytics.stockStatus.outOfStock)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Stock Faible</span>
                  <span className="text-sm font-bold text-yellow-600">{analytics.stockStatus.lowStock} articles</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(analytics.stockStatus.lowStock / (analytics.stockStatus.inStock + analytics.stockStatus.lowStock + analytics.stockStatus.outOfStock)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Rupture de Stock</span>
                  <span className="text-sm font-bold text-red-600">{analytics.stockStatus.outOfStock} articles</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(analytics.stockStatus.outOfStock / (analytics.stockStatus.inStock + analytics.stockStatus.lowStock + analytics.stockStatus.outOfStock)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm text-slate-600">
                  <p>Indicateurs de performance :</p>
                  <ul className="mt-2 space-y-1">
                    <li>• Taux de rotation : <span className="font-semibold">4.2x/an</span></li>
                    <li>• Couverture moyenne : <span className="font-semibold">45 jours</span></li>
                    <li>• Valeur immobilisée : <span className="font-semibold">€82,450</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            Indicateurs de Performance Clés
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-slate-600">Croissance Mensuelle</h3>
              <p className="text-3xl font-bold text-green-600">+12.5%</p>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">En hausse</Badge>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-slate-600">Satisfaction Client</h3>
              <p className="text-3xl font-bold text-blue-600">94.2%</p>
              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Excellent</Badge>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-slate-600">Temps de Service</h3>
              <p className="text-3xl font-bold text-purple-600">2.3min</p>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Optimal</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsManager;