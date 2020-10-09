//Buttons
function buyScalingP() {
  let cost = getScalingPCost();
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.scaling.p++;
  }
}
function buyScalingM() {
  let cost = getScalingMCost();
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.scaling.m++;
  }
}
function buyScalingE() {
  let cost = getScalingECost();
  if (user.ip.x.gte(cost) && cost.lt(infinite)) {
    user.ip.x = user.ip.x.minus(cost);
    user.scaling.e++;
  }
}

//Get Data
function getScalingP() {
  let multi = 1;
  if (user.pt["pt1-3"]) {multi /= getPrestigeTreex("pt1-3")}
  if (user.scaling.p >= 1) {return nd(0.75).pow(nd(Math.pow(user.scaling.p, 4.2) + 1).log10()).times(multi)}
  else {return nd(1)}
}
let scalePScalings = [
  {bought: 0, cost: "1e15", type: "j", effect: 7.5},
  {bought: 9, cost: "1e33", type: "e", effect: 1.075},
  {bought: 25, cost: "9.25e104", type: "e", effect: 1.2},
];
function getScalingPCost() {
  let index = 0;
  for (let i = 0; i < scalePScalings.length; i++) {if (user.scaling.p >= scalePScalings[i].bought) {index = i}}
  if (scalePScalings[index].type === "j") {return nd(10).pow(nd(user.scaling.p).times(Math.floor(user.scaling.p / scalePScalings[index].effect + 1)).plus(nd(scalePScalings[index].cost).log10()))}
  if (scalePScalings[index].type === "e") {return nd(scalePScalings[index].cost).pow(Math.pow(scalePScalings[index].effect, user.scaling.p - scalePScalings[index].bought))}
  
  /*let cost = nd(10).pow(nd(user.scaling.p).times(Math.floor(nd(user.scaling.p).divide(7.5).plus(1))).plus(15));
  if (cost.gte(1e33)) {cost = nd(1e33).pow(nd(1.075).pow(user.scaling.p - 9))}
  return cost;*/
}
function getScalingM() {
  let multi = 1;
  if (user.pt["pt1-3"]) {multi /= getPrestigeTreex("pt1-3")}
  if (user.scaling.m >= 1) {return nd(0.5).pow(nd(Math.pow(user.scaling.m, 1.25) + 1).log10()).times(multi)}
  else {return nd(1)}
}
let scaleMScalings = [
  {bought: 0, cost: "1e37", type: "e", effect: 1.11},
];
function getScalingMCost() {
  let index = 0;
  for (let i = 0; i < scaleMScalings.length; i++) {if (user.scaling.m >= scaleMScalings[i].bought) {index = i}}
  if (scaleMScalings[index].type === "e") {return nd(scaleMScalings[index].cost).pow(Math.pow(scaleMScalings[index].effect, user.scaling.m - scaleMScalings[index].bought))}
  
  /*let cost = nd(1e37).pow(nd(1.11).pow(user.scaling.m));
  return cost;*/
}
function getScalingE() {
  let multi = 1;
  if (user.pt["pt1-3"]) {multi /= getPrestigeTreex("pt1-3")}
  if (user.scaling.e >= 1) {return nd(1).divide(nd(user.scaling.e / 4.3 + 1).log10().plus(1)).times(multi)}
  else {return nd(1)}
}
let scaleEScalings = [
  {bought: 0, cost: "1e84", type: "e", effect: 2},
];
function getScalingECost() {
  let index = 0;
  for (let i = 0; i < scaleEScalings.length; i++) {if (user.scaling.e >= scaleEScalings[i].bought) {index = i}}
  if (scaleEScalings[index].type === "e") {return nd(scaleEScalings[index].cost).pow(Math.pow(scaleEScalings[index].effect, user.scaling.e - scaleEScalings[index].bought))}
  
  /*let cost = nd(1e85).pow(nd(2).pow(user.scaling.e));
  return cost;*/
}

//Update Data
function updateScalingP() {
  let cost = getScalingPCost();
  if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "scalingPb")}
  else {rpc("cantBuy", "canBuy", "scalingPb")}
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("scalingPx").textContent = e(getScalingP(), 0, 2);
  d("scalingPCost").textContent = e(cost);
}
function updateScalingM() {
  let cost = getScalingMCost();
  if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "scalingMb")}
  else {rpc("cantBuy", "canBuy", "scalingMb")}
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("scalingMx").textContent = e(getScalingM(), 0, 2);
  d("scalingMCost").textContent = e(cost);
}
function updateScalingE() {
  let cost = getScalingECost();
  if (user.ip.x.lt(cost) || cost.gte(infinite)) {rpc("canBuy", "cantBuy", "scalingEb")}
  else {rpc("cantBuy", "canBuy", "scalingEb")}
  if (cost.gte(infinite) && showInfinite) {cost = "Infinite"}
  d("scalingEx").textContent = e(getScalingE(), 0, 2);
  d("scalingECost").textContent = e(cost);
}
