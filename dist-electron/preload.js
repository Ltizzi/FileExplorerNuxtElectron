//import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer, shell } = require("electron");

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
};
