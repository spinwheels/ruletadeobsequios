const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const spinButton = document.getElementById('spinButton');
const resultDiv = document.getElementById('result');
const emailInput = document.getElementById('email');

const slices = ['Premio 1', 'Premio 2', 'Premio 3', 'Premio 4', 'Premio 5', 'Premio 6'];
const sliceDeg = 360 / slices.length;
let rotation = 0;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 5000;
let isSpinning = false;

const img = new Image();
img.src = 'ruleta.png';

function drawWheel() {
    const containerWidth = canvas.parentNode.offsetWidth;
    const containerHeight = canvas.parentNode.offsetHeight;
    const wheelSize = Math.min(containerWidth, containerHeight);

    canvas.width = wheelSize;
    canvas.height = wheelSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rotation);
    ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();
}

function rotateWheel() {
    // Puedes eliminar la verificación del correo electrónico aquí
    if (isSpinning) {
        return;
    }

    isSpinning = true;

    spinAngleStart = Math.random() * 10 + 30;
    spinTime = 0;
    spinTimeTotal = Math.random() * 10000 + 12000;
    rotate();
}

function rotate() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    rotation += (spinAngle * Math.PI) / 180;

    spinAngleStart *= 0.99;

    drawWheel();
    requestAnimationFrame(rotate);
}

function stopRotateWheel() {
    const degrees = (rotation * 180) / Math.PI + 90;
    const index = Math.floor((360 - (degrees % 360)) / sliceDeg);

    isSpinning = false;

    // Aquí puedes realizar cualquier acción deseada al finalizar el giro
    // Por ejemplo, marcar el correo como participante si lo deseas
}

function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

spinButton.addEventListener('click', rotateWheel);

img.onload = drawWheel;

function resizeCanvas() {
    drawWheel();
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);
