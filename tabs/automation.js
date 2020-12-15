//Data
const automation = {
  "IP": {
    currency: "ip",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "1000", effect: 10},
      {type: "e", scaleAt: 30, newCost: "1e33", effect: 1.1},
      {type: "e", scaleAt: 42, newCost: "3.7e103", effect: 1.2}
    ],
    inTab: "Increment",
    hasKey: false,
    keys: ["0"],
    type: "rate"
  },
  "IncrementP": {
    currency: "ip",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "100000", effect: 100},
      {type: "e", scaleAt: 14, newCost: "1e33", effect: 1.25},
      {type: "e", scaleAt: 19, newCost: "5.11e100", effect: 1.5}
    ],
    inTab: "Increment",
    hasKey: true,
    keys: ["0", "1", "2", "3", "4"],
    type: "rate"
  },
  "IncrementM": {
    currency: "ip",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "1e20", effect: 100000},
      {type: "e", scaleAt: 2, newCost: "1e33", effect: 1.5},
      {type: "e", scaleAt: 5, newCost: "2.37e111", effect: 2}
    ],
    inTab: "Increment",
    hasKey: true,
    keys: ["0", "1", "2", "3", "4"],
    type: "rate"
  },
  "IncrementE": {
    currency: "ip",
    scaling: [
      {type: "e", scaleAt: 0, newCost: "1e84", effect: 2},
      {type: "e", scaleAt: 1, newCost: "1e170", effect: 3}
    ],
    inTab: "Increment",
    hasKey: true,
    keys: ["0", "1", "2", "3", "4"],
    type: "rate"
  },
  "IncrementT": {
    currency: "ip",
    scaling: [
      {type: "t", scaleAt: 0, newCost: "1e1560", effect: 2}
    ],
    inTab: "Increment",
    hasKey: true,
    keys: ["0", "1", "2", "3", "4"],
    type: "rate"
  },
  "SacrificeIP": {
    currency: "pp",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "10", effect: 10}
    ],
    inTab: "Sacrifice",
    hasKey: false,
    keys: ["0"],
    type: "rate"
  },
  "Prestige": {
    currency: "pp",
    cost: "250",
    inTab: "Prestige",
    hasKey: false,
    keys: ["0"],
    type: "max"
  },
  "Automation": {
    currency: "pp",
    cost: "1e17",
    inTab: "Automation",
    hasKey: true,
    keys: [],
    type: "max"
  },
  "Scaling": {
    currency: "pp",
    cost: "1e17",
    inTab: "Scaling",
    hasKey: true,
    keys: ["P", "M", "E"],
    type: "max"
  }
}
for (let name in automation) {automation.Automation.keys.push(name)}
for (let name in automation) {
  di("auto"+name+"b").addEventListener("click", () => {buyAutomation(name); lastClicked = "auto"+name+"b"});
  /*di("maxAuto"+name+"State").addEventListener("click", () => {toggleMaxBuyAutomation(name)});*/
  if (automation[name].hasKey) {
    for (let i=0; i<automation[name].keys.length; i++) {
      di("auto"+name+automation[name].keys[i]+"State").addEventListener("click", () => {toggleAutomation(name, automation[name].keys[i])});
    }
  }
  else {
    di("auto"+name+"State").addEventListener("click", () => {toggleAutomation(name, "0")});
  }
}
di("prestigeAt").addEventListener("click", (event) => {event.stopPropagation()});
di("prestigeAt").addEventListener("change", () => {setPrestigeAt(di("prestigeAt").value)});

//Buttons
function buyAutomation(name) {
  let cost = getAutomationCost(name);
  let returnValue = false;
  if (automation[name].type == "rate") {
    if (user.pp.pt.cells.includes("pt2-2") && !user.pp.challenge[4].in) {
      while (user[automation[name].currency].current.gte(cost) && cost.lt(user[automation[name].currency].infinite)) {
        if (cost.lt("ee9")) {user[automation[name].currency].current = user[automation[name].currency].current.minus(cost)}
        user.automation[name].bought++;
        cost = getAutomationCost(name);
        returnValue = true;
      }
    }
    else {
      if (user[automation[name].currency].current.gte(cost) && cost.lt(user[automation[name].currency].infinite)) {
        if (cost.lt("ee9")) {user[automation[name].currency].current = user[automation[name].currency].current.minus(cost)}
        user.automation[name].bought++;
        returnValue = true;
      }
    }
  }
  if (automation[name].type == "max" && !user.pp.challenge[4].in) {
    if (user[automation[name].currency].current.gte(cost) && cost.lt(user[automation[name].currency].infinite) && !user.automation[name].bought) {
      if (cost.lt("ee9")) {user[automation[name].currency].current = user[automation[name].currency].current.minus(cost)}
      user.automation[name].bought = true;
      returnValue = true;
    }
  }
  return returnValue;
}
function toggleMaxBuyAutomation(name) {
  user.automation[name].buyMax = !user.automation[name].buyMax;
  updateMaxAutoState(name);
}
function toggleAutomation(name, key) {
  if (automation[name].inTab == user.tab.main && keys["Shift"]) {
    let setTo = !user.automation[name].enabled[key];
    for (let nam in automation) {
      if (automation[nam].inTab == user.tab.main) {
        for (let keys in user.automation[nam].enabled) {
          if (automation[nam].hasKey) {
            if (di("auto"+nam+keys+"State").parentNode.style.display != "none") {
              user.automation[nam].enabled[keys] = setTo;
              updateAutomationState(nam, keys);
            }
          }
          else {
            if (di("auto"+nam+"State").parentNode.style.display != "none") {
              user.automation[nam].enabled[keys] = setTo;
              updateAutomationState(nam, keys);
            }
          }
        }
      }
    }
  }
  else {
    user.automation[name].enabled[key] = !user.automation[name].enabled[key];
    updateAutomationState(name, key);
  }
}

