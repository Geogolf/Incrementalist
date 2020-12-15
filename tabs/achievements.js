//Data
const achievements = {
  "ach1-1": {title: "Addition", desc: "Buy your first P variable"},
  "ach1-2": {title: "Automation", desc: "Begin automation"},
  "ach1-3": {title: "Was it worth it?", desc: "Sacrifice for the first time"},
  "ach1-4": {title: "Multiplication", desc: "Buy your first M variable"},
  "ach1-5": {title: "I think it was worth it", desc: "Sacrifice two times"},
  "ach1-6": {title: "Click a few times", desc: "Click the equation 3,333 times"},
  "ach2-1": {title: "It's not better", desc: "Get 1,000 P without any P1"},
  "ach2-2": {title: "Exponential", desc: "Buy your first E variable"},
  "ach2-3": {title: "Is this too worth it?", desc: "Sacrifice seven times"},
  "ach2-4": {title: "Exponential age", desc: "Buy your first scaling E upgrade"},
  "ach2-5": {title: "Easy sacrifice", desc: "Sacrifice without buying any variables"},
  "ach2-6": {title: "Can you even call this a sacrifice anymore?", desc: "Sacrifice without losing anything"},
  "ach3-1": {title: "Prestigious", desc: "Prestige for the first time"},
  "ach3-2": {title: "Is it easy already?", desc: "Prestige while sacrificing at most 10 times"},
  "ach3-3": {title: "Haha it's harder now", desc: "Complete prestige challenge 1 for the first time"},
  "ach3-4": {title: "Stonks", desc: "Buy prestige upgrade 2-3"},
  "ach3-5": {title: "Full automation", desc: "Fully automate prestiges"},
  "ach3-6": {title: "Sacrifice your PP", desc: "Sacrifice PP for the first time"},
  "ach4-1": {title: "Tetration", desc: "Buy your first T variable"},
  "ach4-2": {title: "The answer", desc: "Import 42"},
  "ach4-3": {title: "Stonks 2.0", desc: "Buy prestige upgrade 5-1"},
  "ach4-4": {title: "This is too easy", desc: "Prestige without sacrificing"},
  "ach4-5": {title: "This was worth it", desc: "Sacrifice PP two times"},
  "ach4-6": {title: "IP go brrrrr", desc: "Buy the second T variable"},
  "ach5-1": {title: "Easy prestige", desc: "Prestige without buying any variables"},
  "ach5-2": {title: "Auto stonks", desc: "Automate automation"},
}
for (let id in achievements) {
  let data = achievements[id];
  di(id+"Title").textContent = data.title;
  di(id+"Description").textContent = data.desc;
}
const eggs = {
  "egg1-1": {title: "That was quite a mistake", desc: "Remind Geo of his big mistake"},
  "egg1-2": {title: "EEEE", desc: "Only EEEE"}, //Removed cause of a bug
  "egg1-3": {title: "osu!", desc: "xzxzxzxzxz"}, //
  "egg1-4": {title: "Congrats?", desc: "There is literally nothing you have to do"},
  "egg1-5": {title: "Yep, it's there", desc: "Perform a pixel perfect click"},
  "egg1-6": {title: "Free money", desc: "Try to give yourself money"}
}
for (let id in eggs) {hideId(id)}

//Functions
function giveAchievement(id, notify) {
  if (!user.achievements.includes(id)) {
    user.achievements.push(id);
    if (notify) {alertify.message(achievements[id].title)}
  }
  (user.achievements.length != 1) ? showId("achievementS") : hideId("achievementS");
}
function takeAchievement(id) {
  if (user.achievements.includes(id)) {
    user.achievements.splice(user.achievements.indexOf(id), 1);
  }
  (user.achievements.length != 1) ? showId("achievementS") : hideId("achievementS");
}
function giveEgg(id, notify) {
  if (!user.eggs.includes(id)) {
    user.eggs.push(id);
    if (notify) {alertify.warning(eggs[id].title)}
  }
  showId(id);
  (user.eggs.length != 1) ? showId("eggS") : hideId("eggS");
}

