//Data
var achievementData = {
  "ach1-1": {title: "Simple enough"},
  "ach1-2": {title: "Automation"},
  "ach1-3": {title: "Was it worth it?"},
  "ach1-4": {title: "New variables"},
  "ach1-5": {title: "I think it was worth it", rewardDec: 0},
  "ach1-6": {title: "Click a few times", rewardDec: 0},
  "ach2-1": {title: "It's still not better", rewardDec: 0},
  "ach2-2": {title: "Exponentiation"},
  "ach2-3": {title: "Is this too op?", rewardDec: 0},
  "ach2-4": {title: "Exponential age", rewardDec: 0},
  "ach2-5": {title: "[WIP]"},
  "ach2-6": {title: "[WIP]"},
  "ach3-1": {title: "Prestigious", rewardDec: 0},
  "ach3-2": {title: "Is it easy already?", rewardDec: 2},
  "ach3-3": {title: "Haha it's harder now", rewardDec: 2},
  "ach3-4": {title: "Semi Automation", rewardDec: 0},
  "ach3-5": {title: "[WIP]"},
  "ach3-6": {title: "[WIP]"},
}

//Check Data
function checkAchBasic() {
  if (!user.achievements.includes("ach1-1") && user.increment.p[0] >= 1) {completeAchievement("ach1-1")}
  let automating = false;
  for (let i = 0; i <= 4; i++) {if (user.automate.incrementP[i] || user.automate.incrementM[i]) {automating = true}}
  if (!user.achievements.includes("ach1-2") && (user.automate.ip || automating)) {completeAchievement("ach1-2")}
  if (!user.achievements.includes("ach1-3") && user.sacrifice.ip >= 1) {completeAchievement("ach1-3")}
  if (!user.achievements.includes("ach1-4") && user.increment.m[0] >= 1) {completeAchievement("ach1-4")}
  if (!user.achievements.includes("ach1-5") && user.sacrifice.ip >= 2) {completeAchievement("ach1-5")}
  if (!user.achievements.includes("ach1-6") && user.increment.ip >= 2500) {completeAchievement("ach1-6"); unlockAchievement()}
  if (!user.achievements.includes("ach2-1") && user.increment.p[0] >= 1000 && user.increment.p[1] >= 500 && (user.increment.p[0] > (user.increment.p[1] * 2))) {completeAchievement("ach2-1")}
  if (!user.achievements.includes("ach2-2") && user.increment.e[0] >= 1) {completeAchievement("ach2-2")}
  if (!user.achievements.includes("ach2-3") && user.sacrifice.ip >= 7) {completeAchievement("ach2-3")}
  if (!user.achievements.includes("ach2-4") && user.scaling.e >= 1) {completeAchievement("ach2-4")}
  /*if (!user.achievements.includes("ach2-5")) {completeAchievement("ach2-5")}
  if (!user.achievements.includes("ach2-6")) {completeAchievement("ach2-6")}*/
  if (!user.achievements.includes("ach3-1") && user.pp.total.gte(1)) {completeAchievement("ach3-1")}
  if (!user.achievements.includes("ach3-3") && user.challenge.pp[1].count > 0) {completeAchievement("ach3-3")}
  if (!user.achievements.includes("ach3-4") && user.pt.cells.includes("pt2-1") && user.pt.cells.includes("pt2-2") && user.pt.cells.includes("pt2-3") && user.pt.cells.includes("pt2-4") && user.pt.cells.includes("pt2-5")) {completeAchievement("ach3-4")}
}
setInterval(() => {checkAchBasic()}, 1000);
function checkAchOnReset(layer) {
  if (layer == "Prestige") {
    if (!user.achievements.includes("ach3-2") && user.sacrifice.ip <= 10) {completeAchievement("ach3-2")}
  }
}

//Complete / Decomplete
function completeAchievement(id, notify) {
  if (typeof notify == "undefined") {notify = true}
  user.achievements.push(id);
  rpc("achIncomplete", "achComplete", id);
  if (notify) {alertify.message(achievementData[id].title)}
}
function completeAchievements() {for (let i = 0; i < user.achievements.length; i++) {rpc("achIncomplete", "achComplete", user.achievements[i])}}
function decompleteAchievement(id) {
  if (user.achievements.includes(id)) {
    user.achievements.splice(user.achievements.indexOf(id), 1);
    rpc("achComplete", "achIncomplete", id);
  }
}
function decompleteAchievements() {
  for (let i = 1; i <= 3; i++) {   
    for (let k = 1; k <= 6; k++) {
      rpc("achComplete", "achIncomplete", "ach" + i + "-" + k);
    }
  }
  if (typeof user.achievements != "undefined") {user.achievements = []}
  /*for (let i = 0; i < user.achievements.length; i++) {
    rpc("achComplete", "achIncomplete", user.achievements[i]);
  }*/
}

//Get Data
function getAchievementReward(id) {
  if (id == "ach1-6") {return nd(2.5).pow(nd(user.increment.ip * 2).pow(1.35).plus(1).log10())}
  if (id == "ach3-1") {
    let reward = nd(1000);
    if (user.challenge.pp[3].count > 0) {reward = reward.pow(getPPChallengeReward(3))}
    return reward.plus(1);
  }
  if (id == "ach3-2") {return nd(user.sacrifice.ip / 3 + 4).sqrt().minus(1)}
  if (id == "ach3-3") {
    let completions = 0;
    for (let i = 1; i < user.challenge.pp.length; i++) {completions += user.challenge.pp[i].count}
    return nd(1.25).pow(completions);
  }
}
function getAchievementBoost() {
  return nd(1.1).pow(user.achievements.length);
}

//Update Data
function updateAchievements() {
  d("totalAchievements").textContent = e(nd(user.achievements.length));
  d("achievementBoost").textContent = e(getAchievementBoost(), 2, 2);
  updateAchievement("ach1-6");
  updateAchievement("ach3-1");
  updateAchievement("ach3-2");
  updateAchievement("ach3-3");
}
function updateAchievement(id) {
  d(id + "Reward").textContent = e(getAchievementReward(id), 2, achievementData[id].rewardDec);
}

//Unlock Data
function unlockAchievement() {
  let ach = user.achievements;
  if (ach.includes("ach1-6")) {sc("ach1-6Unlocks")} else {hc("ach1-6Unlocks")}
}
