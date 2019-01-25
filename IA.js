window.onload = initAll;
var canvas;
var ctx;
var firstNum = Math.floor(Math.random()*99+1);   
var exponent = Math.floor(Math.random()*9+2);
var rightPressed =false;
var leftPressed =false;
var xSpeed = 2;
var ySpeed = 2;
var ballRadius = 10;
var ballFall = 50;
var paddleHeight = 40;
var paddleWidth = 60;
var paddleSpeed = 1;
var robberH = 50;
var robberW = 50;
var xPos = 245;
var robSpeed = 1;
var robCount = 0;
var balls = [];
var numBalls = 10;
var random = Math.floor(Math.random()*500);
var random2 = Math.floor(Math.random()*500);
var random3 = Math.floor(Math.random()*500);
var fall=true;
var life = 0;
var aGuess = false;
var bGuess = false;
var cGuess = false;
var dGuess = false;
var response;

for(var i=0;i<numBalls;i++)
{
    balls[i] = {x: xPos+15, y:100-robberH, speed:0};
}

var scoreNum = 0;
var lives = 0;

var interval;
interval = setInterval(play,1);

var answers = [];
answers[0] = (firstNum*exponent)+"x^"+(exponent-1);
answers[1] = (firstNum*exponent)+"x^"+(exponent+1);
answers[2] = (firstNum-exponent)+"x^"+(exponent-1);
answers[3] = (exponent)+"x^"+(firstNum);
var randomAnswer1 = Math.floor(Math.random()*4);
var randomAnswer2 = Math.floor(Math.random()*4);
while(randomAnswer2 == randomAnswer1)
{
    randomAnswer2 =  Math.floor(Math.random()*4);
}
var randomAnswer3 = Math.floor(Math.random()*4);
while(randomAnswer3 == randomAnswer2 || randomAnswer3 == randomAnswer1)
{
    randomAnswer3 =  Math.floor(Math.random()*4);
}
var randomAnswer4 = Math.floor(Math.random()*4);
while(randomAnswer4 == randomAnswer3 || randomAnswer4 == randomAnswer2 || randomAnswer4 == randomAnswer1)
{
    randomAnswer4 =  Math.floor(Math.random()*4);
}
for(var c = 0; c<numberofbombs; c++)
{
    bombs[c] = {x: x+25, y: 75, speed: 0};
}

function initAll()
{
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    paddleX = (canvas.width-paddleWidth)/2;
    document.addEventListener("keydown", KeyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler,false);
}
play();

function drawBlack()
{
    
     ctx.beginPath();    
     ctx.fillStyle = "black";
     ctx.fillRect(0,0,500,100);
     ctx.fillStyle ="white";
     ctx.font = "30px Arial";
     ctx.fillText("BasketBoom!  Score: "+scoreNum,20,30);
     ctx.fill();
     ctx.closePath();
     
}
function drawCourt()
{
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0,300,200,3);
    ctx.arc(250,300,50,0,Math.PI*2);
    ctx.fillRect(300,300,200,3);
    ctx.fill();
    ctx.closePath();

}

function drawRobber()
{
    ctx.fillStyle="tan";
    ctx.fillRect(xPos,100-robberH,robberW, robberH);
    ctx.fillStyle = "black";
    ctx.fillRect(xPos+15,115-robberH, 3,3);
    ctx.fillRect(xPos+30,115-robberH, 3,3);
    ctx.fillRect(xPos+13,125-robberH,22,3);
    ctx.fillRect(xPos+13,122-robberH,3,3);
    ctx.fillRect(xPos+32,122-robberH,3,3);
    ctx.fillStyle ="maroon";
    ctx.fillRect(xPos,105-robberH,robberW,5);
    ctx.font = "12px Arial";
    ctx.fillText("23",xPos+17,robberH+40);
    xPos = xPos+robSpeed;
    //robCount++;
}
function robberBounds()
{
    if(xPos+robSpeed>canvas.width-robberW||xPos+robSpeed<0)
    {
        robSpeed=robSpeed*-1;
    }
    if(xPos === random||xPos===random2||xPos===random3)
    {
        robSpeed=robSpeed*-1;
        random = Math.floor(Math.random()*500);
        random2= Math.floor(Math.random()*500);
        random3= Math.floor(Math.random()*500);
    }
}
function drawBalls()
{
    for(var a=0;a<balls.length;a++)
    {
        ctx.beginPath();
        ctx.fillStyle = "orange";
        ctx.arc(balls[a].x,balls[a].y,ballRadius,0,Math.PI*2);
       ctx.fill();
       ctx.closePath();
    }
}

