'use client';

import React from 'react';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: 'pi pi-home' },
    { href: '/inventory', label: 'Inventory', icon: 'pi pi-box' },
    { href: '/projects', label: 'Projects', icon: 'pi pi-briefcase' },
    { href: '/dashboard', label: 'Dashboard', icon: 'pi pi-chart-bar' },
    { href: '/orders', label: 'Orders', icon: 'pi pi-shopping-cart' },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-amber-200 hover:text-amber-100 transition-colors"
          >
            🪵 Wood Forger
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}>
                <Button
                  label={item.label}
                  icon={item.icon}
                  className={`p-button-text ${pathname === item.href ? 'p-button-raised' : ''}`}
                />
              </Link>
            ))}
          </nav>
          <Button icon="pi pi-bars" className="p-button-text md:hidden" aria-label="Menu" />
        </div>
      </div>
    </header>
  );
}
