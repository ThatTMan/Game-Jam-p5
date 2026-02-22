let speed, spawnRate, maxSpeed, minSpeed, clock, gameStatus, score, BAC, player, obsticalFamily, beerFamily, beerImage;

function preload() {
    beerImage = loadImage("Sprites/beer.png");
    playerImage = loadImage("Sprites/truck.png");
    enemyImage = loadImage("Sprites/enemy.png");
}


function setup() {
    createCanvas(700,1000);
    frameRate(120);
    speed = 10;
    spawnRate = 60;
    maxSpeed = 110;
    minSpeed = 10;
    clock = 0;
    gameStatus = 1;
    score = 0;
    BAC = 0;
    player = new Sprite(350,800,50,50,DYNAMIC);
    player.rotationLock = true;
    playerImage.resize(200, 200);
    player.img = playerImage;
    obsticalFamily = new Group();
    enemyImage.resize(200, 200);
    obsticalFamily.img = enemyImage;
    beerFamily = new Group();
    beerImage.resize(200, 200);
    beerFamily.img=beerImage;
}

function update() {
    if (gameStatus == 1){
        background('blue');
        textSize(32);
        fill(255);
        textAlign(CENTER);
        text('Welcome to Steel Truck Run!', 350, 300);
        text('You are a truck driver', 350, 350);
        text('and a recovering alcoholic,', 350, 400);
        text('dodge obsticles and beer', 350, 450);
        text(" to stay safe and sober", 350, 500);
        text('Press Space to Start', 350, 600);
        if(keyboard.pressing(" ")){
            gameStatus = 2;
        }
    } else if (gameStatus == 2){
    	background('black');
    	Player_Control();
        Scroll();
        clock++;
        CreateObstical();
        CollisonDetection();
        display();
        score += speed/600;
    } else if (gameStatus == 3) {
        background('red');
        textSize(32);
        fill(255);
        textAlign(LEFT);
        text('Game Over', 250, 500);
        text('Final Score: ' + round(score), 250, 550);
    }
}

function display(){
    textSize(32);
    fill(255);
    textAlign(LEFT);
    text('Score: ' + round(score), 10, 30);
    text('Speed: ' + (50 + speed), 10, 60);
    text("BAC: " + BAC/100 + "%", 10, 90);
}

function CollisonDetection(){
    if(player.collide(obsticalFamily)){
        gameStatus = 3;
    }
    if(player.collide(beerFamily)){
        BAC += 1;
        minSpeed = 10 + BAC;
        for(let i = 0; i < beerFamily.length; i++){
            if(player.collide(beerFamily[i])){
                beerFamily[i].remove();
            }
        }
    }
}

async function Player_Control(){
    if(BAC < 200){
        if(keyboard.pressing("W")){
            await delay(BAC*50);
            speed += 1;
        }
        if(keyboard.pressing("S")){
            await delay(BAC*50);
            speed -= 1;
        }
        if(keyboard.pressing("A")){
            await delay(BAC*50);
            player.position.x-=5;
        } 
        else if(keyboard.pressing("D")){
            await delay(BAC*50);
            player.position.x+=5;
        }
    } else if(clock%spawnRate == 0){
        var input = round(random(0,4));
        if(input < 1){
            speed += 1*BAC;
        } else if(input < 2){
            speed -= 1*BAC;
        } else if(input < 3){
            player.position.x-=5*BAC/10;
        } else {
            player.position.x+=5*BAC/10;
        }
    }

    if (speed > maxSpeed){
        speed = maxSpeed;
    }
    if (speed < minSpeed){
        speed = minSpeed;
    }
    if (minSpeed > maxSpeed){
        maxSpeed = minSpeed;
    }

    if (player.position.x < 25){
        player.position.x = 25;
    }
    if (player.position.x > 675){
        player.position.x = 675;
    }
}

function Scroll(){
    for(let i = 0; i < obsticalFamily.length; i++){
        obsticalFamily[i].position.y+=speed/2;
    }
    for(let j = 0; j < beerFamily.length; j++){
        beerFamily[j].position.y+=speed/2;
    }
}

function CreateObstical(){
    if(clock%spawnRate == 0){
        var type = round(random(0,3));
        if (type<3) {let obstical = new obsticalFamily.Sprite(random(50, 650), 100, 50, 50, KINEMATIC);}
        else {let beer = new beerFamily.Sprite(random(50, 650), 100, 30, 50, KINEMATIC);}
    }
}