//Refresh
var updating = false;
function updater() {
  updating = true;
  setTimeout(() => {
    updateTab();
    updateip();
    updatepp();
    let inChallenge = false;
    for (let i = 1; i < ppChallengeData.length; i++) {if (user.challenge.pp[i].in) {inChallenge = true}}
    if (inChallenge) {updatePPChallengeProgress()}
    updater();
  }, (1000 / updateRate));
}
function fixnd() {
  user.ip.x = nd(user.ip.x);
  user.ip.sac = nd(user.ip.sac);
  user.ip.total = nd(user.ip.total);
  user.ip.highest = nd(user.ip.highest);
  user.pp.x = nd(user.pp.x);
  user.pp.sac = nd(user.pp.sac);
  user.pp.total = nd(user.pp.total);
  user.pp.highest = nd(user.pp.highest);
  user.pt.refundAmount = nd(user.pt.refundAmount);
}

//Save Data
function save(notify) {
  if (typeof notify == "undefined") {notify = true}
  localStorage.setItem("user", JSON.stringify(user));
  user.timeLastOnline = Date.now();
  if (notify) {alertify.success("Game Saved")}
  if (setBrokenUser) {brokenUser = user}
}
setInterval(() => {save()}, 60000);

//Load Data
function exporty() {cb(btoa(JSON.stringify(brokenUser)))}
function importy() {alertify.prompt("Paste your save code here", "", (evt, value) => {let data = JSON.parse(atob(value)); if (data != null || data != "") {loadData(data)}}, () => {alertify.error("Canceled")})}
function load() {
  setBrokenUser = false;
  let data = JSON.parse(localStorage.getItem("user"));
  brokenUser = data;
  if (data != null) {loadData(data)}
  else {unlocking(); updater(); tab("Increment"); reveal()}
}
function loadData(data) {
  resetAll(false);
  user = data;
  if (user.version == "0.0.0") {
    console.log("Loaded version 0.0.0 -> 0.1.0");
    user.active.displaypause = false;
    user.confirm = {creset: true, csacrifice: true}
    user.version = "0.1.0";
  }
  if (user.version == "0.1.0") {
    console.log("Loaded version 0.1.0 -> 0.1.2");
    if (typeof user.sacrifice.ip.x == "undefined") {user.sacrifice.ip = user.sacrifice.ip} else {user.sacrifice.ip = user.sacrifice.ip.x}
    if (typeof user.sacrifice.pp.x == "undefined") {user.sacrifice.pp = user.sacrifice.pp} else {user.sacrifice.pp = user.sacrifice.pp.x}
    if (typeof user.sacrifice.ap.x == "undefined") {user.sacrifice.ap = user.sacrifice.ap} else {user.sacrifice.ap = user.sacrifice.ap.x}
    if (typeof user.sacrifice.tp.x == "undefined") {user.sacrifice.tp = user.sacrifice.tp} else {user.sacrifice.tp = user.sacrifice.tp.x}
    if (typeof user.sacrifice.dp.x == "undefined") {user.sacrifice.dp = user.sacrifice.dp} else {user.sacrifice.dp = user.sacrifice.dp.x}
    if (typeof user.sacrifice.gp.x == "undefined") {user.sacrifice.gp = user.sacrifice.gp} else {user.sacrifice.gp = user.sacrifice.gp.x}
    if (nd(user.ip.sac).gte(1e30) && nd(user.sacrifice.ip).gte(10000)) {sacrifice('ip')}
    user.version = "0.1.1";
  }
  if (user.version == "0.1.1") {
    console.log("Loaded version 0.1.1 -> 0.1.2");
    user.pp.extra = 0;
    user.active.aeAutomates = undefined;
    user.active.displaypause = true;
    user.version = "0.1.2";
  }
  if (user.version == "0.1.2") {
    console.log("Loaded Version 0.1.2 -> 0.2.0");
    let layers = ["pp", "ap", "tp", "dp", "gp"];
    let letters = ["p", "m", "e"];
    let tempObjs = ["auto", "scaling", "confirmation"];
    for (let i = 0; i < tempObjs.length; i++) {user[tempObjs[i]] = {}}
    if (user.automation.inc.x) {user.auto.ip = 1}
    else {user.auto.ip = 0}
    user.automate.ip = user.automate.inc.x;
    for (let i = 0; i < letters.length; i++) {
      if (user.automation.inc[letters[i]]) {user.auto["increment" + letters[i].toUpperCase()] = 1}
      else {user.auto["increment" + letters[i].toUpperCase()] = 0}
      user.automate["increment" + letters[i].toUpperCase()] = [];
      for (let k = 0; k <= 4; k++) {user.automate["increment" + letters[i].toUpperCase()][k] = user.automate.inc[letters[i]][k + 1]/*false*/}
      /*user.scaling[letters[i]] = user.scale.inc[letters[i]];*/
      user.scaling[letters[i]] = 0;
    }
    user.sacrifice.ip = 0;
    let ips = ["x", "sac", "total", "highest"];
    for (let i = 0; i < ips.length; i++) {if (nd(user.ip[ips[i]]).gte(infinite)) {user.ip[ips[i]] = infinite}}
    user.ip.total = nd(user.ip.total);
    while (user.ip.total.gte(getSacrificeIPCost())) {user.sacrifice.ip++}
    user.increment = {ip: 0, p: [0, 0, 0, 0, 0], m: [0, 0, 0, 0, 0], e: [0, 0, 0, 0, 0]}
    user.confirmation.reset = user.confirm.creset;
    user.confirmation.sacrifice = user.confirm.csacrifice;
    user.timeLastOnline = user.time;
    let tempTabs = [["auto", "Automation"], ["scale", "Scaling"], ["sac", "Sacrifice"], ["ach", "Achievements"], ["ip", "Increment"]];
    for (let i = 0; i < tempTabs.length; i++) {if (user.tab == tempTabs[i][0]) {user.tab = tempTabs[i][1]}}
    user.timeStart = Date.now();
    user.notation = "Scientific";
    user.achievements = [];
    let tempDelete = ["automation", "scale", "inc", "active", "confirm", "time"];
    for (let i = 0; i < tempDelete.length; i++) {delete user[tempDelete[i]]}
    delete user.ip.pp;
    for (let i = 0; i < layers.length; i++) {delete user[layers[i]]; delete user.sacrifice[layers[i]]}
    delete user.automate.scale;
    delete user.automate.inc;
    user.version = "0.2.0";
    /*console.log("Loaded Version " + user.version);
    let layers = ["pp", "ap", "tp", "dp", "gp"];
    delete user.ip.pp;
    for (let i = 0; i < layers.length; i++) {delete user[layers[i]]}
    user.auto = {}
    if (user.automation.inc.x) {user.auto.ip = 1}
    if (user.automation.inc.p) {user.auto.incrementP = 1} else {user.auto.incrementP = 0}
    if (user.automation.inc.m) {user.auto.incrementM = 1} else {user.auto.incrementM = 0}
    if (user.automation.inc.e) {user.auto.incrementE = 1} else {user.auto.incrementE = 0}
    delete user.automation;
    delete user.automate.scale;
    user.automate.ip = user.automate.inc.x;
    user.automate.incrementP = [];
    user.automate.incrementM = [];
    user.automate.incrementE = [];
    for (let i = 0; i <= 4; i++) {
      user.automate.incrementP[i] = user.automate.inc.p[i + 1];
      user.automate.incrementM[i] = user.automate.inc.m[i + 1];
      user.automate.incrementE[i] = user.automate.inc.e[i + 1];
    }
    delete user.automate.inc;
    user.scaling = {}
    user.scaling.p = user.scale.inc.p;
    user.scaling.m = user.scale.inc.m;
    user.scaling.e = user.scale.inc.e;
    delete user.scale;
    user.sacrifice.ip = 0;
    user.ip.total = nd(user.ip.total);
    while (user.ip.total.gte(getSacrificeIPCost())) {user.sacrifice.ip++}
    for (let i = 0; i < layers.length; i++) {delete user.sacrifice[layers[i]]}
    delete user.inc;
    user.increment = setUser().increment;
    delete user.active;
    user.confirmation = {}
    user.confirmation.reset = user.confirm.creset;
    user.confirmation.sacrifice = user.confirm.csacrifice;
    delete user.confirm;
    user.timeLastOnline = user.time;
    delete user.time;
    if (user.tab == "auto") {user.tab = "Automation"}
    if (user.tab == "scale") {user.tab = "Scaling"}
    if (user.tab == "sac") {user.tab = "Sacrifice"}
    if (user.tab == "ach") {user.tab = "Achievements"}
    if (user.tab == "ip") {user.tab = "Increment"}
    user.timeStart = Date.now();
    user.notation = "Scientific";
    user.achievements = [];
    user.version = "0.2.0";*/
  }
  if (user.version == "0.2.0") {
    console.log("Loaded Version 0.2.0");
    user.version = "0.2.1";
  }
  if (user.version == "0.2.1") {
    console.log("Loaded Version 0.2.1");
    user.pp = {}
    user.pp.count = 0;
    user.pp.x = nd(0);
    user.pp.sac = nd(0);
    user.pp.total = nd(0);
    user.pp.highest = nd(0);
    user.pt = {}
    user.pt.cells = [];
    user.sacrifice.pp = 0;
    user.version = "0.2.2";
  }
  if (user.version == "0.2.2") {
    console.log("Loaded Version 0.2.2");
    user.uiRate = 20;
    // For some reason this didn't load in 0.2.2
    user.pp = {}
    user.pp.count = 0;
    user.pp.x = nd(0);
    user.pp.sac = nd(0);
    user.pp.total = nd(0);
    user.pp.highest = nd(0);
    //
    // For some reason this didn't load in 0.2.2
    user.pt = {}
    user.pt.cells = [];
    //
    user.pp.timeStart = user.timeStart;
    user.pp.bestTime = 1e100;
    user.pt.refund = false;
    user.logpb = false;
    user.version = "0.2.3";
  }
  if (user.version == "0.2.3") {
    console.log("Loaded Version 0.2.3");
    user.max = {}
    user.max.autoIP = false;
    user.max.autoIncrementP = false;
    user.max.autoIncrementM = false;
    user.max.autoIncrementE = false;
    user.max.scalingP = false;
    user.max.scalingM = false;
    user.max.scalingE = false;
    // Due to changes in the usage of user.pt
    user.pt = {}
    user.pt.refund = false;
    user.pt.refundAmount = nd(0);
    user.pt.cells = [];
    //
    user.pt.refundAmount = 0;
    user.tabPrestige = "Tree";
    user.challenge = {}
    user.challenge.pp = ["null"];
    for (let i = 1; i <= 3; i++) {user.challenge.pp[i] = {in: false, count: 0}}
    user.confirmation.challenge = true;
    user.auto.sacrificeIP = 0;
    user.automate.sacrificeIP = false;
    user.version = "0.3.0";
  }
  if (user.version == "0.3.0") {
    console.log("Loaded Version 0.3.0");
  }
  fixnd();
  tab(user.tab);
  setNotation(user.notation);
  setUIRate(user.uiRate);
  completeAchievements();
  if (user.timeLastOnline === "now") {user.timeLastOnline = Date.now()}
  if (user.pp.timeStart === "now") {user.pp.timeStart = Date.now()}
  loadOffline();
  unlocking();
  updateToggles();
  reveal();
  if (user.version == data.version) {alertify.message("Loaded Version " + user.version)}
  else {alertify.message("Loaded Version " + data.version + "->" + user.version)}
}
function loadOffline() {
  let timeOffline = Date.now() - user.timeLastOnline;
  d("offlineTime").textContent = time(nd(timeOffline));
  if (timeOffline >= 1000) {
    setTimeout(() => {
      simulateTime(timeOffline);
    }, 1);
  }
  save(false);
  console.log("Time Offline: " + time(nd(timeOffline)));
}

//Reset Data
function confirmResetAll() {
  if (user.confirmation.reset) {
    alertify.confirm("Are you sure you want to reset? You will lose all of your previous progress!", () => {alertify.error("Game Reset"); resetAll()});
  }
  else {resetAll()}
}
function resetAll(notify) {
  if (typeof notify == "undefined") {notify = true}
  decompleteAchievements();
  user = setUser();
  user.timeStart = Date.now();
  user.pp.timeStart = Date.now();
  unlocking();
  reveal();
  save(notify);
  console.log("Game Reset");
}

//Get Reset Data
function getIPStart() {
  if (user.achievements.includes("ach3-1")) {return getAchievementReward("ach3-1")}
  else {return nd(1)}
}
