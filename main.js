function setUser() {
  return {
    tab: {
      main: "Increment",
      Achievements: "Normal",
      Prestige: "Tree"
    },
    options: {
      decimals: 2,
      retryChallenges: false,
      changeTabOnChallenge: false,
      showOffline: true,
      notation: "Scientific",
      confirmations: ["Sacrifice", "Prestige", "Challenge"],
      logpb: false,
      uiRate: 20,
      smartAutoPrestige: false,
    },
    achievements: [],
    eggs: [],
    automation: {
      IP: {buyMax: false, bought: 0, enabled: {0: false}, unlocked: false},
      IncrementP: {buyMax: false, bought: 0, enabled: {0: false, 1: false, 2: false, 3: false, 4: false}, unlocked: false},
      IncrementM: {buyMax: false, bought: 0, enabled: {0: false, 1: false, 2: false, 3: false, 4: false}, unlocked: false},
      IncrementE: {buyMax: false, bought: 0, enabled: {0: false, 1: false, 2: false, 3: false, 4: false}, unlocked: false},
      IncrementT: {buyMax: false, bought: 0, enabled: {0: false, 1: false, 2: false, 3: false, 4: false}, unlocked: false},
      SacrificeIP: {buyMax: false, bought: 0, enabled: {0: false}, unlocked: false},
      Prestige: {buyMax: false, bought: false, enabled: {0: false}, at: nd(1), unlocked: false},
      Automation: {buyMax: false, bought: false, enabled: {IP: false, IncrementP: false, IncrementM: false, IncrementE: false, IncrementT: false, SacrificeIP: false, Prestige: false, Automation: false, Scaling: false}, unlocked: false},
      Scaling: {buyMax: false, bought: false, enabled: {P: false, M: false, E: false}, unlocked: false}
    },
    sacrifice: {
      IP: {count: 0, unlocked: false},
      PP: {count: 0, unlocked: false}
    },
    scaling: {
      P: {buyMax: false, bought: 0, unlocked: false},
      M: {buyMax: false, bought: 0, unlocked: false},
      E: {buyMax: false, bought: 0, unlocked: false}
    },
    ip: {
      current: nd(1),
      sac: nd(1),
      total: nd(1),
      highest: nd(1),
      infinite: nd("1e100"),
      equationClicks: nd(0),
      increment: {
        P: {bought: [0, 0, 0, 0, 0], unlocked: [true, false, false, false, false], expUnlocked: false},
        M: {bought: [0, 0, 0, 0, 0], unlocked: [false, false, false, false, false], expUnlocked: false},
        E: {bought: [0, 0, 0, 0, 0], unlocked: [false, false, false, false, false], expUnlocked: false},
        T: {bought: [0, 0, 0, 0, 0], unlocked: [false, false, false, false, false], expUnlocked: false}
      }
    },
    pp: {
      unlocked: false,
      current: nd(0),
      sac: nd(0),
      total: nd(0),
      highest: nd(0),
      infinite: nd("1e100"),
      count: 0,
      lastGain: nd(0),
      milestones: {
        count: 0,
        unlocked: 0,
      },
      pt: {
        refund: false,
        refundAmount: nd(0),
        cells: [],
        unlocked: false
      },
      challenge: [{unlocked: false}, {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}, {in: false, count: 0}]
    },
    time: {
      lastUpdate: Date.now(),
      played: 0,
      thisPrestige: 0,
      lastPrestige: 0,
      bestPrestige: 31536000000
    },
    version: "0.6.1",
    atEnd: false,
    beta: false
  }
}


//Data
var user = setUser();
var brokenUser = setUser();
var gameTimeInterval;
var reset = [];
var lastClicked;

const updateRate = 20;
const updateMessages = {
  "0.6.1": "- Added a bunch of options and qol features<br>- Changed some colors to hopefully make the numbers easier to read<br>- Lowered some of the major timewalls<br>- Fixed 4+ bugs",
  "0.6.0": "- More prestige challenges<br>- The UI and feedback is improved<br>- P variables no longer suck<br>- Fixed 4+ bugs and 2+ exploits",
  "0.5.5": "- Offline progress past 1 hour is now calculated instantly<br>- Buy max toggle has been removed, it is now automatically enabled upon unlock<br>- Tweaked a few costs and requirements, points have been refunded<br>- Game runs up to 20% smoother, and offline time is calculated 20% faster<br>- Fixed 10+ bugs",
  "0.5.4": "- Added options export/import/reset/discord to the loading screen<br>- Fixed 3+ bugs",
  "0.5.3": "- Added a bunch of suggestions and qol features<br>- Changed exported files (old ones still work)<br>- Balanced early game and mid-game click walls<br>- A fix for a challenge 4 bug has been added, completions have been reset<br>- A bunch of small tweaks for balancing and visuals<br>- Fixed 6+ bugs",
  "0.5.2": "- Implemented a bunch of suggestions<br>- Fixed 3+ bugs",
  "0.5.1": "- Added lots of cool things<br>- Fixed some broken stuff<br>- Fixed 3+ bugs",
  "0.5.0": "- Sacrifice PP<br>- Tetration<br>- More milestones, tree upgrades and challenge levels<br>- Fixed 6+ bugs"
}

