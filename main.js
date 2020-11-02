function setUser() {
  return {
    tab: {
      main: "Increment",
      Achievements: "Normal",
      Prestige: "Tree"
    },
    options: {
      uiRate: 20,
      notation: "Scientific",
      confirmations: ["Reset", "Sacrifice", "Prestige", "Challenge"],
      logpb: false,
    },
    achievements: [],
    eggs: [],
    automation: {
      IP: {buyMax: false, bought: 0, enabled: false},
      IncrementP: {buyMax: false, bought: 0, enabled: [false, false, false, false, false]},
      IncrementM: {buyMax: false, bought: 0, enabled: [false, false, false, false, false]},
      IncrementE: {buyMax: false, bought: 0, enabled: [false, false, false, false, false]},
      IncrementT: {buyMax: false, bought: 0, enabled: [false, false, false, false, false]},
      SacrificeIP: {buyMax: false, bought: 0, enabled: false},
      Prestige: {buyMax: false, bought: 0, enabled: false, at: nd(1)}
    },
    sacrifice: {
      IP: 0,
      PP: 0
    },
    scaling: {
      P: {buyMax: false, bought: 0},
      M: {buyMax: false, bought: 0},
      E: {buyMax: false, bought: 0}
    },
    ip: {
      current: nd(1),
      sac: nd(1),
      total: nd(1),
      highest: nd(1),
      infinite: nd("1e100"),
      equationClicks: nd(0),
      increment: {
        P: {bought: [0, 0, 0, 0, 0]},
        M: {bought: [0, 0, 0, 0, 0]},
        E: {bought: [0, 0, 0, 0, 0]},
        T: {bought: [0, 0, 0, 0, 0]}
      }
    },
    pp: {
      current: nd(0),
      sac: nd(0),
      total: nd(0),
      highest: nd(0),
      infinite: nd("1e100"),
      count: 0,
      milestones: 0,
      lastGain: nd(0),
      pt: {
        refund: false,
        refundAmount: nd(0),
        cells: []
      },
      challenge: ["null", {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}]
    },
    time: {
      lastUpdate: Date.now(),
      played: 0,
      thisPrestige: 0,
      lastPrestige: 0,
      bestPrestige: 31536000000
    },
    version: "0.4.1",
    atEnd: false,
    beta: false
  }
}


//Data
var user = setUser();
var gameTimeInterval;
var resetFrom = "Nothing"; //For achievements or special conditions
var reset = "Nothing"; //For actual resetting

const updateRate = 20; //Remove unless you can figure out how to change it and not break the game
const showInfinite = true;
const layers = {
  "IP": {
    goals: [nd(1000), nd(2500), nd(10000), nd(50000), nd(250000), nd(1e6), nd(5e9), nd(1e13), nd(5e15), nd(1e21), nd(2.1e21), nd(7.5e21), nd(5e32), nd(3.7e37), nd(1e44), nd(2.25e45), nd(4e57), nd(8.5e85), nd(1e100)],
    goalsSac: [0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 5, 6, 7, 7, 8, 10, 11],
    unlocks: ["Variable P<sub>1</sub>", "Automate IP", "Variable P<sub>2</sub>", "Variable P<sub>3</sub>", "Automate P", "Variable P<sub>4</sub>", "Variable M<sub>1</sub>", "Variable M<sub>2</sub>", "Variable M<sub>3</sub>", "Automate M", "Scaling P", "Variable M<sub>4</sub>", "Variable E<sub>1</sub>", "Variable E<sub>2</sub>", "Scaling M", "Variable E<sub>3</sub>", "Variable E<sub>4</sub>", "Automate E and Scaling E", "Prestige"],
  },
  "PP": {
    goals: [nd(1), nd(10), nd(50), nd(500)],
    goalsSac: [0, 0, 0, 0],
    unlocks: ["Prestige Tree", "Challenges", "Automate Sacrifice", "Automate Prestige"]
  }
}


