let handler = async (m, { conn, text, command, isOwner }) => {
    if (!isOwner) {
        return;
    }

    let settings = global.db.data.settings[conn.user.jid];
    if (settings === undefined) {
        global.db.data.settings[conn.user.jid] = {};
        settings = global.db.data.settings[conn.user.jid];
    }

    let newStatus = !settings.ultramode;
    settings.ultramode = newStatus;
    settings.ultramode_notified = false;

    let message = `*「 MODO ULTRA 」*\n\nEl Modo Ultra ha sido *${newStatus ? 'activado' : 'desactivado'}*.`;
    message += `\n\n_El bot se reiniciará para aplicar los cambios..._`;

    await m.reply(message);

    setTimeout(() => {
        conn.ws.close();
    }, 1000);
};

handler.help = ['ultramode'];
handler.tags = ['owner'];
handler.command = /^(ultramode)$/i;
handler.owner = true;

export default handler;
