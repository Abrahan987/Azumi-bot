const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (text.length < 10) {
    return await conn.reply(m.chat, `📝 Por favor, escribe tu sugerencia. Debe tener al menos 10 caracteres.\n\n*Ejemplo:* ${usedPrefix + command} Me gustaría que añadieran un comando para descargar videos de YouTube.`, m);
  }

  const ownerJid = '573237649689@s.whatsapp.net';
  const senderName = m.pushName || 'un usuario';
  const senderJid = m.sender;

  const suggestionText = `📝 *Nueva Sugerencia*\n\n*De:* ${senderName} (${senderJid.split('@')[0]})\n*Sugerencia:* ${text}`;

  await conn.sendMessage(ownerJid, {
    image: { url: global.foto3 },
    caption: suggestionText,
    ...global.rcanal
  });

  await conn.reply(m.chat, '✅ ¡Gracias por tu sugerencia! Ha sido enviada al propietario.', m);
};

handler.help = ['sugerencia'];
handler.tags = ['info'];
handler.command = ['sugerencia'];

export default handler;
