// parcheado por ABRAHAN-M
//import db from '../lib/database.js'

let handler = async (m, { text, conn }) => {
    const sender = conn.decodeJid(m.sender);
    let user = global.db.data.users[sender];
    user.afk = + new Date;
    user.afkReason = text;
    m.reply(`
  😴 *AFK* 
Ahora estás inactivo hasta que envíes un mensaje 😿
👤 *Usuario:* ${conn.getName(sender)}
💬 *Razon:* ${text ? text : ''}
  `);
}
handler.help = ['afk <razon>'];
handler.tags = ['fun'];
handler.command = ['afk'];
handler.group = true;

export default handler;
