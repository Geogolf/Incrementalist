var canvas;
var ctx;

const canvasData = {
  "pt": {
    name: "PT",
    lineCount: 8,
    color: "rgb(100, 100, 200)",
    width: "10"
  }
}

wel("resize", () => {resizeCanvases()});
function resizeCanvases() {
  if(user.tab.main == "Prestige" && user.tab.Prestige == "Tree"){
    showId('canvasPT')
    resizeCanvas("pt");
  }else{
    hideId('canvasPT')
  }
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
  let bounds = canvas.getBoundingClientRect()
  if(bounds.width != canvas.width){
    canvas.width = bounds.width;
  }
  if(bounds.height != canvas.height){
    canvas.height = bounds.height;
  }
  ctx.resetTransform()
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.translate(-bounds.left, -bounds.top)
  drawTree(kind);
}

function drawTree(kind) {
  //if (!retrieveCanvasData(kind)) {return}
  if (kind == "pt") {
    for (let id in pt) {
      let data = pt[id].from;
      for (let i=0; i<data.length; i++) {
        drawTreeBranch(data[i], id, canvasData[kind].color, canvasData[kind].width);
      }
    }
  }
}

function drawTreeBranch(from, to, color, width) {
  if (di(from).style.display == "none") {return}
  if (di(to).style.display == "none") {return}
  let start = di(from).getBoundingClientRect();
  let end = di(to).getBoundingClientRect();
  let x1 = start.left+(start.width/2);
  let y1 = start.top+(start.height/2);
  let x2 = end.left+(end.width/2);
  let y2 = end.top+(end.height/2);
  
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

}
