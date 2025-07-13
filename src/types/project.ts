import type { InventoryItem } from './inventory';

export interface Project {
  id: string;
  title: string;
  description: string;
  materials: Array<{ item: InventoryItem; quantity: number }>;
  timeSpent: number; // hours
  cost: number;
  soldPrice?: number;
  profit?: number;
  completed: boolean;
  notes?: string; // markdown
  thumbnailUrl?: string;
  dateStarted: string;
  dateCompleted?: string;
}
