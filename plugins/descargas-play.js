//actualizado por xi_crew
/*import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
const LimitAud = 725 * 1024 * 1024; //700MB
const LimitVid = 425 * 1024 * 1024; //425MB
const handler = async (m, {conn, command, args, text, usedPrefix}) => {

if (command == 'play' || command == 'mp3') {
if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`,  m, rcanal, ); 
await m.react(rwait);
const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${yt_play[0].title}
» 📆 *Publicado:* ${yt_play[0].ago}
» 🕒 *Duración:* ${secondString(yt_play[0].duration.seconds)}
» 👀 *Vistas:* ${MilesNumber(yt_play[0].views)}
» 👤 *Autor:* ${yt_play[0].author.name}
» 🎫 *ID:* ${yt_play[0].videoId}
» 💠 *Tipo:* ${yt_play[0].type}
» 🔗 *Enlace:* ${yt_play[0].url}
» 🎞️ *Canal:* ${yt_play[0].author.url}

> 📽️ *Su Audio se está enviando, espere un momento...*`.trim();

await conn.sendMessage(m.chat, {
image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', sourceUrl: cn, thumbnail: logo7 }}, quoted: estilo});
try {
await m.react(rwait);
const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) {
return m.react(error)}
const downloadUrl = delius.data.download.url;
await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
await m.react(done);
} catch (e1) {
try { 
await m.react(rwait);
let q = '128kbps'
const yt = await youtubedl(yt_play[0].url).catch(async _ => await youtubedlv2(yt_play[0].url))
const dl_url = await yt.audio[q].download()
const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' })
await m.react(done);
} catch (e2) {
try {  
await m.react(rwait); 
const downloadUrl = await fetch9Convert(yt_play[0].url); 
await conn.sendFile(m.chat, downloadUrl, 'audio.mp3', null, m, false, { mimetype: 'audio/mp4' })
await m.react(done);
} catch (e3) {
try {
await m.react(rwait);
const downloadUrl = await fetchY2mate(yt_play[0].url);
await conn.sendFile(m.chat, downloadUrl, 'audio.mp3', null, m, false, { mimetype: 'audio/mp4' })
await m.react(done);
} catch (e4) {
try {
await m.react(rwait);
const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`)
const audioData = await res.json()
if (audioData.status && audioData.result?.downloadUrl) {
await conn.sendMessage(m.chat, { audio: { url: audioData.result.downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
await m.react(done);
}} catch (e5) {
try {
await m.react(rwait);
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp3);
const fileSize = await getFileSize(dp.result.media.mp3);
await conn.sendMessage(m.chat, { audio: { url: audiop }, mimetype: 'audio/mpeg' }, { quoted: m });
await m.react(done);
if (fileSize > LimitAud) return await conn.sendMessage(m.chat, { document: { url: audiop }, mimetype: 'audio.mp3', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
await m.react(done);
} catch (e) {    
await m.react(error);
console.log(e);
}}}}}}}

if (command == 'play2' || command == 'mp4') {
if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`,  m, rcanal, );
await m.react(rwait);
const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${yt_play[0].title}
» 📆 *Publicado:* ${yt_play[0].ago}
» 🕒 *Duración:* ${secondString(yt_play[0].duration.seconds)}
» 👀 *Vistas:* ${MilesNumber(yt_play[0].views)}
» 👤 *Autor:* ${yt_play[0].author.name}
» 🎫 *ID:* ${yt_play[0].videoId}
» 💠 *Tipo:* ${yt_play[0].type}
» 🔗 *Enlace:* ${yt_play[0].url}
» 🎞️ *Canal:* ${yt_play[0].author.url}

> 📽️ *Su Video se está enviando, espere un momento...*`.trim();

await conn.sendMessage(m.chat, {
image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', sourceUrl: cn, thumbnail: logo7 }}, quoted: estilo});
try {
await m.react(rwait);
const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) return m.react(error);
const downloadUrl = delius.data.download.url;
const fileSize = await getFileSize(downloadUrl);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.` }, { quoted: m });
await m.react(done);
} else {
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(done);
}} catch (e1) {
try {  
await m.react(rwait);  
let qu = args[1] || '360'
let q = qu + 'p'
const yt = await youtubedl(yt_play[0].url).catch(async _ => await youtubedlv2(yt_play[0].url))
const dl_url = await yt.video[q].download()
const ttl = await yt.title
const size = await yt.video[q].fileSizeH
await await conn.sendMessage(m.chat, { video: { url: dl_url }, fileName: `${ttl}.mp4`, mimetype: 'video/mp4', caption: `☁️ Aquí está tu video.`, thumbnail: await fetch(yt.thumbnail) }, { quoted: m })
await m.react(done);
} catch (e2) {
try {    
await m.react(rwait);
const downloadUrl = await fetch9Convert(yt_play[0].url); 
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(done);
} catch (e3) {
try {
await m.react(rwait);
const downloadUrl = await fetchY2mate(yt_play[0].url);
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(done);
} catch (e4) {
try {
await m.react(rwait);
const videoInfo = await fetchInvidious(yt_play[0].url)
const downloadUrl = videoInfo.videoFormats.find(format => format.mimeType === "audio/mp4").url;
await conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(done);
} catch (e5) {
try {
await m.react(rwait);
let searchh = await yts(yt_play[0].url)
let __res = searchh.all.map(v => v).filter(v => v.type == "video")
let infoo = await ytdl.getInfo('https://youtu.be/' + __res[0].videoId)
let ress = await ytdl.chooseFormat(infoo.formats, { filter: 'audioonly' })
conn.sendMessage(m.chat, { video: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(done);
} catch (e6) {
try {
await m.react(rwait);
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp4);
const fileSize = await getFileSize(dp.result.media.mp4);
if (fileSize > LimitVid) {
await conn.sendMessage(m.chat, { document: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.` }, { quoted: m });
await m.react(done);
} else {
await conn.sendMessage(m.chat, { video: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: `☁️ Aquí está tu video.`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m });
await m.react(done);
}} catch (e) {    
await m.react(error);
console.log(e);
}}}}}}}}

if (command == 'play3' || command == 'playdoc') {
if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`,  m, rcanal, );
await m.react(rwait);
const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${yt_play[0].title}
» 📆 *Publicado:* ${yt_play[0].ago}
» 🕒 *Duración:* ${secondString(yt_play[0].duration.seconds)}
» 👀 *Vistas:* ${MilesNumber(yt_play[0].views)}
» 👤 *Autor:* ${yt_play[0].author.name}
» 🎫 *ID:* ${yt_play[0].videoId}
» 💠 *Tipo:* ${yt_play[0].type}
» 🔗 *Enlace:* ${yt_play[0].url}
» 🎞️ *Canal:* ${yt_play[0].author.url}

> 📽️ *Su Audio en documento se está enviando, espere un momento...*`.trim();

await conn.sendMessage(m.chat, {
image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', sourceUrl: cn, thumbnail: logo7 }}, quoted: estilo});
try {
await m.react(rwait);
const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) {
return m.react(error)}
const downloadUrl = delius.data.download.url;
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
await m.react(done);
} catch (e1) {
try {    
await m.react(rwait);
let q = '128kbps'
const yt = await youtubedl(yt_play[0].url).catch(async _ => await youtubedlv2(yt_play[0].url))
const dl_url = await yt.audio[q].download()
const ttl = await yt.title
const size = await yt.audio[q].fileSizeH
await conn.sendMessage(m.chat, { document: { url: dl_url }, mimetype: 'audio/mpeg', fileName: `${ttl}.mp3` }, { quoted: m });
await m.react(done);
} catch (e2) {
try { 
await m.react(rwait);  
const downloadUrl = await fetch9Convert(yt_play[0].url); 
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
await m.react(done);
} catch (e3) {
try {
await m.react(rwait);
const downloadUrl = await fetchY2mate(yt_play[0].url);
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
await m.react(done);
} catch (e4) {
try {
await m.react(rwait);
const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${yt_play[0].url}`)
const audioData = await res.json()
if (audioData.status && audioData.result?.downloadUrl) {
await conn.sendMessage(m.chat, { document: { url: audioData.result.downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
await m.react(done);
}} catch (e5) {
try {
await m.react(rwait);
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp3);
const fileSize = await getFileSize(dp.result.media.mp3);
await conn.sendMessage(m.chat, { document: { url: audioData.result.downloadUrl }, mimetype: 'audio/mpeg', fileName: `${yt_play[0].title}.mp3` }, { quoted: m });
await m.react(done);
} catch (e) {    
await m.react(error);
console.log(e);
}}}}}}}

if (command == 'play4' || command == 'playdoc2') {
if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommoee Profitt`,  m, rcanal, );
await m.react(rwait);
const yt_play = await search(args.join(' '));
const ytplay2 = await yts(text);
const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${yt_play[0].title}
» 📆 *Publicado:* ${yt_play[0].ago}
» 🕒 *Duración:* ${secondString(yt_play[0].duration.seconds)}
» 👀 *Vistas:* ${MilesNumber(yt_play[0].views)}
» 👤 *Autor:* ${yt_play[0].author.name}
» 🎫 *ID:* ${yt_play[0].videoId}
» 💠 *Tipo:* ${yt_play[0].type}
» 🔗 *Enlace:* ${yt_play[0].url}
» 🎞️ *Canal:* ${yt_play[0].author.url}
  
> 📽️ *Su video en documento se está enviando, espere un momento...*`.trim();

await conn.sendMessage(m.chat, {
image: { url: yt_play[0].thumbnail }, caption: texto1, contextInfo: { externalAdReply: { title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', sourceUrl: cn, thumbnail: logo7 }}, quoted: estilo});
try {
await m.react(rwait);
const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(yt_play[0].url)}`;
const apiResponse = await fetch(apiUrl);
const delius = await apiResponse.json();
if (!delius.status) return m.react(error);
const downloadUrl = delius.data.download.url;
//const fileSize = await getFileSize(downloadUrl);
await conn.sendMessage(m.chat, { document: { url: downloadUrl }, fileName: `${yt_play[0].title}.mp4`, caption: `${wm}`, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m })    
await m.react(done);
} catch (e1) {
try {
await m.react(rwait);
let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${yt_play[0].url}`);
let dp = await d2.json();
const audiop = await getBuffer(dp.result.media.mp4);
await conn.sendMessage(m.chat, { document: { url: audiop }, fileName: `${yt_play[0].title}.mp4`, caption: null, thumbnail: yt_play[0].thumbnail, mimetype: 'video/mp4' }, { quoted: m })    
await m.react(done); 
} catch (e2) {    
await m.react(error);
console.log(e2);
}}}

}
handler.help = ['play', 'play2', 'play3', 'play4', 'playdoc'];
handler.tags = ['descargas'];
handler.command = ['play', 'play2', 'play3', 'play4', 'mp3', 'mp4', 'playdoc', 'playdoc2']
handler.group = false;
export default handler;

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
  }

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}

async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}

async function fetchY2mate(url) {
  const baseUrl = 'https://www.y2mate.com/mates/en60';
  const videoInfo = await fetch(`${baseUrl}/analyze/ajax`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ url, q_auto: 0 })
  }).then(res => res.json());

  const id = videoInfo.result.id;
  const downloadInfo = await fetch(`${baseUrl}/convert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ type: 'youtube', _id: id, v_id: url, token: '', ftype: 'mp4', fquality: '360p' })
  }).then(res => res.json());

  return downloadInfo.result.url;
}

async function fetchInvidious(url) {
  const apiUrl = `https://invidious.io/api/v1/get_video_info`;

const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
const data = await response.json();

if (data && data.video) {
const videoInfo = data.video;
return videoInfo; 
} else {
throw new Error("No se pudo obtener información del video desde Invidious");
  }
}

async function fetch9Convert(url) {
const apiUrl = `https://9convert.com/en429/api`;
const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
const data = await response.json();

if (data.status === 'ok') {
    return data.result.mp3;
  } else {
    throw new Error("No se pudo obtener la descarga desde 9Convert");
  }
}*/// Actualizado por xi_crew - Versión mejorada con nuevas APIs
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import { fetchYouTubeDownload } from '../lib/ytdll.js'

