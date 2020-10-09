//Buttons
function confirmSacrificeIP() {
  if (user.confirmation.sacrifice) {alertify.confirm("Are you sure you want to sacrifice?", () => {sacrificeIP()})}
  else {sacrificeIP()}
}
function sacrificeIP() {
  let cost = getSacrificeIPCost();
  if (user.ip.sac.gte(cost) && cost.lt(infinite) && !isNaN(cost)) {
    user.sacrifice.ip++;
    resetSacrificeIP();
    unlockIP();
    unlockAutomation();
    unlockSacrifice();
  }
  else {
    setTimeout(() => {
      alertify.confirm("You will not earn any bonus. Do you want to continue?", () => {
        resetSacrificeIP();
        unlockIP();
        unlockAutomation();
        unlockSacrifice();
      });
    }, 1);
  }
}
//Get Data
function getSacrificeIPP() {
  let multi = 1;
  if (user.pt["pt1-2"]) {multi *= getPrestigeTreex("pt1-2").divide(100).plus(1)}
  if (user.sacrifice.ip >= 1) {return nd(100).times(nd(user.sacrifice.ip / 25 + 1).log10()).plus(1).times(multi).floor()}
  else {return nd(1)}
}
function getSacrificeIPM() {
  let multi = 1;
  if (user.pt["pt1-2"]) {multi *= getPrestigeTreex("pt1-2").divide(100).plus(1)}
  if (user.sacrifice.ip >= 3) {return nd(100).times(nd((Math.max(2, user.sacrifice.ip) - 2) / 30 + 1).log10()).plus(1).times(multi).floor()}
  else {return nd(1)}
}
function getSacrificeIPE() {
  let multi = 1;
  if (user.achievements.includes("ach2-4")) {multi *= 1.06}
  if (user.sacrifice.ip >= 7) {return nd((Math.max(6, user.sacrifice.ip) - 6) / 4.2 + 1).log10().times(multi).plus(1)}
  else {return nd(1)}
}
let sacIPCost = ["1e7", "2e12", "9e17", "6.4e23", "1e28", "7e35", "8.2e41", "1e53", "1e69", "1e78", "1e92", "End"];

function getSacrificeIPCost() {
  return nd(sacIPCost[user.sacrifice.ip]);
  
  /*let cost = nd(1e7).times(nd(1e5).times(user.sacrifice.ip + 1).pow(user.sacrifice.ip)).round();
  if (user.sacrifice.ip >= 10) {cost = nd(333).pow(nd(1.429).pow(user.sacrifice.ip))}
  else if (user.sacrifice.ip >= 7) {cost = nd(1e7).times(nd(1e5).times(user.sacrifice.ip + 1.85).pow(user.sacrifice.ip + 0.85)).round()}
  return cost;*/
}

function getSacrificePPCost() {
  let cost = nd(10).pow(1000);
  return cost;
}

//Update Date
function updateSacrificeIP() {
  let cost = getSacrificeIPCost();
  if ((cost.gte(infinite) && showInfinite) || isNaN(cost)) {d("sacrificeIPCost").textContent = "Infinite"; rpc("canBuy", "cantBuy", "sacrificeIP")}
  else if (user.ip.sac.lt(cost)) {d("sacrificeIPCost").textContent = e(cost.minus(user.ip.sac)); rpc("canBuy", "cantBuy", "sacrificeIP")}
  else {d("sacrificeIPCost").textContent = 0; rpc("cantBuy", "canBuy", "sacrificeIP")}
  d("sacrificeIPP").textContent = e(getSacrificeIPP());
  d("sacrificeIPM").textContent = e(getSacrificeIPM());
  d("sacrificeIPE").textContent = e(getSacrificeIPE(), 2, 2);
  if (user.sacrifice.ip == 6) {d("sacrificeIPUnlock").textContent = "E Multiplier"}
  else if (user.sacrifice.ip == 4) {d("sacrificeIPUnlock").textContent = "Variable E"}
  else if (user.sacrifice.ip == 2) {d("sacrificeIPUnlock").textContent = "M Multiplier"}
  else if (user.sacrifice.ip == 0) {d("sacrificeIPUnlock").textContent = "Variable M, P Multiplier"}
  else {d("sacrificeIPUnlock").textContent = "Nothing"}
}

//Unlock Data
function unlockSacrifice() {
  let ip = user.sacrifice.ip;
  if (ip >= 1) {s("sacrificeIPPUnlock"); sc("incrementM0Unlocks"); sc("coefficientP")} else {h("sacrificeIPPUnlock"); hc("incrementM0Unlocks"); hc("coefficientP")}
  if (ip >= 3) {s("sacrificeIPMUnlock"); sc("coefficientM")} else {h("sacrificeIPMUnlock"); hc("coefficientM")}
  if (ip >= 5) {sc("incrementE0Unlocks")} else {hc("incrementE0Unlocks")}
  if (ip >= 7) {s("sacrificeIPEUnlock"); sc("coefficientE")} else {h("sacrificeIPEUnlock"); hc("coefficientE")}
}
