const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, Browsers } = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import fetch from "node-fetch"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util' 
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
import { fileURLToPath } from 'url'

let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""
let rtx = `
╔═══════《💠》═══════╗
   🌟 *ＳＥＲ ＢＯＴ - ＳＵＢ ＢＯＴ* 🌟
╚═══════《💠》═══════╝

✨ *Escanea este código QR para ser SubBot* ✨

╭───────────────╮
│ 🔹 *Pasos:*               │
├─────────────────────────┤
│ ① Abre WhatsApp principal           │
│ ② Toca los *3 puntos ⋮* arriba     │
│ ③ Entra en *Dispositivos vinculados* │
│ ④ Pulsa *Vincular un dispositivo*   │
│ ⑤ Escanea el código QR mostrado     │
╰─────────────────────────╯

⏳ *Nota:* Este QR expira en *30 segundos*.
╭═══《💎》═══╮
   🧠 *By ABRAHAN-M*
╰═══《💎》═══╯
`

let rtx2 = `
╔═══════《💫》═══════╗
   💕 *ＳＥＲ ＢＯＴ - ＳＵＢ ＢＯＴ* 💕
╚═══════《💫》═══════╝

🔐 *Utiliza este código de acceso para convertirte en SubBot*

╭───────────────╮
│ 🔹 *Instrucciones:*     │
├─────────────────────────┤
│ ① Abre WhatsApp principal             │
│ ② Toca los *3 puntos ⋮* arriba        │
│ ③ Ingresa en *Dispositivos vinculados* │
│ ④ Selecciona *Vincular con número*    │
│ ⑤ Escribe el *código de 8 dígitos*     │
╰─────────────────────────╯

⚠️ *Importante:* Solo funciona con el número que lo solicitó.
╭═══《🌐》═══╮
   🧠 *By ABRAHAN-M*
╰═══《🌐》═══╯`

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const meguminJBOptions = {}
const retryMap = new Map()
let commandFlags = {}

if (globalThis.conns instanceof Array) console.log()
else globalThis.conns = []

let handler = async (m, { conn, args, usedPrefix, command, isModeration, text }) => {
try {
console.log(chalk.yellow(`[DEBUG] Comando recibido: ${command}`))
console.log(chalk.yellow(`[DEBUG] Args:`, args))

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let id = `${who.split(`@`)[0]}`
let pathMeguminJadiBot = path.join(`./${jadi}/`, id)

if (!fs.existsSync(pathMeguminJadiBot)){
fs.mkdirSync(pathMeguminJadiBot, { recursive: true })
}

meguminJBOptions.pathMeguminJadiBot = pathMeguminJadiBot
meguminJBOptions.m = m
meguminJBOptions.conn = conn
meguminJBOptions.args = args
meguminJBOptions.usedPrefix = usedPrefix
meguminJBOptions.command = command
meguminJBOptions.fromCommand = true

await meguminJadiBot(meguminJBOptions, text)
} catch (e) {
console.error(chalk.red('[ERROR en handler]'), e)
await conn.reply(m.chat, `❌ Error: ${e.message}`, m)
}
} 

handler.help = ['code', 'qr']
handler.tags = ['socket']
handler.command = ['code', 'qr', 'serbot', 'jadibot']
export default handler 

