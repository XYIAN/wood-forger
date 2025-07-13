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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
          <div className="text-4xl font-bold text-amber-200 mb-3 drop-shadow-lg">{totalStock}</div>
          <div className="text-amber-100 font-medium">Total Stock</div>
          <div className="text-amber-100/60 text-sm mt-1">pieces in inventory</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
          <div className="text-4xl font-bold text-green-400 mb-3 drop-shadow-lg">
            ${totalValue.toFixed(0)}
          </div>
          <div className="text-amber-100 font-medium">Inventory Value</div>
          <div className="text-amber-100/60 text-sm mt-1">total worth</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
          <div className="text-4xl font-bold text-blue-400 mb-3 drop-shadow-lg">
            {completedProjects}
          </div>
          <div className="text-amber-100 font-medium">Completed Projects</div>
          <div className="text-amber-100/60 text-sm mt-1">finished this year</div>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 text-center">
          <div className="text-4xl font-bold text-green-400 mb-3 drop-shadow-lg">
            ${totalProfit.toFixed(0)}
          </div>
          <div className="text-amber-100 font-medium">Total Profit</div>
          <div className="text-amber-100/60 text-sm mt-1">from completed projects</div>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20">
          <h3 className="text-xl font-semibold text-amber-200 mb-6 flex items-center gap-2">
            <i className="pi pi-briefcase text-blue-400"></i>
            Recent Projects
          </h3>
          <div className="space-y-4">
            {projects.slice(0, 3).map(project => (
              <div
                key={project.id}
                className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div>
                  <div className="font-medium text-amber-100">{project.title}</div>
                  <div className="text-sm text-amber-100/70 flex items-center gap-2 mt-1">
                    <i className="pi pi-calendar text-amber-400"></i>
                    {project.dateStarted}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-100 font-medium">${project.cost}</div>
                  {project.profit && (
                    <div className="text-sm text-green-400 font-semibold">+${project.profit}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20">
          <h3 className="text-xl font-semibold text-amber-200 mb-6 flex items-center gap-2">
            <i className="pi pi-shopping-cart text-purple-400"></i>
            Recent Orders
          </h3>
          <div className="space-y-4">
            {orders.slice(0, 3).map(order => (
              <div
                key={order.id}
                className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <div>
                  <div className="font-medium text-amber-100">{order.customer}</div>
                  <div className="text-sm text-amber-100/70 flex items-center gap-2 mt-1">
                    <i className="pi pi-calendar text-amber-400"></i>
                    {order.date}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-amber-100 font-medium">${order.total}</div>
                  <div
                    className={`text-sm font-semibold ${
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
      <Card className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20">
        <h3 className="text-xl font-semibold text-amber-200 mb-6 flex items-center gap-2">
          <i className="pi pi-chart-line text-green-400"></i>
          Profit Over Time
        </h3>
        <div className="h-64 flex items-center justify-center text-amber-100/50 bg-white/5 rounded-lg border border-white/10">
          <div className="text-center">
            <i className="pi pi-chart-bar text-4xl mb-2"></i>
            <div>Chart.js integration coming soon...</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
