function increment(type, num) {
  if (type == 'x') {
    user.ip.x = user.ip.x.plus(getincxx());
    user.ip.pp = user.ip.pp.plus(getincxx());
    user.ip.total = user.ip.total.plus(getincxx());
    updateip();
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
          scale('inc', 'p');
          if (user.automate.scale.inc.p) {autoInterval.scale.inc.p()}
        }, (1000 / getautomationrate()));
      }
    }
  },
  inc: {
    x: () => {
      setTimeout(() => {
        user.ip.x = user.ip.x.plus(getincxx().divide(updaterate));
        user.ip.pp = user.ip.pp.plus(getincxx().divide(updaterate));
        user.ip.total = user.ip.total.plus(getincxx().divide(updaterate));
        updateip();
        unlockip();
        if (user.automate.inc.x) {autoInterval.inc.x()}
      }, (1000 / updaterate));
    },
    p: (num) => {
      setTimeout(() => {
        increment('p', num);
        if (user.automate.inc.p[num]) {autoInterval.inc.p(num)}
      }, (1000 / getautomationrate()));
    },
  }
}
function automate(str, num) {
  if (str == 'scaleincp') {
    user.automate.scale.inc.p = !user.automate.scale.inc.p;
    autoInterval.scale.inc.p();
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
  }
}
