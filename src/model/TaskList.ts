import TaskItem from "./TaskItem";

interface List {
  list: TaskItem[];
  save(): void;
  load(): void;
  clear(): void;
  add(taskObj: TaskItem): void;
  remove(taskId: string): void;
}

export default class TaskList implements List {
  // The instance have the type of TaskList.
  static instance: TaskList = new TaskList();

  // A private constructor prevents instances of a class from begin created directly outside the class.
  // However, we can access an instance through a method or property within the class
  private constructor(private _list: TaskItem[] = []) {}

  get list(): TaskItem[] {
    return this._list;
  }

  save(): void {
    localStorage.setItem("myTasks", JSON.stringify(this._list));
  }

  load(): void {
    const storedTasks: string | null = localStorage.getItem("myTasks");

    if (typeof storedTasks !== "string") return;

    const parsedTasks: {
      _id: string;
      _description: string;
      _completed: boolean;
    }[] = JSON.parse(storedTasks);

    parsedTasks.forEach((task) => {
      const newTask = new TaskItem(
        task._id,
        task._description,
        task._completed
      );

      TaskList.instance.add(newTask);
    });
  }

  clear(): void {}

  add(taskObj: TaskItem): void {
    TaskList.instance._list.unshift(taskObj);
    this.save();
  }

  remove(taskId: string): void {
    this._list = this._list.filter((task: TaskItem) => task.id !== taskId);
    this.save();
  }
}
