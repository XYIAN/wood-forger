'use client';

import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { useInventory } from '@/hooks/useInventory';
import { InventoryDialog } from './InventoryDialog';
import type { InventoryItem } from '@/types/inventory';

export function InventoryTable() {
  const { inventory, deleteItem } = useInventory();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | undefined>();
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  if (!inventory) {
    return <Skeleton width="100%" height="10rem" className="mb-4" />;
  }

  const handleEdit = (item: InventoryItem) => {
    setSelectedItem(item);
    setDialogMode('edit');
    setDialogVisible(true);
  };

  const handleAdd = () => {
    setSelectedItem(undefined);
    setDialogMode('add');
    setDialogVisible(true);
  };

  const handleDelete = (item: InventoryItem) => {
    if (confirm(`Are you sure you want to delete ${item.species.name} (${item.dimensions})?`)) {
      deleteItem(item.id);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setSelectedItem(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-200">Wood Inventory</h2>
        <Button
          label="Add Item"
          icon="pi pi-plus"
          onClick={handleAdd}
          className="p-button-success"
        />
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-2xl border border-white/20">
        <DataTable
          value={inventory}
          responsiveLayout="stack"
          className="w-full"
          dataKey="id"
          stripedRows
          showGridlines={false}
        >
          <Column
            field="species.name"
            header="Species"
            body={row => (
              <span className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full shadow-lg"
                  style={{ background: row.species.color }}
                />
                <span className="font-medium text-amber-100">{row.species.name}</span>
              </span>
            )}
          />
          <Column
            field="dimensions"
            header="Dimensions"
            body={row => <span className="text-amber-100">{row.dimensions}</span>}
          />
          <Column
            field="quantity"
            header="Stock"
            body={row => <span className="font-semibold text-blue-400">{row.quantity}</span>}
          />
          <Column
            field="cost"
            header="Cost"
            body={row => <span className="text-green-400 font-medium">${row.cost.toFixed(2)}</span>}
          />
          <Column
            field="location"
            header="Location"
            body={row => <span className="text-amber-100/80">{row.location || '-'}</span>}
          />
          <Column
            header="Notes"
            body={row => <span className="text-amber-100/70 text-sm">{row.notes || '-'}</span>}
          />
          <Column
            header="Actions"
            body={row => (
              <div className="flex gap-2">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-text p-button-sm"
                  onClick={() => handleEdit(row)}
                  tooltip="Edit"
                />
                <Button
                  icon="pi pi-trash"
                  className="p-button-text p-button-danger p-button-sm"
                  onClick={() => handleDelete(row)}
                  tooltip="Delete"
                />
              </div>
            )}
            style={{ width: '8rem' }}
          />
        </DataTable>
      </div>

      <InventoryDialog
        visible={dialogVisible}
        onHide={handleDialogClose}
        item={selectedItem}
        mode={dialogMode}
      />
    </div>
  );
}
