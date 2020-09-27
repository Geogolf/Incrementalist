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
/*var automatingIncrementP = [false, false, false, false, false];
function runAutomationIncrementP(n) {
  if (!automatingIncrementP[n]) {
    automatingIncrementP[n] = setInterval(() => {
      if (user.automate.incrementP[n]) {
        let ratio = getIncrementPRatio(n);
        let bulk = getAutoIncrementPBulk();
        let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1, ratio, user.increment.p[n]);
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
    }, 100);
  }
  else {clearInterval(automatingIncrementP[n]); automatingIncrementP[n] = false}
}
var automatingIncrementM = [false, false, false, false, false];
function runAutomationIncrementM(n) {
  if (!automatingIncrementM[n]) {
    automatingIncrementM[n] = setInterval(() => {
      if (user.automate.incrementM[n]) {
        let ratio = getIncrementMRatio(n);
        let bulk = getAutoIncrementMBulk();
        let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1e7, ratio, user.increment.m[n]);
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
    }, 100);
  }
  else {clearInterval(automatingIncrementM[n]); automatingIncrementM[n] = false}
}
var automatingIncrementE = [false, false, false, false, false];
function runAutomationIncrementE(n) {
  if (!automatingIncrementE[n]) {
    automatingIncrementE[n] = setInterval(() => {
      if (user.automate.incrementE[n]) {
        let ratio = getIncrementERatio(n);
        let bulk = getAutoIncrementEBulk();
        let canBuy = Decimal.affordGeometricSeries(user.ip.x, 1e30, ratio, user.increment.e[n]);
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
    }, 100);
  }
}*/

//Get Data
function getAutoIPx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  if (user.achievements.includes("ach2-3")) {multi *= 10}
  return nd(user.auto.ip).times(multi);
}
function getAutoIPCost() {
  let cost = nd(1000).times(Math.pow(10, user.auto.ip)).round();
  if (user.auto.ip > 30) {return nd(1e33).pow(Math.pow(1.1, user.auto.ip - 30))}
  return cost;
}
function getAutomateIPBulk() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  if (user.achievements.includes("ach2-3")) {multi *= 10}
  return nd(user.auto.ip * multi / updateRate);
}
function getAutoIncrementPx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  return nd(user.auto.incrementP * 10 * multi);
}
function getAutoIncrementPBulk() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  return nd(user.auto.incrementP * multi);
}
function getAutoIncrementPCost() {
  let cost = nd(100000).times(Math.pow(100, user.auto.incrementP)).round();
  /*if (user.auto.incrementP > 14) {cost = nd(1e33).pow(Math.pow(1.25, user.auto.incrementP - 14)))}*/
  if (cost.gte(1e33)) {cost = nd(1e33).pow(Math.pow(1.25, user.auto.incrementP - 14))}
  return cost;
}
function getAutoIncrementMx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  return nd(user.auto.incrementM * 10 * multi);
}
function getAutoIncrementMBulk() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  return nd(user.auto.incrementM * multi);
}
function getAutoIncrementMCost() {
  let cost = nd(1e20).times(nd(100000).pow(user.auto.incrementM));
  /*if (user.auto.incrementM > 2) {return nd(1e33).pow(nd(1.5).pow(user.auto.incrementM - 2))}*/
  if (cost.gte(1e33)) {cost = nd(1e33).pow(nd(1.5).pow(user.auto.incrementM - 2))}
  return cost;
}
function getAutoIncrementEx() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  return nd(user.auto.incrementE * 10 * multi);
}
function getAutoIncrementEBulk() {
  let multi = 1;
  if (user.achievements.includes("ach1-5")) {multi *= 2}
  return nd(user.auto.incrementE * multi);
}
function getAutoIncrementECost() {
  let cost = nd(1e87).pow(nd(2).pow(user.auto.incrementE));
  return cost;
}

//Update Data
function updateAutoIP() {
  let cost = getAutoIPCost();
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("autoIPx").textContent = e(getAutoIPx());
  d("autoIPCost").textContent = e(cost);
  if (user.ip.x.lt(cost) || cost.gte(infinite) || cost == "Infinite") {rpc("canBuy", "cantBuy", "autoIPb")}
  else {rpc("cantBuy", "canBuy", "autoIPb")}
}
function updateAutomateIP() {
  if (user.automate.ip) {d("autoIPState").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIPState").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutoIncrementP() {
  let cost = getAutoIncrementPCost();
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("autoPx").textContent = e(getAutoIncrementPx());
  d("autoPCost").textContent = e(cost);
  if (user.ip.x.lt(cost) || cost.gte(infinite) || cost == "Infinite") {rpc("canBuy", "cantBuy", "autoPb")}
  else {rpc("cantBuy", "canBuy", "autoPb")}
}
function updateAutomateIncrementP(n) {
  if (user.automate.incrementP[n]) {d("autoIncrementP" + n + "State").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIncrementP" + n + "State").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutoIncrementM() {
  let cost = getAutoIncrementMCost();
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("autoMx").textContent = e(getAutoIncrementMx());
  d("autoMCost").textContent = e(cost);
  if (user.ip.x.lt(cost) || cost.gte(infinite) || cost == "Infinite") {rpc("canBuy", "cantBuy", "autoMb")}
  else {rpc("cantBuy", "canBuy", "autoMb")}
}
function updateAutomateIncrementM(n) {
  if (user.automate.incrementM[n]) {d("autoIncrementM" + n + "State").style.borderColor = "rgb(100, 200, 50)"}
  else {d("autoIncrementM" + n + "State").style.borderColor = "rgb(220, 20, 60)"}
}
function updateAutoIncrementE() {
  let cost = getAutoIncrementECost();
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("autoEx").textContent = e(getAutoIncrementEx());
  d("autoECost").textContent = e(cost);
  if (user.ip.x.lt(cost) || cost.gte(infinite) || cost == "Infinite") {rpc("canBuy", "cantBuy", "autoEb")}
  else {rpc("cantBuy", "canBuy", "autoEb")}
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
