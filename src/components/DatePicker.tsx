// src/components/DatePicker.tsx
import React from 'react';
import styles from '../styles/DatePicker.module.css';

type DatePickerProps = {
  selectedDate: Date | undefined;
  onChange: (date: Date | undefined) => void;
};

export default function DatePicker({
  selectedDate,
  onChange,
}: DatePickerProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      onChange(new Date(value));
    } else {
      onChange(undefined);
    }
  };

  return (
    <div className={styles.container}>
      <label htmlFor="due-date" className={styles.label}>
        Due Date:
      </label>
      <input
        id="due-date"
        type="date"
        className={styles.input}
        value={formatDate(selectedDate)}
        onChange={handleChange}
        min={formatDate(new Date())} // Can't set dates in the past
      />
    </div>
  );
}
