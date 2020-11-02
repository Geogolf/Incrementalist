//Data
const options = {
  /*UIRate: {type: "Input", onclick: () => {setUIRate()}},*/
  Notation: {type: "Dropdown", onclick: (note) => {setNotation(note)}, items: ["Scientific"/*, "Engineering"*/, "Logarithm"/*, "Letters"*//*, "Infinity"*/, "Blind"]},
  Confirmation: {type: "Dropdown", onclick: (con) => {toggleConfirmation(con)}, items: ["Reset", "Sacrifice", "Prestige", "Challenge"]},
  Logpb: {type: "None", onclick: () => {toggleLogpb()}},
  Save: {type: "None", onclick: () => {save(true)}},
  Export: {type: "None", onclick: () => {exporty()}},
  Import: {type: "None", onclick: () => {importy()}},
  Reset: {type: "None", onclick: () => {confirmResetAll()}}
}
for (let name in options) {
  let data = options[name];
  /*if (data.type == "Input") {
    di(name+"Input").addEventListener("input", () => {setUIRate()});
  }
  else */if (data.type == "Dropdown") {
    for (k=0; k<data.items.length; k++) {
      let item = data.items[k];
      di(name.toLowerCase()+item).addEventListener("click", () => {data.onclick(item)});
    }
    di(name.toLowerCase()+data.items[0]).style.borderTopLeftRadius = "10px";
    di(name.toLowerCase()+data.items[0]).style.borderTopRightRadius = "10px";
    di(name.toLowerCase()+data.items[data.items.length-1]).style.borderBottomLeftRadius = "10px";
    di(name.toLowerCase()+data.items[data.items.length-1]).style.borderBottomRightRadius = "10px";
  }
  else {di(name).addEventListener("click", () => {data.onclick()})}
}

//Functions
/*function setUIRate(rate) {
  rate = rate || di("UIRateInput").value;
  user.options.uiRate = rate;
}*/
function setNotation(note) {
  user.options.notation = note;
  updateNotation(note);
}
function toggleConfirmation(con) {
  if (user.options.confirmations.includes(con)) {user.options.confirmations.splice(user.options.confirmations.indexOf(con), 1)}
  else {user.options.confirmations.push(con)}
  updateConfirmation(con);
}
function toggleLogpb() {user.options.logpb = !user.options.logpb}
function save(notify) {
  localStorage.setItem("user", JSON.stringify(user));
  if (notify) {alertify.success("Game Saved")}
}
function exporty() {copyToClipboard(btoa(JSON.stringify(user)))}
function importy() {
  alertify.prompt("Paste your save code here", "", (event, value) => {
    let data = JSON.parse(atob(value));
    if (data != null && data != "") {loadData(data)}
  });
}
function confirmResetAll() {
  if (user.options.confirmations.includes("Reset")) {
    alertify.confirm("Are you sure you want to reset? You will lose all of your progress", () => {resetAll(true)});
  }
  else {resetALl(true)}
}
function resetAll(notify) {
  user = setUser();
  save(false);
  if (notify) {alertify.error("Game Reset")}
}

//Update Data
function updateOptions() {
  /*updateUIRate();*/
  updateNotation(user.options.notation);
  for (let i=0; i<options.Confirmation.items.length; i++) {
    updateConfirmation(options.Confirmation.items[i]);
  }
  updateLogpb();
}
/*function updateUIRate() {
  di("UIRatex").textContent = e("d", nd(user.options.uiRate), 2, 0);
}*/
function updateNotation(note) {
  for (let i=0; i<options.Notation.items.length; i++) {di("notation"+options.Notation.items[i]).style.backgroundColor = "rgb(0, 0, 0)"}
  di("notation"+note).style.backgroundColor = "rgb(25, 85, 25)";
}
function updateConfirmation(con) {
  if (user.options.confirmations.includes(con)) {di("confirmation"+con).style.backgroundColor = "rgb(25, 85, 25)"}
  else {di("confirmation"+con).style.backgroundColor = "rgb(0, 0, 0)"}
}
function updateLogpb() {
  if (user.options.logpb) {di("logpb").style.backgroundColor = "rgb(25, 85, 25)"}
  else {di("logpb").style.backgroundColor = "rgb(0, 0, 0)"}
}
