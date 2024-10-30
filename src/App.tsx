import React, { useState } from 'react';
import { Printer, PlusCircle, ClipboardList, LogOut } from 'lucide-react';
import { Order, NewOrder } from './types';
import { NewOrderForm } from './components/NewOrderForm';
import { OrderList } from './components/OrderList';
import { LoginForm } from './components/LoginForm';
import { AdminPanel } from './components/AdminPanel';
import { AuthProvider, useAuth } from './context/AuthContext';

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: '1001',
    userId: '2',
    status: 'completed',
    projectName: 'Annual Report 2024',
    specifications: {
      type: 'Brochures',
      size: 'Standard',
      quantity: 500,
      paperType: 'Premium',
      color: true,
    },
    createdAt: '2024-03-01T08:00:00Z',
    estimatedCompletion: '2024-03-05T16:00:00Z',
    trackingNumbers: ['1Z999AA1234567890'],
    notes: 'Client requested rush delivery',
  },
  {
    id: '1002',
    userId: '2',
    status: 'printing',
    projectName: 'Business Cards - Marketing Team',
    specifications: {
      type: 'Business Cards',
      size: 'Standard',
      quantity: 1000,
      paperType: 'Matte',
      color: true,
    },
    createdAt: '2024-03-10T10:30:00Z',
    estimatedCompletion: '2024-03-12T15:00:00Z',
    trackingNumbers: [],
  },
];

function AppContent() {
  const { user, isAuthenticated, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [showNewOrder, setShowNewOrder] = useState(false);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const userOrders = user?.role === 'admin' 
    ? orders 
    : orders.filter(order => order.userId === user?.id);

  const handleNewOrder = (newOrder: NewOrder) => {
    const order: Order = {
      id: `${1000 + orders.length + 1}`,
      userId: user?.id ?? '',
      status: 'pending',
      ...newOrder,
      createdAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      trackingNumbers: [],
    };
    setOrders([order, ...orders]);
    setShowNewOrder(false);
  };

  const handleUpdateOrder = (orderId: string, updatedOrder: Order) => {
    setOrders(orders.map(order => 
      order.id === orderId ? updatedOrder : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Printer className="w-8 h-8 text-blue-500" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">PrintFlow Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              {user?.role === 'client' && (
                <button
                  onClick={() => setShowNewOrder(!showNewOrder)}
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  {showNewOrder ? (
                    <>
                      <ClipboardList className="w-5 h-5 mr-2" />
                      View Orders
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-5 h-5 mr-2" />
                      New Order
                    </>
                  )}
                </button>
              )}
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user?.role === 'admin' ? (
          <AdminPanel 
            orders={userOrders}
            onUpdateOrder={handleUpdateOrder}
          />
        ) : showNewOrder ? (
          <NewOrderForm onSubmit={handleNewOrder} />
        ) : (
          <OrderList orders={userOrders} />
        )}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;