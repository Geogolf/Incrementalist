//Buttons
function clickIncrement() {
  let multi = nd(1);
  if (user.achievements.includes("ach1-6")) {multi = multi.times(getAchievementReward("ach1-6"))}
  increment(multi);
  user.increment.ip++;
}
function increment(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  let gain = getIncrementx(bulk).times(getPPBoost()).times(getAchievementBoost());
  user.ip.x = user.ip.x.plus(gain);
  user.ip.sac = user.ip.sac.plus(gain);
  user.ip.total = user.ip.total.plus(gain);
  if (user.ip.x.gt(user.ip.highest)) {user.ip.highest = user.ip.x}
  unlockIP();
}
function buyIncrementP(n) {
  let cost = getIncrementPCost(n);
  if (user.ip.x.gte(cost) && cost.lt(infiniteIP)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.p[n]++;
    if (user.challenge.pp[2].in) {
      for (let i = 0; i < n; i++) {
        user.increment.p[i] = 0;
      }
    }
  }
}
function buyIncrementM(n) {
  let cost = getIncrementMCost(n);
  if (user.ip.x.gte(cost) && cost.lt(infiniteIP)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.m[n]++;
    if (user.challenge.pp[2].in) {
      for (let i = 0; i < n; i++) {
        user.increment.m[i] = 0;
      }
    }
  }
}
function buyIncrementE(n) {
  let cost = getIncrementECost(n);
  if (user.ip.x.gte(cost) && cost.lt(infiniteIP)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.e[n]++;
    if (user.challenge.pp[2].in) {
      for (let i = 0; i < n; i++) {
        user.increment.e[i] = 0;
      }
    }
  }
}

//Get Data
function getIncrementx(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  let pn = -1;
  let mn = -1;
  let En = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  for (let i = 0; i < 5; i++) {if (d("incrementM" + i).style.display != "none") {mn = i}}
  for (let i = 0; i < 5; i++) {if (d("incrementE" + i).style.display != "none") {En = i}}
  let p = getIncrementP(pn);
  let m = getIncrementM(mn);
  let E = getIncrementE(En);
  for (let i = (pn - 1); i > -1; i--) {p = p.times(getSacrificeIPP()).plus(getIncrementP(i))}
  for (let i = (mn - 1); i > -1; i--) {m = m.times(getSacrificeIPM()).times(getIncrementM(i))}
  for (let i = (En - 1); i > -1; i--) {E = E.times(getSacrificeIPE()).plus(getIncrementE(i))}
  E = E.plus(1);
  if (isNaN(p)) {p = nd(1)};
  if (isNaN(m)) {m = nd(1)};
  if (isNaN(E)) {E = nd(1)};
  return p.times(m).pow(E).times(bulk);
  
  
  /*let pn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  let p = getIncrementP(pn);
  for (let i = (pn - 1); i > -1; i--) {p = p.times(getSacrificeIPP()).plus(getIncrementP(i))}
  let mn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementM" + i).style.display != "none") {mn = i}}
  let m = getIncrementM(mn);
  for (let i = (mn - 1); i > -1; i--) {m = m.times(getSacrificeIPM()).times(getIncrementM(i))}
  let En = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementE" + i).style.display != "none") {En = i}}
  let E = getIncrementE(En);
  for (let i = (En - 1); i > -1; i--) {E = E.times(getSacrificeIPE()).plus(getIncrementE(i))}
  E = E.plus(1);
  return p.times(m).pow(E).times(bulk);*/
}
function getIncrementP(n) {return nd(n + 1).pow(nd(n)).times(user.increment.p[n])}
function getIncrementPCost(n) {return getIncrementPRatio(n).pow(user.increment.p[n]).round()}
function getIncrementPRatio(n) {
  let multi = 1;
  if (user.achievements.includes("ach2-1")) {multi /= 5}
  
  if (user.challenge.pp[3].in) {return nd(1).plus(nd(25).times(Math.pow(2, n)).times(getScalingP().times(multi)))}
  return nd(1).plus(nd(0.125).times(Math.pow(2, n)).times(getScalingP().times(multi)));
  
  /*if (user.achievements.includes("ach2-1")) {return nd(1).plus(nd(0.125).times(Math.pow(2, n)).times(getScalingP().divide(5)))}
  else {return nd(1).plus(nd(0.125).times(Math.pow(2, n)).times(getScalingP()))}*/
}
function getIncrementM(n) {return nd(Math.pow(3, n)).times(user.increment.m[n]).plus(1)}
function getIncrementMCost(n) {return nd(1e7).times(getIncrementMRatio(n).pow(user.increment.m[n]))}
function getIncrementMRatio(n) {
  if (user.challenge.pp[3].in) {return nd(1).plus(nd(100).pow(n + 1).minus(1).times(getScalingM()))}
  return nd(1).plus(nd(1.3579).pow(n + 1).minus(1).times(getScalingM()));
}
function getIncrementE(n) {return nd(user.increment.e[n] + 1).log10().divide(3.5 / (Math.sqrt(n + 1)))}
function getIncrementECost(n) {return nd(1e30).times(getIncrementERatio(n).pow(user.increment.e[n]))}
function getIncrementERatio(n) {
  if (user.challenge.pp[3].in) {return nd(1).plus(nd(1e100).pow(nd(n + 1).times(getScalingE())).minus(1))}
  return nd(1).plus(nd(1e30).pow(nd(n + 1).times(getScalingE())).minus(1));
}

