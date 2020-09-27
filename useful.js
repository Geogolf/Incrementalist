function d(x) {return document.getElementById(x)}
function dc(x) {return document.getElementsByClassName(x)}
function h(x) {document.getElementById(x).style.display = "none"}
function hc(x) {x = document.getElementsByClassName(x); for (let i = 0; i < x.length; i++) {x[i].style.display = "none"}}
function s(x) {document.getElementById(x).style.display = ""}
function sc(x) {x = document.getElementsByClassName(x); for (let i = 0; i < x.length; i++) {x[i].style.display = ""}}
function st(x) {document.getElementById(x).style.display = "table-cell"}
function ac(cl, id) {document.getElementById(id).classList.add(cl)}
function rc(cl, id) {document.getElementById(id).classList.remove(cl)}
function rpc(cl1, cl2, id) {id = document.getElementById(id); id.classList.remove(cl1); id.classList.add(cl2)}
function comma(x) {return Number(x).toLocaleString()}

function nd(x) {return new Decimal(x)}
function ndn(m, e) {return new Decimal(m).times(nd(10).pow(e))}
function del(a, b) {document.addEventListener(a, b)}/**/
function wel(a, b) {window.addEventListener(a, b)}/**/
function cb(str) {var el = document.createElement("textarea"); el.value = str; el.setAttribute("readonly", ""); el.style = {position: "absolute", left: "-9999px"}; document.body.appendChild(el); cb2(el); document.body.removeChild(el); alert("Copied to clipboard")}/**/
function cb2(el) {el = (typeof el === "string") ? document.querySelector(el) : el; if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {var editable = el.contentEditable; var readOnly = el.readOnly; el.contentEditable = true; el.readOnly = true; var range = document.createRange(); range.selectNodeContents(el); var selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); el.setSelectionRange(0, 999999); el.contentEditable = editable; el.readOnly = readOnly} else {el.select()} document.execCommand("copy")}/**/
function as(arr, index, del, value) {if (typeof value == "undefined") {value = "Nothing"} let remove = 0; if (del) {remove = 1} else {remove = 0} arr.splice(index, remove, value)} /**/
function of(element) {return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth}/*?*/

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

function reveal() {
  d("gameScreen").style.opacity = 1;
  d("loadingScreen").style.opacity = 0;
  setTimeout(() => {h("loadingScreen")}, 750);
}

var tabs = ["Options", "Achievements", "Statistics", "Automation", "Sacrifice", "Scaling", "Increment", "Prestige", "Ascension"];
function tab(t) {
  for (let i = 0; i < tabs.length; i++) {h("tab" + tabs[i])}
  s("tab" + t);
  user.tab = t;
  updateTab(t);
}
