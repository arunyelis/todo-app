// src/components/TaskAdd.tsx
import React, { useState } from 'react';
import { Priority } from '../types';
import PrioritySelect from './PrioritySelect';
import DatePicker from './DatePicker';
import styles from '../styles/TaskAdd.module.css';
import { MicrophoneIcon, PlusIcon } from './Icons';

type TaskAddProps = {
  taskName: string;
  setTaskName: (taskName: string) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddTask: (priority: Priority, dueDate?: Date) => void;
};

export default function TaskAdd({
  taskName,
  setTaskName,
  onInputKeyDown,
  onAddTask,
}: TaskAddProps) {
  const [priority, setPriority] = useState<Priority>('low');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const handleAddTask = () => {
    onAddTask(priority, dueDate);
    setPriority('low'); // Reset priority after adding
    setDueDate(undefined); // Reset due date after adding
  };

  return (
    <div className={styles.container}>
      <label htmlFor="task-input" className="sr-only">
        Add a task
      </label>
      <div className={styles.inputGroup}>
        <input
          id="task-input"
          className={styles.input}
          placeholder="Add a new task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAddTask();
            } else {
              onInputKeyDown(e);
            }
          }}
        />
        <button
          onClick={handleAddTask}
          className={styles.addButton}
          aria-label="Add task"
        >
          <PlusIcon /> Add
        </button>
        <button className={styles.voiceButton} aria-label="Use voice input">
          <MicrophoneIcon />
        </button>
      </div>

      <div className={styles.optionsRow}>
        <PrioritySelect currentPriority={priority} onChange={setPriority} />

        <DatePicker selectedDate={dueDate} onChange={setDueDate} />
      </div>
    </div>
  );
}
