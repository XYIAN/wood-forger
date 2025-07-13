'use client';

import { useState } from 'react';
import type { Order } from '@/types/order';
import { v4 as uuidv4 } from 'uuid';

const sampleOrders: Order[] = [
  {
    id: uuidv4(),
    customer: 'Sarah Johnson',
    items: [],
    total: 85,
    date: '2024-02-15',
    status: 'pending',
    notes: 'Custom engraving requested',
  },
  {
    id: uuidv4(),
    customer: 'Mike Chen',
    items: [],
    total: 120,
    date: '2024-02-14',
    status: 'completed',
    notes: 'Shipped via UPS',
  },
  {
    id: uuidv4(),
    customer: 'Lisa Rodriguez',
    items: [],
    total: 65,
    date: '2024-02-13',
    status: 'completed',
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  function addOrder(order: Omit<Order, 'id'>) {
    setOrders(prev => [...prev, { ...order, id: uuidv4() }]);
  }

  function updateOrder(id: string, updates: Partial<Order>) {
    setOrders(prev => prev.map(order => (order.id === id ? { ...order, ...updates } : order)));
  }

  function deleteOrder(id: string) {
    setOrders(prev => prev.filter(order => order.id !== id));
  }

  function processOrder(id: string) {
    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status: 'completed' } : order))
    );
  }

  return {
    orders,
    addOrder,
    updateOrder,
    deleteOrder,
    processOrder,
  };
}
