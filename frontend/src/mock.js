// Mock data for PharmaTrack Pro
export const mockUsers = [
  {
    id: 1,
    fullname: 'Dr. Marie Dubois',
    username: 'admin',
    email: 'marie.dubois@pharmatrack.com',
    role: 'admin',
    password: 'admin123',
    photo: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    fullname: 'Jean Martin',
    username: 'pharmacist',
    email: 'jean.martin@pharmatrack.com',
    role: 'pharmacist',
    password: 'pharma123',
    photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    fullname: 'Sophie Laurent',
    username: 'assistant',
    email: 'sophie.laurent@pharmatrack.com',
    role: 'assistant',
    password: 'assist123',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b332d30e?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockSuppliers = [
  {
    id: 1,
    name: 'Medica Global',
    contact: 'contact@medica-global.com',
    phone: '+33 1 42 56 78 90',
    address: '123 Rue de la Santé, 75014 Paris'
  },
  {
    id: 2,
    name: 'Pharma Distribution',
    contact: 'support@pharma-distri.com',
    phone: '+33 1 47 89 12 34',
    address: '456 Avenue de l\'Espoir, 69000 Lyon'
  },
  {
    id: 3,
    name: 'Bio Santé Plus',
    contact: 'info@biosanteplus.fr',
    phone: '+33 4 91 23 45 67',
    address: '789 Boulevard Méditerranée, 13000 Marseille'
  }
];

export const mockMedications = [
  {
    id: 1,
    name: 'Ibuprofène 400mg',
    category: 'Anti-inflammatoire',
    price: 5.50,
    stock: 120,
    supplierId: 1,
    barcode: '3401579808539',
    prescription: false,
    description: 'Anti-inflammatoire non stéroïdien'
  },
  {
    id: 2,
    name: 'Amoxicilline 1g',
    category: 'Antibiotique',
    price: 12.75,
    stock: 8,
    supplierId: 1,
    barcode: '3401560202370',
    prescription: true,
    description: 'Antibiotique à large spectre'
  },
  {
    id: 3,
    name: 'Doliprane 1000mg',
    category: 'Analgésique',
    price: 3.20,
    stock: 85,
    supplierId: 2,
    barcode: '3400933960803',
    prescription: false,
    description: 'Paracétamol pour douleurs et fièvre'
  },
  {
    id: 4,
    name: 'Seroplex 20mg',
    category: 'Antidépresseur',
    price: 24.90,
    stock: 15,
    supplierId: 2,
    barcode: '3400937626157',
    prescription: true,
    description: 'Escitalopram pour troubles anxieux'
  },
  {
    id: 5,
    name: 'Ventoline 100µg',
    category: 'Respiratoire',
    price: 8.45,
    stock: 3,
    supplierId: 3,
    barcode: '3400930110904',
    prescription: true,
    description: 'Bronchodilatateur pour asthme'
  },
  {
    id: 6,
    name: 'Vitamines D3',
    category: 'Complément',
    price: 15.80,
    stock: 45,
    supplierId: 3,
    barcode: '3401579434875',
    prescription: false,
    description: 'Supplément vitaminique'
  }
];

export const mockSales = [
  {
    id: 1,
    date: new Date().toISOString().split('T')[0],
    items: [
      { medication: mockMedications[0], quantity: 2, unitPrice: 5.50 },
      { medication: mockMedications[2], quantity: 1, unitPrice: 3.20 }
    ],
    total: 14.20,
    userId: 2
  },
  {
    id: 2,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    items: [
      { medication: mockMedications[1], quantity: 1, unitPrice: 12.75 },
      { medication: mockMedications[3], quantity: 1, unitPrice: 24.90 }
    ],
    total: 37.65,
    userId: 1
  }
];

export const mockPrescriptions = [
  {
    id: 1,
    patient: 'Jean Dupont',
    doctor: 'Dr. Martin Leclerc',
    date: new Date().toISOString().split('T')[0],
    status: 'En attente',
    medications: ['Amoxicilline 1g', 'Doliprane 1000mg']
  },
  {
    id: 2,
    patient: 'Marie Curie',
    doctor: 'Dr. Sophie Dubois',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    status: 'En cours',
    medications: ['Seroplex 20mg']
  },
  {
    id: 3,
    patient: 'Pierre Lecroix',
    doctor: 'Dr. Antoine Leblanc',
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    status: 'Traité',
    medications: ['Ventoline 100µg', 'Ibuprofène 400mg']
  }
];

export const generateMockAnalytics = () => {
  const currentMonth = new Date().getMonth();
  const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return {
    monthlySales: {
      labels: months.slice(Math.max(0, currentMonth - 5), currentMonth + 1),
      data: Array.from({ length: 6 }, () => Math.floor(Math.random() * 50000) + 10000)
    },
    topMedications: mockMedications.slice(0, 5).map(med => ({
      name: med.name,
      quantity: Math.floor(Math.random() * 100) + 20
    })),
    salesByCategory: {
      labels: ['Anti-inflammatoire', 'Antibiotique', 'Analgésique', 'Antidépresseur', 'Respiratoire'],
      data: [25000, 18000, 32000, 15000, 12000]
    },
    stockStatus: {
      inStock: mockMedications.filter(m => m.stock > 10).length,
      lowStock: mockMedications.filter(m => m.stock <= 10 && m.stock > 0).length,
      outOfStock: mockMedications.filter(m => m.stock === 0).length
    }
  };
};