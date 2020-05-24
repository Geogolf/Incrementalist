function updatesetting(id) {
  if (id == "sdisplay") {
    if (user.active.shortendisplay) {
      d(id).style.backgroundColor = "rgb(50, 50, 50)";
      for (let i = 0; i < currencyids.length; i++) {
        d(currencyids[i] + "text").textContent = " " + currencyids[i].toUpperCase();
        d(currencyids[i] + "sectext").textContent = "";
        d("pb" + currencyids[i] + "c").style.width = "117px";
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
  }
  if (id == "spb") {
    if (user.active.progressbar) {
      d(id).style.backgroundColor = "rgb(50, 50, 50)";
    }
    else {
      d(id).style.backgroundColor = "rgb(25, 25, 25)";
    }
  }
}
function updateip() {
  d("ipx").textContent = e(user.ip.x, 2);
  if (user.automate.inc.x) {d("ipsecx").textContent = e(getincxx())}
  else {d("ipsecx").textContent = 0}
  updatepbip();
}
function updatepbip() {
  for (let i = (goals.ip.length - 1); i >= 0; i--) {
    if (user.ip.pp.lt(goals.ip[i])) {
      d("pbip").style.width = nd(100).times(user.ip.pp).divide(goals.ip[i]).toFixed(2) + "%";
      d("pbipx").innerHTML = e(nd(100).times(user.ip.pp).divide(goals.ip[i]), 2, 2) + "%&rArr;" + unlocknames.ip[i];
      if (user.automate.inc.x) {d("pbiptime").textContent = time(nd(goals.ip[i]).minus(user.ip.pp).divide(getincxx()).times(1000))}
      else {d("pbiptime").textContent = "Infinite Time"}
      if (d("pbiptime").textContent == "0.000 Seconds") {d("pbiptime").textContent = "Infinite Time"}
    }
  }
  if (user.ip.pp.gte(goals.ip[goals.ip.length - 1])) {
    d("pbip").style.width = "100%";
    d("pbipx").textContent = "100%";
    h("pbiptime");
  }
}
function updateautomation() {
  if (user.automation.scale.inc.p) {
    d("automationscaleincp").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationscaleincpcost");
    s("automatescaleincp");
  }
  else {
    d("automationscaleincp").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationscaleincpcost");
    h("automatescaleincp");
  }
  if (user.automation.inc.x) {
    d("automationincx").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationincxcost");
    s("automateincx");
  }
  else {
    d("automationincx").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationincxcost");
    h("automateincx");
  }
  if (user.automation.inc.p) {
    d("automationincp").style.backgroundColor = "rgb(50, 50, 50)";
    for (let i = 2; i <= 5; i++) {
      if (user.ip.pp.gte(goals.ip[unlocks.ip.indexOf("incp" + i)])) {s("automateincp" + i)}
    }
    s("automateincp1");
    h("automationincpcost");
  }
  else {
    d("automationincp").style.backgroundColor = "rgb(0, 0, 0)";
    for (let i = 1; i <= 5; i++) {h("automateincp" + i)}
    s("automationincpcost");
  }
}
function updateautomationrate() {
  d("automationscaleincprate").textContent = e(getautomationrate()) + "/sec";
  d("automationincxrate").textContent = e(getautomationincxrate()) + "/sec";
  for (let i = 1; i <= 5; i++) {
    d("automationincp" + i + "rate").textContent = e(getautomationrate()) + "/sec";
  }
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
    d("incp" + i + "x").textContent = "+" + e(getincp(i, "x"), 2);
    d("incp" + i + "cost").textContent = e(getincp(i, "cost"), 2);
  }
}
function updateincm() {
  for (let i = 1; i <= 5; i++) {
    d("incm" + i + "x").textContent = "*" + e(getincm(i, "x"), 2);
    d("incm" + i + "cost").textContent = e(getincm(i, "cost"), 2);
  }
}
function updateince() {
  for (let i = 1; i <= 5; i++) {
    d("ince" + i + "x").textContent = "^" + e(getince(i, "x"), 2);
    d("ince" + i + "cost").textContent = e(getince(i, "cost"), 2);
  }
}
function updateautomate() {
  if (user.automate.inc.x) {d("automateincx").style.backgroundColor = "rgb(50, 50, 50)"}
  else {d("automateincx").style.backgroundColor = "rgb(0, 0, 0)"}
  for (let i = 1; i <= 5; i++) {
    if (user.automate.inc.p[i]) {d("automateincp" + i).style.backgroundColor = "rgb(50, 50, 50)"}
    else {d("automateincp" + i).style.backgroundColor = "rgb(0, 0, 0)"}
  }
  if (user.automate.scale.inc.p) {d("automatescaleincp").style.backgroundColor = "rgb(50, 50, 50)"}
  else {d("automatescaleincp").style.backgroundColor = "rgb(0, 0, 0)"}
}
function updatescale() {
  updatescaleinc();
}
function updatescaleinc() {
  d("scaleincpx").innerHTML = "1/" + e(getscaleincp(1), 2, 2);
  for (let i = 2; i <= 5; i++) {d("scaleincpx").innerHTML += "<br>1/" + e(getscaleincp(i), 2, 2)}
  d("scaleincpcost").textContent = e(getscaleincpcost());
}
function updateversion() {
  d("version").textContent = "Version: v" + user.version;
}
