//Update Data
function updateStatistics() {
  d("statIPTotal").textContent = e(user.ip.total);
  d("statIPHighest").textContent = e(user.ip.highest);
  d("statTimePlayed").textContent = time(nd(Date.now() - user.timeStart), false, true);
  d("statIPEquationClicks").textContent = e(user.increment.ip);
}
