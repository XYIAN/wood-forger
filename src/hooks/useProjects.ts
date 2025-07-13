'use client';

import { useState } from 'react';
import type { Project } from '@/types/project';
import { v4 as uuidv4 } from 'uuid';

const sampleProjects: Project[] = [
  {
    id: uuidv4(),
    title: 'Oak Dining Table',
    description: 'Rustic farmhouse dining table with breadboard ends',
    materials: [],
    timeSpent: 16,
    cost: 120,
    soldPrice: 450,
    profit: 330,
    completed: true,
    notes: 'Beautiful grain pattern on the top. Client loved the breadboard ends.',
    dateStarted: '2024-01-15',
    dateCompleted: '2024-01-25',
  },
  {
    id: uuidv4(),
    title: 'Walnut Coffee Table',
    description: 'Modern coffee table with hairpin legs',
    materials: [],
    timeSpent: 8,
    cost: 85,
    soldPrice: 280,
    profit: 195,
    completed: true,
    notes: 'Clean lines, great for modern homes.',
    dateStarted: '2024-02-01',
    dateCompleted: '2024-02-08',
  },
  {
    id: uuidv4(),
    title: 'Cherry Cutting Board',
    description: 'End-grain cutting board with juice groove',
    materials: [],
    timeSpent: 3,
    cost: 25,
    completed: false,
    notes: 'In progress - need to add juice groove and finish.',
    dateStarted: '2024-02-10',
  },
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);

  function addProject(project: Omit<Project, 'id'>) {
    setProjects(prev => [...prev, { ...project, id: uuidv4() }]);
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
