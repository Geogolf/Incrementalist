//Update Data
function updateStatistics() {
  di("statIPTotal").textContent = e("d", user.ip.total, 2, 0);
  di("statIPHighest").textContent = e("d", user.ip.highest, 2, 0);
  di("statIPInfinite").textContent = e("d", user.ip.infinite, 2, 0);
  di("statEquationClicks").textContent = e("d", user.ip.equationClicks, 2, 0);
  di("statIPSacrifices").textContent = e("d", nd(user.sacrifice.IP.count), 2, 0);
  di("statPPTotal").textContent = e("d", user.pp.total, 2, 0);
  di("statPPInfinite").textContent = e("d", user.pp.infinite, 2, 0);
  di("statPPCount").textContent = e("d", nd(user.pp.count), 2, 0);
  di("statPPTime").textContent = showTime(user.time.bestPrestige);
  di("statPPLast").textContent = showTime(user.time.thisPrestige);
  di("statTimePlayed").textContent = showTime(user.time.played);
}
