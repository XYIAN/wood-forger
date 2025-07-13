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
    notes: 'Custom engraving requested on the cutting board. Will pick up on Saturday.',
  },
  {
    id: uuidv4(),
    customer: 'Mike Chen',
    items: [],
    total: 120,
    date: '2024-02-14',
    status: 'completed',
    notes: 'Shipped via UPS. Customer very happy with the quality.',
  },
  {
    id: uuidv4(),
    customer: 'Lisa Rodriguez',
    items: [],
    total: 65,
    date: '2024-02-13',
    status: 'completed',
    notes: 'Local pickup. Cash payment received.',
  },
  {
    id: uuidv4(),
    customer: 'David Thompson',
    items: [],
    total: 95,
    date: '2024-02-16',
    status: 'pending',
    notes: 'Requested natural finish, no stains. Will call when ready.',
  },
  {
    id: uuidv4(),
    customer: 'Emily Wilson',
    items: [],
    total: 150,
    date: '2024-02-12',
    status: 'completed',
    notes: 'Wedding gift for friends. Shipped to California.',
  },
  {
    id: uuidv4(),
    customer: 'Robert Davis',
    items: [],
    total: 75,
    date: '2024-02-17',
    status: 'pending',
    notes: 'Needs by next Friday for birthday party.',
  },
];

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  function addOrder(order: Omit<Order, 'id'>) {
    const newOrder = { ...order, id: uuidv4() };
    setOrders(prev => [...prev, newOrder]);
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