export async function meguminJadiBot(options, text) {
try {
console.log(chalk.cyan('[DEBUG] meguminJadiBot iniciado'))

let { pathMeguminJadiBot, m, conn, args, usedPrefix, command } = options

// Validación crítica
if (!pathMeguminJadiBot || !conn) {
console.error(chalk.red('[ERROR] Faltan parámetros críticos'))
if (m) await conn.reply(m.chat, '❌ Error interno: configuración inválida', m)
return
}

if (command === 'code') {
command = 'qr'; 
args.unshift('code')
}

const mcode = args[0] && /(--code|code)/.test(args[0].trim()) ? true : args[1] && /(--code|code)/.test(args[1].trim()) ? true : false

console.log(chalk.cyan(`[DEBUG] Modo código: ${mcode}`))

let txtCode, codeBot, txtQR

if (mcode) {
args[0] = args[0].replace(/^--code$|^code$/, "").trim()
if (args[1]) args[1] = args[1].replace(/^--code$|^code$/, "").trim()
if (args[0] == "") args[0] = undefined
}

const pathCreds = path.join(pathMeguminJadiBot, "creds.json")

if (!fs.existsSync(pathMeguminJadiBot)){
fs.mkdirSync(pathMeguminJadiBot, { recursive: true })
}

try {
if (args[0] && args[0] != undefined) {
fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'))
}
} catch (e) {
console.error(chalk.red('[ERROR al escribir creds]'), e)
if (m && conn) {
await conn.reply(m.chat, `❌ Use correctamente el comando » ${usedPrefix}${command} code`, m)
}
return
}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)

console.log(chalk.green('[INFO] Iniciando conexión de Baileys...'))

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathMeguminJadiBot)

const connectionOptions = {
logger: pino({ level: "fatal" }),
printQRInTerminal: false,
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache, 
browser: ['Windows', 'Chrome', '10.0'],
version: version,
generateHighQualityLinkPreview: true
}

let sock = makeWASocket(connectionOptions)
sock.isInit = false
let isInit = true
if (m) commandFlags[m.sender] = true

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
console.log(chalk.magenta('[CONNECTION UPDATE]'), update)

if (isNewLogin) sock.isInit = false

if (qr && !mcode) {
console.log(chalk.green('[QR GENERADO]'))
if (m?.chat) {
try {
txtQR = await conn.sendMessage(m.chat, { 
image: await qrcode.toBuffer(qr, { scale: 8 }), 
caption: rtx.trim()
}, { quoted: m})
console.log(chalk.green('[QR ENVIADO]'))
} catch (e) {
console.error(chalk.red('[ERROR al enviar QR]'), e)
}
} else {
console.warn(chalk.yellow('[WARN] No hay chat para enviar QR'))
return 
}
if (txtQR && txtQR.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 30000)
}
return
} 

if (qr && mcode) {
console.log(chalk.green('[CÓDIGO DE EMPAREJAMIENTO]'))
try {
let fixTe = m.sender.split('@')[0]
let secret = await sock.requestPairingCode(fixTe)
secret = secret?.match(/.{1,4}/g)?.join("-") || secret
console.log(chalk.greenBright(`[CÓDIGO GENERADO] ${secret}`))

txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
codeBot = await m.reply(secret)
} catch (e) {
console.error(chalk.red('[ERROR al generar código]'), e)
}
}

if (txtCode && txtCode.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key })}, 30000)
}
if (codeBot && codeBot.key) {
setTimeout(() => { conn.sendMessage(m.sender, { delete: codeBot.key })}, 30000)
}

const endSesion = async (loaded) => {
if (!loaded) {
try {
sock.ws.close()
} catch {
}
sock.ev.removeAllListeners()
let i = globalThis.conns.indexOf(sock)                
if (i < 0) return 
delete globalThis.conns[i]
globalThis.conns.splice(i, 1)
}}

const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode

