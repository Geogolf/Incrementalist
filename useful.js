//main
function e(obj, exp, dec) {
  return ee(obj, exp, dec);
  if (typeof obj == "undefined") {return "Error=e1"}
  if (typeof obj == "number") {return "Error=e2"}
  if (typeof obj == "string") {return obj}
  if (typeof exp == "undefined") {exp = 2}
  if (typeof dec == "undefined") {dec = 0}
  if (dec > 10) {dec = 10}
  /*if (obj.e >= 1e6) {
    return obj.m.toFixed(exp) + "e" + obj.e.toExponential(exp).replace("e+", "e");
  }*/
  if (obj.e >= 6) {
    if (obj.m.toFixed(exp) >= 10) {obj.m /= 10; obj.e++}
    return obj.m.toFixed(exp) + "e" + obj.e.toLocaleString();
  }
  else {
    let x = obj.m * (10 ** obj.e);
    x = Number(x.toFixed(dec)).toLocaleString();
    if (x.indexOf(".") < 0 && dec > 0) {x += "."}
    for (let i = 1; i <= dec; i++) {
      if (x.toString().charAt(x.toString().length - dec - 1) != ".") {
        x = x.toString() + "0";
      }
    }
    return x;
  }
}
function ee(obj, exp, dec) {
  if (typeof obj == "undefined") {return "Error=ee1"}
  if (typeof obj == "num") {return "Error=ee2"}
  if (typeof obj == "string") {return obj}
  if (typeof exp == "undefined") {exp = 2}
  if (typeof dec == "undefined") {dec = 0}
  if (dec > 10) {dec = 10}
  if (obj.e >= 1e11) {
    let newObj = nd(obj.e);
    /*return obj.m.toFixed() + "e" + newObj.m.toFixed(dec) + "e" + newObj.e;*/
    return newObj.m.toFixed(exp) + "ee" + newObj.e;
  }
  else if (obj.e >= 6) {
    if (obj.m.toFixed(exp) >= 10) {obj.m /= 10; obj.m -= 0.01; obj.e++};
    return obj.m.toFixed(exp) + "e" + comma(obj.e);
  }
  else {return comma((obj.m * (10 ** obj.e)).toFixed(dec))}
}
function nd(value) {return new Decimal(value)}
function d(x) {return document.getElementById(x)}
function h(x) {document.getElementById(x).style.display = "none"}
function s(x) {document.getElementById(x).style.display = "inline"}
function sb(x) {document.getElementById(x).style.display = ""}
function sf(x) {document.getElementById(x).style.display = "flex"}
function del(a, b) {document.addEventListener(a, b)}
function wel(a, b) {window.addEventListener(a, b)}
function time(obj, full, noDecimals) {
  let x = obj.divide(1000);
  if (x == "Infinity" || typeof x == "null" || typeof obj == "undefined") {return "Infinite Time"}
  let y = e(x.divide(31536000).floor());
  let yy = (y == 1) ? " Year " : " Years ";
  let d = x.divide(31536000).minus(x.divide(31536000).floor()).times(31536000).floor().divide(86400).floor();
  let dd = (d == 1) ? " Day " : " Days ";
  let h = x.divide(86400).minus(x.divide(86400).floor()).times(86400).floor().divide(3600).floor();
  let hh = (h == 1) ? " Hour " : " Hours ";
  let m = x.divide(3600).minus(x.divide(3600).floor()).times(3600).floor().divide(60).floor();
  let mm = (m == 1) ? " Minute " : " Minutes ";
  let s = nd(0);
  if (!noDecimals) {s = x.divide(60).minus(x.divide(60).floor()).times(60).toFixed(3)}
  else {s = x.divide(60).minus(x.divide(60).floor()).times(60).floor()}
  let ss = (s == 1) ? " Second " : " Seconds ";
  /*let ms = x.minus(x.floor()).times(1000).floor();
  let msms = (ms == 1) ? " Millisecond" : " Milliseconds";*/
  if (!full) {
    if (y == 0) {y = ""; yy = ""}
    if (d == 0 || Number(y) > 1000) {d = ""; dd = ""}
    if (h == 0 || Number(y.replace(",", "")) > 0) {h = ""; hh = ""}
    if (m == 0 || d > 0 || Number(y.replace(",", "") > 0)) {m = ""; mm = ""}
    if (h > 0 || d > 0 || Number(y.replace(",", "") > 0)) {s = ""; ss = ""}
    /*if (m > 0 || h > 0 || d > 0 || y > 0) {ms = ""; msms = ""}*/
  }
  else {
    if (y == 0) {y = ""; yy = ""}
    if (d == 0) {d = ""; dd = ""}
    if (h == 0) {h = ""; hh = ""}
    if (m == 0) {m = ""; mm = ""}
  }
  return y + yy + d + dd + h + hh + m + mm + s + ss/* + ms + msms*/;
}
function cb(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  };
  document.body.appendChild(el);
  cb2(el);
  document.body.removeChild(el);
  alert("Copied to clipboard");
}
function cb2(el) {
  el = (typeof el === "string") ? document.querySelector(el) : el;
  if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
    var editable = el.contentEditable;
    var readOnly = el.readOnly;
    el.contentEditable = true;
    el.readOnly = true;
    var range = document.createRange();
    range.selectNodeContents(el);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    el.setSelectionRange(0, 999999);
    el.contentEditable = editable;
    el.readOnly = readOnly;
  }
  else {el.select()}
  document.execCommand("copy");
}
function ndn(m, e) {return nd(m).times(nd(10).pow(e))}
function gainip(ms) {
  if (typeof ms == "undefined") {ms = 0}
  user.ip.x = user.ip.x.plus(getincxx().times(nd(ms).divide(1000)));
  user.ip.sac = user.ip.sac.plus(getincxx().times(nd(ms).divide(1000)));
  user.ip.pp = user.ip.pp.plus(getincxx().times(nd(ms).divide(1000)));
  user.ip.total = user.ip.total.plus(getincxx().times(nd(ms).divide(1000)));
}
function comma(x) {return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}

//other
function reveal() {
  d("loading").style.opacity = 0;
  d("game").style.opacity = 1;
  setTimeout(() => {h("loading")}, 750);
  revealed = true;
}
function unreveal() {
  d("loading").style.opacity = 1;
  d("game").style.opacity = 0;
  s("loading");
  revealed = false;
}
function tab(t) {
  for (let i = 0; i < tabs.length; i++) {h("tab" + tabs[i])}
  s("tab" + t);
  user.tab = t;
  updatetab(t);
}
