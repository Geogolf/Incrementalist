function updater() {
  setInterval(() => {
    if (focused) {
      if (user.automate.inc.x || user.automate.inc.p[1] || user.automate.inc.p[2] || user.automate.inc.p[3] || user.automate.inc.p[4] || user.automate.inc.p[5] || user.automate.inc.m[1] || user.automate.inc.m[2] || user.automate.inc.m[3] || user.automate.inc.m[4] || user.automate.inc.m[5] || user.automate.inc.e[1] || user.automate.inc.e[2] || user.automate.inc.e[3] || user.automate.inc.e[4] || user.automate.inc.e[5] || user.automate.scale.inc.p || user.automate.scale.inc.m || user.automate.scale.inc.e) {updateip()}
      if (user.automate.inc.x) {updatesacip(); unlockip()}
      if (user.automate.inc.p[1] || user.automate.inc.p[2] || user.automate.inc.p[3] || user.automate.inc.p[4] || user.automate.inc.p[5] || user.automate.inc.m[1] || user.automate.inc.m[2] || user.automate.inc.m[3] || user.automate.inc.m[4] || user.automate.inc.m[5] || user.automate.inc.e[1] || user.automate.inc.e[2] || user.automate.inc.e[3] || user.automate.inc.e[4] || user.automate.inc.e[5]) {updateincx()}
      if (user.automate.scale.inc.p || user.automate.inc.p[1] || user.automate.inc.p[2] || user.automate.inc.p[3] || user.automate.inc.p[4] || user.automate.inc.p[5]) {updateincp()}
      if (user.automate.scale.inc.m || user.automate.inc.m[1] || user.automate.inc.m[2] || user.automate.inc.m[3] || user.automate.inc.m[4] || user.automate.inc.m[5]) {updateincm()}
      if (user.automate.scale.inc.e || user.automate.inc.e[1] || user.automate.inc.e[2] || user.automate.inc.e[3] || user.automate.inc.e[4] || user.automate.inc.e[5]) {updateince()}
      if (user.automate.inc.x || user.automate.scale.inc.p || user.automate.scale.inc.m || user.automate.scale.inc.e) {updatescaleinc()}
    }
  }, (1000 / updaterate));
}
function updatesetting(id) {
  /*if (id == "sdisplay") {
    if (user.active.shortendisplay) {
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
  }
  if (id == "spb") {
    if (user.active.progressbar) {
      d(id).style.backgroundColor = "rgb(50, 50, 50)";
    }
    else {
      d(id).style.backgroundColor = "rgb(25, 25, 25)";
    }
  }*/
}
function updateip() {
  d("ipx").textContent = e(user.ip.x, 2);
  if (user.automate.inc.x) {d("ipsecx").textContent = e(getincxx())}
  else {d("ipsecx").textContent = 0}
  updatepbip();
}
function updatepbip() {
  for (let i = (goals.ip.length - 1); i >= 0; i--) {
    if (user.ip.sac.lt(goals.ip[i])) {
      d("pbip").style.width = nd(100).times(user.ip.sac).divide(goals.ip[i]).toFixed(2) + "%";
      d("pbipx").innerHTML = e(nd(100).times(user.ip.sac).divide(goals.ip[i]), 2, 2) + "%&rArr;" + unlocknames.ip[i];
      if (user.automate.inc.x) {d("pbiptime").textContent = time(nd(goals.ip[i]).minus(user.ip.sac).divide(getincxx()).times(1000))}
      else {d("pbiptime").textContent = "Infinite Time"; d("pbiptime").textContent = "-"}
      if (d("pbiptime").textContent == "0.000 Seconds") {d("pbiptime").textContent = "Infinite Time"}
    }
  }
  if (user.ip.sac.gte(goals.ip[goals.ip.length - 1])) {
    d("pbip").style.width = "100%";
    d("pbipx").textContent = "100%";
    d("pbiptime").textContent = "-";
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
    /*if (user.ip.x.lt(goals.ip[unlocks.ip[unlocks.ip.indexOf("automationcscaleincp")]])) {h("automationscaleincp")}
    else {s("automationscaleincp")}*/
  }
  if (user.automation.scale.inc.m) {
    d("automationscaleincm").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationscaleincmcost");
    /*s("automationscaleincm");*/
  }
  else {
    d("automationscaleincm").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationscaleincmcost");
    /*if (user.ip.x.lt(goals.ip[unlocks.ip[unlocks.ip.indexOf("automationcscaleincm")]])) {h("automationscaleincm")}
    else {s("automationscaleincm")}*/
  }
  if (user.automation.scale.inc.e) {
    d("automationscaleince").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationscaleincecost");
    /*s("automationscaleince");*/
  }
  else {
    d("automationscaleince").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationscaleincecost");
    /*h("automationscaleince");*/
  }
  if (user.automation.inc.x) {
    d("automationincx").style.backgroundColor = "rgb(50, 50, 50)";
    h("automationincxcost");
    /*s("automateincx");*/
  }
  else {
    d("automationincx").style.backgroundColor = "rgb(0, 0, 0)";
    s("automationincxcost");
    /*h("automateincx");*/
  }
  if (user.automation.inc.p) {
    d("automationincp").style.backgroundColor = "rgb(50, 50, 50)";
    /*for (let i = 2; i <= 5; i++) {
      if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("incp" + i)])) {s("automateincp" + i)}
    }
    s("automateincp1");*/
    h("automationincpcost");
  }
  else {
    d("automationincp").style.backgroundColor = "rgb(0, 0, 0)";
    /*for (let i = 1; i <= 5; i++) {h("automateincp" + i)}*/
    s("automationincpcost");
  }
  if (user.automation.inc.m) {
    d("automationincm").style.backgroundColor = "rgb(50, 50, 50)";
    /*for (let i = 1; i <= 5; i++) {
      if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("incm" + i)])) {s("automateincm" + i)}
    }*/
    h("automationincmcost");
  }
  else {
    d("automationincm").style.backgroundColor = "rgb(0, 0, 0)";
    /*for (let i = 1; i <= 5; i++) {h("automateincm" + i)}*/
    s("automationincmcost");
  }
  if (user.automation.inc.e) {
    d("automationince").style.backgroundColor = "rgb(50, 50, 50)";
    /*for (let i = 1; i <= 5; i++) {
      if (user.ip.sac.gte(goals.ip[unlocks.ip.indexOf("ince" + i)])) {s("automateince" + i)}
    }*/
    h("automationincecost");
  }
  else {
    d("automationince").style.backgroundColor = "rgb(0, 0, 0)";
    /*for (let i = 1; i <= 5; i++) {h("automateince" + i)}*/
    s("automationincecost");
  }
}
function updateautomaterate() {
  let pmc = ["p", "m", "e"];
  for (let i = 0; i < 3; i++) {d("automatescaleinc" + pmc[i] + "rate").textContent = e(getautomaterate()) + "/s";}
  d("automateincxrate").textContent = e(getautomateincxrate()) + "/s";
  for (let i = 1; i <= 5; i++) {for (let j = 0; j < 3; j++) {d("automateinc" + pmc[j] + i + "rate").textContent = e(getautomaterate()) + "/s"}}
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
}
function updatesac() {
  updatesacip();
}
function updatesacip() {
  d("sacipx").textContent = e(user.sacrifice.ip.x) + "x";
  d("sacipxnext").textContent = e(getsacipxnext()) + "x";
  if (user.ip.sac.lt(getsacipcost())) {d("sacipcost").textContent = e(getsacipcost().minus(user.ip.sac))}
  else {d("sacipcost").textContent = 0}
}
function updateversion() {
  d("version").textContent = "Version: v" + user.version;
}
