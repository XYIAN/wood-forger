import { Metadata } from 'next';
import { OrderManager } from '@/components/orders';

export const metadata: Metadata = {
  title: 'Orders | Wood Forger',
  description: 'Manage Etsy-style orders, deduct inventory, and track order status in Wood Forger.',
};

export default function OrdersPage() {
  return (
    <main className="p-4 max-w-4xl mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4 text-amber-200">Orders</h1>
      <OrderManager />
    </main>
  );
}
