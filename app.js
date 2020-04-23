const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

// canvas.width = 650;
// canvas.height = 650;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = "2.5";

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // canvas가 window 창 크기였다면 clientX와 offsetX는 같지만 canvas 그리기 때문에 offsetX 필요.
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 보이지는 않지만 x,y는 canvas 위에서 계속 이동중.
    console.log("creating path in ", x, y);
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // painting=true 인 순간부터 선을 그린다.
    console.log("creating line in ", x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

// forEach 의 color는 다른 이름으로도 가능.
// 배열로 만들고 각각마다 click event 추가
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
