// parcheado por ABRAHAN-M
//Código creando por LAN sígueme en ig https://www.instagram.com/lansg___/

const handler = async (m, { conn, command, text }) => {
    let targetUser = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    const who = conn.decodeJid(targetUser);
    const sender = conn.decodeJid(m.sender);
    
    // Chupa o Chupesorra
    if (command == 'chupa' || command == 'chupala' || command == 'chupalo') {
    const captionchupa = `*[ 🤣 ] CHUPALO @${who.split('@')[0]}*`;
    conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/dc717696efd6182a47f07.jpg' }, caption: captionchupa, mentions: [who]}, {quoted: m});
    }
    // Aplauso
    if (command == 'aplauso') {
    const captionap = `*[ 🎉 ] FELICIDADES, @${who.split('@')[0]}, ERES UN PENDEJO.*`;
    conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/0e40f5c0cf98dffc55045.jpg' }, caption: captionap, mentions: [who]}, {quoted: m});
    }
    // Marron
    if (command == 'marron' || command == 'negro' || command == 'café') {
    const captionma = `*[ 💀 ] @${who.split('@')[0]} ES UN(A) MARRÓN DE MRD*`;
    conn.sendMessage(m.chat, {image: { url: 'https://telegra.ph/file/5592d6bd38d411554018c.png' }, caption: captionma, mentions: [who]}, {quoted: m});
    }
    // Suicide
    if (command == 'suicide' || command == 'suicidar') {
    const caption = `*[ ⚰️ ] @${sender.split('@')[0]} SE HA SUICIDADO...*`;
    conn.sendMessage(m.chat, {image: { url: 'https://files.catbox.moe/w3v3e0.jpg' }, caption: caption, mentions: [sender]}, {quoted: m});
    delete global.db.data.users[sender];
    }
};

handler.command = /^(chupa|chupala|chupalo|aplauso|marron|negro|café|suicide|suicidar)$/i;
export default handler;
