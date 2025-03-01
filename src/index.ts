import { Command } from "commander";
import chalk from "chalk";
import { addTask } from "./command/addTask";
import { removeTask } from "./command/removeTask";
import { updateTask } from "./command/updateTask";
import { listTasks } from "./command/listAllTasks";
import figlet from "figlet";

console.log(
  figlet.textSync("Task Manager", {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
  })
);

const program = new Command();

program
  .name(chalk.blueBright("Task Manager CLI"))
  .description(
    chalk.green(
      "A simple CLI task manager with add, update, remove, and list functionality."
    )
  )
  .version(chalk.yellow("1.0.0"));

program.helpOption("-h, --help", chalk.magenta("Display help for command"));

program.addCommand(addTask);
program.addCommand(removeTask);
program.addCommand(updateTask);
program.addCommand(listTasks);

program.parse(process.argv);
