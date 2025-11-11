// Comando para establecer el banner del menú
// Guardar como: plugins/owner-setbanner.js

let handler = async (m, { conn, text, isOwner }) => {
    if (!isOwner) return m.reply('⚠️ Este comando solo puede ser usado por el creador del bot.');
    
    if (!text) {
        return m.reply(`❌ *Uso incorrecto*

📝 *Ejemplos de uso:*
• ${usedPrefix}setbanner <url de imagen>
• ${usedPrefix}seticono <url de imagen>

💡 *Para ver el banner actual:*
• ${usedPrefix}verbanner

🔗 *Ejemplo:*
${usedPrefix}setbanner https://i.imgur.com/ejemplo.jpg`);
    }

    // Validar que sea una URL
    if (!text.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)/i)) {
        return m.reply('❌ Por favor proporciona una URL válida de imagen (jpg, png, gif, webp)');
    }

    try {
        // Guardar el banner en la base de datos global
        global.db.data.settings = global.db.data.settings || {};
        global.db.data.settings.menuBanner = text;

        await m.reply(`✅ *Banner actualizado exitosamente*

🖼️ *Nueva imagen:*
${text}

💡 El cambio se verá reflejado la próxima vez que alguien use el comando .menu`);

    } catch (error) {
        console.error('Error al establecer banner:', error);
        await m.reply('❌ Ocurrió un error al establecer el banner. Verifica que la URL sea válida.');
    }
};

handler.help = ['setbanner', 'seticono'];
handler.tags = ['owner'];
handler.command = /^(setbanner|seticono)$/i;
handler.owner = true;

export default handler;
