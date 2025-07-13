'use client';

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { useInventory } from '@/hooks/useInventory';

export function InventoryTable() {
  const { inventory } = useInventory();

  if (!inventory) {
    return <Skeleton width="100%" height="10rem" className="mb-4" />;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 shadow-lg">
      <DataTable value={inventory} responsiveLayout="stack" className="w-full" dataKey="id">
        <Column
          field="species.name"
          header="Species"
          body={row => (
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: row.species.color }} />
              {row.species.name}
            </span>
          )}
        />
        <Column field="dimensions" header="Dimensions" />
        <Column field="quantity" header="Stock" />
        <Column field="cost" header="Cost" body={row => `$${row.cost.toFixed(2)}`} />
        <Column field="location" header="Location" />
        <Column header="Notes" body={row => row.notes || '-'} />
        <Column
          header="Actions"
          body={() => <Button icon="pi pi-pencil" className="p-button-text p-1" />}
          style={{ width: '6rem' }}
        />
      </DataTable>
    </div>
  );
}