//Tabs
const tabs = {
  "Options": {hasSubTabs: false},
  "Achievements": {
    hasSubTabs: true,
    subTabs: {
      "Normal": {hasSubTabs: false},
      "Eggs": {hasSubTabs: false}
    }
  },
  "Statistics": {hasSubTabs: false},
  "Automation": {hasSubTabs: false},
  "Sacrifice": {hasSubTabs: false},
  "Scaling": {hasSubTabs: false},
  "Increment": {hasSubTabs: false},
  "Prestige": {
    hasSubTabs: true,
    subTabs: {
      "Milestones": {hasSubTabs: false},
      "Tree": {hasSubTabs: false},
      "Challenges": {hasSubTabs: false},
      /*"Power": {hasSubTabs: false}*/
    }
  },
  "Ascension": {hasSubTabs: false}
}
for (let tabName in tabs) {
  di("tab"+tabName+"b").addEventListener("click", () => {showTab(tabName)});
  for (let subTabName in tabs[tabName].subTabs) {
    di("subTab"+tabName+subTabName+"b").addEventListener("click", () => {showSubTab(tabName, subTabName)});
  }
}

function showTab(name) {
  user.tab.main = name;
  updateTab();
  for (names in tabs) {hideId("tab"+names)}
  showId("tab"+name);
  if (tabs[name].hasSubTabs) {showSubTab(name, user.tab[name])}
}
function showSubTab(tabName, subTabName) {
  for (let name in tabs[tabName].subTabs) {hideId("subTab"+tabName+name)}
  showId("subTab"+tabName+subTabName);
  user.tab[tabName] = subTabName;
  if (tabs[tabName].subTabs[subTabName].hasSubTabs) {}
}


//Get Data
function getIPStart() {
  if (user.achievements.includes("ach3-1")) {return getAchievementReward("ach3-1")}
  else {return nd(1)}
}
function getPPStart() {
  return nd(0);
}


//Update Data
function updatePointDisplays() {
  for (let layer in layers) {
    updatePointDisplay(layer);
  }
}
function updatePointDisplay(layer) {
  if (layer == "IP") {
    di("ipx").textContent = e("d", user.ip.current, 2, 0);
    if (user.automation.IP.enabled) {
      let multi = nd(1);
      /*if (user.pp.pt.cells.includes("pt5-2")) {multi = multi.times(getClickMulti())}*/
      di("ipSec").textContent = e("d", getEquationIPResult().times(getAutomationRate("IP")).times(multi), 2, 0);
    }
    else {di("ipSec").textContent = e("d", nd(0), 2, 0)}
  }
  if (layer == "PP") {
    di("ppx").textContent = e("d", user.pp.current, 2, 0);
    if (user.automation.Prestige.enabled) {di("ppSec").textContent = e("d", user.pp.lastGain.divide(user.time.lastPrestige/1000), 2, 0)}
    else {di("ppSec").textContent = e("d", nd(0), 2, 0)}
  }
  let index = 0;
  for (let i=0; i<layers[layer].goals.length; i++) {
    if (user[layer.toLowerCase()].sac.gte(layers[layer].goals[i]) && user.sacrifice[layer] >= layers[layer].goalsSac[i]) {
      index = i+1;
    }
  }
  let g = (typeof layers[layer].goals[index] != "undefined") ? layers[layer].goals[index] : user[layer.toLowerCase()].infinite;
  let u = (typeof layers[layer].unlocks[index] != "undefined") ? layers[layer].unlocks[index] : "Infinity";
  let cost = getSacrificeCost(layer);
  if (cost.lt(g) && !cost.eq(user[layer.toLowerCase()].infinite)) {
    g = cost;
    u = "Sacrifice";
  }
  /*if (layer == "PP" && !user.atEnd && user.pp.sac.gte(cost)) {user.atEnd = true; alertify.confirm("You have reached the end of the game. Check the discord for upcomming updates")}*/
  di("pb"+layer.toLowerCase()+"Sac").textContent = e("d", user[layer.toLowerCase()].sac, 2, 0);
  di("pb"+layer.toLowerCase()+"Goal").textContent = e("d", g, 2, 0);
  di("pb"+layer.toLowerCase()+"Unlock").innerHTML = u;
  if (g.gt(1e100) || user.options.logpb) {di("pb"+layer.toLowerCase()).style.width = nd(user[layer.toLowerCase()].sac).log10().divide(g.log10()).times(100)+"%"}
  else {di("pb"+layer.toLowerCase()).style.width = user[layer.toLowerCase()].sac.divide(g).times(100)+"%"}
  if (user[layer.toLowerCase()].sac.divide(g).gt(1)) {di("pb"+layer.toLowerCase()).style.width = "100%"}
}
/*function updateToggles() {
  for (let name in automation) {
    updateMaxAutoState(name);
    if (isArray(user.automation[name].enabled)) {for (let i=0; i<user.automation[name]/enabled.length; i++) {updateAutomationState(name, i)}}
    else {updateAutomationState(name)}
  }
}*/
function updateTab() {
  resizeCanvases();
  if (user.tab.main == "Options") {updateOptions()}
  if (user.tab.main == "Achievements") {updateAchievements()}
  if (user.tab.main == "Statistics") {updateStatistics()}
  if (user.tab.main == "Automation") {updateAutomations()}
  if (user.tab.main == "Sacrifice") {updateSacrifices()}
  if (user.tab.main == "Scaling") {updateScalings()}
  if (user.tab.main == "Increment") {updateEquationIP(); updateIncrements()}
  if (user.tab.main == "Prestige") {
    if (user.tab.Prestige == "Milestones") {updatePrestigeMilestones()}
    if (user.tab.Prestige == "Tree") {updatePrestige(); updatePrestigeTree(); updateRefundPT()}
    if (user.tab.Prestige == "Challenges") {updatePPChallenges()}
  }
  if (user.tab.main == "Ascension") {}
}

