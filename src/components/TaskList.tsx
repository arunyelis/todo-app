// src/components/TaskList.tsx

import React, { useState } from 'react';
import { Task, Priority } from '../types';
import styles from '../styles/TaskList.module.css';
import PrioritySelect from './PrioritySelect';
import DatePicker from './DatePicker';
import { CheckIcon, DeleteIcon, EditIcon } from './Icons';

type TaskListProps = {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onUpdateTask: (id: number, updates: Partial<Task>) => void;
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onUpdateTask,
}: TaskListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('low');
  const [editDueDate, setEditDueDate] = useState<Date | undefined>(undefined);

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate);
  };

  const saveEdit = () => {
    if (editingId === null) return;

    onUpdateTask(editingId, {
      title: editTitle,
      priority: editPriority,
      dueDate: editDueDate,
    });

    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return styles.highPriority;
      case 'medium':
        return styles.mediumPriority;
      case 'low':
        return styles.lowPriority;
      default:
        return styles.lowPriority;
    }
  };

  // src/components/TaskList.tsx (continued)
  const formatDate = (date?: Date) => {
    if (!date) return 'No due date';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const taskDate = new Date(date);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate.getTime() === today.getTime()) {
      return 'Today';
    } else if (taskDate.getTime() === tomorrow.getTime()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year:
          today.getFullYear() !== taskDate.getFullYear()
            ? 'numeric'
            : undefined,
      });
    }
  };

  return (
    <div className={styles.container}>
      {tasks.length === 0 ? (
        <p className={styles.emptyMessage}>No tasks yet. Add one above!</p>
      ) : (
        <ul className={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.item}>
              {editingId === task.id ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    className={styles.editInput}
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                  />
                  <div className={styles.editOptions}>
                    <PrioritySelect
                      currentPriority={editPriority}
                      onChange={setEditPriority}
                    />
                    <DatePicker
                      selectedDate={editDueDate}
                      onChange={setEditDueDate}
                    />
                  </div>
                  <div className={styles.editActions}>
                    <button onClick={saveEdit} className={styles.saveButton}>
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.taskContent}>
                  <button
                    onClick={() => onToggleComplete(task.id)}
                    className={`${styles.checkbox} ${task.isCompleted ? styles.checked : ''}`}
                    aria-label={
                      task.isCompleted
                        ? 'Mark as incomplete'
                        : 'Mark as complete'
                    }
                  >
                    {task.isCompleted && <CheckIcon />}
                  </button>
                  <div className={styles.details}>
                    <p
                      className={`${styles.title} ${task.isCompleted ? styles.completed : ''}`}
                    >
                      {task.title}
                    </p>
                    <div className={styles.meta}>
                      <span className={getPriorityClass(task.priority)}>
                        {task.priority.toUpperCase()}
                      </span>
                      <span className={styles.dueDate}>
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button
                      onClick={() => startEditing(task)}
                      className={styles.editButton}
                      aria-label="Edit task"
                    >
                      <EditIcon />
                    </button>
                    <button
                      onClick={() => onDeleteTask(task.id)}
                      className={styles.deleteButton}
                      aria-label="Delete task"
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
