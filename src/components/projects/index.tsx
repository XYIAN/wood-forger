'use client';

import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { useProjects } from '@/hooks/useProjects';
import { ProjectDialog } from './ProjectDialog';
import type { Project } from '@/types/project';

export function ProjectLog() {
  const { projects, completeProject, deleteProject } = useProjects();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setDialogMode('edit');
    setDialogVisible(true);
  };

  const handleAdd = () => {
    setSelectedProject(undefined);
    setDialogMode('add');
    setDialogVisible(true);
  };

  const handleComplete = (project: Project) => {
    const soldPrice = prompt(`Enter sold price for "${project.title}":`);
    if (soldPrice && !isNaN(Number(soldPrice)) && Number(soldPrice) > 0) {
      completeProject(project.id, Number(soldPrice));
    }
  };

  const handleDelete = (project: Project) => {
    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
      deleteProject(project.id);
    }
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    setSelectedProject(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-200">Project Log</h2>
        <Button
          label="Add Project"
          icon="pi pi-plus"
          onClick={handleAdd}
          className="p-button-success"
        />
      </div>

      <div className="space-y-4">
        {projects.map(project => (
          <Card
            key={project.id}
            className="bg-white/10 backdrop-blur-lg border-none shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-amber-200">{project.title}</h3>
                  <Tag
                    value={project.completed ? 'Completed' : 'In Progress'}
                    severity={project.completed ? 'success' : 'warning'}
                    className="shadow-lg"
                  />
                </div>
                <p className="text-amber-100 mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-amber-100/80 mb-3">
                  <span className="flex items-center gap-1">
                    <i className="pi pi-clock text-blue-400"></i>
                    {project.timeSpent}h
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="pi pi-dollar text-green-400"></i>${project.cost}
                  </span>
                  {project.soldPrice && (
                    <span className="flex items-center gap-1">
                      <i className="pi pi-shopping-cart text-purple-400"></i>${project.soldPrice}
                    </span>
                  )}
                  {project.profit && (
                    <span className="flex items-center gap-1 font-semibold text-green-400">
                      <i className="pi pi-chart-line"></i>
                      +${project.profit}
                    </span>
                  )}
                </div>
                {project.notes && (
                  <div className="bg-white/5 rounded-lg p-3 border-l-4 border-amber-400">
                    <p className="text-amber-100/80 text-sm italic">
                      &ldquo;{project.notes}&rdquo;
                    </p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  icon="pi pi-pencil"
                  className="p-button-text p-button-sm"
                  onClick={() => handleEdit(project)}
                  tooltip="Edit"
                />
                {!project.completed && (
                  <Button
                    icon="pi pi-check"
                    className="p-button-success p-button-text p-button-sm"
                    onClick={() => handleComplete(project)}
                    tooltip="Mark Complete"
                  />
                )}
                <Button
                  icon="pi pi-trash"
                  className="p-button-text p-button-danger p-button-sm"
                  onClick={() => handleDelete(project)}
                  tooltip="Delete"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <ProjectDialog
        visible={dialogVisible}
        onHide={handleDialogClose}
        project={selectedProject}
        mode={dialogMode}
      />
    </div>
  );
}
