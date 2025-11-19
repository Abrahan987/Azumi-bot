let handler = async (m, { conn, text, usedPrefix, command }) => {
    let settings = global.db.data.settings[conn.user.jid];
    if (!settings) {
        global.db.data.settings[conn.user.jid] = {};
        settings = global.db.data.settings[conn.user.jid];
    }
    if (!settings.menuVideos) settings.menuVideos = [];

    let args = text.trim().split(' ');
    let action = args.shift().toLowerCase();
    let url = args.join(' ');

    const replyMenu = `*「 GESTOR DE VIDEOS DEL MENÚ 」*\n\nUsa el comando con una de las siguientes opciones:\n\n> *${usedPrefix + command} add <url>*\n> _Añade un video a la lista._\n\n> *${usedPrefix + command} del <url>*\n> _Elimina un video de la lista._\n\n> *${usedPrefix + command} list*\n> _Muestra la lista de videos actual._`;

    switch (action) {
        case 'add':
            if (!url) return conn.reply(m.chat, 'Por favor, proporciona una URL válida.', m, global.estilo);
            if (settings.menuVideos.includes(url)) return conn.reply(m.chat, 'La URL ya existe en la lista.', m, global.estilo);
            settings.menuVideos.push(url);
            conn.reply(m.chat, 'Video añadido con éxito.', m, global.estilo);
            break;
        case 'del':
            if (!url) return conn.reply(m.chat, 'Por favor, proporciona la URL del video que deseas eliminar.', m, global.estilo);
            const index = settings.menuVideos.indexOf(url);
            if (index === -1) return conn.reply(m.chat, 'La URL no se encontró en la lista.', m, global.estilo);
            settings.menuVideos.splice(index, 1);
            conn.reply(m.chat, 'Video eliminado con éxito.', m, global.estilo);
            break;
        case 'list':
            if (settings.menuVideos.length === 0) return conn.reply(m.chat, 'No hay videos en la lista.', m, global.estilo);
            let list = '*「 VIDEOS DEL MENÚ 」*\n\n';
            settings.menuVideos.forEach((video, i) => {
                list += `> *${i + 1}.* ${video}\n`;
            });
            conn.reply(m.chat, list, m, global.estilo);
            break;
        default:
            conn.reply(m.chat, replyMenu, m, global.estilo);
    }
}

handler.help = ['setmenuvideo <add|del|list> <url>'];
handler.tags = ['owner'];
handler.command = /^(setmenuvideo)$/i;
handler.owner = true;

export default handler;
