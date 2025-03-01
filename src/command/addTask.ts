import { Command } from "commander";
import fs from "fs";
import path from "path";

const tasksFilePath = path.join(__dirname, "../tasks.json");

if (!fs.existsSync(tasksFilePath)) {
  fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2));
}

export const addTask = new Command()
  .command("add <task>") // ⬅️ Ensures task is required
  .description("Add a new task to the list")
  .action((task) => {
    const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

    const newTask = {
      id: Date.now(),
      task,
      completed: false,
    };

    tasks.push(newTask);
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));

    console.log(`Task added: "${task}"`);
  });
