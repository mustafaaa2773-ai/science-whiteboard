const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
const buttons = [...document.querySelectorAll('[data-tool]')];
let tool = 'pen';
let drawing = false;
let start = null;
let history = [];
let historyIndex = -1;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const image = canvas.width && canvas.height ? canvas.toDataURL() : null;
  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  if (image) restoreImage(image);
  else clearCanvas(false);
}

function restoreImage(data) {
  const img = new Image();
  img.onload = () => ctx.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
  img.src = data;
}

function point(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function snapshot() {
  history = history.slice(0, historyIndex + 1);
  history.push(canvas.toDataURL());
  historyIndex = history.length - 1;
}

function restore(index) {
  if (index < 0 || index >= history.length) return;
  historyIndex = index;
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  restoreImage(history[index]);
}

function clearCanvas(save = true) {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  if (save) snapshot();
}

function drawShape(p) {
  const w = p.x - start.x;
  const h = p.y - start.y;
  ctx.beginPath();
  if (tool === 'line') { ctx.moveTo(start.x, start.y); ctx.lineTo(p.x, p.y); }
  if (tool === 'rectangle') ctx.rect(start.x, start.y, w, h);
  if (tool === 'ellipse') ctx.ellipse(start.x + w / 2, start.y + h / 2, Math.abs(w / 2), Math.abs(h / 2), 0, 0, Math.PI * 2);
  ctx.stroke();
}

buttons.forEach(button => button.addEventListener('click', () => {
  tool = button.dataset.tool;
  buttons.forEach(b => b.classList.toggle('active', b === button));
}));

document.getElementById('undo').addEventListener('click', () => restore(historyIndex - 1));
document.getElementById('redo').addEventListener('click', () => restore(historyIndex + 1));
document.getElementById('clear').addEventListener('click', () => clearCanvas());
document.getElementById('export').addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'science-whiteboard.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});

canvas.addEventListener('pointerdown', event => {
  canvas.setPointerCapture(event.pointerId);
  drawing = true;
  start = point(event);
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  if (tool === 'pen' || tool === 'eraser') {
    ctx.strokeStyle = tool === 'eraser' ? '#fff' : '#17202a';
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
  }
});

canvas.addEventListener('pointermove', event => {
  if (!drawing) return;
  const p = point(event);
  if (tool === 'pen' || tool === 'eraser') {
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }
});

canvas.addEventListener('pointerup', event => {
  if (!drawing) return;
  drawing = false;
  const p = point(event);
  if (['line', 'rectangle', 'ellipse'].includes(tool)) {
    ctx.globalCompositeOperation = 'source-over';
    drawShape(p);
  }
  if (tool === 'text') {
    const text = window.prompt('اكتب النص:');
    if (text) { ctx.globalCompositeOperation = 'source-over'; ctx.font = '20px Arial'; ctx.fillStyle = '#17202a'; ctx.fillText(text, start.x, start.y); }
  }
  ctx.globalCompositeOperation = 'source-over';
  snapshot();
});

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
buttons[0].classList.add('active');
