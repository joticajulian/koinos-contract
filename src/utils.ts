import fs from "fs";
import path from "path";
import * as url from "url";

interface PackageJson {
  scripts: {
    [x: string]: string;
  };
}

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export function toPascalCase(string: string) {
  return `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, "g"), " ")
    .replace(new RegExp(/[^\w\s]/, "g"), "")
    .replace(
      new RegExp(/\s+(.)(\w*)/, "g"),
      (_, $2, $3) => `${$2.toUpperCase() + $3}`,
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
}

export function updatePackageJson(projectSource: string, projectName: string) {
  const file1 = path.join(__dirname, "../templates/base/package.json");
  const file2 = path.join(
    __dirname,
    `../templates/${projectSource}/package.json`,
  );
  const data1 = fs.readFileSync(file1, "utf8");
  const data2 = fs.readFileSync(file2, "utf8");
  const json1 = JSON.parse(data1) as PackageJson;
  const json2 = JSON.parse(data2) as PackageJson;

  // TODO: create a general merge of jsons
  Object.keys(json2.scripts).forEach((script) => {
    json1.scripts[script] = json2.scripts[script];
  });

  const dataDestination = JSON.stringify(json1, null, 2);
  const destination = path.join(projectName, "package.json");
  fs.writeFileSync(destination, dataDestination);
}
