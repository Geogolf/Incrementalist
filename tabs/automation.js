//Data
const automation = {
  "IP": {
    currency: "ip",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "1000", effect: 10},
      {type: "e", scaleAt: 30, newCost: "1e33", effect: 1.1},
      {type: "e", scaleAt: 42, newCost: "3.7e103", effect: 1.2}
    ],
    array: false
  },
  "IncrementP": {
    currency: "ip",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "100000", effect: 100},
      {type: "e", scaleAt: 14, newCost: "1e33", effect: 1.25},
      {type: "e", scaleAt: 19, newCost: "5.11e100", effect: 1.5}
    ],
    array: true
  },
  "IncrementM": {
    currency: "ip",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "1e20", effect: 100000},
      {type: "e", scaleAt: 2, newCost: "1e33", effect: 1.5},
      {type: "e", scaleAt: 5, newCost: "2.37e111", effect: 2}
    ],
    array: true
  },
  "IncrementE": {
    currency: "ip",
    scaling: [
      {type: "e", scaleAt: 0, newCost: "1e84", effect: 2},
      {type: "e", scaleAt: 1, newCost: "1e170", effect: 3}
    ],
    array: true
  },
  "IncrementT": {
    currency: "ip",
    scaling: [
      {type: "t", scaleAt: 0, newCost: "1e1550", effect: 2}
    ],
    array: true
  },
  "SacrificeIP": {
    currency: "pp",
    scaling: [
      {type: "m", scaleAt: 0, newCost: "10", effect: 10}
    ],
    array: false
  },
  "Prestige": {
    currency: "pp",
    scaling: [
      {type: "e", scaleAt: 0, newCost: "250", effect: 2}
    ],
    array: false
  }
}
for (let name in automation) {
  di("auto"+name+"b").addEventListener("click", () => {buyAutomation(name)});
  di("maxAuto"+name+"State").addEventListener("click", () => {toggleMaxBuyAutomation(name)});
  if (!automation[name].array) {
    di("auto"+name+"State").addEventListener("click", () => {toggleAutomation(name)});
  }
  else {
    for (let i=0; i<5; i++) {
      di("auto"+name+i+"State").addEventListener("click", () => {toggleAutomation(name, i)});
    }
  }
}
di("prestigeAt").addEventListener("click", (event) => {event.stopPropagation()});
di("prestigeAt").addEventListener("change", () => {setPrestigeAt(di("prestigeAt").value)});

//Buttons
function buyAutomation(name) {
  let cost = getAutomationCost(name);
  if (user.automation[name].buyMax) {
    while (user[automation[name].currency].current.gte(cost) && cost.lt(user[automation[name].currency].infinite)) {
      user[automation[name].currency].current = user[automation[name].currency].current.minus(cost);
      user.automation[name].bought++;
      cost = getAutomationCost(name);
    }
  }
  else {
    if (user[automation[name].currency].current.gte(cost) && cost.lt(user[automation[name].currency].infinite)) {
      user[automation[name].currency].current = user[automation[name].currency].current.minus(cost);
      user.automation[name].bought++;
    }
  }
}
function toggleMaxBuyAutomation(name) {
  user.automation[name].buyMax = !user.automation[name].buyMax;
  updateMaxAutoState(name);
}
function toggleAutomation(name, num) {
  if (Array.isArray(user.automation[name].enabled)) {
    user.automation[name].enabled[num] = !user.automation[name].enabled[num];
    updateAutomationState(name, num);
  }
  else {
    user.automation[name].enabled = !user.automation[name].enabled;
    updateAutomationState(name);
  }
}

//Set Data
function setPrestigeAt(at) {
  at = nd(at).round();
  if (at.lt(1) || isNaN(at.mag)) {alertify.error("Invalid Input"); at = nd(1)}
  user.automation.Prestige.at = at;
  di("prestigeAt").value = e("d", at, 2, 0);
  di("autoPrestigeAt").textContent = e("d", at, 2, 0)
}

