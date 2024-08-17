"use strict";
// Map for questions
const questions = new Map();

const audio = new Audio();
// questions
questions.set("question1", {
  q: "How did Flori injured her toe?",
  a1: "Hit it on the furniture",
  a2: "While running",
  a3: "Someone stepped on it",
  a4: "Wearing high heels for hours cause she is too much of a diva to walk on regular shoes!",
  correct:
    "Wearing high heels for hours cause she is too much of a diva to walk on regular shoes!",
});

questions.set("question2", {
  q: "How does Flori plays with Reina?",
  a1: "She throws her the ball and ask her to fetch it",
  a2: "She wrestles with her like she is John Cena",
  a3: "She runs with her",
  a4: "She rubs her belly",
  correct: "She wrestles with her like she is John Cena",
});

questions.set("question3", {
  q: "What time Flori wakes up in the morning?",
  a1: "08:00",
  a2: "10:00",
  a3: "Lol! What do you mean waking up in the morning?",
  a4: "When see needs to pee",
  correct: "Lol! What do you mean waking up in the morning?",
});

questions.set("question4", {
  q: "What is the greatest sin according to Flori?",
  a1: "Wearing your shoes inside the house",
  a2: "Lying",
  a3: "Texting her too many times",
  a4: "Telling her that her hair are messy",
  correct: "Wearing your shoes inside the house",
});

questions.set("question5", {
  q: "When is Flori's Birthday?",
  a1: "16 Jan",
  a2: "27 Oct",
  a3: "05 March",
  a4: "11 June",
  correct: "11 June",
});

//question counter
let questionNumber = 0;

const answerButtons = document.querySelectorAll(".answer_button");

//adding event listener
for (const button of answerButtons) {
  button.addEventListener("click", checkAnswer);
}

answerButtons.forEach((button) => {
  button.addEventListener("touchend", function () {
    button.classList.remove("hover_button");
  });
});

answerButtons.forEach((button) => {
  button.addEventListener("touchstart", function () {
    button.classList.add("hover_button");
  });
});

// answerButtons.forEach((button) => {
//   button.addEventListener("mouseover", function () {
//     button.classList.add("hover_button");
//     console.log("mouseadd");
//   });
// });

// answerButtons.forEach((button) => {
//   button.addEventListener("mouseout", function () {
//     button.classList.remove("hover_button");
//     console.log("mouse");
//   });
// });

//Check answer based on choice
function checkAnswer(clickedButton) {
  const selectedAnswer =
    clickedButton.currentTarget.querySelector("p").textContent;
  if (selectedAnswer === questions.get("question" + questionNumber).correct) {
    clickedButton.currentTarget.classList.add("hover_button");
    questions.get("question" + questionNumber).correct = "Checked";
    document.querySelector("#pic h2").style.display = "none";
    document.querySelector("#pic p").style.display = "none";
    document.querySelector("#pic img").style.display = "block";
    if (questionNumber == questions.size) {
      winGame();
    } else {
      document.querySelector("#answers h2").textContent = "Correct Answer!!!";
      audio.play();
      setTimeout(setQuestion, 7000);
    }
  } else if (
    document.querySelector("#answers h2").textContent === "Choose an answer!!!"
  ) {
    document.querySelector("#answers h2").textContent = "Wrong Answer...";
  } else if (
    document.querySelector("#answers h2").textContent == "Correct Answer!!!"
  ) {
    document.querySelector("#answers h2").textContent =
      "Stop Clicking Asshole!";
  }
}

//function to set questions and reset
function setQuestion() {
  questionNumber++;
  answerButtons.forEach((button) => {
    button.classList.remove("hover_button");
  });
  audio.src = "Sounds/Audio" + questionNumber + ".mp3";
  document.querySelector("#pic img").src =
    "Images/Image" + questionNumber + ".gif";
  document.querySelector("#pic h2").style.display = "block";
  document.querySelector("#pic p").style.display = "block";
  document.querySelector("#pic img").style.display = "none";
  document.querySelector("#qNumber").textContent = questionNumber;
  document.querySelector("#pic p").textContent = questions.get(
    "question" + questionNumber
  ).q;
  document.querySelector("#b1 p").textContent = questions.get(
    "question" + questionNumber
  ).a1;
  document.querySelector("#b2 p").textContent = questions.get(
    "question" + questionNumber
  ).a2;
  document.querySelector("#b3 p").textContent = questions.get(
    "question" + questionNumber
  ).a3;
  document.querySelector("#b4 p").textContent = questions.get(
    "question" + questionNumber
  ).a4;
  document.querySelector("#answers h2").textContent = "Choose an answer!!!";
}

//Add fireworks
function createFirework() {
  const container = document.querySelector("#fireworks-container");

  for (let i = 0; i < 6; i++) {
    const firework = document.createElement("div");
    firework.classList.add("firework");

    // Set random position within the container
    const xPos = Math.random() * container.clientWidth;
    const yPos = Math.random() * container.clientHeight;

    firework.style.left = xPos + "px";
    firework.style.top = yPos + "px";
    container.appendChild(firework);
  }
}

// Win game function
function winGame() {
  answerButtons.forEach((button) => {
    button.classList.remove("hover_button");
  });
  createFirework();
  document.querySelector("#b1 p").textContent = "Happy";
  document.querySelector("#b2 p").textContent = "Birthday";
  document.querySelector("#b3 p").textContent = "To";
  document.querySelector("#b4 p").textContent = "You!";
  document.querySelector("#answers h2").textContent = "🎊Happy Birthday🎂";
  document.querySelector("#answers h2").classList.add("win_animation");
  document.querySelector("#pic img").src = "Images/Image5.jpg";

  audio.src = "Sounds/Audio5.mp3";
  audio.play();

  setTimeout(() => {
    document.querySelector("#pic img").src = "Images/Image6.jpg";
  }, 3000);
  setTimeout(() => {
    document.querySelector("#pic img").src = "Images/Image7.jpg";
  }, 6000);

  let counter = 1;
  setInterval(() => {
    if (counter == 1) {
      document.querySelector("#b4").classList.remove("hover_button");
    } else {
      document
        .querySelector("#b" + (counter - 1))
        .classList.remove("hover_button");
    }
    document.querySelector("#b" + counter).classList.add("hover_button");

    if (counter == 4) {
      counter = 1;
    } else {
      counter++;
    }
  }, 1000);
}

setQuestion();