const showInfinite = true;
const layers = {
  "IP": {
    goals: [nd(1000), nd(2500), nd(10000), nd(50000), nd(250000), nd(1e6), nd(5e9), nd(1e13), nd(5e15), nd(1e21), nd(2.1e21), nd(7.5e21), nd(5e32), nd(3.7e37), nd(1e44), nd(2.25e45), nd(4e57), nd(8.5e85), nd(1e100), nd("e1560"), nd("e5e13")],
    goalsSac: [0, 0, 0, 0, 0, 0, 1, 2, 2, 3, 3, 3, 5, 6, 7, 7, 8, 10, 11, 15, 17],
    unlocks: ["Variable P<sub>1</sub>", "Automate IP", "Variable P<sub>2</sub>", "Variable P<sub>3</sub>", "Automate P Variables", "Variable P<sub>4</sub>", "Variable M<sub>1</sub>", "Variable M<sub>2</sub>", "Variable M<sub>3</sub>", "Automate M Variables", "Scaling P Variables", "Variable M<sub>4</sub>", "Variable E<sub>1</sub>", "Variable E<sub>2</sub>", "Scaling M Variables", "Variable E<sub>3</sub>", "Variable E<sub>4</sub>", "Automate E and Scaling E Vars", "Prestige", "Automate T Variables", "End"],
    sourceReq: [[], ["ip", "increment", "P", 0], ["ip", "increment", "P", 0], ["ip", "increment", "P", 1], ["ip", "increment", "P", 2], ["ip", "increment", "P", 0], ["ip", "increment", "P", 3], ["ip", "increment", "M", 0], ["ip", "increment", "M", 1], ["ip", "increment", "M", 2], ["ip", "increment", "M", 0], ["ip", "increment", "P", 0], ["ip", "increment", "M", 3], ["ip", "increment", "E", 0], ["ip", "increment", "E", 1], ["ip", "increment", "M", 0], ["ip", "increment", "E", 2], ["ip", "increment", "E", 3], ["ip", "increment", "E", 0], ["ip", "increment", "P", 0], ["ip", "increment", "T", 0]],
    source: [["ip", "increment", "P", 1], ["automation", "IP"], ["ip", "increment", "P", 2], ["ip", "increment", "P", 3], ["automation", "IncrementP"], ["ip", "increment", "P", 4], ["ip", "increment", "M", 1], ["ip", "increment", "M", 2], ["ip", "increment", "M", 3], ["automation", "IncrementM"], ["scaling", "P"], ["ip", "increment", "M", 4], ["ip", "increment", "E", 1], ["ip", "increment", "E", 2], ["scaling", "M"], ["ip", "increment", "E", 3], ["ip", "increment", "E", 4], ["automation", "IncrementE"], ["pp"], ["automation", "IncrementT"]]
  },
  "PP": {
    goals: [nd(1), nd(10), nd(50), nd(500), nd(1e17), nd(1e20)],
    goalsSac: [0, 0, 0, 0, 2, 2],
    unlocks: ["Prestige Tree and Milestones", "Challenges", "Automate Sacrifice", "Automate Prestige", "Automate Automation and Scaling", "End"],
    source: [["pp", "pt"], ["pp", "challenge", 0], ["automation", "SacrificeIP"], ["automation", "Prestige"], ["automation", "Automation"]]
  }
}


