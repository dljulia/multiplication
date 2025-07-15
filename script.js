const startButton = document.querySelector(".start");
const launchPage = document.querySelector(".launch");
const gamePage = document.querySelector(".game");
const firstNumber = document.querySelector(".first-number");
const secondNumber = document.querySelector(".second-number");
const answer = document.querySelector(".answer");
const nextNumber = document.querySelector(".next");
const cancelNumber = document.querySelector(".cancel");
const buttonsContainer = document.querySelector(".buttons");
const timer = document.querySelector(".timer");
const correct = document.querySelector(".correct");
const mistake = document.querySelector(".mistakes");
const timeText = document.querySelector(".time-text");
const correctText = document.querySelector(".correct-text");
const mistakeText = document.querySelector(".mistake-text");
const arrowBack = document.querySelector('.arrow-back');
const rightAnswer = document.querySelector('.right-answer');

const table = [];

for (let i = 2; i <= 9; i++) {
  for (let j = 2; j <= 9; j++) {
    table.push({
      a: i,
      b: j,
      result: i * j
    });
  }
}

let activeArr = [];
let numberIndex = 0;
let correctCounter = 0;
let mistakeCounter = 0;
let seconds = 0;
let minutes = 0;

// Функция перемешивания массива
function shuffle(arr){
	for(let i = 0; i < arr.length; i++){
		const randomIndex = Math.floor(Math.random() * arr.length);
		const temp = arr[randomIndex];
		arr[randomIndex] = arr[i];
		arr[i] = temp;
	}
	return arr;
}

// Функция форматирования времени
function format(value) {
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
}

// Функция таймера
function timerStart() {
  timerId = setInterval(() => {
    if (seconds == 59) {
      seconds = 0;
      minutes += 1;
    } else {
      seconds++;
    }
    timer.textContent = `${format(minutes)}:${format(seconds)}`;
  }, 1000);
}

// Кнопка старт
startButton.addEventListener("click", () => {
  launchPage.classList.add("hidden");
  gamePage.classList.remove("hidden");

  timeText.textContent = `00:00`;
  correctText.textContent = `0`;
  mistakeText.textContent = `0`;

  activeArr = shuffle(shuffle(shuffle(table)).slice(0, 36));
  console.log(activeArr);
  firstNumber.textContent = `${activeArr[numberIndex].a} `
  secondNumber.textContent = ` ${activeArr[numberIndex].b}`
  timerStart();
});

// Следующий
nextNumber.addEventListener("click", () => {
  const correctAnswer = activeArr[numberIndex].result;

  if (parseInt(answer.value) == correctAnswer) {
    correctCounter++;
    correct.textContent = correctCounter;

    setTimeout(() => {
      if (numberIndex == (activeArr.length - 1)) {
        finish();
        resetData();
        return;
      }
  
      numberIndex += 1;
      firstNumber.textContent = `${activeArr[numberIndex].a} `
      secondNumber.textContent = ` ${activeArr[numberIndex].b}`
      answer.value = "";
    }, 1);
  } else {
    answer.classList.add("error");
    rightAnswer.textContent = correctAnswer;

    mistakeCounter++;
    mistake.textContent = mistakeCounter;

    activeArr.push(activeArr[numberIndex]);
    console.log(activeArr);

    setTimeout(() => {
      if (numberIndex == (activeArr.length - 1)) {
        finish();
        resetData();
        return;
      }

      numberIndex += 1;
      firstNumber.textContent = `${activeArr[numberIndex].a} `
      secondNumber.textContent = ` ${activeArr[numberIndex].b}`
      answer.value = "";
      answer.classList.remove("error");
      rightAnswer.textContent = "";
    }, 800)
  }
});

// Функция завершения игры
function finish() {
  clearInterval(timerId);
  gamePage.classList.add("hidden");
  launchPage.classList.remove("hidden");
  timeText.textContent = `${format(minutes)}:${format(seconds)}`;
  correctText.textContent = `${correctCounter}`;
  mistakeText.textContent = `${mistakeCounter}`;
}

// Функция сброса данных
function resetData() {
  seconds = 0;
  minutes = 0;
  timer.textContent = `${format(minutes)}:${format(seconds)}`;

  correctCounter = 0;
  mistakeCounter = 0;
  correct.textContent = correctCounter;
  mistake.textContent = mistakeCounter;

  activeArr = [];
  numberIndex = 0;
  answer.value = "";

  answer.classList.remove("error");
  rightAnswer.textContent = "";
}

// Запись ответа
buttonsContainer.addEventListener("click", (event) => {
  const element = event.target.closest(".number-button");

  if (answer.value.length == 2) {
    return
  }

  answer.value += element.textContent;
});

// Удаление символа
cancelNumber.addEventListener("click", () => {
  answer.value = answer.value.slice(0, -1);
});


// Стрелка вернуться Назад
arrowBack.addEventListener("click", () => {
  clearInterval(timerId);
  gamePage.classList.add("hidden");
  launchPage.classList.remove("hidden");

  resetData();
});