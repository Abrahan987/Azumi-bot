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
  const divorceCmd = /^(divorce)$/i.test(command)

  switch (true) {
    case marryCmd:
      let sender = m.sender
      let target = m.mentionedJid?.[0]

      if (!target) {
        return conn.reply(
          m.chat,
          `✧ Debes mencionar a alguien para proponer matrimonio.\n> Ejemplo » *${usedPrefix + command} @usuario*`,
          m
        )
      }

      if (sender === target) return m.reply('✧ ¡No puedes proponerte matrimonio a ti mismo!')

      if (marriages[sender]) {
        return conn.reply(
          m.chat,
          `✧ Ya estás casado/a con *@${marriages[sender].split('@')[0]}*\n> Usa *#divorce* para divorciarte.`,
          m,
          { mentions: [marriages[sender]] }
        )
      }

      if (marriages[target]) {
        return conn.reply(
          m.chat,
          `✧ @${target.split('@')[0]} ya está casado/a con *@${marriages[target].split('@')[0]}*`,
          m,
          { mentions: [target, marriages[target]] }
        )
      }

      // 💞 Aceptar propuesta existente
      if (proposals[target] === sender) {
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
        return
      }

      // 💌 Registrar propuesta
      proposals[sender] = target
      await conn.reply(
        m.chat,
        `✐ @${target.split('@')[0]} te ha propuesto matrimonio, ¿aceptas?\n> ✐ Aceptar » *${usedPrefix + command} @${sender.split('@')[0]}*`,
        m,
        { mentions: [sender, target] }
      )
      break

    case divorceCmd:
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
        `✧ @${userDivorce.split('@')[0]} y @${pareja.split('@')[0]} se han divorciado.`,
        m,
        { mentions: [userDivorce, pareja] }
      )
      break
  }
}

handler.tags = ['fun']
handler.help = ['marry *@usuario*', 'divorce']
handler.command = ['marry', 'divorce']
handler.group = true
handler.register = true

export default handler
