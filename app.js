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
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score'); // New: Element to display score

let currentQuestionIndex = 0;
let timer;
let score = 0; // New: Variable to track score
const totalTimePerQuestion = 15;

// Function to start the timer
function startTimer() {
    let timeLeft = totalTimePerQuestion;
    timerElement.textContent = `Time left: ${timeLeft} seconds`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            timerElement.textContent = 'Time up!';
            proceedToNextQuestion();
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
    resultElement.textContent = '';

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
        score++; // Increment score for correct answer
    } else {
        resultElement.textContent = 'Wrong!';
    }
    updateScore(); // Update score display
    setTimeout(proceedToNextQuestion, 1000);
}

// Function to update the score display
function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

// Function to proceed to the next question
function proceedToNextQuestion() {
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
    resultElement.textContent = `Final Score: ${score}/${quizData.length}`;
    timerElement.textContent = '';
    clearInterval(timer);
    submitButton.style.display = 'none';
}

// Start quiz on page load
loadQuestion();
updateScore(); // Update score display initially
