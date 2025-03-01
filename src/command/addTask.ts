import { Command } from "commander";
import fs from "fs";
import chalk from "chalk";
import { tasksFilePath } from "../utils/path";

if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2));
}

export const addTask = new Command()
  .command("add <task>")
  .description(chalk.blue("Add a new task to the list"))
  .action((task) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

    const newTask = {
      id: Date.now(),
      task,
      completed: false,
    };

    tasks.push(newTask);
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

    console.log(chalk.greenBright(`✅ Task added: ${chalk.yellow.bold(task)}`));
  });
