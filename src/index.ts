import { Command } from "commander";
import { addTask } from "./command/addTask"; // Ensure the correct path

const program = new Command();

program.name("task-manager").description("Task manager CLI").version("1.0.0");

program.helpOption("-h, --help", "Display help for command");

// ✅ Correctly register the addTask command
program.addCommand(addTask);

program.parse(process.argv);
