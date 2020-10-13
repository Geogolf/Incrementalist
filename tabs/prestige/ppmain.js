//Buttons
function confirmPrestige() {
  if (user.confirmation.prestige) {alertify.confirm("Are you sure you want to prestige?", () => {prestige()})}
  else {prestige()}
}
function prestige() {
  if (user.ip.sac.gte(1e100)) {
    resetFrom = "Prestige";
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
        resetFrom = "Prestige";
        resetPrestige();
        unlockAutomation();
        unlockSacrifice();
        unlockIP();
        unlockPP();
      });
    }, 1);
  }
}

//Get Data
function getPPGainMulti() {
  let multi = nd(1);
  if (user.achievements.includes("ach3-2")) {multi = multi.times(getAchievementReward("ach3-2"))}
  if (user.achievements.includes("ach3-3")) {multi = multi.times(getAchievementReward("ach3-3"))}
  return multi;
}
function getPPGain() {
  /*return user.ip.sac.plus(1).log10().divide(100).max(0).floor();*/
  /*return user.ip.sac.log10().log10().divide(2).log10().divide(0.0211892990699).plus(1).floor();*/
  /*47.1936328191*/
  
  let ppGainScaling = nd(1).divide(Math.log10(1.05));
  
  let multi = getPPGainMulti();
  let gain = ppGainScaling.times(user.ip.sac.log10().log10().divide(2).log10()).plus(1).times(multi).floor();
  if (isNaN(gain) || gain.lt(multi.floor())) {gain = nd(0)}
  return gain;
}
function getPrestigeNext() {
  /*return nd(1e100).pow(getPPGain().plus(1).floor());*/
  /*return nd(10).pow(nd(100).pow(nd(1.05).pow(
    nd(47.1936328191).times(user.ip.sac.log10().log10().divide(2).log10()).plus(1).floor()
  )));*/
  
  let next = nd(10).pow(nd(100).pow(nd(1.05).pow(getPPGain().plus(1).divide(getPPGainMulti()).minus(1))));
  if (next.lt(1e100)) {next = nd(1e100)}
  return next;
}
function getPPBoost() {return nd(user.pp.x).plus(1).log10().plus(1)}

//Unlock Data
function unlockPP() {
  let sac = user.sacrifice.pp;
  let pp = user.pp.sac;
  if (pp.gte(1)) {sc("statPPUnlocks"); s("pt0-1"); s("refundPT")} else {hc("statPPUnlocks"); h("pt0-1"); h("refundPT")}
  if (pp.gte(10)) {st("subTabPrestigeTreeb"); st("subTabPrestigeChallengesb"); s("confirmation-challenge")} else {h("subTabPrestigeTreeb"); h("subTabPrestigeChallengesb"); h("confirmation-challenge")}
  if (pp.gte(50)) {s("autoSacrificeIP")} else {h("autoSacrificeIP")}
}

//Update Data
const goalsPP = [nd(1), nd(10), nd(50)];
const goalsPPSac = [0, 0, 0];
const unlocksPP = ["Prestige Tree", "Challenges", "Automate Sacrifice"];
function updatepbpp() {
  let index = 0;
  for (let i = 0; i < goalsPP.length; i++) {if (user.pp.sac.gte(goalsPP[i]) && (user.sacrifice.pp >= goalsIPSac[i] || true)) {index = i + 1}}
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

//Reset Data
function resetPrestige() {
  if (user.automate.ip) {automateIP()}
  for (let i = 0; i < 5; i++) {
    if (user.automate.incrementP[i]) {automateIncrementP(i)}
    if (user.automate.incrementM[i]) {automateIncrementM(i)}
    if (user.automate.incrementE[i]) {automateIncrementE(i)}
  }
  user.auto.ip = 0;
  user.auto.incrementP = 0;
  user.auto.incrementM = 0;
  user.auto.incrementE = 0;
  for (let i = 0; i <= 4; i++) {
    user.increment.p[i] = 0;
    user.increment.m[i] = 0;
    user.increment.e[i] = 0;
  }
  user.scaling.p = 0;
  user.scaling.m = 0;
  user.scaling.e = 0;
  user.ip.x = getIPStart();
  user.ip.sac = getIPStart();
  user.sacrifice.ip = 0;
}

