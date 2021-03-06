const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 650;

// canvas의 width,height가 없으면 동작하지 않는다
// html에 선언해주거나 js 여기에 선언해주자.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 초기화 (이미지 오른쪽 버튼 저장 시 바탕 하얀색)
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = "2.5";

let painting = false;
let filling = false;

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
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // painting=true 인 순간부터 선을 그린다.
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleRightClick(event) {
  // 오른쪽 버튼 클릭 막음
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleRightClick);
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
// forEach 의 color는 다른 이름으로도 가능.
// 배열로 만들고 각각마다 click event 추가
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "FILL";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  // 직접 html 에서 a 태그를 사용한다면 link.click()이 필요없지만 여기는 내가 요소를 만들어준거라 필요.
  // const link = document.querySelector("a");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  //  클릭을 거짓으로 만든다.
  link.click();
}

if (save) {
  save.addEventListener("click", handleSaveClick);
}
