// Quiz data
const quizData = [
    {
        question: "What is Git?",
        answers: [
            { option: "A distributed version control system", correct: true },
            { option: "A cloud storage service", correct: false },
            { option: "A programming language", correct: false },
            { option: "An operating system", correct: false }
        ]
    }
];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const resultElement = document.getElementById('result');
const submitButton = document.getElementById('submit-btn');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let timer;
const totalTimePerQuestion = 15;

// Function to start the timer
function startTimer() {
    let timeLeft = totalTimePerQuestion;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timerElement.textContent = `Time left: ${timeLeft} seconds`;
            timeLeft--;
        } else {
            clearInterval(timer);
            timerElement.textContent = 'Time up!';
            showFinalScore();
        }
    }, 1000);
}

// Function to load question and answers
function loadQuestion() {
    clearInterval(timer);
    timerElement.textContent = `Time left: ${totalTimePerQuestion} seconds`;
    startTimer();

    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    answersElement.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const optionButton = document.createElement('button');
        optionButton.textContent = answer.option;
        optionButton.classList.add('option-btn');
        optionButton.addEventListener('click', () => checkAnswer(answer.correct));
        answersElement.appendChild(optionButton);
    });
}

// Function to check the selected answer
function checkAnswer(correct) {
    clearInterval(timer);
    if (correct) {
        resultElement.textContent = 'Correct!';
    } else {
        resultElement.textContent = 'Wrong!';
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// Function to show final score
function showFinalScore() {
    questionElement.textContent = 'Quiz Complete!';
    answersElement.innerHTML = '';
    resultElement.innerHTML = `Quiz Complete!`;
    submitButton.style.display = 'none';
    clearInterval(timer);
}

// Start quiz on page load
loadQuestion();
