//Data
di("prestige").addEventListener("click", () => {confirmPrestige(); lastClicked = "prestige"});

//Buttons
function confirmPrestige() {
  if (user.options.confirmations.includes("Prestige")) {alertify.confirm("Are you sure you want to prestige?", () => {runPrestige(true, true)})}
  else {runPrestige(true, true)}
}
function runPrestige(achCheck, warn) {
  if (reset.includes("Prestige")) {return}
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
    if (user.options.smartAutoPrestige) {setPrestigeAt(gain)}
    reset.push("Prestige");
  }
  else if (warn) {
    setTimeout(() => {
      if (user.options.confirmations.includes("Prestige")) {
        alertify.confirm("You will not earn any PP. Do you want to continue?", () => {
          user.pp.lastGain = nd(0);
          if (user.pp.pt.refund) {refundPT()}
          reset.push("Prestige");
        });
      }
      else {
        user.pp.lastGain = nd(0);
        if (user.pp.pt.refund) {refundPT()}
        reset.push("Prestige");
      }
    }, 1);
  }
}
function prestige() {runPrestige(true, true)}

//Get Data
function getPPGainMulti() {
  let multi = nd(1);
  if (user.achievements.includes("ach3-2")) {multi = multi.times(getAchievementReward("ach3-2"))}
  if (user.achievements.includes("ach3-3")) {multi = multi.times(getAchievementReward("ach3-3"))}
  if (user.achievements.includes("ach3-6")) {multi = multi.times(getAchievementReward("ach3-6").divide(100).plus(1))}
  if (user.pp.pt.cells.includes("pt5-4")) {multi = multi.times(getPTReward("pt5-4"))}
  return multi;
}
function getPPGain() {
  let ppGainScaling = nd(1).divide(Math.log10(1.05));
  let multi = getPPGainMulti();
  let gain = ppGainScaling.times(user.ip.sac.log10().log10().divide(2).log10()).plus(1).times(multi);
  if (isNaN(gain) || gain.lt(multi)) {gain = nd(0)}
  return gain.floor();
}
function getPPNext() {
  let next = nd(10).pow(nd(100).pow(nd(1.05).pow(getPPGain().plus(1).divide(getPPGainMulti()).minus(1))));
  if (next.lt(1e100)) {next = nd(1e100)}
  return next;
}
function getPPBoost() {
  let exp = nd(1);
  if (user.pp.pt.cells.includes("pt5-1")) {exp = exp.times(getPTReward("pt5-1"))}
  return nd(user.pp.current.plus(1).log10().plus(1)).pow(exp);
}

//Update Data
function updatePrestige() {
  let gain = getPPGain();
  di("ppGain").textContent = e("d", gain, "d", 0);
  if (gain.gte(100)) {hideId("ppNextText")}
  else {
    showId("ppNextText");
    let dif = getPPNext().minus(user.ip.sac);
    if (dif.gt(0)) {di("ppNext").textContent = e("d", dif, "d", 0)}
    else {di("ppNext").textContent = e("d", nd(0), "d", 0)}
  }
  di("ppBoost").textContent = e("d", getPPBoost(), "d", 2);
}

//Reset Data
function resetPrestige() {
  if (user.sacrifice.IP.count <= 10 && resetFrom == "Prestige" && user.ip.sac.gte(1e100)) {giveAchievement("ach3-2", true)}
  if (user.sacrifice.IP.count == 0 && resetFrom == "Prestige" && user.ip.sac.gte(1e100)) {giveAchievement("ach4-4", true)}
  let condition = false;
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      if (user.ip.increment[name].bought[i] > 0) {condition = true}
    }
  }
  if (!condition && user.ip.sac.gte(1e100)) {giveAchievement("ach5-1", true)}
  if (user.pp.milestones.count < 2 || !user.pp.pt.cells.includes("pt3-1")/* || !user.pp.pt.cells.includes("pt3-4")*/ || user.pp.challenge[4].in) {
    for (let name in automation) {
      if (automation[name].currency == "ip") {
        if (user.pp.milestones.count < 2 || !user.pp.pt.cells.includes("pt3-1")) {
          for (let key in user.automation[name].enabled) {
            if (user.automation[name].enabled[key]) {toggleAutomation(name, key)}
          }
        }
        if (user.pp.milestones.count < 1 || !user.pp.pt.cells.includes("pt3-4") || user.pp.challenge[4].in) {
          user.automation[name].bought = 0;
        }
      }
    }
  }
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      user.ip.increment[name].bought[i] = (user.pp.challenge[6].in && name == "P") ? 1 : 0;
    }
  }
  if (user.pp.milestones.count < 1 || !user.pp.pt.cells.includes("pt3-4") || user.pp.challenge[4].in) {
    for (let name in scaling) {
      user.scaling[name].bought = 0;
    }
  }
  user.ip.current = getIPStart();
  user.ip.sac = getIPStart();
  if (user.pp.milestones.count < 700) {
    user.sacrifice.IP.count = 0;
  }
}