//Get Data
function getAutomationRate(name) {
  let multi = nd(1);
  if (user.achievements.includes("ach1-5")) {multi = multi.times(getAchievementReward("ach1-5"))}
  if (user.pp.pt.cells.includes("pt1-1") && automation[name].currency == "ip") {multi = multi.times(getPTReward("pt1-1"))}
  if (user.pp.pt.cells.includes("pt2-1") && automation[name].currency == "ip") {multi = multi.times(getPTReward("pt2-1"))}
  if (user.pp.challenge[1].in) {multi = multi.divide(Math.pow(user.achievements.length, 1.5))}
  
  if (name == "IP") {
    if (user.achievements.includes("ach2-3")) {multi = multi.times(getAchievementReward("ach2-3"))}
    multi = multi.times(getPPChallengeReward(1));
  }
  if (name == "IncrementP") {multi = multi.times(10)}
  if (name == "IncrementM") {multi = multi.times(10)}
  if (name == "IncrementE") {multi = multi.times(10)}
  if (name == "IncrementT") {multi = multi.times(10)}
  if (name == "SacrificeIP") {multi = multi.divide(2/*25*/)}
  if (name == "Prestige") {multi = multi.divide(2/*50*/)}
  return nd(user.automation[name].bought).times(multi);
}
function getAutomationCost(name) {
  let index = 0;
  for (let i=0; i<automation[name].scaling.length; i++) {if (user.automation[name].bought >= automation[name].scaling[i].scaleAt) {index = i}}
  let data = automation[name].scaling[index];
  let userData = user.automation[name];
  if (data.type == "m") {return nd(data.newCost).times(Math.pow(data.effect, userData.bought-data.scaleAt)).round()}
  if (data.type == "e") {return nd(data.newCost).pow(Math.pow(data.effect, userData.bought-data.scaleAt))}
  if (data.type == "t") {return nd(data.newCost).tetrate(nd(data.effect).pow(userData.bought-data.scaleAt))}
}

//Update Data
function updateAutomations() {
  for (let name in automation) {
    updateAutomation(name);
    updateMaxAutoState(name);
  }
}
function updateAutomationStates() {
  for (let name in automation) {
    if (!automation[name].array) {updateAutomationState(name)}
    else {for (let i=0; i<5; i++) {updateAutomationState(name, i)}}
  }
}
function updateAutomation(name) {
  let cost = getAutomationCost(name);
  if (user[automation[name].currency].current.lt(cost) || cost.gte(user[automation[name].currency].infinite)) {replaceClass("canBuy", "cantBuy", "auto"+name+"b")}
  else {replaceClass("cantBuy", "canBuy", "auto"+name+"b")}
  if (cost.gte(user[automation[name].currency].infinite) && showInfinite) {cost = "Infinite"}
  di("auto"+name+"Rate").textContent = e("d", getAutomationRate(name), 2, 0);
  di("auto"+name+"Cost").textContent = e("d", cost, 2, 0);
}
function updateAutomationState(name, num) {
  if (Array.isArray(user.automation[name].enabled)) {
    if (user.automation[name].enabled[num]) {di("auto"+name+num+"State").style.borderColor = "rgb(100, 200, 50)"}
    else {di("auto"+name+num+"State").style.borderColor = "rgb(220, 20, 60)"}
  }
  else {
    if (user.automation[name].enabled) {di("auto"+name+"State").style.borderColor = "rgb(100, 200, 50)"}
    else {di("auto"+name+"State").style.borderColor = "rgb(220, 20, 60)"}
  }
}
function updateMaxAutoState(name) {
  if (user.automation[name].buyMax) {di("maxAuto"+name+"State").style.borderColor = "rgb(0, 0, 200)"}
  else {di("maxAuto"+name+"State").style.borderColor = "rgb(220, 20, 60)"}
}