function drawBasket()
{
    ctx.fillStyle="white";
    ctx.fillRect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle="red";
    ctx.fillRect(paddleX,(canvas.height-paddleHeight),paddleWidth,(paddleHeight-30));
}

function play()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCourt();
    drawBalls();
    drawBlack();
    drawRobber();
    drawBasket();  
    robberBounds();  
    score();

    for(var j=0;j<balls.length;j++)
    {
        balls[j].y = balls[j].y+balls[j].speed;
    }
    if(fall==true)
    {
        balls[0].speed=1;
        for(var a = 1;a<balls.length;a++)
        {
            if(balls[a-1].y==canvas.height/4)
            {
                balls[a].speed = 1;
                balls[a].x = xPos;
            }
            
        }
    }
    if(rightPressed==true&&paddleX<canvas.width-paddleWidth)
    {
     paddleX=paddleX+paddleSpeed;
    }
    if(leftPressed==true&&paddleX>0)
    {
        paddleX=paddleX-paddleSpeed;
    }
}

function score()
{
    for(var i=0;i<numBalls;i++)
    {
        if(balls[i].y==canvas.height-paddleHeight)
        {
            if(balls[i].x>=paddleX&&balls[i].x<=paddleX+paddleWidth)
            {
                scoreNum+=10;
                if(scoreNum%100==0)
                {
                    for(var i=0;i<numBalls;i++)
                    {
                        balls[i]={ x: xPos+15, y:100-robberH, speed:0};
                    }
                }
                if(scoreNum==200)
                {
                    robSpeed=2;
                    paddleSpeed=2;
                }
                if(scoreNum==500)
                {
                    robSpeed=2;
                    paddleSpeed=2;
                }
            }
            else
            {
                fall=false;
                if(life==0)
                {
                    
                    clearInterval(interval);
                   interval = setInterval(question,1);

                }
                if(life==1)
                {
                  clearInterval(interval);
                    interval = setInterval(endScreen,1);
                }
            }  
        } 
    }
}

function endScreen()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "50px Times New Roman";
    ctx.fillText("GAME OVER", 100, 200);
    ctx.font = "24px Times New Roman";
    ctx.fillText("Score: "+scoreNum,190,225)
    ctx.fillText("Refresh to play again", 145, 470);
    ctx.closePath();
}
function winScreen()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "green";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "50px Times New Roman";
    ctx.fillText("CORRECT", 140, 200);
    ctx.font = "24px Times New Roman";
    ctx.fillText("Score: "+scoreNum,190,225)
    ctx.fillText("Refresh to play again", 145, 470);
    ctx.closePath();
}

function question()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "20px Times New Roman";
    ctx.fillText("Press A,B,C, or D on your keyboard to answer", 20, 400);
    makeQA();

    if(aGuess == true)
    {
        if(answers[randomAnswer1] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(bGuess == true)
    {
        if(answers[randomAnswer2] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(cGuess == true)
    {
        if(answers[randomAnswer3] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(dGuess == true)
    {
        if(answers[randomAnswer4] == answers[0])
        {
            response = true;
        }
        else
        {
            response = false;
        }
    }
    if(response==true)
    {
        clearInterval(interval);
        setInterval(winScreen,1);
        
    }
    if(response==false)
    {
        clearInterval(interval);
        setInterval(endScreen,1);
    }
    ctx.closePath();

}

function makeQA()
{
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("What is the derivative of " + firstNum + "x^" + exponent+"?", 20, 100);
    ctx.font = "24px Arial";
    ctx.fillText("A] " + answers[randomAnswer1], 20, 175);
    ctx.fillText("B] " + answers[randomAnswer2], 20, 225);
    ctx.fillText("C] " + answers[randomAnswer3], 20, 275);
    ctx.fillText("D] " + answers[randomAnswer4], 20, 325);
    ctx.closePath();
    
}

function KeyDownHandler(e)
{
    if(e.keyCode==39)
        rightPressed=true;
    else if(e.keyCode==37)
        leftPressed=true;
    else if(e.keyCode==65)
    {
        aGuess = true;
    }
    else if(e.keyCode==66)
    {
        bGuess = true;
    }
    else if(e.keyCode==67)
    {
        cGuess = true;
    }
    else if(e.keyCode==68)
    {
        dGuess = true;
    }
}
function keyUpHandler(e)
{
    if(e.keyCode==39)
        rightPressed=false;
    else if(e.keyCode==37)
        leftPressed=false;
    else if(e.keyCode==65)
    {
        aGuess = false;
    }
    else if(e.keyCode==66)
    {
        bGuess = false;
    }
    else if(e.keyCode==67)
    {
        cGuess = false;
    }
    else if(e.keyCode==68)
    {
        dGuess = false;
    }
}
