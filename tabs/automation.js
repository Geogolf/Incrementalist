
//Buttons
function buyAutomationIP() {
  let cost = getAutoIPCost();
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.auto.ip++;
    /*if (user.automate.ip) {automateIP(); automateIP()}*/
    unlockAutomation();
  }
}
function automateIP() {
  user.automate.ip = !user.automate.ip;
  /*runAutomationIP();*/
  updateAutomateIP();
}
function buyAutomationIncrementP() {
  let cost = getAutoIncrementPCost();
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.auto.incrementP++;
    /*for (let i = 0; i <= 4; i++) {if (user.automate.incrementP[i]) {automateIncrementP(i); automateIncrementP(i)}}*/
    unlockAutomation();
  }
}
function automateIncrementP(n) {
  user.automate.incrementP[n] = !user.automate.incrementP[n];
  /*runAutomationIncrementP(n);*/
  updateAutomateIncrementP(n);
}
function buyAutomationIncrementM() {
  let cost = getAutoIncrementMCost();
  if (user.ip.x.gte(cost)) {
    user.ip.x = user.ip.x.minus(cost);
    user.auto.incrementM++;
    /*for (let i = 0; i <= 4; i++) {if (user.automate.incrementM[i]) {automateIncrementM(i); automateIncrementM(i)}}*/
    unlockAutomation();
  }
}
function automateIncrementM(n) {
  user.automate.incrementM[n] = !user.automate.incrementM[n];
  /*runAutomationIncrementM(n);*/
  updateAutomateIncrementM(n);
}
function buyAutomationIncrementE() {
  let cost = getAutoIncrementECost();
  if (user.ip.x.gte(cost)) {
    user.ip.x = user.ip.x.minus(cost);
    user.auto.incrementE++;
    /*for (let i = 0; i <= 4; i++) {if (user.automate.incrementE[i]) {automateIncrementE(i); automateIncrementE(i)}}*/
    unlockAutomation();
  }
}
function automateIncrementE(n) {
  user.automate.incrementE[n] = !user.automate.incrementE[n];
  /*runAutomationIncrementE(n);*/
  updateAutomateIncrementE(n);
}

//Automation Functions
function automationTick(ticks) {
  if (typeof ticks == "undefined") {ticks = 1}
  for (let n = 4; n >= 0; n--) {
    if (user.automate.incrementP[n]) {
      let ratio = getIncrementPRatio(n);
      let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1, ratio, user.increment.p[n]);
      let bulk = getAutoIncrementPBulk().times(ticks);
      let buy = nd(0);
      if (canBuy.gte(bulk)) {buy = bulk}
      else {buy = canBuy}
      let buyCost = Decimal.sumGeometricSeries(buy, 1, ratio, user.increment.p[n]);
      if (buyCost.gte(infinite)) {
        buy = Decimal.affordGeometricSeries(infinite, 1, ratio, user.increment.p[n]);
        buyCost = Decimal.sumGeometricSeries(buy, 1, ratio, user.increment.p[n]);
      }
      user.ip.x = user.ip.x.minus(buyCost);
      user.increment.p[n] += buy.toNumber();
    }
    if (user.automate.incrementM[n]) {
      let ratio = getIncrementMRatio(n);
      let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1e7, ratio, user.increment.m[n]);
      let bulk = getAutoIncrementMBulk().times(ticks);
      let buy = nd(0);
      if (canBuy.gte(bulk)) {buy = bulk}
      else {buy = canBuy}
      let buyCost = Decimal.sumGeometricSeries(buy, 1e7, ratio, user.increment.m[n]);
      if (buyCost.gte(infinite)) {
        buy = Decimal.affordGeometricSeries(infinite, 1e7, ratio, user.increment.m[n]);
        buyCost = Decimal.sumGeometricSeries(buy, 1e7, ratio, user.increment.m[n]);
      }
      user.ip.x = user.ip.x.minus(buyCost);
      user.increment.m[n] += buy.toNumber();
    }
    if (user.automate.incrementE[n]) {
      let ratio = getIncrementERatio(n);
      let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1e30, ratio, user.increment.e[n]);
      let bulk = getAutoIncrementEBulk().times(ticks);
      let buy = nd(0);
      if (canBuy.gte(bulk)) {buy = bulk}
      else {buy = canBuy}
      let buyCost = Decimal.sumGeometricSeries(buy, 1e30, ratio, user.increment.e[n]);
      if (buyCost.gte(infinite)) {
        buy = Decimal.affordGeometricSeries(infinite, 1e30, ratio, user.increment.e[n]);
        buyCost = Decimal.sumGeometricSeries(buy, 1e30, ratio, user.increment.e[n]);
      }
      user.ip.x = user.ip.x.minus(buyCost);
      user.increment.e[n] += buy.toNumber();
    }
  }
}
function initiateAutomation() {
  setInterval(() => {automationTick()}, 100);
  setInterval(() => {passiveTick()}, tickSpeed);
}

