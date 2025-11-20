let handler = async (m, { conn, command, usedPrefix }) => {
let staff = `✨ *EQUIPO DE AYUDANTES*
🤖 *Bot:* ${global.botname}
🌟 *Versión:* ${global.vs}

👑 *Propietario:*

• 𝙰𝙱𝚁𝙰𝙷𝙰𝙽
🤴 *Rol:* Propietario/mantenimiento/editor
📱 *Número:* wa.me/573237649689

• JONATHANG
👨‍💻 *Rol:* staff/Mantenimiento 
📱 *Número:* wa.me/50584887870

• DEV BLACKDARK
👨‍💻 *Rol:* Staff/Mantenimiento 
📱 *Número:* wa.me/5491156178758

• IM F'Z - TESIS
👨‍💻 *Rol:* Staff/mantenimiento 
📱 *Número:* wa.me/522431268546

• Gabriel-cell
👨‍💻 *Rol:* Staff/Soporte 
📱 *Número:* wa.me/51941247696

• Cristian DEV
👨‍💻 *Rol:* Staff/Soporte 
📱 *Número:* wa.me/50378666265
`

// Imagen que se enviará junto al mensaje
let imagen = 'https://spacny.wuaze.com//uploads/IMG-20251017-WA1543.jpg'

await conn.sendFile(m.chat, imagen, 'staff.jpg', staff.trim(), fkontak, true, {
contextInfo: {
'forwardingScore': 200,
'isForwarded': false,
externalAdReply: {
showAdAttribution: true,
renderLargerThumbnail: true,
title: `🥷 Developers 👑`,
body: `✨ Staff Oficial`,
mediaType: 1,
sourceUrl: redes,
thumbnailUrl: imagen
}}
}, { mentions: m.sender })

m.react(emoji)
}

handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
