let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    const resources = [
        'exp', 'yenes', 'bank', 'diamond', 'health', 'kyubi', 'joincount',
        'emerald', 'stamina', 'gold', 'trash', 'crystal', 'intelligence',
        'string', 'keygold', 'keyiron', 'emas', 'fishingrod', 'gems',
        'magicwand', 'mana', 'agility', 'darkcrystal', 'iron', 'rock',
        'potion', 'superior', 'robo', 'upgrader', 'wood', 'strength',
        'arc', 'armor', 'bow', 'pickaxe', 'sword', 'common', 'uncoommon',
        'mythic', 'legendary', 'petFood', 'pet', 'money', 'coin'
    ];

    for (let resource of resources) {
        if (user[resource] !== undefined || user[resource] != null) {
            user[resource] = Infinity
        }
    }
    user.level = 100
    user.health = Infinity

    conn.reply(m.chat, '¡Ahora tienes recursos ilimitados! 👑', m)
}

handler.help = ['chetar']
handler.tags = ['owner']
handler.command = /^(chetar)$/i
handler.owner = true

export default handler