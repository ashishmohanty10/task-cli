import { Command } from "commander";
import fs from "fs";
import { tasksFilePath } from "../utils/path";
import chalk from "chalk";

export const removeTask = new Command()
  .command("remove <id>")
  .description("Remove a task from the list")
  .action((id) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

    const filteredTasks = tasks.filter(
      (task: { id: number }) => task.id !== Number(id)
    );

    if (tasks.length === filteredTasks.length) {
      console.log(chalk.redBright(`❌ Task with ID ${id} not found.`));
      return;
    }

    fs.writeFileSync(tasksFilePath, JSON.stringify(filteredTasks, null, 2));

    console.log(
      chalk.greenBright(`✅ Task with ID ${id} removed successfully.`)
    );
  });
