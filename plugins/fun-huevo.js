// parcheado por ABRAHAN-M
//Codígo creado por Destroy wa.me/584120346669

const handler = async (m, { conn, usedPrefix, command, text }) => {
  let targetUser;

  // Verifica si hay un mensaje al que se está respondiendo o se menciona a alguien
  if (m.isGroup) {
    targetUser = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  } else {
    targetUser = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat;
  }

  if (!targetUser) return m.reply(`*✳️ Menciona a quien deseas agarrarle el huevo jaja*\n\n*📌 Ejemplo :*\n${usedPrefix + command} @tag`);

  const who = conn.decodeJid(targetUser);
  const sender = conn.decodeJid(m.sender);

  let pp = './src/avatar_contact.png';
  try {
    pp = await conn.profilePictureUrl(who, 'image');
  } catch (e) {
    // Si no se puede obtener la imagen, se mantendrá el valor predeterminado
  }

  let username = conn.getName(who);
  let str = `@${sender.split('@')[0]} le está agarrando el huevo a @${who.split('@')[0]} 🍆`;
  let mentionedJid = [who, sender];

  const abrazo = await conn.reply(m.chat, str, m, { mentions: mentionedJid });

  conn.sendMessage(m.chat, { react: { text: '🍆', key: abrazo.key } });
};

handler.help = ['huevo @user'];
handler.tags = ['fun'];
handler.command = ['huevo'];
handler.group = true;

export default handler;
