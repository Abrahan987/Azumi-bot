// parcheado por ABRAHAN-M
let handler = async (m, { conn, args }) => {
    let text = args.slice(1).join(' ')
    let targetUser = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    const who = conn.decodeJid(targetUser);
    conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/misc/its-so-stupid', {
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/08f43c70269b38fd8ac12.jpg'),
    dog: text || 'Soy+Estupido'
    }), 'error.png', `*@${who.split('@')[0]}*`, m)
    }  
    handler.help = ['itssostupid', 'estupido', 'stupid']
    handler.tags = ['fun']
    handler.command = /^(itssostupid|iss|stupid)$/i
    export default handler
