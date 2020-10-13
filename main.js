function setUser() {
  return {
    ip: {x: nd(1), sac: nd(1), total: nd(1), highest: nd(1)},
    increment: {ip: 0, p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0], e: [0, 0, 0, 0, 0]},
    auto: {ip: 0, incrementP: 0, incrementM: 0, incrementE: 0, sacrificeIP: 0},
    automate: {ip: false, incrementP: [false, false, false, false, false], incrementM: [false, false, false, false, false], incrementE: [false, false, false, false, false], sacrificeIP: false},
    sacrifice: {ip: 0, pp: 0},
    scaling: {p: 0, m: 0, e: 0},
    max: {autoIP: false, autoIncrementP: false, autoIncrementM: false, autoIncrementE: false, scalingP: false, scalingM: false, scalingE: false},
    pp: {timeStart: "now", bestTime: 1e100, count: 0, x: nd(0), sac: nd(0), total: nd(0), highest: nd(0)},
    pt: {refund: false, refundAmount: nd(0), cells: []},
    challenge: {pp: ["null", {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}]},
    notation: "Scientific",
    logpb: false,
    confirmation: {reset: true, sacrifice: true, prestige: true, challenge: true},
    achievements: [],
    uiRate: 20,
    tab: "Increment",
    tabPrestige: "Tree",
    timeStart: "now",
    timeLastOnline: "now",
    version: "0.3.0",
  }
}

//Data
var user = setUser();
var brokenUser = setUser();
var updateRate = 20;

var infiniteIP = nd("1e100");
var infinitePP = nd("1e100");

const maxTicks = 100000;
const tickSpeed = 50;
const showInfinite = true;
var resetFrom = "Nothing";

//Unlock Data
function unlocking() {
  unlockAutomation();
  unlockSacrifice();
  unlockAchievement();
  unlockIP();
  unlockPP();
  unlockPT();
  unlockPPChallenge();
}

//Manipulate Data
function checkInfinite() {
  if (user.pp.count > 0) {infiniteIP = nd("1e10000")/*; inflog = 10000*/}
}
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
  if (user.automate.ip) {d("ipSecx").textContent = e(getIncrementx(getAutoIPx()).times(getPPBoost()).times(getAchievementBoost()))}
  else {d("ipSecx").textContent = e(nd(0))}
  updatepbip();
}
function updatepp() {
  d("ppx").textContent = e(user.pp.x);
  if (false) {}
  else {d("ppSecx").textContent = e(nd(0))}
  updatepbpp();
}
function updateToggles() {
  updateAutomates();
  updateOptions();
  updateRefundPT();
  updateMaxAutoIP();
  updateMaxAutoIncrementP();
  updateMaxAutoIncrementM();
  updateMaxAutoIncrementE();
  updateMaxScalingP();
  updateMaxScalingM();
  updateMaxScalingE();
}
function updateTab() {
  if (user.tab == "Options") {
    
  }
  else if (user.tab == "Achievements") {
    updateAchievements();
  }
  else if (user.tab == "Statistics") {
    updateStatistics();
  }
  else if (user.tab == "Automation") {
    updateAutoIP();
    updateAutoIncrementP();
    updateAutoIncrementM();
    updateAutoIncrementE();
    updateAutoSacrificeIP();
  }
  else if (user.tab == "Sacrifice") {
    updateSacrificeIP();
  }
  else if (user.tab == "Scaling") {
    updateScalingP();
    updateScalingM();
    updateScalingE();
  }
  else if (user.tab == "Increment") {
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
  else if (user.tab == "Prestige") {
    if (user.tabPrestige == "Tree") {
      updatePrestige();
      updatePrestigeTree();
      updateRefundPTx();
    }
    else if (user.tabPrestige == "Challenges") {
      updatePPChallenge();
    }
  }
}

//Initialization
/*setInflog();*/
var setBrokenUser = true;
if (user.timeStart === "now") {user.timeStart = Date.now()}
if (user.pp.timeStart === "now") {user.pp.timeStart = Date.now()}
load();
setBrokenUser = true;
updater();

initiateAutomation();

d("version").textContent = "Version " + user.version + " (Beta)";

function progress() {
  /*resetAll(false);
  let ip = nd(1e248);
  user.ip.x = ip;
  user.ip.sac = ip;
  user.ip.total = ip;
  user.ip.highest = ip;
  user.sacrifice.ip = 12;
  user.increment.ip = 10000;
  let pp = nd(50);
  user.pp.x = pp;
  user.pp.sac = pp;
  user.pp.total = pp;
  user.pp.highest = pp;
  user.pp.count = 25;
  for (let i = 1; i <= 6; i++) {completeAchievement("ach1-" + i, false)}
  for (let i = 1; i <= 4; i++) {completeAchievement("ach2-" + i, false)}
  for (let i = 1; i <= 4; i++) {completeAchievement("ach3-" + i, false)}
  let confirms = ["sacrifice", "prestige", "challenge"];
  for (let i = 0; i < confirms.length; i++) {user.confirmation[confirms[i]] = false}
  user.pt.cells = ["pt0-1"];
  user.challenge.pp[1].count = 1;
  user.challenge.pp[2].count = 1;
  user.challenge.pp[3].count = 1;
  infiniteIP = ndn(1, 10000);
  updateToggles();*/
}
/*progress();
unlocking();
tab("Prestige");*/
