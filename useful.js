//Faster Writing
function di(x) {return document.getElementById(x)}
function dc(x) {return document.getElementsByClassName(x)}
function nd(x) {return new Decimal(x)}
function del(event, func) {document.addEventListener(event, func)}
function wel(event, func) {window.addEventListener(event, func)}

//Manipulate HTML/CSS
function showId(x) {document.getElementById(x).style.display = ""}
function showIdTab(x) {document.getElementById(x).style.display = "table-cell"}
function showClass(x) {let y = document.getElementsByClassName(x); for (i=0; i<y.length; i++) {y[i].style.display = ""}}
function hideId(x) {document.getElementById(x).style.display = "none"}
function hideClass(x) {let y = document.getElementsByClassName(x); for (i=0; i<y.length; i++) {y[i].style.display = "none"}}
function addClass(cl, id) {document.getElementById(id).classList.add(cl)}
function removeClass(cl, id) {document.getElementById(id).classList.remove(cl)}
function replaceClass(cl1, cl2, id) {document.getElementById(id).classList.remove(cl1); document.getElementById(id).classList.add(cl2)}

//Very Useful
function e(note, obj, exp, dec, noCommas) {
  if (typeof obj == "undefined") {return "Error"}
  if (note == "d") {note = user.options.notation}
  if (typeof exp == "undefined" || exp == "d") {exp = user.options.decimals}
  if (typeof dec == "undefined" || dec == "d") {dec = 0}
  
  if (note == "Blind") {
    return " ";
  }
  if (typeof obj == "string") {return obj}
  if (note == "Scientific" || note == "Logarithm") {
    let m = Math.pow(10, obj.mag-Math.floor(obj.mag));
    let e = obj.mag;
    if (note == "Scientific") {e = Math.floor(e)}
    if (m.toFixed(exp) >= 10) {m /= 10; e++}
    let upperMag = m.toFixed(exp)+"e";
    if (!noCommas) {upperMag += e.toLocaleString()}
    else {upperMag += e}
    if (note == "Logarithm") {
      if (!noCommas) {upperMag = "e"+Number(e.toFixed(exp)).toLocaleString('en-US', {minimumFractionDigits: exp, maximumFractionDigits: exp})}
      else {upperMag = "e"+e.toFixed(exp)}
    }
    if (obj.layer == 0) {
      if (obj.lt(1000)) {return obj.mag.toFixed(dec)}
      else if (!noCommas) {return Math.floor(obj.mag).toLocaleString()}
      else {return Math.floor(obj.mag)}
    }
    if (obj.layer > 0) {
      let eString = "";
      if (obj.layer < 6) {for (let i=1; i<obj.layer; i++) {eString += "e"}}
      else {eString = obj.layer-1+"E"}
      if (obj.layer <= 1000) {return eString + upperMag}
      else {return eString}
    }
  }
  if (note == "Infinity") {
    let result = obj.plus(1).log10().divide(Math.log10(Number.MAX_VALUE));
    return e("Scientific", result, 2, 4)+"∞";
  }
}
function copyToClipboard(str) {
  var el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style = {
    position: "absolute",
    left: "-9999px"
  }
  document.body.appendChild(el);
  copyToClipboard2(el);
  document.body.removeChild(el);
  alert("Copied to clipboard");
}
function copyToClipboard2(el) {
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
function showTime(ms) {
  if (user.options.notation == "Blind") {return ""}
  if (typeof ms == "undefined" || ms >= Number.MAX_VALUE) {return "Infinite Time"}
  if (ms == 0) {return "0.000 Seconds"}
  let time = Math.floor(ms)/1000;
  let y = e("d", nd(Math.floor(time/31536000)));
  let yy = (y == 1) ? " Year" : " Years";
  let d = Math.floor(time%31536000/86400);
  let dd = (d == 1) ? " Day" : " Days";
  let h = Math.floor(time%86400/3600);
  let hh = (h == 1) ? " Hour" : " Hours";
  let m = Math.floor(time%3600/60);
  let mm = (m == 1) ? " Minute" : " Minutes";
  let s;
  if (time%60 >= 10 || m > 0) {s = Math.floor(time%60)}
  else {s = (time%60).toFixed(3)}
  let ss = (s == 1) ? " Second" : " Seconds";
  
  if (y == 0) {y = ""; yy = ""}
  else if (time%31536000 > 0) {yy += ", "}
  if (d == 0) {d = ""; dd = ""}
  else if (time%86400 > 0) {dd += ", "}
  if (h == 0) {h = ""; hh = ""}
  else if (time%3600 > 0) {hh += ", "}
  if (m == 0) {m = ""; mm = ""}
  else if (time%60 > 0) {mm += ", "}
  if (s == 0) {s = ""; ss = ""}
  
  return y+yy+d+dd+h+hh+m+mm+s+ss;
}
function random(min, max, floor) {
  if (typeof min == "undefined") {min = 0}
  if (typeof max == "undefined") {max = 1}
  if (floor) {return Math.floor(Math.random()*(max-min)+min)}
  else {return Math.random()*(max-min)+min}
}
