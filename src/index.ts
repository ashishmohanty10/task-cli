import { Command } from "commander";
import { addTask } from "./command/addTask";
import { removeTask } from "./command/removeTask";
import { updateTask } from "./command/updateTask";
import { listTasks } from "./command/listAllTasks";

const program = new Command();

program.name("task-manager").description("Task manager CLI").version("1.0.0");

program.helpOption("-h, --help", "Display help for command");

program.addCommand(addTask);
program.addCommand(removeTask);
program.addCommand(updateTask);
program.addCommand(listTasks);

program.parse(process.argv);
