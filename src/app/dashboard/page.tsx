import { Metadata } from 'next';
import { DashboardOverview } from '@/components/dashboard';

export const metadata: Metadata = {
  title: 'Dashboard | Wood Forger',
  description:
    'Woodshop dashboard: see wood in stock, profit over time, and recent projects/orders.',
};

export default function DashboardPage() {
  return (
    <main className="p-4 max-w-4xl mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4 text-amber-200">Dashboard</h1>
      <DashboardOverview />
    </main>
  );
}
