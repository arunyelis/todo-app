import React from 'react';

type AddTaskProps = {
  taskName: string;
  setTaskName: (taskName: string) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddTask: () => void;
};

export default function TaskAdd({
  taskName,
  setTaskName,
  onInputKeyDown,
  onAddTask,
}: AddTaskProps) {
  return (
    <>
      <label htmlFor="task-input">Add a task</label>
      <input
        id="task-input"
        value={taskName}
        onChange={(e) => {
          console.log('Input changed:', e.target.value);
          setTaskName(e.target.value);
        }}
        onKeyDown={onInputKeyDown}
      />
      <button onClick={onAddTask}>Add</button>
    </>
  );
}
