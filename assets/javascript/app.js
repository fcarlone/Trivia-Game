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
    choices: ["test the button longer choice", "test the button longer choice", "test the button longer choice", "test the button longer choice"],
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
let questionsUnanswered = 0;
// timer counter;
let intervalID;
let number = 10;

// jQuery 
$(document).ready(function () {

  // Start Button
  $("#start-button").on("click", function () {
    // Remove Start Game section ".start-container" and ".header-description"
    $(".start-container").remove()
    $(".header-description").remove()
    // Invoke loadGameQuesions functions - pass in triviaQuesions array
    startTimer();
    loadGameQuestions(triviaQuestions);
  });

  // ***Questions Section***
  // Start timer function
  const startTimer = () => {
    // Clear intervalID prior to setting new timer to allow multiple instances
    clearInterval(intervalID);
    intervalID = setInterval(decrementGameTimer, 1000);
  }

  function decrementGameTimer() {
    // Display timer
    $("#question-timer").html(
      "<p>" + `Time Remaining: ${number - 1} Seconds` + "</p>"
    );
    number--;
    // Condtion to stop timer
    if (number === 0) {
      // Invoke stopTimer function();
      stopTimer();
      // Update count
      i++
      questionsUnanswered++
      questionsCount++
      // Global Count
      console.log('question count', questionsCount);
      console.log('questions correct', questionsCorrect);
      console.log('questions wrong', questionsWrong);
      console.log('questions unanswered', questionsUnanswered);
      // Remove prior question and choice buttons
      $(".game-questions-choices").text("")
      // Invoke timeExpiredResponse function
      timeExpiredResponse();
    }
    // stopTimer function();
    function stopTimer() {
      console.log('stopTimer function invoked')
      // Pass name of interval variable to clearInternal method
      clearInterval(intervalID);
    }
  };

  // Load questions 
  const loadGameQuestions = (questionsArr) => {
    if (i >= arrayLength) {
      gameStats();
    } else {
      // Display inital timer
      $("#question-timer").html(
        "<p>" + `Time Remaining: ${number} Seconds` + "</p>"
      );

      let gameQuestion = questionsArr[i].question;
      let gameQuestionChoices = questionsArr[i].choices;
      let gameQuestionAnswer = questionsArr[i].answer;

      // Display question
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
    // Convert choice to integer for comparison with answer - may change
    choice = parseInt(choice)
    if (choice === answer) {
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
      // Update count
      i++
      questionsWrong++
      questionsCount++
      // Remove prior question and choice buttons
      $("#game-questions").text("");
      $(".game-questions-choices").text("")

      // Global Count
      console.log('question count', questionsCount);
      console.log('questions correct', questionsCorrect);
      console.log('questions wrong', questionsWrong);

      // Invoke Trivia message for wrong answer response
      wrongResponse();
    }
  };

  // Display correct response message
  const correctResponse = () => {
    // Clear interval
    clearInterval(intervalID);
    number = 10;
    console.log('correctResponse question count', i)

    $("#game-questions").html(
      "<p>" + `${triviaQuestions[i - 1].answer} is the correct answer` + "</p>"
    );
    // 3 seconds countdown (setTimeout) before showing next question
    setTimeout(function () {
      startTimer()
      loadGameQuestions(triviaQuestions)
    }, 3000)
    // $("#correct-response").remove();
  };
  // Display wrong resonse message
  const wrongResponse = () => {
    // Clear interval
    clearInterval(intervalID);
    number = 10;

    $("#game-questions").html(
      "<p>" + `You are wrong. ${triviaQuestions[i - 1].answer} is the correct answer` + "</p>"
    );
    // 3 seconds countdown (setTimeout) before showing next question
    setTimeout(function () {
      startTimer();
      loadGameQuestions(triviaQuestions)
    }, 3000)
  }
  const timeExpiredResponse = () => {
    // Clear interval
    clearInterval(intervalID);
    number = 10;

    $("#game-questions").html(
      "<p>" + `Time expired. ${triviaQuestions[i - 1].answer} is the correct answer` + "</p>"
    );
    // 3 seconds countdown (setTimeout) before showing next question
    setTimeout(function () {
      startTimer();
      loadGameQuestions(triviaQuestions)
    }, 3000)
  }

  // ***End Check Selection Section***


  // ***Game Stats Sections
  const gameStats = () => {
    // Stop timer
    clearInterval(intervalID)

    // Remove content
    $("#question-container").hide()
    console.log('gameStats function')
    $(".stats-message").html(
      "<p>" + `Game is completed` + "</p>"
    )
    // Show content
    $(".replay-game-button").show();
    $(".stats-game-score").append(
      `<p>Correct Answers: ${questionsCorrect}</p>`,
      `<p>Incorrect Answers: ${questionsWrong}</p>`,
      `<p>Unanswered: ${questionsUnanswered}</p>`
    );
    $(".stats-game-score").show(4000);
    $(".replay-game-button").show();
  }

  // Replay button on-click event
  $(".replay-game-button").on("click", function () {
    console.log('replay button');
    // Reset counters
    i = 0;
    questionsCount = 0;
    questionsCorrect = 0;
    questionsWrong = 0;
    questionsUnanswered = 0;
    // Remove stats content
    $(".stats-message").empty();
    $(".stats-game-score").empty();
    $(".replay-game-button").hide();
    // Add Content
    $("#question-container").show()
    startTimer();
    loadGameQuestions(triviaQuestions);
  })
  // ***End Game Stats Sections


  // Start Game
  const startGame = () => {
    $(".replay-game-button").hide()

  }
  // Invoke startGame function
  startGame();


});
