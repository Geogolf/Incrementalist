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
function getScalingP() {return nd(0.75).pow(nd(Math.pow(user.scaling.p, 4.2) + 1).log10())}
function getScalingPCost() {
  let cost = nd(10).pow(nd(user.scaling.p).times(Math.floor(nd(user.scaling.p).divide(7.5).plus(1))).plus(15));
  if (cost.gte(1e33)) {cost = nd(1e33).pow(nd(1.075).pow(user.scaling.p - 9))}
  return cost;
}
function getScalingM() {return nd(0.5).pow(nd(Math.pow(user.scaling.m, 1.25) + 1).log10())}
function getScalingMCost() {
  let cost = nd(1e37).pow(nd(1.11).pow(user.scaling.m));
  return cost;
}
function getScalingE() {return nd(1).divide(nd(user.scaling.e / 11.25 + 1).log10().plus(1))}
function getScalingECost() {
  let cost = nd(1e87).pow(nd(2).pow(user.scaling.e));
  return cost;
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
