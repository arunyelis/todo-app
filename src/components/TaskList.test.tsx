// src/components/TaskList.test.tsx
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './TaskList';
import { Task } from '../types';
import styles from '../styles/TaskList.module.css';

describe('TaskList component', () => {
  const mockToggleComplete = vi.fn();
  const mockDeleteTask = vi.fn();
  const mockUpdateTask = vi.fn();

  // Sample tasks for testing
  const sampleTasks: Task[] = [
    {
      id: 1,
      title: 'Task 1',
      isCompleted: false,
      priority: 'high',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Task 2',
      isCompleted: true,
      priority: 'medium',
      dueDate: new Date('2025-05-15'),
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders empty message when no tasks are provided', () => {
    render(
      <TaskList
        tasks={[]}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />,
    );

    expect(
      screen.getByText('No tasks yet. Add one above!'),
    ).toBeInTheDocument();
  });

  test('renders tasks correctly', () => {
    render(
      <TaskList
        tasks={sampleTasks}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />,
    );

    // Check if tasks are rendered
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    // Check completed task styling
    expect(screen.getByText('Task 2').closest('p')).toHaveClass(
      styles.completed,
    );
  });

  test('calls onToggleComplete when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TaskList
        tasks={sampleTasks}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />,
    );

    // Find the checkbox for Task 1
    const taskItem = screen.getByText('Task 1').closest('li');
    const checkbox = within(taskItem!).getByRole('button', {
      name: 'Mark as complete',
    });

    // Click the checkbox
    await user.click(checkbox);

    // Check if onToggleComplete was called with correct ID
    expect(mockToggleComplete).toHaveBeenCalledWith(1);
  });

  test('calls onDeleteTask when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <TaskList
        tasks={sampleTasks}
        onToggleComplete={mockToggleComplete}
        onDeleteTask={mockDeleteTask}
        onUpdateTask={mockUpdateTask}
      />,
    );

    // Find the delete button for Task 1
    const taskItem = screen.getByText('Task 1').closest('li');
    const deleteButton = within(taskItem!).getByRole('button', {
      name: 'Delete task',
    });

    // Click the delete button
    await user.click(deleteButton);

    // Check if onDeleteTask was called with correct ID
    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });

  // More test cases for editing tasks, etc.
});
