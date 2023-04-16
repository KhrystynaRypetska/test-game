const player = document.getElementById('player');
const enemyContainer = document.getElementById('enemies-container');
const gameContainer = document.getElementById('game-container')
const buttonStart = document.querySelector('.button-start');
const button = [...document.querySelectorAll('.button')];
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');
const buttonTop = document.querySelector('.button-top');
const buttonBottom = document.querySelector('.button-bottom');
let enemies = [];
let gameover = false;

// Set initial player position
let playerX = 0;
let playerY = 0;
player.style.left = playerX + 'px';
player.style.bottom = playerY + 'px';

// Event listener for arrow key presses
document.addEventListener('keydown', (e) => {

    if (!gameover) {
        if ((e.key === 'ArrowUp' && playerY < gameContainer.offsetHeight - player.offsetHeight)) {
            playerY += 10;
        } else if (e.key === 'ArrowDown' && playerY > 0) {
            playerY -= 10;
        } else if (e.key === 'ArrowLeft' && playerX > 0) {
            playerX -= 10;
        } else if (e.key === 'ArrowRight' && playerX < gameContainer.offsetWidth - player.offsetWidth) {
            playerX += 10;
        }
        player.style.left = playerX + 'px';
        player.style.bottom = playerY + 'px';
    }
});


button.forEach((btn)=> {
    btn.addEventListener('click', function (event){
        event.preventDefault()

        console.log(gameContainer)
        if(!gameover) {
            if (event.target.classList.contains('button-left') && playerX > 0) {
                console.log('left')
                playerX -= 10;
            }
            if (event.target.classList.contains('button-right') && playerX < gameContainer.offsetWidth - player.offsetWidth) {
                console.log('right')
                playerX += 10;
            }
            if (event.target.classList.contains('button-top') && playerY < gameContainer.offsetHeight - player.offsetHeight) {
                console.log('top')
                playerY += 10;
            }
            if (event.target.classList.contains('button-bottom') && playerY > 0) {
                console.log('down')
                playerY -= 10;
            }
            player.style.left = playerX + 'px';
            player.style.bottom = playerY + 'px';
        }
    })
})


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Function to create enemies
function createEnemy() {
    if (enemies.length < 9) { // Limit enemies to 5
        const enemy = document.createElement('div');
        enemy.className = `enemy-${getRandomInt(9)}`;
        enemy.style.left = Math.random() * (window.innerWidth - 50) + 'px'; // Random X position
        enemy.style.top = '0px'; // Start from top
        enemyContainer.appendChild(enemy);
        enemies.push(enemy);
    }
}

// Function to move enemies
function moveEnemies() {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const enemy = enemies[i];
        const top = parseInt(enemy.style.top);
        enemy.style.top = (top + 2) + 'px'; // Move enemy downwards

        // Check if enemy hits the player
        const enemyRect = enemy.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        if (collisionDetection(enemyRect, playerRect)) {
            // Game over
            if (gameover == false) {
                alert('Game Over');
            }
            gameover = true;
            clearInterval(enemyInterval);
            clearInterval(projectileInterval);
        }

        // Remove enemy if it reaches the bottom of the scene
        if (top > window.innerHeight) {
            enemyContainer.removeChild(enemy);
            enemies.splice(i, 1);
        }
    }
}

// Function for collision detection between two elements
function collisionDetection(rect1, rect2) {
    return !(rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom);
}

// Set intervals for moving projectiles and enemies
// const projectileInterval = setInterval(moveProjectiles, 10);
// const enemyInterval = setInterval(createEnemy, 1000);
// setInterval(moveEnemies, 30);


buttonStart.addEventListener('click',  () => {
    // const projectileInterval = setInterval(moveProjectiles, 10);
    const enemyInterval = setInterval(createEnemy, 1000);
    setInterval(moveEnemies, 30);
})