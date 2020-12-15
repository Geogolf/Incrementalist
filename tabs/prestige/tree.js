//Data
const lastPTRow = 7;
const pt = {
  "pt0-1": {from: [], sac: 0, cost: {type: "static", cost: 0}},
  "pt1-1": {from: ["pt0-1"], sac: 0, cost: {type: "rowIncrease", effect: ["pt1-2", "pt1-3"], baseCost: 1, scaleCost: 2}, default: 1},
  "pt1-2": {from: ["pt0-1"], sac: 0, cost: {type: "rowIncrease", effect: ["pt1-1", "pt1-3"], baseCost: 1, scaleCost: 2}, default: 0},
  "pt1-3": {from: ["pt0-1"], sac: 0, cost: {type: "rowIncrease", effect: ["pt1-1", "pt1-2"], baseCost: 1, scaleCost: 2}, default: 1},
  "pt2-1": {from: ["pt1-1"], sac: 0, cost: {type: "rowIncrease", effect: ["pt2-2"], baseCost: 7, scaleCost: 1.6}, default: 1},
  "pt2-2": {from: ["pt1-1"], sac: 0, cost: {type: "rowIncrease", effect: ["pt2-1"], baseCost: 7, scaleCost: 1.6}},
  "pt2-3": {from: ["pt1-2"], sac: 0, cost: {type: "static", cost: 50}, default: 1},
  "pt2-4": {from: ["pt1-3"], sac: 0, cost: {type: "rowIncrease", effect: ["pt2-5"], baseCost: 7, scaleCost: 1.6}},
  "pt2-5": {from: ["pt1-3"], sac: 0, cost: {type: "rowIncrease", effect: ["pt2-4"], baseCost: 7, scaleCost: 1.6}, default: 5},
  "pt3-1": {from: ["pt2-2"], sac: 0, cost: {type: "rowIncrease", effect: ["pt3-4"], baseCost: 150, scaleCost: 3}},
  "pt3-2": {from: ["pt2-3"], sac: 0, cost: {type: "rowIncrease", effect: ["pt3-3"], baseCost: 500, scaleCost: 1.25}, default: 0},
  "pt3-3": {from: ["pt2-3"], rowac: 0, cost: {type: "rowIncrease", effect: ["pt3-2"], baseCost: 500, scaleCost: 1.25}},
  "pt3-4": {from: ["pt2-4"], sac: 0, cost: {type: "rowIncrease", effect: ["pt3-1"], baseCost: 150, scaleCost: 3}},
  "pt4-1": {from: ["pt3-1", "pt3-2", "pt3-3", "pt3-4"], sac: 0, cost: {type: "static", cost: 40000}, default: 1},
  "pt5-1": {from: ["pt5-2"], sac: 1, cost: {type: "rowIncrease", effect: ["pt5-3"], baseCost: 400000, scaleCost: 2}, default: 1},
  "pt5-2": {from: ["pt4-1"], sac: 1, cost: {type: "static", cost: 100000}},
  "pt5-3": {from: ["pt4-1"], sac: 1, cost: {type: "rowIncrease", effect: ["pt5-1"], baseCost: 400000, scaleCost: 2}, default: 0},
  "pt5-4": {from: ["pt4-1"], sac: 1, cost: {type: "static", cost: 8.5e7}, default: 1},
  "pt5-5": {from: ["pt5-4"], sac: 2, cost: {type: "rowIncrease", effect: ["pt6-2"], baseCost: 1.5e10, scaleCost: 10}},
  "pt6-1": {from: ["pt5-2", "pt5-3"], sac: 1, cost: {type: "static", cost: 1e6}},
  "pt6-2": {from: ["pt5-3", "pt5-4"], sac: 2, cost: {type: "rowIncrease", effect: ["pt5-5"], baseCost: 1.5e10, scaleCost: 1}, default: 1},
  "pt7-1": {from: ["pt5-1", "pt7-2"], sac: 2, cost: {type: "static", cost: 1e19}},
  "pt7-2": {from: ["pt6-1", "pt6-2"], sac: 2, cost: {type: "static", cost: 2.5e15}, default: 1},
  "pt7-3": {from: ["pt5-5", "pt7-2"], sac: 2, cost: {type: "static", cost: 1e17}}
}
for (let id in pt) {
  di(id).addEventListener("click", () => {buyPT(id)});
}
di("refundPT").addEventListener("click", () => {toggleRefundPT(); lastClicked = "refundPT"});