//Game Manipulation
let keys = {}
document.addEventListener("keydown", (event) => {
  keys[event.key] = true;
  if (keys["."] && keys["x"]) {giveEgg("egg1-1", true)}
  if (keys["p"] && !keys["s"]) {confirmPrestige()}
  if (keys["s"]) {
    if (keys["i"]) {confirmRunSacrifice("IP")}
    if (keys["p"] && false) {confirmRunSacrifice("PP")}
  }
});
document.addEventListener("keyup", (event) => {keys[event.key] = false});

function simulateTime(time, active) {
  showId("offlineBox");
  di("offlineTime").textContent = showTime(nd(time));
  runGameTime(true, 1);
  let ticks = Math.floor(time/1000*updateRate);
  if (ticks > 72000) {ticks = 72000}
  var userStart = JSON.parse(JSON.stringify(user));
  fixnd(userStart);
  let hides = ["IP", "PP", "PPCount"];
  for (let i=0; i<hides.length; i++) {hideId("offline"+hides[i])}
  showId("offlineLoading");
  setTimeout(() => {
    let ticksDone = 0;
    for (ticksDone=0; ticksDone<ticks; ticksDone++) {runGameTime(false, 1000/updateRate)}
    
    if (user.ip.current.gt(userStart.ip.current)) {showId("offlineIP"); di("offlineIPx").textContent = e("d", user.ip.current.minus(userStart.ip.current), 2, 0)}
    if (user.pp.current.gt(userStart.pp.current)) {showId("offlinePP"); di("offlinePPx").textContent = e("d", user.pp.current.minus(userStart.pp.current), 2, 0)}
    
    if (user.pp.count > userStart.pp.count) {showId("offlinePPCount"); di("offlinePPCountx").textContent = e("d", nd(user.pp.count-userStart.pp.count), 2, 0)}
    hideId("offlineLoading");
  }, (1000/updateRate));
}
di("offlineBox").addEventListener("click", (event) => {event.stopPropagation()});
di("closeOfflineBox").addEventListener("click", () => {hideId("offlineBox")});

