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
    m.react('😝');

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `\`${name2}\` *le sacó la lengua a* \`${name}\`.`;
    } else {
        str = `\`${name2}\` *saca la lengua*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/qhcqag'; 
        let pp2 = 'https://files.catbox.moe/tnsdlr.mp4'; 
        let pp3 = 'https://files.catbox.moe/fox9sl.mp4';
        let pp4 = 'https://files.catbox.moe/lh4c2n.mp4';
        let pp5 = 'https://files.catbox.moe/y2zg7b.mp4';
        let pp6 = 'https://qu.ax/rlvKj.mp4';
        let pp7 = 'https://qu.ax/sYXfh.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];

        let mentions = [who, sender];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['bleh/lengua @tag'];
handler.tags = ['emox'];
handler.command = ['bleh','lengua'];
handler.group = true;

export default handler;
