let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🥰 *¿Qué nombre deseas ponerme?*`, m, global.estilo)
  if (text.length > 25) return conn.reply(m.chat, 'El nombre no puede tener más de 25 caracteres.', m, global.estilo)
  try {
    await conn.updateProfileName(text)
    await m.react('✅')
    return conn.reply(m.chat, '✅️ *Nombre cambiado con éxito*', m, global.estilo)
  } catch (e) {
    console.log(e)
    await m.react('✖️')
    return conn.reply(m.chat, `⚙️ ¡Ocurrió un error!`, m, global.estilo)
  }
}
handler.help = ['nuevonombrebot <teks>']
handler.tags = ['owner']
handler.command = ['nuevonombrebot', 'setbotname', 'namebot']

handler.owner = true
export default handler