let sacrificeIPTime = 0;
let prestigeTime = 0;
function runGameTime(active, time) {
  //Set time diff
  let thisUpdate = Date.now();
  if (typeof time == "undefined") {time = Math.min(thisUpdate-user.time.lastUpdate, 43200000)}
  let ticks = Math.floor(time*updateRate/1000);
  
  
  
  //Set or reset data
  if (reset == "SacrificeIP") {resetSacrificeIP()}
  if (reset == "SacrificePP") {resetSacrificePP()}
  if (reset == "Prestige") {resetPrestige()}
  for (let name in increment) {
    setIncrementResult(name);
  }
  if (user.pp.count > 0 || user.pp.total.gt(0)) {user.ip.infinite = nd("1ee6")}
  
  
  
  //Misc
  let inPPChallenge = false;
  for (let i=1; i<ppChallenge.length; i++) {if (user.pp.challenge[i].in) {inPPChallenge = true}}
  if (inPPChallenge) {showId("ppChallengeInfo")} else {hideId("ppChallengeInfo")}
  for (let i=1; i<pm.length; i++) {
    if (user.pp.count >= pm[i].req) {user.pp.milestones = i}
    else if (i == 1) {user.pp.milestones = 0}
  }
  
  
  
  //Check for achievements
  if (active) {
    let condition = false;
    for (let i=0; i<5; i++) {if (user.ip.increment.P.bought[i]) {condition = true}}
    if (condition) {giveAchievement("ach1-1", true)}
    condition = false;
    for (let name in automation) {
      if (!automation[name].array && user.automation[name].enabled) {condition = true}
      else {for (let i=0; i<5; i++) {if (user.automation[name].enabled[i]) {condition = true}}}
    }
    if (condition) {giveAchievement("ach1-2", true)}
    condition = false;
    if (user.sacrifice.IP >= 1) {giveAchievement("ach1-3", true)}
    for (let i=0; i<5; i++) {if (user.ip.increment.M.bought[i]) {condition = true}}
    if (condition) {giveAchievement("ach1-4", true)}
    condition = false;
    if (user.sacrifice.IP >= 2) {giveAchievement("ach1-5", true)}
    if (user.ip.equationClicks.gte(2500)) {giveAchievement("ach1-6", true); showId("equationClickUnlock")} else {hideId("equationClickUnlock")}
    let cost = getIncrementx("P", 1);
    if (cost.gte(1000) && getIncrementx("P", 0).gt(cost)) {giveAchievement("ach2-1", true)}
    for (let i=0; i<5; i++) {if (user.ip.increment.E.bought[i]) {condition = true}}
    if (condition) {giveAchievement("ach2-2", true)}
    condition = false;
    if (user.sacrifice.IP >= 7) {giveAchievement("ach2-3", true)}
    if (user.scaling.E.bought >= 1) {giveAchievement("ach2-4", true)}
    //ach2-5 checked in resetSacrifice("IP")
    //ach2-6 checked in resetSacrifice("IP")
    if (user.pp.count > 0 || user.pp.total.gt(0)) {giveAchievement("ach3-1", true)}
    //ach3-2 checked in resetPrestige()
    if (user.pp.challenge[1].count >= 1) {giveAchievement("ach3-3", true)}
    if (user.pp.pt.cells.includes("pt2-3")) {giveAchievement("ach3-4", true)}
    if (user.pp.milestones >= 2 && user.pp.pt.cells.includes("pt3-1") && user.pp.pt.cells.includes("pt3-4") && user.automation.Prestige.enabled) {giveAchievement("ach3-5")} //Doesn't check if you have any automation ENABLED except for auto prestige
    /*if (user.sacrifice.PP > 0) {giveAchievement("ach3-6", true)}*/
  }
  
  
  
  //Unlocks
  let names = ["P", "M", "E"];
  //Other
  if (user.pp.count > 0 || user.pp.total.gt(0)) {showId("pt0-1")} else {hideId("pt0-1")}
  for (let id in pt) {
    if (id == "pt0-1") {continue};
    let show = true;
    for (let i=0; i<pt[id].from.length; i++) {if (!user.pp.pt.cells.includes(pt[id].from[i])) {show = false}}
    if (show) {showId(id)} else {hideId(id)}
  }
  
  //General
  if (user.ip.sac.gte(layers.IP.goals[18]) && user.sacrifice.IP >= layers.IP.goalsSac[18] || user.pp.count > 0 || user.pp.total.gt(0)) {showId("ppInfo")} else {hideId("ppInfo")}
  if ((user.ip.sac.gte(layers.IP.goals[18]) && user.sacrifice.IP >= layers.IP.goalsSac[18]) || user.pp.count > 0 || user.pp.total.gt(0)) {showId("confirmationPrestige")} else {hideId("confirmationPrestige")}
  if (user.pp.count > 0 || user.pp.total.gt(0)) {showClass("statPPUnlocks"); showIdTab("subTabPrestigeMilestonesb"); showIdTab("subTabPrestigeTreeb")} else {hideClass("statPPUnlocks"); hideId("subTabPrestigeMilestonesb"); hideId("subTabPrestigeTreeb")}
  if (user.pp.sac.gte(layers.PP.goals[0])) {showId("refundPT")} else {hideId("refundPT")}
  if (user.pp.sac.gte(layers.PP.goals[1])) {showClass("ppChallenges")} else {hideClass("ppChallenges")}
  
  //Unlock Tabs
  if (user.eggs.length > 0) {showIdTab("subTabAchievementsNormalb"); showIdTab("subTabAchievementsEggsb")} else {hideId("subTabAchievementsNormalb"); hideId("subTabAchievementsEggsb")}
  if (user.pp.milestones < 5) {
    if (user.ip.sac.gte(layers.IP.goals[1]) || user.sacrifice.IP > 0 || user.pp.count > 0 || user.pp.total.gt(0)) {showIdTab("tabAutomationb")} else {hideId("tabAutomationb")}
    if (user.ip.sac.gte(sacrifice.IP.costs[0]) || user.sacrifice.IP > 0 || user.pp.count > 0 || user.pp.total.gt(0)) {showIdTab("tabSacrificeb")} else {hideId("tabSacrificeb")}
    if ((user.ip.sac.gte(layers.IP.goals[10]) && user.sacrifice.IP >= layers.IP.goalsSac[10]) || user.sacrifice.IP > layers.IP.goalsSac[10]+1 || user.pp.count > 0 || user.pp.total.gt(0)) {showIdTab("tabScalingb")} else {hideId("tabScalingb")}
  }
  else {showIdTab("tabAutomationb"); showIdTab("tabSacrificeb"); showIdTab("tabScalingb")}
  if ((user.ip.sac.gte(layers.IP.goals[18]) && user.sacrifice.IP >= layers.IP.goalsSac[18]) || user.pp.count > 0 || user.pp.total.gt(0)) {showIdTab("tabPrestigeb"); showClass("hotkeyPUnlocks")} else {hideId("tabPrestigeb"); hideClass("hotkeyPUnlocks")}
  if (user.pp.sac.gte(layers.PP.goals[1]) || user.sacrifice.PP > 0) {showId("subTabPrestigeChallengesb"); showId("confirmationChallenge")} else {hideId("subTabPrestigeChallengesb"); hideId("confirmationChallenge")}
  
  //Unlock Increments
  /*if (user.achievements.length > 0) {showClass("equationCUnlocks")} else {hideClass("equationCUnlocks")}*/
  if (user.pp.milestones < 5) {
    if (user.ip.sac.gte(layers.IP.goals[0])) {showClass("incrementP1Unlocks")} else {hideClass("incrementP1Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[2])) {showClass("incrementP2Unlocks")} else {hideClass("incrementP2Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[3])) {showClass("incrementP3Unlocks")} else {hideClass("incrementP3Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[5])) {showClass("incrementP4Unlocks")} else {hideClass("incrementP4Unlocks")}
    if (user.sacrifice.IP >= 1) {showClass("incrementM0Unlocks"); showClass("coefficientP")} else {hideClass("incrementM0Unlocks"); hideClass("coefficientP")}
    if (user.ip.sac.gte(layers.IP.goals[6]) && user.sacrifice.IP >= layers.IP.goalsSac[6]) {showClass("incrementM1Unlocks")} else {hideClass("incrementM1Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[7]) && user.sacrifice.IP >= layers.IP.goalsSac[7]) {showClass("incrementM2Unlocks")} else {hideClass("incrementM2Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[8]) && user.sacrifice.IP >= layers.IP.goalsSac[8]) {showClass("incrementM3Unlocks")} else {hideClass("incrementM3Unlocks")}
    if (user.sacrifice.IP >= 3) {showClass("coefficientM")} else {hideClass("coefficientM")}
    if (user.ip.sac.gte(layers.IP.goals[11]) && user.sacrifice.IP >= layers.IP.goalsSac[11]) {showClass("incrementM4Unlocks")} else {hideClass("incrementM4Unlocks")}
    if (user.sacrifice.IP >= 5) {showClass("incrementE0Unlocks")} else {hideClass("incrementE0Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[12]) && user.sacrifice.IP >= layers.IP.goalsSac[12]) {showClass("incrementE1Unlocks")} else {hideClass("incrementE1Unlocks")}
    if (user.sacrifice.IP >= 7) {showClass("coefficientE")} else {hideClass("coefficientE")}
    if (user.ip.sac.gte(layers.IP.goals[13]) && user.sacrifice.IP >= layers.IP.goalsSac[13]) {showClass("incrementE2Unlocks")} else {hideClass("incrementE2Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[15]) && user.sacrifice.IP >= layers.IP.goalsSac[15]) {showClass("incrementE3Unlocks")} else {hideClass("incrementE3Unlocks")}
    if (user.ip.sac.gte(layers.IP.goals[16]) && user.sacrifice.IP >= layers.IP.goalsSac[16]) {showClass("incrementE4Unlocks")} else {hideClass("incrementE4Unlocks")}
  }
  else {
    for (let i=0; i<names.length; i++) {
      for (let k=0; k<5; k++) {showClass("increment"+names[i]+k+"Unlocks")}
      showClass("coefficient"+names[i]);
    }
  }
  if (user.sacrifice.PP >= 1 && false) {showClass("incrementT0Unlocks")} else {hideClass("incrementT0Unlocks")}
  
  //Unlock Automation
  if (user.pp.milestones < 5) {
    if (user.ip.sac.gte(layers.IP.goals[1])) {showId("autoIP")} else {hideId("autoIP")}
    if (user.ip.sac.gte(layers.IP.goals[4])) {showId("autoIncrementP")} else {hideId("autoIncrementP")}
    if (user.ip.sac.gte(layers.IP.goals[9]) && user.sacrifice.IP >= layers.IP.goalsSac[9]) {showId("autoIncrementM")} else {hideId("autoIncrementM")}
    if (user.ip.sac.gte(layers.IP.goals[17]) && user.sacrifice.IP >= layers.IP.goalsSac[17]) {showId("autoIncrementE"); showId("scalingE")} else {hideId("autoIncrementE"); hideId("scalingE")}
  }
  else {
    showId("autoIP");
    for (let i=0; i<names.length; i++) {showId("autoIncrement"+names[i])}
  }
  if (user.pp.pt.cells.includes("pt2-2")) {showClass("maxAutoUnlocks")} else {hideClass("maxAutoUnlocks")}
  if (user.pp.sac.gte(layers.PP.goals[2])) {showId("autoSacrificeIP")} else {hideId("autoSacrificeIP")}
  if (user.pp.sac.gte(layers.PP.goals[3])) {showId("autoPrestige")} else {hideId("autoPrestige")}
  
  //Unlock Sacrifice
  if (user.pp.milestones < 5) {if (user.ip.sac.gte(sacrifice.IP.costs[0]) || user.sacrifice.IP > 0 || user.pp.count > 0 || user.pp.total.gt(0)) {showId("sacrificeIP"); showClass("hotkeySIUnlocks")} else {hideId("sacrificeIP"); hideClass("hotkeySIUnlocks")}}
  else {showId("sacrificeIP"); showClass("hotkeySIUnlocks")}
  if ((user.pp.sac.gte(getSacrificeCost("PP", 0)) || user.sacrifice.PP > 0) && false) {showId("sacrificePP"); showClass("hotkeySPUnlocks")} else {hideId("sacrificePP"); hideClass("hotkeySPUnlocks")}
  
  if (user.sacrifice.IP >= 1) {showId("sacrificeIPPUnlock")} else {hideId("sacrificeIPPUnlock")}
  if (user.sacrifice.IP >= 3) {showId("sacrificeIPMUnlock")} else {hideId("sacrificeIPMUnlock")}
  if (user.sacrifice.IP >= 7) {showId("sacrificeIPEUnlock")} else {hideId("sacrificeIPEUnlock")}
  
  //Unlock Scaling
  if (user.pp.milestones < 5) {
    if (user.ip.sac.gte(layers.IP.goals[10]) && user.sacrifice.IP >= layers.IP.goalsSac[10]) {showId("scalingP")} else {hideId("scalingP")}
    if (user.ip.sac.gte(layers.IP.goals[14]) && user.sacrifice.IP >= layers.IP.goalsSac[14]) {showId("scalingM")} else {hideId("scalingM")}
  }
  else {for (let i=0; i<names.length; i++) {showId("scaling"+names[i])}}
  if (user.pp.pt.cells.includes("pt2-4")) {showClass("maxScalingUnlocks")} else {hideClass("maxScalingUnlocks")}
  
  //Unlock Toggle Automation
  if (user.automation.IP.bought > 0) {showId("autoIPState")} else {hideId("autoIPState")}
  if (user.automation.IncrementP.bought > 0) {showClass("autoIncrementPUnlocks")} else {hideClass("autoIncrementPUnlocks")}
  if (user.automation.IncrementM.bought > 0) {showClass("autoIncrementMUnlocks")} else {hideClass("autoIncrementMUnlocks")}
  if (user.automation.IncrementE.bought > 0) {showClass("autoIncrementEUnlocks")} else {hideClass("autoIncrementEUnlocks")}
  if (user.automation.IncrementT.bought > 0) {showClass("autoIncrementTUnlocks")} else {hideClass("autoIncrementTUnlocks")}
  if (user.automation.SacrificeIP.bought > 0) {showId("autoSacrificeIPState")} else {hideId("autoSacrificeIPState")}
  if (user.automation.Prestige.bought > 0) {showId("autoPrestigeState")} else {hideId("autoPrestigeState")}
  
  
  
  //Run passive gain
  if (user.automation.IP.enabled) {
    let bulk = getAutomationRate("IP").divide(updateRate).times(ticks);
    let multi = nd(1);
    /*if (user.pp.pt.cells.includes("pt5-2")) {
      multi = multi.times(getClickMulti());
      user.ip.equationClicks = user.ip.equationClicks.plus(bulk);
    }*/
    giveMoney("IP", getEquationIPResult().times(multi).times(bulk));
  }
  
  
  
  //Run active gain
  //Increments P, M, and E
  for (let name in increment) {
    for (let i=4; i>=0; i--) {
      if (user.automation["Increment"+name].enabled[i] && di("incrementP"+i).style.display != "none") {
        if (increment[name].auto) {
          let ratio = getIncrementRatio(name, i);
          let canBuy = Decimal.affordGeometricSeries(user.ip.current, increment[name].baseCost, ratio, user.ip.increment[name].bought[i]);
          let bulk = getAutomationRate("Increment"+name).divide(updateRate).times(ticks);
          if (name == "E") {bulk = bulk.floor()}
          let buy;
          if (canBuy.gte(bulk)) {buy = bulk}
          else {buy = canBuy}
          let cost = Decimal.sumGeometricSeries(buy, increment[name].baseCost, ratio, user.ip.increment[name].bought[i]);
          if (cost.gte(user.ip.infinite)) {
            buy = Decimal.affordGeometricSeries(user.ip.infinite, increment[name].baseCost, ratio, user.ip.increment[name].bought[i]);
            cost = Decimal.sumGeometricSeries(buy, increment[name].baseCost, ratio, user.ip.increment[name].bought[i]);
          }
          user.ip.current = user.ip.current.minus(cost);
          user.ip.increment[name].bought[i] += buy.toNumber();
          if (user.pp.challenge[2].in && buy.gt(0)) {
            for (let k=0; k<i; k++) {
              user.ip.increment[name].bought[k] = 0;
            }
          }
        }
        else {
          /*let bulk = getAutomationRate("Increment"+name).divide(updateRate).times(ticks);
          for (let k=0; k<bulk; k++) {buyIncrement(name, i)}*/
          while (user.ip.current.gte(getIncrementCost(name, i))) {buyIncrement(name, i)}
        }
      }
    }
  }
  
  //Sacrifice
  if (user.automation.SacrificeIP.enabled) {
    let bulk = getAutomationRate("SacrificeIP").divide(updateRate).times(ticks);
    if (bulk < 1) {
      sacrificeIPTime += bulk.toNumber();
      if (sacrificeIPTime >= 1) {
        sacrificeIPTime -= 1;
        let cost = getSacrificeCost("IP");
        if (user.ip.sac.gte(cost) && cost.lt(user.ip.infinite)) {
          user.sacrifice.IP++;
          resetSacrificeIP();
        }
      }
    }
    else {
      for (let i=0; i<bulk; i++) {
        let cost = getSacrificeCost("IP");
        if (user.ip.sac.gte(cost) && cost.lt(user.ip.infinite)) {
          user.sacrifice.IP++;
          resetSacrificeIP();
        }
      }
    }
  }
  
  //Prestige
  /*if (user.automation.Prestige.enabled) {
    let bulk = getAutomationRate("Prestige").divide(updateRate).times(ticks);
    if (bulk < 1) {
      prestigeTime += bulk.toNumber();
      if (prestigeTime >= 1) {
        prestigeTime -= 1;
        let gain = getPPGain();
        if (gain.gte(user.automation.Prestige.at)) {
          giveMoney("PP", gain);
          user.pp.lastGain = gain;
          user.pp.count++;
          if (user.time.thisPrestige < user.time.bestPrestige) {user.time.bestPrestige = user.time.thisPrestige}
          user.time.lastPrestige = user.time.thisPrestige;
          user.time.thisPrestige = 0;
          if (user.pp.pt.refund) {refundPT()}
          resetPrestige();
        }
      }
    }
    else {
      for (let i=0; i<bulk; i++) {
        let gain = getPPGain();
        if (gain.gte(user.automation.Prestige.at)) {
          giveMoney("PP", gain);
          user.pp.lastGain = gain;
          user.pp.count++;
          if (user.time.thisPrestige < user.time.bestPrestige) {user.time.bestPrestige = user.time.thisPrestige}
          user.time.lastPrestige = user.time.thisPrestige;
          user.time.thisPrestige= 0;
          if (user.pp.pt.refund) {refundPT()}
          resetPrestige();
        }
      }
    }
  }*/
  if (user.automation.Prestige.enabled) {
    let bulk = getAutomationRate("Prestige").divide(updateRate).times(ticks);
    if (bulk < 1) {
      prestigeTime += bulk.toNumber();
      let gain = getPPGain();
      if (gain.gte(user.automation.Prestige.at)) {runPrestige(true); resetPrestige()}
    }
    else {
      let gain = getPPGain();
      if (gain.gte(user.automation.Prestige.at)) {runPrestige(true); resetPrestige()}
    }
  }
  
  
  
  //Updates
  //Update Non-Tab
  if (active) {
    updatePointDisplays();
    updateAutomationStates();
    if (inPPChallenge) {updatePPChallengeProgress()}
  }
  
  //Update Tab
  if (active) {updateTab()}
  
  
  
  //Reset Data
  user.time.lastUpdate = thisUpdate;
  user.time.played += time;
  user.time.thisPrestige += time;
  resetFrom = "Nothing";
  reset = "Nothing";
}

function intervals() {
  gameTimeInterval = setInterval(() => {runGameTime(true, 1000/updateRate)}, (1000/updateRate));
  setInterval(() => {if (random(1, 1e6, true) == 1) {giveEgg("egg1-4", true)}}, 1000);
  setInterval(() => {save(true)}, 60000);
}


//Initialization
document.addEventListener("unload", () => {save()});
di("loading").addEventListener("click", (event) => {event.stopPropagation()});
loadGame();
intervals();
di("version").textContent = user.version + " (Beta)";

//Temp
/*progress();*/
const hideIds = ["autoIncrementT", "tabAscensionb", "autoSacrificePPState", "apInfo", "apChallengeInfo"];
const hideClasses = ["incrementT1Unlocks", "incrementT2Unlocks", "incrementT3Unlocks", "incrementT4Unlocks"];
for (let i=0; i<hideIds.length; i++) {hideId(hideIds[i])}
for (let i=0; i<hideClasses.length; i++) {hideClass(hideClasses[i])}
