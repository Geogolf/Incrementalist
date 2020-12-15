//Fix Data
function fixnd(obj) {
  if (typeof obj.ip.current != "undefined") {obj.ip.current = nd(obj.ip.current)}
  if (typeof obj.ip.sac != "undefined") {obj.ip.sac = nd(obj.ip.sac)}
  if (typeof obj.ip.total != "undefined") {obj.ip.total = nd(obj.ip.total)}
  if (typeof obj.ip.highest != "undefined") {obj.ip.highest = nd(obj.ip.highest)}
  if (typeof obj.ip.infinite != "undefined") {obj.ip.infinite = nd(obj.ip.infinite)}
  if (typeof obj.ip.equationClicks != "undefined") {obj.ip.equationClicks = nd(obj.ip.equationClicks)}
  if (typeof obj.pp.current != "undefined") {obj.pp.current = nd(obj.pp.current)}
  if (typeof obj.pp.sac != "undefined") {obj.pp.sac = nd(obj.pp.sac)}
  if (typeof obj.pp.total != "undefined") {obj.pp.total = nd(obj.pp.total)}
  if (typeof obj.pp.highest != "undefined") {obj.pp.highest = nd(obj.pp.highest)}
  if (typeof obj.pp.infinite != "undefined") {obj.pp.infinite = nd(obj.pp.infinite)}
  if (typeof obj.pp.pt.refundAmount != "undefined") {obj.pp.pt.refundAmount = nd(obj.pp.pt.refundAmount)}
  if (typeof obj.automation.Prestige.at != "undefined") {obj.automation.Prestige.at = nd(obj.automation.Prestige.at)}
  if (typeof obj.pp.lastGain != "undefined") {obj.pp.lastGain = nd(obj.pp.lastGain)}
}

