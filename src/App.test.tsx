import { describe, expect, test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('App', () => {
  // Test cases
  // Test case 1
  test('should clear the input feild after adding a task', async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add a task' });
    const button = screen.getByRole('button', { name: 'Add task' });
    await user.type(input, 'New task');
    await user.click(button);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  // Test case 2

  test('should not add an empty task', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Get initial number of tasks
    const initialTasks = screen.queryAllByRole('listitem').length;

    const input = screen.getByRole('textbox', { name: 'Add a task' });
    const button = screen.getByRole('button', { name: 'Add task' });

    await user.type(input, '      ');
    await user.click(button);

    await waitFor(() => {
      // After trying to add empty task, number of tasks should remain the same
      expect(screen.queryAllByRole('listitem')).toHaveLength(initialTasks);
    });
  });

  // Test case 3

  test('should add a task by pressing the enter key', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Get initial number of tasks
    const initialTasks = screen.queryAllByRole('listitem').length;

    const input = screen.getByRole('textbox', { name: 'Add a task' });

    // Use a unique task name to avoid conflicts with existing tasks
    await user.type(input, 'Unique Task from Enter Key{enter}');

    await waitFor(() => {
      // Should have one more task than initial
      expect(screen.queryAllByRole('listitem')).toHaveLength(initialTasks + 1);
      // Verify the new task is in the list with unique name
      expect(
        screen.getByText('Unique Task from Enter Key'),
      ).toBeInTheDocument();
    });
  });

  // Test case 4

  test('should render input field and add button', () => {
    render(<App />);

    const input = screen.getByRole('textbox', { name: 'Add a task' });
    const button = screen.getByRole('button', { name: 'Add task' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  // Test case 5

  test('should add a new task when the add button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Count existing tasks
    const initialTasksCount = screen.queryAllByText('New task').length;

    const input = screen.getByRole('textbox', { name: 'Add a task' });
    const button = screen.getByRole('button', { name: 'Add task' });

    await user.type(input, 'New task');
    await user.click(button);

    await waitFor(() => {
      // Check that we have one more task than before
      expect(screen.queryAllByText('New task')).toHaveLength(
        initialTasksCount + 1,
      );
    });
  });
});
