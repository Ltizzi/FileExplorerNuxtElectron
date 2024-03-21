import { app, BrowserWindow, shell, ipcMain } from "electron";
const path = require("node:path");

const createWindows = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  });
  win.loadURL("http://localhost:3000");
};

app.whenReady().then(() => {
  console.log(".....****.....");
  createWindows();
});
