'use client';

import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-dark-amber/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <PrimeReactProvider
      value={{
        ripple: true,
        inputStyle: 'outlined',
      }}
    >
      {children}
    </PrimeReactProvider>
  );
}