var automatingIP = false;
function runAutomationIP() {
  if (!automatingIP) {
    automatingIP = setInterval(() => {
      if (user.automate.ip) {
        increment(getAutomateIPBulk());
      }
    }, (1000 / updateRate));
  }
  else {clearInterval(automatingIP); automatingIP = false}
}

//Get Data
function getAutoIPx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  if (user.achievements.includes("ach2-3")) {multi *= 10}
  if (user.pt["pt1-1"]) {multi *= getPrestigeTreex("pt1-1")}
  return nd(user.auto.ip * multi);
}
let autoIPScalings = [
  {bought: 0, cost: "1000", type: "m", effect: 10},
  {bought: 30, cost: "1e33", type: "e", effect: 1.1},
  {bought: 42, cost: "3.7e103", type: "e", effect: 1.2},
];
function getAutoIPCost() {
  let index = 0;
  for (let i = 0; i < autoIPScalings.length; i++) {if (user.auto.ip >= autoIPScalings[i].bought) {index = i}}
  if (autoIPScalings[index].type === "m") {return nd(autoIPScalings[index].cost).times(Math.pow(autoIPScalings[index].effect, user.auto.ip - autoIPScalings[index].bought)).round()}
  if (autoIPScalings[index].type === "e") {return nd(autoIPScalings[index].cost).pow(Math.pow(autoIPScalings[index].effect, user.auto.ip - autoIPScalings[index].bought))}
  
  /*let cost = nd(0);
  if (user.auto.ip >= 42) {cost = nd(1e100).pow(Math.pow(1.2, user.auto.ip - 42))}
  else if (user.auto.ip >= 30) {cost = nd(1e33).pow(Math.pow(1.1, user.auto.ip - 30))}
  else {cost = nd(1000).times(Math.pow(10, user.auto.ip)).round()}
  return cost;*/
}
function getAutomateIPBulk() {return getAutoIPx().divide(updateRate)}
function getAutoIncrementPx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  if (user.pt["pt1-1"]) {multi *= getPrestigeTreex("pt1-1")}
  return nd(user.auto.incrementP * 10 * multi).floor();
}
function getAutoIncrementPBulk() {return getAutoIncrementPx().divide(10).floor()}
let autoIncPScalings = [
  {bought: 0, cost: "100000", type: "m", effect: 100-1},
  {bought: 14, cost: "1e33", type: "e", effect: 1.25-1},
  {bought: 19, cost: "5.11e100", type: "e", effect: 1.5-1},
];
function getAutoIncrementPCost() {
  let index = 0;
  for (let i = 0; i < autoIncPScalings.length; i++) {if (user.auto.incrementP >= autoIncPScalings[i].bought) {index = i}}
  let scale = nd(1);
  if (user.pt["pt2-3"]) {scale = scale.times(getScalingP())}
  if (autoIncPScalings[index].type == "m") {return nd(autoIncPScalings[index].cost).times(nd(autoIncPScalings[index].effect).times(scale).plus(1).pow(user.auto.incrementP - autoIncPScalings[index].bought)).round()}
  if (autoIncPScalings[index].type == "e") {return nd(autoIncPScalings[index].cost).pow(nd(autoIncPScalings[index].effect).times(scale).plus(1).pow(user.auto.incrementP - autoIncPScalings[index].bought))}
  
  /*let cost = nd(100000).times(Math.pow(100, user.auto.incrementP)).round();
  if (user.auto.incrementP > 14) {cost = nd(1e33).pow(Math.pow(1.25, user.auto.incrementP - 14)))}
  return cost;*/
}
function getAutoIncrementMx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  if (user.pt["pt1-1"]) {multi *= getPrestigeTreex("pt1-1")}
  return nd(user.auto.incrementM * 10 * multi).floor();
}
function getAutoIncrementMBulk() {return getAutoIncrementMx().divide(10).floor()}
let autoIncMScalings = [
  {bought: 0, cost: "1e20", type: "m", effect: 100000-1},
  {bought: 2, cost: "1e33", type: "e", effect: 1.5-1},
  {bought: 5, cost: "2.37e111", type: "e", effect: 2-1},
];
function getAutoIncrementMCost() {
  let index = 0;
  for (let i = 0; i < autoIncMScalings.length; i++) {if (user.auto.incrementM >= autoIncMScalings[i].bought) {index = i}}
  let scale = nd(1);
  if (user.pt["pt2-3"]) {scale = scale.times(getScalingM())}
  if (autoIncMScalings[index].type == "m") {return nd(autoIncMScalings[index].cost).times(nd(autoIncMScalings[index].effect).times(scale).plus(1).pow(user.auto.incrementM - autoIncMScalings[index].bought)).round()}
  if (autoIncMScalings[index].type == "e") {return nd(autoIncMScalings[index].cost).pow(nd(autoIncMScalings[index].effect).times(scale).plus(1).pow(user.auto.incrementM - autoIncMScalings[index].bought))}
  
  /*let cost = nd(1e20).times(nd(100000).pow(user.auto.incrementM));
  if (user.auto.incrementM > 2) {return nd(1e33).pow(nd(1.5).pow(user.auto.incrementM - 2))}
  return cost;*/
}
function getAutoIncrementEx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  if (user.pt["pt1-1"]) {multi *= getPrestigeTreex("pt1-1")}
  return nd(user.auto.incrementE * 10 * multi).floor();
}
function getAutoIncrementEBulk() {return getAutoIncrementEx().divide(10).floor()}
let autoIncEScalings = [
  {bought: 0, cost: "1e84", type: "e", effect: 2-1},
  {bought: 1, cost: "1e170", type: "e", effect: 3-1},
];
function getAutoIncrementECost() {
  let index = 0;
  for (let i = 0; i < autoIncEScalings.length; i++) {if (user.auto.incrementE >= autoIncEScalings[i].bought) {index = i}}
  let scale = nd(1);
  if (user.pt["pt2-3"]) {scale = scale.times(getScalingE())}
  if (autoIncEScalings[index].type == "e") {return nd(autoIncEScalings[index].cost).pow(nd(autoIncEScalings[index].effect).times(scale).plus(1).pow(user.auto.incrementE - autoIncEScalings[index].bought))}
}

