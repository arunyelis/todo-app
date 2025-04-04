import React from 'react';

type Priority = 'low' | 'medium' | 'high';

//Task Type
type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

//Main App Component
function App() {
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

  //Add Task Function

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

  //Render
  return (
    <div>
      <h1>Tasks</h1>
      <label htmlFor="task-input">Add a task</label>
      <input
        id="task-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onAddTask();
          }
        }}
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
//Export
export default App;
