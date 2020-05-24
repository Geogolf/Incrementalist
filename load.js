function updates() {
  for (let i = 0; i < settingids.length; i++) {updatesetting(settingids[i])}
  updateip();
  updateautomation();
  updateautomationrate();
  updateincx()
  updateinc();
  updatescale();
  updateversion();
}
function hide() {
  for (let i = 0; i < unlocks.ip.length; i++) {h(unlocks.ip[i])};
  for (let i = 0; i < unlocks.pp.length; i++) {h(unlocks.pp[i])};
  for (let i = 0; i < unlocks.ap.length; i++) {h(unlocks.ap[i])};
  for (let i = 0; i < unlocks.tp.length; i++) {h(unlocks.tp[i])};
  for (let i = 0; i < unlocks.dp.length; i++) {h(unlocks.dp[i])};
  for (let i = 0; i < unlocks.gp.length; i++) {h(unlocks.gp[i])};
}
const tempHide = ["pp", "space1", "ap", "space2", "tp", "space3", "dp", "space4", "gp", "incm4", "incm5", "ince1", "ince2", "ince3", "ince4", "ince5", "btabsac", "btabpp", "btabap", "btabtp", "btabdp", "btabgp", "automationincm", "automationince", "scaleincm", "scaleince"];
for (let i = 0; i < tempHide.length; i++) {h(tempHide[i])}
