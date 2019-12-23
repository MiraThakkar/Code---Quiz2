var startBtn = $("#start");
var countEl = document.querySelector("#count");
var countE2 = $("#count");
var questionEl = $("#question");
var choice = $(".option");
var counter = 300;
var int = 0;
var inputInitial = $("#inputInitial");
var submitBtn = $("#submit");
var finalScoreEl = document.querySelector("#finalScore");
var highscorevalueEl = document.querySelector("#highscorevalue");
var lastQuestionIndex = questions.length - 1;
var qustionIndex = 0;

//  console.log(inputInitial.innerHTML);

//setCounterText to set the text of the counter 
function setCounterText() {
  countEl.textContent = counter;
};

//Start button event listner to start the quiz when user clicks on the "Start Quiz" button
startBtn.on("click", function(){

  $("#home").hide();
  $("#quiz").show();
  int = setInterval(function(){
      counter--;  
      setCounterText();
      
      if (counter  <= 0){
          counter=0;
          setCounterText();
          endQuiz();
      }
    }, 1000)
    
  renderQuestion();
    
});



function renderQuestion() {

  questionIndex = Math.floor(Math.random() * questions.length);
  questionEl.text(questions[questionIndex].question);
  for(i=0; i< choice.length; i++){
    choice[i].innerHTML = questions[questionIndex].choices[i];
  }

};


//this function is invoked when user clicks the option

$(".option").on("click", function(event){
  
  var userAnswer = event.target.textContent;
  var resultEl = document.querySelector("#result");
  if(userAnswer == questions[questionIndex].answer){    
    //$("#quiz").append("<hr>");
    //result.text("Correct!");
    //$("#quiz").append(result);
    $("#resultDiv").show();
    resultEl.innerHTML = "Correct!";
    $("#resultDiv").fadeOut(2000);
    //resultEl.fadeOut();
    //resultE1.hide();
  }
  else{
    counter= counter-10;
    if (counter <= 0) {
      counter = 0;
    }
   
    setCounterText();
    $("#resultDiv").show();
    resultEl.innerHTML = "Wrong!";
    $("#resultDiv").fadeOut(2000);
  }

  questions.splice(questionIndex, 1);
  
  if (questions.length > 0) {
    renderQuestion ();  
  } else {
    endQuiz();
  }
  


});

function endQuiz(){
  finalScoreEl.textContent = counter;
  clearInterval(int);
  $("#quiz").hide();
  $("#scorecard").show();
  
}

//Score high score into local storage

submitBtn.on("click", function(event){
  event.preventDefault();
  var inElement = document.querySelector("#inputInitial").value;
  if (inElement == ""){
    return;
  }else{
    //Store in local storage
    var StoredInitial = localStorage.getItem("Initial");
    var StoredScore = localStorage.getItem("Score");
    console.log("From Submit button: " + StoredScore);
    if (StoredScore < counter) {
      localStorage.setItem("Score",  counter);
      localStorage.setItem("Initial", inElement);
      document.querySelector("#congratz").innerHTML = "Congratulations! " + inElement + " This is new highest score: " + counter;
    }
    document.querySelector("#yourscore").innerHTML = inElement + " : " + counter;
  }  
});

$(".showhighscore").on("click", function(){
  var StoredInitial = localStorage.getItem("Initial");
  var StoredScore = localStorage.getItem("Score");
  clearInterval(int);
  $("#home").hide();
  $("#quiz").hide();
  $("#scorecard").hide();
  $("#highscore").show();
  
  //highscorevalueEl.textContent = StoredInitial;
  //hsvalueEl.innerHTML = StoredScore;
  document.querySelector("#highscorevalue").innerHTML = StoredInitial + " : " + StoredScore;
  console.log("From Show High Score button: " + StoredScore);
});

$("#reset").on("click",function(){
  window.location.reload();
})















































