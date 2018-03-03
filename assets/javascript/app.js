// global variables
var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswer = 0;
var arrayCount = 0;
var count = Math.floor(Math.random() * 3);
var wait;
var rightAns;
var timer;
var clockRunning = false;

// function to reset page
function resetPage(){
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  arrayCount = 0;
  count = Math.floor(Math.random() * 3);
  wait;
  rightAns;
  timer;
  clockRunning = false;
  time.stop();
  $("#startOver").hide();
  $("#didYouWin").empty();
  $("#correctWas").empty();
  $("#startButton").show();
  $('#ans0').empty();
  $("#ans1").empty();
  $("#ans2").empty();
  $('#ans3').empty();
  $("#stats").empty();
  $("#timer").html("Time Remaining: 30 Seconds"); 
  }

// function to create new images. 
function createImage(src){
  var img = new Image();
  img.src = src;
  return img;
}

// store images in new variables
var question1pic = createImage("https://cdn.movieweb.com/img.news.tops/NELkSwcQNVnKPT_1_b/The-Dark-Knight-Movie-Facts-Trivia.jpg");
var question2pic = createImage("https://www.proprofs.com/quiz-school/topic_images/p19eblic5mvhd1ki8t0j14jhe7b3.jpg");
var question3pic = createImage("https://static2.stuff.co.nz/1342577372/231/7302231.jpg");

// array to hold images
var myImages = [question1Pic, question2Pic, question3Pic];

// time object
var time = {
  timeLeft: 30,

  // reset timer
  reset: function(){
    time.timeLeft = 30;
    $("#timer").html("Time Remaining: 30 Seconds")

    if(!clockRunning){
      timer = setInterval(time.count, 1000);
      clockRunning = true;
    }
  },
  
  // starts clock
  start: function(){
   if(!clockRunning){
     timer = setInterval(time.count, 1000);
     clockRunning = true;
   } 
  },

  //stops clock
  stop: function(){
    clearInterval(timer);
    clockRunning = false
  },

  count: function(){
    // increments time by 1
    time.timeleft --;

    // display the countdown on page
    $("#timer").html("Time Remaining: " + time.timeLeft + " Seconds");
  
    if(time.timeLeft <= 0){
      clearInterval(timer);
      clockRunning = false;
      // Call the outOfTime function.
      outOfTime();
    }
  }
}

// nextQueston Function - is called when user gets an answer correct, incorrect, or runs out of time.
function nextQuestion(){

  // If the player hasn't answered all questions, move to next question, else call the "gameOver Function"
  if (arrayCount <= 1) {
    // Timer starts.
    time.reset();

    // Add one to arrayCount so it goes to the next question.
    arrayCount++;

    // Write the question at trivia[i] to the question div.
    $('#question').html(triviaArray[arrayCount].question);


  // Empty Correct Screen elements.
  $('#didYouWin').empty();
  $('#didYouWinPic').empty();
  $('#correctWas').empty();

      // Nested for loop to assign answers.
      for (var j = 0; j < 4; j++) {				
        
        // Write answers to the answers div's.
        $("#ans" + j).append("<div class = 'answer'>" + triviaArray[arrayCount].answers[count] + "</div>");
        count++;
        
        if (count === 4) {
          count-=4;
        }
      
      }
    }
    else{
      gameOver();
    }
  }

  	// Correct Function - call when the user's guess was correct.		
		function Correct(){
			// Show the Win Screen
			$('#question').empty();
			$('h3').empty();
			$('#didYouWin').html("CORRECT!!!");
			$('#didYouWinPic').html(myImages[arrayCount]);
			
			// correctAnswer++;
			correctAnswer++;

			// Wait 5 seconds then call the setTimeOut Function. This triggers the next question and answer.
			wait = setTimeout(nextQuestion, 5000);
		}
		

	// Incorrect Function - call when the user's guess was incorrect.
		function Incorrect(){
			// Show the Lose Screen
			$('#question').empty();
			$('h3').empty();
			$('#didYouWin').html("WRONG ANSWER");
			$('#didYouWinPic').html(myImages[arrayCount]);
			$('#correctWas').html("The correct answer was " + rightAns);
			
			// incorrectAnswer++;
			incorrectAnswer++;

			// Wait 5 seconds then call the setTimeOut Function. This triggers the next question and answer.
			wait = setTimeout(nextQuestion, 5000);
		}


	// Out of Time Function - call when the user runs out of time. 
		function outOfTime(){
			
			// Check if their answer is correct.
			rightAns = triviaArray[arrayCount].correct;
			
			// Show the out of time screen
			$('#question').empty();
			$('h3').empty();
			$('#didYouWin').html("OUT OF TIME");
			$('#correctWas').html("The correct answer was " + rightAns);
			$('#didYouWinPic').html(myImages[arrayCount]);
			
			// unanswered++;
			unanswered++;

			// Wait 5 seconds then call the setTimeOut Function. This triggers the next question and answer.
			wait = setTimeout(nextQuestion, 5000);
		}

	// gameOver Function - call when the player has answered all questions.
		function gameOver(){
			$("#stats").html("All done! Here are your stats:");
			$("#ans0").html("Correct Answers: " + correctAnswer);
			$("#ans1").html("Incorrect Answers: " + incorrectAnswer);
			$("#ans2").html("Unanswered: " + unanswered);
			$("#didYouWinPic").empty();
			$('#didYouWin').empty();
			$("#startOver").show();
			$("#correctWas").empty();
		}
		

// Trivia Function - holds questions & answers array.
	function Trivia(question, answer1, answer2, answer3, correct){
		this.question = question;
		this.answers = [answer1, answer2, answer3, correct];
		this.correct = correct;		
	};

	// trivia1 object - holds the first question and potential answers.
		var trivia0 = new Trivia();
	// Trivia2 object - holds the second question and potential answers.
		var trivia1 = new Trivia();
	// Trivia3 object - holds the third question and potential answers.
		var trivia2 = new Trivia();

	// Array an my trivia objects. 
		var triviaArray = [trivia0, trivia1, trivia2];
	


$(document).ready(function(){
//------------------------------------------------------------------------------------------------
	// Hide the start over button. 
	$("#startOver").hide();

	// Function for when the user clicks start.
		$('#startButton').click(function(){

			// Start button disappears.
			$('#startButton').hide();
			$("#didYouWin").empty();
			$("#correctWas").empty();

			// Timer starts.
			time.start();		
									
			// Write the question at trivia[i] to the question div.
			$('#question').html(triviaArray[arrayCount].question);

			// Nested for loop to assign answers.
			for (var j = 0; j < 4; j++) {				
				
				// Write answers to the answers div's = this is saying trivia[j].answer[j]
				$("#ans" + j).append("<div class = 'answer'>" + triviaArray[arrayCount].answers[count] + "</div>");
				count++;
				
				if (count === 4) {
					count-=4;
				}
			
			}

		})

	// Function for when the user clicks an answer.
		$('h3').click(function(){

			// If the user clicks on an answer, timer pauses.
			time.stop();

			
			// Check if their answer is correct.
			rightAns = triviaArray[arrayCount].correct;
			var clickedAns = $(this).text();
			
			// If else for correct/incorrect.
			if (clickedAns == rightAns) {
				
				// Run the 'Correct Function'.
				Correct();
			}
			else{
				
				// Run the 'Incorrect Function'.
				Incorrect();
			}
						
		})

	// When the player clicks Start Over, the page reloads. 
	$("#startOver").click(function(){
		
		resetPage();
		// location.reload();
	})
	
	
});