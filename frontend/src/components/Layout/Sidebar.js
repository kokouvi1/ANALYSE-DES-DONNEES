import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { 
  LayoutDashboard, 
  Pill, 
  ShoppingCart, 
  FileText, 
  Package, 
  Truck, 
  BarChart3, 
  FileSpreadsheet,
  Users,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
  { id: 'medications', label: 'Médicaments', icon: Pill },
  { id: 'sales', label: 'Point de Vente', icon: ShoppingCart },
  { id: 'prescriptions', label: 'Ordonnances', icon: FileText },
  { id: 'inventory', label: 'Inventaire', icon: Package },
  { id: 'suppliers', label: 'Fournisseurs', icon: Truck },
  { id: 'analytics', label: 'Analytiques', icon: BarChart3 },
  { id: 'reports', label: 'Rapports', icon: FileSpreadsheet },
  { id: 'users', label: 'Utilisateurs', icon: Users },
  { id: 'settings', label: 'Paramètres', icon: Settings }
];

const Sidebar = ({ activeSection, onSectionChange, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { currentUser, logout } = useAuth();

  const handleSectionClick = (sectionId) => {
    onSectionChange(sectionId);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-slate-900 text-slate-100 
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentUser?.photo} alt={currentUser?.fullname} />
                <AvatarFallback className="bg-blue-600">
                  {currentUser?.fullname?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold truncate">{currentUser?.fullname}</h3>
                <p className="text-xs text-slate-400 capitalize">{currentUser?.role}</p>
              </div>
            </div>
            <Button
              variant="ghost" 
              size="sm"
              className="lg:hidden text-slate-400 hover:text-slate-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 h-11 ${
                  isActive 
                    ? "bg-slate-800 text-slate-100 shadow-sm" 
                    : "text-slate-300 hover:text-slate-100 hover:bg-slate-800"
                }`}
                onClick={() => handleSectionClick(item.id)}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-slate-300 hover:text-slate-100 hover:bg-slate-800"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;