var obj = {
  a: null,
  b: "1",
  c: [null, "2", [null, "3", [null, "4", 5, true], {d: null, e: "6", f: 7, g: false}, 8, true], {h: null, i: "9", j: [null, "10", 11, false], k: {l: null, m: "12", n: 13, o: true}, p: 14, q: false}],
  r: {s: null, t: "15", u: [null, "16", [null, "17", 18, true], {v: null, w: "19", x: 20, y: false}, 21, true], z: {aa: null, bb: "22", cc: [null, "23", 24, false], dd: {ee: null, ff: "25", gg: 26, hh: true}, ii: 27, jj: false}, kk: 28, ll: true},
  mm: 29,
  nn: false
}

function checkType(value) {
  if (value === null) {return "nul"}
  if (typeof value == "string") {return "str"}
  if (Array.isArray(value)) {return "arr"}
  if (typeof value == "object") {return "obj"}
  if (typeof value == "number") {return "num"}
  if (typeof value == "boolean") {return "boo"}
}

//Encode
function encode(obj) {
  obj = JSON.parse(JSON.stringify(obj));
  let result = "";
  let k = Object.keys(obj);
  let v = Object.values(obj);
  for (let i=0; i<v.length; i++) {result += "'"+btoa(k[i])+"'"+encodeValue(v, i)}
  return lock(result);
}
const encodeValue = (v, i) => {
  if (checkType(v[i]) == "nul") {return "N"}
  if (checkType(v[i]) == "str") {return "/"+btoa(v[i])+")"}
  if (checkType(v[i]) == "arr") {return "["+encodeLoop(v, i)+"]"}
  if (checkType(v[i]) == "obj") {return "{"+encodeLoop(v, i)+"}"}
  if (checkType(v[i]) == "num") {return "("+v[i]}
  if (checkType(v[i]) == "boo") {return v[i].toString().charAt(0).toUpperCase()}
}
const encodeLoop = (v, i) => {
  let result = "";
  let isObj
  if (checkType(v[i]) == "obj") {isObj = true}
  let k = Object.keys(v[i]);
  v = Object.values(v[i]);
  for (let ii=0; ii<v.length; ii++) {
    if (isObj) {result += "'"+btoa(k[ii])+"'"}
    result += encodeValue(v, ii);
  }
  return result;
}

//Lock
const lockKeys = [["/", ">"], [")", "|"], ["[", "#"], ["]", "$"], ["{", "?"], ["}", "@"], ["(", "&"], ["'", "<"], ["=", "%"]];
function lock(str) {
  for (let i=0; i<lockKeys.length; i++) {
    while (str.includes(lockKeys[i][0])) {
      str = str.replace(lockKeys[i][0], lockKeys[i][1]);
    }
  }
  return str;
}
function unlock(str) {
  for (let i=0; i<lockKeys.length; i++) {
    while (str.includes(lockKeys[i][1])) {
      str = str.replace(lockKeys[i][1], lockKeys[i][0]);
    }
  }
  return str;
}

//Decode
function decode(str) {
  str = unlock(str);
  let result = "{";
  let singles = [["N", "null,"], ["[", "["], ["]", "],"], ["{", "{"], ["}", "},"], ["T", "true,"], ["F", "false,"]];
  let similar = [["'", "'", ":"], ["/", ")", ","]];
  for (let i=0; i<str.length; i++) {
    for (let k=0; k<similar.length; k++) {
      if (str.charAt(i) == similar[k][0]) {
        let keyStr;
        i++;
        for (keyStr = ""; str[i] != similar[k][1]; i++) {keyStr += str[i]}
        result += "\""+atob(keyStr)+"\""+similar[k][2];
      }
    }
    if (str.charAt(i) == "(") {
      for (i=i+1; !isNaN(str[i]); i++) {result += str[i]}
      result += ",";
      i--;
    }
    for (let k=0; k<singles.length; k++) {if (str.charAt(i) == singles[k][0]) {result += singles[k][1]}}
  }
  result += "}";
  result = result.replace(/,}/g, "}");
  result = result.replace(/,]/g, "]");
  return JSON.parse(result);
}
