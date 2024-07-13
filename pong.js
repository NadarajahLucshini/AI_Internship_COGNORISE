const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
const ballRadius = 10;

let player = {
    x: 0,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "WHITE",
    score: 0
};

let ai = {
    x: canvas.width - paddleWidth,
    y: (canvas.height - paddleHeight) / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "WHITE",
    score: 0
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "35px Arial";
    context.fillText(text, x, y);
}

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(ai.x, ai.y, ai.width, ai.height, ai.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    drawText(player.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(ai.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");
}

function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    let playerOrAI = (ball.x < canvas.width / 2) ? player : ai;
    if (collision(ball, playerOrAI)) {
        let collidePoint = (ball.y - (playerOrAI.y + playerOrAI.height / 2));
        collidePoint = collidePoint / (playerOrAI.height / 2);
        let angleRad = collidePoint * Math.PI / 4;
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        ball.speed += 0.1;
    }

