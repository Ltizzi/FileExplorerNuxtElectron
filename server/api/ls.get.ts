import fs from "fs";
import path from "path";
import { promisify } from "util";
import usePrintError from "~/composables/usePrintError";
import { HDElement } from "~/types/common";
import printError from "~/utils/printError";
// Obtener el directorio actual
// let directorioActual = process.cwd();

// const argumento = process.argv[2];

// if (argumento) {
//   directorioActual = argumento;
// }

export default defineEventHandler(async (event) => {
  const { dir, template } = getQuery(event);
  //console.log("PARAMS");
  // console.log(dir);
  // console.log(typeof template);
  let templateBool = template === "true";
  if (templateBool) {
    console.log(dir);
    await generateDirectoryListTemplate(dir);
    return;
  } else {
    return {
      dirs: await generateDirectoyListArray(dir),
    };
  }
});

async function generateDirectoyListArray(dir: any): Promise<Array<HDElement>> {
  let actualDir = dir + "\\";
  // console.log(actualDir);
  let array = [] as Array<HDElement>;
  const readDir = promisify(fs.readdir);
  const stat = promisify(fs.stat);
  if (!dir) actualDir = process.cwd();
  try {
    const files = await readDir(actualDir);
    for (const file of files) {
      //console.log(file);
      try {
        const completeRoute = path.join(actualDir, file);
        const stats = await stat(completeRoute);
        const hdElement: HDElement = {
          name: file,
          route: completeRoute,
          folder: actualDir,
          isFolder: stats.isDirectory(),
          size: stats.size,
          modified: stats.mtime,
          access: stats.atimeMs,
          birth: stats.birthtimeMs,
        };
        // console.log(hdElement);
        array.push(hdElement);
      } catch (err: any) {
        printError(err.message);
      }
    }
  } catch (err: any) {
    printError(err.message);
  }
  // console.log("END OF THE LINE");
  // console.log(array);
  return array;
}

async function generateDirectoryListTemplate(
  dir: any
): Promise<Array<string> | string> {
  let directorioActual = dir + "";
  let string = [] as Array<string>;
  const readDir = promisify(fs.readdir);
  const stat = promisify(fs.stat);
  if (!dir) directorioActual = process.cwd();

  try {
    const files = await readDir(directorioActual);
    for (const file of files) {
      try {
        const completeRoute = path.join(directorioActual, file);
        const stats = await stat(completeRoute);

        const isFolder = stats.isDirectory();

        let fileOrDrive = isFolder ? file.toUpperCase() : file;
        let printlnTemplate = `${file + howManySpaces(file)}| ${
          isFolder ? "DIR      " : "file     "
        }|${stats.size} bytes${howManySpaces(stats.size)}| ${stats.mtime}  |`;
        string.push(printlnTemplate);
      } catch (error: any) {
        printError(error.message);
        return "";
      }
    }
  } catch (error: any) {
    return printError(error.message);
  }
  return string;
}

function howManySpaces(nombre: any) {
  let nombreString = nombre + "";
  let cantidadDeCaracteres = nombreString.length;
  let maxSpaceQuantity = 30;
  let resto = maxSpaceQuantity - cantidadDeCaracteres;
  let spaces = "";
  for (let i = 0; i < resto; i++) {
    spaces += " ";
  }
  return spaces;
}
