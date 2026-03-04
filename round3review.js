let reviewData = [];

function initReview() {
    const totalPoints = parseInt(localStorage.getItem('userPoints')) || 0;

    const headerPoints = document.getElementById('userPoints');
    if (headerPoints) headerPoints.textContent = totalPoints;

    const storedResults = localStorage.getItem('round3Results');

    if (storedResults) {
        const parsedResults = JSON.parse(storedResults);

        const round3Correct = parsedResults.filter(item => item.isCorrect).length;
        const round3Points = round3Correct * 150;

        if (document.getElementById('roundScore')) {
            document.getElementById('roundScore').textContent = `${round3Correct} / 3`;
        }
        if (document.getElementById('roundPoints')) {
            document.getElementById('roundPoints').textContent = `+${round3Points}`;
        }
        if (document.getElementById('totalPointsDisplay')) {
            document.getElementById('totalPointsDisplay').textContent = totalPoints;
        }

        const advanceBtn = document.getElementById('advanceBtn');
        if (advanceBtn && round3Correct >= 2) {
            advanceBtn.style.display = 'inline-block';
        }

        reviewData = parsedResults.map((item, index) => ({
            questionNumber: index + 7,
            question: item.question,
            userAnswer: item.userAnswer,
            isCorrect: item.isCorrect,
            resultLabel: item.isCorrect ? 'Correct' : 'Needs Practice',
            studyTip: item.isCorrect
                ? 'Strong diagnosis. Keep your reasoning structured.'
                : 'Re-read the scenario details and identify key hardware clues.'
        }));
    }

    populateReviewTable();
}

function populateReviewTable() {
    const tbody = document.getElementById('reviewTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    reviewData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="question-cell">Q${item.questionNumber}: ${item.question}</td>
            <td class="answer-cell ${item.isCorrect ? 'correct-answer' : 'wrong-answer'}">${item.userAnswer}</td>
            <td class="feedback-cell ${item.isCorrect ? 'positive' : 'negative'}">${item.resultLabel}</td>
            <td class="explanation-cell">${item.studyTip}</td>
        `;
        tbody.appendChild(row);
    });
}

function goToDashboard() {
    window.location.assign(encodeURI('homepage (1).html'));
}

function retakeRound() {
    window.location.href = 'round3.html';
}

function completeQuiz() {
    window.location.href = 'quizsummary.html';
}

document.addEventListener('DOMContentLoaded', initReview);
