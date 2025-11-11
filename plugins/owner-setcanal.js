// Comandos para configurar el JID y nombre del canal
// Guardar como: plugins/owner-setcanalconfig.js

let handler = async (m, { conn, text, usedPrefix, command, isOwner }) => {
    if (!isOwner) return m.reply('⚠️ Este comando solo puede ser usado por el owner del bot.');

    const cmd = command.toLowerCase();

    // ═══════════════════════════════════════════════════
    // COMANDO: setjid
    // ═══════════════════════════════════════════════════
    if (cmd === 'setjid') {
        if (!text) {
            return m.reply(`
❌ *Uso incorrecto*

📝 *Cómo usar:*
${usedPrefix}setjid <newsletterJid>

📌 *Ejemplo:*
${usedPrefix}setjid 120363405708643160@newsletter

💡 *Cómo obtener el JID:*
1. Reenvía un mensaje de tu canal al bot
2. El bot te mostrará el JID automáticamente

🔍 *JID actual:*
${global.rcanal?.contextInfo?.forwardedNewsletterMessageInfo?.newsletterJid || 'No configurado'}
            `.trim());
        }

        // Validar formato
        if (!text.includes('@newsletter')) {
            return m.reply('❌ El JID debe terminar en `@newsletter`\n\nEjemplo: 120363405708643160@newsletter');
        }

        try {
            // Actualizar en global.rcanal
            if (!global.rcanal) {
                global.rcanal = {
                    contextInfo: {
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: text,
                            serverMessageId: 100,
                            newsletterName: 'ɢᴏᴊᴏ̃ ᴄᴀɴᴀʟఌ︎'
                        }
                    }
                };
            } else {
                global.rcanal.contextInfo.forwardedNewsletterMessageInfo.newsletterJid = text;
            }

            // Actualizar variables globales de compatibilidad
            global.channelid = text;
            global.channelJid = text;

            // Guardar en base de datos
            global.db.data.settings = global.db.data.settings || {};
            global.db.data.settings.canalJid = text;

            // Actualizar todas las variables de canal
            global.rcanalr.contextInfo.forwardedNewsletterMessageInfo.newsletterJid = text;
            global.rcanalw.contextInfo.forwardedNewsletterMessageInfo.newsletterJid = text;
            global.rcanalden2.contextInfo.forwardedNewsletterMessageInfo.newsletterJid = text;
            global.rcanalx.contextInfo.forwardedNewsletterMessageInfo.newsletterJid = text;
            global.rcanalden.contextInfo.forwardedNewsletterMessageInfo.newsletterJid = text;
            global.rcanaldev.contextInfo.forwardedNewsletterMessageInfo.newsletterJid = text;

            const id = text.split('@')[0];
            const link = `https://whatsapp.com/channel/${id}`;

            await m.reply(`
✅ *JID del canal actualizado exitosamente*

📱 *Nuevo JID:*
\`\`\`${text}\`\`\`

🔗 *Link del canal:*
${link}

💡 *Nota:* El cambio se aplicará en todos los comandos que usen el canal.
            `.trim());

        } catch (error) {
            console.error('Error al establecer JID:', error);
            await m.reply('❌ Ocurrió un error al establecer el JID del canal.');
        }
    }

    // ═══════════════════════════════════════════════════
    // COMANDO: setnamecanal
    // ═══════════════════════════════════════════════════
    if (cmd === 'setnamecanal' || cmd === 'setnombrecanal') {
        if (!text) {
            return m.reply(`
❌ *Uso incorrecto*

📝 *Cómo usar:*
${usedPrefix}setnamecanal <nombre del canal>

📌 *Ejemplo:*
${usedPrefix}setnamecanal ɢᴏᴊᴏ̃ ᴄᴀɴᴀʟఌ︎

🎨 *Generador de textos estilizados:*
https://lingojam.com/FancyTextGenerator

🔍 *Nombre actual:*
${global.rcanal?.contextInfo?.forwardedNewsletterMessageInfo?.newsletterName || 'No configurado'}
            `.trim());
        }

        if (text.length > 100) {
            return m.reply('❌ El nombre del canal es demasiado largo. Máximo 100 caracteres.');
        }

        try {
            // Actualizar en global.rcanal
            if (!global.rcanal) {
                global.rcanal = {
                    contextInfo: {
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363405708643160@newsletter',
                            serverMessageId: 100,
                            newsletterName: text
                        }
                    }
                };
            } else {
                global.rcanal.contextInfo.forwardedNewsletterMessageInfo.newsletterName = text;
            }

            // Actualizar variables globales de compatibilidad
            global.channelname = text;

            // Guardar en base de datos
            global.db.data.settings = global.db.data.settings || {};
            global.db.data.settings.canalName = text;

            // Actualizar todas las variables de canal
            global.rcanalr.contextInfo.forwardedNewsletterMessageInfo.newsletterName = text;
            global.rcanalw.contextInfo.forwardedNewsletterMessageInfo.newsletterName = text;
            global.rcanalden2.contextInfo.forwardedNewsletterMessageInfo.newsletterName = text;
            global.rcanalx.contextInfo.forwardedNewsletterMessageInfo.newsletterName = text;
            global.rcanalden.contextInfo.forwardedNewsletterMessageInfo.newsletterName = text;
            global.rcanaldev.contextInfo.forwardedNewsletterMessageInfo.newsletterName = text;

            await m.reply(`
✅ *Nombre del canal actualizado exitosamente*

📝 *Nuevo nombre:*
${text}

💡 *Vista previa:*
Se verá como "Reenviado desde ${text}"

🎨 *Tip:* Usa textos especiales para que se vea más bonito.
            `.trim());

        } catch (error) {
            console.error('Error al establecer nombre:', error);
            await m.reply('❌ Ocurrió un error al establecer el nombre del canal.');
        }
    }

    // ═══════════════════════════════════════════════════
    // COMANDO: vercanal / infcanal
    // ═══════════════════════════════════════════════════
    if (cmd === 'vercanal' || cmd === 'infocanal') {
        try {
            const jid = global.rcanal?.contextInfo?.forwardedNewsletterMessageInfo?.newsletterJid || 'No configurado';
            const name = global.rcanal?.contextInfo?.forwardedNewsletterMessageInfo?.newsletterName || 'No configurado';
            const id = jid !== 'No configurado' ? jid.split('@')[0] : 'N/A';
            const link = jid !== 'No configurado' ? `https://whatsapp.com/channel/${id}` : 'N/A';

            await m.reply(`
📱 *INFORMACIÓN DEL CANAL*

📌 *Newsletter JID:*
\`\`\`${jid}\`\`\`

📝 *Nombre del Canal:*
${name}

🆔 *ID del Canal:*
${id}

🔗 *Link del Canal:*
${link}

────────────────
⚙️ *Para modificar:*
• ${usedPrefix}setjid <jid>
• ${usedPrefix}setnamecanal <nombre>
            `.trim());

        } catch (error) {
            console.error('Error al obtener info:', error);
            await m.reply('❌ Error al obtener información del canal.');
        }
    }

    // ═══════════════════════════════════════════════════
    // COMANDO: detectarcanal (detecta JID de mensaje reenviado)
    // ═══════════════════════════════════════════════════
    if (cmd === 'detectarcanal' || cmd === 'getjid') {
        try {
            // Verificar si hay un mensaje citado
            if (!m.quoted) {
                return m.reply(`
📱 *DETECTOR DE JID DE CANAL*

❌ Debes responder a un mensaje reenviado del canal

📝 *Cómo usar:*
1. Reenvía un mensaje de tu canal al bot
2. Responde al mensaje reenviado con:
   ${usedPrefix}detectarcanal

💡 El bot extraerá automáticamente el JID del canal
                `.trim());
            }

            // Intentar extraer el JID del mensaje citado
            const quotedMsg = m.quoted;
            const contextInfo = quotedMsg.contextInfo;

            if (!contextInfo?.forwardedNewsletterMessageInfo) {
                return m.reply('❌ El mensaje citado no es un mensaje reenviado de un canal.');
            }

            const jid = contextInfo.forwardedNewsletterMessageInfo.newsletterJid;
            const name = contextInfo.forwardedNewsletterMessageInfo.newsletterName || 'Sin nombre';
            const id = jid.split('@')[0];
            const link = `https://whatsapp.com/channel/${id}`;

            await m.reply(`
✅ *JID DETECTADO EXITOSAMENTE*

📌 *Newsletter JID:*
\`\`\`${jid}\`\`\`

📝 *Nombre:*
${name}

🔗 *Link:*
${link}

────────────────
💾 *¿Quieres usar este canal?*
Usa: ${usedPrefix}setjid ${jid}
            `.trim());

        } catch (error) {
            console.error('Error al detectar canal:', error);
            await m.reply('❌ Error al detectar información del canal. Asegúrate de responder a un mensaje de canal.');
        }
    }
};

handler.help = ['setjid', 'setnamecanal', 'vercanal', 'detectarcanal'];
handler.tags = ['owner'];
handler.command = /^(setjid|setnamecanal|setnombrecanal|vercanal|infocanal|detectarcanal|getjid)$/i;
handler.owner = true;

export default handler;
