//Data
const pm = [
  "null",
  {req: 3, desc: "Keep all automation and scaling levels on sacrifice"},
  {req: 10, desc: "Automation stays enabled on sacrifice"},
  {req: 25, desc: "Sacrifice no longer resets your IP"},
  {req: 50, desc: "Sacrifice no longer resets your variables"},
  {req: 25000, desc: "Keep all variables unlocked"}/*,
  {req: 50000, desc: "You can now bulk complete challenges"},
  {req: 100000, desc: "Prestige no longer resets your sacrifices"}*/
];
for (let i=1; i<pm.length; i++) {
  let array = dc("prestigeMilestone");
  array[i-1].childNodes[0].childNodes[3].textContent = pm[i].desc;
}

//Update Data
function updatePrestigeMilestones() {
  for (let i=1; i<pm.length; i++) {
    let array = dc("prestigeMilestone");
    array[i-1].childNodes[0].childNodes[0].textContent = e("d", nd(pm[i].req), 2, 0);
    if (user.pp.count < pm[i].req) {array[i-1].style.backgroundColor = "rgb(0, 0, 0)"}
    else {array[i-1].style.backgroundColor = "rgb(25, 25, 85)"}
  }
}
