function handler(m, { groupMetadata }) {
let ps = groupMetadata.participants
let a = ps.getRandom()
let b
do b = ps.getRandom()
while (b === a)
m.reply(`*🔰 Vamos a hacer algunas amistades 🔰*\n\n*Oye @${a.pushName} hablale al privado a @${b.pushName} para que jueguen y se haga una amistad 🙆*\n\n*Las mejores amistades empiezan con un juego 😉*`, null, {
mentions: [a.id, b.id]
})}
handler.help = ['amistad']
handler.tags = ['fun']
handler.command = ['amigorandom','amistad']
handler.group = true
handler.register = true
export default handler