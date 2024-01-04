import "./style.css";
import TaskItem from "./model/TaskItem";
import TaskList from "./model/TaskList";
import TaskListTemplate from "./templates/TaskListTemplate";

const initApp = (): void => {
  const taskList = TaskList.instance;
  const template = TaskListTemplate.instance;

  const taskEntryFrom = document.getElementById("task-form") as HTMLFormElement;

  taskEntryFrom.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();

    const input = document.getElementById("task-input") as HTMLInputElement;

    const newTaskId: string = Date.now().toString();

    const newTaskEntry: string = input.value.trim();

    if (newTaskEntry === "") return;
    const newTask = new TaskItem(newTaskId, newTaskEntry);

    taskList.add(newTask);

    input.value = "";

    template.render(taskList);
  });

  taskList.load();
  template.render(taskList);
};

document.addEventListener("DOMContentLoaded", initApp);
