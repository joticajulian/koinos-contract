import { program } from "commander";
import inquirer, { Question } from "inquirer";

async function main() {
  program.option("--name");
  program.option("--template");
  program.parse();
  let options = program.opts();
  if (!options) options = {};

  const questions: Question[] = [];

  if (!options.name) {
    questions.push({ type: "input", name: "name", message: "Project name:" });
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Template:",
      choices: ["Token Contract", "NFT Contract", "Hello World"],
    } as unknown as Question);
  }

  inquirer.prompt(questions).then((answers) => {
    Object.keys(answers).forEach((key) => {
      options[key] = answers[key];
    });
  });
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
