const handler = async (m, {conn, args}) => {
  await conn.groupUpdateDescription(m.chat, `${args.join(' ')}`);
  m.reply('*✅ La descripción del grupo se modifico correctamente😄*');
};
handler.help = ['Setdesc <text>'];
handler.tags = ['grupo'];
handler.command = /^setdesk|setdescs$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
