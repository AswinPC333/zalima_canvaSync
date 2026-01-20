const socket = io();
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false, lastX = 0, lastY = 0, color = "#000";
const room = "main";

document.getElementById("colorPicker").onchange = e => color = e.target.value;
socket.emit("join_room", { room });

canvas.onmousedown = e => { drawing = true; lastX = e.clientX; lastY = e.clientY; };
canvas.onmousemove = e => {
if (!drawing) return;
const data = { room, x1:lastX, y1:lastY, x2:e.clientX, y2:e.clientY, color };
draw(data); socket.emit("drawing_event", data);
lastX = e.clientX; lastY = e.clientY;
};
canvas.onmouseup = () => drawing = false;

function draw(d){
ctx.strokeStyle=d.color; ctx.lineWidth=2;
ctx.beginPath(); ctx.moveTo(d.x1,d.y1); ctx.lineTo(d.x2,d.y2); ctx.stroke();
}

socket.on("drawing_event", draw);
socket.on("load_canvas", h => h.forEach(draw));
socket.on("clear_canvas", () => ctx.clearRect(0,0,canvas.width,canvas.height));

function clearCanvas(){ socket.emit("clear_canvas", { room }); }
