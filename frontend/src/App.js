import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";
import Sidebar from "./components/Layout/Sidebar";
import LoginModal from "./components/Auth/LoginModal";
import RegisterModal from "./components/Auth/RegisterModal";
import Dashboard from "./components/Dashboard/Dashboard";
import MedicationsManager from "./components/Medications/MedicationsManager";
import SalesManager from "./components/Sales/SalesManager";
import PrescriptionsManager from "./components/Prescriptions/PrescriptionsManager";
import InventoryManager from "./components/Inventory/InventoryManager";
import SuppliersManager from "./components/Suppliers/SuppliersManager";
import AnalyticsManager from "./components/Analytics/AnalyticsManager";
import ReportsManager from "./components/Reports/ReportsManager";
import UsersManager from "./components/Users/UsersManager";
import SettingsManager from "./components/Settings/SettingsManager";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Menu, Search } from "lucide-react";
import "./App.css";

const AppContent = () => {
  const { currentUser, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  useEffect(() => {
    if (!isLoading && !currentUser) {
      setShowLoginModal(true);
    }
  }, [currentUser, isLoading]);

  const sectionTitles = {
    dashboard: 'Tableau de Bord',
    medications: 'Gestion des Médicaments',
    sales: 'Point de Vente',
    prescriptions: 'Gestion des Ordonnances',
    inventory: 'Inventaire & Stock',
    suppliers: 'Gestion des Fournisseurs',
    analytics: 'Analytiques Avancées',
    reports: 'Rapports Personnalisés',
    users: 'Gestion des Utilisateurs',
    settings: 'Paramètres du Système'
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'medications':
        return <MedicationsManager />;
      case 'sales':
        return <SalesManager />;
      case 'prescriptions':
        return <PrescriptionsManager />;
      case 'inventory':
        return <InventoryManager />;
      case 'suppliers':
        return <SuppliersManager />;
      case 'analytics':
        return <AnalyticsManager />;
      case 'reports':
        return <ReportsManager />;
      case 'users':
        return <UsersManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <Dashboard />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <>
        <LoginModal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
        <RegisterModal 
          isOpen={showRegisterModal} 
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-4 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-2xl font-bold text-slate-900 truncate">
                {sectionTitles[activeSection]}
              </h1>
            </div>
            
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Recherche globale..."
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          {renderActiveSection()}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;