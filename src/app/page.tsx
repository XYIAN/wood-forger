'use client';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center gap-8 p-4 min-h-[calc(100vh-80px)]">
      <Card className="backdrop-blur-lg bg-white/10 border-none shadow-2xl max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-amber-200 drop-shadow mb-2">🪵 Wood Forger</h1>
        <p className="text-lg text-amber-100 mb-4">
          Glossy, mobile-first woodworking inventory & project tracker.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/inventory">
            <Button label="View Inventory" className="w-full p-button-lg p-button-rounded" />
          </Link>
          <Link href="/projects">
            <Button
              label="Project Log"
              className="w-full p-button-lg p-button-rounded p-button-secondary"
            />
          </Link>
          <Link href="/dashboard">
            <Button
              label="Dashboard"
              className="w-full p-button-lg p-button-rounded p-button-success"
            />
          </Link>
          <Link href="/orders">
            <Button
              label="Orders"
              className="w-full p-button-lg p-button-rounded p-button-warning"
            />
          </Link>
        </div>
      </Card>
    </main>
  );
}
