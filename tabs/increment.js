//Data
const increment = {
  "P": {
    highestNum: -1,
    result: nd(0),
    baseCost: 1,
    auto: true,
    dec: 0
  },
  "M": {
    highestNum: -1,
    result: nd(0),
    baseCost: 1e7,
    auto: true,
    dec: 0
  },
  "E": {
    highestNum: -1,
    result: nd(0),
    baseCost: 1e30,
    auto: true,
    dec: 3
  },
  "T": {
    highestNum: -1,
    result: nd(0),
    baseCost: ["1e800", "1e6900", "ee1e10", "ee1e10", "ee1e10"],
    auto: false,
    dec: 6
  }
}
for (let name in increment) {
  for (let i=0; i<5; i++) {
    di("increment"+name+i+"b").addEventListener("click", () => {buyIncrement(name, i); lastClicked = "increment"+name+i+"b"});
  }
}
di("equationIPb").addEventListener("click", () => {clickEquation(); lastClicked = "equationIPb"});

//Buttons
let clicksThisSecond = 0;
function clickEquation() {
  if (clicksThisSecond > 15) {return}
  giveMoney("IP", getEquationIPResult().times(getClickMulti()));
  user.ip.equationClicks = user.ip.equationClicks.plus(1);
  checkUnlocks();
  clicksThisSecond++;
}
function buyIncrement(name, num) {
  if (name == "P" && user.pp.challenge[6].in) {return false}
  if (di("increment"+name+num).style.display != "none") {
    let cost = getIncrementCost(name, num);
    if (user.ip.current.gte(cost) && cost.lt(user.ip.infinite)) {
      if (cost.lt("ee9")) {user.ip.current =  user.ip.current.minus(cost)}
      /*if (name == "E" && num == 4) {
        let condition = false;
        for (name in increment) {
          for (let i=0; i<5; i++) {
            if (user.ip.increment[name].bought[i] > 0) {condition = true}
          }
        }
        if (!condition) {giveEgg("egg1-2", true)}
      }*/
      user.ip.increment[name].bought[num]++;
      if (user.pp.challenge[2].in) {
        for (let i=0; i<num; i++) {
          user.ip.increment[name].bought[i] = 0;
        }
      }
      return true;
    }
    else {return false}
  }
  else {return false}
}

//Set Data
function setIncrementData() {
  for (let name in increment) {
    setIncrementResult(name);
  }
}
function setIncrementHighestNum(name) {
  for (let i=0; i<5; i++) {
    if (di("increment"+name+i).style.display != "none") {
      increment[name].highestNum = i;
    }
    else if (i == 0) {increment[name].highestNum = -1}
  }
}
function setIncrementResult(name) {
  setIncrementHighestNum(name);
  if (name == "P") {
    if (increment[name].highestNum < 0) {increment[name].result = nd(0); return}
    let result = getIncrementx(name, increment[name].highestNum);
    for (let i=(increment[name].highestNum-1); i>-1; i--) {result = result.times(getSacrificeBoost("IP", name)).plus(getIncrementx(name, i).pow(getIncremente(name, i)))}
    if (isNaN(result)) {result = nd(1)}
    increment[name].result = result;
  }
  if (name == "M") {
    if (increment[name].highestNum < 0) {increment[name].result = nd(1); return}
    let result = getIncrementx(name, increment[name].highestNum);
    for (let i=(increment[name].highestNum-1); i>-1; i--) {result = result.times(getSacrificeBoost("IP", name)).times(getIncrementx(name, i))}
    if (isNaN(result)) {result = nd(1)}
    increment[name].result = result;
  }
  if (name == "E") {
    if (increment[name].highestNum < 0) {increment[name].result = nd(1); return}
    let result = getIncrementx(name, increment[name].highestNum);
    for (let i=(increment[name].highestNum-1); i>-1; i--) {result = result.times(getSacrificeBoost("IP", name)).plus(getIncrementx(name, i))}
    result = result.plus(1);
    if (isNaN(result)) {result = nd(1)}
    increment[name].result = result;
  }
  if (name == "T") {
    if (increment[name].highestNum < 0) {increment[name].result = nd(1); return}
    let result = getIncrementx(name, increment[name].highestNum);
    for (let i=(increment[name].highestNum-1); i>-1; i--) {result = result.times(getSacrificeBoost("IP", name)).plus(getIncrementx(name, i))}
    result = result.plus(1);
    if (isNaN(result)) {result = nd(1)}
    increment[name].result = result;
  }
}

