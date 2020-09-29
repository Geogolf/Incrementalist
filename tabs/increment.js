//Buttons
function clickIncrement() {
  if (user.achievements.includes("ach1-6")) {increment(getAchievementReward("ach1-6"))}
  else {increment(1)}
  user.increment.ip++;
}
function increment(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  let gain = getIncrementx(bulk);
  user.ip.x = user.ip.x.plus(gain);
  user.ip.sac = user.ip.sac.plus(gain);
  user.ip.total = user.ip.total.plus(gain);
  if (user.ip.x.gt(user.ip.highest)) {user.ip.highest = user.ip.x}
  unlockIP();
}
function buyIncrementP(n) {
  let cost = getIncrementPCost(n);
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.p[n]++;
  }
}
function buyIncrementM(n) {
  let cost = getIncrementMCost(n);
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.m[n]++;
  }
}
function buyIncrementE(n) {
  let cost = getIncrementECost(n);
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.increment.e[n]++;
  }
}

//Get Data
function getIncrementx(bulk) {
  if (typeof bulk == "undefined") {bulk = 1}
  let pn = -1;
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
  return p.times(m).pow(E).times(bulk);
}
function getIncrementP(n) {return nd(n + 1).pow(nd(n)).times(user.increment.p[n])}
function getIncrementPCost(n) {
  if (user.achievements.includes("ach2-1")) {return nd(1).plus(nd(0.125).times(Math.pow(2, n)).times(nd(0.75).pow(nd(Math.pow(user.scaling.p, 4.2) + 1).log10()).divide(5))).pow(user.increment.p[n]).round()}
  else {return nd(1).plus(nd(0.125).times(Math.pow(2, n)).times(nd(0.75).pow(nd(Math.pow(user.scaling.p, 4.2) + 1).log10()))).pow(user.increment.p[n]).round()}
}
function getIncrementPRatio(n) {
  if (user.achievements.includes("ach2-1")) {return nd(1).plus(nd(0.125).times(Math.pow(2, n)).times(nd(0.75).pow(nd(Math.pow(user.scaling.p, 4.2) + 1).log10()).divide(5)))}
  else {return nd(1).plus(nd(0.125).times(Math.pow(2, n)).times(nd(0.75).pow(nd(Math.pow(user.scaling.p, 4.2) + 1).log10())))}
}
function getIncrementM(n) {return nd(Math.pow(3, n)).times(user.increment.m[n]).plus(1)}
function getIncrementMCost(n) {return nd(1e7).times(nd(1).plus(nd(1).plus(0.3579).pow(n + 1).minus(1).times(nd(0.5).pow(nd(Math.pow(user.scaling.m, 1.25) + 1).log10()))).pow(user.increment.m[n]))}
function getIncrementMRatio(n) {return nd(1).plus(nd(1).plus(0.3579).pow(n + 1).minus(1).times(nd(0.5).pow(nd(Math.pow(user.scaling.m, 1.25) + 1).log10())))}
function getIncrementE(n) {return nd(user.increment.e[n] + 1).log10().divide(3.5 / (Math.sqrt(n + 1)))}
function getIncrementECost(n) {return nd(1e30).times(nd(1).plus(nd(1e30).pow(nd(n + 1).times(nd(1).divide(nd(user.scaling.e / 11.25 + 1).log10().plus(1))))).pow(user.increment.e[n]))}
function getIncrementERatio(n) {return nd(1).plus(nd(1e30).pow(nd(n + 1).times(nd(1).divide(nd(user.scaling.e / 11.25 + 1).log10().plus(1)))))}

//Update Data
function updatepbip() {
  d("pbipsac").textContent = e(user.ip.sac);
  let index = 0;
  for (let i = 0; i < goalsIP.length; i++) {if (user.ip.sac.gte(goalsIP[i]) && user.sacrifice.ip >= goalsIPSac[i]) {index = i + 1}}
  let g = goalsIP[index];
  let s = goalsIPSac[index];
  let u = unlocksIP[index];
  if (g == undefined) {g = goalsIP[index - 1]}
  if (s == undefined) {s = goalsIPSac[index - 1]}
  if (u == undefined) {u = "End Game"}
  let sacCost = getSacrificeIPCost();
  if (g.gt(sacCost)) {
    g = sacCost;
    u = "Sacrifice";
  }
  /*if (user.sacrifice.ip < s) {
    *//*if (g.lte(sacCost)) {g = goalsIP[index - 1]}*//*
    if ((s - user.sacrifice.ip) == 1) {u = "You need 1 more sacrifice"}
    else {u = "You need " + (s - user.sacrifice.ip) + " more sacrifices"}
  }*/
  d("pbipgoal").textContent = e(g);
  d("pbipunlock").innerHTML = u;
  d("pbip").style.width = user.ip.sac.divide(g).times(100) + "%";
  if (user.ip.sac.divide(g) > 1) {d("pbip").style.width = "100%"}
}
function updateEquationIP() {
  let pn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementP" + i).style.display != "none") {pn = i}}
  let p = getIncrementP(pn);
  for (let i = (pn - 1); i > -1; i--) {p = p.times(getSacrificeIPP()).plus(getIncrementP(i))}
  d("ipEquationP").textContent = e(p);
  let mn = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementM" + i).style.display != "none") {mn = i}}
  let m = getIncrementM(mn);
  for (let i = (mn - 1); i > -1; i--) {m = m.times(getSacrificeIPM()).times(getIncrementM(i))}
  d("ipEquationM").textContent = e(m);
  let En = -1;
  for (let i = 0; i < 5; i++) {if (d("incrementE" + i).style.display != "none") {En = i}}
  let E = getIncrementE(En);
  for (let i = (En - 1); i > -1; i--) {E = E.times(getSacrificeIPE()).plus(getIncrementE(i))}
  E = E.plus(1);
  d("ipEquationE").textContent = e(E, 2, 2);
  d("ipEquationResult").textContent = e(p.times(m).pow(E));
  if (user.achievements.includes("ach1-6")) {d("ipEquationClickResult").textContent = e(p.times(m).pow(E).times(getAchievementReward("ach1-6")))}
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
    if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "incrementP" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementP" + n + "b")}
    if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
    d("incrementP" + n + "x").textContent = e(getIncrementP(n));
    d("incrementP" + n + "Cost").textContent = e(cost);
  }
}
function updateIncrementM(n) {
  if (d("incrementM" + n).style.display != "none") {
    let cost = getIncrementMCost(n);
    if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "incrementM" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementM" + n + "b")}
    if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
    d("incrementM" + n + "x").textContent = e(getIncrementM(n));
    d("incrementM" + n + "Cost").textContent = e(cost);
  }
}
function updateIncrementE(n) {
  if (d("incrementE" + n).style.display != "none") {
    let cost = getIncrementECost(n);
    if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "incrementE" + n + "b")}
    else {rpc("cantBuy", "canBuy", "incrementE" + n + "b")}
    if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
    d("incrementE" + n + "x").textContent = e(getIncrementE(n), 2, 2);
    d("incrementE" + n + "Cost").textContent = e(cost);
  }
}
