function setUser() {
  return {
    ip: {x: nd(1), sac: nd(1), total: nd(1), highest: nd(1)},
    increment: {ip: 0, p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0], e: [0, 0, 0, 0, 0]},
    auto: {ip: 0, incrementP: 0, incrementM: 0, incrementE: 0},
    automate: {ip: false, incrementP: [false, false, false, false, false], incrementM: [false, false, false, false, false], incrementE: [false, false, false, false, false]},
    sacrifice: {ip: 0},
    scaling: {p: 0, m: 0, e: 0},
    notation: "Scientific",
    confirmation: {reset: true, sacrifice: true},
    achievements: [],
    tab: "Increment",
    timeStart: "now",
    timeLastOnline: "now",
    version: "0.2.2",
  }
}

//Data
var user = setUser();
var brokenUser = setUser();
const updateRate = 20;
var infinite = ndn(1, 100);
const maxTicks = 100000;
const tickSpeed = 50;
const showInfinite = true;

//Unlock Data
function unlocking() {unlockIP(); unlockAutomation(); unlockSacrifice(); unlockAchievement()}
const goalsIP = [nd(1000), nd(2500), nd(10000), nd(50000), nd(250000), nd(1e6), nd(5e9), nd(1e13), nd(5e15), nd(1e21), nd(2.5e21), nd(7.5e21), nd(3.33e33), nd(5e37), nd(1e44), nd(2.25e45), nd(1e58), nd(8.7e87), nd(1e88), nd(1e100)];
const goalsIPSac = [0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 5, 6, 7, 7, 8, 10, 10, 11];
const unlocksIP = ["Variable P<sub>1</sub>", "Automate IP", "Variable P<sub>2</sub>", "Variable P<sub>3</sub>", "Automate P", "Variable P<sub>4</sub>", "Variable M<sub>1</sub>", "Variable M<sub>2</sub>", "Variable M<sub>3</sub>", "Automate M", "Scaling P", "Variable M<sub>4</sub>", "Variable E<sub>1</sub>", "Variable E<sub>2</sub>", "Scaling M", "Variable E<sub>3</sub>", "Variable E<sub>4</sub>", "Automate E", "Scaling E", "End Game"];
function unlockIP() {
  let sac = user.ip.sac;
  let ip = user.sacrifice.ip;
  if (sac.gte(1000)) {sc("incrementP1Unlocks")} else {hc("incrementP1Unlocks")}
  if (sac.gte(2500) || ip >= 1) {st("tabAutomationb")} else {h("tabAutomationb")}
  if (sac.gte(2500)) {s("autoIP")} else {h("autoIP")}
  if (sac.gte(10000)) {sc("incrementP2Unlocks")} else {hc("incrementP2Unlocks")}
  if (sac.gte(50000)) {sc("incrementP3Unlocks")} else {hc("incrementP3Unlocks")}
  if (sac.gte(250000)) {s("autoP")} else {h("autoP")}
  if (sac.gte(1e6)) {sc("incrementP4Unlocks")} else {hc("incrementP4Unlocks")}
  if (sac.gte(1e7) || ip >= 1) {st("tabSacrificeb")} else {h("tabSacrificeb")}
  if (sac.gte(5e9) && ip >= 1) {sc("incrementM1Unlocks")} else {hc("incrementM1Unlocks")}
  if (sac.gte(1e13) && ip >= 2) {sc("incrementM2Unlocks")} else {hc("incrementM2Unlocks")}
  if (sac.gte(5e15) && ip >= 2) {sc("incrementM3Unlocks")} else {hc("incrementM3Unlocks")}
  if (sac.gte(1e21) && ip >= 3) {s("autoM")} else {h("autoM")}
  if ((sac.gte(2.5e21) && ip >= 3) || ip >= 4) {st("tabScalingb")} else {h("tabScalingb")}
  if (sac.gte(2.5e21) && ip >= 3) {s("scalingP")} else {h("scalingP")}
  if (sac.gte(7.5e21) && ip >= 3) {sc("incrementM4Unlocks")} else {hc("incrementM4Unlocks")}
  if (sac.gte(3.33e33) && ip >= 5) {sc("incrementE1Unlocks")} else {hc("incrementE1Unlocks")}
  if (sac.gte(5e37) && ip >= 6) {sc("incrementE2Unlocks")} else {hc("incrementE2Unlocks")}
  if (sac.gte(1e44) && ip >= 7) {s("scalingM")} else {h("scalingM")}
  if (sac.gte(2.25e45) && ip >= 7) {sc("incrementE3Unlocks")} else {hc("incrementE3Unlocks")}
  if (sac.gte(1e58) && ip >= 8) {sc("incrementE4Unlocks")} else {hc("incrementE4Unlocks")}
  if (sac.gte(8.7e87) && ip >= 10) {s("autoE")} else {h("autoE")}
  if (sac.gte(1e88) && ip >= 10) {s("scalingE")} else {h("scalingE")}
}

//Manipulate Data
function simulateTime(ms) {
  let seconds = ms / 1000;
  if (seconds > 100000) {seconds = 100000}
  secondsDone = 0;
  for (secondsDone = 0; secondsDone < seconds; secondsDone++) {
    passiveTick(1000 / tickSpeed);
    automationTick(10);
  }
  
  /*let ticks = ms / tickSpeed;
  if (ticks > maxTicks) {ticks = maxTicks}
  let ticksDone = 0;
  for (ticksDone = 0; ticksDone < ticks; ticksDone++) {
    passiveTick();
    if ((ticksDone / 2) == Math.floor(ticksDone / 2)) {automationTick()}
  }*/
}
function passiveTick(ticks) {
  if (typeof ticks == "undefined") {ticks = 1}
  if (user.automate.ip) {increment(getAutomateIPBulk().times(ticks))}
}

//Update Data
function updateip() {
  d("ipx").textContent = e(user.ip.x);
  if (user.automate.ip) {d("ipSecx").textContent = e(getIncrementx(getAutoIPx()))}
  else {d("ipSecx").textContent = e(nd(0))}
}
function updateTab(str) {
  if (str == "Options") {
    
  }
  else if (str == "Achievements") {
    updateAchievement("ach1-6");
  }
  else if (str == "Statistics") {
    updateStatistics();
  }
  else if (str == "Automation") {
    updateAutoIP();
    updateAutoIncrementP();
    updateAutoIncrementM();
    updateAutoIncrementE();
  }
  else if (str == "Sacrifice") {
    updateSacrificeIP();
  }
  else if (str == "Scaling") {
    updateScalingP();
    updateScalingM();
    updateScalingE();
  }
  else if (str == "Increment") {
    for (let i = 0; i < 5; i++) {
      updateIncrementP(i);
      updateIncrementM(i);
      updateIncrementE(i);
    }
    updateCoefficientP();
    updateCoefficientM();
    updateCoefficientE();
    updateEquationIP();
  }
}

//Initialization
var setBrokenUser = true;
if (user.timeStart === "now") {user.timeStart = Date.now()}
load();
setBrokenUser = true;
updater();

initiateAutomation();

updateConfirmations();
d("version").textContent = "Version " + user.version;
