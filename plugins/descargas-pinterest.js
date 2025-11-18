/*
 * Creado por Brayan330
 * GitHub: https://github.com/El-brayan502
 * WhatsApp: https://whatsapp.com/channel/0029Vb6BDQc0lwgsDN1GJ31i
 */

import https from 'https'
import axios from 'axios'
import baileys, { generateWAMessageFromContent} from '@whiskeysockets/baileys'

async function sendAlbumMessage(conn, jid, medias, options = {}) {
  if (typeof jid!== 'string') throw new TypeError('El JID debe ser un string.')
  if (!Array.isArray(medias) || medias.length === 0) throw new RangeError('Se requiere al menos una imagen o video.')

  const caption = options.caption || ''
  const delay = Number.isFinite(options.delay)? options.delay: 500

  const album = await baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(m => m.type === 'image').length,
        expectedVideoCount: medias.filter(m => m.type === 'video').length,
...(options.quoted && {
          contextInfo: {
            remoteJid: options.quoted.key.remoteJid,
            fromMe: options.quoted.key.fromMe,
            stanzaId: options.quoted.key.id,
            participant: options.quoted.key.participant || options.quoted.key.remoteJid,
            quotedMessage: options.quoted.message
}
})
}
},
    {}
)

  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id})

  for (let i = 0; i < medias.length; i++) {
    const { type, data} = medias[i]
    const msg = await baileys.generateWAMessage(
      album.key.remoteJid,
      { [type]: {...data},...(i === 0 && { caption})},
      { upload: conn.waUploadToServer}
)
    msg.message.messageContextInfo = {
      messageAssociation: { associationType: 1, parentMessageKey: album.key}
}
    await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id})
    await baileys.delay(delay)
}

  return album
}

const getInitialAuth = () => new Promise((resolve, reject) => {
  const options = {
    hostname: 'id.pinterest.com',
    path: '/',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0'}
}

  https.get(options, res => {
    const cookies = res.headers['set-cookie']
    if (cookies) {
      const csrf = cookies.find(c => c.startsWith('csrftoken='))
      const sess = cookies.find(c => c.startsWith('_pinterest_sess='))
      if (csrf && sess) {
        const csrftoken = csrf.split(';')[0].split('=')[1]
        const cookieHeader = `csrftoken=${csrftoken}; ${sess.split(';')[0]}`
        return resolve({ csrftoken, cookieHeader})
}
}
    reject(new Error('No se pudo obtener el token CSRF o la cookie de sesión.'))
}).on('error', reject)
})

const searchPinterestAPI = async (query, limit = 12) => {
  try {
    const { csrftoken, cookieHeader} = await getInitialAuth()
    const results = []
    let bookmark = null
    let keepFetching = true

    while (keepFetching && results.length < limit) {
      const postData = {
        options: { query, scope: 'pins', bookmarks: bookmark? [bookmark]: []},
        context: {}
}

      const sourceUrl = `/search/pins/?q=${encodeURIComponent(query)}`
      const dataString = `source_url=${encodeURIComponent(sourceUrl)}&data=${encodeURIComponent(JSON.stringify(postData))}`

      const options = {
        hostname: 'id.pinterest.com',
        path: '/resource/BaseSearchResource/get/',
        method: 'POST',
        headers: {
          Accept: 'application/json, text/javascript, */*;q=0.01',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'User-Agent': 'Mozilla/5.0',
          'X-Requested-With': 'XMLHttpRequest',
		  'X-CSRFToken': csrftoken,
          'X-Pinterest-Source-Url': sourceUrl,
          Cookie: cookieHeader
}
}

      const responseBody = await new Promise((resolve, reject) => {
        const req = https.request(options, res => {
          let body = ''
          res.on('data', chunk => body += chunk)
          res.on('end', () => resolve(body))
})
        req.on('error', reject)
        req.write(dataString)
        req.end()
})

      const json = JSON.parse(responseBody)
      const pins = json.resource_response?.data?.results || []
      pins.forEach(pin => {
        const img = pin.images?.['736x']?.url
        if (img) results.push(img)
})

      bookmark = json.resource_response?.bookmark
      keepFetching =!!bookmark && pins.length> 0
}

    return results.slice(0, limit)
} catch (err) {
    throw new Error(err.message)
}
}

async function sendCustomPedido(m, conn, texto) {
  try {
    const imgUrl = 'https://raw.githubusercontent.com/El-brayan502/dat3/main/uploads/ae6c76-1760912443759.jpg'
    const res = await axios.get(imgUrl, { responseType: 'arraybuffer'})
    const imgBuffer = Buffer.from(res.data)

    const orderMessage = {
      orderId: 'FAKE-' + Date.now(),
      thumbnail: imgBuffer,
      itemCount: 1,
      status: 1,
      surface: 1,
      message: texto,
      orderTitle: 'Pinterest Bot',
      token: null,
      sellerJid: null,
      totalAmount1000: '0',
      totalCurrencyCode: 'GTQ',
      contextInfo: {
        externalAdReply: {
          title: global.botname || 'Bot',
          body: '',
          thumbnailUrl: imgUrl,
          mediaType: 1,
          renderLargerThumbnail: true
}
}
}

    const msg = generateWAMessageFromContent(m.chat, { orderMessage}, { quoted: m})
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id})
} catch (err) {
    console.error(err)
    m.reply('⚠️ Error enviando el pedido.')
}
}

const handler = async (m, { conn, args}) => {
  try {
    const text = args.join(' ')
    if (!text) return sendCustomPedido(m, conn, ' _ⓘ_ `Por favor, ingresa lo que deseas buscar en Pinterest.`')

    const [query, rawLimit] = text.split(',').map(s => s.trim())
    const limit = Math.min(parseInt(rawLimit) || 12, 12)

    const results = await searchPinterestAPI(query, limit)
    if (!results.length) return sendCustomPedido(m, conn, `⚠️ No se encontraron resultados para "${query}".`)

    const medias = results.map(url => ({ type: 'image', data: { url}}))
    await sendAlbumMessage(conn, m.chat, medias, {
      caption: `✨ Resultados de Pinterest para: "${query}"`,
      quoted: m
})
} catch (err) {
    return sendCustomPedido(m, conn, `⚠️ Se produjo un error:\n${err.message}`)
}
}

handler.help = ['pin']
handler.tags = ['search']
handler.command = ['pin', 'pinterest']
export default handler
