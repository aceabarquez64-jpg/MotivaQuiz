let reviewData = [];

function initReview() {
    const userPoints = localStorage.getItem('userPoints') || 0;
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) pointsElement.textContent = userPoints;

    const storedResults = localStorage.getItem('round1Results');
    if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        reviewData = parsedResults.map((item, index) => ({
            questionNumber: index + 1,
            question: item.question,
            userAnswer: item.userAnswer,
            isCorrect: item.correct,
            resultLabel: item.correct ? 'Correct' : 'Needs Practice',
            studyTip: item.correct
                ? 'Good retention. Try to answer faster next attempt.'
                : 'Re-read the lesson section related to this question and retry the round.'
        }));
    }

    const correctCount = reviewData.filter(item => item.isCorrect).length;
    const advanceBtn = document.getElementById('advanceBtn');
    if (advanceBtn && correctCount >= 2) {
        advanceBtn.style.display = 'inline-block';
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
    window.location.href = 'homepage (1).html';
}

function retakeRound() {
    window.location.href = 'round1.html';
}

function continueToRound2() {
    window.location.href = 'round2.html';
}

document.addEventListener('DOMContentLoaded', initReview);
