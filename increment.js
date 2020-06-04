function increment(type, num) {
  if (type == 'x' && clickrate < 15) {
    clickrate++;
    user.ip.x = user.ip.x.plus(getincxx());
    user.ip.sac = user.ip.sac.plus(getincxx());
    user.ip.pp = user.ip.pp.plus(getincxx());
    user.ip.total = user.ip.total.plus(getincxx());
    updateip();
    updatescaleinc();
    updatesacip();
    unlockip();
    return;
  }
  if (type == 'p' && user.ip.x.gte(getincp(num, "cost"))) {
    user.ip.x = user.ip.x.minus(getincp(num, "cost"));
    user.inc.p[num]++;
    updateip();
    updateincx();
    updateincp();
    return;
  }
  if (type == 'm' && user.ip.x.gte(getincm(num, "cost"))) {
    user.ip.x = user.ip.x.minus(getincm(num, "cost"));
    user.inc.m[num]++;
    updateip();
    updateincx();
    updateincm();
    return;
  }
  if (type == 'e' && user.ip.x.gte(getince(num, "cost"))) {
    user.ip.x = user.ip.x.minus(getince(num, "cost"));
    user.inc.e[num]++;
    updateip();
    updateincx();
    updateince();
    return;
  }
}
const autoInterval = {
  scale: {
    inc: {
      p: () => {
        setTimeout(() => {
          for (let i = 0; i < gamespeed; i++) {
            if (user.automate.scale.inc.p && focused && user.ip.x.gte(getscaleincpcost())) {
              user.ip.x = user.ip.x.minus(getscaleincpcost());
              user.scale.inc.p++;
            }
          }
          if (user.automate.scale.inc.p) {autoInterval.scale.inc.p()}
        }, (1000 / getautomaterate()));
      },
      m: () => {
        setTimeout(() => {
          for (let i = 0; i < gamespeed; i++) {
            if (user.automate.scale.inc.m && focused && user.ip.x.gte(getscaleincmcost())) {
              user.ip.x = user.ip.x.minus(getscaleincmcost());
              user.scale.inc.m++;
            }
          }
          if (user.automate.scale.inc.m) {autoInterval.scale.inc.m()}
        }, (1000 / getautomaterate()));
      },
      e: () => {
        setTimeout(() => {
          for (let i = 0; i < gamespeed; i++) {
            if (user.automate.scale.inc.e && focused && user.ip.x.gte(getscaleincecost())) {
              user.ip.x = user.ip.x.minus(getscaleincecost());
              user.scale.inc.e++;
            }
          }
          if (user.automate.scale.inc.e) {autoInterval.scale.inc.e()}
        }, (1000 / getautomaterate()));
      }
    }
  },
  inc: {
    x: () => {
      setTimeout(() => {
        if (user.automate.inc.x && focused) {
          user.ip.x = user.ip.x.plus(getincxx().times(getautomateincxrate()).divide(tickrate));
          user.ip.sac = user.ip.sac.plus(getincxx().times(getautomateincxrate()).divide(tickrate));
          user.ip.pp = user.ip.pp.plus(getincxx().times(getautomateincxrate()).divide(tickrate));
          user.ip.total = user.ip.total.plus(getincxx().times(getautomateincxrate()).divide(tickrate));
        }
        if (user.automate.inc.x) {autoInterval.inc.x()}
      }, (1000 / tickrate));
    },
    p: (num) => {
      setTimeout(() => {
        for (let i = 0; i < getautomaterate("bulk"); i++) {
          if (user.automate.inc.p[num] && focused && user.ip.x.gte(getincp(num, "cost"))) {
            user.ip.x = user.ip.x.minus(getincp(num, "cost"));
            user.inc.p[num]++;
          }
        }
        if (user.automate.inc.p[num]) {autoInterval.inc.p(num)}
      }, (1000 / getautomaterate()));
    },
    m: (num) => {
      setTimeout(() => {
        for (let i = 0; i < getautomaterate("bulk"); i++) {
          if (user.automate.inc.m[num] && focused && user.ip.x.gte(getincm(num, "cost"))) {
            user.ip.x = user.ip.x.minus(getincm(num, "cost"));
            user.inc.m[num]++;
          }
        }
        if (user.automate.inc.m[num]) {autoInterval.inc.m(num)}
      }, (1000 / getautomaterate()));
    },
    e: (num) => {
      setTimeout(() => {
        for (let i = 0; i < getautomaterate("bulk"); i++) {
          if (user.automate.inc.e[num] && focused && user.ip.x.gte(getince(num, "cost"))) {
            user.ip.x = user.ip.x.minus(getince(num, "cost"));
            user.inc.e[num]++;
          }
        }
        if (user.automate.inc.e[num]) {autoInterval.inc.e(num)}
      }, (1000 / getautomaterate()));
    }
  }
}
function automate(str, num) {
  if (str == 'scaleincp') {
    user.automate.scale.inc.p = !user.automate.scale.inc.p;
    autoInterval.scale.inc.p();
    updateautomate();
    return;
  }
  if (str == 'scaleincm') {
    user.automate.scale.inc.m = !user.automate.scale.inc.m;
    autoInterval.scale.inc.m();
    updateautomate();
    return;
  }
  if (str == 'scaleince') {
    user.automate.scale.inc.e = !user.automate.scale.inc.e;
    autoInterval.scale.inc.e();
    updateautomate();
    return;
  }
  if (str == 'incx') {
    user.automate.inc.x = !user.automate.inc.x;
    autoInterval.inc.x();
    updateip();
    updateautomate();
    return;
  }
  if (str == 'incp') {
    user.automate.inc.p[num] = !user.automate.inc.p[num];
    autoInterval.inc.p(num);
    updateautomate();
    return;
  }
  if (str == 'incm') {
    user.automate.inc.m[num] = !user.automate.inc.m[num];
    autoInterval.inc.m(num);
    updateautomate();
    return;
  }
  if (str == 'ince') {
    user.automate.inc.e[num] = !user.automate.inc.e[num];
    autoInterval.inc.e(num);
    updateautomate();
    return;
  }
}
function scale(layer, type) {
  if (layer == 'inc') {
    if (type == 'p' && user.ip.x.gte(getscaleincpcost())) {
      user.ip.x = user.ip.x.minus(getscaleincpcost());
      user.scale.inc.p++;
      updateip();
      updateincp();
      updatescaleinc();
      return;
    }
    if (type == 'm' && user.ip.x.gte(getscaleincmcost())) {
      user.ip.x = user.ip.x.minus(getscaleincmcost());
      user.scale.inc.m++;
      updateip();
      updateincm();
      updatescaleinc();
      return;
    }
    if (type == 'e' && user.ip.x.gte(getscaleincecost())) {
      user.ip.x = user.ip.x.minus(getscaleincecost());
      user.scale.inc.e++;
      updateip();
      updateince();
      updatescaleinc();
      return;
    }
  }
}
function confirmSacrifice(layer) {
  if (user.confirm.csacrifice) {
    let confirmed = confirm("Are you sure you want to sacrifice? You will lose all of your IP");
    if (confirmed) {sacrifice(layer)}
  }
  else {sacrifice(layer)}
}
function sacrifice(layer) {
  if (layer == 'ip' && user.ip.sac.gte(getsacipcost())) {
    freeze = true;
    user.automation.inc = {x: false, p: false, m: false, e: false}
    user.automate.scale.inc = {p: false, m: false, e: false}
    user.automate.inc = {p: ["null", false, false, false, false, false], m: ["null", false, false, false, false, false], e: ["null", false, false, false, false, false]}
    user.inc = {x: 0, p: ["null", 0, 0, 0, 0, 0], m: ["null", 0, 0, 0, 0, 0], e: ["null", 0, 0, 0, 0, 0]}
    updateinc();
    user.scale.inc = {p: 0, m: 0, e: 0}
    user.sacrifice.ip.count++;
    user.sacrifice.ip.x = getsacipxnext();
    updatescaleinc();
    updatesacip();
    user.ip.x = getincp(1, "cost");
    user.ip.sac = getincp(1, "cost");
    updates();
    unlockip();
  }
}
