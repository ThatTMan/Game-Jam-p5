import { Player_Control } from "./player";

createCanvas(700,1000);
var speed = 40;
let player = new Sprite(0,0,50,50,DYNAMIC);
function setup() {
}

function update() {
	background('green');
	Player_Control();

}

function Player_Control(){
    if(keyDown("W")){
        speed += 1;
    }
    if(keyDown("S")){
        speed -= 1;
    }
    if(keyDown("A")){
        player.velocityX=-5;
    }
    if(keyDown("D")){
        player.velocityX=5;
    }
}