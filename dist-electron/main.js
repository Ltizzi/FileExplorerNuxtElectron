import { app as n, ipcMain as r, BrowserWindow as t, shell as a } from "electron";
import i, { dirname as l } from "path";
import { fileURLToPath as c } from "url";
const s = c(import.meta.url), p = l(s), h = () => {
  new t({
    webPreferences: {
      preload: i.join(p, "preoload.ts"),
      nodeIntegration: !0
    }
  }).loadURL("http://localhost:3000");
};
async function m(o) {
  await a.openPath(o).then(() => console.log("Archivo abierto exitosamente")).catch((e) => console.error("Error al abrir el archivo:", e));
}
n.whenReady().then(() => {
  h(), r.on("openfile", (o, e) => {
    console.log("ASDASD"), m(e);
  });
});
