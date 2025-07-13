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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-200">Order Management</h2>
        <Button label="Add Order" icon="pi pi-plus" className="p-button-success" />
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <Card
            key={order.id}
            className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-amber-200">{order.customer}</h3>
                  <Tag
                    value={order.status}
                    severity={getStatusSeverity(order.status)}
                    className="shadow-lg"
                  />
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-amber-100/80 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="pi pi-dollar text-green-400"></i>${order.total}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="pi pi-calendar text-amber-400"></i>
                    {order.date}
                  </span>
                </div>
                {order.notes && (
                  <div className="bg-white/5 rounded-lg p-3 border-l-4 border-purple-400">
                    <p className="text-amber-100/80 text-sm italic">&ldquo;{order.notes}&rdquo;</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  icon="pi pi-eye"
                  className="p-button-text p-button-sm"
                  tooltip="View Details"
                />
                {order.status === 'pending' && (
                  <Button
                    icon="pi pi-check"
                    className="p-button-success p-button-text p-button-sm"
                    onClick={() => processOrder(order.id)}
                    tooltip="Process Order"
                  />
                )}
                <Button
                  icon="pi pi-trash"
                  className="p-button-text p-button-danger p-button-sm"
                  tooltip="Delete"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
