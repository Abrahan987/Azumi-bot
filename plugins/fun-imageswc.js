// parcheado por ABRAHAN-M
//Código creando por LAN sígueme en ig https://www.instagram.com/lansg___/

const handler = async (m, { conn, command, text }) => {
    let targetUser = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    const who = conn.decodeJid(targetUser);
    const sender = conn.decodeJid(m.sender);
    
    // Chupa o Chupesorra
    if (command == 'chupa' || command == 'chupala' || command == 'chupalo') {
    const captionchupa = `*[ 🤣 ] CHUPALO @${who.split('@')[0]}*`;
    conn.sendMessage(m.chat, {image: { url: [global.foto1, global.foto2, global.foto3, global.foto4, global.foto5, global.foto6].getRandom() }, caption: captionchupa, mentions: [who]}, {quoted: m});
    }
    // Aplauso
    if (command == 'aplauso') {
    const captionap = `*[ 🎉 ] FELICIDADES, @${who.split('@')[0]}, ERES UN PENDEJO.*`;
    conn.sendMessage(m.chat, {image: { url: [global.foto1, global.foto2, global.foto3, global.foto4, global.foto5, global.foto6].getRandom() }, caption: captionap, mentions: [who]}, {quoted: m});
    }
    // Marron
    if (command == 'marron' || command == 'negro' || command == 'café') {
    const captionma = `*[ 💀 ] @${who.split('@')[0]} ES UN(A) MARRÓN DE MRD*`;
    conn.sendMessage(m.chat, {image: { url: [global.foto1, global.foto2, global.foto3, global.foto4, global.foto5, global.foto6].getRandom() }, caption: captionma, mentions: [who]}, {quoted: m});
    }
    // Suicide
    if (command == 'suicide' || command == 'suicidar') {
    const caption = `*[ ⚰️ ] @${sender.split('@')[0]} SE HA SUICIDADO...*`;
    conn.sendMessage(m.chat, {image: { url: [global.foto1, global.foto2, global.foto3, global.foto4, global.foto5, global.foto6].getRandom() }, caption: caption, mentions: [sender]}, {quoted: m});
    delete global.db.data.users[sender];
    }
};

handler.command = /^(chupa|chupala|chupalo|aplauso|marron|negro|café|suicide|suicidar)$/i;
export default handler;
