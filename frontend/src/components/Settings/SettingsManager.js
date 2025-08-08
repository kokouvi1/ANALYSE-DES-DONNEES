import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useToast } from '../../hooks/use-toast';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database,
  Monitor,
  Mail,
  Lock,
  Camera,
  Save
} from 'lucide-react';

const SettingsManager = () => {
  const { currentUser, updateProfile } = useAuth();
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    fullname: currentUser?.fullname || '',
    email: currentUser?.email || '',
    phone: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    stockAlerts: true,
    salesReports: false,
    systemUpdates: true
  });

  const [systemSettings, setSystemSettings] = useState({
    language: 'fr',
    timezone: 'Europe/Paris',
    currency: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    autoBackup: true,
    sessionTimeout: '30'
  });

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSystemChange = (field, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    const updatedData = {
      fullname: profileData.fullname,
      email: profileData.email,
      phone: profileData.phone
    };

    if (profileData.newPassword) {
      updatedData.password = profileData.newPassword;
    }

    const result = updateProfile(updatedData);
    
    if (result.success) {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
      
      // Clear password fields
      setProfileData(prev => ({
        ...prev,
        newPassword: '',
        confirmPassword: ''
      }));
    } else {
      toast({
        title: "Erreur",
        description: result.error || "Erreur lors de la mise à jour.",
        variant: "destructive",
      });
    }
  };

  const handleNotificationsSubmit = () => {
    // Simulate saving notifications settings
    toast({
      title: "Préférences sauvegardées",
      description: "Vos préférences de notifications ont été mises à jour.",
    });
  };

  const handleSystemSubmit = () => {
    // Simulate saving system settings
    toast({
      title: "Paramètres système mis à jour",
      description: "Les paramètres du système ont été sauvegardés.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Paramètres du Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={currentUser?.photo} alt={currentUser?.fullname} />
                <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                  {currentUser?.fullname?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <h3 className="font-semibold">Photo de profil</h3>
                <Button type="button" variant="outline" size="sm">
                  <Camera className="h-4 w-4 mr-2" />
                  Changer la photo
                </Button>
                <p className="text-xs text-slate-600">JPG, PNG ou GIF (max 5MB)</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Nom complet</Label>
                <Input
                  id="fullname"
                  value={profileData.fullname}
                  onChange={(e) => handleProfileChange('fullname', e.target.value)}
                  placeholder="Votre nom complet"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  placeholder="votre@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  placeholder="+33 1 23 45 67 89"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Input
                  id="role"
                  value={currentUser?.role}
                  disabled
                  className="bg-slate-50"
                />
              </div>
            </div>

            {/* Password Change */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Changer le mot de passe</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={profileData.newPassword}
                    onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                    placeholder="Nouveau mot de passe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={profileData.confirmPassword}
                    onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                    placeholder="Confirmer le mot de passe"
                  />
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-2">
                Laissez vide si vous ne voulez pas changer votre mot de passe.
              </p>
            </div>

            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Sauvegarder le profil
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Préférences de Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Alertes par email</h4>
                <p className="text-sm text-slate-600">Recevoir des notifications importantes par email</p>
              </div>
              <Switch
                checked={notifications.emailAlerts}
                onCheckedChange={(checked) => handleNotificationChange('emailAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Alertes de stock faible</h4>
                <p className="text-sm text-slate-600">Notification quand le stock est faible</p>
              </div>
              <Switch
                checked={notifications.stockAlerts}
                onCheckedChange={(checked) => handleNotificationChange('stockAlerts', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Rapports de ventes</h4>
                <p className="text-sm text-slate-600">Recevoir les rapports de ventes hebdomadaires</p>
              </div>
              <Switch
                checked={notifications.salesReports}
                onCheckedChange={(checked) => handleNotificationChange('salesReports', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="font-medium">Mises à jour système</h4>
                <p className="text-sm text-slate-600">Notifications sur les mises à jour du système</p>
              </div>
              <Switch
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) => handleNotificationChange('systemUpdates', checked)}
              />
            </div>
          </div>

          <Button onClick={handleNotificationsSubmit} className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Sauvegarder les préférences
          </Button>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Paramètres Système
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select value={systemSettings.language} onValueChange={(value) => handleSystemChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select value={systemSettings.timezone} onValueChange={(value) => handleSystemChange('timezone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <Select value={systemSettings.currency} onValueChange={(value) => handleSystemChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="USD">Dollar US ($)</SelectItem>
                  <SelectItem value="GBP">Livre Sterling (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dateFormat">Format de date</Label>
              <Select value={systemSettings.dateFormat} onValueChange={(value) => handleSystemChange('dateFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Délai d'expiration de session (minutes)</Label>
              <Select value={systemSettings.sessionTimeout} onValueChange={(value) => handleSystemChange('sessionTimeout', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 heure</SelectItem>
                  <SelectItem value="120">2 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  <h4 className="font-medium">Sauvegarde automatique</h4>
                  <p className="text-sm text-slate-600">Sauvegarde quotidienne des données</p>
                </div>
                <Switch
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => handleSystemChange('autoBackup', checked)}
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSystemSubmit} className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Sauvegarder les paramètres
          </Button>
        </CardContent>
      </Card>

      {/* Security & Backup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sécurité
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-4 w-4 mr-2" />
              Authentification à deux facteurs
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Historique des connexions
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Changer l'email de récupération
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Sauvegarde & Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Créer une sauvegarde
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Restaurer une sauvegarde
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Exporter toutes les données
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsManager;