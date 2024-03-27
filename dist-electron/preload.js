//import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer, shell } = require("electron");
import fs from "fs";

console.log("PRELOAD");
// contextBridge.exposeInMainWorld("electronAPI", {
//   open: (route) => ipcRenderer.invoke("open-file", route),
//   // we can also expose variables, not just functions
// });

// contextBridge.exposeInMainWorld("electronAPI", {
//   openFile: () => ipcRenderer.invoke("openFile"),
// });

window.commAPI = {
  openFile: async (route) => {
    await shell
      .openPath(route)
      .then(() => console.log("Archivo abierto exitosamente"))
      .catch((error) => console.error("Error al abrir el archivo:", error));
  },
  checkDiskTotalSpace: (routes) => {
    let array = [];
    routes.forEach((route) => {
      fs.stat(route, (err, stats) => {
        if (err) {
          console.error("Error: ", err);
          return;
        }
        const totalSpaceBytes = stats?.blocks * stats?.blksize;
        array.push({
          route: route,
          space: totalSpaceBytes,
        });
      });
    });
    return array;
  },
};