if (connection === 'close') {
console.log(chalk.red(`[DESCONECTADO] Razón: ${reason}`))

if (reason === 428 || reason === DisconnectReason.connectionClosed || reason === DisconnectReason.connectionLost) {
console.log(chalk.yellow(`*💨 𝑳𝒂 𝒄𝒐𝒏𝒆𝒙𝒊𝒐𝒏 𝒔𝒆 𝒄𝒆𝒓𝒓𝒐, 𝒔𝒆 𝒊𝒏𝒕𝒆𝒏𝒕𝒂𝒓𝒂 𝒓𝒆𝒄𝒐𝒏𝒆𝒄𝒕𝒂𝒓 𝒂𝒖𝒕𝒐𝒎𝒂𝒕𝒊𝒄𝒂𝒎𝒆𝒏𝒕𝒆...*`))
await sleep(1000)
await creloadHandler(true).catch(console.error)
}
if (reason === 408) {
console.log(chalk.yellow(`*💨 𝑳𝒂 𝒄𝒐𝒏𝒆𝒙𝒊𝒐𝒏 𝒔𝒆 𝒂𝒈𝒐𝒕𝒐, 𝒔𝒆 𝒊𝒏𝒕𝒆𝒏𝒕𝒂𝒓𝒂 𝒓𝒆𝒄𝒐𝒏𝒆𝒄𝒕𝒂𝒓 𝒂𝒖𝒕𝒐𝒎𝒂𝒕𝒊𝒄𝒂𝒎𝒆𝒏𝒕𝒆...*`))
await creloadHandler(true).catch(console.error)
}
if (reason === 440) {
console.log(chalk.red(`*💨 𝑳𝒂 𝒔𝒆𝒔𝒊𝒐𝒏 𝒂𝒄𝒕𝒖𝒂𝒍 𝒔𝒆 𝒄𝒆𝒓𝒓𝒐, 𝑺𝒊 𝒅𝒆𝒔𝒆𝒂 𝒗𝒐𝒍𝒗𝒆𝒓 𝒂 𝒄𝒐𝒏𝒆𝒄𝒕𝒂𝒓𝒔𝒆 𝒕𝒆𝒏𝒅𝒓𝒂 𝒒𝒖𝒆 𝒊𝒏𝒊𝒄𝒊𝒂𝒓 𝒔𝒆𝒔𝒊𝒐𝒏 𝒅𝒆 𝒏𝒖𝒆𝒗𝒐*`))
} 
if (reason == 405 || reason == 401) {
console.log(chalk.red(`*💨 𝑳𝒂 𝒔𝒆𝒔𝒊𝒐𝒏 𝒂𝒄𝒕𝒖𝒂𝒍 𝒆𝒔 𝒊𝒏𝒗𝒂𝒍𝒊𝒅𝒂, 𝑻𝒆𝒏𝒅𝒓𝒂𝒔 𝒒𝒖𝒆 𝒊𝒏𝒊𝒄𝒊𝒂𝒓 𝒔𝒆𝒔𝒊𝒐𝒏 𝒅𝒆 𝒏𝒖𝒆𝒗𝒐.*`))
fs.rmdirSync(pathMeguminJadiBot, { recursive: true })
}
if (reason === 500) {
console.log(chalk.red(`Error 500 en +${path.basename(pathMeguminJadiBot)}`))
fs.rmdirSync(pathMeguminJadiBot, { recursive: true })
return creloadHandler(true).catch(console.error)
}
if (reason === 515) {
console.log(chalk.yellow(`*❤️ 𝑳𝒂 𝒄𝒐𝒏𝒆𝒙𝒊𝒐𝒏 𝒔𝒆 𝒑𝒆𝒓𝒅𝒊𝒐, 𝒔𝒆 𝒊𝒏𝒕𝒆𝒏𝒕𝒂𝒓𝒂 𝒓𝒆𝒄𝒐𝒏𝒆𝒄𝒕𝒂𝒓 𝒂𝒖𝒕𝒐𝒎𝒂𝒕𝒊𝒄𝒂𝒎𝒆𝒏𝒕𝒆...*`))
await creloadHandler(true).catch(console.error)
}
if (reason === 403) {
console.log(chalk.red(`Sesión cerrada +${path.basename(pathMeguminJadiBot)}`))
fs.rmdirSync(pathMeguminJadiBot, { recursive: true })
}
}

if (globalThis.db.data == null) loadDatabase()

if (connection == `open`) {
console.log(chalk.green(`[CONECTADO] +${path.basename(pathMeguminJadiBot)}`))

if (!globalThis.db.data?.users) loadDatabase()
await joinChannels(sock)

const isCode = /^(qr|code|serbot|jadibot)$/.test(command)
if (m && conn && isCode && commandFlags[m.sender]) {
await conn.sendMessage(m.chat, {text: `*❤️ 𝑪𝒐𝒏𝒆𝒄𝒕𝒂𝒅𝒐 𝒄𝒐𝒏 𝒆𝒙𝒊𝒕𝒐!!*` }, { quoted: m })
delete commandFlags[m.sender]
}

let userName, userJid
userName = sock.authState.creds.me.name || 'Anónimo'
userJid = sock.authState.creds.me.jid || `${path.basename(pathMeguminJadiBot)}`
console.log(chalk.cyanBright(`+${userJid.split('@')[0]} Conectado.`))

sock.isInit = true
globalThis.conns.push(sock)
}
}

