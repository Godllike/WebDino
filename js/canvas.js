`use strict`

const canvas = document.getElementById(`canvas1`);
const context = canvas.getContext(`2d`);
canvas.height = 500;
canvas.width = 1000;

/*
	//------------Galochka-----------------
	context.beginPath();
	context.moveTo(25,25);
	context.lineTo(25,50);
	context.lineTo(50,25);
	context.strokeStyle = `black`;
	context.lineWidth = 5;
	context.lineCap = `round`; //butt, square
	context.lineJoin = `round`; //miter, bevel
	context.stroke();

	//------------Kubik-----------------
	context.beginPath();
	context.rect(75,25,25,25);
	context.fillStyle = `orange`;
	context.strokeStyle = `black`;
	context.lineWidth = 5;
	context.fill();
	context.stroke();

	//------------Kubik*3-----------------
	const colors = [`red`,`blue`,`orange`];

	for (let i = 0; i < colors.length; i++){
		let color = colors[i];  
		context.beginPath();
		context.rect(
			i*10 + 125,
			i*10 + 25,
			25,
			25
			);
		context.fillStyle = color;
		context.strokeStyle = `black`;
		context.lineWidth = 5;
		context.fill();
		context.stroke();
	};

	//------------Krug-----------------

	context.beginPath();
	context.arc(200,36,15,0,1.5*Math.PI, false); //false = по час. стр.
	context.fillStyle = `orange`;				 //true = против час. стр.
	context.strokeStyle = `black`;
	context.lineWidth = 5;
	context.fill();
	context.stroke();

	//------------Krivaya_Bizie-----------------
	context.beginPath();
	context.moveTo(230, 25);
	context.quadraticCurveTo(250, 75, 280, 25); //quadraticCurveTo = 1 контр. точка и конечна точка
	context.fillStyle = `orange`; 				//bezierCurveTo = 2 контр. точка и конечна точка
	context.strokeStyle = `black`;
	context.lineWidth = 5;
	context.fill();
	context.stroke();

	//-------------Triugolnik------------------
	context.beginPath();
	context.moveTo(300, 25);
	context.lineTo(300, 50);
	context.lineTo(325, 38);
	context.closePath();
	context.fillStyle = `orange`; 
	context.strokeStyle = `black`;
	context.lineWidth = 5;
	context.fill();
	context.stroke();

	//--------------Text--------------------
	context.font = `50px 'Press Start 2P'`
	context.textAlign = `left`; //(left), right, center
	context.textBaseline = `alphabetic`; //(alphabetic), top, bottom, middle 

	context.fillStyle = `orange`; 
	context.fillText(`lol`, 335, 50);

	context.strokeStyle = `black`;
	context.lineWidth = 3;
	context.strokeText(`lol`, 335, 50);


	//--------------kartinka--------------------

*/




//-------zagruzka foto-------
let playerStayImg = new Image();
playerStayImg.src = `img/stay.webp`;
let playerJumpImg1 = new Image();
playerJumpImg1.src = `img/jump1.webp`;
let playerJumpImg2 = new Image();
playerJumpImg2.src = `img/jump2.webp`;
let playerSitImg1 = new Image();
playerSitImg1.src = `img/sit1.webp`;
let playerSitImg2 = new Image();
playerSitImg2.src = `img/sit2.webp`;
let playerRunImg1 = new Image();
playerRunImg1.src = `img/run1.webp`;
let playerRunImg2 = new Image();
playerRunImg2.src = `img/run2.webp`;
let playerWinImg1 = new Image();
playerWinImg1.src = `img/win1.webp`;
let playerWinImg2 = new Image();
playerWinImg2.src = `img/win2.webp`;
let kaktusSmallImg1 = new Image();
kaktusSmallImg1.src = `img/kaktusSmall1.webp`;
let kaktusSmallImg2 = new Image();
kaktusSmallImg2.src = `img/kaktusSmall2.webp`;
let kaktusMiddleImg1 = new Image();
kaktusMiddleImg1.src = `img/kaktusMiddle1.webp`;
let kaktusMiddleImg2 = new Image();
kaktusMiddleImg2.src = `img/kaktusMiddle2.webp`;
let kaktusLargeImg1 = new Image();
kaktusLargeImg1.src = `img/kaktusLarge1.webp`;
let kaktusLargeImg2 = new Image();
kaktusLargeImg2.src = `img/kaktusLarge2.webp`;
let batSmallImg1 = new Image();
batSmallImg1.src = `img/batSmall1.webp`;
let batSmallImg2 = new Image();
batSmallImg2.src = `img/batSmall2.webp`;
let batLargeImg1 = new Image();
batLargeImg1.src = `img/batLarge1.webp`;
let batLargeImg2 = new Image();
batLargeImg2.src = `img/batLarge2.webp`;



