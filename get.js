function getautomationincxrate() {return nd(1)}
function getautomationrate() {return nd(100)}
function getautomationincp(num, type) {if (type == "rate") {return nd(1)}}
function getincxx() {
  let x = nd();
  for (let i = 1; i <= 5; i++) {x = x.plus(getincp(i, "x"))}
  for (let i = 1; i <= 5; i++) {x = x.times(getincm(i, "x"))}
  return x;
}
function getincp(num, type) {
  if (type == "x") {return nd(num).pow(num - 1).times(user.inc.p[num])}
  if (type == "cost") {return nd(10).times(nd(2).pow((nd(user.inc.p[num]).times(nd(user.inc.p[num]).plus(1).log10()).times(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(user.scale.inc.p)).divide(6 - num)))).floor()}
}
function getincm(num, type) {
  if (type == "x") {return nd(2).pow(num - 1).times(user.inc.m[num]).plus(1)}
  if (type == "cost") {return nd(1e6).times(nd(3).pow((nd(user.inc.m[num]).times(nd(user.inc.m[num]).plus(1).log10()).divide(6 - num)))).floor()}
}
function getince(num, type) {
  if (type == "x") {return nd(num).times(user.inc.e[num]).plus(1)}
  if (type == "cost") {return nd(1e12)}
}
function getscaleincp(num) {return nd(1).plus(nd(0.5).pow(num - 1)).pow(nd(user.scale.inc.p).sqrt())}
function getscaleincpcost() {return nd(1.5).pow(user.scale.inc.p)}
function getscaleincmcost() {return nd(2).pow(user.scale.inc.m)}
function getscaleincecost() {return nd(2).pow(user.scale.inc.e)}