//Set Data
function setPrestigeAt(at) {
  at = nd(at).round();
  if (at.lt(1) || isNaN(at.mag)) {alertify.error("Invalid Input"); at = nd(1)}
  user.automation.Prestige.at = at;
  di("prestigeAt").value = e("d", at, 2, 0, true);
  di("autoPrestigeAt").textContent = e("d", at, 2, 0);
}

//Get Data
function getAutomationRate(name) {
  if (automation[name].type == "rate") {
    let multi = nd(1);
    if (user.achievements.includes("ach1-5")) {multi = multi.times(getAchievementReward("ach1-5"))}
    if (user.pp.pt.cells.includes("pt1-1") && (automation[name].currency == "ip" || user.pp.pt.cells.includes("pt5-2"))) {multi = multi.times(getPTReward("pt1-1"))}
    if (user.pp.pt.cells.includes("pt2-1") && (automation[name].currency == "ip" || user.pp.pt.cells.includes("pt5-2"))) {multi = multi.times(getPTReward("pt2-1"))}
    if (user.pp.challenge[1].in) {multi = multi.divide(Math.pow(user.achievements.length, 1.5))}
    
    if (name == "IP") {
      if (user.achievements.includes("ach2-3")) {multi = multi.times(getAchievementReward("ach2-3"))}
      multi = multi.times(getPPChallengeReward(1));
    }
    if (name == "IncrementP") {multi = multi.times(10)}
    if (name == "IncrementM") {multi = multi.times(10)}
    if (name == "IncrementE") {multi = multi.times(10)}
    if (name == "IncrementT") {multi = multi.times(10)}
    if (name == "SacrificeIP") {if (!user.pp.pt.cells.includes("pt5-2")) {multi = multi.divide(2)}}
    if (name == "Prestige") {if (!user.pp.pt.cells.includes("pt5-2")) {multi = multi.divide(2)}}
    if (name == "Automation") {}
    if (name == "Scaling") {}
    return nd(user.automation[name].bought).times(multi);
  }
  if (automation[name].type == "max") {
    let result;
    (user.automation[name].bought) ? result = "Max" : result = nd(0);
    return result
  }
}
function getAutomationCost(name) {
  if (automation[name].type == "rate") {
    let index = 0;
    for (let i=0; i<automation[name].scaling.length; i++) {if (user.automation[name].bought >= automation[name].scaling[i].scaleAt) {index = i}}
    let data = automation[name].scaling[index];
    let userData = user.automation[name];
    if (data.type == "m") {return nd(data.newCost).times(Math.pow(data.effect, userData.bought-data.scaleAt)).round()}
    if (data.type == "e") {return nd(data.newCost).pow(Math.pow(data.effect, userData.bought-data.scaleAt))}
    if (data.type == "t") {return nd(data.newCost).tetrate(nd(data.effect).pow(userData.bought-data.scaleAt))}
  }
  if (automation[name].type == "max") {
    return nd(automation[name].cost);
  }
}

//Update Data
function updateAutomations() {
  for (let name in automation) {
    updateAutomation(name);
    /*updateMaxAutoState(name);*/
  }
}
function updateAutomationStates() {
  for (let name in automation) {
    for (let key in user.automation[name].enabled) {
      updateAutomationState(name, key);
    }
  }
}
function updateAutomation(name) {
  let cost = getAutomationCost(name);
  if (user[automation[name].currency].current.lt(cost) || cost.gte(user[automation[name].currency].infinite) || (automation[name].type == "max" && user.automation[name].bought)) {replaceClass("canBuy", "cantBuy", "auto"+name+"b")}
  else {replaceClass("cantBuy", "canBuy", "auto"+name+"b")}
  if (cost.gte(user[automation[name].currency].infinite || (automation[name].type == "max" && user.automation[name].bought)) && showInfinite) {cost = "Infinite"}
  di("auto"+name+"Rate").textContent = e("d", getAutomationRate(name), "d", 0);
  di("auto"+name+"Cost").textContent = e("d", cost, "d", 0);
}
function updateAutomationState(name, key) {
  if (automation[name].hasKey) {
    if (user.automation[name].enabled[key]) {di("auto"+name+key+"State").style.borderColor = "rgb(100, 200, 50)"}
    else {di("auto"+name+key+"State").style.borderColor = "rgb(220, 20, 60)"}
  }
  else {
    if (user.automation[name].enabled[key]) {di("auto"+name+"State").style.borderColor = "rgb(100, 200, 50)"}
    else {di("auto"+name+"State").style.borderColor = "rgb(220, 20, 60)"}
  }
}
function updateMaxAutoState(name) {
  if (user.automation[name].buyMax) {di("maxAuto"+name+"State").style.borderColor = "rgb(0, 0, 200)"}
  else {di("maxAuto"+name+"State").style.borderColor = "rgb(220, 20, 60)"}
}
