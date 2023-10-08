const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 5;

// Ball properties
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Scores
let leftPlayerScore = 0;
let rightPlayerScore = 0;

// Event listeners for paddle control
document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowUp" && rightPaddleY > 0) {
		rightPaddleY -= paddleSpeed;
	} else if (e.key === "ArrowDown" && rightPaddleY + paddleHeight < canvas.height) {
		rightPaddleY += paddleSpeed;
	} else if (e.key === "w" && leftPaddleY > 0) {
		leftPaddleY -= paddleSpeed;
	} else if (e.key === "s" && leftPaddleY + paddleHeight < canvas.height) {
		leftPaddleY += paddleSpeed;
	}
});

// Main game loop
function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw paddles
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
	ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

	// Move the ball
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Ball collisions with top and bottom walls
	if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
		ballSpeedY = -ballSpeedY;
	}

	// Ball collisions with paddles
	if (
		(ballX - ballSize < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) ||
		(ballX + ballSize > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight)
	) {
		ballSpeedX = -ballSpeedX;
	}

	// Ball out of bounds (score)
	if (ballX - ballSize < 0) {
		// Right player scores
		rightPlayerScore++;
		resetBall();
	} else if (ballX + ballSize > canvas.width) {
		// Left player scores
		leftPlayerScore++;
		resetBall();
	}

	// Draw the ball
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
	ctx.fill();

	// Draw scores
	ctx.font = "30px Arial";
	ctx.fillText(leftPlayerScore, 100, 50);
	ctx.fillText(rightPlayerScore, canvas.width - 130, 50);

	// Request next frame
	requestAnimationFrame(draw);
}

function resetBall() {
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
	ballSpeedX = -ballSpeedX;
	ballSpeedY = -ballSpeedY;
}

draw();