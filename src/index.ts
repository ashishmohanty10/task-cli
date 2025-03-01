import { Command } from "commander";
import { add } from "./command/addTask";

const program = new Command();
program.name("task-manager").description("Task manager CLI").version("1.0.0");

program.helpOption("-h, --help", "Display help for command");

program
  .option("-a, --add", "Add a new task")
  .option("-l, --list", "List all tasks")
  .option("-d, --done", "Mark a task as done")
  .option("-r, --remove", "Remove a task")
  .option("-c, --clear", "Clear all tasks")
  .option("-u, --update", "Update a task");

program.parse(process.argv);
const options = program.opts();

if (options.add) {
  program.addCommand(add);
}