//Buttons
function toggleRefundPT() {
  user.pp.pt.refund = !user.pp.pt.refund;
}
function refundPT() {
  user.pp.current = user.pp.current.plus(user.pp.pt.refundAmount);
  if (user.pp.pt.cells.includes("pt0-1")) {user.pp.pt.cells = ["pt0-1"]}
  else {user.pp.pt.cells = []}
  user.pp.pt.refund = false;
  user.pp.pt.refundAmount = nd(0);
  /*for (name in user.automation) {user.automation[name].buyMax = false; updateMaxAutoState(name)}*/
  for (name in user.scaling) {user.scaling[name].buyMax = false}
}
function buyPT(id) {
  if (!user.pp.challenge[4].in) {
    let cost = getPTCost(id);
    if (user.pp.current.gte(cost) && cost.lt(user.pp.infinite) && !user.pp.pt.cells.includes(id)) {
      user.pp.current = user.pp.current.minus(cost);
      user.pp.pt.cells.push(id);
      user.pp.pt.refundAmount = user.pp.pt.refundAmount.plus(cost);
    }
  }
}

//Get Data
function getPTCap(id) {
  if (id == "pt1-3") {return nd(2).plus(getPPChallengeReward(4))}
  if (id == "pt4-1") {return nd(10)}
  if (id == "pt5-4") {return nd(1e6)}
}
function getPTReward(id) {
  if (user.pp.challenge[4].in) {return nd(pt[id].default)}
  let multi = nd(1);
  if (user.pp.pt.cells.includes("pt3-3")) {
    let completed = 0;
    if (user.pp.pt.cells.includes("pt7-3")) {for (let i=1; i<ppChallenge.length; i++) {completed += user.pp.challenge[i].count}}
    multi = multi.times(nd(0.25).times(1+Math.log10(completed+1)).plus(1));
  }
  if (id == "pt1-1") {
    let thisExp = nd(1);
    if (user.pp.pt.cells.includes("pt7-2")) {thisExp = getPTReward("pt7-2")}
    return user.pp.sac.plus(1).ln().divide(1.125).plus(1).pow(thisExp).times(multi);
  }
  if (id == "pt1-2") {return user.pp.sac.divide(11).plus(1).log10().times(100).times(multi)}
  if (id == "pt1-3") {
    let x = user.pp.sac.plus(1.55).sqrt().log10().plus(1).times(multi);
    let cap = getPTCap("pt1-3");
    if (x.gt(cap)) {x = cap}
    return x;
  }
  if (id == "pt2-1") {
    /*if (user.pp.pt.cells.includes("pt7-1")) {multi = multi.times(getPTReward("pt7-1"))}*/
    /*if (user.pp.pt.cells.includes("pt7-1")) {return Decimal.tetrate(user.pp.pt.cells.length+1, 1.25).times(multi)}*/
    return nd(Math.sqrt(user.pp.pt.cells.length+1)).times(multi);
  }
  if (id == "pt2-3") {return user.ip.sac.pow(0.1).plus(1).times(multi)}
  if (id == "pt2-5") {return nd(5)}
  if (id == "pt3-2") {return nd(10).times(multi)}
  if (id == "pt3-3") {
    let m = nd(1);
    if (user.pp.pt.cells.includes("pt7-3")) {m = m.times(getPTReward("pt7-3"))}
    return nd(25).times(m);
  }
  if (id == "pt4-1") {
    let x = user.ip.sac.plus(1).log10().plus(1).log10().plus(1).times(multi);
    let cap = getPTCap("pt4-1");
    if (x.gt(cap)) {x = cap}
    return x;
  }
  if (id == "pt5-1") {return user.ip.sac.plus(1).log10().divide(8).plus(1)}
  if (id == "pt5-3") {return user.pp.sac.divide(11).plus(1).log10().times(100).ln().times(multi)}
  if (id == "pt5-4") {
    let bought = 0;
    for (let name in scaling) {bought += user.scaling[name].bought}
    let x;
    if (bought < 176) {x = nd(Math.pow(bought, 2.5)+1).ln().plus(1).pow(Math.log10(bought+1)).times(multi)}
    else {x = nd(bought+1).log10().plus(1).pow(Math.sqrt(bought)).divide(147).times(multi)}
    let cap = getPTCap("pt5-4");
    if (x.gt(cap) && !user.pp.pt.cells.includes("pt7-1")) {x = cap}
    return x;
  }
  if (id == "pt6-2") {return nd(1.02).pow(user.achievements.length).times(multi)}
  /*if (id == "pt7-1") {
    let completed = 0;
    for (let i=1; i<ppChallenge.length; i++) {completed += user.pp.challenge[i].count}
    return nd(completed).pow(1.25).times(multi);
  }*/
  if (id == "pt7-2") {return user.pp.sac.plus(1).log10().plus(1).log10().plus(1).sqrt().times(multi)}
  if (id == "pt7-3") {
    let completed = 0;
    for (let i=1; i<ppChallenge.length; i++) {completed += user.pp.challenge[i].count}
    return nd(1+Math.log10(completed+1));
  }
}
function getPTCost(id) {
  let data = pt[id].cost;
  if (data.type == "static") {return nd(data.cost)}
  if (data.type == "rowIncrease") {
    if (user.pp.pt.cells.includes(id)) {return nd(0)}
    let effected = 0;
    for (let i=0; i<data.effect.length; i++) {if (user.pp.pt.cells.includes(data.effect[i])) {effected++}}
    return nd(data.baseCost).times(nd(data.scaleCost).pow(effected)).floor();
  }
}

