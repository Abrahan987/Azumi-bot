// By ABRAHAN-M 

import moment from 'moment-timezone';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
  
    const repo = 'Abrahan987/Azumi-bot';
    const apiUrl = `https://api.github.com/repos/${repo}`;
    const zipUrl = `https://github.com/${repo}/archive/refs/heads/main.zip`;

    // Petición con headers para evitar bloqueos
    const res = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'node.js',
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!res.ok) throw new Error(`Error al obtener datos del repositorio (${res.status})`);

    const json = await res.json();

    // Variables globales seguras
    const packname = global.packname || 'Azumi-Bot';
    const wm = global.wm || 'Bot Oficial';
    const redes = global.redes || '';
    const fkontak = global.fkontak || null;
    const img = global.logo || (typeof imagen1 !== 'undefined' ? imagen1 : null);

    // Fecha en zona horaria de Colombia
    const updated = json.updated_at
      ? moment(json.updated_at).tz('America/Bogota').format('DD/MM/YY - HH:mm:ss')
      : 'Desconocido';

    // Texto informativo
    let txt = `*乂  A Z U M I -  S C R I P T  乂*\n\n`;
    txt += `🧩  *Nombre:* ${json.name}\n`;
    txt += `💫  *Creador:* ${json.owner?.login}\n`;
    txt += `⭐  *Stars:* ${json.stargazers_count}\n`;
    txt += `🍴  *Forks:* ${json.forks_count}\n`;
    txt += `👀  *Visitas:* ${json.watchers_count}\n`;
    txt += `📦  *Peso:* ${(json.size / 1024).toFixed(2)} MB\n`;
    txt += `🕓  *Actualizado:* ${updated}\n`;
    txt += `🔗  *Repositorio:* ${json.html_url}\n\n`;
    txt += `🐉 *${packname}*\n`;

    // Enviar información con mini vista
    await conn.sendMini(m.chat, packname, wm, txt, img, img, redes, fkontak);

    // Esperar un momento antes de enviar el .zip
    await m.react('⏳');

    // Enviar el .zip del repositorio
    await conn.sendMessage(
      m.chat,
      {
        document: { url: zipUrl },
        mimetype: 'application/zip',
        fileName: `${json.name}-main.zip`,
        caption: `📦 Aquí tienes el ZIP de *${json.name}*\n🔗 ${json.html_url}`,
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error('Error al obtener datos del repositorio:', error);
    try { await m.react('❌'); } catch (e) {}
    await conn.sendMessage(m.chat, '⚠️ Error al obtener la información o enviar el .zip del repositorio.', { quoted: m });
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['script', 'sc'];
handler.register = true;

export default handler;
