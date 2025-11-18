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
    m.react('🏃');

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `\`${name2}\` *está corriendo de* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *esta corriendo.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/acRFf.mp4'; 
        let pp2 = 'https://qu.ax/iUjgV.mp4'; 
        let pp3 = 'https://qu.ax/wjheu.mp4';
        let pp4 = 'https://qu.ax/ejZJD.mp4';
        let pp5 = 'https://qu.ax/UOLym.mp4';
        let pp6 = 'https://qu.ax/qTAxM.mp4';
        let pp7 = 'https://qu.ax/oCYed.mp4';
        let pp8 = 'https://qu.ax/OPMAT.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who, sender];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['run/correr @tag'];
handler.tags = ['emox'];
handler.command = ['run', 'correr'];
handler.group = true;

export default handler;