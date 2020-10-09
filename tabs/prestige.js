//Buttons
function confirmPrestige() {
  if (user.confirmation.prestige) {alertify.confirm("Are you sure you want to prestige?", () => {prestige()})}
  else {prestige()}
}
function prestige() {
  if (user.ip.sac.gte(1e100)) {
    let gain = getPPGain();
    user.pp.count++;
    user.pp.x = user.pp.x.plus(gain);
    user.pp.sac = user.pp.sac.plus(gain);
    user.pp.total = user.pp.total.plus(gain);
    let ppTime = Date.now() - user.pp.timeStart;
    if (ppTime < user.pp.bestTime) {user.pp.bestTime = ppTime}
    if (user.pt.refund) {refundPT()}
    checkAchOnReset("Prestige");
    user.pp.timeStart = Date.now();
    checkInfinite();
    resetPrestige();
    unlockAutomation();
    unlockSacrifice();
    unlockIP();
    unlockPP();
  }
  else {
    setTimeout(() => {
      alertify.confirm("You will not earn any PP. Do you want to continue?", () => {
        if (user.pt.refund) {refundPT()}
        resetPrestige();
        unlockAutomation();
        unlockSacrifice();
        unlockIP();
        unlockPP();
      });
    }, 1);
  }
}
function pt(/*row, column*/id) {
  /*let id = "pt" + row + "-" + column;*/
  let cost = getPrestigeTreeCost(id);
  if (user.pp.x.gte(cost) && !user.pt[id]) {
    user.pp.x = user.pp.x.minus(cost);
    user.pt[id] = true;
    /*updatePrestigeTreeCost();*/
    unlockPT();
  }
}
function toggleRefundPT() {
  user.pt.refund = !user.pt.refund;
  updateRefundPT();
}
function refundPT() {
  let row1s = 0;
  for (let i = 1; i <= 3; i++) {if (user.pt["pt1-" + i]) {row1s++}}
  let refund = Math.pow(2, row1s) - 1;
  user.pp.x = user.pp.x.plus(refund);
  for (each in user.pt) {user.pt[each] = false}
  updateRefundPT();
}

//Data
const pts = {
  "pt1-1": {type: "rowIncrease", effect: ["pt1-2", "pt1-3"], baseCost: 1, scaleCost: 2},
  "pt1-2": {type: "rowIncrease", effect: ["pt1-1", "pt1-3"], baseCost: 1, scaleCost: 2},
  "pt1-3": {type: "rowIncrease", effect: ["pt1-1", "pt1-2"], baseCost: 1, scaleCost: 2},
  "pt2-1": {type: "static", cost: 5},
  "pt2-2": {type: "static", cost: 10},
  "pt2-3": {type: "static", cost: 5},
}

//Get Data
function getPPGain() {
  /*return user.ip.sac.plus(1).log10().divide(100).max(0).floor();*/
  /*return user.ip.sac.log10().log10().divide(2).log10().divide(0.0211892990699).plus(1).floor();*/
  /*47.1936328191*/
  let multi = 1;
  if (user.achievements.includes("ach3-2")) {multi *= nd(user.sacrifice.ip + 1).log10().plus(1)}
  let gain = nd(47.1936328191).times(user.ip.sac.log10().log10().divide(2).log10()).plus(1).times(multi).floor();
  if (isNaN(gain) || gain.lt(0)) {gain = nd(0)}
  return gain;
}
function getPrestigeNext() {
  /*return nd(1e100).pow(getPPGain().plus(1).floor());*/
  return nd(10).pow(nd(100).pow(nd(1.05).pow(getPPGain())));
}
function getPPBoost() {return nd(user.pp.x).plus(1).log10().plus(1)}
function getPrestigeTreex(id) {
  if (id == "pt1-1") {return user.pp.sac.plus(1).ln().divide(1.125).plus(1)}
  if (id == "pt1-2") {return user.pp.sac.divide(11).plus(1).log10().times(100)}
  if (id == "pt1-3") {return user.pp.sac.plus(1.55).sqrt().log10().plus(1)}
}
function getPrestigeTreeCost(id) {
  if (pts[id].type == "rowIncrease") {
    if (user.pt[id]) {return nd(0)}
    let effected = 0;
    for (let i = 0; i < pts[id].effect.length; i++) {if (user.pt[pts[id].effect[i]]) {effected++}}
    return nd(pts[id].baseCost).times(nd(pts[id].scaleCost).pow(effected));
  }
  if (pts[id].type == "static") {
    return nd(pts[id].cost);
  }
}

