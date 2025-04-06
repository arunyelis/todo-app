// src/types.ts
export type Priority = 'low' | 'medium' | 'high';

export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority: Priority;
  dueDate?: Date;
  project?: string;
  notes?: string;
  createdAt: Date;
};
