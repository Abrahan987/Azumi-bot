import fetch from 'node-fetch';

let handler = async(m, { conn, text, usedPrefix, command }) => {

if (!text) return m.reply('《★》Ingresa Un Nombre De Repositorio o De Usuario De Github');

try {
let darkGay = `https://dark-core-api.vercel.app/api/search/github?key=dk-vip&text=${text}`
let tesisteamo = await fetch(darkGay)
let tesisteamo2 = await tesisteamo.json()
let result = tesisteamo2.results[0]

let txt = `🌿 *Nombre:* ${result.name}\n🍃 *Owner:* ${result.creator}\n🌟*Estrellas:* ${result.stars}\n🌾 *Bifurcaciones:* ${result.forks}\n🌃 *Descripcion:* ${result.description}\n🌸 *Creado:* ${result.createdAt}\n\n>*Link:* ${result.cloneUrl}`;

conn.reply(m.chat, txt, m, rcanal)

} catch (error) {
m.reply(error.message + dev)
}}

handler.tag = ['buscador'];
handler.help = ['githubstalk'];
handler.command = ['githubstalk'];

export default handler;