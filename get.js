function getautomateincxrate() {return nd(1)}
function getautomaterate(type) {
  if (typeof type == "undefined") {type = "rate"}
  let rate = nd(100);
  if (type == "rate") {
    if (rate.gt(100)) {return nd(100)}
    else {return rate}
  }
  if (type == "bulk") {
    if (rate.gt(100)) {return nd(rate).divide(100).floor()}
    else {return nd(1)}
  }
}
function getautomationincp(num, type) {if (type == "rate") {return nd(1)}}
function getscaleincp(num) {
  let x = nd(1).divide(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(user.scale.inc.p));
  let y = nd(x.log10()).divide(3).floor();
  for (let i = 1; i <= y; i++) {if (x.gte(nd(1000).pow(i))) {x = nd(1000).pow(i).divide(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.p).divide(nd(12.5).pow(i))))} else {return x}}
  return x;
}
function getscaleincm(num) {
  let x = nd(1).divide(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.m).divide(2)));
  let y = nd(x.log10()).divide(2).floor();
  for (let i = 1; i <= y; i++) {if (x.gte(nd(100).pow(i))) {x = nd(100).pow(i).divide(nd(1).minus(nd(0.1).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.m).divide(nd(25).pow(i))))} else {return x}}
  return x;
}
function getscaleince(num) {
  let x = nd(1).divide(nd(1).minus(nd(0.0141).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.e).divide(4)));
  let y = nd(x.log10()).floor();
  for (let i = 1; i <= y; i++) {if (x.gte(nd(10).pow(i))) {x = nd(10).pow(i).divide(nd(1).minus(nd(0.0141).times(nd(0.5).pow(num - 1))).pow(nd(user.scale.inc.e).divide(nd(50).pow(i))))} else {return x}}
  return x;
}
function getscaleincpcost(count) {
  if (typeof count == "undefined") {count = 0}
  let cost = nd(1.6).pow(nd(user.scale.inc.p).plus(count)).floor();
  return cost;
  if (cost.gte(infinity)) {return "Infinity"; nd(1.6).pow(nd(user.scale.inc.p).times(nd(user.scale.inc.p).log10())).floor()}
  else {return cost}
}
function getscaleincmcost(count) {
  if (typeof count == "undefined") {count = 0}
  let cost = nd(2.1).pow(nd(user.scale.inc.m).plus(count)).floor();
  return cost;
  if (cost.gte(infinity)) {return "Infinity"; nd(2.1).pow(nd(user.scale.inc.m).times(nd(user.scale.inc.m).log10())).floor()}
  else {return cost}
}
function getscaleincecost(count) {
  if (typeof count == "undefined") {count = 0}
  let cost = nd(2).pow(nd(user.scale.inc.e).plus(count).plus(25).divide(50).floor().plus(2)).divide(10).plus(1).pow(user.scale.inc.e).floor();
  return cost;
  if (cost.gte(infinity)) {return "Infinity"; nd(2).pow(nd(user.scale.inc.e).minus(25).divide(50).floor().plus(3)).divide(10).plus(1).pow(nd(user.scale.inc.e).times(nd(user.scale.inc.e).log10())).floor()}
  else {return cost}
}
function getsacipxnext() {
  if (user.sacrifice.ip.gte(2.5e6)) {return user.sacrifice.ip.plus(nd(nd(user.ip.sac.log10()).log10()).plus(1).pow(nd(user.ip.sac.log10()).divide(1.5).sqrt()).times(user.sacrifice.ip.sqrt()))}
  else {return user.sacrifice.ip.plus(nd(nd(user.ip.sac.log10()).plus(10).log10()).pow(nd(user.ip.sac.log10()).divide(1.5).sqrt()).times(user.sacrifice.ip.sqrt()))}
}
function getsacipcost() {
  let cost = nd(1e23).times(user.sacrifice.ip.pow(1.5));
  if (cost.gte(infinity)) {return "Infinity"}
  else {return cost}
}
function getincxx() {
  let x = nd();
  for (let i = 1; i <= 5; i++) {x = x.plus(getincp(i, "x"))}
  for (let i = 1; i <= 5; i++) {x = x.times(getincm(i, "x"))}
  for (let i = 1; i <= 5; i++) {x = x.pow(getince(i, "x"))}
  x = x.times(user.sacrifice.ip);
  return x;
}
function getincp(num, type, count, fixed) {
  if (type == "x") {return nd(num).pow(num - 1).times(user.inc.p[num])}
  if (type == "cost") {
    let n = 0;
    if (typeof count == "undefined") {count = 0}
    if (typeof fixed == "undefined") {n = user.inc.p[num]} else {n = 0}
    let cost = nd(10).times(nd(2).pow((nd(n).plus(count).times(nd(n).plus(count).plus(1).log10()).times(nd(1).divide(getscaleincp(num))).divide(6 - num)))).floor();
    return cost;
  }
}
function getincm(num, type, count, fixed) {
  if (type == "x") {return nd(3).pow(num - 1).times(user.inc.m[num]).plus(1)}
  if (type == "cost") {
    let n = 0;
    if (typeof count == "undefined") {count = 0}
    if (typeof fixed == "undefined") {n = user.inc.m[num]} else {n = 0}
    let cost = nd(1e6).times(nd(3).pow((nd(n).plus(count).times(nd(n).plus(count).plus(1).log10()).times(nd(1).divide(getscaleincm(num))).divide(6 - num)))).floor();
    return cost;
  }
}
function getince(num, type, count, fixed) {
  if (type == "x") {return nd(nd(user.inc.e[num]).times(nd(num + 9).log10()).divide(nd(2).sqrt()).plus(1).log10()).plus(1)}
  if (type == "cost") {
    let n = 0;
    if (typeof count == "undefined") {count = 0}
    if (typeof fixed == "undefined") {n = user.inc.e[num]} else {n = 0}
    let cost = nd(1e29).pow(nd(num + 1).pow(nd(n).plus(count).times(nd(1).divide(getscaleince(num)))));
    return cost;
  }
}
function getppnext() {
  let next = ppreq.times(nd(10).pow(user.pp.extra));
  if (user.ip.pp.gte(next)) {user.pp.extra++; next = ppreq.times(nd(10).pow(user.pp.extra))}
  return next;
}
function getppgain() {return nd(user.pp.extra)}
