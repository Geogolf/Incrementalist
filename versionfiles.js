const version = "0.0.0";
function setUser(v) {
  if (typeof v == "undefined") {v = version}
  if (v == "0.0.0") {
    return {
      ip: {x: nd(10), sac: nd(10), pp: nd(10), total: nd(10), highest: nd(10)},
      pp: {x: nd(0), sac: nd(0), ap: nd(0), total: nd(0), highest: nd(0)},
      ap: {x: nd(0), sac: nd(0), tp: nd(0), total: nd(0), highest: nd(0)},
      tp: {x: nd(0), sac: nd(0), dp: nd(0), total: nd(0), highest: nd(0)},
      dp: {x: nd(0), sac: nd(0), gp: nd(0), total: nd(0), highest: nd(0)},
      gp: {x: nd(0), sac: nd(0), total: nd(0), highest: nd(0)},
      inc: {x: 0, p: ["null", 0, 0, 0, 0, 0], m: ["null", 0, 0, 0, 0, 0], e: ["null", 0, 0, 0, 0, 0]},
      automation: {scale: {inc: {p: false, m: false, e: false}}, inc: {x: false, p: false, m: false, e: false}},
      automate: {scale: {inc: {p: false, m: false, e: false}}, inc: {x: false, p: ["null", false, false, false, false, false], m: ["null", false, false, false, false, false], e: ["null", false, false, false, false, false]}},
      scale: {inc: {p: 0, m: 0, e: 0}},
      sacrifice: {ip: {x: nd(1), count: 0}, pp: {x: nd(1), count: 0}, ap: {x: nd(1), count: 0}, tp: {x: nd(1), count: 0}, dp: {x: nd(1), count: 0}, gp: {x: nd(1), count: 0}},
      active: {shortendisplay: false, progressbar: false},
      tab: "ip",
      time: 0,
      version: "0.0.0",
    }
  }
}
