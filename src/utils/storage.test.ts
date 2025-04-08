// src/utils/storage.test.ts
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { saveTasksToStorage, loadTasksFromStorage } from './storage';
import { Task } from '../types';

describe('Storage utilities', () => {
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    localStorageMock = {};

    // Mock localStorage
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(
      (key) => localStorageMock[key] || null,
    );

    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      localStorageMock[key] = String(value);
    });

    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('saveTasksToStorage should store tasks in localStorage', () => {
    const tasks: Task[] = [
      {
        id: 1,
        title: 'Test Task',
        isCompleted: false,
        priority: 'medium',
        createdAt: new Date('2025-01-01'),
      },
    ];

    saveTasksToStorage(tasks);

    // Check if localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'taskify-tasks',
      expect.any(String),
    );

    // Parse the stored value
    const storedValue = JSON.parse(localStorageMock['taskify-tasks']);
    expect(storedValue).toHaveLength(1);
    expect(storedValue[0].id).toBe(1);
    expect(storedValue[0].title).toBe('Test Task');
  });

  test('loadTasksFromStorage should return tasks from localStorage', () => {
    // Set up localStorage with mock data
    localStorageMock['taskify-tasks'] = JSON.stringify([
      {
        id: 1,
        title: 'Test Task',
        isCompleted: false,
        priority: 'medium',
        createdAt: '2025-01-01T00:00:00.000Z',
      },
    ]);

    const tasks = loadTasksFromStorage();

    // Check if tasks were loaded correctly
    expect(tasks).toHaveLength(1);
    expect(tasks[0].id).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
    expect(tasks[0].createdAt).toBeInstanceOf(Date);
  });

  test('loadTasksFromStorage should return empty array when nothing is stored', () => {
    const tasks = loadTasksFromStorage();
    expect(tasks).toEqual([]);
  });
});
