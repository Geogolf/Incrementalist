//Buttons
function pt(id) {
  let cost = getPrestigeTreeCost(id);
  if (user.pp.x.gte(cost) && !user.pt.cells.includes(id)) {
    user.pp.x = user.pp.x.minus(cost);
    user.pt.cells.push(id);
    user.pt.refundAmount = user.pt.refundAmount.plus(cost);
    unlockPT();
    resizeCanvas("pt");
  }
}
function toggleRefundPT() {
  user.pt.refund = !user.pt.refund;
  updateRefundPT();
}
function refundPT() {
  let refund = getRefundAmount();
  user.pp.x = user.pp.x.plus(refund);
  if (user.pt.cells.includes("pt0-1")) {user.pt.cells = ["pt0-1"]}
  else {user.pt.cells = []}
  user.pt.refund = false;
  user.pt.refundAmount = nd(0);
  for (each in user.max) {user.max[each] = false}
  unlockPT();
  resizeCanvas("pt");
  updateRefundPT();
}

//Data
const pts = {
  "pt0-1": {type: "static", cost: 0},
  "pt1-1": {type: "rowIncrease", effect: ["pt1-2", "pt1-3"], baseCost: 1, scaleCost: 2},
  "pt1-2": {type: "rowIncrease", effect: ["pt1-1", "pt1-3"], baseCost: 1, scaleCost: 2},
  "pt1-3": {type: "rowIncrease", effect: ["pt1-1", "pt1-2"], baseCost: 1, scaleCost: 2},
  "pt2-1": {type: "rowIncrease", effect: ["pt2-2"], baseCost: 5, scaleCost: 2},
  "pt2-2": {type: "rowIncrease", effect: ["pt2-1"], baseCost: 5, scaleCost: 2},
  /*"pt2-1": {type: "pairedIncrease", effect: [["pt2-2", "pt2-4"], ["pt2-5"]], baseCost: 5, scaleCost: [5, 2]},
  "pt2-2": {type: "pairedIncrease", effect: [["pt2-1", "pt2-5"], ["pt2-4"]], baseCost: 5, scaleCost: [5, 2]},*/
  "pt2-3": {type: "static", cost: 50},
  "pt2-4": {type: "rowIncrease", effect: ["pt2-5"], baseCost: 5, scaleCost: 2},
  "pt2-5": {type: "rowIncrease", effect: ["pt2-4"], baseCost: 5, scaleCost: 2},
  /*"pt2-4": {type: "pairedIncrease", effect: [["pt2-1", "pt2-5"], ["pt2-2"]], baseCost: 5, scaleCost: [5, 2]},
  "pt2-5": {type: "pairedIncrease", effect: [["pt2-2", "pt2-4"], ["pt2-1"]], baseCost: 5, scaleCost: [5, 2]},*/
  "pt3-1": {type: "static", cost: 0},
  "pt3-2": {type: "static", cost: 0},
  "pt3-3": {type: "static", cost: 0},
}

//Get Data
function getPrestigeTreex(id) {
  if (id == "pt1-1") {return user.pp.sac.plus(1).ln().divide(1.125).plus(1)}
  if (id == "pt1-2") {return user.pp.sac.divide(11).plus(1).log10().times(100)}
  if (id == "pt1-3") {
    let x = user.pp.sac.plus(1.55).sqrt().log10().plus(1);
    if (x.gte(2)) {x = nd(2)}
    return x;
  }
}
function getPrestigeTreeCost(id) {
  let data = pts[id];
  let userData = user.pt.cells;
  /*if (data.type == "pairedIncrease") {
    if (userData.includes(id)) {return nd(0)}
    let cost = nd(data.baseCost);
    for (let i = 0; i < data.effect.length; i++) {
      let boughtI = false;
      for (let j = 0; j < data.effect[i].length; j++) {
        if (userData.includes(data.effect[i][j])) {boughtI = true}
      }
      if (boughtI) {
        cost = nd(data.baseCost).times(data.scaleCost[i]);
        break;
      }
    }
    return cost;
  }*/
  if (data.type == "rowIncrease") {
    if (userData.includes(id)) {return nd(0)}
    let effected = 0;
    for (let i = 0; i < data.effect.length; i++) {if (userData.includes(data.effect[i])) {effected++}}
    return nd(data.baseCost).times(nd(data.scaleCost).pow(effected)).floor();
  }
  if (data.type == "static") {
    return nd(data.cost);
  }
}
function getRefundAmount() {
  return user.pt.refundAmount;
  
  /*let refund = nd(0);
  let userData = user.pt.cells;
  let a = 0;
  for (let i = 1; i <= 3; i++) {if (userData.includes("pt1-" + i)) {a++}}
  refund = refund.plus(Math.pow(2, a) - 1);
  if (userData.includes("pt2-1") || userData.includes("pt2-2")) {
    if (userData.includes("pt2-1") && userData.includes("pt2-2")) {refund = refund.plus(15)}
    else {refund = refund.plus(5)}
  }
  if (user.pt.cells.includes("pt2-3")) {refund = refund.plus(25)}
  if (userData.includes("pt2-4") || userData.includes("pt2-5")) {
    if (userData.includes("pt2-4") && userData.includes("pt2-5")) {refund = refund.plus(15)}
    else {refund = refund.plus(5)}
  }
  return refund;*/
}