//Tabs
const tabs = {
  Options: {hasSubTabs: false},
  Achievements: {
    hasSubTabs: true,
    subTabs: {
      Normal: {hasSubTabs: false},
      Eggs: {hasSubTabs: false}
    }
  },
  Statistics: {hasSubTabs: false},
  Automation: {hasSubTabs: false},
  Sacrifice: {hasSubTabs: false},
  Scaling: {hasSubTabs: false},
  Increment: {hasSubTabs: false},
  Prestige: {
    hasSubTabs: true,
    subTabs: {
      Milestones: {hasSubTabs: false},
      Tree: {hasSubTabs: false},
      Challenges: {hasSubTabs: false},
      /*Power: {hasSubTabs: false}*/
    }
  },
  "Ascension": {hasSubTabs: false}
}
for (let tabName in tabs) {
  di("tab"+tabName+"b").addEventListener("click", () => {showTab(tabName); lastClicked = "tab"+tabName+"b"});
  for (let subTabName in tabs[tabName].subTabs) {
    di("subTab"+tabName+subTabName+"b").addEventListener("click", () => {showSubTab(tabName, subTabName); lastClicked = "subTab"+tabName+subTabName+"b"});
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
  let index = 0;
  if (layer == "IP") {
    di("ipx").textContent = e("d", user.ip.current, "d", 0);
    let multi = nd(1);
    if (user.pp.pt.cells.includes("pt5-5")) {multi = multi.times(getClickMulti())}
    (user.automation.IP.enabled["0"]) ? di("ipSec").textContent = e("d", getEquationIPResult().times(getAutomationRate("IP")).times(multi), "d", 0) : di("ipSec").textContent = e("d", nd(0), "d", 0);
    
    for (let i=0; i<layers.IP.source.length; i++) {
      let unlocked;
      let s = layers.IP.source[i];
      if (s.length == 1) {unlocked = user[s[0]].unlocked}
      if (s.length == 2) {unlocked = user[s[0]][s[1]].unlocked}
      if (s.length == 3) {unlocked = user[s[0]][s[1]][s[2]].unlocked}
      if (s.length == 4) {unlocked = user[s[0]][s[1]][s[2]].unlocked[s[3]]}
      if (((user.ip.sac.gte(layers.IP.goals[i]) && user.sacrifice.IP.count >= layers.IP.goalsSac[i]) || unlocked) && index == i) {index = i+1}
    }
    
    if (index == layers.IP.unlocks.indexOf("Automate T Variables")) {}
  }
  if (layer == "PP") {
    di("ppx").textContent = e("d", user.pp.current, "d", 0);
    (user.automation.Prestige.enabled["0"]) ? di("ppSec").textContent = e("d", user.pp.lastGain.divide(user.time.lastPrestige/1000), "d", 0) : di("ppSec").textContent = e("d", nd(0), "d", 0);
    
    for (let i=0; i<layers.PP.source.length; i++) {
      let s = layers.PP.source[i];
      let unlocked;
      if (s.length == 2) {unlocked = user[s[0]][s[1]].unlocked}
      if (s.length == 3) {unlocked = user[s[0]][s[1]][s[2]].unlocked}
      if (((user.pp.sac.gte(layers.PP.goals[i]) && user.sacrifice.PP.count >= layers.PP.goalsSac[i]) || unlocked) && index == i) {index = i+1}
    }
  }
  let g = (typeof layers[layer].goals[index] != "undefined") ? layers[layer].goals[index] : layers[layer].goals[layers[layer].goals.length-1];
  let u = (typeof layers[layer].unlocks[index] != "undefined") ? layers[layer].unlocks[index] : "End";
  let cost = getSacrificeCost(layer);
  if (cost.lt(1)) {cost = nd(1)}
  if ((cost.lt(g) || (cost.gt(layers[layer].goals[layers[layer].goals.length-1]) && index == layers[layer].goals.length-1)) && !cost.eq(user[layer.toLowerCase()].infinite)) {
    g = cost;
    u = "Sacrifice";
  }
  
  di("pb"+layer.toLowerCase()+"Sac").textContent = e("d", user[layer.toLowerCase()].sac, "d", 0);
  di("pb"+layer.toLowerCase()+"Goal").textContent = e("d", g, "d", 0);
  di("pb"+layer.toLowerCase()+"Unlock").innerHTML = u;
  if (g.gt(1e100) || user.options.logpb) {di("pb"+layer.toLowerCase()).style.width = (!user[layer.toLowerCase()].sac.eq(0)) ? user[layer.toLowerCase()].sac.log10().divide(g.log10()).times(100)+"%" : "0%"}
  else {di("pb"+layer.toLowerCase()).style.width = user[layer.toLowerCase()].sac.divide(g).times(100)+"%"}
  if (user[layer.toLowerCase()].sac.divide(g).gt(1)) {di("pb"+layer.toLowerCase()).style.width = "100%"}
}
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
let keysThisSecond = "";
document.addEventListener("keydown", (event) => {keys[event.key] = true; keysThisSecond += event.key});
document.addEventListener("keyup", (event) => {keys[event.key] = false});

function simulateTime(time, active, showBox) {
  if (typeof showBox == "undefined") {showBox = true};
  if (showBox) {showId("offlineBox")}
  di("offlineTime").textContent = showTime(nd(time));
  runGameTime(false, 0);
  checkUnlocks();
  
  let ticks = Math.floor(time/1000*updateRate);
  let extraTime = 0;
  if (ticks > 72000) {
    extraTime = (ticks-72000)*1000/updateRate;
    ticks = 72000;
  }
  user.time.played += extraTime;
  if (!user.automation.Prestige.enabled["0"]) {user.time.thisPrestige += extraTime}
  var userStart = JSON.parse(JSON.stringify(user));
  fixnd(userStart);
  
  let hides = ["IP", "PP", "PPCount"];
  for (let i=0; i<hides.length; i++) {hideId("offline"+hides[i])}
  showId("offlineLoading");
  setTimeout(() => {
    let timeStart = Date.now();
    
    let ticksDone = 0;
    for (ticksDone=0; ticksDone<ticks; ticksDone++) {runGameTime(false, 1000/updateRate)}
    
    let extraTimeInHours = extraTime/1000/60/60;
    
    
    user.time.played += Math.floor(extraTime);
    /*for (let i=0; i<5; i++) {
      user.ip.increment.P.bought[i] += Math.floor((user.ip.increment.P.bought[i]-userStart.ip.increment.P.bought[i])*extraTimeInHours);
      user.ip.increment.M.bought[i] += Math.floor((user.ip.increment.M.bought[i]-userStart.ip.increment.M.bought[i])*extraTimeInHours);
      user.ip.increment.E.bought[i] += Math.floor((user.ip.increment.E.bought[i]-userStart.ip.increment.E.bought[i])*extraTimeInHours);
      user.ip.increment.T.bought[i] += Math.floor((user.ip.increment.T.bought[i]-userStart.ip.increment.T.bought[i])*extraTimeInHours);
    }*/
    user.ip.equationClicks = user.ip.equationClicks.plus((user.ip.equationClicks.minus(userStart.ip.equationClicks)).times(extraTimeInHours).floor());
    user.pp.count += Math.floor((user.pp.count-userStart.pp.count)*extraTimeInHours);
    let extraPPGain = (user.pp.count-userStart.pp.count > 0) ? user.pp.sac.minus(userStart.pp.sac).divide(user.pp.count-userStart.pp.count).times(Math.floor((user.pp.count-userStart.pp.count)*extraTimeInHours)) : nd(0);
    giveMoney("PP", extraPPGain);
    
    
    /*let extraPrestigeCounts = Math.floor((user.pp.count-userStart.pp.count)*extraTimeInHours);
    let extraPPGain = (user.pp.count-userStart.pp.count > 0) ? user.pp.sac.minus(userStart.pp.sac).divide(user.pp.count-userStart.pp.count).times(extraPrestigeCounts) : nd(0);
    user.pp.count += extraPrestigeCounts;
    giveMoney("PP", extraPPGain);*/
    
    /*for (let i=0; i<Math.min(1000, Math.floor(extraTime/1000*updateRate)); i++) {runGameTime(false, extraTime/1000)}*/
    console.log("Simulation took " +showTime(nd(Date.now()-timeStart))+ " to finish");
    
    if (user.ip.sac.gt(userStart.ip.sac)) {showId("offlineIP"); di("offlineIPx").textContent = e("d", user.ip.sac.minus(userStart.ip.sac), "d", 0)}
    if (user.pp.sac.gt(userStart.pp.sac)) {showId("offlinePP"); di("offlinePPx").textContent = e("d", user.pp.sac.minus(userStart.pp.sac), "d", 0)}
    if (user.pp.count > userStart.pp.count) {showId("offlinePPCount"); di("offlinePPCountx").textContent = e("d", nd(user.pp.count-userStart.pp.count), "d", 0)}
    
    hideId("offlineLoading");
  }, 100);
}
di("offlineBox").addEventListener("click", (event) => {event.stopPropagation()});
di("closeOfflineBox").addEventListener("click", () => {hideId("offlineBox")});

let secondTime = 0;

let sacrificeIPTime = 0;
let enterTime = 0;
let eTime = [0, 0, 0, 0, 0];
function runGameTime(active, time) {
  //Set time diff
  let thisUpdate = Date.now();
  if (typeof time == "undefined") {time = Math.min(thisUpdate-user.time.lastUpdate, 43200000)}
  let ticksPerSecond = 20;
  /*let ticks = Math.floor(time*ticksPerSecond/1000);*/
  let ticks = time*ticksPerSecond/1000;
  
  secondTime += 1/ticksPerSecond*ticks;
  
  
  
  //Temp bug fix
  if (active) {
    if (user.pp.challenge[4].count >= ppChallenge[4].maxCompletions) {user.pp.challenge[4].count = ppChallenge[4].maxCompletions}
    if (user.ip.current.sign === -1) {user.ip.current.sign = 1}
  }
  
  
  
  //Keys
  if (document.hasFocus() && active) {
    if (keys["."] && keys["x"]) {giveEgg("egg1-1", true)}
    if (keys["p"] && !keys["s"] && user.pp.unlocked) {confirmPrestige()}
    if (keys["s"]) {
      if (keys["1"] && user.sacrifice.IP.unlocked) {confirmRunSacrifice("IP")}
      if (keys["2"] && user.sacrifice.PP.unlocked) {confirmRunSacrifice("PP")}
    }
    if (keys["Enter"] && lastClicked != undefined) {
      enterTime += 10/updateRate;
      if (enterTime >= 1) {
        enterTime--;
        di(lastClicked).click();
      }
    }
  }
  else {keys = {}}
  
  
  
  //Misc
  let inPPChallenge = false;
  for (let i=1; i<ppChallenge.length; i++) {if (user.pp.challenge[i].in) {inPPChallenge = true}}
  if (inPPChallenge && active) {showId("ppChallengeInfo")} else {hideId("ppChallengeInfo")}
  pm.forEach((value, index) => {if (user.sacrifice.PP.count >= value.sac) {user.pp.milestones.unlocked = index}});
  for (let i=1; i<pm.length; i++) {
    if (user.pp.count >= pm[i].req && user.sacrifice.PP.count >= pm[i].sac && user.pp.milestones.unlocked >= i) {user.pp.milestones.count = i}
    else if (i == 1) {user.pp.milestones.count = 0}
  }
  
  
  
  //Set or reset data
  if (reset.includes("SacrificeIP")) {resetSacrificeIP()}
  if (reset.includes("SacrificePP")) {resetSacrificePP()}
  if (reset.includes("Prestige")) {resetPrestige()}
  if (reset.length > 0 && active) {checkUnlocks()}
  for (let name in increment) {setIncrementResult(name)}
  if (user.pp.count > 0 || user.pp.total.gt(0)) {user.ip.infinite = nd("eeee1")}
  
  
  
  //Check for achievements
  if (active) {
    let condition = false;
    for (let i=0; i<5; i++) {if (user.ip.increment.P.bought[i] > 0) {condition = true}}
    if (condition) {giveAchievement("ach1-1", true)}
    condition = false;
    for (let name in automation) {
      for (let key in user.automation[name].enabled) {
        if (user.automation[name].enabled[key]) {condition = true}
      }
    }
    if (condition) {giveAchievement("ach1-2", true)}
    condition = false;
    if (user.sacrifice.IP.count >= 1) {giveAchievement("ach1-3", true)}
    for (let i=0; i<5; i++) {if (user.ip.increment.M.bought[i] > 0) {condition = true}}
    if (condition) {giveAchievement("ach1-4", true)}
    condition = false;
    if (user.sacrifice.IP.count >= 2) {giveAchievement("ach1-5", true)}
    if (user.ip.equationClicks.gte(3333)) {giveAchievement("ach1-6", true); showId("equationClickUnlock")} else {hideId("equationClickUnlock")}
    if (getIncrementx("P", 0).gte(1000) && getIncrementx("P", 1).eq(0)) {giveAchievement("ach2-1", true)}
    for (let i=0; i<5; i++) {if (user.ip.increment.E.bought[i] > 0) {condition = true}}
    if (condition) {giveAchievement("ach2-2", true)}
    condition = false;
    if (user.sacrifice.IP.count >= 7) {giveAchievement("ach2-3", true)}
    if (user.scaling.E.bought >= 1) {giveAchievement("ach2-4", true)}
    //ach2-5 checked in resetSacrifice("IP")
    //ach2-6 checked in resetSacrifice("IP")
    if (user.pp.count > 0 || user.pp.total.gt(0)) {giveAchievement("ach3-1", true)}
    //ach3-2 checked in resetPrestige()
    if (user.pp.challenge[1].count >= 1) {giveAchievement("ach3-3", true)}
    if (user.pp.pt.cells.includes("pt2-3")) {giveAchievement("ach3-4", true)}
    if (user.pp.milestones.count >= 2 && user.pp.pt.cells.includes("pt3-1") && user.pp.pt.cells.includes("pt3-4") && user.automation.Prestige.enabled["0"]) {giveAchievement("ach3-5", true)} //Doesn't check if you have any automation ENABLED except for auto prestige
    if (user.sacrifice.PP.count >= 1) {giveAchievement("ach3-6", true)}
    for (let i=0; i<5; i++) {if (user.ip.increment.T.bought[i] > 0) {condition = true}}
    if (condition) {giveAchievement("ach4-1", true)}
    condition = false;
    //ach4-2 checked in importy()
    if (user.pp.pt.cells.includes("pt5-1")) {giveAchievement("ach4-3", true)}
    //ach4-4 checked in resetPrestige()
    if (user.sacrifice.PP.count >= 2) {giveAchievement("ach4-5", true)}
    if (user.ip.increment.T.bought[1] > 0) {giveAchievement("ach4-6", true)}
    //ach5-1 checked in resetPrestige()
    if (user.automation.Automation.bought) {giveAchievement("ach5-2", true)}
    if (keysThisSecond.includes("xzxzxzxzxz")) {giveEgg("egg1-3", true)}
  }
  
  
  
  //Unlocks
  //Other
  let ptRows = [];
  if (user.pp.count > 0 || user.pp.total.gt(0)) {
    showId("pt0-1");
    if (!ptRows.includes(0)) {ptRows.push(0)}
  }
  else {hideId("pt0-1")}
  for (let id in pt) {
    if (id == "pt0-1") {continue}
    let row = Number(id.charAt(2));
    let show = true;
    for (let i=0; i<pt[id].from.length; i++) {if (!user.pp.pt.cells.includes(pt[id].from[i]) || user.sacrifice.PP.count < pt[id].sac) {show = false}}
    if (show) {
      showId(id);
      if (!ptRows.includes(row)) {ptRows.push(row)}
    }
    else {hideId(id)}
  }
  for (let i=0; i<=lastPTRow; i++) {(ptRows.includes(i)) ? showId("ptr"+i) : hideId("ptr"+i)}
  
  //Unlock Increments
  let names = ["P", "M", "E"];
  if (user.sacrifice.IP.count >= 1) {showClass("coefficientP")} else {hideClass("coefficientP")}
  if (user.sacrifice.IP.count >= 3) {showClass("coefficientM")} else {hideClass("coefficientM")}
  if (user.sacrifice.IP.count >= 7) {showClass("coefficientE")} else {hideClass("coefficientE")}
  if (user.pp.milestones.count < 5) {
    if (user.ip.sac.gte(layers.IP.goals[0])) {showClass("incrementP1Unlocks"); user.ip.increment.P.unlocked[1] = true} else {hideClass("incrementP1Unlocks"); user.ip.increment.P.unlocked[1] = false}
    if (user.ip.sac.gte(layers.IP.goals[2])) {showClass("incrementP2Unlocks"); user.ip.increment.P.unlocked[2] = true} else {hideClass("incrementP2Unlocks"); user.ip.increment.P.unlocked[2] = false}
    if (user.ip.sac.gte(layers.IP.goals[3])) {showClass("incrementP3Unlocks"); user.ip.increment.P.unlocked[3] = true} else {hideClass("incrementP3Unlocks"); user.ip.increment.P.unlocked[3] = false}
    if (user.ip.sac.gte(layers.IP.goals[5])) {showClass("incrementP4Unlocks"); user.ip.increment.P.unlocked[4] = true} else {hideClass("incrementP4Unlocks"); user.ip.increment.P.unlocked[4] = false}
    if (user.sacrifice.IP.count >= 1) {showClass("incrementM0Unlocks"); user.ip.increment.M.unlocked[0] = true} else {hideClass("incrementM0Unlocks"); user.ip.increment.M.unlocked[0] = false}
    if (user.ip.sac.gte(layers.IP.goals[6]) && user.sacrifice.IP.count >= layers.IP.goalsSac[6]) {showClass("incrementM1Unlocks"); user.ip.increment.M.unlocked[1] = true} else {hideClass("incrementM1Unlocks"); user.ip.increment.M.unlocked[1] = false}
    if (user.ip.sac.gte(layers.IP.goals[7]) && user.sacrifice.IP.count >= layers.IP.goalsSac[7]) {showClass("incrementM2Unlocks"); user.ip.increment.M.unlocked[2] = true} else {hideClass("incrementM2Unlocks"); user.ip.increment.M.unlocked[2] = false}
    if (user.ip.sac.gte(layers.IP.goals[8]) && user.sacrifice.IP.count >= layers.IP.goalsSac[8]) {showClass("incrementM3Unlocks"); user.ip.increment.M.unlocked[3] = true} else {hideClass("incrementM3Unlocks"); user.ip.increment.M.unlocked[3] = false}
    if (user.ip.sac.gte(layers.IP.goals[11]) && user.sacrifice.IP.count >= layers.IP.goalsSac[11]) {showClass("incrementM4Unlocks"); user.ip.increment.M.unlocked[4] = true} else {hideClass("incrementM4Unlocks"); user.ip.increment.M.unlocked[4] = false}
    if (user.sacrifice.IP.count >= 5) {showClass("incrementE0Unlocks"); user.ip.increment.E.unlocked[0] = true} else {hideClass("incrementE0Unlocks"); user.ip.increment.E.unlocked[0] = false}
    if (user.ip.sac.gte(layers.IP.goals[12]) && user.sacrifice.IP.count >= layers.IP.goalsSac[12]) {showClass("incrementE1Unlocks"); user.ip.increment.E.unlocked[1] = true} else {hideClass("incrementE1Unlocks"); user.ip.increment.E.unlocked[1] = false}
    if (user.ip.sac.gte(layers.IP.goals[13]) && user.sacrifice.IP.count >= layers.IP.goalsSac[13]) {showClass("incrementE2Unlocks"); user.ip.increment.E.unlocked[2] = true} else {hideClass("incrementE2Unlocks"); user.ip.increment.E.unlocked[2] = false}
    if (user.ip.sac.gte(layers.IP.goals[15]) && user.sacrifice.IP.count >= layers.IP.goalsSac[15]) {showClass("incrementE3Unlocks"); user.ip.increment.E.unlocked[3] = true} else {hideClass("incrementE3Unlocks"); user.ip.increment.E.unlocked[3] = false}
    if (user.ip.sac.gte(layers.IP.goals[16]) && user.sacrifice.IP.count >= layers.IP.goalsSac[16]) {showClass("incrementE4Unlocks"); user.ip.increment.E.unlocked[4] = true} else {hideClass("incrementE4Unlocks"); user.ip.increment.E.unlocked[4] = false}
  }
  else {
    for (let i=0; i<names.length; i++) {
      for (let k=0; k<5; k++) {
        showClass("increment"+names[i]+k+"Unlocks");
        user.ip.increment[names[i]].unlocked[k] = true;
      }
      /*showClass("coefficient"+names[i]);*/
    }
  }
  if (user.sacrifice.PP.count >= 1) {showClass("incrementT0Unlocks")} else {hideClass("incrementT0Unlocks")}
  if (user.sacrifice.PP.count >= 2) {showClass("incrementT1Unlocks")} else {hideClass("incrementT1Unlocks")}
  
  
  
  //Run passive gain
  if (user.automation.IP.enabled["0"]) {
    let bulk = getAutomationRate("IP").divide(ticksPerSecond).times(ticks);
    let multi = nd(1);
    if (user.pp.pt.cells.includes("pt5-5")) {
      multi = multi.times(getClickMulti());
      user.ip.equationClicks = user.ip.equationClicks.plus(bulk);
    }
    giveMoney("IP", getEquationIPResult().times(multi).times(bulk));
  }
  
  
  
  //Run active gain
  //Increments P, M, and E
  let incrementNames = Object.keys(increment);
  for (let i=incrementNames.length-1; i>=0; i--) {
    let name = incrementNames[i];
    if (name == "P" && user.pp.challenge[6].in) {continue}
    for (let j=4; j>=0; j--) {
      if (user.automation["Increment"+name].enabled[j] && di("increment"+name+j).style.display != "none") {
        if (increment[name].auto) {
          let ratio = getIncrementRatio(name, j);
          let canBuy = Decimal.affordGeometricSeries(user.ip.current, increment[name].baseCost, ratio, user.ip.increment[name].bought[j]);
          let bulk = getAutomationRate("Increment"+name).divide(ticksPerSecond).times(ticks);
          if (name == "E") {
            if (bulk < 1) {
              eTime[j] += bulk.toNumber();
              bulk = bulk.floor();
              if (eTime[j] >= 1) {
                eTime[j]--;
                bulk = nd(1);
              }
            }
            else {bulk = bulk.floor()}
          }
          let buy;
          buy = (canBuy.gte(bulk)) ? bulk : canBuy;
          let cost = Decimal.sumGeometricSeries(buy, increment[name].baseCost, ratio, user.ip.increment[name].bought[j]);
          if (cost.gte(user.ip.infinite)) {
            buy = Decimal.affordGeometricSeries(user.ip.infinite, increment[name].baseCost, ratio, user.ip.increment[name].bought[j]);
            cost = Decimal.sumGeometricSeries(buy, increment[name].baseCost, ratio, user.ip.increment[name].bought[j]);
          }
          if (cost.lt("ee9")) {user.ip.current = user.ip.current.minus(cost)}
          user.ip.increment[name].bought[j] += buy.toNumber();
          if (user.pp.challenge[2].in && buy.gt(0)) {
            for (let k=0; k<j; k++) {
              user.ip.increment[name].bought[k] = 0;
            }
          }
        }
        else {
          let bulk = getAutomationRate("Increment"+name).divide(ticksPerSecond).times(ticks);
          for (let k=0; k<bulk; k++) {
            if (!buyIncrement(name, j)) {break}
          }
        }
      }
    }
  }
  
  //Sacrifice
  if (user.automation.SacrificeIP.enabled["0"]) {
    let bulk = getAutomationRate("SacrificeIP").divide(ticksPerSecond).times(ticks);
    if (bulk < 1) {
      sacrificeIPTime += bulk.toNumber();
      if (sacrificeIPTime >= 1) {
        sacrificeIPTime--;
        let sacrifices = user.sacrifice.IP.count;
        runSacrifice("IP", true, true);
        if (user.sacrifice.IP.count > sacrifices) {resetSacrificeIP()}
      }
    }
    else {
      if (bulk.gt(10)) {bulk = 10}
      for (let i=0; i<bulk; i++) {
        let sacrifices = user.sacrifice.IP.count;
        runSacrifice("IP", true, true);
        if (user.sacrifice.IP.count > sacrifices) {resetSacrificeIP()}
      }
    }
  }
  
  //Prestige
  if (user.automation.Prestige.enabled["0"] && user.automation.Prestige.bought) {
    let gain = getPPGain();
    if (gain.gte(user.automation.Prestige.at)) {runPrestige(true); resetPrestige()}
  }
  
  //Automation
  if (secondTime >= 1) {
    for (let name in user.automation.Automation.enabled) {
      if (user.automation.Automation.enabled[name] && user.automation.Automation.bought) {
        while (buyAutomation(name)) {}
      }
    }
  }
  
  //Scaling
  if (secondTime >= 1) {
    for (let name in user.automation.Scaling.enabled) {
      if (user.automation.Scaling.enabled[name] && user.automation.Scaling.bought) {
        while (buyScaling(name)) {}
      }
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
  if (clicksThisSecond > 15) {clicksThisSecond = 0}
  if (secondTime >= 1) {
    secondTime--;
    keysThisSecond = "";
  }
  reset = [];
}
function checkUnlocks() {
  let names = ["P", "M", "E"];
  //Unlock Other
  if ((user.ip.sac.gte(layers.IP.goals[18]) && user.sacrifice.IP.count >= layers.IP.goalsSac[18]) || user.pp.count > 0 || user.pp.total.gt(0)) {user.pp.unlocked = true} else {user.pp.unlocked = false}
  
  //Unlock Automation
  /*if (user.pp.milestones.count < 5) {*/
    if (!user.automation.IP.unlocked && user.ip.sac.gte(layers.IP.goals[1])) {user.automation.IP.unlocked = true}
    if (!user.automation.IncrementP.unlocked && user.ip.sac.gte(layers.IP.goals[4])) {user.automation.IncrementP.unlocked = true}
    if (!user.automation.IncrementM.unlocked && user.ip.sac.gte(layers.IP.goals[9]) && user.sacrifice.IP.count >= layers.IP.goalsSac[9]) {user.automation.IncrementM.unlocked = true}
    if (!user.automation.IncrementE.unlocked && user.ip.sac.gte(layers.IP.goals[17]) && user.sacrifice.IP.count >= layers.IP.goalsSac[17]) {user.automation.IncrementE.unlocked = true}
    if (!user.automation.IncrementT.unlocked && user.ip.sac.gte(layers.IP.goals[19]) && user.sacrifice.IP.count >= layers.IP.goalsSac[19]) {user.automation.IncrementT.unlocked = true}
  /*}
  else {
    user.automation.IP.unlocked = true;
    for (let i=0; i<names.length; i++) {user.automation["Increment"+names[i]].unlocked = true}
    if (user.ip.total.gte(layers.IP.goals[19]) && user.sacrifice.IP.count >= layers.IP.goalsSac[19]) {user.automation.IncrementT.unlocked = true}
  }*/
  if (user.pp.sac.gte(layers.PP.goals[2])) {user.automation.SacrificeIP.unlocked = true}
  if (user.pp.sac.gte(layers.PP.goals[3])) {user.automation.Prestige.unlocked = true}
  if (user.pp.sac.gte(layers.PP.goals[4])) {user.automation.Automation.unlocked = true}
  if (user.pp.sac.gte(layers.PP.goals[4])) {user.automation.Scaling.unlocked = true}
  
  //Unlock Sacrifice
  /*if (user.pp.milestones.count < 5) {*/
    if (!user.sacrifice.IP.unlocked && user.ip.sac.gte(sacrifice.IP.costs[0]) || user.sacrifice.IP.count > 0 || user.pp.count > 0 || user.pp.total.gt(0)) {user.sacrifice.IP.unlocked = true; showClass("hotkeySIUnlocks")} else {hideClass("hotkeySIUnlocks")}
  /*}
  else {
    user.sacrifice.IP.unlocked = true; showClass("hotkeySIUnlocks");
  }*/
  if ((user.pp.sac.gte(getSacrificeCost("PP", 0)) || user.sacrifice.PP.count > 0)) {user.sacrifice.PP.unlocked = true; showClass("hotkeySPUnlocks")} else {hideClass("hotkeySPUnlocks")}
  
  //Unlock Scaling
  /*if (user.pp.milestones.count < 5) {*/
    if (!user.scaling.P.unlocked && user.ip.sac.gte(layers.IP.goals[10]) && user.sacrifice.IP.count >= layers.IP.goalsSac[10]) {user.scaling.P.unlocked = true}
    if (!user.scaling.M.unlocked && user.ip.sac.gte(layers.IP.goals[14]) && user.sacrifice.IP.count >= layers.IP.goalsSac[14]) {user.scaling.M.unlocked = true}
    if (!user.scaling.E.unlocked && user.ip.sac.gte(layers.IP.goals[17]) && user.sacrifice.IP.count >= layers.IP.goalsSac[17]) {user.scaling.E.unlocked = true}
  /*}
  else {for (let i=0; i<names.length; i++) {user.scaling[names[i]].unlocked = true}}*/
  
  //Unlock Prestige
  if (user.pp.total.gte(layers.PP.goals[0])) {user.pp.pt.unlocked = true}
  if (user.pp.total.gte(layers.PP.goals[1])) {user.pp.challenge[0].unlocked = true}
  displayUnlocks();
}
function displayUnlocks() {
  let names = ["P", "M", "E"];
  
  //Other
  if (user.pp.pt.cells.includes("pt5-2")) {hideId("pt1-1Tooltip"); hideId("pt2-1Tooltip")} else {showId("pt1-1Tooltip"); showId("pt2-1Tooltip")}
  
  //Unlock Tabs
  if (user.eggs.length > 0) {showIdTab("subTabAchievementsNormalb"); showIdTab("subTabAchievementsEggsb")} else {hideId("subTabAchievementsNormalb"); hideId("subTabAchievementsEggsb")}
  let unlockedAutomation = false;
  for (let name in automation) {if (user.automation[name].unlocked) {unlockedAutomation = true}}
  if (unlockedAutomation) {showIdTab("tabAutomationb")} else {hideId("tabAutomationb")}
  let unlockedSacrifice = false;
  for (let name in sacrifice) {if (user.sacrifice[name].unlocked) {unlockedSacrifice = true}}
  if (unlockedSacrifice) {showIdTab("tabSacrificeb")} else {hideId("tabSacrificeb")}
  let unlockedScaling = false;
  for (let name in scaling) {if (user.scaling[name].unlocked) {unlockedScaling = true}}
  if (unlockedScaling) {showIdTab("tabScalingb")} else {hideId("tabScalingb")}
  if (user.pp.unlocked) {showIdTab("tabPrestigeb"); showClass("hotkeyPUnlocks")} else {hideId("tabPrestigeb"); hideClass("hotkeyPUnlocks")}
  if (user.pp.pt.unlocked) {showIdTab("subTabPrestigeMilestonesb"); showIdTab("subTabPrestigeTreeb")} else {hideId("subTabPrestigeMilestonesb"); hideId("subTabPrestigeTreeb")}
  if (user.pp.challenge[0].unlocked) {showId("subTabPrestigeChallengesb"); showId("confirmationChallenge")} else {hideId("subTabPrestigeChallengesb"); hideId("confirmationChallenge")}
  
  //Unlock Automation
  if (user.automation.IP.unlocked) {showId("autoIP")} else {hideId("autoIP")}
  if (user.automation.IncrementP.unlocked) {showId("autoIncrementP")} else {hideId("autoIncrementP")}
  if (user.automation.IncrementM.unlocked) {showId("autoIncrementM")} else {hideId("autoIncrementM")}
  if (user.automation.IncrementE.unlocked) {showId("autoIncrementE")} else {hideId("autoIncrementE")}
  if (user.automation.IncrementT.unlocked) {showId("autoIncrementT")} else {hideId("autoIncrementT")}
  if (user.pp.pt.cells.includes("pt2-2") && !user.pp.challenge[4].in) {showClass("maxAutoUnlocks")} else {hideClass("maxAutoUnlocks")}
  if (user.automation.SacrificeIP.unlocked) {showId("autoSacrificeIP")} else {hideId("autoSacrificeIP")}
  if (user.automation.Prestige.unlocked) {showId("autoPrestige")} else {hideId("autoPrestige")}
  if (user.automation.Automation.unlocked) {showId("autoAutomation")} else {hideId("autoAutomation")}
  if (user.automation.Scaling.unlocked) {showId("autoScaling")} else {hideId("autoScaling")}
  
  //Unlock Sacrifice
  /*if (user.pp.milestones.count < 5) {*/
    if (user.sacrifice.IP.unlocked) {showId("sacrificeIP"); showClass("hotkeySIUnlocks")} else {hideId("sacrificeIP"); hideClass("hotkeySIUnlocks")}
  /*}
  else {
    showId("sacrificeIP"); showClass("hotkeySIUnlocks");
  }*/
  if (user.sacrifice.PP.unlocked) {showId("sacrificePP"); showClass("hotkeySPUnlocks")} else {hideId("sacrificePP"); hideClass("hotkeySPUnlocks")}
  
  if (user.sacrifice.IP.count >= 1) {showId("sacrificeIPPUnlock")} else {hideId("sacrificeIPPUnlock")}
  if (user.sacrifice.IP.count >= 3) {showId("sacrificeIPMUnlock")} else {hideId("sacrificeIPMUnlock")}
  if (user.sacrifice.IP.count >= 7) {showId("sacrificeIPEUnlock")} else {hideId("sacrificeIPEUnlock")}
  
  //Unlock Scaling
  for (let i=0; i<names.length; i++) {(user.scaling[names[i]].unlocked) ? showId("scaling"+names[i]) : hideId("scaling"+names[i])}
  if (user.pp.pt.cells.includes("pt2-4") && !user.pp.challenge[4].in) {showClass("maxScalingUnlocks")} else {hideClass("maxScalingUnlocks")}
  
  //Unlock Toggle Automation
  if (user.automation.IP.bought > 0) {showId("autoIPState")} else {hideId("autoIPState")}
  if (user.automation.IncrementP.bought > 0) {showClass("autoIncrementPUnlocks")} else {hideClass("autoIncrementPUnlocks")}
  if (user.automation.IncrementM.bought > 0) {showClass("autoIncrementMUnlocks")} else {hideClass("autoIncrementMUnlocks")}
  if (user.automation.IncrementE.bought > 0) {showClass("autoIncrementEUnlocks")} else {hideClass("autoIncrementEUnlocks")}
  if (user.automation.IncrementT.bought > 0) {showClass("autoIncrementTUnlocks")} else {hideClass("autoIncrementTUnlocks")}
  if (user.automation.SacrificeIP.bought > 0) {showId("autoSacrificeIPState")} else {hideId("autoSacrificeIPState")}
  if (user.automation.Prestige.bought > 0) {showId("autoPrestigeState")} else {hideId("autoPrestigeState")}
  if (user.automation.Automation.bought > 0) {showClass("autoAutomationUnlocks")} else {hideClass("autoAutomationUnlocks")}
  if (user.automation.Scaling.bought > 0) {showClass("autoScalingUnlocks")} else {hideClass("autoScalingUnlocks")}
  
  //Unlock Increment
  if (user.pp.challenge[6].count > 0) {showClass("exponentP")} else {hideClass("exponentP")}
  
  //Unlock Prestige
  if (user.ip.sac.gte(layers.IP.goals[18]) && user.sacrifice.IP.count >= layers.IP.goalsSac[18] || user.pp.count > 0 || user.pp.total.gt(0)) {showId("ppInfo")} else {hideId("ppInfo")}
  if ((user.ip.sac.gte(layers.IP.goals[18]) && user.sacrifice.IP.count >= layers.IP.goalsSac[18]) || user.pp.count > 0 || user.pp.total.gt(0)) {showId("confirmationPrestige")} else {hideId("confirmationPrestige")}
  if (user.pp.sac.gte(layers.PP.goals[0]) || user.sacrifice.PP.count > 0) {showId("refundPT")} else {hideId("refundPT")}
  if (user.pp.count > 0 || user.pp.total.gt(0)) {showClass("statPPUnlocks")} else {hideClass("statPPUnlocks")}
  let milestoneElements = dc("prestigeMilestone");
  for (let i=0; i<milestoneElements.length; i++) {(user.pp.milestones.unlocked > i) ? milestoneElements[i].style.display = "" : milestoneElements[i].style.display = "none"}
}

//Other
function intervals() {
  gameTimeInterval = setInterval(() => {runGameTime(true)}, (1000/updateRate));
  setInterval(() => {
    if (random(1, 1e6, true) == 1) {giveEgg("egg1-4", true)}
    checkUnlocks();
    if (!user.atEnd && user.ip.sac.gte(layers.IP.goals[layers.IP.goals.length-1]) && user.pp.sac.gte(layers.PP.goals[layers.PP.goals.length-1])) {
      user.atEnd = true;
      alertify.alert("You have reached the end of the game!<br>Check the discord for upcoming updates");
    }
  }, 1000);
  setInterval(() => {save(true)}, 60000);
}
function refreshGameInterval() {
  /*clearInterval(gameTimeInterval);
  gameTimeInterval = setInterval(() => {runGameTime(true)}, (1000/updateRate));*/
}
function whatsNew() {
  let updateMessage = "";
  for (let version in updateMessages) {
    if (version.charAt(2) == user.version.charAt(2)) {
      updateMessage += "<br>"+version+"<br>"+updateMessages[version]+"<br>";
    }
  }
  alertify.alert("What's New:"+updateMessage);
}


//Initialization
document.addEventListener("unload", () => {save()});
di("loading").addEventListener("click", (event) => {event.stopPropagation()});
wel("load", () => {
  setTimeout(() => {
    loadGame();
    checkUnlocks();
    intervals();
    /*refreshGameInterval();*/
  }, 1);
});


//Temp
/*progress();*/
const hideIds = ["tabAscensionb", "autoSacrificePPState", "apInfo", "apChallengeInfo"];
const hideClasses = ["incrementT2Unlocks", "incrementT3Unlocks", "incrementT4Unlocks", "coefficientT"];
for (let i=0; i<hideIds.length; i++) {hideId(hideIds[i])}
for (let i=0; i<hideClasses.length; i++) {hideClass(hideClasses[i])}
