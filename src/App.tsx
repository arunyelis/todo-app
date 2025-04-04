import React from 'react';
import { Task } from './types';
import TaskAdd from './TaskAdd';
//Main App Component
function App() {
  console.log('App rendered');
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: 'Complete the first task',
      isCompleted: false,
      priority: 'low',
    },
  ]);

  //Task Name State
  const [taskName, setTaskName] = React.useState('');

  function onAddTask() {
    const trimmedTaskName = taskName.trim();
    if (!trimmedTaskName) {
      setTaskName('');
      return;
    }

    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: trimmedTaskName,
        isCompleted: false,
        priority: 'low',
      },
    ]);
    setTaskName('');
  }
  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onAddTask();
    }
  }

  return (
    <div>
      <h1>Tasks</h1>
      <TaskAdd
        taskName={taskName}
        setTaskName={setTaskName}
        onInputKeyDown={onInputKeyDown}
        onAddTask={onAddTask}
      />
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
