export type Priority = 'low' | 'medium' | 'high';

//Task Type
export type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};
