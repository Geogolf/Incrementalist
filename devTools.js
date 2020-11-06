//Give
function giveMoney(layer, amount, set) {
  if (typeof layer == "undefined") {giveEgg("egg1-6", true)}
  if (!set) {
    user[layer.toLowerCase()].current = user[layer.toLowerCase()].current.plus(amount);
    user[layer.toLowerCase()].sac = user[layer.toLowerCase()].sac.plus(amount);
    user[layer.toLowerCase()].total = user[layer.toLowerCase()].total.plus(amount);
    if (user[layer.toLowerCase()].current.gt(user[layer.toLowerCase()].highest)) {user[layer.toLowerCase()].highest = user[layer.toLowerCase()].current}
  }
  else {
    user[layer.toLowerCase()].current = nd(amount);
    user[layer.toLowerCase()].sac = nd(amount);
    user[layer.toLowerCase()].total = nd(amount);
    if (user[layer.toLowerCase()].current.gt(user[layer.toLowerCase()].highest)) {user[layer.toLowerCase()].highest = user[layer.toLowerCase()].current}
    
  }
}
function takeMoney(layer, amount) {
  user[layer.toLowerCase()].current = user[layer.toLowerCase()].current.minus(amount);
  user[layer.toLowerCase()].sac = user[layer.toLowerCase()].sac.minus(amount);
  user[layer.toLowerCase()].total = user[layer.toLowerCase()].total.minus(amount);
}

//Progress
function progress() {}
