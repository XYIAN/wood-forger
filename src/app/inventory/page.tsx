import { Metadata } from 'next';
import { InventoryTable } from '@/components/inventory';

export const metadata: Metadata = {
  title: 'Inventory | Wood Forger',
  description:
    'Track wood species, dimensions, stock, and cost in your woodworking shop with Wood Forger.',
};

export default function InventoryPage() {
  return (
    <main className="p-4 max-w-4xl mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4 text-amber-200">Inventory</h1>
      <InventoryTable />
    </main>
  );
}
