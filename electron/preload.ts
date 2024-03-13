import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel: string, data: any) => ipcRenderer.send(channel, data),
  // we can also expose variables, not just functions
});
