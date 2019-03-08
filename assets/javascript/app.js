console.log('app.js')
// Triva Questions
const triviaQuestions = [
  {
    question: "Question 1",
    choices: ["1a", "1b", "1c", "1d"],
    answer: 1,
    img: '../images/download.jpeg'
  },
  {
    question: "Question 2",
    choices: ["test the button longer choice", "f", "g", "h"],
    answer: 2
  },
  {
    question: "Question 3",
    choices: ["3a", "3b", "3c", "3d"],
    answer: 3
  },
  {
    question: "Question 4",
    choices: ["a", "b", "c", "d"],
    answer: 4
  },
  {
    question: "Question 5",
    choices: ["a", "b", "c", "d"],
    answer: 1
  },
  {
    question: "This is Question 6",
    choices: ["a", "b", "c", "d"],
    answer: 2
  },
];

// **Global Variables**
// Set question index number
let i = 0;
let arrayLength = triviaQuestions.length;
// Questions counter
let questionsCount = 0;
let questionsCorrect = 0;
let questionsWrong = 0;
// timer counter;
let number = 10;

// jQuery 
$(document).ready(function () {



  // Start Button
  $("#start-button").on("click", function () {
    console.log("start button")
    // Remove Start Game section ".start-container" and ".header-description"
    $(".start-container").remove()
    $(".header-description").remove()
    // Invoke loadGameQuesions functions - pass in triviaQuesions array
    loadGameQuestions(triviaQuestions);
  });

  // ***Questions Section***
  // Start timer function
  const startTimer = () => {
    // Begin timer countdown at:
    let number = 11;
    // Variable for interval ID to reset timer
    let intervalID;
    // Clear intervalID prior to setting new timer to allow multiple instances
    clearInterval(intervalID);
    intervalID = setInterval(decrementGameTimer, 1000);
  }

  function decrementGameTimer() {
    number = 11;
    number--;
    // Display timer number in #question-timer tage
    $("#question-timer").html(
      "<p>" + "seconds: " + number + "</p>"
    )
    // Condtion to stop timer
    if (number === 0) {
      // Invoke stopTimer function();
      stopTimer();
    }
    // stopTimer function();
    function stopTimer() {
      console.log('stopTimer function invoked')
      // Pass name of interval variable to clearInternal method
      clearInterval(intervalID);
    }
  };

  // Load Questions
  // Display Questions 
  const loadGameQuestions = (questionsArr) => {

    console.log(questionsArr.length)
    console.log(i)
    if (i >= arrayLength) {
      console.log('loasGameQuestion index no: ', i, arrayLength)
      gameStats();
    } else {

      // startTimer(11);

      let gameQuestion = questionsArr[i].question;
      let gameQuestionChoices = questionsArr[i].choices;
      let gameQuestionAnswer = questionsArr[i].answer;

      // Display timer
      $("#question-timer").html(
        "<p>" + `Time Remaining: ${number} Seconds` + "</p>"
      )
      // Display question
      console.log('gameQuestions invoked')
      $("#game-questions").html(
        "<p>" + gameQuestion + "</p>"
      );

      // Create four buttons - one for each choice
      for (let i = 0; i <= 3; i++) {
        // Create a variable called "choiceButton" - set to new <button>
        let choiceButton = $("<button>");
        // Add a class to choiceButton - called choice-style
        choiceButton.addClass("choice-button choice-style")
        // Give the each "choiceButton" a data-attribute called "data-choice"
        choiceButton.attr("data-choice", i + 1);
        // Give each "choiceButton" a text value
        choiceButton.text(gameQuestionChoices[i]);
        // Append each "choiceButton" to "game-questions-choices" class
        $(".game-questions-choices").append(choiceButton)
      }
      // Create on on-click event for each choice-button
      $(".choice-button").on("click", function () {
        // Store user choice to "userSelection" variable
        let userSelection = $(this).attr("data-choice");
        // invoke checkAnswer function
        checkAnswer(userSelection, gameQuestionAnswer)
      })
    }
  };
  // ***End Questions Section***

  // ***Check Selection Section***
  const checkAnswer = (choice, answer) => {
    // Convert choice to integer for comparison with answer
    choice = parseInt(choice)
    console.log('checkChoice fuction answer ', choice)
    console.log('checkAnswer fuction answer ', answer)
    if (choice === answer) {
      console.log('correct')
      // Update Global count
      i++;
      questionsCorrect++;
      questionsCount++;
      // Remove prior question and choice buttons
      $(".game-questions-choices").text("")


      // Global Global Count
      console.log("index", i)
      console.log('question count', questionsCount);
      console.log('questions correct', questionsCorrect);
      console.log('questions wrong', questionsWrong);

      // Invoke Trivia message for correct answer response
      correctResponse();

    } else {
      console.log('wrong')
      // Update count
      i++
      questionsWrong++
      questionsCount++
      // Remove prior question and choice buttons
      $("#game-questions").text("");
      $(".game-questions-choices").text("")
      // Display next question

      // Global Count
      console.log("index", i)
      console.log('question count', questionsCount);
      console.log('questions correct', questionsCorrect);
      console.log('questions wrong', questionsWrong);

      // Invoke Trivia message for wrong answer response
      wrongResponse();
    }
  };

  // Display correct response message
  const correctResponse = () => {
    console.log('correctResponse question count', i)
    // $("#correct-response").text('Correct Answer')
    $("#game-questions").html(
      "<p>" + `${triviaQuestions[i - 1].answer} is the correct answer` + "</p>"
    );
    // 3 seconds countdown (setTimeout) before showing next question
    setTimeout(function () {
      console.log('setTimeout method')
      loadGameQuestions(triviaQuestions)
    }, 4000)
    // $("#correct-response").remove();
  };

  // Display wrong resonse message
  const wrongResponse = () => {
    // $("#wrong-response").text('Wrong Answer')
    $("#game-questions").html(
      "<p>" + `Your are wrong.  ` + `${triviaQuestions[i - 1].answer} is the correct answer` + "</p>"
    );
    // 3 seconds countdown (setTimeout) before showing next question
    setTimeout(function () {
      console.log('setTimeout method')
      loadGameQuestions(triviaQuestions)
    }, 3000)
    // $("#wrong-response").remove();
  }

  // ***End Check Selection Section***


  // ***Game Stats Sections
  const gameStats = () => {
    // Remove content
    $("#question-container").remove()
    console.log('gameStats function')
    $("#stats-message").html(
      "<p>" + `Game is completed` + "</ps>"
    )
  }

  // ***End Game Stats Sections

  // Initial Game Setup
  const startGame = () => {

  }
  // Invoke startGame function
  startGame();


});
