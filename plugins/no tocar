import fs from 'fs'
import { proto } from '@whiskeysockets/baileys'

let handler = async (m, { conn, text, args, command }) => {
  const [type, ...params] = text?.trim()?.split(' ') || []
  const content = params.join(' ') || ''

  if (!type) {
    const help = `
╭━━『desarrollado por YO SOY YO』━━╮
┃ 🚀 .cmd2 text Hola mundo
┃ 🧠 .cmd2 image url|texto
┃ ⚙️ .cmd2 video url
┃ 🔬 .cmd2 audio url
┃ 🧪 .cmd2 sticker url
┃ 📄 .cmd2 document texto
┃ 🗺️ .cmd2 location lat,long|nombre
┃ 📋 .cmd2 list titulo|desc|pie|op1,op2,op3
┃ 💡 .cmd2 button texto|Botón 1, Botón 2
┃ 🧭 .cmd2 event titulo|fecha|hora|lugar
┃ 👨‍🔬 .cmd2 contact nombre|número
┃ 📓 .cmd2 note texto
┃ 🧱 .cmd2 blank
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯
*“¡La ciencia es poder, Senku-style!”*
`.trim()
    return m.reply(help)
  }

  try {
    switch (type.toLowerCase()) {

      // 🧠 TEXTO
      case 'text':
        return conn.sendMessage(m.chat, { text: content || '‎' }, { quoted: m })

      // 🧪 IMAGEN
      case 'image': {
        const [url, caption] = content.split('|')
        return conn.sendMessage(m.chat, { image: { url }, caption: caption || '' }, { quoted: m })
      }

      // ⚙️ VIDEO
      case 'video': {
        const [url, caption] = content.split('|')
        return conn.sendMessage(m.chat, { video: { url }, caption: caption || '' }, { quoted: m })
      }

      // 🔬 AUDIO
      case 'audio':
        return conn.sendMessage(m.chat, { audio: { url: content }, mimetype: 'audio/mpeg', ptt: false }, { quoted: m })

      // 🧩 STICKER
      case 'sticker':
        return conn.sendMessage(m.chat, { sticker: { url: content } }, { quoted: m })

      // 📄 DOCUMENTO
      case 'document': {
        const path = './tmp/senku_doc.txt'
        fs.writeFileSync(path, content || 'Documento generado con el poder de la ciencia 🧠')
        return conn.sendMessage(m.chat, { document: { url: path }, mimetype: 'text/plain', fileName: 'Senku_Doc.txt' }, { quoted: m })
      }

      // 🗺️ UBICACIÓN
      case 'location': {
        const [coords, name] = content.split('|')
        const [lat, lon] = coords.split(',').map(x => parseFloat(x))
        return conn.sendMessage(m.chat, { location: { degreesLatitude: lat, degreesLongitude: lon, name: name || 'Ubicación científica' } }, { quoted: m })
      }

      // 💡 BOTONES
      case 'button': {
        const [texto, botonesRaw] = content.split('|')
        const botones = (botonesRaw || 'OK').split(',').map(b => ({
          buttonId: `.cmd2 text ${b}`,
          buttonText: { displayText: b },
          type: 1
        }))
        return conn.sendMessage(m.chat, { text: texto || '‎', buttons: botones, headerType: 1 })
      }

      // 📋 LISTA INTERACTIVA
      case 'list': {
        const [title, desc, footer, opts] = content.split('|')
        const sections = [{
          title: title || 'Opciones disponibles',
          rows: (opts || 'Opción 1,Opción 2').split(',').map(o => ({
            title: o,
            rowId: `.cmd2 text ${o}`,
            description: 'Selecciona esta opción 🧪'
          }))
        }]
        return conn.sendMessage(m.chat, {
          text: desc || 'Selecciona una opción:',
          footer: footer || 'Menú científico',
          title: title || 'Laboratorio de opciones',
          buttonText: '🧬 Abrir lista',
          sections
        }, { quoted: m })
      }

      // 🧭 EVENTO
      case 'event': {
        const [titulo, fecha, hora, lugar] = content.split('|')
        const msg = `🧠 *${titulo || 'Evento sin título'}*\n📅 Fecha: ${fecha || 'No especificada'}\n⏰ Hora: ${hora || 'No indicada'}\n📍 Lugar: ${lugar || 'Desconocido'}`
        return conn.sendMessage(m.chat, { text: msg }, { quoted: m })
      }

      // 👨‍🔬 CONTACTO
      case 'contact': {
        const [nombre, numero] = content.split('|')
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${nombre}\nTEL;type=CELL;type=VOICE;waid=${numero}:${numero}\nEND:VCARD`
        return conn.sendMessage(m.chat, { contacts: { displayName: nombre, contacts: [{ vcard }] } }, { quoted: m })
      }

      // 📓 NOTA
      case 'note':
        return conn.sendMessage(m.chat, { text: content || '🧠 Nota vacía, como un tubo de ensayo sin muestra.' }, { quoted: m })

      // 🧱 MENSAJE EN BLANCO
      case 'blank':
        return conn.sendMessage(m.chat, { text: '‎' }, { quoted: m })

      default:
        return m.reply('⚠️ *Tipo no reconocido.* Usa `.cmd2` para ver los tipos disponibles 🧪')
    }
  } catch (e) {
    console.log(e)
    return m.reply('💥 *Error científico detectado.* Revisa tu comando y vuelve a intentarlo.')
  }
}

handler.help = ['cmd2']
handler.tags = ['owner']
handler.command = /^cmd2$/i
handler.rowner = true

export default handler
