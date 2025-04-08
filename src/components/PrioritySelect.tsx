// src/components/PrioritySelect.tsx
import { Priority } from '../types';
import styles from '../styles/PrioritySelect.module.css';

type PrioritySelectProps = {
  currentPriority: Priority;
  onChange: (priority: Priority) => void;
};

export default function PrioritySelect({
  currentPriority,
  onChange,
}: PrioritySelectProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>Priority:</label>
      <div className={styles.options}>
        <button
          className={`${styles.option} ${styles.high} ${currentPriority === 'high' ? styles.selected : ''}`}
          onClick={() => onChange('high')}
        >
          High
        </button>
        <button
          className={`${styles.option} ${styles.medium} ${currentPriority === 'medium' ? styles.selected : ''}`}
          onClick={() => onChange('medium')}
        >
          Medium
        </button>
        <button
          className={`${styles.option} ${styles.low} ${currentPriority === 'low' ? styles.selected : ''}`}
          onClick={() => onChange('low')}
        >
          Low
        </button>
      </div>
    </div>
  );
}
