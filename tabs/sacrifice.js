//Data
const sacrifice = {
  IP: {
    costs: ["1e7", "1e12", "9e17", "1e25", "1e28", "7e35", "8.2e41", "1e53", "1e71", "1e78", "1e92", "1e243", "1e458", "1e832"/*, "1e2050"*/],
    unlocks: ["Variable M, P Multiplier", "Nothing", "M Multiplier", "Nothing", "Variable E", "Nothing", "E Multiplier", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing", "Nothing"/*, "Nothing"*/],
    boosts: {
      P: {dec: 0},
      M: {dec: 0},
      E: {dec: 2}
    }
  },
  PP: {
    costs: ["1e281"/*, "1e1775"*/],
    unlocks: ["Variable T"/*, "Prestige Power"*/],
    boosts: {
      C2: {dec: 2}
    }
  }
}
for (let layer in sacrifice) {
  di("sacrifice"+layer+"b").addEventListener("click", () => {confirmRunSacrifice(layer)});
}

//Buttons
function confirmRunSacrifice(layer) {
  if (user.options.confirmations.includes("Sacrifice")) {alertify.confirm("Are you sure you want to sacrifice?", () => {runSacrifice(layer)})}
  else {runSacrifice(layer)}
}
function runSacrifice(layer, dontConfirm) {
  let cost = getSacrificeCost(layer);
  if (user[layer.toLowerCase()].sac.gte(cost) && cost.lt(user[layer.toLowerCase()].infinite)) {
    resetFrom = "Sacrifice";
    user.sacrifice[layer]++;
    reset = "Sacrifice"+layer;
  }
  else if (!dontConfirm) {
    setTimeout(() => {
      alertify.confirm("You will not earn any bonus. Do you want to continue?", () => {
        reset = "Sacrifice"+layer;
      });
    }, 1);
  }
}

//Get Data
function getSacrificeCost(layer, count) {
  if (typeof count == "undefined") {count = user.sacrifice[layer]}
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
      if (user.sacrifice.IP > 0) {return nd(100).times(nd(user.sacrifice.IP*strength/25+1).log10()).plus(1).times(multi).floor()}
      else {return nd(1)}
    }
    if (boost == "M") {
      let multi = nd(1);
      let strength = nd(1);
      if (user.pp.pt.cells.includes("pt1-2")) {multi = multi.times(getPTReward("pt1-2").divide(100).plus(1))}
      if (user.pp.challenge[2].in) {strength = strength.divide(5)}
      if (user.sacrifice.IP > 2) {return nd(100).times(nd((Math.max(2, user.sacrifice.IP*strength)-2)/30+1).log10()).plus(1).times(multi).floor()}
      else {return nd(1)}
    }
    if (boost == "E") {
      let multi = nd(1);
      let strength = nd(1);
      if (user.achievements.includes("ach2-4")) {multi = multi.times(getAchievementReward("ach2-4").divide(100).plus(1))}
      if (user.pp.pt.cells.includes("pt1-2") && user.pp.pt.cells.includes("pt5-3")) {multi = multi.times(getPTReward("pt5-3").divide(100).plus(1))}
      if (user.pp.challenge[2].in) {strength = strength.divide(5)}
      if (user.sacrifice.IP > 6) {return nd((Math.max(6, user.sacrifice.IP*strength)-6)/4.2+1).log10().times(multi).plus(1)}
      else {return nd(1)}
    }
    if (boost == "T") {
      return nd(1);
    }
  }
  if (layer == "PP") {
    if (boost == "C2") {
      return nd(1.1).pow(user.sacrifice.PP);
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
  (typeof sacrifice[layer].unlocks[user.sacrifice[layer]] != "undefined") ? di("sacrifice"+layer+"Unlock").textContent = sacrifice[layer].unlocks[user.sacrifice[layer]] : di("sacrifice"+layer+"Unlock").innerHTML = "Nothing";
  let cost = getSacrificeCost(layer);
  if (cost.gte(user[layer.toLowerCase()].infinite) && showInfinite) {
    di("sacrifice"+layer+"Cost").textContent = e("d", "Infinite", 2, 0);
    replaceClass("canBuy", "cantBuy", "sacrifice"+layer+"b");
  }
  else if (user[layer.toLowerCase()].sac.lt(cost)) {
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
  if (!condition) {giveAchievement("ach2-5", true)}
  if (user.pp.milestones >= 4) {giveAchievement("ach2-6", true)}
  if (user.pp.milestones < 2) {
    for (let name in automation) {
      if (automation[name].currency == "ip") {
        if (Array.isArray(user.automation[name].enabled)) {
          for (let i=0; i<user.automation[name].enabled.length; i++) {
            if (user.automation[name].enabled[i]) {toggleAutomation(name, i)}
          }
        }
        else if (user.automation[name].enabled) {toggleAutomation(name)}
        if (user.pp.milestones < 1) {
          user.automation[name].bought = 0;
        }
      }
    }
  }
  if (user.pp.milestones < 4) {
    for (let name in increment) {
      for (let i=0; i<5; i++) {
        user.ip.increment[name].bought[i] = 0;
      }
    }
  }
  if (user.pp.milestones < 1) {
    for (let name in scaling) {
      user.scaling[name].bought = 0;
    }
  }
  if (user.pp.milestones < 3) {
    user.ip.current = getIPStart();
    user.ip.sac = getIPStart();
  }
}
function resetSacrificePP() {
  for (let name in automation) {
    if (automation[name].currency == "ip" || automation[name].currency == "pp") {
      if (Array.isArray(user.automation[name].enabled)) {
        for (let i=0; i<user.automation[name].enabled.length; i++) {
          if (user.automation[name].enabled[i]) {toggleAutomation(name, i)}
        }
      }
      else if (user.automation[name].enabled) {toggleAutomation(name)}
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
  
  user.sacrifice.IP = 0;
  refundPT();
  user.pp.pt.cells = [];
  for (let i=1; i<user.pp.challenge.length; i++) {
    user.pp.challenge[i].in = false;
    user.pp.challenge[i].count = 0;
  }
  
  user.ip.current = getIPStart();
  user.ip.sac = getIPStart();
  user.pp.current = getPPStart();
  user.pp.sac = getPPStart();
}