//Update Data
function updatePrestigeTree() {
  di("pt0-1Text").textContent = "Unlock the prestige tree";
  (user.pp.pt.cells.includes("pt7-1")) ? hideClass("pt5-4CapText") : showClass("pt5-4CapText");
  for (let id in pt) {
    if (di(id).style.display != "none") {
      let cost = getPTCost(id);
      
      if (user.pp.pt.cells.includes(id)) {removeClass("cantBuy", id); removeClass("canBuy", id); addClass("ppComplete", id)}
      else if (user.pp.current.lt(cost) || cost.gte(user.pp.infinite)) {removeClass("canBuy", id); removeClass("ppComplete", id); addClass("cantBuy", id)}
      else {removeClass("ppComplete", id); removeClass("cantBuy", id); addClass("canBuy", id)}
      if (user.pp.challenge[4].in) {removeClass("canBuy", id); removeClass("ppComplete", id); addClass("cantBuy", id)}
      
      if (di(id+"x") != null) {di(id+"x").textContent = e("d", getPTReward(id), "d", 2)}
      if (di(id+"Cap") != null) {di(id+"Cap").textContent = e("d", getPTCap(id), "d", 2)}
      if (cost.gte(user.pp.infinite) || user.pp.pt.cells.includes(id)) {cost = "Infinite"}
      if (di(id+"Cost") != null) {di(id+"Cost").textContent = e("d", cost, "d", 0)}
    }
  }
}
function updateRefundPT() {
  if (!user.pp.pt.refund) {replaceClass("cantBuy", "canBuy", "refundPT")}
  else {replaceClass("canBuy", "cantBuy", "refundPT")}
  di("refundPTx").textContent = e("d", user.pp.pt.refundAmount, "d", 0);
}
