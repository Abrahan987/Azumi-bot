//  By ABRAHAN-M 

import fetch from 'node-fetch'
import FormData from 'form-data'

let handler = async (m, { conn, usedPrefix, command }) => {
  const quoted = m.quoted ? m.quoted : m
  const mime = quoted.mimetype || quoted.msg?.mimetype || ''

  if (!/image\/(jpe?g|png)/i.test(mime)) {
    await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } })
    return m.reply(`📸 *Envía o responde una imagen con el comando:*\n> ${usedPrefix + command}`)
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } })

    const media = await quoted.download()
    const ext = mime.split('/')[1]
    const filename = `enhance_${Date.now()}.${ext}`

    // 🔹 Intentar primero con Pixelcut (más rápido)
    const form = new FormData()
    form.append('image', media, { filename, contentType: mime })
    form.append('scale', '2')

    const headers = {
      ...form.getHeaders(),
      'accept': 'application/json',
      'x-client-version': 'web',
      'x-locale': 'en'
    }

    const res = await fetch('https://api2.pixelcut.app/image/upscale/v1', {
      method: 'POST',
      headers,
      body: form
    })

    const json = await res.json().catch(() => ({}))

    let resultBuffer

    if (json?.result_url && json.result_url.startsWith('http')) {
      // ✅ Éxito con Pixelcut
      resultBuffer = await (await fetch(json.result_url)).buffer()
    } else {
      // ⚠️ Si Pixelcut falla, usar método remini de Vyro
      console.log('⚠️ Pixelcut falló, usando remini (Vyro)')
      resultBuffer = await remini(media, 'enhance')
    }

    await conn.sendMessage(
      m.chat,
      {
        image: resultBuffer,
        caption: `✨ *Tu imagen ha sido mejorada exitosamente.*\n📈 Resolución 2x aplicada.`,
      },
      { quoted: m }
    )

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (err) {
    console.error('❌ Error en upscale/remini:', err)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    m.reply(`⚠️ *Ocurrió un error al mejorar la imagen.*\n> ${err.message || err}`)
  }
}

handler.help = ['hd', 'remini', 'upscale2']
handler.tags = ['tools', 'image']
handler.command = /^(hd|remini|upscale2)$/i
handler.register = true

export default handler

// 🔧 Función de respaldo: usa el motor de IA de Vyro (Remini)
async function remini(imageData, operation = 'enhance') {
  return new Promise(async (resolve, reject) => {
    const availableOps = ['enhance', 'recolor', 'dehaze']
    if (!availableOps.includes(operation)) operation = 'enhance'

    const formData = new FormData()
    formData.append('image', Buffer.from(imageData), {
      filename: 'image.jpg',
      contentType: 'image/jpeg',
    })
    formData.append('model_version', 1)

    const options = {
      url: `https://inferenceengine.vyro.ai/${operation}.vyro`,
      host: 'inferenceengine.vyro.ai',
      path: `/${operation}`,
      protocol: 'https:',
      headers: {
        'User-Agent': 'okhttp/4.9.3',
        Connection: 'Keep-Alive',
        'Accept-Encoding': 'gzip',
      },
    }

    formData.submit(options, (err, res) => {
      if (err) return reject(err)
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    })
  })
}
