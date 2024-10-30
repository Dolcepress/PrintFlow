import React, { useState } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Order } from '../types';

const printTypes = ['Business Cards', 'Flyers', 'Brochures', 'Posters', 'Banners'];
const paperTypes = ['Matte', 'Glossy', 'Recycled', 'Premium'];
const sizes = ['Standard', 'Large', 'Custom'];
const statusOptions: Order['status'][] = [
  'pending',
  'processing',
  'printing',
  'shipped',
  'completed',
];

interface AdminOrderEditProps {
  order: Order;
  onSave: (updatedOrder: Order) => void;
  onCancel: () => void;
}

export function AdminOrderEdit({ order, onSave, onCancel }: AdminOrderEditProps) {
  const [editedOrder, setEditedOrder] = useState<Order>(order);
  const [newTrackingNumber, setNewTrackingNumber] = useState('');

  const addTrackingNumber = () => {
    if (newTrackingNumber.trim()) {
      setEditedOrder({
        ...editedOrder,
        trackingNumbers: [...editedOrder.trackingNumbers, newTrackingNumber.trim()]
      });
      setNewTrackingNumber('');
    }
  };

  const removeTrackingNumber = (index: number) => {
    setEditedOrder({
      ...editedOrder,
      trackingNumbers: editedOrder.trackingNumbers.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Edit Order #{order.id}</h3>
          <div className="space-x-2">
            <button
              onClick={() => onSave(editedOrder)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={onCancel}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              value={editedOrder.projectName}
              onChange={(e) => setEditedOrder({ ...editedOrder, projectName: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={editedOrder.status}
              onChange={(e) => setEditedOrder({ ...editedOrder, status: e.target.value as Order['status'] })}
              className="mt-1"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Print Type</label>
            <select
              value={editedOrder.specifications.type}
              onChange={(e) => setEditedOrder({
                ...editedOrder,
                specifications: { ...editedOrder.specifications, type: e.target.value }
              })}
              className="mt-1"
            >
              {printTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <select
              value={editedOrder.specifications.size}
              onChange={(e) => setEditedOrder({
                ...editedOrder,
                specifications: { ...editedOrder.specifications, size: e.target.value }
              })}
              className="mt-1"
            >
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              min="1"
              value={editedOrder.specifications.quantity}
              onChange={(e) => setEditedOrder({
                ...editedOrder,
                specifications: { ...editedOrder.specifications, quantity: parseInt(e.target.value) }
              })}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Paper Type</label>
            <select
              value={editedOrder.specifications.paperType}
              onChange={(e) => setEditedOrder({
                ...editedOrder,
                specifications: { ...editedOrder.specifications, paperType: e.target.value }
              })}
              className="mt-1"
            >
              {paperTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Completion</label>
            <input
              type="datetime-local"
              value={editedOrder.estimatedCompletion.slice(0, 16)}
              onChange={(e) => setEditedOrder({
                ...editedOrder,
                estimatedCompletion: new Date(e.target.value).toISOString()
              })}
              className="mt-1"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="color"
              checked={editedOrder.specifications.color}
              onChange={(e) => setEditedOrder({
                ...editedOrder,
                specifications: { ...editedOrder.specifications, color: e.target.checked }
              })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="color" className="ml-2 block text-sm text-gray-700">
              Color Printing
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={editedOrder.notes || ''}
            onChange={(e) => setEditedOrder({ ...editedOrder, notes: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Numbers</label>
          <div className="space-y-2">
            {editedOrder.trackingNumbers.map((number, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={number}
                  readOnly
                  className="flex-1 bg-gray-50"
                />
                <button
                  onClick={() => removeTrackingNumber(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newTrackingNumber}
                onChange={(e) => setNewTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="flex-1"
              />
              <button
                onClick={addTrackingNumber}
                className="p-2 text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}