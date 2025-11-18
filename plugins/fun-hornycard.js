// parcheado por ABRAHAN-M
const handler = async (m, {conn}) => {
  const targetUser = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  const who = conn.decodeJid(targetUser);
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/horny', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
  }), 'hornycard.png', '*𝚃𝚄 𝙴𝚂𝚃𝙰𝚂 𝙷𝙾𝚁𝙽𝚈 🥵🔥*', m);
};
handler.help = ['hornycard'];
handler.tags = ['fun'];
handler.command = /^(hornycard)$/i;
export default handler;
