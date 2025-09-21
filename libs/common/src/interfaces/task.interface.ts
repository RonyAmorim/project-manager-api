export interface ITask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  projectId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}