import fs from "fs";
import { exec } from "child_process";

export default defineEventHandler(async () => {
  const rootDirs = await getRootDirectories()
    .then((rootDirs: any) => {
      return rootDirs;
    })
    .catch((error: any) => {
      console.log(error.message);
    });
  console.log(rootDirs);
  if (rootDirs) {
    return {
      drives: rootDirs,
    };
  }
});

function getUnixRootDirectories() {
  return fs.readdirSync("/");
}

async function getWindowsRootDirectories() {
  console.log("fetching windows drives...");
  return new Promise((resolve, reject) => {
    exec("wmic logicaldisk get caption", (error, stdout) => {
      if (error) reject(error);
      else {
        const drives = stdout
          .split("\n")
          .map((line: any) => line.trim() + "\\")
          .filter((line: any) => line && line !== "Caption\\" && line !== "\\");
        // console.log(drives);
        resolve(drives);
      }
    });
  });
}

async function getRootDirectories() {
  if (process.platform === "win32") {
    return await getWindowsRootDirectories();
  } else return getUnixRootDirectories();
}
