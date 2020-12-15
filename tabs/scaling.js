//Data
const scaling = {
  "P": {
    currency: "ip",
    scaling: [
      {type: "j", scaleAt: 0, newCost: "1e15", effect: 7.5},
      {type: "e", scaleAt: 9, newCost: "1e33", effect: 1.075},
      {type: "e", scaleAt: 25, newCost: "9.25e104", effect: 1.2}
    ]
  },
  "M": {
    currency: "ip",
    scaling: [
      {type: "e", scaleAt: 0, newCost: "1e37", effect: 1.11},
      {type: "e", scaleAt: 10, newCost: "1.14e105", effect: 1.22}
    ]
  },
  "E": {
    currency: "ip",
    scaling: [
      {type: "e", scaleAt: 0, newCost: "1e84", effect: 2},
      {type: "e", scaleAt: 1, newCost: "1e168", effect: 3}
    ]
  }
}
for (let name in scaling) {
  di("scaling"+name+"b").addEventListener("click", () => {buyScaling(name); "scaling"+name+"b"; lastClicked = "scaling"+name+"b"});
  /*di("maxScaling"+name+"State").addEventListener("click", () => {toggleMaxBuyScaling(name); lastClicked = "maxScaling"+name+"State"; lastClicked = "maxScaling"+name+"State"});*/
}

//Buttons
function buyScaling(name) {
  if (user.pp.challenge[5].in) {return false}
  let cost = getScalingCost(name);
  let returnValue = false;
  if (user.pp.pt.cells.includes("pt2-4") && !user.pp.challenge[4].in) {
    while (user[scaling[name].currency].current.gte(cost) && cost.lt(user[scaling[name].currency].infinite)) {
      if (cost.lt("ee9")) {user[scaling[name].currency].current = user[scaling[name].currency].current.minus(cost)}
      user.scaling[name].bought++;
      cost = getScalingCost(name);
      returnValue = true;
    }
  }
  else {
    if (user[scaling[name].currency].current.gte(cost) && cost.lt(user[scaling[name].currency].infinite)) {
      if (cost.lt("ee9")) {user[scaling[name].currency].current = user[scaling[name].currency].current.minus(cost)}
      user.scaling[name].bought++;
      returnValue = true;
    }
  }
  return returnValue;
}
function toggleMaxBuyScaling(name) {
  user.scaling[name].buyMax = !user.scaling[name].buyMax;
  updateMaxScalingState(name);
}

//Get Data
function getScalingEffect(name) {
  let multi = getPPChallengeReward(5);
  if (user.pp.pt.cells.includes("pt1-3")) {multi = multi.times(getPTReward("pt1-3"))}
  if (name == "P") {
    if (user.scaling[name].bought >= 1) {return nd(0.75).pow(nd(Math.pow(user.scaling[name].bought, 4.2)+1).log10().times(-1)).times(multi)}
    else {return nd(1)}
  }
  if (name == "M") {
    if (user.scaling[name].bought >= 1) {return nd(0.5).pow(nd(Math.pow(user.scaling[name].bought, 1.25)+1).log10().times(-1)).times(multi)}
    else {return nd(1)}
  }
  if (name == "E") {
    if (user.scaling[name].bought >= 1) {return nd(user.scaling[name].bought/4.3+1).log10().plus(1).times(multi)}
    else {return nd(1)}
  }
}
function getScalingCost(name) {
  let index = 0;
  for (let i=0; i<scaling[name].scaling.length; i++) {if (user.scaling[name].bought >= scaling[name].scaling[i].scaleAt) {index = i}}
  let data = scaling[name].scaling[index];
  let userData = user.scaling[name];
  if (data.type == "j") {return nd(10).pow(nd(userData.bought*Math.floor(userData.bought/data.effect+1)).plus(nd(data.newCost).log10()))}
  if (data.type == "e") {return nd(data.newCost).pow(Math.pow(data.effect, userData.bought-data.scaleAt))}
}

//Update Data
function updateScalings() {
  for (let name in scaling) {
    updateScaling(name);
    /*updateMaxScalingState(name);*/
  }
}
function updateMaxScalingState(name) {
  if (user.scaling[name].buyMax) {di("maxScaling"+name+"State").style.borderColor = "rgb(0, 0, 200)"}
  else {di("maxScaling"+name+"State").style.borderColor = "rgb(220, 20, 60)"}
}
function updateScaling(name) {
  let cost = getScalingCost(name);
  if (user[scaling[name].currency].current.lt(cost) || cost.gte(user[scaling[name].currency].infinite)) {replaceClass("canBuy", "cantBuy", "scaling"+name+"b")}
  else {replaceClass("cantBuy", "canBuy", "scaling"+name+"b")}
  if (cost.gte(user[scaling[name].currency].infinite) && showInfinite) {cost = "Infinite"}
  di("scaling"+name+"x").textContent = e("d", getScalingEffect(name), "d", 2);
  di("scaling"+name+"Cost").textContent = e("d", cost, "d", 0);
}
