const player = document.getElementById('player');
const projectilesContainer = document.getElementById('projectiles-container');
const enemyContainer = document.getElementById('enemies-container');
let projectiles = [];
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
        if (e.key === 'ArrowUp' && playerY < window.innerHeight - player.offsetHeight) {
            playerY += 10;
        } else if (e.key === 'ArrowDown' && playerY > 0) {
            playerY -= 10;
        } else if (e.key === 'ArrowLeft' && playerX > 0) {
            playerX -= 10;
        } else if (e.key === 'ArrowRight' && playerX < window.innerWidth - player.offsetWidth) {
            playerX += 10;
        }
        player.style.left = playerX + 'px';
        player.style.bottom = playerY + 'px';
    }
});

// Event listener for space key press to fire projectiles
document.addEventListener('keydown', (e) => {
    if (!gameover && e.key === ' ') {
        createProjectile();
    }
});

// Function to create projectiles
function createProjectile() {
    if (projectiles.length < 5) { // Limit projectiles to 5
        const projectile = document.createElement('div');
        projectile.className = 'projectile';
        projectile.style.left = (playerX + player.offsetWidth / 2 - 5) + 'px';
        projectile.style.bottom = (playerY + player.offsetHeight) + 'px';
        projectilesContainer.appendChild(projectile);
        projectiles.push(projectile);
    }
}

// Function to move projectiles
function moveProjectiles() {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        const bottom = parseInt(projectile.style.bottom);
        projectile.style.bottom = (bottom + 5) + 'px';

        // Check if projectile hits an enemy
        const projectileRect = projectile.getBoundingClientRect();
        for (let j = enemies.length - 1; j >= 0; j--) {
            const enemy = enemies[j];
            const enemyRect = enemy.getBoundingClientRect();
            if (collisionDetection(projectileRect, enemyRect)) {
                // Remove projectile and enemy from DOM and arrays
                projectilesContainer.removeChild(projectile);
                projectiles.splice(i, 1);
                enemyContainer.removeChild(enemy);
                enemies.splice(j, 1);
            }
        }

        // Remove projectile if it reaches the top of the scene
        if (bottom > window.innerHeight) {
            projectilesContainer.removeChild(projectile);
            projectiles.splice(i, 1);
        }
    }
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
// Function to create enemies
function createEnemy() {
    if (enemies.length < 5) { // Limit enemies to 5
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
const projectileInterval = setInterval(moveProjectiles, 10);
const enemyInterval = setInterval(createEnemy, 1000);
setInterval(moveEnemies, 30);