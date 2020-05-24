//vars
const version = "0.0.0";
function getUser(v) {
  if (typeof v == "undefined") {v = version}
  if (v == "0.0.0") {
    return {
      ip: {x: nd(10), pp: nd(10), ap: nd(10), tp: nd(10), dp: nd(10), gp: nd(10), total: nd(10), highest: nd(10)},
      pp: {x: nd(0), ap: nd(0), tp: nd(0), dp: nd(0), gp: nd(0), total: nd(0), highest: nd(0)},
      ap: {x: nd(0), tp: nd(0), dp: nd(0), gp: nd(0), total: nd(0), highest: nd(0)},
      tp: {x: nd(0), dp: nd(0), gp: nd(0), total: nd(0), highest: nd(0)},
      dp: {x: nd(0), gp: nd(0), total: nd(0), highest: nd(0)},
      gp: {x: nd(0), total: nd(0), highest: nd(0)},
      inc: {x: 0, p: ["null", 0, 0, 0, 0, 0], m: ["null", 0, 0, 0, 0, 0], e: ["null", 0, 0, 0, 0, 0]},
      automation: {scale: {inc: {p: false, m: false, e: false}}, inc: {x: false, p: false, m: false, e: false}},
      automate: {scale: {inc: {p: false, m: false, e: false}}, inc: {p: [false, false, false, false, false, false]}},
      scale: {inc: {p: 0, m: 0, e: 0}},
      active: {shortendisplay: false, progressbar: false},
      /*show: {ip: 0, pp: 0, ap: 0, tp: 0, dp: 0, gp: 0},*/
      tab: 'ip',
      version: "0.0.0",
    }
  }
}
var user = {}
var setting = false;
const settingids = ["sdisplay", "spb"];
const currencyids = ["ip", "pp", "ap", "tp", "dp", "gp"];
const currencynames = ["Increment", "Prestige", "Ascension", "Transcension", "Divinity", "WIP"];
const tabs = ["auto", "scale", "sac", "ach", "ip", "pp", "ap", "tp", "dp", "gp"];
const goals = {
  ip: [100, 2000, 2000, 10000, 25000, 100000, 500000, 1e6, 1e7, 1e8, 1e9, 1e10],
  pp: [],
  ap: [],
  tp: [],
  dp: [],
  gp: [],
}
const unlocks = {
  ip: ["incp2", "btabauto", "ipsec", "incp3", "automationincp", "btabscale", "incp4", "incp5", "incm1", "incm2", "automationscaleincp", "incm3"],
  pp: [],
  ap: [],
  tp: [],
  dp: [],
  gp: [],
}
const unlocknames = {
  ip: ["Increment", "Automation", "Automation", "Increment", "Automation", "Scaling", "Increment", "Increment", "Increment", "Increment", "Automation", "Increment"],
  pp: [],
  ap: [],
  tp: [],
  dp: [],
  gp: [],
}

//do not change
const decimals = 5; //Accuracy of numbers
const updaterate = 24; //Updates per second
const tickrate = 0; //Millisecond per tick

//global functions
function automation(tab, con, type) {
  if (tab == 'scale') {
    if (con == 'inc') {
      if (type == 'p' && user.ip.x.gte(1e9) && !user.automation.scale.inc.p) {
        user.ip.x = user.ip.x.minus(1e9);
        user.automation.scale.inc.p = true;
        updateip();
        updateautomation();
        return;
      }
      if (type == 'm' && user.ip.x.gte(1e100) && !user.automation.scale.inc.m) {
        user.ip.x = user.ip.x.minus(1e100);
        user.automation.scale.inc.m = true;
        updateip();
        updateautomation();
        return;
      }
      if (type == 'e' && user.ip.x.gte(1e100) && !user.automation.scale.inc.e) {
        user.ip.x = user.ip.x.minus(1e100);
        user.automation.scale.inc.e = true;
        updateip();
        updateautomation();
        return;
      }
    }
  }
  if (tab == 'inc') {
    if (type == 'x' && user.ip.x.gte(1000) && !user.automation.inc.x) {
      user.ip.x = user.ip.x.minus(1000);
      user.automation.inc.x = true;
      updateip();
      updateautomation();
      return;
    }
    if (type == 'p' && user.ip.x.gte(10000) && !user.automation.inc.p) {
      user.ip.x = user.ip.x.minus(10000);
      user.automation.inc.p = true;
      updateip();
      updateautomation();
      return;
    }
    if (type == 'm' && !user.automation.inc.m) {
      user.automation.inc.m = true;
      updateip();
      updateautomation();
      return;
    }
    if (type == 'e' && !user.automation.inc.e) {
      user.automation.inc.e = true;
      updateip();
      updateautomation();
      return;
    }
  }
}

//unlocks
function unlocking() {
  unlockip();
}
function unlockip() {
  for (let i = 0; i < unlocks.ip.length; i++) {
    let id = unlocks.ip[i];
    if (user.ip.pp.gte(goals.ip[i])) {
      s(id);
      if (user.automation.inc.p) {
        if (id == "incp1") {s("automateincp1")}
        if (id == "incp2") {s("automateincp2")}
        if (id == "incp3") {s("automateincp3")}
        if (id == "incp4") {s("automateincp4")}
        if (id == "incp5") {s("automateincp5")}
      }
    }
  }
}

//settings / debug
function settings() {
  setting = !setting;
  if (setting) {h("screen"); s("settings"); d("bsettings").textContent = "X"}
  else {s("screen"); h("settings"); d("bsettings").innerHTML = "&#9881"}
}
function exporty() {
  
}
function importy() {
  
}
function reset() {
  
}
function shortendisplay() {
  user.active.shortendisplay = !user.active.shortendisplay;
  updatesetting("sdisplay");
}
function progressbar() {
  user.active.progressbar = !user.active.progressbar;
  updatesetting("spb");
}

//run on page load
hide();
user = getUser();
tab(user.tab);
h("settings");
updates();
unlocking();
d("loading").style.opacity = 0;
d("game").style.opacity = 1;
setTimeout(() => {h("loading")}, 750);
