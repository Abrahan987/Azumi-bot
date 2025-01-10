import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
    try {
        let user = global.db.data.users[m.sender]
        let name2 = conn.getName(m.sender)
        
        // Verificar si ya está registrado
        if (user.registered === true) {
            return m.reply(`*『✦』Ya estas registrado, para volver a registrarte, usa el comando: #unreg*`)
        }
        
        // Verificar formato correcto
        if (!Reg.test(text)) {
            return m.reply(`*『✦』El comando ingresado es incorrecto, uselo de la siguiente manera:*\n\n#reg *Nombre.edad*\n\n\`\`\`Ejemplo:\`\`\`\n#reg *${name2}.10000*`)
        }

        let [_, name, splitter, age] = text.match(Reg)
        
        // Validaciones
        if (!name) {
            return m.reply('*『✦』No puedes registrarte sin nombre, el nombre es obligatorio. Inténtelo de nuevo.*')
        }
        if (!age) {
            return m.reply('*『✦』No puedes registrarte sin la edad, la edad es opcional. Inténtelo de nuevo.*')
        }
        if (name.length >= 30) {
            return m.reply('*『✦』El nombre no debe de tener mas de 30 caracteres.*')
        }
        
        age = parseInt(age)
        if (age > 10000) {
            return m.reply('*『😏』Viejo/a Sabroso/a*')
        }
        if (age < 5) {
            return m.reply('*『🍼』Ven aquí, te adoptare!!*')
        }

        // Obtener datos del país
        let delirius = await axios.get(`https://delirius-apiofc.vercel.app/tools/country?text=${PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international')}`)
        let paisdata = delirius.data.result
        let mundo = paisdata ? `${paisdata.name} ${paisdata.emoji}` : 'Desconocido'
        
        // Obtener foto de perfil
        let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://qu.ax/QGAVS.jpg')
        
        // Obtener biografía
        let bio = 0, fechaBio
        let sinDefinir = '😿 Es privada'
        let biografia = await conn.fetchStatus(m.sender).catch(() => null)
        if (!biografia || !biografia[0] || biografia[0].status === null) {
            bio = sinDefinir
            fechaBio = "Fecha no disponible"
        } else {
            bio = biografia[0].status || sinDefinir
            fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", }) : "Fecha no disponible"
        }

        // Registrar usuario
        user.name = name.trim()
        user.age = age
        user.descripcion = bio
        user.regTime = + new Date
        user.registered = true
        
        // Dar recompensas
        global.db.data.users[m.sender].money += 600
        global.db.data.users[m.sender].yenes += 10
        global.db.data.users[m.sender].exp += 245
        global.db.data.users[m.sender].joincount += 5

        let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)        
        m.react('✨') 

        let regbot = `
╭━━━━━━━━━⬣
┃ ✧ *REGISTRO EXITOSO* ✧
┃━━━━━━━━━━━━
┃ ✅ *Información*
┃ ⚡ *Nombre:* ${name}
┃ ⚡ *Edad:* ${age} años
┃ ⚡ *País:* ${mundo}
┃━━━━━━━━━━━━
┃ 🎁 *Recompensas*
┃ ▢ +600 Dinero 💵
┃ ▢ +10 Yenes 💴
┃ ▢ +245 EXP ⚡
┃ ▢ +5 Tokens 🪙
┃━━━━━━━━━━━━
┃ 📝 *Identificación*
┃ ${sn}
┃━━━━━━━━━━━━
┃ ❗ *Recuerda leer las*
┃ *reglas del grupo*
╰━━━━━━━━━⬣

*🎉 ¡Bienvenido/a oficialmente!*
*${name}*`

        await conn.sendMessage(m.chat, {
            text: regbot,
            contextInfo: {
                externalAdReply: {
                    title: '🌟 Registro Completado',
                    body: `¡Bienvenido/a ${name}!`,
                    thumbnailUrl: perfil,
                    sourceUrl: channel2,
                    mediaType: 1,
                    showAdAttribution: false,
                    renderLargerThumbnail: true
                }
            }
        }, { quoted: m })

    } catch (error) {
        m.reply('*『❗』Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.*')
        console.log(error)
    }
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler
