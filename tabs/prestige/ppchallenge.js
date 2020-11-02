const ppChallenge = [
  "null",
  {goals: ["1e153", "1e250", "4.27e427", "1e799"], maxCompletions:4},
  {goals: ["1e42", "1e73", "1e202"], maxCompletions: 3},
  {goals: ["1e93", "1e385"], maxCompletions: 2},
  {goals: ["1e105", "1.5e150"], maxCompletions: 2},
  /*{goals: [nd("1e10000")], maxCompletions: 1}*/
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
    resetFrom = "ppChallenge";
    user.pp.challenge[c].in = true;
    resetPPChallenge(c);
  }
}
function confirmExitPPChallenge() {
  let c = 0;
  for (let i=1; i<ppChallenge.length; i++) {if (user.pp.challenge[i].in) {c = i}}
  if (user.ip.sac.lt(getPPChallengeGoal(c))) {alertify.confirm("Are you sure you want to exit the challenge? You will not complete the challenge", () => {exitPPChallenge(c)})}
  else {exitPPChallenge(c)}
}
function exitPPChallenge(c) {
  user.pp.challenge[c].in = false;
  if (user.ip.sac.gte(getPPChallengeGoal(c))) {user.pp.challenge[c].count++}
  resetFrom = "ppChallenge";
  resetPPChallenge(c);
}

//Get Data
function getPPChallengeGoal(c) {
  let goal = nd(ppChallenge[c].goals[user.pp.challenge[c].count]);
  let multi = nd(1);
  if (user.achievements.includes("ach4-4")) {multi = multi.divide(getAchievementReward("ach4-4"))}
  return goal.times(multi);
}
function getPPChallengeReward(c) {
  if (c == 1) {return user.ip.equationClicks.plus(Math.E).ln().pow(Math.pow(user.pp.challenge[1].count, 2))}
  /*if (c == 1) {return user.ip.equationClicks.times(Math.pow(user.pp.challenge[c].count, 50)).plus(10).log10().pow(Math.pow(user.pp.challenge[c].count, 2))}*/
  /*if (c == 1) {return nd(user.pp.challenge[c].count+1).pow(10).times(nd(user.pp.challenge[c].count+10).log10().pow(user.ip.equationClicks.pow(2).plus(1).log10()))}*/
  if (c == 2) {return user.ip.sac.plus(1).pow(0.2*user.pp.challenge[c].count)}
  if (c == 3) {return user.ip.highest.plus(1).log10().pow(2).plus(1).log10().times(user.pp.challenge[c].count).plus(1)}
  if (c == 4) {return nd(0.5).times(user.pp.challenge[c].count)}
}

//Update Data
function updatePPChallenges() {
  for (let i=1; i<ppChallenge.length; i++) {
    if (user.pp.challenge[i].count < ppChallenge[i].maxCompletions) {replaceClass("cantBuy", "canBuy", "ppChallenge"+i)}
    else {replaceClass("canBuy", "cantBuy", "ppChallenge"+i)}
    /*for (let k=0; k<ppChallenge[i].goals.length; k++) {
      di("ppChallenge"+i+"Goal").textContent = e("d", nd(ppChallenge[i].goals[k]), 2, 0);
    }*/
    di("ppChallenge"+i+"Goal").textContent = e("d", getPPChallengeGoal(i), 2, 0);
    di("ppChallenge"+i+"Completions").textContent = user.pp.challenge[i].count;
    di("ppChallenge"+i+"MaxCompletions").textContent = ppChallenge[i].maxCompletions;
    di("ppChallenge"+i+"Reward").textContent = e("d", getPPChallengeReward(i), 2, 2);
  }
}
function updatePPChallengeProgress() {
  for (let i=1; i<ppChallenge.length; i++) {
    if (user.pp.challenge[i].in) {
      let goal = getPPChallengeGoal(i);
      di("currentPPChallenge").textContent = i;
      let dif = goal.minus(user.ip.sac);
      if (dif.gt(0)) {di("currentPPChallengeProgress").textContent = e("d", dif, 2, 0)}
      else {di("currentPPChallengeProgress").textContent = e("d", nd(0), 2, 0)}
      if (user.ip.sac.lt(goal)) {di("exitPPChallenge").textContent = "Exit Challenge"}
      else {di("exitPPChallenge").textContent = "Complete Challenge"}
    }
  }
}

//Reset Data
function resetPPChallenge(c) {
  if (c == 4) {refundPT()}
  for (let name in automation) {
    if (automation[name].currency == "ip") {
      if (Array.isArray(user.automation[name].enabled)) {
        for (let i=0; i<user.automation[name].enabled.length; i++) {
          if (user.automation[name].enabled[i]) {toggleAutomation(name, i)}
        }
      }
      else {
        if (user.automation[name].enabled) {toggleAutomation(name)}
      }
      user.automation[name].bought = 0;
    }
  }
  for (let name in increment) {
    for (let i=0; i<5; i++) {
      user.ip.increment[name].bought[i] = 0;
    }
  }
  for (let name in scaling) {
    user.scaling[name].bought = 0;
  }
  user.ip.current = getIPStart();
  user.ip.sac = getIPStart();
  user.sacrifice.IP = 0;
}
