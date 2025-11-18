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
    m.react('💃');

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `\`${name2}\` *bailá junto con* \`${name || who}\`.`;
    } else {
        str = `\`${name2}\` *suelta los pasos prohibidos.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://qu.ax/uSfl.mp4'; 
        let pp2 = 'https://qu.ax/nJngK.mp4'; 
        let pp3 = 'https://qu.ax/iXuAh.mp4';
        let pp4 = 'https://qu.ax/CoDLF.mp4';
        let pp5 = 'https://qu.ax/tuDTg.mp4';
        let pp6 = 'https://qu.ax/omASp.mp4';
        let pp7 = 'https://qu.ax/HzdhK.mp4';
        let pp8 = 'https://qu.ax/xszwF.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6, pp7, pp8];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who, sender];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['dance/bailar @tag'];
handler.tags = ['emox'];
handler.command = ['dance', 'bailar'];
handler.group = true;

export default handler;