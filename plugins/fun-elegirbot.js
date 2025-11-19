const handler = async (m, { conn }) => {
  const botNames = ['AZUMI-BOT', 'SHIKIMORI BOT', 'BILLIE BOT', 'GOJŌ SATURŪ BOT'];
  const duration = 30 * 1000; // 30 seconds
  const intervalTime = 2 * 1000; // 2 seconds

  let initialMessage = await conn.sendMessage(m.chat, { text: 'Iniciando selección...' }, { quoted: m });
  let key = initialMessage.key;

  let currentIndex = 0;
  const startTime = Date.now();

  const intervalId = setInterval(async () => {
    if (Date.now() - startTime >= duration) {
      clearInterval(intervalId);
      const winner = botNames[Math.floor(Math.random() * botNames.length)];
      const finalText = `*🎉 ¡Nuevo Bot Seleccionado! 🎉*\n\nEl bot elegido es: *${winner}*`;

      await conn.relayMessage(m.chat, {
        protocolMessage: {
          key: key,
          type: 14,
          editedMessage: {
            conversation: finalText
          }
        }
      }, {});
      return;
    }

    const botName = botNames[currentIndex % botNames.length];
    const text = `*Eligiendo nuevo bot...*\n\n> ${botName}`;

    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: key,
        type: 14,
        editedMessage: {
          conversation: text
        }
      }
    }, {});

    currentIndex++;
  }, intervalTime);
};

handler.help = ['elegirbot'];
handler.tags = ['fun'];
handler.command = /^(elegirbot)$/i;

export default handler;
