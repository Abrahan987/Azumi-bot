import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 15) {
        // ✅ Simplemente agregamos global.rcanal al final
        return m.reply(`✧ ¡El video no puede durar más de 15 segundos!...`, null, global.rcanal)
      }
      
      let img = await q.download?.()

      if (!img) {
        // ✅ Simplemente agregamos global.rcanal al final
        return m.reply(`❀ Por favor, envía una imagen o video para hacer un sticker.`, null, global.rcanal)
      }

      let out
      try {
        let userId = m.sender
        let packstickers = global.db.data.users[userId] || {}
        let texto1 = packstickers.text1 || global.packsticker
        let texto2 = packstickers.text2 || global.packsticker2

        stiker = await sticker(img, false, texto1, texto2)
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img)
          else if (/image/g.test(mime)) out = await uploadImage(img)
          else if (/video/g.test(mime)) out = await uploadFile(img)
          if (typeof out !== 'string') out = await uploadImage(img)
          stiker = await sticker(false, out, global.packsticker, global.packsticker2)
        }
      }
    } else if (args[0]) {
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.packsticker2)
      } else {
        // ✅ Simplemente agregamos global.rcanal al final
        return m.reply(`⚠︎ El URL es incorrecto...`, null, global.rcanal)
      }
    }
  } finally {
    if (stiker) {
      // ✅ CAMBIO PRINCIPAL: Agregar contextInfo del canal
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, { 
        contextInfo: global.rcanal.contextInfo  // ⬅️ Esta es la línea clave
      }, { quoted: m })
    } else {
      // ✅ Simplemente agregamos global.rcanal al final
      return m.reply(`❀ Por favor, envía una imagen o video para hacer un sticker.`, null, global.rcanal)
    }
  }
}

handler.help = ['stiker <img>', 'sticker <url>']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']

export default handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

// ═══════════════════════════════════════════════════
// 📝 NOTAS DE IMPLEMENTACIÓN:
// ═══════════════════════════════════════════════════
// 
// Esta es la versión MÁS SIMPLE. Solo cambios:
// 
// 1. En los m.reply() de error, agrega: global.rcanal al final
//    Antes: m.reply('mensaje')
//    Ahora:  m.reply('mensaje', null, global.rcanal)
//
// 2. En sendFile del sticker, cambia:
//    Antes: contextInfo: { ... todo el código largo ... }
//    Ahora:  contextInfo: global.rcanal.contextInfo
//
// ¡ESO ES TODO! 🎉
// ═══════════════════════════════════════════════════
