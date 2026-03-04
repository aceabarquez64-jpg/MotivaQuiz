const quizData = [
    {
        question: "Which of the following is an input device?",
        options: ["Monitor", "Printer", "Keyboard", "Speaker"],
        correct: 2,
        explanation: "A keyboard sends data TO the computer (Input), while monitors and speakers receive data FROM the computer (Output)."
    },
    {
        question: "Which component is known as the 'Brain' of the computer?",
        options: ["CPU", "RAM", "Hard Drive", "GPU"],
        correct: 0,
        explanation: "The CPU (Central Processing Unit) handles all the instructions and calculations, acting as the brain of the system."
    },
    {
        question: "What type of memory is used for temporary data storage?",
        options: ["HDD", "SSD", "ROM", "RAM"],
        correct: 3,
        explanation: "RAM (Random Access Memory) only stores data while the computer is on. HDD and SSD are for permanent storage."
    }
];

let currentQuestionIndex = 0;
let selectedOption = null;
let roundAnswers = [];
let userPoints = 0;
let timeLeft = 180;
let timerInterval;
let streak = 0;
let correctCount = 0;
let totalAnswerTime = 0;
let questionStartTimestamp = Date.now();

function init() {
    localStorage.setItem('userPoints', 0);
    document.getElementById('userPoints').textContent = 0;
    document.getElementById('avgTime').textContent = '0s';
    startTimer();
    loadQuestion();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timeRemaining').textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

function loadQuestion() {
    questionStartTimestamp = Date.now();

    const question = quizData[currentQuestionIndex];
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = question.question;

    const progress = (currentQuestionIndex / quizData.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';

    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectOption(index, button);
        optionsGrid.appendChild(button);
    });

    document.getElementById('submitBtn').disabled = true;
    selectedOption = null;

    const feedbackDiv = document.getElementById('feedbackMessage');
    feedbackDiv.style.display = 'none';
    feedbackDiv.className = 'feedback-message';
}

function selectOption(index, button) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.classList.remove('selected'));

    button.classList.add('selected');
    selectedOption = index;
    document.getElementById('submitBtn').disabled = false;
}

function showConfidenceCheck() {
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
    const isCorrect = selectedOption === question.correct;
    const feedbackDiv = document.getElementById('feedbackMessage');

    feedbackDiv.style.display = 'block';

    if (isCorrect) {
        correctCount++;
        streak++;
        userPoints += 10;

        feedbackDiv.className = 'feedback-message correct';
        feedbackDiv.innerHTML = `
            <strong>✅ CORRECT!</strong><br>
            Keep it up.
        `;
    } else {
        streak = 0;

        feedbackDiv.className = 'feedback-message incorrect';
        feedbackDiv.innerHTML = `
            <strong>❌ INCORRECT</strong><br>
            Keep going. You can review this concept after the round.
        `;
    }

    const questionElapsedSeconds = Math.max(1, Math.round((Date.now() - questionStartTimestamp) / 1000));
    totalAnswerTime += questionElapsedSeconds;
    const answeredCount = roundAnswers.length + 1;

    document.getElementById('userPoints').textContent = userPoints;
    document.getElementById('streak').textContent = streak;
    document.getElementById('accuracy').textContent = Math.round((correctCount / (currentQuestionIndex + 1)) * 100) + '%';
    document.getElementById('avgTime').textContent = Math.round(totalAnswerTime / answeredCount) + 's';

    roundAnswers.push({
        question: question.question,
        correct: isCorrect,
        userAnswer: question.options[selectedOption]
    });

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true);

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.textContent = 'Continue';
    submitBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            submitBtn.textContent = 'Submit';
            submitBtn.onclick = showConfidenceCheck;
            loadQuestion();
        } else {
            showResults();
        }
    };
}

function showResults() {
    clearInterval(timerInterval);

    const passingScore = 2;
    const passed = correctCount >= passingScore;

    document.getElementById('finalScore').textContent = correctCount;
    document.getElementById('pointsEarned').textContent = userPoints;

    const summaryTitle = document.getElementById('summaryTitle');
    if (correctCount === 3) {
        summaryTitle.textContent = 'PERFECT SCORE!';
    } else if (passed) {
        summaryTitle.textContent = 'GREAT JOB!';
    } else {
        summaryTitle.textContent = 'NEEDS IMPROVEMENT';
    }

    const summaryList = document.getElementById('summaryList');
    summaryList.innerHTML = '';
    roundAnswers.forEach((ans, i) => {
        const item = document.createElement('div');
        item.style.margin = '10px 0';
        item.style.textAlign = 'left';
        item.innerHTML = `
            <strong>Q${i + 1}:</strong> ${ans.correct ? '✅' : '❌'} ${ans.question}<br>
            <span style="font-size: 0.9em; color: #666;">${ans.correct ? 'Strong work on this question.' : 'Mark this topic for review.'}</span>
        `;
        summaryList.appendChild(item);
    });

    const modalButtons = document.querySelector('#resultsModal .modal-buttons');
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
    localStorage.setItem('round1Results', JSON.stringify(roundAnswers));
    document.getElementById('resultsModal').classList.add('active');
}

function reviewRound() {
    localStorage.setItem('round1Results', JSON.stringify(roundAnswers));
    window.location.href = 'round1review.html';
}

function retakeRound() {
    window.location.href = 'round1.html';
}

function goHomeFromSummary() {
    window.location.href = 'homepage (1).html';
}

function nextRound() {
    localStorage.setItem('round1Results', JSON.stringify(roundAnswers));
    alert('Great job! Moving to Round 2...');
    window.location.href = 'round2.html';
}

function goHome() { document.getElementById('homeModal').classList.add('active'); }
function cancelHome() { document.getElementById('homeModal').classList.remove('active'); }
function confirmHome() {
    localStorage.removeItem('round1Results');
    localStorage.setItem('userPoints', 0);
    window.location.href = 'homepage (1).html';
}

init();
