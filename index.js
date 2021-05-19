const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
const squareSize = 20;

const snake = {
    record: 0,
    points: 0,
    direction: "NONE",
    body: [
        {
            x: 30 / 2, 
            y: 30 / 2
        }
    ],
    draw: function() {

        snake.body.forEach(element => {
            
            context.fillStyle = "white";
            context.fillRect(element.x * squareSize, element.y * squareSize, squareSize, squareSize);

        });

    },
    move: function(event) {

        switch (event.keyCode) {

            case 40: 
                snake.direction = "DOWN";
                break;

            case 38: 
                snake.direction = "UP";
                break;

            case 37: 
                snake.direction = "LEFT";
                break;

            case 39: 
                snake.direction = "RIGHT";
                break;

        }

    },
    walk: function() {

        const head = snake.body[0];

        var x = head.x;
        var y = head.y;

        switch (snake.direction) {
    
            case "UP": 
                y--;
                break;
    
            case "DOWN": 
                y++;
                break;
    
            case "RIGHT": 
                x++;
                break;
    
            case "LEFT": 
                x--;
                break;
    
        }

        snake.body.unshift(
            {
                x: x,
                y: y
            }
        );

    },
    collide: function() {

        const head = snake.body[0];

        if (head.x > 30) head.x = 0; 
        if (head.x < 0) head.x = 29; 
        if (head.y > 30) head.y = 0; 
        if (head.y < 0) head.y = 29; 
        if (head.x == food.x && head.y == food.y) snake.eat(); else snake.body.pop();
        if (snake.body.filter(function(element) { return head.x == element.x && head.y == element.y; }).length > 1) snake.kill();

    },
    eat: function() {

        snake.points++;
        food.respawn();

    },
    kill: function() {

        snake.record = snake.points;
        snake.points = 0;
        snake.direction = "NONE";
        snake.body = [
            {
                x: 30 / 2, 
                y: 30 / 2
            }
        ];

    }
}

const food = { 
    x: Math.floor(Math.random() * 30), 
    y: Math.floor(Math.random() * 30),
    draw: function() {

        context.fillStyle = "red";
        context.fillRect(food.x * squareSize, food.y * squareSize, squareSize, squareSize);

    },
    respawn: function() {

        food.x = Math.floor(Math.random() * 30); 
        food.y = Math.floor(Math.random() * 30);

    }
}

function drawBackground() {

    const boardTopX = 0;
    const boardTopY = 0;

    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 30; j++) {

            var xOffset = boardTopX + j * squareSize;
            var yOffset = boardTopY + i * squareSize;
            context.fillStyle = ((i + j) % 2 == 0) ? "#303030" : "#353535";
            context.fillRect(xOffset, yOffset, squareSize, squareSize);

        }
    }

    context.strokeStyle = "white";
    context.strokeRect(boardTopX, boardTopY, 600, 600);

}

function game() {

    snake.walk();
    snake.collide();
    drawBackground();
    
    snake.draw();
    food.draw();

    /* Rewrite Points */
    document.getElementById("points").innerText = "Points: " + snake.points + " | Record: " + snake.record;

}

function init() {

    drawBackground();
    document.addEventListener("keydown", snake.move);
    setInterval(game, 130);

}

init();