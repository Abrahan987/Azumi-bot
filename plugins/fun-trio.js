// parcheado por ABRAHAN-M
let handler = async(m, { conn, text, usedPrefix, command }) => {

    if (m.mentionedJid && m.mentionedJid.length === 2) {
        const person1 = conn.decodeJid(m.mentionedJid[0]);
        const person2 = conn.decodeJid(m.mentionedJid[1]);
        const sender = conn.decodeJid(m.sender);

        let name1 = conn.getName(person1);
        let name2 = conn.getName(person2);
        let name3 = conn.getName(sender);
        const pp = './src/Trio.jpg';

        let trio = `\t\t*TRIO VIOLENTOOOOO!*
        
${name1} y ${name2} tienen un *${Math.floor(Math.random() * 100)}%* de compatibilidad como pareja.
Mientras que ${name1} y ${name3} tienen un *${Math.floor(Math.random() * 100)}%* de compatibilidad.
Y ${name2} y ${name3} tienen un *${Math.floor(Math.random() * 100)}%* de compatibilidad.
¿Qué opinas de un trío? 😏`;

        conn.sendMessage(m.chat, { image: { url: pp }, caption: trio, mentions: [person1, person2, sender] }, { quoted: m });
    } else {
        conn.reply(m.chat, 'Menciona a 2 usuarios mas, para calcular la compatibilidad.', m);
    }
}

handler.help = ['formartrio @usuario1 @usuario2'];
handler.tags = ['fun'];
handler.command = /^(formartrio)$/i;
export default handler;
