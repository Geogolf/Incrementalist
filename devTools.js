//Give
function giveMoney(layer, amount, set) {
  if (typeof layer == "undefined") {} //EE?
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
