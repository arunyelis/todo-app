// src/components/FilterBar.tsx
import styles from '../styles/FilterBar.module.css';

type FilterBarProps = {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
};

export default function FilterBar({
  activeFilter,
  setActiveFilter,
}: FilterBarProps) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filter} ${activeFilter === filter.id ? styles.active : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
