//Data
const pm = [
  "null",
  {req: 2, sac: 0, desc: "IP sacrifice no longer resets your automation and scaling levels"},
  {req: 5, sac: 0, desc: "IP sacrifice no longer turns off automation"},
  {req: 25, sac: 0, desc: "IP sacrifice no longer resets your IP"},
  {req: 50, sac: 0, desc: "IP sacrifice no longer resets your variables"},
  {req: 25000, sac: 0, desc: "Keep all variables unlocked on all resets"},
  {req: 50000, sac: 1, desc: "PP sacrifice no longer resets challenges"}
];
for (let i=1; i<pm.length; i++) {
  let array = dc("ppMilestoneDesc");
  array[i-1].textContent = pm[i].desc;
}

//Update Data
function updatePrestigeMilestones() {
  let req = dc("ppMilestoneReq");
  let current = dc("ppMilestoneCurrent");
  let pb = dc("pbPPMilestone");
  for (let i=1; i<pm.length; i++) {
    req[i-1].textContent = e("d", nd(pm[i].req), "d", 0);
    current[i-1].textContent = (user.pp.count < pm[i].req) ? e("d", nd(user.pp.count), "d", 0) : e("d", nd(pm[i].req));
    pb[i-1].style.width = (pm[i].req-user.pp.count > 0) ? user.pp.count/pm[i].req*100+"%" : "100%";
    
    /*array[i-1].childNodes[0].childNodes[0].textContent = e("d", nd(pm[i].req), 2, 0);*/
    /*if (user.pp.count < pm[i].req) {array[i-1].style.backgroundColor = "rgb(0, 0, 0)"}
    else {array[i-1].style.backgroundColor = "rgb(25, 25, 85)"}*/
  }
}
