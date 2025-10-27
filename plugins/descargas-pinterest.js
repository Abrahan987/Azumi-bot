import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";

let handler = async (m, { conn, text, usedPrefix }) => {
  try {
    if (!text)
      return m.reply(`Uso: ${usedPrefix}pin2 <tema>\nEjemplo: ${usedPrefix}pin2 fondos aesthetic`);

    const api = `https://api-adonix.ultraplus.click/search/pinterest?apikey=gawrgurabot&q=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data?.results?.length)
      return m.reply("No se encontraron resultados.");

    const resultados = data.results.slice(0, 10);
    const tmpDir = path.join(os.tmpdir(), `pin2_${Date.now()}`);
    fs.mkdirSync(tmpDir, { recursive: true });

    const archivos = [];
    for (let i = 0; i < resultados.length; i++) {
      const url = resultados[i];
      try {
        const res = await axios.get(url, { responseType: "arraybuffer" });
        const file = path.join(tmpDir, `img_${i}.jpg`);
        fs.writeFileSync(file, res.data);
        archivos.push(file);
      } catch (err) {
        console.log("Error descargando:", err.message);
      }
    }

    if (!archivos.length) return m.reply("No se pudieron descargar imágenes.");

    const envios = archivos.map((file) =>
      conn.sendMessage(m.chat, { image: fs.readFileSync(file) }, { quoted: m })
        .catch(err => console.log("Error envío:", err.message))
    );

    await Promise.all(envios);

    await conn.sendMessage(
      m.chat,
      { text: `Galería enviada (${archivos.length} imágenes)\nTema: ${text}` },
      { quoted: m }
    );

    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}

  } catch (err) {
    console.error("Error en pin2:", err);
    m.reply("Error interno: " + (err.message || String(err)));
  }
};

handler.help = ["pin2 <texto>"];
handler.tags = ["busqueda"];
handler.command = ["pin2"];
handler.group = true;

export default handler;
