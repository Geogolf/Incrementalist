const ppChallenge = [
  "null",
  {goals: ["1e153", "1e250", "1e421", "1e799", "e5000"], maxCompletions: 5},
  {goals: ["1e42", "1e73", "1e202", "1e488"], maxCompletions: 4},
  {goals: ["1e93", "1e385", "e3973"], maxCompletions: 3},
  {goals: ["1e105", "1e150"], maxCompletions: 2},
  {goals: ["1e181"], maxCompletions: 1},
  {goals: ["1e4547"], maxCompletions: 1}
];
for (let i=1; i<ppChallenge.length; i++){
  di("ppChallenge"+i).addEventListener("click", () => {confirmEnterPPChallenge(i)});
}
di("exitPPChallenge").addEventListener("click", () => {confirmExitPPChallenge()});

//Buttons
function confirmEnterPPChallenge(c) {
  let inAnyChallenge = false;
  for (let i=1; i<ppChallenge.length; i++) {if (user.pp.challenge[i].in) {inAnyChallenge = true}}
  if (inAnyChallenge) {return}
  if (user.options.confirmations.includes("Challenge")) {alertify.confirm("Are you sure you want to begin this challenge?", () => {enterPPChallenge(c)})}
  else {enterPPChallenge(c)}
}
function enterPPChallenge(c) {
  if (user.pp.challenge[c].count < ppChallenge[c].maxCompletions) {
    if (user.options.changeTabOnChallenge) {showTab("Increment")}
    user.automation.Prestige.enabled["0"] = false;
    user.pp.challenge[c].in = true;
    reset.push("ppChallenge");
    resetPPChallenge(c);
  }
}
function confirmExitPPChallenge() {
  let c = 0;
  for (let i=1; i<ppChallenge.length; i++) {if (user.pp.challenge[i].in) {c = i}}
  (user.ip.sac.lt(getPPChallengeGoal(c))) ? alertify.confirm("Are you sure you want to exit the challenge? You will not complete the challenge", () => {exitPPChallenge(c)}) : exitPPChallenge(c);
}
function exitPPChallenge(c) {
  let completions = 0;
  if (user.pp.milestones < 6) {if (user.ip.sac.gte(getPPChallengeGoal(c))) {completions = 1}}
  else {for (let i=user.pp.challenge[c].count; i<ppChallenge[c].goals.length; i++) {if (user.ip.sac.gte(getPPChallengeGoal(c, i))) {completions++}}}
  user.pp.challenge[c].count += completions;
  (user.options.retryChallenges) ? enterPPChallenge(c) : user.pp.challenge[c].in = false;
}

//Get Data
function getPPChallengeGoal(c, completions, trueGoal) {
  let count = completions || user.pp.challenge[c].count;
  let multi = nd(1);
  if (user.achievements.includes("ach4-4")) {multi = multi.divide(getAchievementReward("ach4-4"))}
  return (trueGoal) ? nd(ppChallenge[c].goals[count]) : nd(ppChallenge[c].goals[count]).times(multi);
}
function getPPChallengeCap(c) {
  if (c == 3) {return nd(33.33)}
}
function getPPChallengeReward(c) {
  let exp = nd(1);
  if (user.achievements.includes("ach5-1")) {exp = getAchievementReward("ach5-1")}
  if (c == 1) {return user.ip.equationClicks.plus(Math.E).ln().pow(Math.pow(user.pp.challenge[1].count, 2)).pow(exp)}
  /*if (c == 1) {return user.ip.equationClicks.times(Math.pow(user.pp.challenge[c].count, 50)).plus(10).log10().pow(Math.pow(user.pp.challenge[c].count, 2))}*/
  /*if (c == 1) {return nd(user.pp.challenge[c].count+1).pow(10).times(nd(user.pp.challenge[c].count+10).log10().pow(user.ip.equationClicks.pow(2).plus(1).log10()))}*/
  if (c == 2) {return user.ip.sac.plus(1).pow(0.2*user.pp.challenge[c].count).pow(exp)}
  if (c == 3) {
    if (user.pp.challenge[5].in) {return nd(1)}
    let x = user.ip.highest.plus(1).log10().pow(2).plus(1).log10().times(user.pp.challenge[c].count).plus(1).pow(exp);
    let cap = getPPChallengeCap(3);
    if (x.gt(cap)) {x = cap}
    return x;
  }
  if (c == 4) {return nd(0.5).times(user.pp.challenge[c].count).pow(exp)}
  if (c == 5) {return nd(user.sacrifice.IP.count+16.32).log10().minus(1).times(user.pp.challenge[c].count).plus(1).pow(exp)}
  if (c == 6) {return nd(Math.log10(user.pp.challenge[c].count+1))}
}

