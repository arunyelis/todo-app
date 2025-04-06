// src/utils/storage.ts
import { Task } from '../types';

const STORAGE_KEY = 'taskify-tasks';

export const saveTasksToStorage = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
};

export const loadTasksFromStorage = (): Task[] => {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (!storedTasks) {
      return [];
    }

    const parsedTasks = JSON.parse(storedTasks);

    interface StoredTask {
      id: number;
      title: string;
      isCompleted: boolean;
      priority: string;
      createdAt?: string;
      dueDate?: string;
      [key: string]: unknown;
    }

    return parsedTasks.map((task: StoredTask) => ({
      ...task,
      createdAt: task.createdAt ? new Date(task.createdAt) : new Date(),
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }));
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
};
