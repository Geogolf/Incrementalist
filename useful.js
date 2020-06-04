//main
/*function e(num, exp, dec) {
  let x = "";
  if (typeof num == "undefined") {x = "Error 1"}
  else if (typeof num == "string") {x = num}
  else if (num >= 1e6) {x = num.toExponential(exp)}
  else {
    let a = Math.floor(num / 1000);
    let b = (num % 1000).toFixed(dec);
    if (b == 1000) {a++; b = 0}
    if (a == 0) {x = b}
    else if (b < 10) {x = a + ",00" + b}
    else if (b < 100) {x = a + ",0" + b}
    else {x = a + "," + b}
  }
  return x.replace("+", "");
}*/
function e(obj, exp, dec) {
  if (typeof obj == "undefined") {return "Error=e1"}
  if (typeof obj == "number") {return "Error=e2"}
  /*if (typeof obj == "string") {return obj}*/
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
function nd(value) {return new Decimal(value)}
function d(x) {return document.getElementById(x)}
function h(x) {document.getElementById(x).style.display = "none"}
function s(x) {document.getElementById(x).style.display = "inline"}
function sb(x) {document.getElementById(x).style.display = ""}
function sf(x) {document.getElementById(x).style.display = "flex"}
/*function show(id) {
  if (user.show.ip <= unlocks.ip.indexOf(id)) {user.show.ip++}
  s(id);
}*/
function del(a, b) {document.addEventListener(a, b)}
function wel(a, b) {window.addEventListener(a, b)}
/*function time(time) {
  let x = time / 1000;
  if (x == Infinity || time == null) {return "Infinite Time"}
  let y = e(Math.floor(x / 31536000), 2);
  let yy = (y == 1) ? " Year " : " Years ";
  let d = Math.floor((x % 31536000) / 86400);
  let dd = (d == 1) ? " Day " : " Days ";
  let h = Math.floor((x % 86400) / 3600);
  let hh = (h == 1) ? " Hour " : " Hours ";
  let m = Math.floor((x % 3600) / 60);
  let mm = (m == 1) ? " Minute " : " Minutes ";
  let s = Math.floor(x % 60);
  let ss = (s == 1) ? " Second" : " Seconds";
  if (y == 0) {y = ""; yy = ""}
  if (d == 0) {d = ""; dd = ""}
  if (h == 0 || y > 0) {h = ""; hh = ""}
  if (m == 0 || d > 0 || y > 0) {m = ""; mm = ""}
  if (s == 0 || h > 0 || d > 0 || y > 0) {s = ""; ss = ""}
  return y + yy + d + dd + h + hh + m + mm + s + ss;
}*/
function time(obj) {
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
  let s = x.divide(60).minus(x.divide(60).floor()).times(60).toFixed(3)/*.floor()*/;
  let ss = (s == 1) ? " Second " : " Seconds ";
  /*let ms = x.minus(x.floor()).times(1000).floor();
  let msms = (ms == 1) ? " Millisecond" : " Milliseconds";*/
  if (y == 0) {y = ""; yy = ""}
  if (d == 0 || Number(y) > 1e6) {d = ""; dd = ""}
  if (h == 0 || Number(y.replace(",", "")) > 0) {h = ""; hh = ""}
  if (m == 0 || d > 0 || Number(y.replace(",", "")) > 0) {m = ""; mm = ""}
  if (h > 0 || d > 0 || Number(y.replace(",", "")) > 0) {s = ""; ss = ""}
  /*if (m > 0 || h > 0 || d > 0 || y > 0) {ms = ""; msms = ""}*/
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

//other
function tab(t) {
  for (let i = 0; i < tabs.length; i++) {h("tab" + tabs[i])}
  s("tab" + t);
  user.tab = t;
}
