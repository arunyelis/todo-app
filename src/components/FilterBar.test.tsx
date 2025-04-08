// src/components/FilterBar.test.tsx
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from './FilterBar';
import styles from '../styles/FilterBar.module.css';

describe('FilterBar component', () => {
  const mockSetActiveFilter = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders all filter buttons', () => {
    render(
      <FilterBar activeFilter="all" setActiveFilter={mockSetActiveFilter} />,
    );

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Active' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Completed' }),
    ).toBeInTheDocument();
  });

  test('highlights the active filter button', () => {
    render(
      <FilterBar activeFilter="active" setActiveFilter={mockSetActiveFilter} />,
    );

    // Check if the active button has the active class
    expect(screen.getByRole('button', { name: 'Active' })).toHaveClass(
      styles.active,
    );

    // Check if other buttons don't have the active class
    expect(screen.getByRole('button', { name: 'All' })).not.toHaveClass(
      styles.active,
    );
    expect(screen.getByRole('button', { name: 'Completed' })).not.toHaveClass(
      styles.active,
    );
  });

  test('calls setActiveFilter when a filter button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar activeFilter="all" setActiveFilter={mockSetActiveFilter} />,
    );

    // Click on a filter button
    await user.click(screen.getByRole('button', { name: 'Completed' }));

    // Check if setActiveFilter was called with the correct filter
    expect(mockSetActiveFilter).toHaveBeenCalledWith('completed');
  });
});
