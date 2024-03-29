import * as url from "url";
import { program } from "commander";
import inquirer, { Question } from "inquirer";
import fs from "fs";
import fse from "fs-extra";
import path from "path";
import { toPascalCase, updatePackageJson } from "./utils.js";

const templateNames = [
  "Generic Contract",
  "Token Contract",
  "NFT Contract",
] as const;

type TemplateName = (typeof templateNames)[number];

function updateFiles(filenames: string[], changes: string[][]) {
  filenames.forEach((filename) => {
    let filedata = fs.readFileSync(filename, "utf8");
    changes.forEach((change) => {
      const [pattern, data] = change;
      filedata = filedata.replace(new RegExp(pattern, "g"), data);
    });
    fs.writeFileSync(filename, filedata);
  });
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
      choices: templateNames,
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

  /**
   * Example:
   *
   * contractName:  "My awesome dapp"
   * contractClass: "MyAwesomeDapp"
   * projectName:   "my-awesome-dapp"
   * protoName:     "myawesomedapp"
   * abiFile:       "myawesomedapp-abi.json"
   */
  const contractName = options.name as string;
  const contractClass = toPascalCase(contractName);
  const projectName = contractName.toLowerCase().replace(/ /g, "-");
  const protoName = contractClass.toLowerCase();
  const abiFile = `${contractClass.toLowerCase()}-abi.json`;

  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
  let sourceDir = path.join(__dirname, "../templates/base");
  fse.copySync(sourceDir, projectName);

  const filesToUpdate = [
    path.join(projectName, "package.json"),
    path.join(projectName, "README.md"),
    path.join(projectName, "src/koinos.config.js"),
    path.join(projectName, "src/asconfig.json"),
    path.join(projectName, "src/assembly/Contract.ts"),
    path.join(projectName, "scripts/deploy.ts"),
  ];

  const templateName = options.template as TemplateName;
  if (templateName === "Generic Contract") {
    sourceDir = path.join(__dirname, "../templates/generic");
    fse.copySync(sourceDir, projectName);
    updatePackageJson("generic", projectName);
    filesToUpdate.push(
      path.join(projectName, "src/assembly/proto/contract.proto"),
    );
  } else if (templateName === "NFT Contract") {
    sourceDir = path.join(__dirname, "../templates/nft");
    fse.copySync(sourceDir, projectName);
    updatePackageJson("nft", projectName);
    filesToUpdate.push(
      path.join(projectName, "scripts/mint.ts"),
      path.join(projectName, "scripts/sell.ts"),
    );
  } else if (templateName === "Token Contract") {
    sourceDir = path.join(__dirname, "../templates/token");
    fse.copySync(sourceDir, projectName);
    updatePackageJson("token", projectName);
    filesToUpdate.push(path.join(projectName, "scripts/mint.ts"));
  }

  updateFiles(filesToUpdate, [
    ["___CONTRACT_NAME___", contractName],
    ["___CONTRACT_CLASS___", contractClass],
    ["___PROJECT_NAME___", projectName],
    ["___PROTO_NAME___", protoName],
    ["___CONTRACT_ABI_FILE___", abiFile],
  ]);

  fs.renameSync(
    path.join(projectName, "src/assembly/Contract.ts"),
    path.join(projectName, "src/assembly", `${contractClass}.ts`),
  );

  fs.renameSync(
    path.join(projectName, ".env.example"),
    path.join(projectName, ".env"),
  );

  if (templateName === "Generic Contract") {
    fs.renameSync(
      path.join(projectName, "src/assembly/proto/contract.proto"),
      path.join(projectName, "src/assembly/proto", `${protoName}.proto`),
    );
  }
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
