'use client';

import { useState } from 'react';
import type { InventoryItem, WoodSpecies } from '@/types/inventory';
import { v4 as uuidv4 } from 'uuid';

const sampleSpecies: WoodSpecies[] = [
  { id: 'oak', name: 'Oak', color: '#bfa76f' },
  { id: 'walnut', name: 'Walnut', color: '#6b4f2c' },
  { id: 'maple', name: 'Maple', color: '#f3e9d2' },
  { id: 'cherry', name: 'Cherry', color: '#c97a56' },
];

const sampleInventory: InventoryItem[] = [
  {
    id: uuidv4(),
    species: sampleSpecies[0],
    dimensions: '2x4x8ft',
    quantity: 12,
    cost: 8.5,
    location: 'Rack A',
    notes: 'Good for table legs',
    imageUrl: '',
  },
  {
    id: uuidv4(),
    species: sampleSpecies[1],
    dimensions: '1x6x6ft',
    quantity: 5,
    cost: 12.0,
    location: 'Rack B',
    notes: 'Dark, beautiful grain',
    imageUrl: '',
  },
];

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);

  function addItem(item: Omit<InventoryItem, 'id'>) {
    setInventory(prev => [...prev, { ...item, id: uuidv4() }]);
  }

  function updateItem(id: string, updates: Partial<InventoryItem>) {
    setInventory(prev => prev.map(item => (item.id === id ? { ...item, ...updates } : item)));
  }

  function deleteItem(id: string) {
    setInventory(prev => prev.filter(item => item.id !== id));
  }

  return {
    inventory,
    addItem,
    updateItem,
    deleteItem,
    species: sampleSpecies,
  };
}
