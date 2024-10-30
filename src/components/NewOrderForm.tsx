import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { NewOrder } from '../types';

const printTypes = ['Business Cards', 'Flyers', 'Brochures', 'Posters', 'Banners'];
const paperTypes = ['Matte', 'Glossy', 'Recycled', 'Premium'];
const sizes = ['Standard', 'Large', 'Custom'];

// Mock clients data - in a real app, this would come from an API
const mockClients = [
  { id: '2', name: 'John Doe', email: 'client@example.com' },
  { id: '3', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '4', name: 'Bob Wilson', email: 'bob@example.com' },
];

interface NewOrderFormProps {
  onSubmit: (order: NewOrder) => void;
  isAdmin?: boolean;
}

export function NewOrderForm({ onSubmit, isAdmin }: NewOrderFormProps) {
  const [formData, setFormData] = useState<NewOrder & { userId?: string }>({
    projectName: '',
    specifications: {
      type: printTypes[0],
      size: sizes[0],
      quantity: 100,
      paperType: paperTypes[0],
      color: true,
    },
    userId: isAdmin ? mockClients[0].id : undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
        <FileText className="w-6 h-6" />
        <h2>New Print Order</h2>
      </div>

      <div className="space-y-4">
        {isAdmin && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Assign to Client</label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.userId}
              onChange={(e) => setFormData({
                ...formData,
                userId: e.target.value,
              })}
            >
              {mockClients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} ({client.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Project Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.projectName}
            onChange={(e) => setFormData({
              ...formData,
              projectName: e.target.value,
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Print Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.specifications.type}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {
                  ...formData.specifications,
                  type: e.target.value,
                },
              })}
            >
              {printTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Size</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.specifications.size}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {
                  ...formData.specifications,
                  size: e.target.value,
                },
              })}
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
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.specifications.quantity}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {
                  ...formData.specifications,
                  quantity: parseInt(e.target.value),
                },
              })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Paper Type</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.specifications.paperType}
              onChange={(e) => setFormData({
                ...formData,
                specifications: {
                  ...formData.specifications,
                  paperType: e.target.value,
                },
              })}
            >
              {paperTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="color"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={formData.specifications.color}
            onChange={(e) => setFormData({
              ...formData,
              specifications: {
                ...formData.specifications,
                color: e.target.checked,
              },
            })}
          />
          <label htmlFor="color" className="ml-2 block text-sm text-gray-700">
            Color Printing
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Submit Order
      </button>
    </form>
  );
}