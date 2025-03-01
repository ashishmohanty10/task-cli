import { Command } from "commander";
import fs from "fs";
import chalk from "chalk";
import { tasksFilePath } from "../utils/path";

export const listTasks = new Command()
  .command("list")
  .description("Lists all tasks, with an optional filter by status")
  .option("-s, --status <status>", "Filter tasks by status (done, pending)")
  .action((options) => {
    try {
      const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

      if (tasks.length === 0) {
        console.log(chalk.redBright("📭 No tasks found."));
        return;
      }

      let filteredTasks = tasks;

      if (options.status) {
        const statusFilter = options.status.toLowerCase();
        if (statusFilter === "done") {
          filteredTasks = tasks.filter(
            (task: { completed: any }) => task.completed
          );
        } else if (statusFilter === "pending") {
          filteredTasks = tasks.filter(
            (task: { completed: any }) => !task.completed
          );
        } else {
          console.log(
            chalk.bgRed.white("❌ Invalid status! Use 'done' or 'pending'.")
          );
          return;
        }
      }

      if (filteredTasks.length === 0) {
        console.log(
          chalk.yellowBright(`📭 No tasks found for status: ${options.status}`)
        );
        return;
      }

      console.log(chalk.blueBright("\n📋 Your Tasks:\n"));

      filteredTasks.forEach(
        (task: { id: number; task: string; completed: boolean }) => {
          const status = task.completed
            ? chalk.green.bold("✔ Done")
            : chalk.red.bold("⏲ Pending");

          console.log(`${chalk.yellow("🆔 ID:")} ${chalk.cyan(task.id)}`);
          console.log(
            `${chalk.yellow("📝 Task:")} ${chalk.whiteBright(task.task)}`
          );
          console.log(`${chalk.yellow("📌 Status:")} ${status}\n`);
        }
      );
    } catch (error) {
      console.error(
        chalk.bgRed.white("❌ Error reading tasks:"),
        chalk.redBright(error instanceof Error ? error.message : error)
      );
    }
  });
