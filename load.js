//Intervals
function brokenCheck() {setTimeout(() => {if (d("loading").style.display != "none") {s("debug"); s("loadingmsg"); return true} else {h("debug"); h("loadingmsg"); return false}}, 1000)}
function saving() {setInterval(() => {if (focused) {user.time = Date.now(); save(); clickrate = 0/*; obj = user*/}}, 1000)}
function save() {localStorage.setItem("user", JSON.stringify(user)); brokenUser = user}

//Loading
function load() {
  let data = JSON.parse(localStorage.getItem("user"));
  brokenUser = data;
  if (data != null && data.version != null) {loadData(data)}
  else {updates(); unlocking()}
}
function ndify(obj) {
  user.ip.x = nd(user.ip.x);
  user.ip.sac = nd(user.ip.sac);
  user.ip.pp = nd(user.ip.pp);
  user.ip.total = nd(user.ip.total);
  if (typeof user.sacrifice.ip.x == "undefined") {user.sacrifice.ip = nd(user.sacrifice.ip)}
  else {user.sacrifice.ip.x = nd(user.sacrifice.ip.x)}
}
function loadsame(obj1, obj2, array) {for (let i = 0; i < array.length; i++) {obj1[array[i]] = obj2[array[i]]}}
function loadData(data) {
  user = data;
  if (user.version == "0.0.0") {
    console.log("Loaded version " + user.version);
    user.active.displaypause = false;
    user.confirm = {}
    user.version = "0.1.0";
  }
  if (user.version == "0.1.0") {
    console.log("Loaded version " + user.version);
    user.sacrifice.ip = user.sacrifice.ip.x;
    user.sacrifice.pp = user.sacrifice.pp.x;
    user.sacrifice.ap = user.sacrifice.ap.x;
    user.sacrifice.tp = user.sacrifice.tp.x;
    user.sacrifice.dp = user.sacrifice.dp.x;
    user.sacrifice.gp = user.sacrifice.gp.x;
    if (nd(user.ip.sac).gte(1e30) && nd(user.sacrifice.ip).gte(10000)) {sacrifice('ip')}
    user.version = "0.1.1";
  }
  if (user.version == "0.1.1") {
    console.log("Loaded version " + user.version);
  }
  ndify(user);
  tab(user.tab);
  loadOffline();
  loadAutomate();
}
function loadOffline(ms) {
  let timeOffline = 0;
  if (typeof ms == "undefined") {timeOffline = Math.abs(user.time - Date.now())}
  else {timeOffline = ms}
  if (user.automate.inc.x) {
    user.ip.x = user.ip.x.plus(nd(timeOffline).divide(1000).times(getincxx()));
    user.ip.sac = user.ip.sac.plus(nd(timeOffline).divide(1000).times(getincxx()));
    user.ip.pp = user.ip.pp.plus(nd(timeOffline).divide(1000).times(getincxx()));
    user.ip.total = user.ip.total.plus(nd(timeOffline).divide(1000).times(getincxx()));
  }
  updates();
  unlocking();
  user.time = Date.now();
  save();
  console.log("Offline time: " + time(nd(timeOffline)));
}
function loadAutomate() {
  let pme = ["p", "m", "e"];
  for (let i = 0; i < 3; i++) {
    if (user.automate.scale.inc[pme[i]]) {autoInterval.scale.inc[pme[i]]()}
    for (let j = 1; j <= 5; j++) {if (user.automate.inc[pme[i]][j]) {autoInterval.inc[pme[i]](j)}}
  }
  if (user.automate.inc.x) {autoInterval.inc.x()}
}

//Resets
function resetSacrifice(layer) {
  if (layer == "ip") {
    user.automation.inc = {x: false, p: false, m: false, e: false}
    user.automate.scale.inc = {p: false, m: false, e: false}
    user.automate.inc = {p: ["null", false, false, false, false, false], m: ["null", false, false, false, false, false], e: ["null", false, false, false, false, false]}
    user.inc = {x: 0, p: ["null", 0, 0, 0, 0, 0], m: ["null", 0, 0, 0, 0, 0], e: ["null", 0, 0, 0, 0, 0]}
    user.scale.inc = {p: 0, m: 0, e: 0}
  }
}
function resetPrestige() {
  
}

//Other
function updates() {
  for (let i = 0; i < settingids.length; i++) {updatesetting(settingids[i])}
  updateip();
  updateautomation();
  updateautomaterate();
  updateincx();
  updateinc();
  updateautomate();
  updatescale();
  updatesac();
  updateversion();
}
const tempHide = ["pp", "space1", "ap", "space2", "tp", "space3", "dp", "space4", "gp", "btabpp", "btabap", "btabtp", "btabdp", "btabgp", "btabach"];
for (let i = 0; i < tempHide.length; i++) {h(tempHide[i])}
