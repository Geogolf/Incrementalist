//Notations
function setNotation(note) {
  user.notation = note;
  d("notation").textContent = user.notation;
  updateAchievement();
  /*updateNotation();*/
}
function e(obj, exp, dec) {
  if (typeof obj == "string") {return obj}
  if (typeof exp == "undefined") {exp = 2}
  if (typeof dec == "undefined") {dec = 0}
  if (user.notation == "Blind" || user.notation == "True blind") {return " "}
  else {return formatValue(user.notation, obj, exp, dec)}
}

//Confirmations
function toggleConfirmation(str) {
  user.confirmation[str] = !user.confirmation[str];
  updateConfirmation(str);
}

function confirmReset() {
  user.confirmation.reset = !user.confirmation.reset;
  updateConfirmation("reset");
}
function confirmSacrifice() {
  user.confirmation.sacrifice = !user.confirmation.sacrifice;
  updateCOnfirmation("sacrifice");
}

//Update Data
/*var specialNotations = ["Blind", "True blind"];
function updateNotation() {
  for (let i = 0; i < specialNotations.length; i++) {
    if (user.notation == specialNotations[i]) {hc("notation" + specialNotations[i])}
    else {sc("notation" + specialNotations[i])}
  }
}*/
var confirmationStrings = dc("confirmations");
function updateConfirmation(str) {
  if (user.confirmation[str]) {d("confirmation-" + str).style.backgroundColor = "rgb(25, 85, 25)"}
  else {d("confirmation-" + str).style.backgroundColor = "rgb(0, 0, 0)"}
}
function updateConfirmations() {for (let i = 0; i < confirmationStrings.length; i++) {updateConfirmation(confirmationStrings[i].textContent.toLowerCase())}}