let fonImg = new Image();
fonImg.src = `img/fon.jpeg`;

let startGameButt = document.getElementsByClassName(`GameButton`)[0];
const startContainer = document.getElementsByClassName(`startContainer`)[0];
startGameButt.addEventListener(`click`, startGameF);
//--------Global Var---------
let beforeGameWin 
let endGame 
let hightScore 
let score 
let timer
let numberKaktus
let gravity 
let kaCoord 
let player
let overScreen
let gameWin
let gameLose
let animation = false;



function startGameF (){
	gameWin = 0
	gameLose = 0
	overScreen = false;
	beforeGameWin = 0;
	endGame = 0;
	hightScore = 0;
	score = 0;
	timer = 0;
	numberKaktus = 0;
	gravity = 0.1;
	kaCoord = [];
	player = {img:playerStayImg, positionX:100, positionY:50, velocityX:0, velocityY:0, width:95, height:120, jump:true, sit:false};
	startGameButt.removeEventListener(`click`, startGameF);
	startContainer.innerHTML = ``;
	document.addEventListener(`keydown`, keydownF);
	document.addEventListener(`keyup`, keyupF);
	if(!animation){
		animation = true;
		game();
	};
};

function keydownF ({keyCode}){
	switch (keyCode){
		case 32:
		event.preventDefault();
		console.log(`jump`);
		if (event.code === `Space` && !player.jump && !player.sit && !endGame == 1) {
			player.jump = true;
			player.velocityY = -8;
		};
		break
		
		case 40:
		event.preventDefault();
		console.log(`sit`)
		if (event.code === `ArrowDown` && !player.sit && !player.jump && !endGame == 1) {
			player.sit = true;
			player.img = playerSitImg1;
			player.width = 140;
			player.height = 94;
			player.positionY = canvas.height - player.height - 50;
		};
		break
	}
}

function keyupF ({keyCode}){
	switch (keyCode){
		case 40:
		event.preventDefault();
		if (event.code === `ArrowDown` && player.sit && !player.jump && !endGame == 1) {
			player.sit = false;
			player.img = playerStayImg;
			player.width = 95;
			player.height = 120;
			player.positionY = canvas.height - player.height - 50;
		};
		break
	}
}


let pTimestamp = 0;


function game(timestamp){
	window.requestAnimationFrame(game);
	let diff = timestamp - pTimestamp;
	pTimestamp = timestamp;
	console.log(diff);
	update();
	render();
};



