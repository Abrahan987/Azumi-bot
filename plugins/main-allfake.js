import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
  try {
    options ? options : {}
    var res = await axios({
      method: "get",
      url,
      headers: {
        'DNT': 1,
        'User-Agent': 'GoogleBot',
        'Upgrade-Insecure-Request': 1
      },
      ...options,
      responseType: 'arraybuffer'
    })
    return res.data
  } catch (e) {
    console.log(`Error : ${e}`)
  }
}
  
//• ↳ ◜𝐁𝐈𝐋𝐋𝐈𝐄 𝐁𝐎𝐓 ◞ • ⚔
//creador y otros (identidad de Billie)
global.creador = 'Wa.me/573237649689'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/573237649689'
global.namechannel = '𝐁𝐈𝐋𝐋𝐈𝐄 𝐁𝐎𝐓'
global.namechannel2 = '✫𝐁𝐈𝐋𝐋𝐈𝐄 𝐁𝐎𝐓'
global.namegrupo = '𝐌𝐔𝐍𝐃𝐎 𝐆𝐀𝐌𝐄𝐑ᚐ҉'
global.namecomu = '𝗧𝗘𝗔𝗠 | 𝗠𝗨𝗡𝗗𝗢 𝗔𝗡𝗜𝗠𝗘'
global.namecomu2 = '✫𝚃𝙴𝙰𝙼✫'
global.colab1 = 'ABRAHAN'
global.colab2 = 'CUERVO'
global.colab3 = 'AN1l'
global.listo = '❀ *Aquí tienes ฅ^•ﻌ•^ฅ*'
// fotoperfil (fallback igual que Billie)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
global.fotoperfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')

//Ids channel (Billie)
global.idchannel = '120363279797793704@newsletter'
global.canalIdM = [
  "120363279797793704@newsletter",
  "120363279797793704@newsletter",
  "120363279797793704@newsletter"
]
global.canalNombreM = ["𝙱𝙸𝙻𝙻𝙸𝙴-𝙱𝙾𝚃"]
global.channelRD = await getRandomChannel()

//fechas (mantengo las rutas/funciones originales)
global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, { weekday: 'long' })
global.fecha = d.toLocaleDateString('es', { day: 'numeric', month: 'numeric', year: 'numeric' })
global.mes = d.toLocaleDateString('es', { month: 'long' })
global.año = d.toLocaleDateString('es', { year: 'numeric' })
global.tiempo = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'
global.msm = '⚠︎'

//Emojis determinado del bot (Billie)
global.emoji = '🥰'
global.emoji2 = '💨'
global.emoji3 = '💫'
global.emoji4 = '💥'
global.emojis = [emoji, emoji2, emoji3, emoji4].getRandom()

//mensaje en espera (Billie)
global.wait = '🕒 *𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊 𝙋𝙊𝙍𝙁𝘼...*';
global.waitt = '🕒 *𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊 𝙋𝙊𝙍𝙁𝘼...*';
global.waittt = '🕒 *𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊 𝙋𝙊𝙍𝙁𝘼...*';
global.waitttt = '🕒 *𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊 𝙋𝙊𝙍𝙁𝘼...*';

//Enlaces (reemplazados por los de Billie)
var canal = 'https://whatsapp.com/channel/0029VaehG4gKmCPX449RbA2T'
let canal2 = 'https://whatsapp.com/channel/0029VaehG4gKmCPX449RbA2T'
var git = 'https://github.com/Diomar-s'
var youtube = 'httpssi=QMJZfniTLCm9q1Iu'
var github = 'https://github.com/Diomar-s/Kakaroto-Bot-MD.git'
let correo = 'abrahanmoises987@gmail.com'
global.redes = [canal, canal2, git, youtube, github, correo].getRandom()

//Imagen (mantengo rutas originales y lógica del segundo código)
let category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

//Iconos (añadidos desde Billie)
global.icono = [
  'https://qu.ax/rGWyU.jpg',
  'https://qu.ax/BRxUN.jpg',
  'https://qu.ax/fqMUa.jpg',
  'https://qu.ax/neaRy.jpg',
  'https://qu.ax/uegpE.jpg',
  'https://qu.ax/OzNcz.jpg'
].getRandom()

//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
var ase = new Date()
var hour = ase.getHours()
switch (hour) {
  case 0: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 1: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 3: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
  case 4: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
  case 5: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
  case 6: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
  case 7: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; break;
  case 8: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
  case 9: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break;
  case 10: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break;
  case 11: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break;
  case 12: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break;
  case 13: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break;
  case 14: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break;
  case 15: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break;
  case 16: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break;
  case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break;
  case 18: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 19: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 20: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 21: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 22: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
  case 23: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;
}
global.saludo = hour;

//tags
global.nombre = m.pushName || 'Anónimo'
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

//Fakes (modelo Billie)
global.fkontak = {
  key: {
    participants: "0@s.whatsapp.net",
    "remoteJid": "status@broadcast",
    "fromMe": false,
    "id": "Halo"
  },
  "message": {
    "contactMessage": {
      "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
    }
  },
  "participant": "0@s.whatsapp.net"
}

// global.estilo (se mantiene comentado como en original)
global.fake = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1
    }
  }
}, { quoted: m }

global.icono = [
  'https://qu.ax/rGWyU.jpg',
  'https://qu.ax/BRxUN.jpg',
  'https://qu.ax/fqMUa.jpg',
  'https://qu.ax/neaRy.jpg',
  'https://qu.ax/uegpE.jpg',
  'https://qu.ax/OzNcz.jpg'
].getRandom()

global.rcanal = {
  contextInfo: {
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      serverMessageId: 100,
      newsletterName: channelRD.name,
    },
    externalAdReply: {
      showAdAttribution: true,
      title: namechannel,
      body: '𝐀𝐙𝐔𝐌𝐈𝐁𝐁ᚐ',
      mediaUrl: null,
      description: null,
      previewType: "PHOTO",
      thumbnailUrl: icono,
      sourceUrl: redes,
      mediaType: 1,
      renderLargerThumbnail: false
    },
  }
}

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

async function getRandomChannel() {
  let randomIndex = Math.floor(Math.random() * canalIdM.length)
  let id = canalIdM[randomIndex]
  let name = canalNombreM[randomIndex]
  return { id, name }
}

    