setInterval(async () => {
if (!sock.user) {
try { sock.ws.close() } catch (e) {}
sock.ev.removeAllListeners()
let i = globalThis.conns.indexOf(sock)                
if (i < 0) return
delete globalThis.conns[i]
globalThis.conns.splice(i, 1)
}
}, 60000)

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error('Error en handler: ', e)
}

if (restatConn) {
const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
sock = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}

if (!isInit) {
sock.ev.off("messages.upsert", sock.handler)
sock.ev.off("connection.update", sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}

sock.handler = handler.handler.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)

sock.ev.on("messages.upsert", sock.handler)
sock.ev.on("connection.update", sock.connectionUpdate)
sock.ev.on("creds.update", sock.credsUpdate)

isInit = false
return true
}

creloadHandler(false)
})

} catch (e) {
console.error(chalk.red('[ERROR CRÍTICO en meguminJadiBot]'), e)
if (options.m && options.conn) {
await options.conn.reply(options.m.chat, `❌ Error crítico: ${e.message}`, options.m)
}
}
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms))
}

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
hours = (hours < 10) ? '0' + hours : hours;
minutes = (minutes > 0) ? minutes : '';
seconds = (seconds < 10 && minutes > 0) ? '0' + seconds : seconds;
if (minutes) {
return `${minutes} minuto${minutes > 1 ? 's' : ''}, ${seconds} segundo${seconds > 1 ? 's' : ''}`;
} else {
return `${seconds} segundo${seconds > 1 ? 's' : ''}`;
}
}

const activeConnections = new Set()
const failedBots = new Map()

async function checkSubBots() {
const subBotDir = path.resolve(`./${jadi}`)
if (!fs.existsSync(subBotDir)) return

const subBotFolders = fs.readdirSync(subBotDir).filter(folder => 
fs.statSync(path.join(subBotDir, folder)).isDirectory()
)

for (const folder of subBotFolders) {
const pathMeguminJadiBot = path.join(subBotDir, folder)
const credsPath = path.join(pathMeguminJadiBot, "creds.json")
if (!fs.existsSync(credsPath)) continue

const isAlreadyConnected = globalThis.conns.find(conn =>
conn.user?.jid?.includes(folder) || path.basename(pathMeguminJadiBot) === folder
)

if (isAlreadyConnected || activeConnections.has(folder)) continue

const now = Date.now()
const pauseInfo = failedBots.get(folder)
if (pauseInfo && now < pauseInfo.resumeAt) {
const mins = Math.ceil((pauseInfo.resumeAt - now) / 60000)
continue
}

console.log(chalk.yellow(`Sub-bot (+${folder}) no conectado. Intentando activarlo...`))
activeConnections.add(folder)

try {
await meguminJadiBot({
pathMeguminJadiBot,
m: null,
conn: globalThis.conn,
args: [],
usedPrefix: '#',
command: 'jadibot',
fromCommand: false
})
failedBots.delete(folder)
} catch (e) {
console.error(chalk.red(`Error al activar sub-bot (+${folder}):`), e)
const retries = (failedBots.get(folder)?.retries || 0) + 1
if (retries >= 5) {
console.log(chalk.redBright(`Sub-bot (+${folder}) falló 5 veces. Se pausará 1 hora.`))
failedBots.set(folder, { retries, resumeAt: Date.now() + 3600000 })
} else {
failedBots.set(folder, { retries, resumeAt: Date.now() + 10000 })
}
} finally {
setTimeout(() => activeConnections.delete(folder), 30000)
}
}
}

setInterval(checkSubBots, 60000)

async function joinChannels(conn) {
for (const channelId of Object.values(global.channel)) {
await conn.newsletterFollow(channelId).catch(() => {})
}
  }