//Unlock Data
function unlockPP() {
  let sac = user.sacrifice.pp;
  let pp = user.pp.sac;
  if (pp.gte(1)) {s("ptr1"); sc("statPPUnlocks")} else {h("ptr1"); hc("statPPUnlocks")}
}
function unlockPT() {
  if (user.pt["pt1-1"] && user.pt["pt1-2"] && user.pt["pt1-3"]) {s("ptr2")} else {h("ptr2")}
}

//Update Data
const goalsPP = [nd(1), nd(10)];
const goalsPPSac = [0, 0];
const unlocksPP = ["Prestige Tree", "Challenges"];
function updatepbpp() {
  let index = 0;
  for (let i = 0; i < goalsPP.length; i++) {if (user.pp.sac.gte(goalsPP[i]) && user.sacrifice.pp >= goalsIPSac[i]) {index = i + 1}}
  let g = goalsPP[index];
  let s = goalsPPSac[index];
  let u = unlocksPP[index];
  if (g == undefined) {g = goalsPP[index - 1]}
  if (s == undefined) {s = goalsPPSac[index - 1]}
  if (u == undefined) {u = "End Game"}
  let sacCost = getSacrificePPCost();
  if (g.gt(sacCost)) {
    g = sacCost;
    u = "Sacrifice";
  }
  d("pbppsac").textContent = e(user.pp.sac);
  d("pbppgoal").textContent = e(g);
  d("pbppunlock").innerHTML = u;
  d("pbpp").style.width = user.pp.sac.divide(g).times(100) + "%";
  if (user.pp.sac.divide(g) > 1) {d("pbpp").style.width = "100%"}
}
function updatePrestige() {
  d("ppGain").textContent = e(getPPGain());
  d("ppNext").textContent = e(getPrestigeNext().minus(user.ip.sac));
  d("ppBoost").textContent = e(getPPBoost(), 2, 2);
}
function updatePrestigeTree() {
  for (let i = 1; i <= 2; i++) {
    for (let k = 1; k <= 3; k++) {
      let id = "pt" + i + "-" + k;
      if (user.pp.x.gte(getPrestigeTreeCost(id)) && !user.pt[id]) {rpc("cantBuy", "canBuy", id)}
      else {rpc("canBuy", "cantBuy", id)}
      if (d(id) != null && d(id).style.display != null) {
        if (d(id + "x") != null) {d(id + "x").textContent = e(getPrestigeTreex(id), 2, 2)}
        d(id + "Cost").textContent = e(getPrestigeTreeCost(id));
      }
    }
  }
}
/*function updatePrestigeTreex() {
  for (let i = 1; i <= 1; i++) {
    for (let k = 1; k <= 3; k++) {
      let id = "pt" + i + "-" + k;
      if (d(id) != null && d(id).style.display != null) {
        d(id + "x").textContent = e(getPrestigeTreex(id), 2, 2);
      }
    }
  }
}
function updatePrestigeTreeCost() {
  for (let i = 1; i <= 1; i++) {
    for (let k = 1; k <= 3; k++) {
      let id = "pt" + i + "-" + k;
      if (d(id) != null && d(id).style.display != null) {
        d(id + "Cost").textContent = e(getPrestigeTreeCost(id));
      }
    }
  }
}*/
function updateRefundPT() {
  if (!user.pt.refund) {rpc("cantBuy", "canBuy", "refundPT")}
  else {rpc("canBuy", "cantBuy", "refundPT")}
}
function updateRefundPTx() {
  let row1s = 0;
  for (let i = 1; i <= 3; i++) {if (user.pt["pt1-" + i]) {row1s++}}
  let refund = Math.pow(2, row1s) - 1;
  d("refundPTx").textContent = e(nd(refund));
}
