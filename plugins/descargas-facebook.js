import { igdl } from 'ruhend-scraper';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Validar que se envió una URL
  if (!args[0]) {
    return conn.reply(m.chat, '☁️ *Ingresa un link de Facebook*\n\nEjemplo:\n' + usedPrefix + command + ' https://fb.watch/abc123', m);
  }

  // Validar que sea una URL de Facebook
  if (!args[0].match(/(facebook\.com|fb\.watch)/gi)) {
    return conn.reply(m.chat, '❌ *Link inválido. Debe ser de Facebook o fb.watch*', m);
  }

  let res;
  
  try {
    // Mensaje inicial con preview
    conn.reply(m.chat, '🕒 *Descargando video de Facebook...*', m, {
      contextInfo: { 
        externalAdReply: { 
          mediaUrl: null, 
          mediaType: 1, 
          showAdAttribution: true,
          title: global.packname || 'Facebook Downloader',
          body: global.dev || 'Bot de WhatsApp',
          previewType: 0, 
          thumbnail: global.icons || null,
          sourceUrl: global.channel || null 
        }
      }
    });
    
    await m.react('⏳');
    
    // Descargar datos del video
    res = await igdl(args[0]);
    
  } catch (error) {
    console.error('Error al obtener datos:', error);
    await m.react('❌');
    return conn.reply(m.chat, '💨 *Error al obtener datos. Verifica el enlace.*', m);
  }

  // Validar resultados
  const result = res.data;
  
  if (!result || result.length === 0) {
    await m.react('❌');
    return conn.reply(m.chat, '😞 *No se encontraron videos en ese enlace.*', m);
  }

  // Seleccionar calidad de video
  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || 
           result.find(i => i.resolution === "360p (SD)") || 
           result[0];
  } catch (error) {
    console.error('Error al procesar datos:', error);
    await m.react('❌');
    return conn.reply(m.chat, '🫠 *Error al procesar los datos.*', m);
  }

  if (!data || !data.url) {
    await m.react('❌');
    return conn.reply(m.chat, '💨 *No se encontró una resolución adecuada.*', m);
  }

  // Enviar video
  try {
    await m.react('📥');
    
    const caption = `✅ *Video de Facebook*\n\n📹 Calidad: ${data.resolution || 'Desconocida'}\n\n${global.textbot || '> Descargado con éxito'}`;
    
    await conn.sendMessage(m.chat, { 
      video: { url: data.url }, 
      caption: caption, 
      fileName: 'facebook.mp4', 
      mimetype: 'video/mp4' 
    }, { quoted: m });
    
    await m.react('✅');
    
  } catch (error) {
    console.error('Error al enviar video:', error);
    await m.react('❌');
    return conn.reply(m.chat, '😓 *Error al enviar el video. Puede ser muy pesado.*', m);
  }
};

handler.help = ['facebook <url>', 'fb <url>'];
handler.tags = ['downloader'];
handler.command = ['facebook', 'fb'];
handler.register = true;

export default handler;