//Unlock Data
function unlockIP() {
  let sac = user.sacrifice.ip;
  let ip = user.ip.sac;
  let pp = user.pp.sac;
  if (ip.gte(1000)) {sc("incrementP1Unlocks")} else {hc("incrementP1Unlocks")}
  if (ip.gte(2500) || sac >= 1 || pp >= 1) {st("tabAutomationb")} else {h("tabAutomationb")}
  if (ip.gte(2500) || (user.pt.cells.includes("pt2-1") && resetFrom == "Sacrifice" && !ih("autoIP"))) {s("autoIP")} else {h("autoIP")}
  if (ip.gte(10000)) {sc("incrementP2Unlocks")} else {hc("incrementP2Unlocks")}
  if (ip.gte(50000)) {sc("incrementP3Unlocks")} else {hc("incrementP3Unlocks")}
  if (ip.gte(250000) || (user.pt.cells.includes("pt2-1") && resetFrom == "Sacrifice" && !ih("autoP"))) {s("autoP")} else {h("autoP")}
  if (ip.gte(1e6)) {sc("incrementP4Unlocks")} else {hc("incrementP4Unlocks")}
  if (ip.gte(1e7) || sac >= 1 || pp >= 1) {st("tabSacrificeb")} else {h("tabSacrificeb")}
  if (ip.gte(5e9) && sac >= 1) {sc("incrementM1Unlocks")} else {hc("incrementM1Unlocks")}
  if (ip.gte(1e13) && sac >= 2) {sc("incrementM2Unlocks")} else {hc("incrementM2Unlocks")}
  if (ip.gte(5e15) && sac >= 2) {sc("incrementM3Unlocks")} else {hc("incrementM3Unlocks")}
  if ((ip.gte(1e21) && sac >= 3) || (user.pt.cells.includes("pt2-1") && resetFrom == "Sacrifice" && !ih("autoM"))) {s("autoM")} else {h("autoM")}
  if ((ip.gte(2.5e21) && sac >= 3) || sac >= 4 || pp >= 1) {st("tabScalingb")} else {h("tabScalingb")}
  if ((ip.gte(2.5e21) && sac >= 3) || (user.pt.cells.includes("pt2-5") && resetFrom == "Sacrifice" && !ih("scalingP"))) {s("scalingP")} else {h("scalingP")}
  if (ip.gte(7.5e21) && sac >= 3) {sc("incrementM4Unlocks")} else {hc("incrementM4Unlocks")}
  if (ip.gte(3.33e33) && sac >= 5) {sc("incrementE1Unlocks")} else {hc("incrementE1Unlocks")}
  if (ip.gte(3.7e37) && sac >= 6) {sc("incrementE2Unlocks")} else {hc("incrementE2Unlocks")}
  if ((ip.gte(1e44) && sac >= 7) || (user.pt.cells.includes("pt2-5") && resetFrom == "Sacrifice" && !ih("scalingM"))) {s("scalingM")} else {h("scalingM")}
  if (ip.gte(2.25e45) && sac >= 7) {sc("incrementE3Unlocks")} else {hc("incrementE3Unlocks")}
  if (ip.gte(4e57) && sac >= 8) {sc("incrementE4Unlocks")} else {hc("incrementE4Unlocks")}
  if ((ip.gte(8.5e85) && sac >= 10) || (user.pt.cells.includes("pt2-1") && resetFrom == "Sacrifice" && !ih("autoE"))) {s("autoE")} else {h("autoE")}
  if ((ip.gte(8.5e85) && sac >= 10) || (user.pt.cells.includes("pt2-5") && resetFrom == "Sacrifice" && !ih("scalingE"))) {s("scalingE")} else {h("scalingE")}
  if (ip.gte(1e100) && sac >= 11 || pp >= 1) {st("tabPrestigeb"); s("ppInfo"); s("confirmation-prestige")} else {h("tabPrestigeb"); h("ppInfo"); h("confirmation-prestige")}
}

