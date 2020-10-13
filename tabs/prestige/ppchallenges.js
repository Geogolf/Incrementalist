//Buttons
function confirmEnterPPChallenge(c) {
  let inAnyChallenge = false;
  for (let i = 1; i < ppChallengeData.length; i++) {if (user.challenge.pp[i].in) {inAnyChallenge = true}}
  if (inAnyChallenge) {return}
  if (user.confirmation.challenge) {alertify.confirm("Are you sure you want to begin this challenge?", () => {enterPPChallenge(c)})}
  else {enterPPChallenge(c)}
}
function enterPPChallenge(c) {
  if (user.challenge.pp[c].count < ppChallengeData[c].maxCompletions) {
    resetfrom = "ppChallenge";
    user.challenge.pp[c].in = true;
    resetPPChallenge(c);
    unlockAutomation();
    unlockSacrifice();
    unlockIP();
    unlockPPChallenge();
  }
}
function confirmExitPPChallenge() {
  let c = 0;
  for (let i = 1; i < ppChallengeData.length; i++) {if (user.challenge.pp[i].in) {c = i}}
  if (user.ip.x.lt(ppChallengeData[c].goals[user.challenge.pp[c].count])) {alertify.confirm("Are you sure you want to exit the challenge? You will not complete the challenge", () => {exitPPChallenge(c)})}
  else {exitPPChallenge(c)}
}
function exitPPChallenge(c) {
  resetFrom = "ppChallenge";
  resetPPChallenge(c);
  user.challenge.pp[c].in = false;
  if (user.ip.x.gte(ppChallengeData[c].goals[user.challenge.pp[c].count])) {user.challenge.pp[c].count++}
  unlockAutomation();
  unlockSacrifice();
  unlockIP();
  unlockPPChallenge();
}

//Data
const ppChallengeData = [
  "null",
  {goals: [nd(1e132)], maxCompletions: 1, rewardDec: 0},
  {goals: [nd(1e42)], maxCompletions: 1, rewardDec: 0},
  {goals: [nd(5.3e53)], maxCompletions: 1, rewardDec: 2},
];

//Get Data
function getPPChallengeReward(c) {
  if (c == 1) {return nd(user.increment.ip + 1).pow(nd(user.challenge.pp[1].count).pow(1.1))}
  if (c == 2) {return user.ip.sac.plus(1).pow(0.2 * user.challenge.pp[2].count)}
  if (c == 3) {return user.ip.highest.plus(1).log10().pow(2).plus(1).log10().times(user.challenge.pp[3].count).plus(1)}
}

//Update Data
function updatePPChallenge() {
  for (let i = 1; i < ppChallengeData.length; i++) {
    let id = "ppChallenge" + i;
    let data = ppChallengeData[i];
    if (user.challenge.pp[i].count == data.maxCompletions) {rc("cantBuy", id); rc("canBuy", id); ac("ppComplete", id)}
    /*else if (user.challenge.pp[i].count < data.maxCompletions) {rc("ppComplete", id); rc("canBuy", id); ac("cantBuy", id)}*/
    else {rc("ppComplete", id); rc("cantBuy", id); ac("canBuy", id)}
    d("ppChallenge" + i + "Goal").textContent = e(data.goals[user.challenge.pp[i].count]);
    d("ppChallenge" + i + "Completions").textContent = user.challenge.pp[i].count;
    d("ppChallenge" + i + "MaxCompletions").textContent = data.maxCompletions;
    d("ppChallenge" + i + "Reward").textContent = e(getPPChallengeReward(i), 2, data.rewardDec);
  }
}
function updatePPChallengeProgress() {
  for (let i = 0; i < ppChallengeData.length; i++) {
    if (user.challenge.pp[i].in) {
      let data = ppChallengeData[i];
      let userData = user.challenge.pp[i];
      d("currentPPChallenge").textContent = i;
      if (user.ip.x.lt(data.goals[userData.count])) {
        d("currentPPChallengeProgress").textContent = e(data.goals[userData.count].minus(user.ip.sac));
        d("ppChallengeExit").textContent = "Exit Challenge";
      }
      else {
        d("currentPPChallengeProgress").textContent = e(nd(0));
        d("ppChallengeExit").textContent = "Complete Challenge";
      }
    }
  }
}

//Unlock Data
function unlockPPChallenge() {
  let inChallenge = 0;
  for (let i = 1; i < user.challenge.pp.length; i++) {if (user.challenge.pp[i].in) {inChallenge = i}}
  if (inChallenge > 0) {s("ppChallengeInfo")} else {h("ppChallengeInfo")}
}

//Reset Data
function resetPPChallenge(c) {
  if (c >= 1 && c <= 3) {
    if (user.automate.ip) {automateIP()}
    for (let i = 0; i < 5; i++) {
      if (user.automate.incrementP[i]) {automateIncrementP(i)}
      if (user.automate.incrementM[i]) {automateIncrementM(i)}
      if (user.automate.incrementE[i]) {automateIncrementE(i)}
    }
    user.auto.ip = 0;
    user.auto.incrementP = 0;
    user.auto.incrementM = 0;
    user.auto.incrementE = 0;
    for (let i = 0; i <= 4; i++) {
      user.increment.p[i] = 0;
      user.increment.m[i] = 0;
      user.increment.e[i] = 0;
    }
    user.scaling.p = 0;
    user.scaling.m = 0;
    user.scaling.e = 0;
    user.ip.x = getIPStart();
    user.ip.sac = getIPStart();
    user.sacrifice.ip = 0;
  }
}
