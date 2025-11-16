function handler(m, {groupMetadata}) {
  const ps = groupMetadata.participants.map((v) => v.jid);
  const a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);
  m.reply(`*@${a.pushName}, 𝙳𝙴𝙱𝙴𝚁𝙸𝙰𝚂 𝙲𝙰𝚂𝙰𝚁𝚃𝙴 💍 𝙲𝙾𝙽 @${b.pushName}, 𝙷𝙰𝙲𝙴𝙽 𝚄𝙽𝙰 𝙱𝚄𝙴𝙽𝙰 𝙿𝙰𝚁𝙴𝙹𝙰 💓*`, null, {
    mentions: [a.id, b.id],
  });
}
handler.help = ['formarpareja'];
handler.tags = ['fun'];
handler.command = ['formarpareja', 'formarparejas'];
handler.group = true;
export default handler;