//Update Data
const goalsIP = [nd(1000), nd(2500), nd(10000), nd(50000), nd(250000), nd(1e6), nd(5e9), nd(1e13), nd(5e15), nd(1e21), nd(2.5e21), nd(7.5e21), nd(3.33e33), nd(3.7e37), nd(1e44), nd(2.25e45), nd(4e57), nd(8.5e85), nd(1e100), nd(1e100)];
const goalsIPSac = [0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 5, 6, 7, 7, 8, 10, 11, 12];
const unlocksIP = ["Variable P<sub>1</sub>", "Automate IP", "Variable P<sub>2</sub>", "Variable P<sub>3</sub>", "Automate P", "Variable P<sub>4</sub>", "Variable M<sub>1</sub>", "Variable M<sub>2</sub>", "Variable M<sub>3</sub>", "Automate M", "Scaling P", "Variable M<sub>4</sub>", "Variable E<sub>1</sub>", "Variable E<sub>2</sub>", "Scaling M", "Variable E<sub>3</sub>", "Variable E<sub>4</sub>", "Automate E and Scaling E", "Prestige", "There's More"];
function updatepbip() {
  let index = 0;
  for (let i = 0; i < goalsIP.length; i++) {
    if (user.ip.sac.gte(goalsIP[i]) && user.sacrifice.ip >= goalsIPSac[i]) {
      index = i + 1;
    }
  }
  let g = goalsIP[index];
  let s = goalsIPSac[index];
  let u = unlocksIP[index];
  if (g == undefined) {g = goalsIP[index - 1]}
  if (s == undefined) {s = goalsIPSac[index - 1]}
  if (u == undefined) {u = "End Game"}
  let sacCost = getSacrificeIPCost();
  if (g.gt(sacCost) && !isNaN(sacCost) && !sacCost.eq(infiniteIP)) {
    g = sacCost;
    u = "Sacrifice";
  }
  d("pbipsac").textContent = e(user.ip.sac);
  d("pbipgoal").textContent = e(g);
  d("pbipunlock").innerHTML = u;
  if (g.gt(1e100) || user.logpb) {d("pbip").style.width = nd(user.ip.sac).log10().divide(g.log10()).times(100) + "%"}
  else {d("pbip").style.width = user.ip.sac.divide(g).times(100) + "%"}
  if (user.ip.sac.divide(g) > 1) {d("pbip").style.width = "100%"}
}
function updateEquationIP() {
  let pn = -1;
  let mn = -1;
  let En = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  for (let i = 0; i < 5; i++) {if (d("incrementM" + i).style.display != "none") {mn = i}}
  for (let i = 0; i < 5; i++) {if (d("incrementE" + i).style.display != "none") {En = i}}
  let p = getIncrementP(pn);
  let m = getIncrementM(mn);
  let E = getIncrementE(En);
  for (let i = (pn - 1); i > -1; i--) {p = p.times(getSacrificeIPP()).plus(getIncrementP(i))}
  for (let i = (mn - 1); i > -1; i--) {m = m.times(getSacrificeIPM()).times(getIncrementM(i))}
  for (let i = (En - 1); i > -1; i--) {E = E.times(getSacrificeIPE()).plus(getIncrementE(i))}
  E = E.plus(1);
  if (isNaN(p)) {p = nd(1)};
  if (isNaN(m)) {m = nd(1)};
  if (isNaN(E)) {E = nd(1)};
  
  d("ipEquationP").textContent = e(p);
  d("ipEquationM").textContent = e(m);
  d("ipEquationE").textContent = e(E, 2, 2);
  d("ipEquationResult").textContent = e(p.times(m).pow(E));
  if (user.achievements.includes("ach1-6")) {d("ipEquationClickResult").textContent = e(p.times(m).pow(E).times(getAchievementReward("ach1-6")).times(getPPBoost()).times(getAchievementBoost()))}
}
function updateCoefficientP() {
  let arr = dc("coefficientP");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPP())}
}
function updateCoefficientM() {
  let arr = dc("coefficientM");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPM())}
}
function updateCoefficientE() {
  let arr = dc("coefficientE");
  for (let i = 0; i < arr.length; i++) {arr[i].textContent = e(getSacrificeIPE(), 2, 2)}
}

function updateIncrementP(n) {
  if (d("incrementP" + n).style.display != "none") {
    let cost = getIncrementPCost(n);
    if (user.ip.x.lt(cost) || cost.gte(infiniteIP)) {rpc("canBuy", "cantBuy", "incrementP" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementP" + n + "b")}
    if (cost.gte(infiniteIP) && showInfinite) {cost = "Infinite"}
    d("incrementP" + n + "x").textContent = e(getIncrementP(n));
    d("incrementP" + n + "Cost").textContent = e(cost);
  }
}
function updateIncrementM(n) {
  if (d("incrementM" + n).style.display != "none") {
    let cost = getIncrementMCost(n);
    if (user.ip.x.lt(cost) || cost.gte(infiniteIP)) {rpc("canBuy", "cantBuy", "incrementM" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementM" + n + "b")}
    if (cost.gte(infiniteIP) && showInfinite) {cost = "Infinite"}
    d("incrementM" + n + "x").textContent = e(getIncrementM(n));
    d("incrementM" + n + "Cost").textContent = e(cost);
  }
}
function updateIncrementE(n) {
  if (d("incrementE" + n).style.display != "none") {
    let cost = getIncrementECost(n);
    if (user.ip.x.lt(cost) || cost.gte(infiniteIP)) {rpc("canBuy", "cantBuy", "incrementE" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementE" + n + "b")}
    if (cost.gte(infiniteIP) && showInfinite) {cost = "Infinite"}
    d("incrementE" + n + "x").textContent = e(getIncrementE(n), 2, 2);
    d("incrementE" + n + "Cost").textContent = e(cost);
  }
}