//Unlock Data
function unlockPT() {
  if (user.pt.cells.includes("pt0-1")) {s("pt1-1"); s("pt1-2"); s("pt1-3")} else {h("pt1-1"); h("pt1-2"); h("pt1-3")}
  if (user.pt.cells.includes("pt1-1")) {s("pt2-1"); s("pt2-2")} else {h("pt2-1"); h("pt2-2")}
  if (user.pt.cells.includes("pt1-2")) {s("pt2-3")} else {h("pt2-3")}
  if (user.pt.cells.includes("pt1-3")) {s("pt2-4"); s("pt2-5")} else {h("pt2-4"); h("pt2-5")}
  if (user.pt.cells.includes("pt2-2")) {/*("pt3-1"); */sc("maxAutoUnlocks")} else {/*h("pt3-1"); */hc("maxAutoUnlocks")}
  /*if (user.pt.cells.includes("pt2-3")) {s("pt3-2")} else {h("pt3-2")}*/
  if (user.pt.cells.includes("pt2-4")) {/*("pt3-3"); */sc("maxScalingUnlocks")} else {/*h("pt3-3"); */hc("maxScalingUnlocks")}
}

//Update Data
function updatePrestigeTree() {
  for (id in pts) {
    if (d(id) != null && !ih(id)) {
      /*if (user.pp.x.gte(getPrestigeTreeCost(id)) && !user.pt.cells.includes(id)) {rpc("cantBuy", "canBuy", id)}
      else {rpc("canBuy", "cantBuy", id)}*/
      
      if (user.pt.cells.includes(id)) {rc("cantBuy", id); rc("canBuy", id); ac("ppComplete", id)}
      else if (user.pp.x.lt(getPrestigeTreeCost(id))) {rc("ppComplete", id); rc("canBuy", id); ac("cantBuy", id)}
      else {rc("ppComplete", id); rc("cantBuy", id); ac("canBuy", id)}
      
      if (d(id + "x") != null) {d(id + "x").textContent = e(getPrestigeTreex(id), 2, 2)}
      if (d(id + "Cost") != null) {d(id + "Cost").textContent = e(getPrestigeTreeCost(id))}
    }
  }
  
  /*for (let i = 1; i <= 3; i += 2) {
    for (let k = 1; k <= 3; k++) {
      let id = "pt" + i + "-" + k;
      if (user.pp.x.gte(getPrestigeTreeCost(id)) && !user.pt.cells.includes(id)) {rpc("cantBuy", "canBuy", id)}
      else {rpc("canBuy", "cantBuy", id)}
      if (d(id) != null && d(id).style.display != null) {
        if (d(id + "x") != null) {d(id + "x").textContent = e(getPrestigeTreex(id), 2, 2)}
        d(id + "Cost").textContent = e(getPrestigeTreeCost(id));
      }
    }
  }*/
}
function updateRefundPT() {
  if (!user.pt.refund) {rpc("cantBuy", "canBuy", "refundPT")}
  else {rpc("canBuy", "cantBuy", "refundPT")}
}
function updateRefundPTx() {
  d("refundPTx").textContent = e(getRefundAmount());
}
