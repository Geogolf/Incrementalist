//Data
di("prestige").addEventListener("click", () => {confirmPrestige()});

//Buttons
function confirmPrestige() {
  if (user.options.confirmations.includes("Prestige")) {alertify.confirm("Are you sure you want to prestige?", () => {runPrestige(true, true)})}
  else {runPrestige(true, true)}
}
function runPrestige(achCheck, warn) {
  if (user.ip.sac.gte(1e100)) {
    if (achCheck) {resetFrom = "Prestige"}
    let gain = getPPGain();
    giveMoney("PP", gain);
    user.pp.lastGain = gain;
    user.pp.count++;
    if (user.time.thisPrestige < user.time.bestPrestige) {user.time.bestPrestige = user.time.thisPrestige}
    user.time.lastPrestige = user.time.thisPrestige;
    user.time.thisPrestige = 0;
    if (user.pp.pt.refund) {refundPT()}
    reset = "Prestige";
  }
  else if (warn) {
    setTimeout(() => {
      alertify.confirm("You will not earn any PP. Do you want to continue?", () => {
        if (user.time.thisPrestige < user.time.bestPrestige) {user.time.bestPrestige = user.time.thisPrestige}
        user.time.lastPrestige = user.time.thisPrestige;
        user.time.thisPrestige = 0;
        if (user.pp.pt.refund) {refundPT()}
        reset = "Prestige";
      });
    }, 1);
  }
}
function prestige() {
  runPrestige(true, true);
  
  /*if (user.ip.sac.gte(1e100)) {
    resetFrom = "Prestige";
    let gain = getPPGain();
    giveMoney("PP", gain);
    user.pp.lastGain = gain;
    user.pp.count++;
    if (user.time.thisPrestige < user.time.bestPrestige) {user.time.bestPrestige = user.time.thisPrestige}
    user.time.lastPrestige = user.time.thisPrestige;
    user.time.thisPrestige = 0;
    if (user.pp.pt.refund) {refundPT()}
    reset = "Prestige";
  }
  else {
    setTimeout(() => {
      alertify.confirm("You will not earn any PP. Do you want to continue?", () => {
        if (user.pp.pt.refund) {refundPT()}
        reset = "Prestige";
      });
    }, 1);
  }*/
}

//Get Data
function getPPGainMulti() {
  let multi = nd(1);
  if (user.achievements.includes("ach3-2")) {multi = multi.times(getAchievementReward("ach3-2"))}
  if (user.achievements.includes("ach3-3")) {multi = multi.times(getAchievementReward("ach3-3"))}
  /*if (user.pp.pt.cells.includes("pt5-4")) {multi = multi.times(getPTReward("pt5-4"))}*/
  return multi;
}
function getPPGain() {
  let ppGainScaling = nd(1).divide(Math.log10(1.05));
  let multi = getPPGainMulti();
  let gain = ppGainScaling.times(user.ip.sac.log10().log10().divide(2).log10()).plus(1).times(multi).floor();
  if (isNaN(gain) || gain.lt(multi.floor())) {gain = nd(0)}
  return gain;
}
function getPPNext() {
  let next = nd(10).pow(nd(100).pow(nd(1.05).pow(getPPGain().plus(1).divide(getPPGainMulti()).minus(1))));
  if (next.lt(1e100)) {next = nd(1e100)}
  return next;
}
function getPPBoost() {
  let exp = nd(1);
  /*if (user.pp.pt.cells.includes("pt5-1")) {exp = exp.times(getPTReward("pt5-1"))}*/
  return nd(user.pp.current.plus(1).log10().plus(1)).pow(exp);
}

//Update Data
function updatePrestige() {
  let gain = getPPGain();
  di("ppGain").textContent = e("d", gain, 2, 0);
  if (gain.gte(100)) {hideId("ppNextText")}
  else {
    showId("ppNextText");
    let dif = getPPNext().minus(user.ip.sac);
    if (dif.gt(0)) {di("ppNext").textContent = e("d", dif, 2, 0)}
    else {di("ppNext").textContent = e("d", nd(0), 2, 0)}
  }
  di("ppBoost").textContent = e("d", getPPBoost(), 2, 2);
}

//Reset Data
function resetPrestige() {
  if (user.sacrifice.IP <= 10 && resetFrom == "Prestige") {giveAchievement("ach3-2", true)}
  if (user.pp.milestones < 2 || !user.pp.pt.cells.includes("pt3-1")) {
    for (let name in automation) {
      if (automation[name].currency == "ip") {
        if (Array.isArray(user.automation[name].enabled)) {
          for (let i=0; i<user.automation[name].enabled.length; i++) {
            if (user.automation[name].enabled[i]) {toggleAutomation(name, i)}
          }
        }
        else {
          if (user.automation[name].enabled) {toggleAutomation(name)}
        }
        if (user.pp.milestones < 1 || !user.pp.pt.cells.includes("pt3-4")) {
          user.automation[name].bought = 0;
        }
      }
    }
  }
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      user.ip.increment[name].bought[i] = 0;
    }
  }
  if (user.pp.milestones < 1 || !user.pp.pt.cells.includes("pt3-4")) {
    for (let name in scaling) {
      user.scaling[name].bought = 0;
    }
  }
  user.ip.current = getIPStart();
  user.ip.sac = getIPStart();
  user.sacrifice.IP = 0;
}
