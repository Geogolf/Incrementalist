function brokenCheck() {setTimeout(() => {if (d("loading").style.display != "none") {s("debug"); s("loadingmsg"); return true} else {h("debug"); h("loadingmsg"); return false}}, 1000)}
setInterval(() => {if (focused) {user.time = Date.now(); save(); clickrate = 0/*; obj = user*/}}, 1000);
function save() {localStorage.setItem("user", JSON.stringify(user)); brokenUser = user}
function load() {
  let data = JSON.parse(localStorage.getItem("user"));
  brokenUser = data;
  focused = true;
  if (data != null) {loadData(data)}
  else {save()}
}
function ndify(obj) {
  for (key in obj.ip) {user.ip[key] = nd(obj.ip[key])}
  for (key in obj.pp) {user.pp[key] = nd(obj.pp[key])}
  for (key in obj.ap) {user.ap[key] = nd(obj.ap[key])}
  for (key in obj.tp) {user.tp[key] = nd(obj.tp[key])}
  for (key in obj.dp) {user.dp[key] = nd(obj.dp[key])}
  for (key in obj.gp) {user.gp[key] = nd(obj.gp[key])}
  user.sacrifice.ip.x = nd(user.sacrifice.ip.x);
  user.sacrifice.pp.x = nd(user.sacrifice.pp.x);
  user.sacrifice.ap.x = nd(user.sacrifice.ap.x);
  user.sacrifice.tp.x = nd(user.sacrifice.tp.x);
  user.sacrifice.dp.x = nd(user.sacrifice.dp.x);
  user.sacrifice.gp.x = nd(user.sacrifice.gp.x);
}
function loadData(d) {
  let data = d;
  /*if (data.version == "0.0.0") {
    user = setUser("0.0.1");
    user.time = Date.now();
    console.log("Loaded version " + data.version);
    data = user;
  }
  if (data.version == "0.0.1") {
    user = setUser("0.0.1");
    let dataArray = Object.keys(data);
    let userArray = Object.keys(user);
    let difference = false;
    for (let i = 0; i < dataArray.length; i++) {if (dataArray[i] !== userArray[i]) {difference = true}}
    if (!difference) {
      user = data;
      user.time = Date.now();
      console.log("Loaded version " + data.version);
    }
    else {console.log("Error-loadData1"); user = setUser()}
  }*/
  if (data.version == "0.0.0") {
    user = setUser("0.0.0");
    let dataArray = Object.keys(data);
    let userArray = Object.keys(user);
    let difference = false;
    for (let i = 0; i < dataArray.length; i++) {if (dataArray[i] !== userArray[i]) {difference = true}}
    if (!difference) {user = data; user.time = Date.now(); console.log("Loaded version " + data.version)}
    else {console.log("Error-loadData1"); user = setUser()}
  }
  ndify(user);
  tab(user.tab);
  loadOffline();
  loadAutomate();
}
function loadOffline() {
  let timeOffline = Math.abs(user.time - Date.now());
  if (user.automate.inc.x) {
    user.ip.x = user.ip.x.plus(Math.abs(timeOffline / 1000) * getincxx());
    user.ip.sac = user.ip.sac.plus(Math.abs(timeOffline / 1000) * getincxx());
    user.ip.pp = user.ip.pp.plus(Math.abs(timeOffline / 1000) * getincxx());
    user.ip.total = user.ip.total.plus(Math.abs(timeOffline / 1000) * getincxx());
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
const tempHide = ["pp", "space1", "ap", "space2", "tp", "space3", "dp", "space4", "gp", "ince2", "ince3", "ince4", "ince5", "btabpp", "btabap", "btabtp", "btabdp", "btabgp", "automationince", "scaleince", "ince1", "btabach", "automatescaleince"];
for (let i = 0; i < tempHide.length; i++) {h(tempHide[i])}
