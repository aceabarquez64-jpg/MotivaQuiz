const quizData = [
    {
        question: "What is the component that holds the BIOS?",
        correctAnswers: ["motherboard", "mainboard", "mobo"],
        displayAnswer: "Motherboard"
    },
    {
        question: "What is the main storage device called?",
        correctAnswers: ["hard drive", "hard disk", "hdd", "hard disk drive"],
        displayAnswer: "Hard Drive"
    },
    {
        question: "What does RAM stand for?",
        correctAnswers: ["random access memory"],
        displayAnswer: "Random Access Memory"
    }
];

let currentQuestionIndex = 0;
let userAnswer = "";
let roundAnswers = [];
const initialPoints = parseInt(localStorage.getItem('userPoints')) || 230;
let userPoints = initialPoints;
let timeLeft = 180;
let timerInterval;
let streak = 0;
let correctCount = 0;
let totalAnswerTime = 0;
let questionStartTimestamp = Date.now();

let questionStartIndex = 1;

document.getElementById('userPoints').textContent = userPoints;
document.getElementById('accuracy').textContent = '0%';
document.getElementById('avgTime').textContent = '0s';
document.getElementById('streak').textContent = '0';

const answerInput = document.getElementById('answerInput');
answerInput.addEventListener('input', function () {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = this.value.trim() === '';
});

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timeRemaining').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showRoundSummary();
        }
    }, 1000);
}

function showConfidenceCheck() {
    userAnswer = answerInput.value.trim();
    if (userAnswer === '') return;
    document.getElementById('confidenceModal').classList.add('active');
}

function reviewAnswer() {
    document.getElementById('confidenceModal').classList.remove('active');
}

function confirmSubmit() {
    document.getElementById('confidenceModal').classList.remove('active');
    checkAnswer();
}

function checkAnswer() {
    const question = quizData[currentQuestionIndex];
    const normalizedAnswer = userAnswer.toLowerCase().trim();

    const isCorrect = question.correctAnswers.some(ans => normalizedAnswer === ans.toLowerCase());

    if (isCorrect) {
        correctCount++;
        streak++;
        userPoints += 25;
    } else {
        streak = 0;
    }

    const questionElapsedSeconds = Math.max(1, Math.round((Date.now() - questionStartTimestamp) / 1000));
    totalAnswerTime += questionElapsedSeconds;
    const answeredCount = roundAnswers.length + 1;

    roundAnswers.push({
        question: question.question,
        correct: isCorrect,
        userAnswer: userAnswer
    });

    const feedbackDiv = document.getElementById('feedbackMessage');
    if (isCorrect) {
        feedbackDiv.className = 'feedback-message correct';
        feedbackDiv.textContent = 'CORRECT! Nice work.';
    } else {
        feedbackDiv.className = 'feedback-message incorrect';
        feedbackDiv.textContent = 'INCORRECT. Keep going and review this topic after the round.';
    }

    document.getElementById('userPoints').textContent = userPoints;
    document.getElementById('accuracy').textContent = Math.round((correctCount / answeredCount) * 100) + '%';
    document.getElementById('avgTime').textContent = Math.round(totalAnswerTime / answeredCount) + 's';
    document.getElementById('streak').textContent = streak;

    answerInput.disabled = true;
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Continue';
    submitBtn.disabled = false;
    submitBtn.onclick = nextQuestion;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex >= quizData.length) {
        showRoundSummary();
        return;
    }
    document.getElementById('feedbackMessage').className = 'feedback-message';
    loadQuestion();
}

function loadQuestion() {
    questionStartTimestamp = Date.now();

    const question = quizData[currentQuestionIndex];
    const questionNumber = questionStartIndex + currentQuestionIndex;
    document.getElementById('currentQuestion').textContent = questionNumber;

    const progress = (currentQuestionIndex / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    document.getElementById('questionText').textContent = question.question;
    answerInput.value = '';
    answerInput.disabled = false;
    answerInput.focus();

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submit';
    submitBtn.onclick = showConfidenceCheck;
}

function showRoundSummary() {
    clearInterval(timerInterval);

    localStorage.setItem('round2Results', JSON.stringify(roundAnswers));

    const finalCorrectCount = roundAnswers.filter(a => a.correct).length;
    const passingScore = 2;
    const passed = finalCorrectCount >= passingScore;

    document.getElementById('summaryScore').textContent = finalCorrectCount;

    const summaryTitle = document.getElementById('summaryTitle');
    if (finalCorrectCount === 3) {
        summaryTitle.textContent = 'PERFECT SCORE!';
    } else if (passed) {
        summaryTitle.textContent = 'GREAT JOB!';
    } else {
        summaryTitle.textContent = 'NEEDS IMPROVEMENT';
    }

    const summaryList = document.getElementById('summaryList');
    summaryList.innerHTML = '';

    roundAnswers.forEach((answer, index) => {
        const item = document.createElement('div');
        item.className = 'summary-item';
        item.innerHTML = `
            <span class="summary-question">Q${questionStartIndex + index}: ${answer.question}</span>
            <span class="summary-icon">${answer.correct ? '✅' : '❌'}</span>
        `;
        summaryList.appendChild(item);
    });

    const modalButtons = document.querySelector('#summaryModal .modal-buttons');
    if (passed) {
        modalButtons.innerHTML = `
            <button class="modal-btn review" onclick="reviewRound()">Review round</button>
            <button class="modal-btn review" onclick="goHomeFromSummary()">Home</button>
            <button class="modal-btn continue" onclick="nextRound()">Advance to Next Round</button>
        `;
    } else {
        modalButtons.innerHTML = `
            <button class="modal-btn continue" onclick="retakeRound()">Retake round</button>
            <button class="modal-btn review" onclick="goHomeFromSummary()">Home</button>
            <button class="modal-btn review" onclick="reviewRound()">Review round</button>
        `;
    }

    localStorage.setItem('userPoints', userPoints);
    document.getElementById('summaryModal').classList.add('active');
}

function reviewRound() {
    goToReviewPage();
}

function nextRound() {
    localStorage.setItem('round2Results', JSON.stringify(roundAnswers));
    localStorage.setItem('userPoints', userPoints);
    alert('Congratulations! Advancing to Round 3...');
    window.location.href = 'round3.html';
}

function goToReviewPage() {
    localStorage.setItem('round2Results', JSON.stringify(roundAnswers));
    window.location.href = 'round2review.html';
}

function retakeRound() {
    window.location.href = 'round2.html';
}

function goHomeFromSummary() {
    window.location.href = 'homepage (1).html';
}

function goHome() {
    document.getElementById('homeModal').classList.add('active');
}

function cancelHome() {
    document.getElementById('homeModal').classList.remove('active');
}

function confirmHome() {
    localStorage.setItem('userPoints', initialPoints);
    localStorage.removeItem('round2Results');
    window.location.href = 'homepage (1).html';
}

startTimer();
loadQuestion();
