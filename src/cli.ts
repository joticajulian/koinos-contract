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
  const contractFolder = `${projectName}/packages/contract`;
  const websiteFolder = `${projectName}/packages/website`;

  const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

  // create root with workspaces
  let sourceDir = path.join(__dirname, "../templates/baseWorkspaces");
  fse.copySync(sourceDir, projectName);

  // create base contract
  sourceDir = path.join(__dirname, "../templates/baseContract");
  fse.copySync(sourceDir, contractFolder);

  // create website
  sourceDir = path.join(__dirname, "../templates/website");
  fse.copySync(sourceDir, websiteFolder);

  const createContract = true;
  const createWebsite = true;
  let yarnlockFile: string;
  if (createContract && createWebsite) {
    yarnlockFile = "yarn-contract-website.lock";
  } else if (createContract) {
    yarnlockFile = "yarn-contract.lock";
  } else if (createWebsite) {
    yarnlockFile = "yarn-website.lock";
  } else {
    throw new Error("you should create a contract or a website");
  }
  const sourceFile = path.join(__dirname, "../templates/yarnlocks", yarnlockFile);
  const destFile = path.join(projectName, "yarn.lock");
  fse.copyFileSync(sourceFile, destFile);

  // define files that require some naming updates
  const filesToUpdate = [
    path.join(projectName, "package.json"),
    path.join(contractFolder, "README.md"),
    path.join(contractFolder, "src/koinos.config.js"),
    path.join(contractFolder, "src/asconfig.json"),
    path.join(contractFolder, "src/assembly/Contract.ts"),
    path.join(contractFolder, "scripts/deploy.ts"),
  ];

  // extend the base contract
  const templateName = options.template as TemplateName;
  if (templateName === "Generic Contract") {
    sourceDir = path.join(__dirname, "../templates/generic");
    fse.copySync(sourceDir, contractFolder);
    updatePackageJson("generic", contractFolder);
    filesToUpdate.push(
      path.join(contractFolder, "src/assembly/proto/contract.proto"),
    );
  } else if (templateName === "NFT Contract") {
    sourceDir = path.join(__dirname, "../templates/nft");
    fse.copySync(sourceDir, contractFolder);
    updatePackageJson("nft", contractFolder);
    filesToUpdate.push(
      path.join(contractFolder, "scripts/mint.ts"),
      path.join(contractFolder, "scripts/sell.ts"),
    );
  } else if (templateName === "Token Contract") {
    sourceDir = path.join(__dirname, "../templates/token");
    fse.copySync(sourceDir, contractFolder);
    updatePackageJson("token", contractFolder);
    filesToUpdate.push(path.join(contractFolder, "scripts/mint.ts"));
  }

  updateFiles(filesToUpdate, [
    ["___CONTRACT_NAME___", contractName],
    ["___CONTRACT_CLASS___", contractClass],
    ["___PROJECT_NAME___", projectName],
    ["___PROTO_NAME___", protoName],
    ["___CONTRACT_ABI_FILE___", abiFile],
  ]);

  fs.renameSync(
    path.join(contractFolder, "src/assembly/Contract.ts"),
    path.join(contractFolder, "src/assembly", `${contractClass}.ts`),
  );

  fs.renameSync(
    path.join(contractFolder, ".env.example"),
    path.join(contractFolder, ".env"),
  );

  if (templateName === "Generic Contract") {
    fs.renameSync(
      path.join(contractFolder, "src/assembly/proto/contract.proto"),
      path.join(contractFolder, "src/assembly/proto", `${protoName}.proto`),
    );
  }
}

main()
  .then(() => {})
  .catch((error) => console.error(error));
