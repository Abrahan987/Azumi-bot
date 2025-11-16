let R = Math.random;
let Fl = Math.floor;
function handler(m, {groupMetadata}) {
  let ps = groupMetadata.participants;
  let a = ps.getRandom();
  let b;
  do b = ps.getRandom();
  while (b === a);
  let c;
  do c = ps.getRandom();
  while (b === a);
  let d;
  do d = ps.getRandom();
  while (b === a);
  let e;
  do e = ps.getRandom();
  while (b === a);
  let f;
  do f = ps.getRandom();
  while (b === a);
  let g;
  do g = ps.getRandom();
  while (b === a);
  let h;
  do h = ps.getRandom();
  while (b === a);
  let i;
  do i = ps.getRandom();
  while (b === a);
  let j;
  do j = ps.getRandom();
  while (b === a);
  m.reply(
    `*_😍Las 5 mejores parejas del grupo😍_*
    
*_1.- @${a.pushName} y @${b.pushName}_*
- Esta pareja esta destinada a estar junta 💙

*_2.- @${c.pushName} y @${d.pushName}_*
- Esta pareja son dos pequeños tortolitos enamorados ✨

*_3.- @${e.pushName} y @${f.pushName}_*
- Ufff y que decir de esta pareja, ya hasta familia deberian tener 🤱🧑‍🍼

*_4.- @${g.pushName} y @${h.pushName}_*
- Estos ya se casaron en secreto 💍

*_5.- @${i.pushName} y @${j.pushName}_*
- Esta pareja se esta de luna de miel ✨🥵😍❤️*`,
    null,
    {
      mentions: [a.id, b.id, c.id, d.id, e.id, f.id, g.id, h.id, i.id, j.id],
    }
  );
}
handler.help = ["formarpareja5"];
handler.tags = ["fun"];
handler.command = ["formarpareja5"];
handler.register = true;
handler.group = true;
export default handler;