//Get Data
function getIPMulti() {
  let multi = nd(1);
  if (user.pp.pt.cells.includes("pt2-3")) {multi = multi.times(getPTReward("pt2-3"))}
  return getAchievementBoost().times(getPPBoost()).times(multi);
}
function getIPExponent() {
  return getSacrificeBoost("PP", "C2");
}
function getClickMulti() {
  let multi = nd(1);
  if (user.achievements.includes("ach1-6")) {multi = multi.times(getAchievementReward("ach1-6"))}
  return multi;
}
function getEquationIPResult() {
  return getIPMulti().times(increment.P.result.times(increment.M.result).pow(increment.E.result).tetrate(increment.T.result).pow(getIPExponent()));
}
function getIncrementx(name, num) {
  if (name == "P") {
    let exp = (user.pp.challenge[6].count > 0) ? nd(6-num).pow(getPPChallengeReward(6)) : nd(1);
    return nd(num+1).pow(nd(num)).times(user.ip.increment[name].bought[num]).pow(exp);
  }
  if (name == "M") {return nd(Math.pow(3, num)).times(user.ip.increment[name].bought[num]).plus(1)}
  if (name == "E") {return nd(user.ip.increment[name].bought[num]+1).log10().divide(3.5/(Math.sqrt(num+1)))}
  if (name == "T") {return nd(user.ip.increment[name].bought[num]+1).pow(nd(0.0001443+num/30000)).minus(1)}
}
function getIncremente(name, num) {
  if (name == "P") {return nd(6-num).pow(getPPChallengeReward(6))}
  else {return nd(1)}
}
function getIncrementCost(name, num) {
  /*if (name == "T") {return nd(increment[name].baseCost[num]).pow(nd(num+2).tetrate(user.ip.increment[name].bought[num]))}*/
  if (name == "T") {
    if (user.ip.increment[name].bought[num] > 1) {return nd(increment[name].baseCost[num]).pow(nd(Math.pow(user.ip.increment[name].bought[num], 2)).tetrate(num+2))}
    else {return nd(increment[name].baseCost[num]).pow(nd(num+2).tetrate(user.ip.increment[name].bought[num]))}
  }
  return nd(increment[name].baseCost).times(getIncrementRatio(name, num).pow(user.ip.increment[name].bought[num])).floor();
}
function getIncrementRatio(name, num) {
  if (name == "P") {
    let multi = nd(1);
    if (user.achievements.includes("ach2-1")) {multi = multi.times(getAchievementReward("ach2-1"))}
    if (user.pp.pt.cells.includes("pt2-5") && !user.pp.challenge[4].in) {
      let thisMulti = getPTReward("pt2-5").minus(num).pow(2);
      if (user.pp.pt.cells.includes("pt3-3")) {thisMulti = thisMulti.times(1.25)}
      multi = multi.times(thisMulti);
    }
    let scale = nd(0.125);
    if (user.pp.challenge[3].in) {scale = nd(25)}
    return nd(1).plus(scale.times(Math.pow(2, num)).divide(getScalingEffect("P").times(multi)));
  }
  if (name == "M") {
    let scale = nd(1.3579);
    if (user.pp.challenge[3].in) {scale = nd(100)}
    return nd(1).plus(scale.pow(num+1).minus(1).divide(getScalingEffect("M")));
  }
  if (name == "E") {
    let scale = nd(1e30);
    if (user.pp.challenge[3].in) {scale = nd(1e100)}
    return nd(1).plus(scale.pow(nd(num+1).divide(getScalingEffect("E"))).minus(1));
  }
}

//Update Data
function updateIncrements() {
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      updateIncrement(name, i);
      updateCoefficient(name, i);
    }
  }
}
function updateEquationIP() {
  di("equationCx").textContent = e("d", getIPMulti(), "d", 2);
  di("equationC2x").textContent = e("d", getIPExponent(), "d", 2);
  for (let name in increment) {
    di("equation"+name+"x").textContent = e("d", increment[name].result, "d", increment[name].dec);
  }
  let result = getEquationIPResult();
  di("equationIPResult").textContent = e("d", result, "d", 0);
  di("equationClickResult").textContent = e("d", result.times(getClickMulti()), "d", 0);
}
function updateCoefficient(name, num) {
  if (num == 4) {return}
  di("coefficient"+name+num).textContent = e("d", getSacrificeBoost("IP", name), "d", increment[name].dec);
}
function updateIncrement(name, num) {
  if (di("increment"+name+num).style.display != "none") {
    let cost = getIncrementCost(name, num);
    if (user.ip.current.lt(cost) || cost.gte(user.ip.infinite)) {replaceClass("canBuy", "cantBuy", "increment"+name+num+"b")}
    else {replaceClass("cantBuy", "canBuy", "increment"+name+num+"b")}
    if (cost.gte(user.ip.infinite) && showInfinite) {cost = "Infinite"}
    di("increment"+name+num+"x").textContent = e("d", getIncrementx(name, num), "d", increment[name].dec);
    if (di("exponent"+name+num) != null) {di("exponent"+name+num).textContent = e("d", getIncremente(name, num), "d", 3)}
    di("increment"+name+num+"Cost").textContent = e("d", cost, "d", 0);
  }
}
