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
    m.react('😡');

    let str;
    if (m.mentionedJid.length > 0 || m.quoted) {
        str = `\`${name2}\` *está enojado/a con* \`${name}\`.`;
    } else {
        str = `\`${name2}\` *está enojado/a.*`.trim();
    }
    
    if (m.isGroup) {
        let pp = 'https://files.catbox.moe/2aedd3.mp4'; 
        let pp2 = 'https://files.catbox.moe/fqf4ey.mp4'; 
        let pp3 = 'https://files.catbox.moe/v7ldgq.mp4';
        let pp4 = 'https://files.catbox.moe/uedd7l.mp4';
        let pp5 = 'https://files.catbox.moe/5stubg.mp4';
        let pp6 = 'https://files.catbox.moe/phaft3.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5, pp6];
        const video = videos[Math.floor(Math.random() * videos.length)];
     
        let mentions = [who, sender];
        conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: str, mentions }, { quoted: m });
    }
}

handler.help = ['angry/enojado @tag'];
handler.tags = ['emox'];
handler.command = ['angry','enojado'];
handler.group = true;

export default handler;
