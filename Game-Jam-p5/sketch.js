
createCanvas(700,1000);
frameRate(60);

var speed = 10;
let player = new Sprite(350,800,50,50,DYNAMIC);
let testObstical = new Sprite(350,100,50,50,KINEMATIC);

function update() {
	background('green');

	Player_Control();

    Scroll();
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
}

function Scroll(){
    testObstical.position.y += speed;
}
