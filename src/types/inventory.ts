export interface WoodSpecies {
  id: string;
  name: string;
  color: string; // hex or tailwind color
}

export interface InventoryItem {
  id: string;
  species: WoodSpecies;
  dimensions: string; // e.g. '2x4x8ft'
  quantity: number;
  cost: number;
  location?: string;
  notes?: string;
  imageUrl?: string;
}
