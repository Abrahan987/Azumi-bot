// - OfcKing >> https://github.com/OfcKing

import fs from 'fs'
import path from 'path'

const marriagesFile = path.resolve('./src/database/casados.json')
let proposals = {}

function loadMarriages() {
  if (fs.existsSync(marriagesFile)) {
    const data = fs.readFileSync(marriagesFile, 'utf-8')
    return JSON.parse(data)
  } else {
    return {}
  }
}

function saveMarriages(data) {
  fs.writeFileSync(marriagesFile, JSON.stringify(data, null, 2))
}

let marriages = loadMarriages()

let handler = async (m, { conn, command, usedPrefix }) => {
  const marryCmd = /^(marry)$/i.test(command)
  const acceptCmd = /^(acepto)$/i.test(command) // acepta Acepto / acepto / ACEPTO
  const divorceCmd = /^(divorce)$/i.test(command)

  switch (true) {
    // 💍 PROPONER MATRIMONIO
    case marryCmd: {
      let sender = m.sender
      let target = m.mentionedJid?.[0]

      if (!target)
        return m.reply(
          `✧ Debes mencionar a alguien para proponer matrimonio.\n> Ejemplo » *${usedPrefix + command} @usuario*`
        )

      if (sender === target) return m.reply('✧ ¡No puedes proponerte matrimonio a ti mismo!')

      if (marriages[sender])
        return m.reply(
          `✧ Ya estás casado/a con *@${marriages[sender].split('@')[0]}*\n> Usa *#divorce* para divorciarte.`,
          null,
          { mentions: [marriages[sender]] }
        )

      if (marriages[target])
        return m.reply(
          `✧ @${target.split('@')[0]} ya está casado/a con *@${marriages[target].split('@')[0]}*`,
          null,
          { mentions: [target, marriages[target]] }
        )

      proposals[sender] = target

      await conn.reply(
        m.chat,
        `✐ @${target.split('@')[0]} te ha propuesto matrimonio 💍\n> Para aceptar escribe » *${usedPrefix}acepto @${sender.split('@')[0]}*`,
        m,
        { mentions: [sender, target] }
      )
      break
    }

    // 💞 ACEPTAR PROPUESTA
    case acceptCmd: {
      let sender = m.sender
      let target = m.mentionedJid?.[0]

      if (!target)
        return m.reply(
          `✧ Debes mencionar a la persona que te propuso matrimonio.\n> Ejemplo » *${usedPrefix + command} @usuario*`
        )

      if (sender === target) return m.reply('✧ No puedes aceptarte a ti mismo 😹')

      if (proposals[target] !== sender)
        return m.reply(`✧ Esa persona no te ha propuesto matrimonio.`)

      delete proposals[target]
      marriages[sender] = target
      marriages[target] = sender
      saveMarriages(marriages)

      global.db.data.users[sender].marry = conn.getName(target)
      global.db.data.users[target].marry = conn.getName(sender)

      await conn.reply(
        m.chat,
        `✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩\n¡Se han Casado! ฅ^•ﻌ•^ฅ*:･ﾟ✧\n\n*•.¸♡ Esposo/a @${sender.split('@')[0]} ♡ @${target.split('@')[0]} •.¸♡*\n\n\`Disfruten de su luna de miel\`\n\n✩.･:｡≻───── ⋆♡⋆ ─────.•:｡✩`,
        m,
        { mentions: [sender, target] }
      )
      break
    }

    // 💔 DIVORCIO
    case divorceCmd: {
      let userDivorce = m.sender
      if (!marriages[userDivorce]) return m.reply('✧ Tú no estás casado/a con nadie.')

      let pareja = marriages[userDivorce]
      delete marriages[userDivorce]
      delete marriages[pareja]
      saveMarriages(marriages)

      global.db.data.users[userDivorce].marry = ''
      global.db.data.users[pareja].marry = ''

      await conn.reply(
        m.chat,
        `✧ @${userDivorce.split('@')[0]} y @${pareja.split('@')[0]} se han divorciado 💔`,
        m,
        { mentions: [userDivorce, pareja] }
      )
      break
    }
  }
}

handler.tags = ['fun']
handler.help = ['marry *@usuario*', 'acepto *@usuario*', 'divorce']
handler.command = ['marry', 'acepto', 'divorce']
handler.group = true
handler.register = true

export default handler
