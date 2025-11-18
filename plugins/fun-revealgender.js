// parcheado por ABRAHAN-M
let handler = async (m, { conn, command, text }) => m.reply(`
*🚫 𝐑𝐞𝐯𝐞𝐥𝐚𝐧𝐝𝐨 𝐠é𝐧𝐞𝐫𝐨 🚫*
  
*𝐐𝐮𝐞 𝐠𝐞𝐧𝐞𝐫ó 𝐞𝐬:* ${text}
*𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰:* ${['Mujer','Hombre','trans','Bisexual','Polisexual', 'Pansexual', 'Ni idea'].getRandom()}
`.trim(), null, m.mentionedJid ? {
mentions: m.mentionedJid.map(j => conn.decodeJid(j))
} : {})
handler.help = ['revelargenero, *<texto>*']
handler.tags = ['fun']
handler.command = /^revelargenero|género|genero|eres$/i
export default handler
