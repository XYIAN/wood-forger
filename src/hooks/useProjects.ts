'use client';

import { useState } from 'react';
import type { Project } from '@/types/project';
import { v4 as uuidv4 } from 'uuid';

const sampleProjects: Project[] = [
  {
    id: uuidv4(),
    title: 'Oak Dining Table',
    description: 'Rustic farmhouse dining table with breadboard ends and turned legs',
    materials: [],
    timeSpent: 16,
    cost: 120,
    soldPrice: 450,
    profit: 330,
    completed: true,
    notes:
      'Beautiful grain pattern on the top. Client loved the breadboard ends and requested a matching bench.',
    dateStarted: '2024-01-15',
    dateCompleted: '2024-01-25',
  },
  {
    id: uuidv4(),
    title: 'Walnut Coffee Table',
    description: 'Modern coffee table with hairpin legs and floating top design',
    materials: [],
    timeSpent: 8,
    cost: 85,
    soldPrice: 280,
    profit: 195,
    completed: true,
    notes: 'Clean lines, great for modern homes. Used Danish oil finish for natural look.',
    dateStarted: '2024-02-01',
    dateCompleted: '2024-02-08',
  },
  {
    id: uuidv4(),
    title: 'Cherry Cutting Board',
    description: 'End-grain cutting board with juice groove and rounded edges',
    materials: [],
    timeSpent: 3,
    cost: 25,
    completed: false,
    notes:
      'In progress - need to add juice groove and apply food-safe finish. Client wants it by next week.',
    dateStarted: '2024-02-10',
  },
  {
    id: uuidv4(),
    title: 'Maple Bookcase',
    description: 'Traditional bookcase with adjustable shelves and crown molding',
    materials: [],
    timeSpent: 12,
    cost: 95,
    soldPrice: 320,
    profit: 225,
    completed: true,
    notes:
      'Built for local library. Used pocket hole joinery for clean look. Very satisfied customer.',
    dateStarted: '2024-01-20',
    dateCompleted: '2024-02-05',
  },
  {
    id: uuidv4(),
    title: 'Mahogany Jewelry Box',
    description: 'Handcrafted jewelry box with velvet lining and hidden compartments',
    materials: [],
    timeSpent: 6,
    cost: 45,
    completed: false,
    notes: 'Commission piece for anniversary gift. Need to install hinges and add velvet lining.',
    dateStarted: '2024-02-12',
  },
  {
    id: uuidv4(),
    title: 'Pine Workbench',
    description: 'Heavy-duty workbench with vise and tool storage',
    materials: [],
    timeSpent: 20,
    cost: 150,
    soldPrice: 400,
    profit: 250,
    completed: true,
    notes: 'Built for local woodworking shop. Very sturdy construction with 2x4 frame.',
    dateStarted: '2024-01-05',
    dateCompleted: '2024-01-20',
  },
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  function addProject(project: Omit<Project, 'id'>) {
    const newProject = { ...project, id: uuidv4() };
    setProjects(prev => [...prev, newProject]);
  }

  function updateProject(id: string, updates: Partial<Project>) {
    setProjects(prev =>
      prev.map(project => (project.id === id ? { ...project, ...updates } : project))
    );
  }

  function deleteProject(id: string) {
    setProjects(prev => prev.filter(project => project.id !== id));
  }

  function completeProject(id: string, soldPrice: number) {
    setProjects(prev =>
      prev.map(project => {
        if (project.id === id) {
          const profit = soldPrice - project.cost;
          return {
            ...project,
            completed: true,
            soldPrice,
            profit,
            dateCompleted: new Date().toISOString().split('T')[0],
          };
        }
        return project;
      })
    );
  }

  return {
    projects,
    addProject,
    updateProject,
    deleteProject,
    completeProject,
  };
}
