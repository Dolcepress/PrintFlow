export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
}

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'printing' | 'shipped' | 'completed';
  projectName: string;
  specifications: {
    type: string;
    size: string;
    quantity: number;
    paperType: string;
    color: boolean;
  };
  createdAt: string;
  estimatedCompletion: string;
  trackingNumbers: string[];
  notes?: string;
}

export interface NewOrder {
  projectName: string;
  specifications: {
    type: string;
    size: string;
    quantity: number;
    paperType: string;
    color: boolean;
  };
  userId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}