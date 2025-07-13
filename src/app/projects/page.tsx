import { Metadata } from 'next';
import { ProjectLog } from '@/components/projects';

export const metadata: Metadata = {
  title: 'Projects | Wood Forger',
  description:
    'Log woodworking projects, track time, materials, costs, and profit with Wood Forger.',
};

export default function ProjectsPage() {
  return (
    <main className="p-4 max-w-4xl mx-auto pt-8">
      <h1 className="text-2xl font-bold mb-4 text-amber-200">Project Log</h1>
      <ProjectLog />
    </main>
  );
}
