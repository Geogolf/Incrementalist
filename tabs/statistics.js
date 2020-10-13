//Update Data
function updateStatistics() {
  d("statIPTotal").textContent = e(user.ip.total);
  d("statIPHighest").textContent = e(user.ip.highest);
  d("statIPEquationClicks").textContent = e(user.increment.ip);
  d("statPPTotal").textContent = e(user.pp.total);
  d("statPPCount").textContent = e(nd(user.pp.count));
  d("statSacThisPP").textContent = e(nd(user.sacrifice.ip));
  d("statPPBestTime").textContent = time(nd(user.pp.bestTime));
  
  d("statPPTime").textContent = time(nd(Date.now() - user.pp.timeStart), false, true);
  d("statTimePlayed").textContent = time(nd(Date.now() - user.timeStart), false, true);
}
