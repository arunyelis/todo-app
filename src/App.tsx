// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Task, Priority } from './types';
import styles from './styles/App.module.css';
import TaskAdd from './components/TaskAdd';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import { saveTasksToStorage, loadTasksFromStorage } from './utils/storage';
import { useVoiceInput } from './hooks/useVoiceInput';

function App() {
  // Load tasks from storage on initial render
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());
  const [taskName, setTaskName] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // Default filter is 'all'
  const { isListening, startListening } = useVoiceInput((text) => {
    setTaskName(text);
  });

  const handleAddTask = (priority: Priority, dueDate?: Date) => {
    if (taskName.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: taskName,
        isCompleted: false,
        priority,
        dueDate,
        createdAt: new Date(),
      };
      setTasks([...tasks, newTask]);
      setTaskName('');
    }
  };

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasksToStorage(tasks);
    // Debug logs for tasks changes
    console.log('Tasks updated:', tasks);
  }, [tasks]);

  // Debug logs for filter changes
  useEffect(() => {
    console.log('Active filter changed:', activeFilter);
  }, [activeFilter]);

  // Apply filter to tasks
  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !task.isCompleted;
    if (activeFilter === 'completed') return task.isCompleted;
    return true;
  });

  // Debug logs for filtered tasks
  useEffect(() => {
    console.log('Filtered tasks:', filteredTasks);
  }, [filteredTasks]);

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && taskName.trim()) {
      handleAddTask('low');
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
          onAddTask={handleAddTask}
          onStartVoice={startListening}
          isListening={isListening}
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
