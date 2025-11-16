import util from 'util'
import path from 'path'

async function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {

if (!text) throw `*Ejemplo:*\n${usedPrefix + command} texto`
let ps = groupMetadata.participants
let a = ps.getRandom()
let k = Math.floor(Math.random() * 70)
let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
let top = `*\`[🥳ＦＥＬＩＣＩＤＡＤＥＳ🥳]\`*\n\n@${a.pushName} 🥳\nAcaba de ganar el sorteo felicitaciones 🎉`
let txt = ''
let count = 0
for (const c of top) {
await new Promise(resolve => setTimeout(resolve, 15))
txt += c
count++

if (count % 10 === 0) {
conn.sendPresenceUpdate('composing' , m.chat);
}
}
await conn.sendMessage(m.chat, { text: txt.trim(), mentions: [a.id] }, {quoted: m, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100} )

}
handler.help = ['sorteo']
handler.command = ['sorteo']
handler.tags = ['fun']
handler.group = true

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
