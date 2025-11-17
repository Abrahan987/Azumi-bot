import util from 'util'
import path from 'path'

const user = a => '@' + a.split('@')[0]
const toM = a => '@' + a.split('@')[0]
const pickRandom = list => list[Math.floor(Math.random() * list.length)]
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const CTX_ERR = global.rcanalx || {}
const CTX_WARN = global.rcanalw || {}
const CTX_OK = global.rcanalr || {}

const handler = async (m, { groupMetadata, command, conn, text, usedPrefix, args }) => {

  if (!global.db.data.chats[m.chat].gacha && m.isGroup) {
    return await conn.reply(m.chat,
      `ꕤ Los comandos de *Gacha* están desactivados en este grupo.\n\nUn *administrador* puede activarlos con:\n» *${usedPrefix}gacha on*`,
      m, CTX_WARN
    )
  }

  try {
    const participants = groupMetadata.participants.map(v => v.id)

    if (command === 'top') {
      let cantidad = 10
      let texto = text

      if (!isNaN(parseInt(args[0]))) {
        cantidad = Math.min(Math.max(parseInt(args[0]), 1), 10)
        texto = args.slice(1).join(' ')
      }

      if (!texto) {
        return await conn.reply(m.chat,
          `ꕤ Por favor, ingrese un texto luego del número para hacer un Top *cantidad texto*`,
          m, CTX_ERR
        )
      }

      if (participants.length < cantidad) {
        return await conn.reply(m.chat,
          `ꕤ No hay suficientes miembros para hacer un Top ${cantidad}`,
          m, CTX_ERR
        )
      }

      const seleccionados = []
      while (seleccionados.length < cantidad) {
        const candidato = participants[Math.floor(Math.random() * participants.length)]
        if (!seleccionados.includes(candidato)) seleccionados.push(candidato)
      }

      const emoji = pickRandom(['🤓','😅','😂','😳','😎','🥵','😱','🤑','🙄','🩸','🍑','🤨','💗','🔥','🍓','😔','👀','🌚','😰'])
      let topTexto = `*${emoji} Top ${cantidad} ${texto} ${emoji}*\n\n`

      seleccionados.forEach((usuario, index) => {
        topTexto += `${index + 1}. ${user(usuario)}\n`
      })

      return await conn.reply(m.chat, topTexto.trim(), m, CTX_OK, {
        mentions: seleccionados
      })
    }

    if (command === 'ship' || command === 'shippear') {
      if (!text) {
        return await conn.reply(m.chat,
          `ꕤ Escribe tu nombre y el nombre de la otra persona para calcular su amor.`,
          m, CTX_ERR
        )
      }

      const [nombre1, ...resto] = text.split(' ')
      const nombre2 = resto.join(' ')

      if (!nombre2) {
        return await conn.reply(m.chat,
          `ꕤ Escribe el nombre de la segunda persona.`,
          m, CTX_ERR
        )
      }

      const porcentajeAmor = Math.floor(Math.random() * 100)
      const mensajeAmor = `❤️ *${nombre1}* tu oportunidad de enamorarte de *${nombre2}* es de ${porcentajeAmor}% 👩🏻‍❤️‍👨🏻`

      return await conn.reply(m.chat, mensajeAmor, m, CTX_OK, {
        mentions: conn.parseMention(mensajeAmor)
      })
    }

    if (command === 'afk') {
      const senderJid = conn.decodeJid(m.sender)
      const usuario = global.db.data.users[senderJid]
      usuario.afk = Date.now()
      usuario.afkReason = text

      const nombreUsuario = await conn.getName(senderJid)
      const motivo = text ? ': ' + text : ': Sin Especificar!'

      return await conn.reply(m.chat,
        `ꕤ *El Usuario ${nombreUsuario} Estará AFK*\n○ *Motivo${motivo}*`,
        m, CTX_OK
      )
    }

    if (command === 'personalidad') {
      const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
      const userId = conn.decodeJid(mentionedJid);

      let nombre
      if (userId?.includes('@s.whatsapp.net')) {
        nombre = global.db.data.users[userId].name ||
                (await conn.getName(userId).catch(() => userId.split('@')[0])) ||
                userId.split('@')[0]
      } else {
        nombre = userId
      }

      const userName = userId?.includes('@s.whatsapp.net') ? `*${nombre}*` : `*${userId}*`

      if (!userId) {
        return await conn.reply(m.chat,
          `ꕤ Por favor, ingrese el nombre de alguna persona.`,
          m, CTX_ERR
        )
      }

      const personalidad = `> • Nombre » ${userName}
> • Buena Moral » ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Mala Moral : ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Tipo de persona » ${pickRandom(['De buen corazón','Arrogante','Tacaño','Generoso','Humilde','Tímido','Cobarde','Entrometido','Cristal','No binarie XD', 'Pendejo'])}
> • Siempre » ${pickRandom(['Pesado','De malas','Distraido','De molestoso','Chismoso','Pasa jalandosela','De compras','Viendo anime','Chatea en WhatsApp porque esta soltero','Acostado bueno para nada','De mujeriego','En el celular'])}
> • Inteligencia » ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Pendejo(a) » ${pickRandom(['9%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Morosidad » ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Coraje » ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Miedo » ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Fama » ${pickRandom(['6%','12%','20%','27%','35%','41%','49%','54%','60%','66%','73%','78%','84%','92%','93%','94%','96%','98,3%','99,7%','99,9%','1%','2,9%','0%','0,4%'])}
> • Género » ${pickRandom(['Hombre', 'Mujer', 'Homosexual', 'Bisexual', 'Pansexual', 'Feminista', 'Heterosexual', 'Macho alfa', 'Mujerzona', 'Marimacha', 'Palosexual', 'PlayStationSexual', 'Sr. Manuela', 'Pollosexual'])}`

      return await conn.reply(m.chat, personalidad, m, CTX_OK)
    }

    if (command === 'formarpareja') {
      const R = Math.random
      const Fl = Math.floor
      const frases = ["Esta pareja está destinada a estar junta 💙", "Dos pequeños tortolitos enamorados ✨", "Ya hasta familia deberían tener 🤱🧑‍🍼", "Se casaron en secreto 💍", "Están de luna de miel ✨🥵😍❤️", "Son inseparables como el café y la arepa ☕🥙", "Su química es de otro planeta 🌌", "Pareja explosiva que enciende el grupo 🔥", "Amor que ni el tiempo puede borrar ⏳❤️", "Se miran y el mundo desaparece 🌍💫", "Romance digno de novela 📖💘", "Pareja que todos envidian 😍👀", "Son el alma del grupo juntos 🎉💑", "Amor que nació en los stickers 💬💞", "Pareja que comparte hasta los datos móviles 📱❤️", "Su conexión es más fuerte que el WiFi 📶💘", "Pareja que se entiende con solo emojis 😘😎", "Amor que ni el bot puede ignorar 🤖💓", "Pareja que merece su propio comando 🧾💑", "Son tan dulces que suben el azúcar 🍭💕"]

      let cantidad = Math.min(Math.max(parseInt(args[0]) || 1, 1), 10)

      if (participants.length < cantidad * 2) {
        return await conn.reply(m.chat,
          `ꕤ No hay miembros suficientes para formar ${cantidad} pareja${cantidad === 1 ? '' : 's'}`,
          m, CTX_ERR
        )
      }

      const usados = new Set()
      const parejas = []
      const menciones = []

      for (let i = 0; i < cantidad; i++) {
        let a, b
        do a = participants[Fl(R() * participants.length)]
        while (usados.has(a))
        usados.add(a)

        do b = participants[Fl(R() * participants.length)]
        while (b === a || usados.has(b))
        usados.add(b)

        parejas.push({a, b})
        menciones.push(a, b)
      }

      let texto = cantidad === 1 ?
        `*😍 _La mejor pareja del grupo_ 😍*\n\n` :
        `*😍 _Las ${cantidad} mejores parejas del grupo_ 😍*\n\n`

      parejas.forEach((p, i) => {
        texto += `${i + 1}.- ${toM(p.a)} y ${toM(p.b)}\n${frases[i % frases.length]}\n\n`
      })

      return await conn.reply(m.chat, texto.trim(), m, CTX_OK, { mentions: menciones })
    }

    const comandosTest = ['gay','lesbiana','pajero','pajera','puto','puta','manco','manca','rata','prostituto','prostituta']
    if (comandosTest.includes(command)) {
      const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
      const usser = conn.decodeJid(mentionedJid);
      const userId = usser?.includes('@s.whatsapp.net') ? `@${usser.split('@')[0]}` : `*${usser}*`

      if (!usser) {
        return await conn.reply(m.chat,
          `ꕥ Por favor, mensiona a un Usuario para comprobar su test.`,
          m, CTX_ERR
        )
      }

      const percentages = Math.floor(Math.random() * 101)
      let emoji = ''
      let description = ''

      switch (command) {
        case 'gay':
          emoji = '🏳️‍🌈'
          description = percentages < 50 ?
            `💙 Los cálculos han arrojado que ${userId} es *${percentages}%* Gay ${emoji}\n> ✰ Eso es bajo, ¡Tú eres Joto, no Gay!` :
            percentages > 100 ?
            `💜 Los cálculos han arrojado que ${userId} es *${percentages}%* Gay ${emoji}\n> ✰ ¡Incluso más gay de lo que pensábamos!` :
            `🖤 Los cálculos han arrojado que ${userId} es *${percentages}%* Gay ${emoji}\n> ✰ Lo tuyo, lo tuyo es que eres Gay.`
          break
        case 'lesbiana':
          emoji = '🏳️‍🌈'
          description = percentages < 50 ?
            `👻 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n✰ Quizás necesites más películas románticas en tu vida.` :
            percentages > 100 ?
            `❣️ Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Eso es un amor extremo por las Chicas!` :
            `💗 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén el amor floreciendo!`
          break
        case 'pajero': case 'pajera':
          emoji = '😏💦'
          description = percentages < 50 ?
            `🧡 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Tal vez necesites más hobbies!` :
            percentages > 100 ?
            `💕 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Eso es una resistencia admirable!` :
            `💞 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén el buen trabajo (en solitario).`
          break
        case 'puto': case 'puta':
          emoji = '🔥🥵'
          description = percentages < 50 ?
            `😼 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✧ ¡Más suerte en tu próxima conquista!` :
            percentages > 100 ?
            `😻 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Estás en llamas!` :
            `😺 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén ese encanto ardiente!`
          break
        case 'manco': case 'manca':
          emoji = '💩'
          description = percentages < 50 ?
            `🌟 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡No eres el único en ese club!` :
            percentages > 100 ?
            `💌 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ ¡Tienes un talento muy especial!` :
            `🥷 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Mantén esa actitud valiente!`
          break
        case 'rata':
          emoji = '🐁'
          description = percentages < 50 ?
            `💥 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Nada de malo en disfrutar del queso!` :
            percentages > 100 ?
            `💖 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Un auténtico ratón de lujo!` :
            `👑 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Come queso con responsabilidad!`
          break
        case 'prostituto': case 'prostituta':
          emoji = '🫦👅'
          description = percentages < 50 ?
            `ꕥ Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ El mercado está en auge!` :
            percentages > 100 ?
            `💖 Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Un/a verdadero/a profesional!` :
            `✨️ Los cálculos han arrojado que ${userId} es *${percentages}%* ${command} ${emoji}\n> ✰ Siempre es hora de negocios!`
          break
      }

      const responses = ["El universo ha hablado.", "Los científicos lo confirman.", "¡Sorpresa!", "Se sabía 🤣"]
      const response = responses[Math.floor(Math.random() * responses.length)]
      const cal = `ꕥ *CALCULADORA*\n\n${description}\n\n➤ ${response}`.trim()
      const hawemod = ["《 █▒▒▒▒▒▒▒▒▒▒▒》10%", "《 ████▒▒▒▒▒▒▒▒》30%", "《 ███████▒▒▒▒▒》50%", "《 ██████████▒▒》80%", "《 ████████████》100%"]

      let { key } = await conn.reply(m.chat, { text: `ꕤ ¡Calculando Porcentaje!`, mentions: conn.parseMention(cal) }, m, CTX_OK)

      for (let i = 0; i < hawemod.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        await conn.reply(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(cal) }, m, CTX_OK)
      }

      return await conn.reply(m.chat, { text: cal, edit: key, mentions: conn.parseMention(cal) }, m, CTX_OK)
    }

    const comandosDoxeo = ['doxear','doxxeo','doxeo']
    if (comandosDoxeo.includes(command)) {
      const mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
      const userId = conn.decodeJid(mentionedJid);

      let userName
      if (userId) {
        try {
          userName = global.db.data.users[userId].name || await conn.getName(userId)
          if (typeof userName !== 'string' || !userName.trim()) {
            userName = userId.split('@')[0]
          }
        } catch {
          userName = userId.split('@')[0]
        }
      }

      if (!userId) {
        return await conn.reply(m.chat,
          `ꕤ Por favor, ingrese el tag de algún usuario o responda a un mensaje.`,
          m, CTX_ERR
        )
      }

      const start = `ꕥ *Iniciando doxeo*...`
      const boost = `*${pickRandom(['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'])}%*`
      const boost2 = `*${pickRandom(['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'])}%*`
      const boost3 = `*${pickRandom(['41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','60'])}%*`
      const boost4 = `*${pickRandom(['61','62','63','64','65','66','67','68','69','70','71','72','73','74','75','76','77','78','79','80'])}%*`
      const boost5 = `*${pickRandom(['81','82','83','84','85','86','87','88','89','90','91','92','93','94','95','96','97','98','99','100'])}%*`

      const { key } = await conn.reply(m.chat, `${start}`, m, CTX_OK)
      await delay(1000)
      await conn.reply(m.chat, `${boost}`, m, { edit: key })
      await delay(1000)
      await conn.reply(m.chat, `${boost2}`, m, { edit: key })
      await delay(1000)
      await conn.reply(m.chat, `${boost3}`, m, { edit: key })
      await delay(1000)
      await conn.reply(m.chat, `${boost4}`, m, { edit: key })
      await delay(1000)
      await conn.reply(m.chat, `${boost5}`, m, { edit: key })

      const doxeo = `ꕤ *Persona doxeada*\n\n✦ ${new Date().toLocaleDateString()}\n✧ ${new Date().toLocaleTimeString()}\n\n✰ Resultados:\n\n*Nombre:* ${userName}\n*Ip:* 92.28.211.234\n*N:* 43 7462\n*W:* 12.4893\n*SS NUMBER:* 6979191519182016\n*IPV6:* fe80::5dcd::ef69::fb22::d9888%12\n*UPNP:* Enabled\n*DMZ:* 10.112.42.15\n*MAC:* 5A:78:3E:7E:00\n*ISP:* Ucom universal \n*DNS:* 8.8.8.8\n*ALT DNS:* 1.1.1.1 \n*DNS SUFFIX:* Dlink\n*WAN:* 100.23.10.15\n*WAN TYPE:* private nat\n*GATEWAY:* 192.168.0.1\n*SUBNET MASK:* 255.255.0.255\n*UDP OPEN PORTS:* 8080, 80\n*TCP OPEN PORTS:* 443\n*ROUTER VENDEDOR:* ERICCSON\n*DEVICE VENDEDOR:* WIN32-X\n*CONNECTION TYPE:* TPLINK COMPANY\n*ICMPHOPS:* 192.168.0.1, 192.168.1.1, 100.73.43.4\nhost-132.12.32.167.ucom.com\nhost-132.12.111.ucom.com\n36.134.67.189, 216.239.78.11\nSof02s32inf14.1e100.net\n*HTTP:* 192.168.3.1:433-->92.28.211.234:80\n*Http:* 192.168.625-->92.28.211.455:80\n*Http:* 192.168.817-->92.28.211.8:971\n*Upd:* 192.168.452-->92.28.211:7265288\n*Tcp:* 192.168.682-->92.28.211:62227.7\n*Tcp:* 192.168.725-->92.28.211:67wu2\n*Tcp:* 192.168.629-->92.28.211.167:8615\n*EXTERNAL MAC:* 6U:77:89:ER:O4\n*MODEM JUMPS:* 64`

      await conn.reply(m.chat, doxeo, m, { edit: key, mentions: conn.parseMention(doxeo) })
    }
  } catch (error) {
    await m.react('✖️')
    await conn.reply(m.chat,
      `⚠︎ Se ha producido un problema.\n> Usa *${usedPrefix}report* para informarlo.\n\n${error.message}`,
      m, CTX_ERR
    )
  }
}

handler.help = ['top', 'ship', 'shippear', 'afk', 'personalidad', 'formarpareja', 'gay', 'lesbiana', 'pajero', 'pajera', 'puto', 'puta', 'manco', 'manca', 'rata', 'prostituto', 'prostituta', 'doxear', 'doxeo', 'doxxeo']
handler.tags = ['fun']
handler.command = handler.help
handler.group = true

export default handler
