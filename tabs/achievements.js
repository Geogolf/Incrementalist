//Data
const achievements = {
  "ach1-1": {title: "Simple enough", desc: "Buy your first P variable", hasReward: false},
  "ach1-2": {title: "Automation", desc: "Begin automation", hasReward: false},
  "ach1-3": {title: "Was it worth it?", desc: "Sacrifice for the first time", hasReward: false},
  "ach1-4": {title: "Multiplication", desc: "Buy your first M variable", hasReward: false},
  "ach1-5": {title: "I think it was worth it", desc: "Sacrifice two times", hasReward: true},
  "ach1-6": {title: "Click a few times", desc: "Click the equation 2,500 times", hasReward: true},
  "ach2-1": {title: "It's not better", desc: "Get more P than P1 after 1,000", hasReward: true},
  "ach2-2": {title: "Exponentiation", desc: "Buy your first E variable", hasReward: false},
  "ach2-3": {title: "Is this too worth it?", desc: "Sacrifice seven times", hasReward: true},
  "ach2-4": {title: "Exponential age", desc: "Buy your first scaling E upgrade", hasReward: true},
  "ach2-5": {title: "Easy sacrifice", desc: "Sacrifice without buying any variables", hasReward: false},
  "ach2-6": {title: "Can you even call this a sacrifice anymore?", desc: "Sacrifice without losing anything", hasReward: false},
  "ach3-1": {title: "Prestigious", desc: "Prestige for the first time", hasReward: true},
  "ach3-2": {title: "Is it easy already?", desc: "Prestige while sacrificing at most 10 times", hasReward: true},
  "ach3-3": {title: "Haha it's harder now", desc: "Complete prestige challenge 1 for the first time", hasReward: true},
  "ach3-4": {title: "Stonks", desc: "Buy prestige upgrade 2-3", hasReward: false},
  "ach3-5": {title: "Full automation", desc: "Fully automate prestiges", hasReward: false},
  /*"ach3-6": {title: "Sacrifice your PP", desc: "Sacrifice PP for the first time", hasReward: false},*/
  "ach3-6": {title: "[WIP]", desc: "[WIP]", hasReward: false},
  /*"ach4-1": {title: "Tetration", desc: "Buy your first T variable", hasReward: false},
  "ach4-2": {title: "The answer", desc: "42"},
  "ach4-3": {title: "Stonks 2.0", desc: "Buy prestige upgrade 5-1", hasReward: false},*/
  "ach4-1": {title: "[WIP]", desc: "[WIP]", hasReward: false},
  "ach4-2": {title: "[WIP]", desc: "[WIP]", hasReward: false},
  "ach4-3": {title: "[WIP]", desc: "[WIP]", hasReward: false},
  "ach4-4": {title: "[WIP]", desc: "[WIP]", hasReward: false},
  "ach4-5": {title: "[WIP]", desc: "[WIP]", hasReward: false},
  "ach4-6": {title: "[WIP]", desc: "[WIP]", hasReward: false},
}
for (let id in achievements) {
  let data = achievements[id];
  di(id+"Title").textContent = data.title;
  di(id+"Description").textContent = data.desc;
}
const eggs = {
  "egg1-1": {title: "That was quite a mistake", desc: "Remind Geo of his big mistake"},
  "egg1-2": {title: "EEEE", desc: "Only EEEE"}, //Removed cause of a bug
  "egg1-3": {title: "I know \"enough\" code", desc: "Find Geo's coding weakness"}, //
  "egg1-4": {title: "Congrats?", desc: "There is literally nothing you have to do"},
  "egg1-5": {title: "Yep, it's there", desc: "Perform a pixel perfect click"},
  "egg1-6": {title: "Free money", desc: "Try to give yourself money"}
}
for (let id in eggs) {
  hideId(id);
}

//Functions
function giveAchievement(id, notify) {
  if (!user.achievements.includes(id)) {
    user.achievements.push(id);
    if (notify) {alertify.message(achievements[id].title)}
  }
  if (user.achievements.length != 1) {showId("achievementS")}
  else {hideId("achievementS")}
}
function giveEgg(id, notify) {
  if (!user.eggs.includes(id)) {
    user.eggs.push(id);
    if (notify) {alertify.warning(eggs[id].title)}
    showId(id);
  }
  showId(id);
  if (user.eggs.length != 1) {showId("eggS")}
  else {hideId("eggS")}
}

//Get Data
function getAchievementBoost() {
  return nd(1.1).pow(user.achievements.length);
}
function getAchievementReward(id) {
  let multi = nd(1);
  if (user.pp.pt.cells.includes("pt3-2")) {multi = multi.times(getPTReward("pt3-2").divide(100).plus(1))}
  if (id == "ach1-5") {return nd(2).times(multi)}
  if (id == "ach1-6") {return nd(2.5).pow(user.ip.equationClicks.times(2).pow(1.35).plus(1).log10()).times(multi)}
  if (id == "ach2-1") {return nd(5).times(multi)}
  if (id == "ach2-3") {return nd(10).times(multi)}
  if (id == "ach2-4") {
    if (user.pp.pt.cells.includes("pt4-1")) {multi = multi.times(getPTReward("pt4-1"))}
    return nd(6).times(multi);
  }
  if (id == "ach3-1") {return nd(1001).pow(getPPChallengeReward(3)).times(multi)}
  if (id == "ach3-2") {return nd(user.sacrifice.IP/3+4).sqrt().minus(1).times(multi)}
  if (id == "ach3-3") {
    let completions = 0;
    for (let i=1; i<user.pp.challenge.length; i++) {completions += user.pp.challenge[i].count}
    if (completions < 12) {return nd(1.25).pow(completions).times(multi)}
    else {return nd(Math.log10(completions-10)).divide(Math.log10(1.25)).plus(11.197243)}
  }
}

//Update Data
function updateAchievements() {
  di("totalAchievements").textContent = e("d", nd(user.achievements.length), 2, 0);
  di("achievementBoost").textContent = e("d", getAchievementBoost(), 2, 2);
  for (let id in achievements) {
    if (achievements[id].hasReward) {di(id+"Reward").textContent = e("d", getAchievementReward(id), 2, 2)}
    if (user.achievements.includes(id)) {di(id).style.backgroundColor = "rgb(25, 85, 25)"}
    else {di(id).style.backgroundColor = "rgb(25, 25, 25)"}
  }
  di("totalEggs").textContent = e("d", nd(user.eggs.length), 2, 0);
  for (let id in eggs) {
    let data = eggs[id];
    di(id+"Title").textContent = data.title;
    if (user.eggs.includes(id)) {
      di(id+"Description").textContent = data.desc;
      di(id).style.backgroundColor = "rgb(85, 85, 25)";
    }
    else {
      di(id+"Description").textContent = "Locked";
      di(id).style.backgroundColor = "rgb(25, 25, 25)";
    }
  }
}
