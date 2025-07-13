'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { useInventory } from '@/hooks/useInventory';
import { useProjects } from '@/hooks/useProjects';
import { useOrders } from '@/hooks/useOrders';

export function DashboardOverview() {
  const { inventory } = useInventory();
  const { projects } = useProjects();
  const { orders } = useOrders();

  const totalStock = inventory.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = inventory.reduce((sum, item) => sum + item.quantity * item.cost, 0);
  const completedProjects = projects.filter(p => p.completed).length;
  const totalProfit = projects
    .filter(p => p.completed)
    .reduce((sum, p) => sum + (p.profit || 0), 0);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg text-center">
          <div className="text-3xl font-bold text-amber-200 mb-2">{totalStock}</div>
          <div className="text-amber-100">Total Stock</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">${totalValue.toFixed(0)}</div>
          <div className="text-amber-100">Inventory Value</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">{completedProjects}</div>
          <div className="text-amber-100">Completed Projects</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">${totalProfit.toFixed(0)}</div>
          <div className="text-amber-100">Total Profit</div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
          <h3 className="text-xl font-semibold text-amber-200 mb-4">Recent Projects</h3>
          <div className="space-y-3">
            {projects.slice(0, 3).map(project => (
              <div
                key={project.id}
                className="flex justify-between items-center p-3 bg-white/5 rounded"
              >
                <div>
                  <div className="font-medium text-amber-100">{project.title}</div>
                  <div className="text-sm text-amber-100/70">{project.dateStarted}</div>
                </div>
                <div className="text-right">
                  <div className="text-amber-100">${project.cost}</div>
                  {project.profit && (
                    <div className="text-sm text-green-400">+${project.profit}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
          <h3 className="text-xl font-semibold text-amber-200 mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {orders.slice(0, 3).map(order => (
              <div
                key={order.id}
                className="flex justify-between items-center p-3 bg-white/5 rounded"
              >
                <div>
                  <div className="font-medium text-amber-100">{order.customer}</div>
                  <div className="text-sm text-amber-100/70">{order.date}</div>
                </div>
                <div className="text-right">
                  <div className="text-amber-100">${order.total}</div>
                  <div
                    className={`text-sm ${
                      order.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <Card className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
        <h3 className="text-xl font-semibold text-amber-200 mb-4">Profit Over Time</h3>
        <div className="h-64 flex items-center justify-center text-amber-100/50">
          Chart.js integration coming soon...
        </div>
      </Card>
    </div>
  );
}