//Load
function loadGame() {
  let data = JSON.parse(localStorage.getItem("user"));
  if (data != null) {
    loadData(data);
    brokenUser = JSON.parse(JSON.stringify(data));
    fixnd(brokenUser);
  }
  else {loadData(setUser()); hideId("offlineBox")}
  di("loadingScreen").style.opacity = 0;
  setTimeout(() => {hideId("loadingScreen")}, 500);
}
function loadData(data) {
  let versionStart = data.version;
  let updated = false;
  /*resetAll(false);*/
  user = JSON.parse(JSON.stringify(data));
  if (user.version == "0.0.0") {
    user.active.displaypause = false;
    user.confirm = {creset: true, csacrifice: true}
    user.version = "0.1.0";
  }
  if (user.version == "0.1.0") {
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
    user.pp.extra = 0;
    user.active.aeAutomates = undefined;
    user.active.displaypause = true;
    user.version = "0.1.2";
  }
  if (user.version == "0.1.2") {
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
      for (let k = 0; k <= 4; k++) {user.automate["increment" + letters[i].toUpperCase()][k] = user.automate.inc[letters[i]][k + 1]}
      user.scaling[letters[i]] = 0;
    }
    user.sacrifice.ip = 0;
    let ips = ["x", "sac", "total", "highest"];
    let infinite = "1e100";
    for (let i = 0; i < ips.length; i++) {if (nd(user.ip[ips[i]]).gte(infinite)) {user.ip[ips[i]] = infinite}}
    user.ip.total = nd(user.ip.total);
    /*while (user.ip.total.gte(getSacrificeIPCost())) {user.sacrifice.ip++}*/
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
  }
  if (user.version == "0.2.0") {
    user.version = "0.2.1";
  }
  if (user.version == "0.2.1") {
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
    let tempTab = user.tab;
    user.tab = {}
    user.tab.main = tempTab;
    user.tab.Prestige = user.tabPrestige;
    user.tab.Achievements = "Normal";
    user.options = {}
    if (user.notation == "Scientific" || user.notation == "Logarithm" || user.notation == "Blind") {user.options.notation = user.notation}
    else {user.options.notation = "Scientific"}
    user.options.confirmations = [];
    for (con in user.confirmation) {if (user.confirmation) {user.options.confirmations.push(con.charAt(0).toUpperCase()+con.slice(1))}}
    user.options.logpb = user.logpb;
    if (user.achievements.includes("ach3-3")) {user.achievements.splice(user.achievements.indexOf("ach3-3"))}
    if (user.achievements.includes("ach3-4")) {user.achievements.splice(user.achievements.indexOf("ach3-4"))}
    user.eggs = [];
    user.automation = {IP: {buyMax: false, bought: 0, enabled: false}, IncrementP: {buyMax: false, bought: 0, enabled: [false, false, false, false, false]}, IncrementM: {buyMax: false, bought: 0, enabled: [false, false, false, false, false]}, IncrementE: {buyMax: false, bought: 0, enabled: [false, false, false, false, false]}, SacrificeIP: {buyMax: false, bought: 0, enabled: false}, Prestige: {buyMax: false, bought: 0, enabled: false}}
    user.automation.IP.bought = user.auto.ip;
    user.automation.IP.enabled = user.automate.ip;
    let names = ["P", "M", "E"];
    for (let i=0; i<names.length; i++) {user.automation["Increment"+names[i]].bought = user.auto["increment"+names[i]]}
    for (let i=0; i<5; i++) {for (let k=0; k<names.length; k++) {user.automation["Increment"+names[k]].enabled[i] = user.automate["increment"+names[k]][i]}}
    user.automation.SacrificeIP.bought = user.auto.sacrificeIP;
    user.automation.SacrificeIP.enabled = user.automate.sacrificeIP;
    user.automation.Prestige.at = "1";
    user.sacrifice.IP = user.sacrifice.ip;
    if (typeof user.sacrifice.pp != "undefined") {user.sacrifice.PP = user.sacrifice.pp}
    else {user.sacrifice.PP = 0}
    let tempScaling = user.scaling;
    for (let i=0; i<names.length; i++) {
      user.scaling[names[i]] = {buyMax: false, bought: 0}
      user.scaling[names[i]].bought = tempScaling[names[i].toLowerCase()];
    }
    user.ip.current = user.ip.x;
    if (user.pp.count > 0) {user.ip.infinite = "1e1000"}
    else {user.ip.infinite = "1e100"}
    user.ip.equationClicks = user.increment.ip;
    user.ip.increment = {P: {bought: []}, M: {bought: []}, E: {bought: []}}
    for (let i=0; i<names.length; i++) {user.ip.increment[names[i]].bought = user.increment[names[i].toLowerCase()]}
    user.pp.current = user.pp.total;
    user.pp.sac = user.pp.total;
    user.pp.highest = user.pp.total;
    user.pp.infinite = "1e100";
    user.pp.milestones = 0;
    user.pp.pt = user.pt;
    user.pp.pt.cells = [];
    user.pp.pt.refund = false;
    user.pp.pt.refundAmount = "0";
    user.pp.challenge = user.challenge.pp;
    user.pp.challenge.push({in: false, count: 0});
    user.time = {}
    user.time.lastUpdate = user.timeLastOnline;
    user.time.played = Date.now()-user.timeStart;
    user.time.thisPrestige = Date.now()-user.pp.timeStart;
    user.time.bestPrestige = user.pp.bestTime;
    user.beta = false;
    user.atEnd = false;
    let deletes = ["notation", "confirmation", "logpb", "auto", "automate", "max", "increment", "pt", "challenge", "timeLastOnline", "timeStart", "uiRate"];
    for (let i=0; i<deletes.length; i++) {delete user[deletes[i]]}
    for (let i=0; i<names.length; i++) {delete user.scaling[names[i].toLowerCase()]}
    delete user.sacrifice.ip;
    if (typeof user.sacrifice.pp != "undefined") {delete user.sacrifice.pp}
    delete user.ip.x;
    delete user.pp.x;
    delete user.pp.timeStart;
    delete user.pp.bestTime;
    user.version = "0.4.0";
  }
  if (user.version == "0.4.0") {
    user.options.uiRate = 20;
    user.automation.IncrementT = {buyMax: false, bought: 0, enabled: [false, false, false, false, false]}
    user.ip.increment.T = {}
    user.ip.increment.T.bought = [0, 0, 0, 0, 0];
    user.pp.lastGain = 0;
    if (user.pp.pt.cells.includes("pt3-1") || user.pp.pt.cells.includes("pt3-4")) {
      if (user.pp.pt.cells.includes("pt3-1") && user.pp.pt.cells.includes("pt3-4")) {
        user.pp.current = Number(user.pp.current)+150;
        user.pp.pt.refundAmount = Number(user.pp.pt.refundAmount)-150;
      }
      else {
        user.pp.current = Number(user.pp.current)+100;
        user.pp.pt.refundAmount = Number(user.pp.pt.refundAmount)-100;
      }
    }
    user.pp.challenge.push({in: false, count: 0});
    user.time.bestPrestige = 31536000000;
    user.version = "0.4.1";
  }
  if (user.version == "0.4.1") {
    user.options.smartAutoPrestige = false;
    user.atEnd = false;
    if (user.eggs.includes("egg1-2")) {user.eggs.splice(user.eggs.indexOf("egg1-2"), 1)}
    user.version = "0.5.0";
  }
  if (user.version == "0.5.0") {
    user.options.variableAutomation = false;
    if (user.pp.pt.cells.includes("pt5-1") || user.pp.pt.cells.includes("pt5-3")) {
      if (user.pp.pt.cells.includes("pt5-1") && user.pp.pt.cells.includes("pt5-3")) {
        user.pp.current = Number(user.pp.current)+300000;
        user.pp.pt.refundAmount = Number(user.pp.pt.refundAmount)-300000;
      }
      else {
        user.pp.current = Number(user.pp.current)+100000;
        user.pp.pt.refundAmount = Number(user.pp.pt.refundAmount)-100000;
      }
    }
    user.version = "0.5.1";
  }
  if (user.version == "0.5.1") {
    user.atEnd = false;
    if (user.options.confirmations.includes("Reset")) {user.options.confirmations.splice(user.options.confirmations.indexOf("Reset"), 1)}
    user.version = "0.5.2";
  }
  if (user.version == "0.5.2") {
    for (let name in automation) {if (typeof user.automation[name] != "undefined") {user.automation[name].unlocked = false}}
    let sacIP = user.sacrifice.IP;
    let sacPP = user.sacrifice.PP;
    user.sacrifice.IP = {}
    user.sacrifice.IP.count = sacIP;
    user.sacrifice.IP.unlocked = false;
    user.sacrifice.PP = {}
    user.sacrifice.PP.count = sacPP;
    user.sacrifice.PP.unlocked = false;
    for (let name in scaling) {user.scaling[name].unlocked = false}
    for (let name in increment) {user.ip.increment[name].unlocked = [false, false, false, false, false]}
    user.ip.increment.P.unlocked[0] = true;
    user.pp.challenge[4].count = 0;
    takeAchievement("ach1-6");
    user.pp.unlocked = false;
    delete user.options.variableAutomation;
    user.version = "0.5.3";
  }
  if (user.version == "0.5.3") {
    user.version = "0.5.4";
    updated = true;
  }
  if (user.version == "0.5.4") {
    user.pp.pt.unlocked = false;
    user.pp.challenge[0] = {unlocked: false};
    user.automation.Automation = {buyMax: false, bought: false, enabled: {IP: false, IncrementP: false, IncrementM: false, IncrementE: false, IncrementT: false, SacrificeIP: false, Prestige: false, Automation: false, Scaling: false}, unlocked: false}
    user.automation.Scaling = {buyMax: false, bought: false, enabled: {P: false, M: false, E: false}, unlocked: false}
    for (let name in automation) {
      if (name == "Automation" || name == "Scaling") {continue}
      let tempEnabled = user.automation[name].enabled;
      user.automation[name].enabled = {}
      if (Array.isArray(tempEnabled)) {
        for (let i=0; i<tempEnabled.length; i++) {user.automation[name].enabled[i] = tempEnabled[i]}
      }
      else {user.automation[name].enabled["0"] = tempEnabled}
    }
    if (user.time.bestPrestige < 1) {user.time.bestPrestige = 1}
    user.pp.current = nd(user.pp.current);
    if (user.pp.pt.cells.includes("pt3-2") && user.pp.pt.cells.includes("pt3-3")) {
      if (user.pp.current.gte(125)) {user.pp.current = user.pp.current.minus(125)}
      else {refundPT()}
    }
    user.pp.challenge.push({in: false, count: 0});
    (user.automation.Prestige.bought > 0) ? user.automation.Prestige.bought = true : user.automation.Prestige.bought = false;
    user.pp.milestones = {count: 0, unlocked: 0}
    if (user.automation.Automation.bought > 0) {user.automation.Automation.bought = true} else {user.automation.Automation.bought = false}
    (user.automation.Scaling.bought > 0) ? user.automation.Scaling.bought = true : user.automation.Scaling.bought = false;
    if (typeof user.pp.bestPPs != "undefined") {delete user.pp.bestPPs}
    user.version = "0.5.5";
  }
  if (user.version == "0.5.5") {
    if (user.ip.increment.T.bought[0] > 2) {user.ip.increment.T.bought[0] = 2}
    if (typeof user.pp.bestPPs != "undefined") {delete user.pp.bestPPs}
    for (let name in increment) {user.ip.increment[name].expUnlocked = false}
    lastClicked = undefined;
    user.atEnd = false;
    user.version = "0.6.0";
  }
  if (user.version == "0.6.0") {
    if (typeof user.pp.bestPPs != "undefined") {delete user.pp.bestPPs}
    user.options.decimals = 2;
    user.options.retryChallenges = false;
    user.options.changeTabOnChallenge = false;
    user.options.showOffline = true;
    user.version = "0.6.1";
    updated = true;
  }
  for (let i=0; i<user.eggs.length; i++) {showId(user.eggs[i])}
  fixnd(user);
  showTab((user.tab.main == "Options") ? "Increment" : user.tab.main);
  setPrestigeAt(user.automation.Prestige.at);
  updateAutomationStates();
  resizeCanvases();
  di("version").textContent = user.version + " (Beta)";
  console.log("Offline for "+showTime(nd(Date.now()-user.time.lastUpdate)));
  simulateTime(Date.now()-user.time.lastUpdate, false, user.options.showOffline);
  /*setUIRate();*/
  save();
  setTimeout(() => {
    if (updated) {
      let updateMessage = "";
      for (let version in updateMessages) {
        updateMessage += "<br>"+version+"<br>"+updateMessages[version]+"<br>";
        if (version == versionStart) {break}
      }
      alertify.alert("What's New:"+updateMessage);
      alertify.message("Loaded Version " + versionStart + " > " + user.version)
    }
    else {alertify.message("Loaded Version " + user.version)}
  }, 101);
}
