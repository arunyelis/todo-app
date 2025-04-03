import React from 'react';

type Priority = 'low' | 'medium' | 'high';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = React.useState<Task[]>([
    {
      id: 1,
      title: 'Complete the first task',
      isCompleted: false,
      priority: 'low',
    },
  ]);

  const [taskName, setTaskName] = React.useState('');

  const onAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        title: taskName,
        isCompleted: false,
        priority: 'low',
      },
    ]);
    setTaskName('');
  };
  return (
    <div>
      <h1>Tasks</h1>
      <label htmlFor="task-input">Add a task</label>
      <input
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        id="task-input"
      />
      <button onClick={onAddTask}>Add</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
