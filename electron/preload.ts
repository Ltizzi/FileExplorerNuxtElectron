//import { contextBridge, ipcRenderer } from "electron";
const { contextBridge, ipcRenderer } = require("electron");

console.log("PRELOAD");
contextBridge.exposeInMainWorld("electronAPI", {
  open: (route: string) => ipcRenderer.invoke("open-file", route),
  // we can also expose variables, not just functions
});

// contextBridge.exposeInMainWorld("electronAPI", {
//   openFile: () => ipcRenderer.invoke("openFile"),
// });
