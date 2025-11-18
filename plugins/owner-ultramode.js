// parcheado por ABRAHAN-M
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let a = global.db.data.settings[conn.user.jid]
    if (a.ultramode === undefined) a.ultramode = false

    const action = args[0] ? args[0].toLowerCase() : ''

    if (!['on', 'off'].includes(action)) {
        return m.reply(`*✳️ Comando incorrecto.*\n\n*Uso correcto:*\n*${usedPrefix + command} on*  » Activa el Modo Ultra.\n*${usedPrefix + command} off* » Desactiva el Modo Ultra.`)
    }

    if (action === 'on') {
        if (a.ultramode) {
            return m.reply('*✅ El Modo Ultra ya está activado.*')
        }
        a.ultramode = true
        m.reply('*🚀 Activando el Modo Ultra.*\nEl bot se reiniciará para aplicar los cambios.')
        setTimeout(() => {
            process.exit()
        }, 2000)
    } else if (action === 'off') {
        if (!a.ultramode) {
            return m.reply('*✅ El Modo Ultra ya está desactivado.*')
        }
        a.ultramode = false
        m.reply('*📉 Desactivando el Modo Ultra.*\nEl bot se reiniciará para aplicar los cambios.')
        setTimeout(() => {
            process.exit()
        }, 2000)
    }
}

handler.help = ['ultramode <on|off>']
handler.tags = ['owner']
handler.command = ['ultramode']
handler.owner = true

export default handler
