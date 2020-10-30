//Give
function giveMoney(layer, amount, set) {
  if (typeof layer == "undefined") {giveEgg("egg1-6", true)}
  if (!set) {
    user[layer.toLowerCase()].current = user[layer.toLowerCase()].current.plus(amount);
    user[layer.toLowerCase()].sac = user[layer.toLowerCase()].sac.plus(amount);
    user[layer.toLowerCase()].total = user[layer.toLowerCase()].total.plus(amount);
    if (user[layer.toLowerCase()].current.gt(user[layer.toLowerCase()].highest)) {user[layer.toLowerCase()].highest = user[layer.toLowerCase()].current}
  }
  else {
    user[layer.toLowerCase()].current = nd(amount);
    user[layer.toLowerCase()].sac = nd(amount);
    user[layer.toLowerCase()].total = nd(amount);
    if (user[layer.toLowerCase()].current.gt(user[layer.toLowerCase()].highest)) {user[layer.toLowerCase()].highest = user[layer.toLowerCase()].current}
    
  }
}

//Progress
function progress() {
  /*user.ip.equationClicks = nd(1e35);
  user.sacrifice.IP = 14;
  user.pp.challenge[1].count = 4;
  user.pp.challenge[2].count = 3;
  user.pp.challenge[3].count = 2;
  user.pp.challenge[4].count = 1;
  user.pp.count = 5000;
  user.sacrifice.PP = 1;
  for (let i=1; i<=6; i++) {giveAchievement("ach1-"+i)}
  for (let i=1; i<=6; i++) {giveAchievement("ach2-"+i)}
  for (let i=1; i<=6; i++) {giveAchievement("ach3-"+i)}
  giveMoney("IP", "1e1070", true);
  giveMoney("PP", "175000", true);
  user.options.confirmations = ["Reset"];*/
  
  /*let data = JSON.parse(atob("eyJ0YWIiOnsibWFpbiI6IlByZXN0aWdlIiwiQWNoaWV2ZW1lbnRzIjoiTm9ybWFsIiwiUHJlc3RpZ2UiOiJUcmVlIn0sIm9wdGlvbnMiOnsibm90YXRpb24iOiJTY2llbnRpZmljIiwiY29uZmlybWF0aW9ucyI6WyJSZXNldCJdLCJsb2dwYiI6ZmFsc2V9LCJhY2hpZXZlbWVudHMiOlsiYWNoMS0zIiwiYWNoMS01IiwiYWNoMi0zIiwiYWNoMS0xIiwiYWNoMS02IiwiYWNoMS0yIiwiYWNoMS00IiwiYWNoMi0yIiwiYWNoMi00IiwiYWNoMi0xIiwiYWNoMy0xIiwiYWNoMy0yIiwiYWNoMy0zIiwiYWNoMy00IiwiYWNoMi02IiwiYWNoMi01IiwiYWNoMy01IiwiYWNoMy02Il0sImVnZ3MiOltdLCJhdXRvbWF0aW9uIjp7IklQIjp7ImJ1eU1heCI6dHJ1ZSwiYm91Z2h0Ijo1NSwiZW5hYmxlZCI6dHJ1ZX0sIkluY3JlbWVudFAiOnsiYnV5TWF4Ijp0cnVlLCJib3VnaHQiOjI1LCJlbmFibGVkIjpbdHJ1ZSx0cnVlLHRydWUsdHJ1ZSx0cnVlXX0sIkluY3JlbWVudE0iOnsiYnV5TWF4Ijp0cnVlLCJib3VnaHQiOjksImVuYWJsZWQiOlt0cnVlLHRydWUsdHJ1ZSx0cnVlLHRydWVdfSwiSW5jcmVtZW50RSI6eyJidXlNYXgiOnRydWUsImJvdWdodCI6MywiZW5hYmxlZCI6W3RydWUsdHJ1ZSx0cnVlLHRydWUsdHJ1ZV19LCJJbmNyZW1lbnRUIjp7ImJ1eU1heCI6ZmFsc2UsImJvdWdodCI6MCwiZW5hYmxlZCI6W2ZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXX0sIlNhY3JpZmljZUlQIjp7ImJ1eU1heCI6dHJ1ZSwiYm91Z2h0Ijo0LCJlbmFibGVkIjp0cnVlfSwiUHJlc3RpZ2UiOnsiYnV5TWF4Ijp0cnVlLCJib3VnaHQiOjEsImVuYWJsZWQiOnRydWUsImF0IjoiMTI2In19LCJzYWNyaWZpY2UiOnsiSVAiOjgsIlBQIjoxfSwic2NhbGluZyI6eyJQIjp7ImJ1eU1heCI6dHJ1ZSwiYm91Z2h0IjozOH0sIk0iOnsiYnV5TWF4Ijp0cnVlLCJib3VnaHQiOjIyfSwiRSI6eyJidXlNYXgiOnRydWUsImJvdWdodCI6M319LCJpcCI6eyJjdXJyZW50IjoiOS41NTM4NTg2NzI4ODU3NzRlMTU5Iiwic2FjIjoiMS4yODEwNzgzMTUyODMzMDQzZTE2NyIsInRvdGFsIjoiNC43NjEyOTA2NTkxNTc4NzdlMTA0MCIsImhpZ2hlc3QiOiI2Ljg4NjY3ODQwNzc4MDc5ZTEwMzgiLCJpbmZpbml0ZSI6IjFlMTAwMDAwMCIsImVxdWF0aW9uQ2xpY2tzIjoiMTAwNzciLCJpbmNyZW1lbnQiOnsiUCI6eyJib3VnaHQiOls2MzAzNy43NTI5NDA5OTM5OCw2MzAzNy43NTI5NDA5OTM5OCw2MzAzNy43NTI5NDA5OTM5OCw2MzAzNy43NTI5NDA5OTM5OCwyMjc1Ny42NDg4OTcwMzAzMV19LCJNIjp7ImJvdWdodCI6Wzc5NzIuNjk4ODgyMzQ0NzI4LDM1MzUsMjA3MiwxMzc3LDk3OV19LCJFIjp7ImJvdWdodCI6WzE0LDcsNSw0LDNdfSwiVCI6eyJib3VnaHQiOlswLDAsMCwwLDBdfX19LCJwcCI6eyJjdXJyZW50IjoiODM2MjgiLCJzYWMiOiIxNDY2ODEiLCJ0b3RhbCI6IjMyMDk5OSIsImhpZ2hlc3QiOiIxMjExMTUiLCJpbmZpbml0ZSI6IjFlMTAwIiwiY291bnQiOjQyMzcsIm1pbGVzdG9uZXMiOjQsInB0Ijp7InJlZnVuZCI6ZmFsc2UsInJlZnVuZEFtb3VudCI6IjUxNjkzIiwiY2VsbHMiOlsicHQwLTEiLCJwdDEtMSIsInB0MS0yIiwicHQxLTMiLCJwdDItMSIsInB0Mi0yIiwicHQyLTMiLCJwdDItNCIsInB0Mi01IiwicHQzLTEiLCJwdDMtMiIsInB0My0zIiwicHQzLTQiLCJwdDQtMSJdfSwiY2hhbGxlbmdlIjpbIm51bGwiLHsiaW4iOmZhbHNlLCJjb3VudCI6NH0seyJpbiI6ZmFsc2UsImNvdW50IjoyfSx7ImluIjpmYWxzZSwiY291bnQiOjF9LHsiaW4iOmZhbHNlLCJjb3VudCI6MX0seyJpbiI6ZmFsc2UsImNvdW50IjowfV0sImxhc3RHYWluIjoiMTI2In0sInRpbWUiOnsibGFzdFVwZGF0ZSI6MTYwMzgzNDY4NzA3OSwicGxheWVkIjozNTIyNjk4MSwidGhpc1ByZXN0aWdlIjoxNjUwLCJsYXN0UHJlc3RpZ2UiOjMxMDAsImJlc3RQcmVzdGlnZSI6ODAwfSwidmVyc2lvbiI6IjAuNS4wIiwiYXRFbmQiOmZhbHNlLCJiZXRhIjpmYWxzZX0="));
  loadData(data);*/
  
  //If you think you can just import the save above, you are wrong, it will not work.
}
