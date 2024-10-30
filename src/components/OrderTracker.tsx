import React from 'react';
import { CheckCircle2, Printer, Package, Truck, Clock } from 'lucide-react';
import { Order } from '../types';

const statusSteps = [
  { status: 'pending', icon: Clock, label: 'Order Received' },
  { status: 'processing', icon: CheckCircle2, label: 'Processing' },
  { status: 'printing', icon: Printer, label: 'Printing' },
  { status: 'shipped', icon: Truck, label: 'Shipped' },
  { status: 'completed', icon: Package, label: 'Completed' },
];

const getStatusIndex = (status: Order['status']) => 
  statusSteps.findIndex(step => step.status === status);

export function OrderTracker({ order }: { order: Order }) {
  const currentStepIndex = getStatusIndex(order.status);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <div className="relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2" />
        <div 
          className="absolute left-0 top-1/2 h-0.5 bg-blue-500 -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStepIndex;
            return (
              <div key={step.status} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
                } transition-colors duration-200`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  isActive ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}