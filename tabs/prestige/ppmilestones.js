//Data
const pm = [
  "null",
  {req: 10, desc: "Keep all automation and scaling levels on sacrifice"},
  {req: 15, desc: "Automation stays enabled on sacrifice"},
  {req: 25, desc: "Sacrifice no longer resets your IP"},
  {req: 50, desc: "Sacrifice no longer resets your variables"},
  /*{req: 10000, desc: "Keep the previous layer unlocked on prestige"}*/
];
for (let i=1; i<pm.length; i++) {
  di("pm"+i+"Desc").textContent = pm[i].desc;
}

//Update Data
function updatePrestigeMilestones() {
  for (let i=1; i<pm.length; i++) {
    di("pm"+i+"Req").textContent = e("d", nd(pm[i].req), 2, 0);
    if (user.pp.count < pm[i].req) {di("pm"+i).style.backgroundColor = "rgb(0, 0, 0)"}
    else {di("pm"+i).style.backgroundColor = "rgb(25, 25, 85)"}
  }
}
