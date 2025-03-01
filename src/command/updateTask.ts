import { Command } from "commander";
import fs from "fs";
import { tasksFilePath } from "../utils/path";

export const updateTask = new Command()
  .command("update <id>")
  .description("Updates the task")
  .option("-n, --name <newTask>", "New name for the task")
  .option("-c, --completed [complete]", "Toggles the completion status")
  .allowUnknownOption()
  .action((id, options) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

    const taskIndex = tasks.findIndex(
      (task: { id: number }) => task.id === Number(id)
    );

    if (taskIndex === -1) {
      console.log(`❌ Task with ID ${id} not found.`);
      return;
    }

    let updated = false;

    if (options.name) {
      tasks[taskIndex].task = options.name;
      console.log(`✅ Task with ID ${id} updated to: "${options.name}".`);
      updated = true;
    }

    if (options.completed !== undefined) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      console.log(
        `✅ Task with ID ${id} marked as ${
          tasks[taskIndex].completed ? "completed" : "not completed"
        }.`
      );
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
    }
  });
