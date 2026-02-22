
createCanvas(700,1000);
frameRate(120);

var speed = 10;
var spawnRate = 60;
var maxSpeed = 110;
var minSpeed = 10;
var clock = 0;
var gameStatus = 1;
var score = 0;
var BAC = 0;
let player = new Sprite(350,800,50,50,DYNAMIC);
player.rotationLock = true;
let obsticalFamily = new Group();
let beerFamily = new Group();

function update() {
    if (gameStatus == 1){
        background('blue');
        textSize(32);
        fill(255);
        textAlign(CENTER);
        text('Welcome to Steel Truck Run!', 350, 300);
        text('You are a truck driver', 350, 350);
        text('and a recoving alcohalic,', 350, 400);
        text('dodge obsticals and beer', 350, 450);
        text(" to stay safe and sober", 350, 500);
        text('Press Space to Start', 350, 600);
        if(keyboard.pressing(" ")){
            gameStatus = 2;
        }
    } else if (gameStatus == 2){
    	background('green');
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
    text('Speed: ' + speed, 10, 60);
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
            await delay(BAC*10);
            speed += 1;
        }
        if(keyboard.pressing("S")){
            await delay(BAC*10);
            speed -= 1;
        }
        if(keyboard.pressing("A")){
            await delay(BAC*10);
            player.position.x-=5;
        } 
        else if(keyboard.pressing("D")){
            await delay(BAC*10);
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