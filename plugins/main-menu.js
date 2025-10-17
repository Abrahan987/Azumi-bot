const menuVideos = [
    'https://files.catbox.moe/lux4g2.mp4',
    'https://files.catbox.moe/1upmwh.mp4',
    'https://files.catbox.moe/lux4g2.mp4'
];
const menuImages = [
    'https://files.catbox.moe/s01djf.jpg',
    'https://files.catbox.moe/1tz4tw.jpeg',
    'https://files.catbox.moe/7yjot9.jpg'
];

// Función auxiliar para el tiempo de actividad (uptime)
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return [h, 'h ', m, 'm ', s, 's '].map(v => v.toString().padStart(2, 0)).join('');
}

let handler = async (m, { conn, args }) => {
    let userId = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[userId];
    let name = conn.getName(userId);
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);
    let totalreg = Object.keys(global.db.data.users).length;
    let totalCommands = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
    
    let botSettings = global.db.data.settings[conn.user.jid] || {};
    let bottName = botSettings.botName || botname;

    // Variables del usuario (ajusta según tu base de datos)
    let exp = user.exp || 0;
    let yenes = user.money || 0;
    let level = user.level || 1;
    let role = user.role || 'Novato';
    let saludo = getSaludo(); // Función que retorna saludo según la hora

    let txt = `
𔓕꯭  ꯭ 𓏲꯭֟፝੭ ✰𝐀𝐙𝐔𝐌𝐈 𝐁𝐎𝐓✰ 𓏲꯭֟፝੭ ꯭  ꯭𔓕

❤️ ¡𝐇𝐨𝐥𝐚! 𝐂𝐨𝐦𝐨 𝐄𝐬𝐭𝐚𝐬 𝐄𝐥 𝐃𝐢𝐚 𝐃𝐞 𝐇𝐨𝐲 *${name}* Azumi ${saludo}. 

⪩「 𝐈𝐍𝐅𝐎 𝐂𝐑𝐄𝐀𝐃𝐎𝐑ᚐ 」⪨
❂ ⧼👑⧽ *Creador:* A͜͡B͜͡R͜͡A͜͡H͜͡A͜͡N͜͡
❂ ⧼🔱⧽ *Modo:* Publico
❂ ⧼🔗⧽ *Baileys:* Multi Device
❂ ⧼🤖⧽ *Bot:* ${(conn.user.jid == global.conn.user.jid ? 'Oficial' : 'Sub-Bot')}
❂ ⧼⏱️⧽ *Activado:* ${uptime}
❂ ⧼👥⧽ *Usuarios:* ${totalreg}

「 𝐈𝐍𝐅𝐎 𝐃𝐄 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 」⪨
❂ ⧼👤⧽ *Cliente:* ${name}
❂ ⧼🌐⧽ *País:* ${global.userNationality || 'No definido'}
❂ ⧼✨⧽ *Exp:* ${exp}
❂ ⧼💵⧽ *Dinero:* ${yenes}
❂ ⧼🌟⧽ *Nivel:* ${level}
❂ ⧼⚜️⧽ *Rango:* ${role}

*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ──ׄ*
*【𝕷 𝖎 𝖘 𝖙 𝖆 - 𝕯𝖊 - 𝕮 𝖔 𝖒 𝖆 𝖓 𝖉 𝖔 𝖘】*

┏━━❃「 𝐈𝐧𝐟𝐨 𝐁𝐨𝐭 」❃
┃❀ .botreglas
┃❀ .menu
┃❀ .menujuegos
┃❀ .menuanime
┃❀ .menuhorny 
┃❀ .menuaudios 
┃❀ .runtime
┃❀ .script
┃❀ .staff
┃❀ .blocklist
┗━━━━━━━━━━━━━━━━━⪩

┏━━❃「 𝐈𝐧𝐟𝐨𝐫𝐦𝐚𝐜𝐢𝐨́𝐧ᚐ 」❃
┃✿ .creador
┃✿ .editautoresponder
┃✿ .owner
┃✿ .dash
┃✿ .dashboard
┃✿ .views
┃✿ .database
┃✿ .usuarios
┃✿ .user
┃✿ .ds
┃✿ .listprem
┃✿ .status
┃✿ .solicitud *<mensaje>*
┃✿ .sug *<mensaje>*
┃✿ .horario
┃✿ .skyplus
┃✿ .infobot
┃✿ .ping
┃✿ .reportar
┃✿ .sistema
┃✿ .speed
┃✿ .speedtest
┗━━━━━━━━━━━━━━━━━⪩

┏━━❃「 𝐑𝐞𝐠𝐢𝐬𝐭𝐫𝐨 」❃
┃❋ .reg
┃❋ .unreg
┃❋ .profile
┃❋ .marry
┃❋ .setgenre
┃❋ .delgenre
┃❋ .setbirth
┃❋ .delbirth
┃❋ .setdescription
┃❋ .deldescription
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐃𝐢𝐯𝐞𝐫𝐬𝐢𝐨𝐧 」⪨
┃☬ .amistad
┃☬ .gay <@tag> | <nombre>
┃☬ .lesbiana <@tag> | <nombre>
┃☬ .pajero <@tag> | <nombre>
┃☬ .pajera <@tag> | <nombre>
┃☬ .puto <@tag> | <nombre>
┃☬ .puta <@tag> | <nombre>
┃☬ .manco <@tag> | <nombre>
┃☬ .manca <@tag> | <nombre>
┃☬ .revelargenero *<texto>*
┃☬ .rata <@tag> | <nombre>
┃☬ .prostituta <@tag> | <nombre>
┃☬ .prostituto <@tag> | <nombre> 
┃☬ .consejo
┃☬ .divorce
┃☬ .doxear
┃☬ .doxxing <nombre> | <@tag>
┃☬ .formarpareja
┃☬ .formarpareja5
┃☬ .horny
┃☬ .hornycard
┃☬ .huevo @user
┃☬ .iqtest
┃☬ .marica
┃☬ .meme
┃☬ .aplauso
┃☬ .marron
┃☬ .suicide
┃☬ .chupalo
┃☬ .minovia @user
┃☬ .morse *<encode|decode>*
┃☬ .nombreninja *<texto>*
┃☬ .pajeame
┃☬ .personalidad
┃☬ .piropo
┃☬ .pokedex *<pokemon>*
┃☬ .pregunta
┃☬ .ship
┃☬ .love
┃☬ .simpcard
┃☬ .sorteo
┃☬ .itssostupid
┃☬ .estupido
┃☬ .stupid
┃☬ .top *<texto>*
┃☬ .formartrio @usuario1 @usuario2
┃☬ .waste @user
┃☬ .zodiac *2002 02 25*
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐉𝐮𝐞𝐠𝐨𝐬ᚐ 」⪨
┃✧ .cancion
┃✧ .pista
┃✧ .ttt nueva sala 
┃✧ .ahorcado
┃✧ .math <mode>
┃✧ .ppt
┃✧ .pvp @user
┃✧ .reto
┃✧ .sopa
┃✧ .verdad
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐄𝐦𝐨𝐱-𝐀𝐧𝐢𝐦𝐞」⪨
┃✥ .angry/enojado @tag
┃✥ .bath/bañarse @tag
┃✥ .bite/morder @tag
┃✥ .bleh/lengua @tag
┃✥ .blush/sonrojarse @tag
┃✥ .bored/aburrido @tag
┃✥ .coffe/cafe @tag
┃✥ .cry/llorar @tag
┃✥ .cuddle/acurrucarse @tag
┃✥ .dance/bailar @tag
┃✥ .drunk/borracho @tag
┃✥ .eat/comer @tag
┃✥ .facepalm/palmada @tag
┃✥ .grop/manosear @tag
┃✥ .happy/feliz @tag
┃✥ .hello/hola @tag
┃✥ .hug/abrazar @tag
┃✥ .kill/matar @tag
┃✥ .kiss/besar @tag
┃✥ .kiss2/besar2 @tag
┃✥ .laugh/reirse @tag
┃✥ .lick/lamer @tag
┃✥ .love2/enamorada @tag
┃✥ .patt/acariciar @tag
┃✥ .poke/picar @tag
┃✥ .pout/pucheros @tag
┃✥ .preg/embarazar @tag
┃✥ .punch/golpear @tag
┃✥ .run/correr @tag
┃✥ .sad/triste @tag
┃✥ .scared/asustada @tag
┃✥ .seduce/seducir @tag
┃✥ .shy/timida @tag
┃✥ .slap/bofetada @tag
┃✥ .sleep/dormir @tag
┃✥ .smoke/fumar @tag
┃✥ .think/pensando @tag
┃✥ .undress/encuerar @tag
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐇𝐨𝐫𝐧𝐲ᚐ 」⪨
┃✤ .sixnine/69 @tag
┃✤ .anal/culiar @tag
┃✤ .blowjob/mamada @tag
┃✤ .boobjob/rusa @tag
┃✤ .cum/leche @tag
┃✤ .fap/paja @tag
┃✤ .follar @tag
┃✤ .footjob/pies @tag
┃✤ .fuck/coger @tag
┃✤ .fuck2/coger2 @tag
┃✤ .grabboobs/agarrartetas @tag
┃✤ .penetrar @user
┃✤ .lickpussy/coño @tag
┃✤ .sexo/sex @tag
┃✤ .spank/nalgada @tag
┃✤ .suckboobs/chupartetas @tag
┃✤ .violar/perra @tag
┃✤ .lesbianas/tijeras @tag
┃✤ .rule34 <personaje>
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐑𝐨𝐥𝐥𝐰𝐚𝐢𝐟𝐮𝐬 」⪨
┃✦ .character
┃✦ .darrw
┃✦ .obtenidos
┃✦ .c
┃✦ .robarpersonaje
┃✦ .rw
┃✦ .toprw
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐄𝐜𝐨𝐧𝐨𝐦𝐢𝐚ᚐ 」⪨
┃✱ .apostar 
┃✱ .bal
┃✱ .bank
┃✱ .dragones
┃✱ .prestar
┃✱ .deuda
┃✱ .pagar
┃✱ .apostar *<cantidad>*
┃✱ .cf
┃✱ .crimen
┃✱ .depositar
┃✱ .minar
┃✱ .retirar
┃✱ .rob2
┃✱ .rob
┃✱ .ruleta *<cantidad> <color>*
┃✱ .Buy
┃✱ .Buyall
┃✱ .slot <apuesta>
┃✱ .slut
┃✱ .trabajar
┃✱ .transfer [tipo] [cantidad] [@tag]
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐑-𝐏-𝐆ᚐ 」⪨
┃♤ .adventure
┃♤ .annual
┃♤ .cofre
┃♤ .daily
┃♤ .claim
┃♤ .cazar
┃♤ .halloween
┃♤ .heal
┃♤ .lb
┃♤ .levelup
┃♤ .inventario 
┃♤ .mazmorra
┃♤ .monthly
┃♤ .navidad
┃♤ .addprem [@user] <days>
┃♤ .weekly
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐒𝐞𝐫𝐛𝐨𝐭/𝐂𝐨𝐝𝐞 」⪨
┃✾ .jadibot 
┃✾ .deletebot
┃✾ .bots
┃✾ .stop
┃✾ .serbot
┃✾ .serbot --code 
┃✾ .token
┃✾ .rentbot
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐁𝐮𝐬𝐜𝐚𝐝𝐨𝐫𝐞𝐬ᚐ 」⪨
┃❖ .animesearch
┃❖ .appstore
┃❖ .bingsearch
┃❖ .cuevana
┃❖ .githubsearch
┃❖ .gimage
┃❖ .gnula
┃❖ .googlesearch *<texto>*
┃❖ .npmjs
┃❖ .steam
┃❖ .twitterstalk <username>
┃❖ .tiktoksearch <txt>
┃❖ .tweetposts *<búsqueda>*
┃❖ .wikis
┃❖ .xnxxsearch <query>
┃❖ .ytsearch
┃❖ .imagen <query>
┃❖ .infoanime
┃❖ .animelink
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐃𝐞𝐬𝐜𝐚𝐫𝐠𝐚𝐬 」⪨
┃Ѽ .animedl
┃Ѽ .animeinfo
┃Ѽ .apk2
┃Ѽ .apkmod
┃Ѽ .facebook
┃Ѽ .fb
┃Ѽ .gdrive
┃Ѽ .gitclone *<url git>*
┃Ѽ .instagram2
┃Ѽ .ig2
┃Ѽ .imagen <query>
┃Ѽ .mangad <nombre del manga> <número del capítulo>
┃Ѽ .mediafire
┃Ѽ .mega
┃Ѽ .npmdl
┃Ѽ .aptoide
┃Ѽ .pinterest
┃Ѽ .pinvid
┃Ѽ .play
┃Ѽ .play2
┃Ѽ .play3
┃Ѽ .play4
┃Ѽ .playdoc
┃Ѽ .playdoc2
┃Ѽ .mp3
┃Ѽ .mp4
┃Ѽ .tiktokrandom
┃Ѽ .spotify
┃Ѽ .tiktokimg <url>
┃Ѽ .tiktokmp3 *<link>*
┃Ѽ .tiktok
┃Ѽ .tiktok2 *<link>*
┃Ѽ .wallpaper <query>
┃Ѽ .tw
┃Ѽ .ss2
┃Ѽ .ssvid
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐀𝐢/𝐈𝐚 」⪨
┃☫ .demo
┃☫ .gemini
┃☫ .goku
┃☫ .bot
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐆𝐫𝐮𝐩𝐨𝐬 」⪨
┃♕ .add
┃♕ .admins <texto>
┃♕ .bienvenidos/nuevos
┃♕ .nights/noches
┃♕ .dias/days
┃♕ .grupotime *<open/close>* *<número>*
┃♕ .grupo abrir / cerrar
┃♕ .delete
┃♕ .demote
┃♕ .encuesta <text|text2>
┃♕ .hidetag
┃♕ .infogrupo
┃♕ .invite *<numero>*
┃♕ .kick
┃♕ .listonline
┃♕ .link
┃♕ .listadv
┃♕ .promote
┃♕ .rentar
┃♕ .rentar2 *<link>*
┃♕ .revoke
┃♕ .setbye <text>
┃♕ .Setdesc <text>
┃♕ .setname <text>
┃♕ .setppgrup
┃♕ .setwelcome <text>
┃♕ .tagall *<mesaje>*
┃♕ .invocar *<mesaje>*
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐇𝐞𝐫𝐫𝐚𝐦𝐢𝐞𝐧𝐭𝐚𝐬 」⪨
┃✰ .cal *<ecuacion>*
┃✰ .clima *<lugar>*
┃✰ .fake
┃✰ .getbio *@tag*
┃✰ .getname *@tag*
┃✰ .remini
┃✰ .hd
┃✰ .enhance
┃✰ .nuevafotochannel
┃✰ .nosilenciarcanal
┃✰ .silenciarcanal
┃✰ .noseguircanal
┃✰ .seguircanal
┃✰ .avisoschannel
┃✰ .resiviravisos
┃✰ .inspect
┃✰ .inspeccionar
┃✰ .eliminarfotochannel
┃✰ .reactioneschannel
┃✰ .reaccioneschannel
┃✰ .nuevonombrecanal
┃✰ .nuevadescchannel
┃✰ .IPdoxx
┃✰ .photo <query>
┃✰ .readmore *<teks>|<teks>*
┃✰ .ver
┃✰ .reenviar
┃✰ .spamwa <number>|<mesage>|<no of messages>
┃✰ .ssweb
┃✰ .ss
┃✰ .tamaño *<cantidad>*
┃✰ .document *<audio/video>*
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐂𝐨𝐧𝐯𝐞𝐫𝐭𝐢𝐝𝐨𝐫𝐞𝐬ᚐ 」⪨
┃ꕥ .ibb
┃ꕥ .paste nombre txt
┃ꕥ .to <reply image>
┃ꕥ .toanime
┃ꕥ .togifaud
┃ꕥ .tourl
┃ꕥ .tovideo
┃ꕥ .tts <lang> <teks>
┃ꕥ .tts2
┃ꕥ .tourl2
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐒𝐭𝐢𝐜𝐤𝐞𝐫𝐬 」⪨
┃☠︎︎ .emojimix *<emoji+emoji>*
┃☠︎︎ .pfp
┃☠︎︎ .qc
┃☠︎︎ .stiker <img>
┃☠︎︎ .sticker <url>
┃☠︎︎ .toimg (reply)
┃☠︎︎ .take *<nombre>|<autor>*
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐂𝐨𝐧𝐟𝐢𝐠𝐮𝐫𝐚𝐜𝐢𝐨́𝐧 」⪨
┃⚘ .enable <option>
┃⚘ .disable <option>
┃⚘ .autoadmin
┃⚘ .banchat
┃⚘ .banuser <@tag> <razón>
┃⚘ .grupocrear <nombre>
┃⚘ .join <link>
┃⚘ .unbanchat
┃⚘ .unbanuser <@tag>
┗━━━━━━━━━━━━━━━━━⪩

┏━━⪩「 𝐂𝐫𝐞𝐚𝐝𝐨𝐫/𝐎𝐰𝐧𝐞𝐫 」⪨
┃🜲 .listafk
┃🜲 .expired *<días>*
┃🜲 .addyenes *<@user>*
┃🜲 .addprem [@user] <days>
┃🜲 .copia
┃🜲 .broadcast
┃🜲 .bc
┃🜲 .broadcastgroup
┃🜲 .bcgc
┃🜲 .bcgc2
┃🜲 .cleanfiles
┃🜲 .cleartmp
┃🜲 .setcmd *<texto>*
┃🜲 .deletefile
┃🜲 .delexpired
┃🜲 .delvn <text>
┃🜲 .delmsg <text>
┃🜲 .delimg <text>
┃🜲 .delsticker <text>
┃🜲 .delprem <@user>
┃🜲 .reunion *<texto>*
┃🜲 .removeowner @user
┃🜲 .dsowner
┃🜲 $
┃🜲 .fetch
┃🜲 .get
┃🜲 .getplugin *<nombre>*
┃🜲 .groups
┃🜲 .grouplist
┃🜲 .kickall @user
┃🜲 .nuevabiobot <teks>
┃🜲 .nuevafotobot *<imagen>*
┃🜲 .nuevonombrebot <teks>
┃🜲 .prefix [prefix]
┃🜲 .resetpersonajes
┃🜲 .resetprefix
┃🜲 .restart
┃🜲 .saveplugin nombre
┃🜲 .update
┃🜲 .actualizar
┃🜲 >
┃🜲 =>
┗━━━━━━━━━━━━━━━━━⪨

> © 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 ☆𝙰𝙱𝚁𝙰𝙷𝙰𝙽☆
`.trim();

    let bot = global.db.data.settings[conn.user.jid];
    
    // Lógica para elegir aleatoriamente entre video/gif o imagen
    const useVideo = Math.random() < 0.4; // 40% de probabilidad de usar video/gif
    let messageOptions = {};
    let selectedMediaUrl;

    if (useVideo && menuVideos.length > 0) {
        // Preparar mensaje con Video/GIF
        selectedMediaUrl = menuVideos[Math.floor(Math.random() * menuVideos.length)];
        messageOptions = {
            video: { url: selectedMediaUrl },
            gifPlayback: true,
            caption: txt,
            mentions: [m.sender, userId]
        };
    } else if (menuImages.length > 0) {
        // Preparar mensaje con Imagen
        selectedMediaUrl = menuImages[Math.floor(Math.random() * menuImages.length)];
        messageOptions = {
            text: txt,
            contextInfo: {
                mentionedJid: [m.sender, userId],
                isForwarded: false, 
                forwardedNewsletterMessageInfo: { 
                    newsletterJid: channelRD.id,
                    newsletterName: channelRD.name,
                    serverMessageId: -1, 
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: botname, 
                    body: global.dev, 
                    thumbnailUrl: bot.logo || banner, 
                    sourceUrl: 'https://github.com/Abraham',
                    mediaType: 1, 
                    showAdAttribution: false, 
                    renderLargerThumbnail: true 
                }
            }
        };
    } else {
        // Fallback: Si no hay videos ni imágenes, enviar solo texto
        messageOptions = {
            text: txt,
            mentions: [m.sender, userId]
        };
        console.warn("Advertencia: No se encontraron URLs en menuVideos ni menuImages. Enviando solo texto.");
    }

    // Enviar el mensaje
    try {
        await conn.sendMessage(m.chat, messageOptions, { quoted: m });
    } catch (error) {
        console.error("Error al enviar el mensaje del menú:", error);
        // Enviar un mensaje de error simple si falla el envío complejo
        await conn.reply(m.chat, `Error al mostrar el menú. \n\n${txt}`, m);
    }
};

// Función auxiliar para obtener saludo según la hora
function getSaludo() {
    const hora = new Date().getHours();
    if (hora >= 5 && hora < 12) return '¡Buenos días!';
    if (hora >= 12 && hora < 18) return '¡Buenas tardes!';
    return '¡Buenas noches!';
}

handler.help = ['menu']; 
handler.tags = ['main'];
handler.command = ['menu', 'menú', 'help']; 

export default handler;
