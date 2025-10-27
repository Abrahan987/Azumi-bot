// 🧪 COMANDO: pinterest
// 👨‍🔬 “Con suficiente ciencia, hasta los servidores inestables obedecen.” — Senku Ishigami ⚗️

import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text)
    return m.reply(`🧠 *Eureka!* Necesito saber qué deseas buscar en Pinterest.\n\nEjemplo:\n> ${usedPrefix}pinterest fondos aesthetic`)

  await m.react('⚙️')

  const api = 'https://api-adonix.ultraplus.click/search/pinterest?apikey=gawrgurabot&q=' + encodeURIComponent(text)
  const maxIntentos = 5
  let datos = null
  let intento = 0

  await m.reply(`🧬 *Iniciando búsqueda científica...*\n\n🔍 Consultando servidores de Adonix...\n⚗️ Esto puede tardar un poco.\n\n> “La paciencia es parte del método científico.” — Senku`)

  while (intento < maxIntentos && !datos) {
    try {
      intento++
      const { data } = await axios.get(api, { timeout: 60000 }) // 60 seg por intento
      if (data && data.status && data.results?.length) {
        datos = data.results
        break
      } else {
        console.log(`Intento ${intento} fallido: respuesta vacía o inválida`)
      }
    } catch (err) {
      console.log(`Intento ${intento} fallido:`, err.message)
      if (intento < maxIntentos) await new Promise(r => setTimeout(r, 3000)) // Esperar 3 seg antes del siguiente intento
    }
  }

  if (!datos)
    return m.reply(`💥 *Error tras ${maxIntentos} intentos*\n────────────────────\n⚠️ No fue posible obtener resultados de la API de Adonix.\n\n> “Hasta la ciencia necesita materia prima. Sin datos, no hay descubrimiento.” ⚗️`)

  // Enviar máximo 10 imágenes para no saturar
  const resultados = datos.slice(0, 10)

  for (const img of resultados) {
    await conn.sendMessage(
      m.chat,
      { image: { url: img } },
      { quoted: null }
    )
    await new Promise(r => setTimeout(r, 1000)) // pausa 1 seg entre imágenes
  }

  await m.react('✅')
}

handler.help = ['pinterest <texto>']
handler.tags = ['busqueda']
handler.command = ['pinterest', 'pin', 'pins']
handler.group = true

export default handler
