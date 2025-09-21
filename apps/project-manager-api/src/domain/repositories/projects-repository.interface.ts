import { DeepPartial } from 'typeorm';
import { IProject } from '@app/common';

export interface IProjectsRepository {
  findAll(userId: number): Promise<IProject[]>;
  findById(userId: number, id: number): Promise<IProject>;
  add(payload: DeepPartial<IProject>): Promise<IProject>;
}
