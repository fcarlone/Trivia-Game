console.log('app.js')
// Triva Questions
const trivaQuestion = [
  {
    question: "Question 1",
    choices: ["a", "b", "c", "d"],
    answer: 1
  },
  {
    question: "Question 2",
    choices: ["a", "b", "c", "d"],
    answer: 2
  },
  {
    question: "Question 3",
    choices: ["a", "b", "c", "d"],
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
];


// jQuery 
$(document).ready(function () {


  // Start Button
  $("#start-button").on("click", function () {
    console.log("start button")
    // Remove Start Game section ".start-container"
    $(".start-container").hide(1000)
    // Invoke start timer function
    startTimer();
  });

  // ***Question Section***
  // Start timer function
  const startTimer = () => {
    // Begin timer countdown at:
    let number = 11;
    // Variable for interval ID to reset timer
    let intervalID;
    // Clear intervalID prior to setting new timer to allow multiple instances
    clearInterval(intervalID);
    intervalID = setInterval(decrementGameTimer, 1000);

    function decrementGameTimer() {
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
    }
  }
  // ***End Question Section***

});
