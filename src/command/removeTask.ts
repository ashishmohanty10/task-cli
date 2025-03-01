import { Command } from "commander";
import fs from "fs";
import { tasksFilePath } from "../utils/path";

export const removeTask = new Command()
  .command("remove <id>")
  .description("Remove a task from the list")
  .action((id) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

    const filteredTasks = tasks.filter(
      (task: { id: number }) => task.id !== Number(id)
    );

    if (tasks.length === filteredTasks.length) {
      console.log(`❌ Task with ID ${id} not found.`);
      return;
    }

    fs.writeFileSync(tasksFilePath, JSON.stringify(filteredTasks, null, 2));

    console.log(`✅ Task with ID ${id} removed successfully.`);
  });
