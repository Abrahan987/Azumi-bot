// parcheado por ABRAHAN-M
//Codígo creado por Destroy wa.me/584120346669

import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let targetUser;

    if (m.mentionedJid.length > 0) {
        targetUser = m.mentionedJid[0];
    } else if (m.quoted) {
        targetUser = m.quoted.sender;
    } else {
        targetUser = m.sender;
    }

    const who = conn.decodeJid(targetUser);
    const sender = conn.decodeJid(m.sender);

    let name = conn.getName(who);
    let name2 = conn.getName(sender);
    m.react('👙');

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `\`${name2}\` *esta desnudando a* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *esta encuerando.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/kWJNM.mp4'; 
        let pp2 = 'https://qu.ax/FkiGF.mp4'; 
        let pp3 = 'https://qu.ax/QsQYz.mp4';
        let pp4 = 'https://qu.ax/YVJdL.mp4';
        let pp5 = 'https://qu.ax/wNfF.mp4';
        let pp6 = 'https://qu.ax/Nvkzb.mp4';
        let pp7 = 'https://qu.ax/rVJos.mp4';
        let pp8 = 'https://qu.ax/LfetH.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who, sender];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['undress/encuerar @tag'];
handler.tags = ['emox'];
handler.command = ['undress', 'encuerar'];
handler.group = true;

export default handler;
