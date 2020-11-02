//Data
const pt = {
  "pt0-1": {from: [], cost: {type: "static", cost: 0}},
  "pt1-1": {from: ["pt0-1"], cost: {type: "rowIncrease", effect: ["pt1-2", "pt1-3"], baseCost: 1, scaleCost: 2}},
  "pt1-2": {from: ["pt0-1"], cost: {type: "rowIncrease", effect: ["pt1-1", "pt1-3"], baseCost: 1, scaleCost: 2}},
  "pt1-3": {from: ["pt0-1"], cost: {type: "rowIncrease", effect: ["pt1-1", "pt1-2"], baseCost: 1, scaleCost: 2}},
  "pt2-1": {from: ["pt1-1"], cost: {type: "rowIncrease", effect: ["pt2-2"], baseCost: 7, scaleCost: 1.6}},
  "pt2-2": {from: ["pt1-1"], cost: {type: "rowIncrease", effect: ["pt2-1"], baseCost: 7, scaleCost: 1.6}},
  "pt2-3": {from: ["pt1-2"], cost: {type: "static", cost: 50}},
  "pt2-4": {from: ["pt1-3"], cost: {type: "rowIncrease", effect: ["pt2-5"], baseCost: 7, scaleCost: 1.6}},
  "pt2-5": {from: ["pt1-3"], cost: {type: "rowIncrease", effect: ["pt2-4"], baseCost: 7, scaleCost: 1.6}},
  "pt3-1": {from: ["pt2-1", "pt2-2"], cost: {type: "rowIncrease", effect: ["pt3-4"], baseCost: 150, scaleCost: 3}},
  "pt3-2": {from: ["pt2-3"], cost: {type: "static", cost: 500}},
  "pt3-3": {from: ["pt2-3"], cost: {type: "static", cost: 500}},
  "pt3-4": {from: ["pt2-4", "pt2-5"], cost: {type: "rowIncrease", effect: ["pt3-1"], baseCost: 150, scaleCost: 3}},
  "pt4-1": {from: ["pt3-1", "pt3-2", "pt3-3", "pt3-4"], cost: {type: "static", cost: 50000}},
  /*"pt5-1": {from: ["pt5-2"], cost: {type: "rowIncrease", effect: ["pt5-4"], baseCost: 550000, scaleCost: 10}},
  "pt5-2": {from: ["pt4-1"], cost: {type: "static", cost: 50000}},
  "pt5-3": {from: ["pt4-1"], cost: {type: "static", cost: 150000}},
  "pt5-4": {from: ["pt4-1"], cost: {type: "rowIncrease", effect: ["pt5-1"], baseCost: 600000, scaleCost: 10}},
  "pt5-5": {from: ["pt5-4"], cost: {type: "static", cost: 1e10}}*/
}
for (let id in pt) {
  di(id).addEventListener("click", () => {buyPT(id)});
}
di("refundPT").addEventListener("click", () => {toggleRefundPT()});

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
  for (name in user.automation) {user.automation[name].buyMax = false; updateMaxAutoState(name)}
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
}
function getPTReward(id) {
  let multi = nd(1);
  if (user.pp.pt.cells.includes("pt3-3")) {multi = multi.times(1.25)}
  if (id == "pt1-1") {return user.pp.sac.plus(1).ln().divide(1.125).plus(1).times(multi)}
  if (id == "pt1-2") {return user.pp.sac.divide(11).plus(1).log10().times(100).times(multi)}
  if (id == "pt1-3") {
    let x = user.pp.sac.plus(1.55).sqrt().log10().plus(1).times(multi);
    let cap = getPTCap("pt1-3");
    if (x.gt(cap)) {x = cap}
    return x;
  }
  if (id == "pt2-1") {return nd(Math.sqrt(user.pp.pt.cells.length+1)).times(multi)}
  if (id == "pt2-3") {return user.ip.sac.pow(0.1).plus(1).times(multi)}
  if (id == "pt2-5") {return nd(5)}
  if (id == "pt3-2") {return nd(10).times(multi)}
  if (id == "pt4-1") {return user.ip.sac.plus(1).log10().plus(1).log10().plus(1).times(multi)}
  /*if (id == "pt5-1") {return user.ip.sac.plus(1).log10().divide(8).plus(1)}
  if (id == "pt5-3") {return user.pp.sac.divide(11).plus(1).log10().times(100).ln().times(multi)}
  if (id == "pt5-4") {
    let bought = 0;
    for (let name in scaling) {bought += user.scaling[name].bought}
    return nd(Math.sqrt(bought)).plus(1);
  }*/
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
  for (let id in pt) {
    if (di(id).style.display != "none") {
      let cost = getPTCost(id);
      if (user.pp.pt.cells.includes(id)) {removeClass("cantBuy", id); removeClass("canBuy", id); addClass("ppComplete", id)}
      else if (user.pp.current.lt(cost) || cost.gte(user.pp.infinite)) {removeClass("canBuy", id); removeClass("ppComplete", id); addClass("cantBuy", id)}
      else {removeClass("ppComplete", id); removeClass("cantBuy", id); addClass("canBuy", id)}
      if (di(id+"x") != null) {di(id+"x").textContent = e("d", getPTReward(id), 2, 2)}
      if (cost.gte(user.pp.infinite)) {cost = "Infinite"}
      if (di(id+"Cost") != null) {di(id+"Cost").textContent = e("d", cost, 2, 0)}
    }
  }
  di("pt1-3Cap").textContent = e("d", getPTCap("pt1-3"), 2, 2);
}
function updateRefundPT() {
  if (!user.pp.pt.refund) {replaceClass("cantBuy", "canBuy", "refundPT")}
  else {replaceClass("canBuy", "cantBuy", "refundPT")}
  di("refundPTx").textContent = e("d", user.pp.pt.refundAmount, 2, 0);
}
