import { app as n, ipcMain as r, BrowserWindow as t, shell as a } from "electron";
import i from "path";
const l = () => {
  new t({
    webPreferences: {
      preload: i.join(__dirname, "preoload.ts"),
      nodeIntegration: !0
    }
  }).loadURL("http://localhost:3000");
};
async function c(o) {
  await a.openPath(o).then(() => console.log("Archivo abierto exitosamente")).catch((e) => console.error("Error al abrir el archivo:", e));
}
n.whenReady().then(() => {
  l(), r.on("openfile", (o, e) => {
    console.log("ASDASD"), c(e);
  });
});