function update(){
	timer++;
	//--------randomTimeSpawn-------------
	if (timer%1200 == 0 && !endGame == 1 && numberKaktus < 100){
		spawnF()
		console.log(`spawn`)
	} else if (timer%300 == 0 && !endGame == 1 && numberKaktus < 100) {
		let randomSpawn = Math.random();
		console.log(randomSpawn);
		if (randomSpawn > 0.5){
			spawnF()
		};
	};
	//--------randomTypeSpawn-------------
	function spawnF (){
		let randomSize = Math.random() * 5;
			
		if(randomSize > 4){
			kaCoord.push({img:batLargeImg1, type:5, x:1000, y:120, dx:-2, width:80, height:230})
		}else if(randomSize > 3){
			kaCoord.push({img:batSmallImg1, type:4, x:1000, y:140, dx:-2, width:70, height:60})
		}else if (randomSize > 2){
			kaCoord.push({img:kaktusLargeImg1, type:3, x:1000, y:320, dx:-2, width:105, height:130})
		} else if (randomSize > 1){
			kaCoord.push({img:kaktusMiddleImg1, type:2, x:1000, y:340, dx:-2, width:70, height:110})
		} else if (randomSize >= 0){
			kaCoord.push({img:kaktusSmallImg1, type:1, x:1000, y:375, dx:-2, width:55, height:75})
		}
		numberKaktus++	
	}

	//-------------IMG----------------

	if(beforeGameWin == 1 && timer%30 == 0 ){
		player.img = playerWinImg1;
	} else if(beforeGameWin == 1 && timer%15 == 0 ){ 
		player.img = playerWinImg2;
	} else if(player.jump && !player.sit && timer%30 == 0 && !endGame == 1 || endGame == 1 && timer%30 == 0){
		player.img = playerJumpImg1;
	} else if (player.jump && timer%15 == 0 && !endGame == 1 || endGame == 1 && timer%15 == 0){
		player.img = playerJumpImg2;
	} else if(player.sit && !player.jump && timer%30 == 0 && !endGame == 1){
		player.img = playerSitImg1;
	} else if (player.sit && timer%15 == 0 && !endGame == 1){
		player.img = playerSitImg2;
	} else if (!player.sit && !player.jump && timer%30 == 0 && !endGame == 1){
		player.img = playerRunImg1;
	} else if (!player.sit && !player.jump && timer%15 == 0 && !endGame == 1){
		player.img = playerRunImg2;
	};


	//-------------Phisyx----------------

	if(beforeGameWin == 1 && player.positionX < canvas.width + player.width + 10){
		player.positionX += player.velocityX
	} else if (beforeGameWin == 1 && player.positionX >= canvas.width + player.width + 10){
		endGame = 1;
		gameWin = 1;
		if (!overScreen) {
			overScreen = true
			restartGameF();
		};
	};

	if(!endGame == 1) {player.positionY += player.velocityY};
	
	if (player.positionY + player.height + player.velocityY <= canvas.height - 50 && !endGame == 1){
		player.velocityY += gravity;
	} else {
		player.velocityY = 0;
		player.jump = false;
	}


	kaCoord = kaCoord.filter(Boolean);

	for (i in kaCoord){
		if (!endGame == 1) {
			kaCoord[i].x -= 4; //+= kaCoord[i].dx
		};
		
		if(kaCoord[i].type == 5 && timer%30 == 0){
			kaCoord[i].img = batLargeImg2
		}else if(kaCoord[i].type == 5 && timer%15 == 0){
			kaCoord[i].img = batLargeImg1
		}else if(kaCoord[i].type == 4 && timer%30 == 0){
			kaCoord[i].img = batSmallImg2
		}else if(kaCoord[i].type == 4 && timer%15 == 0){
			kaCoord[i].img = batSmallImg1
		}else if (kaCoord[i].type == 3 && timer%30 == 0){
			kaCoord[i].img = kaktusLargeImg2
		} else if (kaCoord[i].type == 3 && timer%15 == 0){
			kaCoord[i].img = kaktusLargeImg1
		} else if(kaCoord[i].type == 2 && timer%30 == 0){
			kaCoord[i].img = kaktusMiddleImg2
		} else if (kaCoord[i].type == 2 && timer%15 == 0){
			kaCoord[i].img = kaktusMiddleImg1
		} else if(kaCoord[i].type == 1 && timer%30 == 0){
			kaCoord[i].img = kaktusSmallImg2
		} else if (kaCoord[i].type == 1 && timer%15 == 0){
			kaCoord[i].img = kaktusSmallImg1
		}

		if (Math.abs((2*player.positionX + player.width) - (2*kaCoord[i].x + kaCoord[i].width)) <= (player.width + kaCoord[i].width - 15) &&
			Math.abs((2*player.positionY + player.height) - (2*kaCoord[i].y + kaCoord[i].height)) <= (player.height + kaCoord[i].height - 15)){
			endGame = 1;
			gameLose = 1;
			if (!overScreen) {
				overScreen = true
				restartGameF();
			};
		};

		if(kaCoord[i].x < - kaCoord[i].width) {
			delete kaCoord[i];
			score++
			if(numberKaktus >= 100){
				beforeGameWin = 1;
				player.velocityX = 10;
			}
			if(score >= hightScore){
				hightScore = score
			};
		};
	};

};




function render(){
	context.drawImage(fonImg, 0, 0, 1000, 500);
	for (i in kaCoord) {
		context.drawImage(kaCoord[i].img, kaCoord[i].x, kaCoord[i].y, kaCoord[i].width, kaCoord[i].height);
	};
	context.drawImage(player.img, player.positionX, player.positionY, player.width, player.height);
	context.beginPath();
	context.font = `20px 'Press Start 2P'`
	context.fillStyle = `white`; 
	context.fillText(`Hight Score: ${hightScore}`, 10, 30);
	context.fillText(`Score: ${score}`, canvas.width - 10 - context.measureText(`Score: ${score}`).width, 30);
	if(endGame == 1){
		context.beginPath();
		context.rect(0,0,1000,500);
		context.fillStyle = `rgba(0, 0, 0, 0.5)`;
		context.fill();
	};
};


function restartGameF(){
	document.removeEventListener(`keydown`, keydownF);
	document.removeEventListener(`keyup`, keyupF);
	if (gameWin == 1) { 
		startContainer.innerHTML = `<div class="GameText">
									Харош, ти виграв. Йди попий пива!
								</div>
								<div class="GameButton">
									Restart
								</div>`;
	} else if (gameLose == 1) {
		startContainer.innerHTML = `<div class="GameText">
									Лох, набрав всього ${score} очков!
								</div>
								<div class="GameButton">
									Restart
								</div>`;
	};
	startGameButt = document.getElementsByClassName(`GameButton`)[0];
	startGameButt.addEventListener(`click`, startGameF);
}
