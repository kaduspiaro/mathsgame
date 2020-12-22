var playing = false;
var score;
var timeremaining;
var correctAnswer;
var correctPosition;
var wrongAnswer;
//when we click start/reset button
document.getElementById("startreset").onclick = function(){
    //if playing game
    if(playing == true){
        location.reload();
    }else {//if game not playing
        playing = true;
        
        //change 'start game' status to 'reset game' status
document.getElementById("startreset").innerHTML = "Reset Game";       
        
        //showtime remaining
document.getElementById("timeremaining").style.display = "block";
        timeremaining = 60;
        
        //set score to 0
        score = 0;
document.getElementById("scorevalue").innerHTML = score;
        
        //show time countdown from 60 sec to 0
        countDown();
        
        //hide game over
        hide("gameover");
        
        //generate Q & A
        generateQA();
        
    }
} 



//FUNCTIONS
function countDown() {
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){//game over
            //stop countdown
            stopCountdown();
            
            playing = false;
            hide("wrong");
            hide("correct");
            hide("timeremaining")
            show("score");  //show score
            show("gameover");   //show gameover box
document.getElementById("startreset").innerHTML = "Start Game"
document.getElementById("gameover").innerHTML = "<p>Game over</p><p>Your score is " + score + "</p>"
            
        }
    },1000);
}


function stopCountdown() {
    clearInterval(action);
}
function show(id) {
    document.getElementById(id).style.display = "block";
}
function hide(id) {
    document.getElementById(id).style.display = "none";
}

//generate question & multiple answers
function generateQA(){
    var x = 1 + Math.round(Math.random()*9);
    var y = 1 + Math.round(Math.random()*9);
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x + "x" + y;
    
    correctPosition = 1 + Math.round(Math.random()*3);
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer;//fill one box with the correct answer
    
    //fill other boxes with wrong answers
    for(i=1; i<5; i++){
        if(i != correctPosition){
            wrongAnswer;
            answers = [correctAnswer];
            do{
                wrongAnswer = (1 + Math.round(Math.random()*9)) * (1 + Math.round(Math.random()*9));
            }while(answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

//clicking on an answer
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    if(playing==true){
        if(this.innerHTML == correctAnswer){ //if box content = correct answer
            score++;  //increase score by 1
            document.getElementById("scorevalue").innerHTML = score; //updating the value of score
            
            //show correct box and hide wrong one
            show("correct");
            hide("wrong");
            setTimeout(function(){
                hide("correct")
            },1000)
            
            generateQA();
          
            //show wrong box and hide correct one 
        }else{
            show("wrong");
            hide("correct");
            setTimeout(function(){
                hide("wrong")
            },1000)
        }
    }
}
}