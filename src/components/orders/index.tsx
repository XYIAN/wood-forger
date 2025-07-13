'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useOrders } from '@/hooks/useOrders';

export function OrderManager() {
  const { orders, processOrder } = useOrders();

  const getStatusSeverity = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'info';
    }
  };

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <Card key={order.id} className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-amber-200">{order.customer}</h3>
                <Tag value={order.status} severity={getStatusSeverity(order.status)} />
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-amber-100/80">
                <span>Total: ${order.total}</span>
                <span>Date: {order.date}</span>
              </div>
              {order.notes && (
                <p className="text-amber-100/70 text-sm mt-2 italic">&ldquo;{order.notes}&rdquo;</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button icon="pi pi-eye" className="p-button-text" />
              {order.status === 'pending' && (
                <Button
                  icon="pi pi-check"
                  className="p-button-success p-button-text"
                  onClick={() => processOrder(order.id)}
                />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
