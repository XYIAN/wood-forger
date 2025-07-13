'use client';

import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useProjects } from '@/hooks/useProjects';

export function ProjectLog() {
  const { projects } = useProjects();

  return (
    <div className="space-y-4">
      {projects.map(project => (
        <Card key={project.id} className="bg-white/10 backdrop-blur-lg border-none shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-amber-200">{project.title}</h3>
                <Tag
                  value={project.completed ? 'Completed' : 'In Progress'}
                  severity={project.completed ? 'success' : 'warning'}
                />
              </div>
              <p className="text-amber-100 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-amber-100/80">
                <span>Time: {project.timeSpent}h</span>
                <span>Cost: ${project.cost}</span>
                {project.soldPrice && <span>Sold: ${project.soldPrice}</span>}
                {project.profit && (
                  <span className="text-green-400 font-semibold">Profit: ${project.profit}</span>
                )}
              </div>
              {project.notes && (
                <p className="text-amber-100/70 text-sm mt-2 italic">
                  &ldquo;{project.notes}&rdquo;
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button icon="pi pi-pencil" className="p-button-text" />
              {!project.completed && (
                <Button icon="pi pi-check" className="p-button-success p-button-text" />
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
