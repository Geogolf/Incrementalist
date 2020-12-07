//Data
const options = {
  Notation: {type: "Dropdown", onclick: (note) => {setNotation(note)}, items: ["Scientific"/*, "Engineering"*/, "Logarithm"/*, "Letters"*/, "Infinity", "Blind"]},
  Confirmation: {type: "Dropdown", onclick: (con) => {toggleConfirmation(con)}, items: [/*"Reset", */"Sacrifice", "Prestige", "Challenge"]},
  Logpb: {type: "None", onclick: () => {toggleLogpb()}},
  SmartAutoPrestige: {type: "None", onclick: () => {toggleSmartAutoPrestige()}},
  /*UIRate: {type: "Input", onclick: () => {setUIRate()}},*/
  Save: {type: "None", onclick: () => {save(true)}},
  Export: {type: "None", onclick: () => {exporty()}},
  Import: {type: "None", onclick: () => {importy()}},
  Reset: {type: "None", onclick: () => {confirmResetAll()}}
}
for (let name in options) {
  let data = options[name];
  /*if (data.type == "Input") {
    di(name+"Input").addEventListener("input", () => {data.onclick()});
  }*/
  if (data.type == "Dropdown") {
    for (k=0; k<data.items.length; k++) {
      let item = data.items[k];
      di(name.toLowerCase()+item).addEventListener("click", () => {data.onclick(item)});
    }
  }
  if (data.type == "None") {di(name).addEventListener("click", () => {data.onclick()})}
}

//Functions
function setNotation(note) {
  user.options.notation = note;
  setPrestigeAt(user.automation.Prestige.at);
  updateNotation(note);
}
function toggleConfirmation(con) {
  if (user.options.confirmations.includes(con)) {user.options.confirmations.splice(user.options.confirmations.indexOf(con), 1)}
  else {user.options.confirmations.push(con)}
  updateConfirmation(con);
}
function toggleLogpb() {user.options.logpb = !user.options.logpb}
/*function setUIRate(rate) {
  rate = rate || di("UIRateInput").value;
  di("UIRateInput").value = rate;
  user.options.uiRate = rate;
  updateRate = Number(rate);
  refreshGameInterval();
}*/
function toggleSmartAutoPrestige() {user.options.smartAutoPrestige = !user.options.smartAutoPrestige}
function toggleVariableAutomation() {user.options.variableAutomation = !user.options.variableAutomation}

function save(notify) {
  localStorage.setItem("user", JSON.stringify(user));
  if (notify) {alertify.success("Game Saved")}
}
function exporty() {copyToClipboard(encode(JSON.parse(localStorage.getItem("user"))))}
function importy() {
  alertify.prompt("Paste your save code here", "", (event, value) => {
    if (value === "42") {giveAchievement("ach4-2", true)}
    else {
      /*let data = JSON.parse(atob(value));*/
      /*let data = JSON.parse(decode(value));*/
      
      let data;
      try {data = /*JSON.parse(*/decode(value)/*)*/}
      catch {
        try {data = JSON.parse(atob(value))}
        catch {data = JSON.parse(JSON.stringify(user))}
      }
      if (data != null && data != "" && typeof data.version != "undefined") {loadData(data)}
    }
  });
}
function confirmResetAll() {
  alertify.confirm("Are you sure you want to reset? You will lose all of your progress", () => {resetAll(true)});
}
function resetAll(notify) {
  loadData(setUser());
  hideId("offlineBox");
  di("loadingScreen").style.opacity = 0;
  setTimeout(() => {hideId("loadingScreen")}, 500);
  if (notify) {alertify.error("Game Reset")}
}

//Update Data
function updateOptions() {
  updateNotation(user.options.notation);
  for (let i=0; i<options.Confirmation.items.length; i++) {
    updateConfirmation(options.Confirmation.items[i]);
  }
  updateLogpb();
  /*updateUIRate();*/
  updateSmartAutoPrestige();
  di("notation"+options.Notation.items[0]).style.borderTopLeftRadius = "10px";
  di("notation"+options.Notation.items[0]).style.borderTopRightRadius = "10px";
  di("notation"+options.Notation.items[options.Notation.items.length-1]).style.borderBottomLeftRadius = "10px";
  di("notation"+options.Notation.items[options.Notation.items.length-1]).style.borderBottomRightRadius = "10px";
  let array = dc("confirmation");
  array[0].style.borderTopLeftRadius = "10px";
  array[0].style.borderTopRightRadius = "10px";
  array[0].style.borderBottomLeftRadius = "0px";
  array[0].style.borderBottomRightRadius = "0px";
  for (let i=array.length-1; i>0; i--) {
    array[i].style.borderTopLeftRadius = "0px";
    array[i].style.borderTopRightRadius = "0px";
    array[i].style.borderBottomLeftRadius = "0px";
    array[i].style.borderBottomRightRadius = "0px";
    if (array[i].style.display != "none") {
      array[i].style.borderBottomLeftRadius = "10px";
      array[i].style.borderBottomRightRadius = "10px";
      break;
    }
  }
}

function updateNotation(note) {
  for (let i=0; i<options.Notation.items.length; i++) {di("notation"+options.Notation.items[i]).style.backgroundColor = "rgb(0, 0, 0)"}
  di("notation"+note).style.backgroundColor = "rgb(25, 85, 25)";
}
function updateConfirmation(con) {
  if (user.options.confirmations.includes(con)) {di("confirmation"+con).style.backgroundColor = "rgb(25, 85, 25)"}
  else {di("confirmation"+con).style.backgroundColor = "rgb(0, 0, 0)"}
}
function updateLogpb() {
  if (user.options.logpb) {di("Logpb").style.backgroundColor = "rgb(25, 85, 25)"}
  else {di("Logpb").style.backgroundColor = "rgb(0, 0, 0)"}
}
/*function updateUIRate() {
  di("UIRatex").textContent = e("d", nd(user.options.uiRate), 2, 0);
}*/
function updateSmartAutoPrestige() {
  if (user.options.smartAutoPrestige) {di("SmartAutoPrestige").style.backgroundColor = "rgb(25, 85, 25)"}
  else {di("SmartAutoPrestige").style.backgroundColor = "rgb(0, 0, 0)"}
}

//Broken Data
di("brokenExport").addEventListener("click", () => {copyToClipboard(encode(brokenUser))});
di("brokenImport").addEventListener("click", () => {importy()});
di("brokenReset").addEventListener("click", () => {resetAll()});
di("brokenDiscord").addEventListener("click", () => {window.open('https://discord.gg/DKMmAap')});
