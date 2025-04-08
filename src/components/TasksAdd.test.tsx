import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskAdd from './TaskAdd';

describe('TaskAdd component', () => {
  const mockSetTaskName = vi.fn();
  const mockOnInputKeyDown = vi.fn();
  const mockOnAddTask = vi.fn();

  const defaultProps = {
    taskName: '',
    setTaskName: mockSetTaskName,
    onInputKeyDown: mockOnInputKeyDown,
    onAddTask: mockOnAddTask,
    onStartVoice: vi.fn(),
    isListening: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input field and buttons correctly', () => {
    render(<TaskAdd {...defaultProps} />);

    // Check for main elements
    expect(screen.getByLabelText('Add a task')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Add a new task...'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add task' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Use voice input' }),
    ).toBeInTheDocument();

    // Check for priority options
    expect(screen.getByText('Priority:')).toBeInTheDocument();
  });

  test('updates input value when typing', async () => {
    const user = userEvent.setup();
    render(<TaskAdd {...defaultProps} />);

    const input = screen.getByLabelText('Add a task');
    await user.clear(input);
    await user.paste('New task');

    // Now it should have been called with the full string
    expect(mockSetTaskName).toHaveBeenCalledWith('New task');
  });

  test('calls onAddTask when Add button is clicked', async () => {
    const user = userEvent.setup();
    render(<TaskAdd {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: 'Add task' });
    await user.click(addButton);

    // By default, it should call with low priority and undefined due date
    expect(mockOnAddTask).toHaveBeenCalledWith('low', undefined);
  });

  test('calls onAddTask when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<TaskAdd {...defaultProps} />);

    const input = screen.getByLabelText('Add a task');
    await user.type(input, '{Enter}');

    expect(mockOnAddTask).toHaveBeenCalledWith('low', undefined);
  });

  test('updates priority when priority buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<TaskAdd {...defaultProps} />);

    // Click high priority button
    const highPriorityBtn = screen.getByRole('button', { name: 'High' });
    await user.click(highPriorityBtn);

    // Now click Add button and check if high priority is passed
    const addButton = screen.getByRole('button', { name: 'Add task' });
    await user.click(addButton);

    expect(mockOnAddTask).toHaveBeenCalledWith('high', undefined);
  });
});
