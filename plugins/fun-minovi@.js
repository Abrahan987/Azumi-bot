// parcheado por ABRAHAN-M
//Codígo creado por Destroy wa.me/584120346669

let handler = async (m, { conn, text }) => {
  let targetUser;

  // Verifica si hay un mensaje al que se está respondiendo
  if (m.quoted && m.quoted.sender) {
      targetUser = m.quoted.sender; // Obtiene el remitente del mensaje citado
  } else if (text) {
      targetUser = conn.parseMention(text)[0]; // Obtiene el usuario mencionado en el texto
  } else {
      return conn.reply(m.chat, 'Por favor, menciona a alguien o responde a su mensaje.', m); // Mensaje de error
  }

  const userId = conn.decodeJid(targetUser);

  let pp = [global.foto1, global.foto2, global.foto3, global.foto4, global.foto5, global.foto6].getRandom();
  try {
    pp = await conn.profilePictureUrl(userId, 'image');
  } catch (e) {
    // Si no se puede obtener la imagen, se mantendrá el valor predeterminado
  }

  let username = conn.getName(userId);
  let str = `Est@ es mi novi@, ¿verdad que es precios@? 😍🤤 @${userId.replace(/@.+/, '')}`;
  let mentionedJid = [userId];

  conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid } });
}

handler.help = ['minovia @user'];
handler.tags = ['fun'];
handler.command = /^minovio|minovia$/i;

handler.group = true;

export default handler;
