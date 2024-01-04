import TaskList from "../model/TaskList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(taskList: TaskList): void;
}

export default class TaskListTemplate implements DOMList {
  ul: HTMLUListElement;
  editOverlay: HTMLDivElement;

  static instance: TaskListTemplate = new TaskListTemplate();

  private constructor() {
    this.ul = document.querySelector<HTMLUListElement>("#task-list")!;
    this.editOverlay = document.querySelector<HTMLDivElement>("#edit-overlay")!;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  closeEditModal(): void {
    this.editOverlay.classList.remove("flex");
    this.editOverlay.classList.add("hidden");
  }

  openEditModal(): void {
    this.editOverlay.classList.remove("hidden");
    this.editOverlay.classList.add("flex");
  }

  render(taskList: TaskList): void {
    this.clear();

    taskList.list.forEach((task) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "flex items-center gap-4 p-2 shadow-md rounded-md mb-2";

      // check
      const checkContainer = document.createElement("span") as HTMLSpanElement;
      checkContainer.className = "p-1 cursor-pointer";
      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = task.id;
      check.tabIndex = 0;
      check.checked = task.completed;
      check.addEventListener("change", (): void => {
        task.completed = !task.completed;
        this.render(taskList);
        taskList.save();
      });
      checkContainer.append(check);
      li.append(checkContainer);

      // label description
      const label = document.createElement("label") as HTMLLabelElement;
      label.className = `flex-1 text-sm text-gray-500 ${
        task.completed ? "line-through text-gray-400" : ""
      }`;
      label.htmlFor = task.id;
      label.textContent = task.description;
      li.append(label);

      // remove button
      const removeContainer = document.createElement("span") as HTMLSpanElement;
      const remove = document.createElement("i") as HTMLLIElement;
      remove.className = "ti ti-x text-red-500 p-1 cursor-pointer";
      removeContainer.append(remove);
      removeContainer.addEventListener("click", (): void => {
        taskList.remove(task.id);
        this.render(taskList);
      });
      li.append(removeContainer);

      // edit button
      const editContainer = document.createElement("span") as HTMLSpanElement;
      const edit = document.createElement("i") as HTMLLIElement;
      edit.className = "ti ti-edit text-blue-500 p-1 cursor-pointer";
      editContainer.append(edit);
      editContainer.addEventListener("click", (): void => {
        // open modal
        this.openEditModal();

        // get edit input
        const editInput = document.getElementById(
          "edit-input"
        ) as HTMLInputElement;
        editInput.value = task.description;

        // get edit form
        const editForm = document.getElementById(
          "edit-form"
        ) as HTMLFormElement;

        editForm?.addEventListener("submit", (e: SubmitEvent) => {
          e.preventDefault();

          const newEdit: string = editInput.value;

          if (!editInput || newEdit === task.description) {
            this.closeEditModal();
            return;
          }

          task.description = newEdit;
          this.closeEditModal();
          this.render(taskList);
          taskList.save();
        });

        // get close button
        const closeBtn = document.querySelector(
          "#close-modal"
        ) as HTMLDivElement;
        closeBtn.addEventListener("click", (): void => {
          this.closeEditModal();
        });
      });
      li.append(editContainer);

      this.ul.append(li);
    });
  }
}
