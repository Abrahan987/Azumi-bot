import util from 'util'
import path from 'path'
function handler(m, { groupMetadata, command, conn, text, usedPrefix}) {
if (!text) return conn.reply(m.chat, 'Ejemplo de uso: #top *texto*', m, rcanal)
let ps = groupMetadata.participants
let a = ps.getRandom()
let b = ps.getRandom()
let c = ps.getRandom()
let d = ps.getRandom()
let e = ps.getRandom()
let f = ps.getRandom()
let g = ps.getRandom()
let h = ps.getRandom()
let i = ps.getRandom()
let j = ps.getRandom()
let k = Math.floor(Math.random() * 70);
let x = `${pickRandom(['🤓','😅','😂','😳','😎', '🥵', '😱', '🤑', '🙄', '💩','🍑','🤨','🥴','🔥','👇🏻','😔', '👀','🌚'])}`
let l = Math.floor(Math.random() * x.length);
let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
let top = `*${x} Top 10 ${text} ${x}*
    
*1. @${a.pushName}*
*2. @${b.pushName}*
*3. @${c.pushName}*
*4. @${d.pushName}*
*5. @${e.pushName}*
*6. @${f.pushName}*
*7. @${g.pushName}*
*8. @${h.pushName}*
*9. @${i.pushName}*
*10. @${j.pushName}*`
m.reply(top, null, { mentions: [a.id, b.id, c.id, d.id, e.id, f.id, g.id, h.id, i.id, j.id]})
}
handler.help = ['top *<texto>*']
handler.command = ['top']
handler.tags = ['fun']
handler.group = true;
handler.register = true
export default handler
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}