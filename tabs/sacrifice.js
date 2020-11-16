//Data
const sacrifice = {
  IP: {
    costs: ["1e7", "1e12", "1e19", "1e25", "1e28", "7e35", "8.2e41", "1e53", "1e71", "1e78", "1e92", "1e243", "1e458", "1e832", "1e2098"/*, "e5e12"*/],
    unlocks: ["Variable M, P Multiplier", "Nothing", "M Multiplier", "Nothing", "Variable E", "Nothing", "E Multiplier", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing"/*, "Nothing"*/],
    boosts: {
      P: {dec: 0},
      M: {dec: 0},
      E: {dec: 3}
    }
  },
  PP: {
    costs: ["1e281", "1e1906"],
    unlocks: ["Variable T, <span class=\"ba blueText\">1</span> PP Milestone", "Variable T<sub>1</sub>"],
    boosts: {
      C2: {dec: 2}
    }
  }
}
for (let layer in sacrifice) {
  di("sacrifice"+layer+"b").addEventListener("click", () => {confirmRunSacrifice(layer); lastClicked = "sacrifice"+layer+"b"});
}

//Buttons
function confirmRunSacrifice(layer) {
  if (user.options.confirmations.includes("Sacrifice")) {alertify.confirm("Are you sure you want to sacrifice?", () => {runSacrifice(layer)})}
  else {runSacrifice(layer)}
}
function runSacrifice(layer, dontConfirm) {
  if (user.pp.challenge[5].in) {return}
  if (layer == "PP" && user.sacrifice.PP.count > 0) {alertify.alert("This feature is disabled... for now"); return}
  let cost = getSacrificeCost(layer);
  if (user[layer.toLowerCase()].sac.gte(cost) && cost.lt(user[layer.toLowerCase()].infinite)) {
    user.sacrifice[layer].count++;
    reset = "Sacrifice"+layer;
  }
  else if (!dontConfirm) {
    setTimeout(() => {
      if (user.options.confirmations.includes("Sacrifice") || layer == "PP") {
        alertify.confirm("You will not earn any bonus. Do you want to continue?", () => {
          reset = "Sacrifice"+layer;
        });
      }
      else {
        reset = "Sacrifice"+layer;
      }
    }, 1);
  }
}

//Get Data
function getSacrificeCost(layer, count) {
  if (typeof count == "undefined") {count = user.sacrifice[layer].count}
  if (typeof sacrifice[layer].costs[count] == "undefined") {return user[layer.toLowerCase()].infinite}
  let cost = nd(sacrifice[layer].costs[count]).divide(getPPChallengeReward(2));
  return cost;
}
function getSacrificeBoost(layer, boost) {
  if (layer == "IP") {
    if (boost == "P") {
      let multi = nd(1);
      let strength = nd(1);
      if (user.pp.pt.cells.includes("pt1-2")) {multi = multi.times(getPTReward("pt1-2").divide(100).plus(1))}
      if (user.pp.challenge[2].in) {strength = strength.divide(5)}
      if (user.sacrifice.IP.count > 0) {return nd(100).times(nd(user.sacrifice.IP.count*strength/25+1).log10()).plus(1).times(multi).floor()}
      else {return nd(1)}
    }
    if (boost == "M") {
      let multi = nd(1);
      let strength = nd(1);
      if (user.pp.pt.cells.includes("pt1-2")) {multi = multi.times(getPTReward("pt1-2").divide(100).plus(1))}
      if (user.pp.challenge[2].in) {strength = strength.divide(5)}
      if (user.sacrifice.IP.count > 2) {return nd(100).times(nd((Math.max(2, user.sacrifice.IP.count*strength)-2)/30+1).log10()).plus(1).times(multi).floor()}
      else {return nd(1)}
    }
    if (boost == "E") {
      let multi = nd(1);
      let strength = nd(1);
      if (user.achievements.includes("ach2-4")) {multi = multi.times(getAchievementReward("ach2-4").divide(100).plus(1))}
      if (user.pp.pt.cells.includes("pt1-2") && user.pp.pt.cells.includes("pt5-3")) {multi = multi.times(getPTReward("pt5-3").divide(100).plus(1))}
      if (user.pp.challenge[2].in) {strength = strength.divide(5)}
      if (user.sacrifice.IP.count > 6) {return nd((Math.max(6, user.sacrifice.IP.count*strength)-6)/4.2+1).log10().times(multi).plus(1)}
      else {return nd(1)}
    }
    if (boost == "T") {
      return nd(1);
    }
  }
  if (layer == "PP") {
    if (boost == "C2") {
      return nd(1.1).pow(user.sacrifice.PP.count);
    }
  }
}

//Update Data
function updateSacrifices() {
  for (let layer in sacrifice) {
    updateSacrifice(layer);
  }
}
function updateSacrifice(layer) {
  /*for (let i=0; i<sacrifice[layer].boosts.length; i++) {di("sacrifice"+layer+sacrifice[layer].boosts[i]).textContent = e("d", getSacrificeBoost(layer, sacrifice[layer].boosts[i]), 2, 2)}*/
  for (let name in sacrifice[layer].boosts) {
    di("sacrifice"+layer+name).textContent = e("d", getSacrificeBoost(layer, name), 2, sacrifice[layer].boosts[name].dec);
  }
  (typeof sacrifice[layer].unlocks[user.sacrifice[layer].count] != "undefined") ? di("sacrifice"+layer+"Unlock").innerHTML = sacrifice[layer].unlocks[user.sacrifice[layer].count] : di("sacrifice"+layer+"Unlock").innerHTML = "Nothing";
  let cost = getSacrificeCost(layer);
  /*if (cost.gte(user[layer.toLowerCase()].infinite) && showInfinite) {
    di("sacrifice"+layer+"Cost").textContent = e("d", "Infinite", 2, 0);
    replaceClass("canBuy", "cantBuy", "sacrifice"+layer+"b");
  }
  else */if (user[layer.toLowerCase()].sac.lt(cost)) {
    di("sacrifice"+layer+"Cost").textContent = e("d", cost.minus(user[layer.toLowerCase()].sac), 2, 0);
    replaceClass("canBuy", "cantBuy", "sacrifice"+layer+"b");
  }
  else {
    di("sacrifice"+layer+"Cost").textContent = nd("d", nd(0), 2, 0);
    replaceClass("cantBuy", "canBuy", "sacrifice"+layer+"b");
  }
}

//Reset Data
function resetSacrificeIP() {
  let condition = false;
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      if (user.ip.increment[name].bought[i] > 0) {condition = true}
    }
  }
  if (!condition && user.ip.sac.gte(getSacrificeCost("IP", 0))) {giveAchievement("ach2-5", true)}
  if (user.pp.milestones.count >= 4 && user.ip.sac.gte(getSacrificeCost("IP", 0))) {giveAchievement("ach2-6", true)}
  if (user.pp.milestones.count < 2) {
    for (let name in automation) {
      if (automation[name].currency == "ip") {
        for (let key in user.automation[name].enabled) {
          if (user.automation[name].enabled[key]) {toggleAutomation(name, key)}
        }
        if (user.pp.milestones.count < 1) {
          user.automation[name].bought = 0;
        }
      }
    }
  }
  if (user.pp.milestones.count < 4) {
    for (let name in increment) {
      for (let i=0; i<5; i++) {
        user.ip.increment[name].bought[i] = 0;
      }
    }
  }
  if (user.pp.milestones.count < 1) {
    for (let name in scaling) {
      user.scaling[name].bought = 0;
    }
  }
  let ipStart = getIPStart();
  if (user.pp.milestones.count < 3 || ipStart.gt(user.ip.current)) {
    user.ip.current = ipStart;
    user.ip.sac = ipStart;
  }
}
function resetSacrificePP() {
  for (let name in automation) {
    if (automation[name].currency == "ip" || automation[name].currency == "pp") {
      for (let key in user.automation[name].enabled) {
        if (user.automation[name].enabled[key]) {toggleAutomation(name, key)}
      }
      user.automation[name].bought = 0;
    }
  }
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      user.ip.increment[name].bought[i] = 0;
    }
  }
  for (let name in scaling) {
    user.scaling[name].bought = 0;
  }
  
  user.sacrifice.IP.count = 0;
  refundPT();
  user.pp.pt.cells = [];
  for (let i=1; i<user.pp.challenge.length; i++) {
    user.pp.challenge[i].in = false;
    if (user.pp.milestones.count < 6) {user.pp.challenge[i].count = 0}
  }
  user.pp.bestPPs = nd(0);
  
  user.ip.current = getIPStart();
  user.ip.sac = getIPStart();
  user.pp.current = getPPStart();
  user.pp.sac = getPPStart();
}
