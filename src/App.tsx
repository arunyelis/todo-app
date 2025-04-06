// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Task, Priority } from './types';
import styles from './styles/App.module.css';
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import { saveTasksToStorage, loadTasksFromStorage } from './utils/storage';

function App() {
  // Load tasks from storage on initial render
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [taskName, setTaskName] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // Default filter is 'all'

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Debug logs to monitor the state
  console.log('Active filter:', activeFilter);
  console.log('All tasks:', tasks);

  // Apply filter to tasks
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !task.isCompleted;
    if (activeFilter === 'completed') return task.isCompleted;
    return true;
  });

  // Debug the filtered tasks
  console.log('Filtered tasks:', filteredTasks);

  function addTask(priority: Priority, dueDate?: Date) {
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) {
      setTaskName('');
      return;
    }

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: trimmedTaskName,
        isCompleted: false,
        priority,
        dueDate,
        createdAt: new Date(),
      },
    ]);
    setTaskName('');
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Only handle non-enter keys here
    if (e.key !== 'Enter') {
      // Any other key handling you need
    }
  }

  function toggleTaskCompletion(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    );
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function updateTask(id: number, updates: Partial<Task>) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Taskify</h1>
      </header>

      <main className={styles.main}>
        <TaskAdd
          taskName={taskName}
          setTaskName={setTaskName}
          onInputKeyDown={handleInputKeyDown}
          onAddTask={addTask}
        />

        <FilterBar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        <TaskList
          tasks={filteredTasks} // Make sure we're passing the filtered tasks
          onToggleComplete={toggleTaskCompletion}
          onDeleteTask={deleteTask}
          onUpdateTask={updateTask}
        />
      </main>
    </div>
  );
}

export default App;
