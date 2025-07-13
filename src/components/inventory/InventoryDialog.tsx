'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useInventory } from '@/hooks/useInventory';
import type { InventoryItem, WoodSpecies } from '@/types/inventory';

interface InventoryDialogProps {
  visible: boolean;
  onHide: () => void;
  item?: InventoryItem;
  mode: 'add' | 'edit';
}

export function InventoryDialog({ visible, onHide, item, mode }: InventoryDialogProps) {
  const { addItem, updateItem, species } = useInventory();
  const [formData, setFormData] = useState({
    species: null as WoodSpecies | null,
    dimensions: '',
    quantity: 0,
    cost: 0,
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (item && mode === 'edit') {
      setFormData({
        species: item.species,
        dimensions: item.dimensions,
        quantity: item.quantity,
        cost: item.cost,
        location: item.location || '',
        notes: item.notes || '',
      });
    } else {
      setFormData({
        species: null,
        dimensions: '',
        quantity: 0,
        cost: 0,
        location: '',
        notes: '',
      });
    }
  }, [item, mode, visible]);

  const handleSubmit = () => {
    if (!formData.species || !formData.dimensions || formData.quantity <= 0 || formData.cost <= 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    const itemData = {
      species: formData.species,
      dimensions: formData.dimensions,
      quantity: formData.quantity,
      cost: formData.cost,
      location: formData.location || undefined,
      notes: formData.notes || undefined,
    };

    if (mode === 'add') {
      addItem(itemData);
    } else if (item) {
      updateItem(item.id, itemData);
    }

    onHide();
  };

  const footer = (
    <div className="flex gap-2 justify-end">
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onHide} />
      <Button label={mode === 'add' ? 'Add' : 'Update'} icon="pi pi-check" onClick={handleSubmit} />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={mode === 'add' ? 'Add Inventory Item' : 'Edit Inventory Item'}
      footer={footer}
      className="w-full max-w-md"
      modal
      closeOnEscape
      closable
    >
      <div className="space-y-4 p-4">
        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">Species</label>
          <Dropdown
            value={formData.species}
            onChange={e => setFormData({ ...formData, species: e.value })}
            options={species}
            optionLabel="name"
            placeholder="Select wood species"
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">Dimensions</label>
          <InputText
            value={formData.dimensions}
            onChange={e => setFormData({ ...formData, dimensions: e.target.value })}
            placeholder="e.g., 2x4x8ft"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="field">
            <label className="block text-sm font-medium text-amber-200 mb-2">Quantity</label>
            <InputNumber
              value={formData.quantity}
              onValueChange={e => setFormData({ ...formData, quantity: e.value || 0 })}
              min={0}
              className="w-full"
            />
          </div>

          <div className="field">
            <label className="block text-sm font-medium text-amber-200 mb-2">Cost per unit</label>
            <InputNumber
              value={formData.cost}
              onValueChange={e => setFormData({ ...formData, cost: e.value || 0 })}
              min={0}
              mode="currency"
              currency="USD"
              className="w-full"
            />
          </div>
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">Location</label>
          <InputText
            value={formData.location}
            onChange={e => setFormData({ ...formData, location: e.target.value })}
            placeholder="e.g., Rack A, Shelf 3"
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">Notes</label>
          <InputText
            value={formData.notes}
            onChange={e => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Additional notes..."
            className="w-full"
          />
        </div>
      </div>
    </Dialog>
  );
}
