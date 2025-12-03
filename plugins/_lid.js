
let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    if (user) {
        let lid = Object.keys(global.db.data.lids).find(lid => global.db.data.lids[lid] === m.sender)
        if (lid) {
            m.reply(`Your LID is: ${lid}`)
        } else {
            m.reply(`LID not found for your JID.`)
        }
    } else {
        m.reply('User not found in the database.')
    }
}
handler.help = ['lid']
handler.tags = ['tools']
handler.command = /^(lid)$/i

export default handler
