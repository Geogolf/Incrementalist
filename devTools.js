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

//Progress
function progress() {
  /*user.ip.equationClicks = 10000;
  user.sacrifice.IP = 14;
  user.pp.challenge[1].count = 3;
  user.pp.challenge[2].count = 2;
  user.pp.challenge[3].count = 1;
  user.pp.challenge[4].count = 1;
  user.pp.count = 2000;
  for (let i=1; i<=6; i++) {giveAchievement("ach1-"+i)}
  for (let i=1; i<=6; i++) {giveAchievement("ach2-"+i)}
  for (let i=1; i<=4; i++) {giveAchievement("ach3-"+i)}
  giveMoney("IP", "2.01e687", true);
  giveMoney("PP", "120000", true);
  user.options.confirmations = ["Reset"];*/
}
