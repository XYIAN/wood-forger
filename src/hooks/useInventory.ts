'use client';

import { useState } from 'react';
import type { InventoryItem, WoodSpecies } from '@/types/inventory';
import { v4 as uuidv4 } from 'uuid';

const sampleSpecies: WoodSpecies[] = [
  { id: 'oak', name: 'Oak', color: '#bfa76f' },
  { id: 'walnut', name: 'Walnut', color: '#6b4f2c' },
  { id: 'maple', name: 'Maple', color: '#f3e9d2' },
  { id: 'cherry', name: 'Cherry', color: '#c97a56' },
  { id: 'mahogany', name: 'Mahogany', color: '#8b4513' },
  { id: 'pine', name: 'Pine', color: '#f4d03f' },
  { id: 'cedar', name: 'Cedar', color: '#a0522d' },
  { id: 'birch', name: 'Birch', color: '#f8f9fa' },
];

const sampleInventory: InventoryItem[] = [
  {
    id: uuidv4(),
    species: sampleSpecies[0], // Oak
    dimensions: '2x4x8ft',
    quantity: 12,
    cost: 8.5,
    location: 'Rack A',
    notes: 'Good for table legs and structural pieces',
    imageUrl: '',
  },
  {
    id: uuidv4(),
    species: sampleSpecies[1], // Walnut
    dimensions: '1x6x6ft',
    quantity: 5,
    cost: 12.0,
    location: 'Rack B',
    notes: 'Dark, beautiful grain for premium projects',
    imageUrl: '',
  },
  {
    id: uuidv4(),
    species: sampleSpecies[2], // Maple
    dimensions: '1x8x4ft',
    quantity: 8,
    cost: 9.5,
    location: 'Rack C',
    notes: 'Light color, great for cutting boards',
    imageUrl: '',
  },
  {
    id: uuidv4(),
    species: sampleSpecies[3], // Cherry
    dimensions: '2x6x8ft',
    quantity: 6,
    cost: 11.0,
    location: 'Rack A',
    notes: 'Rich red color, perfect for furniture',
    imageUrl: '',
  },
  {
    id: uuidv4(),
    species: sampleSpecies[4], // Mahogany
    dimensions: '1x4x10ft',
    quantity: 3,
    cost: 15.0,
    location: 'Premium Shelf',
    notes: 'Exotic wood, limited supply',
    imageUrl: '',
  },
  {
    id: uuidv4(),
    species: sampleSpecies[5], // Pine
    dimensions: '2x4x12ft',
    quantity: 20,
    cost: 4.5,
    location: 'Rack D',
    notes: 'Economical choice for framing and basic projects',
    imageUrl: '',
  },
];

export function useInventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>(sampleInventory);

  function addItem(item: Omit<InventoryItem, 'id'>) {
    const newItem = { ...item, id: uuidv4() };
    setInventory(prev => [...prev, newItem]);
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
