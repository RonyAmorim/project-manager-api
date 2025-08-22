import { ITask } from "./task.interface";
import { IUser } from "./user.interface";

export class IProject {
    id: number;
    name: string;
    description: string;
    users: IUser[];
    tasks: ITask[];
}
