import { program } from "commander";
import inquirer, { Question } from "inquirer";
import fs from "fs";
import fse from "fs-extra";
import path from "path";

function updateFile(filename: string, patterns: string[], data: string[]) {
  let filedata = fs.readFileSync(filename, "utf8");
  patterns.forEach((pattern, i) => {
    filedata = filedata.replace(new RegExp(pattern, "g"), data[i]);
  });
  fs.writeFileSync(filename, filedata);
}

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

  await new Promise((resolve) => {
    if (questions.length > 0) {
      inquirer.prompt(questions).then((answers) => {
        Object.keys(answers).forEach((key) => {
          options[key] = answers[key];
        });
        resolve(true);
      });
    } else {
      resolve(true);
    }
  });

  const folderName = (options.name as string).toLowerCase().replace(/ /g, "-");

  const sourceDir = path.join(__dirname, "templates/nft");
  fse.copySync(sourceDir, folderName);

  updateFile(
    path.join(folderName, "package.json"),
    ["##_PROJECT_NAME_##"],
    [folderName]
  );
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
