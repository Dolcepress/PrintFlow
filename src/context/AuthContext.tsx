import React, { createContext, useContext, useState } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = [
  { id: '1', email: 'admin@printflow.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
  { id: '2', email: 'client@example.com', password: 'client123', name: 'John Doe', role: 'client' as const },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    setAuthState({
      user: userWithoutPassword,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}