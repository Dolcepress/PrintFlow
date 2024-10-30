import React, { useState } from 'react';
import { Calendar, Package, Edit2 } from 'lucide-react';
import { Order } from '../types';
import { OrderTracker } from './OrderTracker';
import { AdminOrderEdit } from './AdminOrderEdit';

interface OrderListProps {
  orders: Order[];
  isAdmin?: boolean;
  onUpdateOrder?: (orderId: string, updatedOrder: Order) => void;
}

export function OrderList({ orders, isAdmin, onUpdateOrder }: OrderListProps) {
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);

  const handleSaveEdit = (updatedOrder: Order) => {
    onUpdateOrder?.(updatedOrder.id, updatedOrder);
    setEditingOrderId(null);
  };

  return (
    <div className="space-y-6">
      {orders.map((order) => {
        if (isAdmin && editingOrderId === order.id) {
          return (
            <AdminOrderEdit
              key={order.id}
              order={order}
              onSave={handleSaveEdit}
              onCancel={() => setEditingOrderId(null)}
            />
          );
        }

        return (
          <div key={order.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{order.projectName}</h3>
                <p className="text-sm text-gray-500">Order #{order.id}</p>
              </div>
              {isAdmin ? (
                <button
                  onClick={() => setEditingOrderId(order.id)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit Order
                </button>
              ) : (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'printing' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              )}
            </div>

            <OrderTracker order={order} />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  Created: {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Package className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  Est. Completion: {new Date(order.estimatedCompletion).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Specifications:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-600">
                <div>Type: {order.specifications.type}</div>
                <div>Size: {order.specifications.size}</div>
                <div>Quantity: {order.specifications.quantity}</div>
                <div>Paper: {order.specifications.paperType}</div>
                <div>Color: {order.specifications.color ? 'Yes' : 'No'}</div>
              </div>
            </div>

            {order.trackingNumbers && order.trackingNumbers.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Tracking Numbers:</h4>
                <div className="space-y-1">
                  {order.trackingNumbers.map((number, index) => (
                    <div key={index} className="text-sm text-gray-600">
                      {number}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {order.notes && (
              <div className="mt-4 border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Notes:</h4>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{order.notes}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}