const LimitAud = 725 * 1024 * 1024; // 725MB
const LimitVid = 425 * 1024 * 1024; // 425MB

const handler = async (m, {conn, command, args, text, usedPrefix}) => {

  // ============ COMANDO PLAY / MP3 (Audio) ============
  if (command === 'play' || command === 'mp3') {
    if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommee Profitt`, m, rcanal);
    
    await m.react(rwait);
    
    try {
      const yt_play = await search(args.join(' '));
      if (!yt_play || yt_play.length === 0) {
        return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
      }

      const videoInfo = yt_play[0];
      const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
      
      const vistas = formatViews(views);
      const canal = author?.name || 'Desconocido';

      const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${title}
» 📆 *Publicado:* ${ago}
» 🕒 *Duración:* ${timestamp}
» 👀 *Vistas:* ${vistas}
» 👤 *Autor:* ${canal}
» 🎫 *ID:* ${videoInfo.videoId}
» 💠 *Tipo:* ${videoInfo.type}
» 🔗 *Enlace:* ${url}
» 🎞️ *Canal:* ${author.url}

> 📽️ *Su Audio se está enviando, espere un momento...*`.trim();

      await conn.sendMessage(m.chat, {
        image: { url: thumbnail }, 
        caption: texto1, 
        contextInfo: { 
          externalAdReply: { 
            title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', 
            body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', 
            sourceUrl: cn, 
            thumbnail: logo7 
          }
        }
      }, {quoted: estilo});

      // Intento 1: API Stellar
      try {
        await m.react(rwait);
        const apiAudioUrl = `https://api.stellarwa.xyz/dow/ytmp3?url=${encodeURIComponent(url)}&apikey=Diamond`;
        const response = await fetch(apiAudioUrl);
        const json = await response.json();
        const { title: audioTitle, dl } = json.data;
        
        if (!dl) throw new Error('El enlace de audio no se generó correctamente.');
        
        await conn.sendMessage(m.chat, { 
          audio: { url: dl }, 
          fileName: `${audioTitle}.mp3`, 
          mimetype: 'audio/mpeg' 
        }, { quoted: m });
        await m.react(done);
        return;
      } catch (e1) {
        console.error('Error API Stellar:', e1.message);
        
        // Intento 2: API Delirius
        try {
          await m.react(rwait);
          const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
          const apiResponse = await fetch(apiUrl);
          const delius = await apiResponse.json();
          
          if (!delius.status) throw new Error('Delirius falló');
          
          const downloadUrl = delius.data.download.url;
          await conn.sendMessage(m.chat, { 
            audio: { url: downloadUrl }, 
            mimetype: 'audio/mpeg' 
          }, { quoted: m });
          await m.react(done);
          return;
        } catch (e2) {
          console.error('Error API Delirius:', e2.message);
          
          // Intento 3: fetchYouTubeDownload
          try {
            await m.react(rwait);
            const result = await fetchYouTubeDownload(url);
            
            if (!result.success) throw new Error(result.error || 'No se pudo obtener datos del video.');
            
            const { title: dlTitle, downloads } = result;
            const audio = downloads.find(d => d.contentType?.startsWith('audio'));
            
            if (!audio?.url) throw new Error('No se encontró audio.');
            
            await conn.sendMessage(m.chat, { 
              audio: { url: audio.url }, 
              fileName: `${dlTitle}.mp3`, 
              mimetype: 'audio/mpeg' 
            }, { quoted: m });
            await m.react(done);
            return;
          } catch (e3) {
            console.error('Error fetchYouTubeDownload:', e3.message);
            
            // Intento 4: youtubedl
            try {
              await m.react(rwait);
              let q = '128kbps';
              const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url));
              const dl_url = await yt.audio[q].download();
              const ttl = await yt.title;
              
              await conn.sendFile(m.chat, dl_url, ttl + '.mp3', null, m, false, { mimetype: 'audio/mp4' });
              await m.react(done);
              return;
            } catch (e4) {
              console.error('Error youtubedl:', e4.message);
              
              // Intento 5: API Zenkey
              try {
                await m.react(rwait);
                const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`);
                const audioData = await res.json();
                
                if (audioData.status && audioData.result?.downloadUrl) {
                  await conn.sendMessage(m.chat, { 
                    audio: { url: audioData.result.downloadUrl }, 
                    mimetype: 'audio/mpeg' 
                  }, { quoted: m });
                  await m.react(done);
                  return;
                }
                throw new Error('Zenkey no retornó URL');
              } catch (e5) {
                console.error('Error API Zenkey:', e5.message);
                
                // Intento 6: API Exonity
                try {
                  await m.react(rwait);
                  let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`);
                  let dp = await d2.json();
                  const audiop = await getBuffer(dp.result.media.mp3);
                  
                  await conn.sendMessage(m.chat, { 
                    audio: { url: audiop }, 
                    mimetype: 'audio/mpeg' 
                  }, { quoted: m });
                  await m.react(done);
                  return;
                } catch (e6) {
                  console.error('Error API Exonity:', e6.message);
                  await m.react(error);
                  return conn.reply(m.chat, `⚠️ No se pudo enviar el audio después de múltiples intentos. Intenta más tarde.\n\nError: ${e6.message}`, m);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error general en play:', error);
      await m.react(error);
      return conn.reply(m.chat, `❌ Ocurrió un error: ${error.message}`, m);
    }
  }

  // ============ COMANDO PLAY2 / MP4 (Video) ============
  if (command === 'play2' || command === 'mp4') {
    if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommee Profitt`, m, rcanal);
    
    await m.react(rwait);
    
    try {
      const yt_play = await search(args.join(' '));
      if (!yt_play || yt_play.length === 0) {
        return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
      }

      const videoInfo = yt_play[0];
      const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
      
      const vistas = formatViews(views);
      const canal = author?.name || 'Desconocido';

      const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${title}
» 📆 *Publicado:* ${ago}
» 🕒 *Duración:* ${timestamp}
» 👀 *Vistas:* ${vistas}
» 👤 *Autor:* ${canal}
» 🎫 *ID:* ${videoInfo.videoId}
» 💠 *Tipo:* ${videoInfo.type}
» 🔗 *Enlace:* ${url}
» 🎞️ *Canal:* ${author.url}

> 📽️ *Su Video se está enviando, espere un momento...*`.trim();

      await conn.sendMessage(m.chat, {
        image: { url: thumbnail }, 
        caption: texto1, 
        contextInfo: { 
          externalAdReply: { 
            title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', 
            body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', 
            sourceUrl: cn, 
            thumbnail: logo7 
          }
        }
      }, {quoted: estilo});

      // Intento 1: API Stellar
      try {
        await m.react(rwait);
        const apiVideoUrl = `https://api.stellarwa.xyz/dow/ytmp4?url=${encodeURIComponent(url)}&apikey=Diamond`;
        const response = await fetch(apiVideoUrl);
        const json = await response.json();
        const { title: videoTitle, dl } = json.data;
        
        if (!dl) throw new Error('El enlace de video no se generó correctamente.');
        
        const fileSize = await getFileSize(dl);
        
        if (fileSize > LimitVid) {
          await conn.sendMessage(m.chat, { 
            document: { url: dl }, 
            fileName: `${videoTitle}.mp4`, 
            caption: `☁️ Aquí está tu video.` 
          }, { quoted: m });
        } else {
          await conn.sendMessage(m.chat, { 
            video: { url: dl }, 
            fileName: `${videoTitle}.mp4`, 
            caption: `☁️ Aquí está tu video.`, 
            thumbnail: thumbnail, 
            mimetype: 'video/mp4' 
          }, { quoted: m });
        }
        await m.react(done);
        return;
      } catch (e1) {
        console.error('Error API Stellar video:', e1.message);
        
        // Intento 2: API Vreden
        try {
          await m.react(rwait);
          const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`);
          const json = await response.json();
          const resultad = json.result;
          const resultado = resultad.download.url;
          
          if (!resultad || !resultado) throw new Error('El enlace de video no se generó correctamente.');
          
          await conn.sendMessage(m.chat, { 
            video: { url: resultado }, 
            fileName: resultad.title, 
            mimetype: 'video/mp4', 
            caption: dev 
          }, { quoted: m });
          await m.react(done);
          return;
        } catch (e2) {
          console.error('Error API Vreden:', e2.message);
          
          // Intento 3: API Delirius
          try {
            await m.react(rwait);
            const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            
            if (!delius.status) throw new Error('Delirius falló');
            
            const downloadUrl = delius.data.download.url;
            const fileSize = await getFileSize(downloadUrl);
            
            if (fileSize > LimitVid) {
              await conn.sendMessage(m.chat, { 
                document: { url: downloadUrl }, 
                fileName: `${title}.mp4`, 
                caption: `☁️ Aquí está tu video.` 
              }, { quoted: m });
            } else {
              await conn.sendMessage(m.chat, { 
                video: { url: downloadUrl }, 
                fileName: `${title}.mp4`, 
                caption: `☁️ Aquí está tu video.`, 
                thumbnail: thumbnail, 
                mimetype: 'video/mp4' 
              }, { quoted: m });
            }
            await m.react(done);
            return;
          } catch (e3) {
            console.error('Error API Delirius video:', e3.message);
            
            // Intento 4: fetchYouTubeDownload
            try {
              await m.react(rwait);
              const result = await fetchYouTubeDownload(url);
              
              if (!result.success) throw new Error(result.error || 'No se pudo obtener datos del video.');
              
              const { title: dlTitle, downloads } = result;
              const video = downloads.find(d => d.contentType?.startsWith('video'));
              
              if (!video?.url) throw new Error('No se encontró video.');
              
              await conn.sendMessage(m.chat, { 
                video: { url: video.url }, 
                fileName: `${dlTitle}.mp4`, 
                mimetype: 'video/mp4', 
                caption: dev 
              }, { quoted: m });
              await m.react(done);
              return;
            } catch (e4) {
              console.error('Error fetchYouTubeDownload:', e4.message);
              
              // Intento 5: youtubedl
              try {
                await m.react(rwait);
                let qu = args[1] || '360';
                let q = qu + 'p';
                const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url));
                const dl_url = await yt.video[q].download();
                const ttl = await yt.title;
                
                await conn.sendMessage(m.chat, { 
                  video: { url: dl_url }, 
                  fileName: `${ttl}.mp4`, 
                  mimetype: 'video/mp4', 
                  caption: `☁️ Aquí está tu video.`, 
                  thumbnail: await fetch(yt.thumbnail) 
                }, { quoted: m });
                await m.react(done);
                return;
              } catch (e5) {
                console.error('Error youtubedl video:', e5.message);
                
                // Intento 6: API Exonity
                try {
                  await m.react(rwait);
                  let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`);
                  let dp = await d2.json();
                  const videop = await getBuffer(dp.result.media.mp4);
                  const fileSize = await getFileSize(dp.result.media.mp4);
                  
                  if (fileSize > LimitVid) {
                    await conn.sendMessage(m.chat, { 
                      document: { url: videop }, 
                      fileName: `${title}.mp4`, 
                      caption: `☁️ Aquí está tu video.` 
                    }, { quoted: m });
                  } else {
                    await conn.sendMessage(m.chat, { 
                      video: { url: videop }, 
                      fileName: `${title}.mp4`, 
                      caption: `☁️ Aquí está tu video.`, 
                      thumbnail: thumbnail, 
                      mimetype: 'video/mp4' 
                    }, { quoted: m });
                  }
                  await m.react(done);
                  return;
                } catch (e6) {
                  console.error('Error API Exonity video:', e6.message);
                  await m.react(error);
                  return conn.reply(m.chat, `⚠️ No se pudo enviar el video después de múltiples intentos. Intenta más tarde.\n\nError: ${e6.message}`, m);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error general en play2:', error);
      await m.react(error);
      return conn.reply(m.chat, `❌ Ocurrió un error: ${error.message}`, m);
    }
  }

  // ============ COMANDO PLAY3 / PLAYDOC (Audio como documento) ============
  if (command === 'play3' || command === 'playdoc') {
    if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommee Profitt`, m, rcanal);
    
    await m.react(rwait);
    
    try {
      const yt_play = await search(args.join(' '));
      if (!yt_play || yt_play.length === 0) {
        return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
      }

      const videoInfo = yt_play[0];
      const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
      
      const vistas = formatViews(views);
      const canal = author?.name || 'Desconocido';

      const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${title}
» 📆 *Publicado:* ${ago}
» 🕒 *Duración:* ${timestamp}
» 👀 *Vistas:* ${vistas}
» 👤 *Autor:* ${canal}
» 🎫 *ID:* ${videoInfo.videoId}
» 💠 *Tipo:* ${videoInfo.type}
» 🔗 *Enlace:* ${url}
» 🎞️ *Canal:* ${author.url}

> 📽️ *Su Audio en documento se está enviando, espere un momento...*`.trim();

      await conn.sendMessage(m.chat, {
        image: { url: thumbnail }, 
        caption: texto1, 
        contextInfo: { 
          externalAdReply: { 
            title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', 
            body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', 
            sourceUrl: cn, 
            thumbnail: logo7 
          }
        }
      }, {quoted: estilo});

      // Intento 1: API Stellar
      try {
        await m.react(rwait);
        const apiAudioUrl = `https://api.stellarwa.xyz/dow/ytmp3?url=${encodeURIComponent(url)}&apikey=Diamond`;
        const response = await fetch(apiAudioUrl);
        const json = await response.json();
        const { title: audioTitle, dl } = json.data;
        
        if (!dl) throw new Error('El enlace de audio no se generó correctamente.');
        
        await conn.sendMessage(m.chat, { 
          document: { url: dl }, 
          mimetype: 'audio/mpeg', 
          fileName: `${audioTitle}.mp3` 
        }, { quoted: m });
        await m.react(done);
        return;
      } catch (e1) {
        console.error('Error API Stellar doc:', e1.message);
        
        // Intento 2: API Delirius
        try {
          await m.react(rwait);
          const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
          const apiResponse = await fetch(apiUrl);
          const delius = await apiResponse.json();
          
          if (!delius.status) throw new Error('Delirius falló');
          
          const downloadUrl = delius.data.download.url;
          await conn.sendMessage(m.chat, { 
            document: { url: downloadUrl }, 
            mimetype: 'audio/mpeg', 
            fileName: `${title}.mp3` 
          }, { quoted: m });
          await m.react(done);
          return;
        } catch (e2) {
          console.error('Error API Delirius doc:', e2.message);
          
          // Intento 3: youtubedl
          try {
            await m.react(rwait);
            let q = '128kbps';
            const yt = await youtubedl(url).catch(async _ => await youtubedlv2(url));
            const dl_url = await yt.audio[q].download();
            const ttl = await yt.title;
            
            await conn.sendMessage(m.chat, { 
              document: { url: dl_url }, 
              mimetype: 'audio/mpeg', 
              fileName: `${ttl}.mp3` 
            }, { quoted: m });
            await m.react(done);
            return;
          } catch (e3) {
            console.error('Error youtubedl doc:', e3.message);
            
            // Intento 4: API Zenkey
            try {
              await m.react(rwait);
              const res = await fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`);
              const audioData = await res.json();
              
              if (audioData.status && audioData.result?.downloadUrl) {
                await conn.sendMessage(m.chat, { 
                  document: { url: audioData.result.downloadUrl }, 
                  mimetype: 'audio/mpeg', 
                  fileName: `${title}.mp3` 
                }, { quoted: m });
                await m.react(done);
                return;
              }
              throw new Error('Zenkey no retornó URL');
            } catch (e4) {
              console.error('Error API Zenkey doc:', e4.message);
              
              // Intento 5: API Exonity
              try {
                await m.react(rwait);
                let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`);
                let dp = await d2.json();
                const audiop = await getBuffer(dp.result.media.mp3);
await conn.sendMessage(m.chat, { 
                  document: { url: audiop }, 
                  mimetype: 'audio/mpeg', 
                  fileName: `${title}.mp3` 
                }, { quoted: m });
                await m.react(done);
                return;
              } catch (e5) {
                console.error('Error API Exonity doc:', e5.message);
                await m.react(error);
                return conn.reply(m.chat, `⚠️ No se pudo enviar el audio como documento después de múltiples intentos.`, m);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error general en play3:', error);
      await m.react(error);
      return conn.reply(m.chat, `❌ Ocurrió un error: ${error.message}`, m);
    }
  }

  // ============ COMANDO PLAY4 / PLAYDOC2 (Video como documento) ============
  if (command === 'play4' || command === 'playdoc2') {
    if (!text) return conn.reply(m.chat, `🥰 *Ingrese el nombre de un video de YouTube*\n\nEjemplo, !${command} Enemy Tommee Profitt`, m, rcanal);
    
    await m.react(rwait);
    
    try {
      const yt_play = await search(args.join(' '));
      if (!yt_play || yt_play.length === 0) {
        return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
      }

      const videoInfo = yt_play[0];
      const { title, thumbnail, timestamp, views, ago, url, author } = videoInfo;
      
      const vistas = formatViews(views);
      const canal = author?.name || 'Desconocido';

      const texto1 = `*_𔓕꯭  ꯭ ꯭𓏲꯭֟፝੭ ꯭⌑𝙰𝚉𝚄𝙼𝙸-𝙱𝙾𝚃⌑꯭ 𓏲꯭֟፝੭ ꯭ ꯭ ꯭𔓕_*

» 📚 *Título:* ${title}
» 📆 *Publicado:* ${ago}
» 🕒 *Duración:* ${timestamp}
» 👀 *Vistas:* ${vistas}
» 👤 *Autor:* ${canal}
» 🎫 *ID:* ${videoInfo.videoId}
» 💠 *Tipo:* ${videoInfo.type}
» 🔗 *Enlace:* ${url}
» 🎞️ *Canal:* ${author.url}
  
> 📽️ *Su video en documento se está enviando, espere un momento...*`.trim();

      await conn.sendMessage(m.chat, {
        image: { url: thumbnail }, 
        caption: texto1, 
        contextInfo: { 
          externalAdReply: { 
            title: '♡  ͜ ۬︵࣪᷼⏜݊᷼𝘿𝙚𝙨𝙘𝙖𝙧𝙜𝙖𝙨⏜࣪᷼︵۬ ͜ ', 
            body: '𝙰𝚉𝚄𝙼𝙸-𝙰𝙱𝚁𝙰𝙷𝙰𝙽', 
            sourceUrl: cn, 
            thumbnail: logo7 
          }
        }
      }, {quoted: estilo});

      // Intento 1: API Stellar
      try {
        await m.react(rwait);
        const apiVideoUrl = `https://api.stellarwa.xyz/dow/ytmp4?url=${encodeURIComponent(url)}&apikey=Diamond`;
        const response = await fetch(apiVideoUrl);
        const json = await response.json();
        const { title: videoTitle, dl } = json.data;
        
        if (!dl) throw new Error('El enlace de video no se generó correctamente.');
        
        await conn.sendMessage(m.chat, { 
          document: { url: dl }, 
          fileName: `${videoTitle}.mp4`, 
          caption: `${wm}`, 
          thumbnail: thumbnail, 
          mimetype: 'video/mp4' 
        }, { quoted: m });
        await m.react(done);
        return;
      } catch (e1) {
        console.error('Error API Stellar doc2:', e1.message);
        
        // Intento 2: API Vreden
        try {
          await m.react(rwait);
          const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`);
          const json = await response.json();
          const resultad = json.result;
          const resultado = resultad.download.url;
          
          if (!resultad || !resultado) throw new Error('El enlace de video no se generó correctamente.');
          
          await conn.sendMessage(m.chat, { 
            document: { url: resultado }, 
            fileName: `${resultad.title}.mp4`, 
            caption: `${wm}`, 
            thumbnail: thumbnail, 
            mimetype: 'video/mp4' 
          }, { quoted: m });
          await m.react(done);
          return;
        } catch (e2) {
          console.error('Error API Vreden doc2:', e2.message);
          
          // Intento 3: API Delirius
          try {
            await m.react(rwait);
            const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();
            
            if (!delius.status) throw new Error('Delirius falló');
            
            const downloadUrl = delius.data.download.url;
            await conn.sendMessage(m.chat, { 
              document: { url: downloadUrl }, 
              fileName: `${title}.mp4`, 
              caption: `${wm}`, 
              thumbnail: thumbnail, 
              mimetype: 'video/mp4' 
            }, { quoted: m });
            await m.react(done);
            return;
          } catch (e3) {
            console.error('Error API Delirius doc2:', e3.message);
            
            // Intento 4: API Exonity
            try {
              await m.react(rwait);
              let d2 = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${url}`);
              let dp = await d2.json();
              const videop = await getBuffer(dp.result.media.mp4);
              
              await conn.sendMessage(m.chat, { 
                document: { url: videop }, 
                fileName: `${title}.mp4`, 
                caption: `${wm}`, 
                thumbnail: thumbnail, 
                mimetype: 'video/mp4' 
              }, { quoted: m });
              await m.react(done);
              return;
            } catch (e4) {
              console.error('Error API Exonity doc2:', e4.message);
              await m.react(error);
              return conn.reply(m.chat, `⚠️ No se pudo enviar el video como documento después de múltiples intentos.`, m);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error general en play4:', error);
      await m.react(error);
      return conn.reply(m.chat, `❌ Ocurrió un error: ${error.message}`, m);
    }
  }
}

handler.help = ['play', 'play2', 'play3', 'play4', 'playdoc'];
handler.tags = ['descargas'];
handler.command = ['play', 'play2', 'play3', 'play4', 'mp3', 'mp4', 'playdoc', 'playdoc2'];
handler.group = false;

export default handler;

// ============ FUNCIONES AUXILIARES ============

async function search(query, options = {}) {
  const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
  return search.videos;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function formatViews(views) {
  if (views === undefined || views === null) {
    return "No disponible";
  }

  if (views >= 1_000_000_000) {
    return `${(views / 1_000_000_000).toFixed(1)}B`;
  } else if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(1)}M`;
  } else if (views >= 1_000) {
    return `${(views / 1_000).toFixed(1)}K`;
  }

  return views.toString();
}

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}

async function getFileSize(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : 0;
  } catch (error) {
    console.error("Error al obtener el tamaño del archivo", error);
    return 0;
  }
}

async function fetchY2mate(url) {
  const baseUrl = 'https://www.y2mate.com/mates/en60';
  const videoInfo = await fetch(`${baseUrl}/analyze/ajax`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ url, q_auto: 0 })
  }).then(res => res.json());

  const id = videoInfo.result.id;
  const downloadInfo = await fetch(`${baseUrl}/convert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ type: 'youtube', _id: id, v_id: url, token: '', ftype: 'mp4', fquality: '360p' })
  }).then(res => res.json());

  return downloadInfo.result.url;
}

async function fetchInvidious(url) {
  const apiUrl = `https://invidious.io/api/v1/get_video_info`;
  const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
  const data = await response.json();

  if (data && data.video) {
    const videoInfo = data.video;
    return videoInfo; 
  } else {
    throw new Error("No se pudo obtener información del video desde Invidious");
  }
}

async function fetch9Convert(url) {
  const apiUrl = `https://9convert.com/en429/api`;
  const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
  const data = await response.json();

  if (data.status === 'ok') {
    return data.result.mp3;
  } else {
    throw new Error("No se pudo obtener la descarga desde 9Convert");
  }
}


