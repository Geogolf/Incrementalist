//Data
var achievement = {}
achievement.titles = {}
/*achievement.hasReward = {}*/
for (let i = 1; i <= 3; i++) {
  for (let k = 1; k <= 6; k++) {
    let id = "ach" + i + "-" + k;
    achievement.titles[id] = d(id + "Title").textContent;
    /*achievement.hasReward[id] = d(id).textContent.includes("Reward");*/
  }
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
}
setInterval(() => {checkAchBasic()}, 1000);
function checkAchOnReset(layer) {
  if (layer == "Prestige") {
    if (!user.achievements.includes("ach3-2") && user.sacrifice.ip <= 10) {completeAchievement("ach3-2")}
  }
}

//Functions
function completeAchievement(id, notify) {
  if (typeof notify == "undefined") {notify = true}
  user.achievements.push(id);
  rpc("achIncomplete", "achComplete", id);
  if (notify) {alertify.message(achievement.titles[id])}
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

function getAchievementReward(id) {
  if (id == "ach1-6") {return nd(2.5).pow(nd(user.increment.ip * 2).pow(1.35).plus(1).log10())}
}
function updateAchievement(id) {
  if (id == "ach1-6") {d(id + "Reward").textContent = e(getAchievementReward(id))}
}
function unlockAchievement() {
  let ach = user.achievements;
  if (ach.includes("ach1-6")) {sc("ach1-6Unlocks")} else {hc("ach1-6Unlocks")}
}
