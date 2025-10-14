import yts from 'yt-search'
import axios from 'axios'
import crypto from 'crypto'

let handler = async (m, { conn, text, command }) => {
  if (!text) throw `Ejemplo de uso:\n.${command} título de canción`

  m.reply('*⏳ Buscando la mejor canción para ti...*')

  try {
    const resultado = await yts(text)
    if (!resultado.videos.length) throw '¡Canción no encontrada, intenta con otro título!'

    const video = resultado.videos[0]
    const videoUrl = video.url
    const titulo = video.title
    const duracion = video.timestamp
    const vistas = video.views?.toLocaleString?.() || video.views
    const canal = video.author?.name || '-'
    const publicado = video.ago || '-'
    const miniatura = video.thumbnail

    // usar savetube para descargar mp3 de calidad pequeña
    const descarga = await savetube.descargar(videoUrl, 'mp3')
    if (!descarga?.status || !descarga.resultado?.descargar) throw 'Error al obtener el enlace de audio.'

    const tituloApi = descarga.resultado.titulo || titulo
    const miniaturaApi = descarga.resultado.miniatura || miniatura
    const duracionApi = descarga.resultado.duracion || duracion

    const leyenda = `
乂  *Y T - R E P R O D U C I R*

   ⭔  *Título* : ${tituloApi}
   ⭔  *Canal* : ${canal}
   ⭔  *Duración* : ${duracionApi}
   ⭔  *Vistas* : ${vistas}
   ⭔  *Publicado* : ${publicado}

${global.wm}
    `.trim()

    await conn.sendMessage(m.chat, {
      image: { url: miniaturaApi },
      caption: leyenda,
      contextInfo: {
        externalAdReply: {
          title: tituloApi,
          body: 'Audio encontrado exitosamente',
          thumbnailUrl: miniaturaApi,
          sourceUrl: videoUrl,
          mediaType: 1,
          showAdAttribution: false
        }
      }
    }, { quoted: m })

    await conn.sendMessage(m.chat, {
      audio: { url: descarga.resultado.descargar },
      mimetype: 'audio/mpeg',
      ptt: false,
      fileName: `${limpiarNombreArchivo(tituloApi)}.mp3`
    }, { quoted: m })

  } catch (e) {
    console.error(e)
    m.reply('❌ Ocurrió un error, inténtalo de nuevo más tarde.')
  }
}

handler.help = ['play <título de canción>']
handler.tags = ['descargador']
handler.command = /^play$/i
handler.limit = true
handler.daftar = true

export default handler

function limpiarNombreArchivo(nombre = 'audio') {
  return nombre.replace(/[\\/:*?"<>|]+/g, '').slice(0, 100)
}

// ===== SCRAPER SAVETUBE =====
const savetube = {
  api: {
    base: "https://media.savetube.me/api",
    cdn: "/random-cdn",
    info: "/v2/info",
    descarga: "/download"
  },
  encabezados: {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://yt.savetube.me',
    'referer': 'https://yt.savetube.me/',
    'user-agent': 'Postify/1.0.0'
  },
  formatos: ['144', '240', '360', '480', '720', '1080', 'mp3'],
  cripto: {
    hexABuffer: (cadenaHex) => {
      const coincidencias = cadenaHex.match(/.{1,2}/g)
      return Buffer.from(coincidencias.join(''), 'hex')
    },
    descifrar: async (enc) => {
      try {
        const claveSecreta = 'C5D58EF67A7584E4A29F6C35BBC4EB12'
        const datos = Buffer.from(enc, 'base64')
        const iv = datos.slice(0, 16)
        const contenido = datos.slice(16)
        const clave = savetube.cripto.hexABuffer(claveSecreta)
        const descifrador = crypto.createDecipheriv('aes-128-cbc', clave, iv)
        let descifrado = descifrador.update(contenido)
        descifrado = Buffer.concat([descifrado, descifrador.final()])
        return JSON.parse(descifrado.toString())
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  youtube: url => {
    if (!url) return null
    const a = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ]
    for (let b of a) {
      if (b.test(url)) return url.match(b)[1]
    }
    return null
  },
  solicitud: async (endpoint, datos = {}, metodo = 'post') => {
    try {
      const { data: respuesta } = await axios({
        method: metodo,
        url: `${endpoint.startsWith('http') ? '' : savetube.api.base}${endpoint}`,
        data: metodo === 'post' ? datos : undefined,
        params: metodo === 'get' ? datos : undefined,
        headers: savetube.encabezados
      })
      return {
        status: true,
        code: 200,
        data: respuesta
      }
    } catch (error) {
      throw new Error(error)
    }
  },
  obtenerCDN: async () => {
    const respuesta = await savetube.solicitud(savetube.api.cdn, {}, 'get')
    if (!respuesta.status) throw new Error(respuesta)
    return {
      status: true,
      code: 200,
      data: respuesta.data.cdn
    }
  },
  descargar: async (enlace, formato) => {
    if (!enlace) {
      return {
        status: false,
        code: 400,
        error: "Enlace vacío"
      }
    }
    if (!formato || !savetube.formatos.includes(formato)) {
      return {
        status: false,
        code: 400,
        error: "Formato no válido",
        formatos_disponibles: savetube.formatos
      }
    }
    const id = savetube.youtube(enlace)
    if (!id) throw new Error('enlace inválido')
    try {
      const cdnx = await savetube.obtenerCDN()
      if (!cdnx.status) return cdnx
      const cdn = cdnx.data
      const resultado = await savetube.solicitud(`https://${cdn}${savetube.api.info}`, {
        url: `https://www.youtube.com/watch?v=${id}`
      })
      if (!resultado.status) return resultado
      const descifrado = await savetube.cripto.descifrar(resultado.data.data)
      const desc = await savetube.solicitud(`https://${cdn}${savetube.api.descarga}`, {
        id: id,
        downloadType: formato === 'mp3' ? 'audio' : 'video',
        quality: formato === 'mp3' ? '128' : formato,
        key: descifrado.key
      })
      return {
        status: true,
        code: 200,
        resultado: {
          titulo: descifrado.title || "Desconocido",
          tipo: formato === 'mp3' ? 'audio' : 'video',
          formato: formato,
          miniatura: descifrado.thumbnail || `https://i.ytimg.com/vi/${id}/0.jpg`,
          descargar: desc.data.data.downloadUrl,
          id: id,
          clave: descifrado.key,
          duracion: descifrado.duration,
          calidad: formato === 'mp3' ? '128' : formato,
          descargado: desc.data.data.downloaded
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
