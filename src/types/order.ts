import type { InventoryItem } from './inventory';

export interface OrderItem {
  item: InventoryItem;
  quantity: number;
}

export interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  notes?: string;
}
