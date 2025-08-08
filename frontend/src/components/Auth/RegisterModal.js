import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useToast } from '../../hooks/use-toast';
import { UserPlus, User, Mail, Lock, Shield } from 'lucide-react';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { register } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    role: 'assistant',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };

  const checkPasswordStrength = (password) => {
    let score = 0;
    let message = '';
    
    if (password.length > 7) score++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score++;
    if (password.match(/\d/)) score++;
    if (password.match(/[^a-zA-Z\d]/)) score++;

    const messages = ['Faible', 'Moyen', 'Fort', 'Très fort'];
    const colors = ['text-red-500', 'text-yellow-500', 'text-blue-500', 'text-green-500'];
    
    setPasswordStrength({
      score,
      message: messages[score] || 'Très faible',
      color: colors[score] || 'text-red-500'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await register(formData);
      if (result.success) {
        toast({
          title: "Compte créé",
          description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
        });
        onSwitchToLogin();
        setFormData({
          fullname: '',
          username: '',
          email: '',
          role: 'assistant',
          password: '',
          confirmPassword: ''
        });
      } else {
        toast({
          title: "Erreur d'inscription",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'inscription.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg" hideClose>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            <UserPlus className="h-8 w-8 mx-auto mb-2 text-green-600" />
            Création de Compte
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nom Complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={formData.fullname}
                  onChange={handleChange}
                  placeholder="Nom complet"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Nom d'utilisateur"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 z-10" />
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className="pl-10">
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pharmacist">Pharmacien</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mot de passe"
                className="pl-10"
                required
              />
            </div>
            {formData.password && (
              <div className={`text-sm font-medium ${passwordStrength.color}`}>
                Force du mot de passe: {passwordStrength.message}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmer le mot de passe"
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? "Création..." : "S'inscrire"}
          </Button>
        </form>
        
        <div className="text-center pt-4 border-t">
          <p className="text-sm text-slate-600">
            Déjà un compte ?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={onSwitchToLogin}>
              Se connecter
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;