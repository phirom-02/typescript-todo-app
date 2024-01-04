export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export default class TaskItem implements Task {
  constructor(
    private _id: string,
    private _description: string,
    private _completed: boolean = false
  ) {}

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get completed(): boolean {
    return this._completed;
  }

  set completed(completed: boolean) {
    this._completed = completed;
  }
}
