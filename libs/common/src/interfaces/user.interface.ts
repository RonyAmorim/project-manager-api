import { IProject } from './project.interface';
import { ITask } from './task.interface';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  projects: IProject[];
  tasks: ITask[];
  createdAt: Date;
  updatedAt: Date;
}