//Update Data
function updateAutoIP() {
  let cost = getAutoIPCost();
  if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "autoIPb")}
  else {rpc("cantBuy", "canBuy", "autoIPb")}
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("autoIPx").textContent = e(getAutoIPx());
  d("autoIPCost").textContent = e(cost);
}
function updateAutomateIP() {
  if (user.automate.ip) {d("autoIPState").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIPState").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutoIncrementP() {
  let cost = getAutoIncrementPCost();
  if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "autoPb")}
  else {rpc("cantBuy", "canBuy", "autoPb")}
  if ((cost.gte(infinite) && showInfinite)) {cost = "Infinite"}
  d("autoPx").textContent = e(getAutoIncrementPx());
  d("autoPCost").textContent = e(cost);
}
function updateAutomateIncrementP(n) {
  if (user.automate.incrementP[n]) {d("autoIncrementP" + n + "State").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIncrementP" + n + "State").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutoIncrementM() {
  let cost = getAutoIncrementMCost();
  if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "autoMb")}
  else {rpc("cantBuy", "canBuy", "autoMb")}
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("autoMx").textContent = e(getAutoIncrementMx());
  d("autoMCost").textContent = e(cost);
}
function updateAutomateIncrementM(n) {
  if (user.automate.incrementM[n]) {d("autoIncrementM" + n + "State").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIncrementM" + n + "State").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutoIncrementE() {
  let cost = getAutoIncrementECost();
  if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "autoEb")}
  else {rpc("cantBuy", "canBuy", "autoEb")}
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("autoEx").textContent = e(getAutoIncrementEx());
  d("autoECost").textContent = e(cost);
}
function updateAutomateIncrementE(n) {
  if (user.automate.incrementE[n]) {d("autoIncrementE" + n + "State").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIncrementE" + n + "State").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutomates() {
  updateAutomateIP();
  for (let i = 0; i <= 4; i++) {
    updateAutomateIncrementP(i);
    updateAutomateIncrementM(i);
    updateAutomateIncrementE(i);
  }
}

//Unlock Data
function unlockAutomation() {
  if (user.auto.ip >= 1) {s("autoIPState")} else {h("autoIPState")}
  if (user.auto.incrementP >= 1) {sc("autoIncrementPUnlocks")} else {hc("autoIncrementPUnlocks")}
  if (user.auto.incrementM >= 1) {sc("autoIncrementMUnlocks")} else {hc("autoIncrementMUnlocks")}
  if (user.auto.incrementE >= 1) {sc("autoIncrementEUnlocks")} else {hc("autoIncrementEUnlocks")}
}
