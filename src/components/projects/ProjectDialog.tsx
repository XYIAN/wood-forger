'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { useProjects } from '@/hooks/useProjects';
import type { Project } from '@/types/project';

interface ProjectDialogProps {
  visible: boolean;
  onHide: () => void;
  project?: Project;
  mode: 'add' | 'edit';
}

export function ProjectDialog({ visible, onHide, project, mode }: ProjectDialogProps) {
  const { addProject, updateProject } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeSpent: 0,
    cost: 0,
    soldPrice: 0,
    notes: '',
    completed: false,
  });

  useEffect(() => {
    if (project && mode === 'edit') {
      setFormData({
        title: project.title,
        description: project.description,
        timeSpent: project.timeSpent,
        cost: project.cost,
        soldPrice: project.soldPrice || 0,
        notes: project.notes || '',
        completed: project.completed,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        timeSpent: 0,
        cost: 0,
        soldPrice: 0,
        notes: '',
        completed: false,
      });
    }
  }, [project, mode, visible]);

  const handleSubmit = () => {
    if (!formData.title || !formData.description || formData.timeSpent <= 0 || formData.cost <= 0) {
      alert('Please fill in all required fields with valid values.');
      return;
    }

    const projectData = {
      title: formData.title,
      description: formData.description,
      timeSpent: formData.timeSpent,
      cost: formData.cost,
      soldPrice: formData.soldPrice > 0 ? formData.soldPrice : undefined,
      notes: formData.notes || undefined,
      completed: formData.completed,
      materials: [],
      dateStarted: project?.dateStarted || new Date().toISOString().split('T')[0],
    };

    if (mode === 'add') {
      addProject(projectData);
    } else if (project) {
      updateProject(project.id, projectData);
    }

    onHide();
  };

  const footer = (
    <div className="flex gap-2 justify-end">
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={onHide} />
      <Button label={mode === 'add' ? 'Add' : 'Update'} icon="pi pi-check" onClick={handleSubmit} />
    </div>
  );

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={mode === 'add' ? 'Add Project' : 'Edit Project'}
      footer={footer}
      className="w-full max-w-lg"
      modal
      closeOnEscape
      closable
    >
      <div className="space-y-4 p-4">
        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">Project Title</label>
          <InputText
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Oak Dining Table"
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">Description</label>
          <InputTextarea
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe the project..."
            rows={3}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="field">
            <label className="block text-sm font-medium text-amber-200 mb-2">
              Time Spent (hours)
            </label>
            <InputNumber
              value={formData.timeSpent}
              onValueChange={e => setFormData({ ...formData, timeSpent: e.value || 0 })}
              min={0}
              className="w-full"
            />
          </div>

          <div className="field">
            <label className="block text-sm font-medium text-amber-200 mb-2">Material Cost</label>
            <InputNumber
              value={formData.cost}
              onValueChange={e => setFormData({ ...formData, cost: e.value || 0 })}
              min={0}
              mode="currency"
              currency="USD"
              className="w-full"
            />
          </div>
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">
            Sold Price (optional)
          </label>
          <InputNumber
            value={formData.soldPrice}
            onValueChange={e => setFormData({ ...formData, soldPrice: e.value || 0 })}
            min={0}
            mode="currency"
            currency="USD"
            className="w-full"
          />
        </div>

        <div className="field">
          <label className="block text-sm font-medium text-amber-200 mb-2">Notes</label>
          <InputTextarea
            value={formData.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            placeholder="Project notes, tips, client feedback..."
            rows={3}
            className="w-full"
          />
        </div>

        <div className="field-checkbox">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.completed}
              onChange={e => setFormData({ ...formData, completed: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-amber-200">Mark as completed</span>
          </label>
        </div>
      </div>
    </Dialog>
  );
}
