const quizData = [
    {
        question: "Scenario: A user reports that their computer turns on, but the screen stays black and they hear one long beep followed by two short beeps. Which component is likely failing?",
        correctAnswer: "Video Card"
    },
    {
        question: "Scenario: You are building a workstation for a professional video editor who works with 4K RAW footage. Which storage configuration provides the best performance?",
        correctAnswer: "NVMe SSD"
    },
    {
        question: "Scenario: A computer frequently crashes and displays a BSOD. The CPU is reaching 95 C. What should you do?",
        correctAnswer: "Thermal Paste"
    }
];

let currentQuestionIndex = 0;
const initialPoints = parseInt(localStorage.getItem('userPoints')) || 0;
let userPoints = initialPoints;
let correctCount = 0;
let streak = 0;
let roundAnswers = [];
let timeLeft = 180;
let timerInterval;
let totalAnswerTime = 0;
let questionStartTimestamp = Date.now();

function init() {
    document.getElementById('userPoints').textContent = userPoints;
    document.getElementById('totalQuestions').textContent = quizData.length;
    document.getElementById('accuracy').textContent = '0%';
    document.getElementById('avgTime').textContent = '0s';
    document.getElementById('streak').textContent = '0';

    const input = document.getElementById('answerInput');
    input.addEventListener('input', () => {
        const btn = document.getElementById('submitBtn');
        if (btn.textContent === 'Submit') {
            btn.disabled = input.value.trim() === '';
        }
    });

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
            alert("Time's up! Submitting your results.");
            showRoundSummary();
        }
    }, 1000);
}

function loadQuestion() {
    questionStartTimestamp = Date.now();

    const q = quizData[currentQuestionIndex];

    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('questionText').textContent = q.question;

    const input = document.getElementById('answerInput');
    input.value = '';
    input.disabled = false;
    input.focus();

    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Submit';
    btn.className = 'submit-btn';
    btn.disabled = true;
    btn.onclick = showConfidenceCheck;

    const feedback = document.getElementById('feedbackMessage');
    feedback.style.display = 'none';
    feedback.className = 'feedback-message';

    const progress = (currentQuestionIndex / quizData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
}

function showConfidenceCheck() {
    document.getElementById('confidenceModal').classList.add('active');
}

function reviewAnswer() {
    document.getElementById('confidenceModal').classList.remove('active');
}

function confirmSubmit() {
    document.getElementById('confidenceModal').classList.remove('active');

    const q = quizData[currentQuestionIndex];
    const input = document.getElementById('answerInput');
    const userAns = input.value.trim();

    const keyword = q.correctAnswer.toLowerCase().split(' ')[0];
    const isCorrect = userAns.toLowerCase().includes(keyword);

    if (isCorrect) {
        correctCount++;
        userPoints += 150;
        streak++;
    } else {
        streak = 0;
    }

    const questionElapsedSeconds = Math.max(1, Math.round((Date.now() - questionStartTimestamp) / 1000));
    totalAnswerTime += questionElapsedSeconds;
    const answeredCount = roundAnswers.length + 1;

    roundAnswers.push({
        question: q.question,
        userAnswer: userAns,
        isCorrect: isCorrect
    });

    document.getElementById('userPoints').textContent = userPoints;
    document.getElementById('streak').textContent = streak;
    document.getElementById('accuracy').textContent = Math.round((correctCount / answeredCount) * 100) + '%';
    document.getElementById('avgTime').textContent = Math.round(totalAnswerTime / answeredCount) + 's';

    showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
    const feedbackEl = document.getElementById('feedbackMessage');
    const input = document.getElementById('answerInput');
    const btn = document.getElementById('submitBtn');

    input.disabled = true;

    feedbackEl.style.display = 'block';
    if (isCorrect) {
        feedbackEl.className = 'feedback-message correct';
        feedbackEl.innerHTML = '✅ <strong>Correct!</strong><br>Good analysis.';
    } else {
        feedbackEl.className = 'feedback-message incorrect';
        feedbackEl.innerHTML = '❌ <strong>Incorrect.</strong><br>Mark this scenario for review and retry.';
    }

    btn.textContent = 'Continue';
    btn.disabled = false;
    btn.onclick = nextQuestion;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showRoundSummary();
    }
}

function showRoundSummary() {
    clearInterval(timerInterval);

    localStorage.setItem('round3Results', JSON.stringify(roundAnswers));

    const passingScore = 2;
    const passed = correctCount >= passingScore;

    document.getElementById('summaryScore').textContent = correctCount;
    const summaryTitle = document.getElementById('summaryTitle');
    if (correctCount === 3) {
        summaryTitle.textContent = 'OUTSTANDING!';
    } else if (passed) {
        summaryTitle.textContent = 'STRONG PERFORMANCE';
    } else {
        summaryTitle.textContent = 'NEEDS IMPROVEMENT';
    }

    const list = document.getElementById('summaryList');
    list.innerHTML = '';

    roundAnswers.forEach((ans, i) => {
        const item = document.createElement('div');
        item.className = 'summary-item';
        const questionPreview = ans.question.substring(0, 40) + '...';

        item.innerHTML = `
            <span class="summary-question">Q${i + 1}: ${questionPreview}</span>
            <span class="summary-icon">${ans.isCorrect ? '✅' : '❌'}</span>
        `;
        list.appendChild(item);
    });

    const modalButtons = document.querySelector('#summaryModal .modal-buttons');
    if (passed) {
        modalButtons.innerHTML = `
            <button class="modal-btn review" onclick="reviewRound()">Review round</button>
            <button class="modal-btn review" onclick="goHomeFromSummary()">Home</button>
            <button class="modal-btn continue" onclick="finishLessonOne()">Complete Quiz</button>
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
    window.location.href = 'round3review.html';
}

function retakeRound() {
    window.location.href = 'round3.html';
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
    localStorage.removeItem('round3Results');
    window.location.href = 'homepage (1).html';
}

function finishLessonOne() {
    localStorage.setItem('userPoints', userPoints + 50);
    localStorage.setItem('lesson1Completed', 'true');
    window.location.href = 'gametopics.html';
}

document.addEventListener('DOMContentLoaded', init);
