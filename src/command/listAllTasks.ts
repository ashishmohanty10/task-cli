import { Command } from "commander";
import fs from "fs";
import { tasksFilePath } from "../utils/path";

export const listTasks = new Command()
  .command("list")
  .description("Lists all tasks")
  .action(() => {
    try {
      const tasks = JSON.parse(fs.readFileSync(tasksFilePath, "utf-8"));

      if (tasks.length === 0) {
        console.log("📭 No tasks found.");
        return;
      }

      console.log("\n📋 Your Tasks:");
      console.table(tasks);
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Error reading tasks:", error.message);
      } else {
        console.error("❌ Error reading tasks:", error);
      }
    }
  });