//Get Data
function getAchievementBoost() {
  let exp = nd(1);
  /*if (user.pp.pt.cells.includes("pt5-5")) {exp = exp.times(getPTReward("pt5-5"))}*/
  return nd(1.1).pow(user.achievements.length).pow(exp);
}
function getAchievementReward(id) {
  let multi = nd(1);
  let exp = nd(1);
  if (user.pp.pt.cells.includes("pt3-2")) {multi = multi.times(getPTReward("pt3-2").divide(100).plus(1))}
  if (id == "ach1-5") {return nd(2).times(multi)}
  if (id == "ach1-6") {return nd(2.5).pow(user.ip.equationClicks.pow(1.35).plus(1).log10()).times(multi)}
  if (id == "ach2-1") {return nd(5).times(multi)}
  if (id == "ach2-3") {return nd(10).times(multi)}
  if (id == "ach2-4") {
    if (user.pp.pt.cells.includes("pt4-1")) {multi = multi.times(getPTReward("pt4-1"))}
    return nd(6).times(multi);
  }
  if (id == "ach3-1") {return nd(1001).pow(getPPChallengeReward(3)).times(multi)}
  if (id == "ach3-2") {
    let sacrifices = user.sacrifice.IP.count;
    let x = nd(sacrifices/3+4).sqrt().minus(1).times(multi);
    if (user.pp.pt.cells.includes("pt6-1")) {x = Decimal.tetrate(x, 3)}
    return x;
  }
  if (id == "ach3-3") {
    let completions = 0;
    for (let i=1; i<user.pp.challenge.length; i++) {completions += user.pp.challenge[i].count}
    if (user.pp.pt.cells.includes("pt6-2")) {exp = exp.times(getPTReward("pt6-2"))}
    if (completions < 12) {return nd(1.25).pow(completions).times(multi).pow(exp)}
    else {return nd(Math.log10(completions-10)).divide(Math.log10(1.25)).plus(11.197243).divide(1.125).times(multi).pow(exp)}
  }
  if (id == "ach3-6") {
    if (user.achievements.includes("ach4-5")) {multi = multi.times(getAchievementReward("ach4-5"))}
    return nd(10).times(multi);
  }
  if (id == "ach4-4") {return user.ip.sac.plus(1).pow(0.1).times(multi)}
  if (id == "ach4-5") {return nd(1).plus(user.ip.equationClicks.log10().divide(nd(1.75).log10())).times(multi)}
  if (id == "ach5-1") {return nd(user.pp.pt.cells.length+1).pow(0.094492).times(multi)}
}

//Update Data
function updateAchievements() {
  di("totalAchievements").textContent = e("d", nd(user.achievements.length), 2, 0);
  di("achievementBoost").textContent = e("d", getAchievementBoost(), 2, 2);
  for (let id in achievements) {
    if (di(id+"Reward") != null) {di(id+"Reward").textContent = e("d", getAchievementReward(id), 2, 2)}
    if (user.achievements.includes(id)) {di(id).style.backgroundColor = "rgb(25, 85, 25)"}
    else {di(id).style.backgroundColor = "rgb(25, 25, 25)"}
  }
  di("totalEggs").textContent = e("d", nd(user.eggs.length), 2, 0);
  for (let id in eggs) {
    let data = eggs[id];
    di(id+"Title").textContent = data.title;
    if (user.eggs.includes(id)) {
      showId(id);
      di(id+"Description").textContent = data.desc;
      di(id).style.backgroundColor = "rgb(85, 85, 25)";
    }
    else {
      hideId(id);
      di(id+"Description").textContent = "Locked";
      di(id).style.backgroundColor = "rgb(25, 25, 25)";
    }
  }
}
