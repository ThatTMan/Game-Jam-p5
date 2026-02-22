
createCanvas(700,1000);
frameRate(60);

var speed = 600;
var spawnRate = 60;
var maxSpeed = 600;
var minSpeed = 10;
var clock = 0;
let player = new Sprite(350,800,50,50,DYNAMIC);
player.rotationLock = true;
let testObstical = new Group();

function update() {
	background('green');

	Player_Control();

    Scroll();

    clock++;
    CreateObstical();
}

function Player_Control(){
    if(keyboard.pressing("W")){
        speed += 1;
    }
    if(keyboard.pressing("S")){
        speed -= 1;
    }
    if(keyboard.pressing("A")){
        player.position.x-=5;
    } 
    else if(keyboard.pressing("D")){
        player.position.x+=5;
    }

    if (speed < maxSpeed){
        speed = maxSpeed;
    }
    if (speed > minSpeed){
        speed = minSpeed;
    }
}

function Scroll(){
    for(let i = 0; i < testObstical.length; i++){
        testObstical[i].position.y+=speed;
    }
}

function CreateObstical(){
    if(clock%spawnRate == 0){
        let obstical = new testObstical.Sprite(random(50, 650), 100, 50, 50, KINEMATIC);
    }
}