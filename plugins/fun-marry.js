/* Código hecho por Destroy
 - https://github.com/The-King-Destroy
 - Créditos obligatorios.
*/

import fs from 'fs';
import path from 'path';

const marriagesFile = path.resolve('src/database/marry.json');
let proposals = {}; 
let marriages = loadMarriages();
const confirmation = {};

function loadMarriages() {
    return fs.existsSync(marriagesFile)
        ? JSON.parse(fs.readFileSync(marriagesFile, 'utf8'))
        : {};
}

function saveMarriages() {
    fs.writeFileSync(marriagesFile, JSON.stringify(marriages, null, 2));
}

const handler = async (m, { conn, command }) => {
    const isPropose = /^marry$/i.test(command);
    const isDivorce = /^divorce$/i.test(command);
    const isCheck = /^(pareja|mymarry)$/i.test(command);

    const userIsMarried = (user) => marriages[user] !== undefined;

    try {
        // 💍 PROPUESTA
        if (isPropose) {
            const proposee = m.quoted?.sender || m.mentionedJid?.[0];
            const proposer = m.sender;

            if (!proposee) {
                if (userIsMarried(proposer)) {
                    return await conn.reply(
                        m.chat,
                        `《✧》 Ya estás casado con *${conn.getName(marriages[proposer])}* 💞\n> Puedes divorciarte con: *#divorce*`,
                        m
                    );
                } else {
                    throw new Error('Debes mencionar o responder a alguien para proponer matrimonio.\n> Ejemplo » *#marry @usuario*');
                }
            }

            if (userIsMarried(proposer)) throw new Error(`Ya estás casado con ${conn.getName(marriages[proposer])}.`);
            if (userIsMarried(proposee)) throw new Error(`${conn.getName(proposee)} ya está casado con ${conn.getName(marriages[proposee])}.`);
            if (proposer === proposee) throw new Error('¡No puedes proponerte matrimonio a ti mismo!');

            proposals[proposer] = proposee;
            const proposerName = conn.getName(proposer);
            const proposeeName = conn.getName(proposee);

            const confirmationMessage = `♡ ${proposerName} te ha propuesto matrimonio, ${proposeeName} 💍\n\n*Responde al chat con:*\n> ✐ "Si" » para aceptar\n> ✐ "No" » para rechazar.\n\n⏳ Tienes 60 segundos para responder.`;
            await conn.reply(m.chat, confirmationMessage, m, { mentions: [proposee, proposer] });

            // Guardar estado de propuesta
            confirmation[proposee] = {
                proposer,
                chat: m.chat,
                timeout: setTimeout(() => {
                    conn.sendMessage(
                        m.chat,
                        { text: '*《✧》Se acabó el tiempo, no se obtuvo respuesta. La propuesta fue cancelada.*' },
                        { quoted: m }
                    );
                    delete confirmation[proposee];
                }, 60000),
            };
        }

        // 💔 DIVORCIO
        else if (isDivorce) {
            if (!userIsMarried(m.sender)) throw new Error('No estás casado con nadie.');

            const partner = marriages[m.sender];
            delete marriages[m.sender];
            delete marriages[partner];
            saveMarriages();

            await conn.reply(
                m.chat,
                `✐ ${conn.getName(m.sender)} y ${conn.getName(partner)} se han divorciado 💔`,
                m
            );
        }

        // 💞 CONSULTAR PAREJA
        else if (isCheck) {
            if (!userIsMarried(m.sender)) {
                return await conn.reply(m.chat, `《✧》 No estás casado con nadie 💔\n> Usa *#marry @usuario* para proponer matrimonio.`, m);
            }

            const partner = marriages[m.sender];
            await conn.reply(
                m.chat,
                `♡ Estás casado con *${conn.getName(partner)}* 💕\n> ¡Qué viva el amor! 💞`,
                m,
                { mentions: [partner] }
            );
        }

    } catch (error) {
        await conn.reply(m.chat, `《✧》 ${error.message}`, m);
    }
};

// 💌 Confirmación (responder "Si" o "No" sin necesidad de citar)
handler.before = async (m, { conn }) => {
    if (m.isBaileys) return;
    if (!(m.sender in confirmation)) return;
    if (!m.text) return;

    const { proposer, timeout, chat } = confirmation[m.sender];

    if (m.chat !== chat) return; // evita aceptar desde otro chat

    if (/^No$/i.test(m.text.trim())) {
        clearTimeout(timeout);
        delete confirmation[m.sender];
        return conn.sendMessage(chat, {
            text: `《✧》 ${conn.getName(m.sender)} ha rechazado la propuesta de matrimonio 💔`
        }, { quoted: m });
    }

    if (/^Si$/i.test(m.text.trim())) {
        delete proposals[proposer];
        marriages[proposer] = m.sender;
        marriages[m.sender] = proposer;
        saveMarriages();

        await conn.sendMessage(chat, {
            text: `✩.･:｡≻──── ⋆♡⋆ ────.•:｡✩
¡Se han Casado! 💞ฅ^•ﻌ•^ฅ

*•.¸♡ Esposo:* ${conn.getName(proposer)}
*•.¸♡ Esposa:* ${conn.getName(m.sender)}

\`Disfruten de su luna de miel\`

✩.･:｡≻──── ⋆♡⋆ ────.•:｡✩`,
            mentions: [proposer, m.sender]
        }, { quoted: m });

        clearTimeout(timeout);
        delete confirmation[m.sender];
    }
};

handler.tags = ['fun'];
handler.help = ['marry *@usuario*', 'divorce', 'pareja'];
handler.command = ['marry', 'divorce', 'pareja', 'mymarry'];
handler.group = true;

export default handler;
