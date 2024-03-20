import { app, BrowserWindow, shell, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindows = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, "preoload.ts"),
      nodeIntegration: true,
    },
  });
  win.loadURL("http://localhost:3000");
};

async function openFile(route: string) {
  await shell
    .openPath(route)
    .then(() => console.log("Archivo abierto exitosamente"))
    .catch((error) => console.error("Error al abrir el archivo:", error));
}

app.whenReady().then(() => {
  createWindows();
  ipcMain.on("openfile", (event, route) => {
    console.log("ASDASD");
    openFile(route);
  });
});
