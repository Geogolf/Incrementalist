function updater() {
  setInterval(() => {
    if (focused) {
      if (user.tab == "scale") {
        if (user.automate.inc.x || user.automate.scale.inc.p || user.automate.scale.inc.m || user.automate.scale.inc.e) {updatescaleinc()}
      }
      if (user.tab == "sac") {
        if (user.automate.inc.x) {updatesacip()}
      }
      if (user.tab == "ip") {
        if (user.automate.scale.inc.p || user.automate.inc.p[1] || user.automate.inc.p[2] || user.automate.inc.p[3] || user.automate.inc.p[4] || user.automate.inc.p[5]) {updateincp()}
        if (user.automate.scale.inc.m || user.automate.inc.m[1] || user.automate.inc.m[2] || user.automate.inc.m[3] || user.automate.inc.m[4] || user.automate.inc.m[5]) {updateincm()}
        if (user.automate.scale.inc.e || user.automate.inc.e[1] || user.automate.inc.e[2] || user.automate.inc.e[3] || user.automate.inc.e[4] || user.automate.inc.e[5]) {updateince()}
        let isTrue = false;
        for (let i = 1; i <= 5; i++) {if (user.automate.inc.p[i] || user.automate.inc.m[i] || user.automate.inc.e[i]) {isTrue = true}}
        if (isTrue) {updateincx()}
      }
      let isTrue = false;
      for (let i = 1; i <= 5; i++) {if (user.automate.inc.p[i] || user.automate.inc.m[i] || user.automate.inc.e[i]) {isTrue = true}}
      if (user.automate.inc.x || isTrue) {updateip()}
      if (user.automate.inc.x) {unlockip()}
      /*
      if (user.automate.inc.x || user.automate.inc.p[1] || user.automate.inc.p[2] || user.automate.inc.p[3] || user.automate.inc.p[4] || user.automate.inc.p[5] || user.automate.inc.m[1] || user.automate.inc.m[2] || user.automate.inc.m[3] || user.automate.inc.m[4] || user.automate.inc.m[5] || user.automate.inc.e[1] || user.automate.inc.e[2] || user.automate.inc.e[3] || user.automate.inc.e[4] || user.automate.inc.e[5] || user.automate.scale.inc.p || user.automate.scale.inc.m || user.automate.scale.inc.e) {updateip()}
      if (user.automate.inc.x) {updatesacip(); unlockip()}
      if (user.automate.inc.p[1] || user.automate.inc.p[2] || user.automate.inc.p[3] || user.automate.inc.p[4] || user.automate.inc.p[5] || user.automate.inc.m[1] || user.automate.inc.m[2] || user.automate.inc.m[3] || user.automate.inc.m[4] || user.automate.inc.m[5] || user.automate.inc.e[1] || user.automate.inc.e[2] || user.automate.inc.e[3] || user.automate.inc.e[4] || user.automate.inc.e[5]) {updateincx()}
      if (user.automate.scale.inc.p || user.automate.inc.p[1] || user.automate.inc.p[2] || user.automate.inc.p[3] || user.automate.inc.p[4] || user.automate.inc.p[5]) {updateincp()}
      if (user.automate.scale.inc.m || user.automate.inc.m[1] || user.automate.inc.m[2] || user.automate.inc.m[3] || user.automate.inc.m[4] || user.automate.inc.m[5]) {updateincm()}
      if (user.automate.scale.inc.e || user.automate.inc.e[1] || user.automate.inc.e[2] || user.automate.inc.e[3] || user.automate.inc.e[4] || user.automate.inc.e[5]) {updateince()}
      if (user.automate.inc.x || user.automate.scale.inc.p || user.automate.scale.inc.m || user.automate.scale.inc.e) {updatescaleinc()}
      */
    }
  }, (1000 / updaterate));
}
function updatetab(tab) {
  if (tab == "scale") {updatescaleinc()}
  if (tab == "sac") {updatesacip()}
  if (tab == "ip") {updateincp(); updateincm(); updateince(); updateincx()}
}
function updatesetting(id) {
  if (id == "shortendisplay") {
    if (user.active[id]) {
      d(id).style.backgroundColor = "rgb(50, 50, 50)";
      for (let i = 0; i < currencyids.length; i++) {
        d(currencyids[i] + "text").textContent = " " + currencyids[i].toUpperCase();
        d(currencyids[i] + "sectext").textContent = "";
        d("pb" + currencyids[i] + "c").style.width = "150px";
      }
    }
    else {
      d(id).style.backgroundColor = "rgb(25, 25, 25)";
      for (let i = 0; i < currencyids.length; i++) {
        d(currencyids[i] + "text").textContent = " " + currencynames[i] + " Points";
        d(currencyids[i] + "sectext").textContent = "You are gaining ";
        d("pb" + currencyids[i] + "c").style.width = "240px";
      }
    }
    return;
  }
  if (id == "creset") {
    if (user.confirm[id]) {d(id).style.backgroundColor = "rgb(50, 50, 50)"}
    else {d(id).style.backgroundColor = "rgb(25, 25, 25)"}
  }
  if (id == "csacrifice") {
    if (user.confirm[id]) {d(id).style.backgroundColor = "rgb(50, 50, 50)"}
    else {d(id).style.backgroundColor = "rgb(25, 25, 25)"}
  }
  if (id == "displaypause") {
    if (user.active[id]) {d(id).style.backgroundColor = "rgb(50, 50, 50)"}
    else {d(id).style.backgroundColor = "rgb(25, 25, 25)"}
    return;
  }
}
function updateip() {
  d("ipx").textContent = e(user.ip.x, 2);
  if (user.automate.inc.x) {d("ipsecx").textContent = e(getincxx().times(getautomateincxrate()))}
  else {d("ipsecx").textContent = 0}
  updatepbip();
}
function updatepbip() {
  let j = 0;
  for (let i = 0; i < goals.ip.length; i++) {if (user.ip.sac.gte(goals.ip[i]) && user.sacrifice.ip.gte(goals.ipsac[i])) {j = i + 1}}
  let g = goals.ip[j];
  let u = unlocknames.ip[j];
  if (g == undefined) {g = goals.ip[j - 1]}
  if (u == undefined) {u = "-"}
  /*let eg = e(nd(g)) + "IP";
  if (g.gte(infinity)) {eg = "Infinity"}
  let es = e(user.ip.sac) + "IP";
  if (user.ip.sac.gte(infinity)) {es = "Infinity"}*/
  d("pbip").style.width = nd(100).times(user.ip.sac).divide(g).toFixed(2) + "%";
  d("pbipx").textContent = e(user.ip.sac) + "IP/" + e(nd(g)) + "IP" /*es + "/" + eg*/;
  if (user.automate.inc.x) {d("pbiptime").innerHTML = u + "<br>" + time(nd(g).minus(user.ip.sac).divide(getincxx()).times(1000))}
  else {d("pbiptime").innerHTML = u + "<br>-"}
  if (user.ip.sac.gte(g)) {
    d("pbip").style.width = "100%";
    d("pbiptime").innerHTML = u + "<br>-";
  }
  let k = 0;
  for (let i = 0; i < goals.ipsac.length; i++) {if (user.sacrifice.ip.gte(goals.ipsac[i])) {k = i + 1}}
  g = goals.ipsac[k];
  let gg = goals.ipsac[j];
  if (gg == undefined) {gg = goals.ipsac[j - 1]}
  d("pbipsac").style.width = nd(100).times(user.sacrifice.ip).divide(g).toFixed(2) + "%";
  d("pbipsacx").textContent = e(user.sacrifice.ip) + "x/" + e(nd(g)) + "x";
  if (user.sacrifice.ip.gte(gg)) {
    d("pbipsac").style.width = "100%";
    d("pbipsacx").textContent = e(user.sacrifice.ip) + "x/" + e(nd(gg)) + "x";
  }
}
function updateautomation() {
  if (user.automation.scale.inc.p) {
    d("automationscaleincp").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationscaleincpcost");
    s("automationscaleincp");
  }
  else {
    d("automationscaleincp").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationscaleincpcost");
  }
  if (user.automation.scale.inc.m) {
    d("automationscaleincm").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationscaleincmcost");
  }
  else {
    d("automationscaleincm").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationscaleincmcost");
  }
  if (user.automation.scale.inc.e) {
    d("automationscaleince").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationscaleincecost");
  }
  else {
    d("automationscaleince").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationscaleincecost");
  }
  if (user.automation.inc.x) {
    d("automationincx").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationincxcost");
  }
  else {
    d("automationincx").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationincxcost");
  }
  if (user.automation.inc.p) {
    d("automationincp").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationincpcost");
  }
  else {
    d("automationincp").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationincpcost");
  }
  if (user.automation.inc.m) {
    d("automationincm").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationincmcost");
  }
  else {
    d("automationincm").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationincmcost");
  }
  if (user.automation.inc.e) {
    d("automationince").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationincecost");
  }
  else {
    d("automationince").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationincecost");
  }
}
function updateautomaterate() {
  let pmc = ["p", "m", "e"];
  for (let i = 0; i < 3; i++) {d("automatescaleinc" + pmc[i] + "rate").textContent = e(getautomaterate("rate").times(getautomaterate("bulk"))) + "/s"}
  d("automateincxrate").textContent = e(getautomateincxrate()) + "/s";
  for (let i = 1; i <= 5; i++) {for (let j = 0; j < 3; j++) {d("automateinc" + pmc[j] + i + "rate").textContent = e(getautomaterate("rate").times(getautomaterate("bulk"))) + "/s"}}
}
function updateincx() {
  d("incxx").textContent = "+" + e(getincxx());
}
function updateinc() {
  updateincp();
  updateincm();
  updateince();
}
function updateincp() {
  for (let i = 1; i <= 5; i++) {
    d("incp" + i + "x").textContent = "+" + e(getincp(i, "x"));
    d("incp" + i + "cost").textContent = e(getincp(i, "cost"));
  }
}
function updateincm() {
  for (let i = 1; i <= 5; i++) {
    d("incm" + i + "x").textContent = "*" + e(getincm(i, "x"));
    d("incm" + i + "cost").textContent = e(getincm(i, "cost"));
  }
}
function updateince() {
  for (let i = 1; i <= 5; i++) {
    d("ince" + i + "x").textContent = "^" + e(getince(i, "x"), 2, 2);
    d("ince" + i + "cost").textContent = e(getince(i, "cost"));
  }
}
function updateautomate() {
  if (user.automate.inc.x) {d("automateincx").style.backgroundColor = "rgb(50, 50, 50)"}
  else {d("automateincx").style.backgroundColor = "rgb(0, 0, 0)"}
  for (let i = 1; i <= 5; i++) {
    if (user.automate.inc.p[i]) {d("automateincp" + i).style.backgroundColor = "rgb(50, 50, 50)"}
    else {d("automateincp" + i).style.backgroundColor = "rgb(0, 0, 0)"}
    if (user.automate.inc.m[i]) {d("automateincm" + i).style.backgroundColor = "rgb(50, 50, 50)"}
    else {d("automateincm" + i).style.backgroundColor = "rgb(0, 0, 0)"}
    if (user.automate.inc.e[i]) {d("automateince" + i).style.backgroundColor = "rgb(50, 50, 50)"}
    else {d("automateince" + i).style.backgroundColor = "rgb(0, 0, 0)"}
  }
  if (user.automate.scale.inc.p) {d("automatescaleincp").style.backgroundColor = "rgb(50, 50, 50)"}
  else {d("automatescaleincp").style.backgroundColor = "rgb(0, 0, 0)"}
  if (user.automate.scale.inc.m) {d("automatescaleincm").style.backgroundColor = "rgb(50, 50, 50)"}
  else {d("automatescaleincm").style.backgroundColor = "rgb(0, 0, 0)"}
  if (user.automate.scale.inc.e) {d("automatescaleince").style.backgroundColor = "rgb(50, 50, 50)"}
  else {d("automatescaleince").style.backgroundColor = "rgb(0, 0, 0)"}
}
function updatescale() {
  updatescaleinc();
}
function updatescaleinc() {
  if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("incp1")])) {
    d("scaleincpx").innerHTML = "1/" + e(getscaleincp(1), 2, 2);
    for (let i = 2; i <= 5; i++) {
      if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("incp" + i)])) {
        d("scaleincpx").innerHTML += "<br>1/" + e(getscaleincp(i), 2, 2);
      }
    }
  }
  d("scaleincpcost").textContent = e(getscaleincpcost());
  if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("incm1")])) {
    d("scaleincmx").innerHTML = "1/" + e(getscaleincm(1), 2, 2);
    for (let i = 2; i <= 5; i++) {
      if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("incm" + i)])) {
        d("scaleincmx").innerHTML += "<br>1/" + e(getscaleincm(i), 2, 2);
      }
    }
  }
  d("scaleincmcost").textContent = e(getscaleincmcost());
  if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("ince1")])) {
    d("scaleincex").innerHTML = "1/" + e(getscaleince(1), 2, 2);
    for (let i = 2; i <= 5; i++) {
      if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("incm" + i)])) {
        d("scaleincex").innerHTML += "<br>1/" + e(getscaleince(i), 2, 2);
      }
    }
  }
  d("scaleincecost").textContent = e(getscaleincecost());
}
function updatesac() {
  updatesacip();
}
function updatesacip() {
  d("sacipx").textContent = e(user.sacrifice.ip) + "x";
  d("sacipxnext").textContent = e(getsacipxnext()) + "x";
  if (user.ip.sac.lt(getsacipcost())) {d("sacipcost").textContent = e(getsacipcost().minus(user.ip.sac))}
  else {d("sacipcost").textContent = 0}
}
function updateversion() {
  d("version").textContent = "Version: v" + user.version;
}
