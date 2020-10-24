var canvas;
var ctx;

const canvasData = {
  "pt": {
    name: "PT",
    lineCount: 8,
    color: "rgb(100, 100, 200)",
    width: "10"
    /*lineData: [
      {fromId: "pt0-1", toId: "pt1-1", color: "rgb(100, 100, 200)", width: "10"},
      {fromId: "pt0-1", toId: "pt1-2", color: "rgb(100, 100, 200)", width: "10"},
      {fromId: "pt0-1", toId: "pt1-3", color: "rgb(100, 100, 200)", width: "10"},
      {fromId: "pt1-1", toId: "pt2-1", color: "rgb(100, 100, 200)", width: "10"},
      {fromId: "pt1-1", toId: "pt2-2", color: "rgb(100, 100, 200)", width: "10"},
      {fromId: "pt1-2", toId: "pt2-3", color: "rgb(100, 100, 200)", width: "10"},
      {fromId: "pt1-3", toId: "pt2-4", color: "rgb(100, 100, 200)", width: "10"},
      {fromId: "pt1-3", toId: "pt2-5", color: "rgb(100, 100, 200)", width: "10"}
    ]*/
  }
}

wel("resize", () => {resizeCanvases()});
function resizeCanvases() {
  resizeCanvas("pt");
}

function retrieveCanvasData(kind) {
  if (kind == "pt") {
    let canvasPT = di("canvasPT");
    let canvasTabPT = di("canvasTabPT");
    if (canvasPT === undefined || canvasPT === null) {return false}
    if (canvasTabPT === undefined || canvasTabPT === null) {return false}
    canvas = canvasPT;
    ctx = canvas.getContext("2d");
    return true;
  }
}

function resizeCanvas(kind) {
  if (!retrieveCanvasData(kind)) {return}
  canvas.width = 0;
  canvas.height = 0;
  canvas.width = document.documentElement.scrollWidth;
  canvas.height = document.documentElement.scrollHeight;
  drawTree(kind);
}

function drawTree(kind) {
  if (!retrieveCanvasData(kind)) {return}
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (kind == "pt") {
    for (let id in pt) {
      let data = pt[id].from;
      for (let i=0; i<data.length; i++) {
        drawTreeBranch(data[i], id, canvasData[kind].color, canvasData[kind].width);
      }
    }
  }
  
  /*for (let i=0; i<canvasData[kind].lineCount; i++) {
    let data = canvasData[kind].lineData[i];
    drawTreeBranch(data.fromId, data.toId, data.color, data.width);
  }*/
}

function drawTreeBranch(from, to, color, width) {
  if (di(from).style.display == "none") {return}
  if (di(to).style.display == "none") {return}
  let start = di(from).getBoundingClientRect();
  let end = di(to).getBoundingClientRect();
  let x1 = start.left+(start.width/2)+(document.documentElement.scrollLeft || document.body.scrollLeft);
  let y1 = start.top+(start.height/2)+(document.documentElement.scrollTop || document.body.scrollTop);
  let x2 = end.left+(end.width/2)+(document.documentElement.scrollLeft || document.body.scrollLeft);
  let y2 = end.top+(end.height/2)+(document.documentElement.scrollTop || document.body.scrollTop);
  
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
