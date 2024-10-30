import React, { useState } from 'react';
import { Users, Settings, PlusCircle, ClipboardList } from 'lucide-react';
import { Order } from '../types';
import { OrderList } from './OrderList';
import { NewOrderForm } from './NewOrderForm';

interface AdminPanelProps {
  orders: Order[];
  onUpdateOrder: (orderId: string, status: Order['status']) => void;
}

export function AdminPanel({ orders, onUpdateOrder }: AdminPanelProps) {
  const [showNewOrder, setShowNewOrder] = useState(false);

  const handleNewOrder = (order: Order) => {
    onUpdateOrder(order.id, order.status);
    setShowNewOrder(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Settings className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">Admin Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Total Orders: {orders.length}</span>
            </div>
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
          </div>
        </div>
        
        {!showNewOrder && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {(['pending', 'processing', 'printing', 'completed'] as const).map((status) => (
              <div key={status} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 uppercase">{status}</h3>
                <p className="mt-2 text-2xl font-semibold text-gray-900">
                  {orders.filter(order => order.status === status).length}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {showNewOrder ? (
        <NewOrderForm onSubmit={handleNewOrder} isAdmin={true} />
      ) : (
        <OrderList 
          orders={orders} 
          isAdmin={true}
          onUpdateOrder={onUpdateOrder}
        />
      )}
    </div>
  );
}