//Update Data
function updatePPChallenges() {
  for (let i=1; i<ppChallenge.length; i++) {
    if (user.pp.challenge[i].count < ppChallenge[i].maxCompletions) {replaceClass("cantBuy", "canBuy", "ppChallenge"+i)}
    else {replaceClass("canBuy", "cantBuy", "ppChallenge"+i)}
    /*for (let k=0; k<ppChallenge[i].goals.length; k++) {
      di("ppChallenge"+i+"Goal").textContent = e("d", nd(ppChallenge[i].goals[k]), "d", 0);
    }*/
    let goal = getPPChallengeGoal(i, undefined, true);
    /*if (goal.lt(1)) {goal = nd(0)}*/
    if (user.pp.challenge[i].count == ppChallenge[i].maxCompletions) {di("ppChallenge"+i+"Goal").textContent = e("d", "Infinite")}
    else {di("ppChallenge"+i+"Goal").textContent = e("d", goal, "d", 0)}
    di("ppChallenge"+i+"Completions").textContent = e("d", nd(user.pp.challenge[i].count));
    di("ppChallenge"+i+"MaxCompletions").textContent = e("d", nd(ppChallenge[i].maxCompletions));
    di("ppChallenge"+i+"Reward").textContent = e("d", getPPChallengeReward(i), "d", 2);
    if (di("ppChallenge"+i+"Cap") != null) {di("ppChallenge"+i+"Cap").textContent = e("d", getPPChallengeCap(i), "d", 2)}
  }
}
function updatePPChallengeProgress() {
  for (let i=1; i<ppChallenge.length; i++) {
    if (user.pp.challenge[i].in) {
      let goal = getPPChallengeGoal(i);
      di("currentPPChallenge").textContent = i;
      let dif = goal.minus(user.ip.sac);
      if (dif.lt(0)) {dif = nd(0)}
      if (dif.gt(0)) {di("currentPPChallengeProgress").textContent = e("d", dif, "d", 0)}
      else {di("currentPPChallengeProgress").textContent = e("d", nd(0), "d", 0)}
      if (user.ip.sac.lt(goal)) {di("exitPPChallenge").textContent = "Exit Challenge"}
      else {di("exitPPChallenge").textContent = "Complete Challenge"}
    }
  }
}

//Reset Data
function resetPPChallenge(c) {
  for (let name in automation) {
    if (c == 4) {user.automation[name].buyMax = false}
    if (automation[name].currency == "ip") {
      for (let key in user.automation[name].enabled) {
        if (user.automation[name].enabled[key]) {toggleAutomation(name, key)}
      }
      user.automation[name].bought = 0;
    }
  }
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      user.ip.increment[name].bought[i] = (user.pp.challenge[6].in && name == "P") ? 1 : 0;
    }
  }
  for (let name in scaling) {
    if (c == 4) {user.scaling[name].buyMax = false}
    user.scaling[name].bought = 0;
  }
  user.ip.current = getIPStart();
  user.ip.sac = getIPStart();
  user.sacrifice.IP.count = 0;
}
