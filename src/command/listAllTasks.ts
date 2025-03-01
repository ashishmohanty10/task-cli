import { Command } from "commander";
import fs from "fs";
import chalk from "chalk";
import { tasksFilePath } from "../utils/path";

export const listTasks = new Command()
  .command("list")
  .description("Lists all tasks")
  .action(() => {
    try {
      const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

      if (tasks.length === 0) {
        console.log(chalk.redBright("📭 No tasks found."));
        return;
      }

      console.log(chalk.blueBright("\n📋 Your Tasks:\n"));

      tasks.forEach(
        (task: { id: number; task: string; completed: boolean }) => {
          const status = task.completed
            ? chalk.green.bold("✔ Completed")
            : chalk.red.bold("⏲ Pending");

          console.log(`${chalk.yellow("🆔 ID:")} ${chalk.cyan(task.id)}`);
          console.log(
            `${chalk.yellow("📝 Task:")} ${chalk.whiteBright(task.task)}`
          );
          console.log(`${chalk.yellow("📌 Status:")} ${status}\n`);
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          chalk.bgRed.white("❌ Error reading tasks:"),
          chalk.redBright(error.message)
        );
      } else {
        console.error(
          chalk.bgRed.white("❌ Error reading tasks:"),
          chalk.redBright(error)
        );
      }
    }
  });
