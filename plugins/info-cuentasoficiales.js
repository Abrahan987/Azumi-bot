import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  await m.reply('📡 *Enviando información de las cuentas oficiales...*')

  let staff = `𝖡𝗂𝖾𝗇𝗏𝖾𝗇𝗂𝖽𝗈 𝖠 𝖫𝖺𝗌 𝖢𝗎𝖾𝗇𝗍𝖺𝗌 𝖮𝖿𝗂𝖼𝗂𝖺𝗅𝖾𝗌 💨 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
🐉 *Propietario:* wa.me/573237649689 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
👑 *Equipo:* 
• 𝙰𝙱𝚁𝙰𝙃𝙰𝙽 🤴 Rol: Propietario/mantenimiento/editor 
📱 Número: wa.me/573237649689 

• JONATHANG 👨‍💻 Rol: Staff/Mantenimiento 
📱 Número: wa.me/50584887870 

• DEV BLACKDARK 👨‍💻 Rol: Staff/Mantenimiento 
📱 Número: wa.me/5491156178758 

• IM F'Z - TESIS 👨‍💻 Rol: Staff/Mantenimiento 
📱 Número: wa.me/522431268546 

• Gabriel-cell 👨‍💻 Rol: Staff/Soporte 
📱 Número: wa.me/51941247696 

• Cristian DEV 👨‍💻 Rol: Staff/Soporte 
📱 Número: wa.me/50378666265 
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
📍 *TIKTOK:* https://tiktok.com/@abrahan_m
┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
`

  // descarga la imagen desde el enlace
  let imagenURL = 'https://files.catbox.moe/3beuw9.jpg'
  let imgBuffer = await fetch(imagenURL).then(r => r.buffer())

  await conn.sendFile(m.chat, imgBuffer, 'staff.jpg', staff.trim(), m)
  await m.react('✨')
}

handler.help = ['cuentas']
handler.tags = ['info']
handler.command = ['cuentas', 'cuentasoficiales']
handler.register = true

export default handler