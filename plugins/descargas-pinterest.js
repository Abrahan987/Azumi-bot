import axios from "axios";
import fs from "fs";
import os from "os";
import path from "path";

let handler = async (m, { conn, text, usedPrefix }) => {
  try {
    if (!text)
      return m.reply(`Uso: ${usedPrefix}pin2 <tema>\nEjemplo: ${usedPrefix}pin2 fondos aesthetic`);

    await conn.sendMessage(m.chat, { text: "🔎 Buscando imágenes, espera un momento..." }, { quoted: m });

    const api = `https://api-adonix.ultraplus.click/search/pinterest?apikey=gawrgurabot&q=${encodeURIComponent(text)}`;
    const { data } = await axios.get(api);

    if (!data?.results?.length)
      return m.reply("⚠️ No se encontraron resultados.");

    const resultados = data.results.slice(0, 10); // máximo 10 imágenes
    const tmpDir = path.join(os.tmpdir(), `pin2_${Date.now()}`);
    fs.mkdirSync(tmpDir, { recursive: true });

    // Descargar imágenes
    const archivos = [];
    for (let i = 0; i < resultados.length; i++) {
      const url = resultados[i];
      try {
        const res = await axios.get(url, { responseType: "arraybuffer" });
        const file = path.join(tmpDir, `img_${i}.jpg`);
        fs.writeFileSync(file, res.data);
        archivos.push(file);
      } catch (err) {
        console.log(`❌ Error descargando ${url}: ${err.message}`);
      }
    }

    if (!archivos.length)
      return m.reply("❌ No se pudieron descargar imágenes.");

    // Contacto falso
    const contactoFalso = {
      key: { participant: "0@s.whatsapp.net" },
      message: {
        contactMessage: {
          displayName: "Pinterest Bot",
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Bot;Pinterest;;;\nFN:Pinterest Auto\nitem1.TEL;waid=573001234567:+57 3001234567\nEND:VCARD`
        }
      }
    };

    await conn.sendMessage(m.chat, { text: "📸 Enviando galería..." }, { quoted: contactoFalso });

    // Enviar imágenes sin delay
    const envios = archivos.map((file) =>
      conn.sendMessage(m.chat, { image: fs.readFileSync(file) }, { quoted: contactoFalso })
        .catch(err => console.log("Error envío:", err.message))
    );

    await Promise.all(envios);

    await conn.sendMessage(
      m.chat,
      {
        text: `✅ Galería enviada (${archivos.length} imágenes)\n🔗 Fuente: Pinterest\n🧩 Tema: *${text}*`
      },
      { quoted: contactoFalso }
    );

    // Borrar temporales
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch {}

  } catch (err) {
    console.error("Error en pin2:", err);
    m.reply("❌ Error interno: " + (err.message || String(err)));
  }
};

handler.help = ["pin2 <texto>"];
handler.tags = ["busqueda"];
handler.command = ["pin2"];
handler.group = true;

export default handler;
