let reviewData = [];

function initReview() {
    const userPoints = localStorage.getItem('userPoints') || 0;
    const pointsElement = document.getElementById('userPoints');
    if (pointsElement) pointsElement.textContent = userPoints;

    const storedResults = localStorage.getItem('round2Results');
    if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        reviewData = parsedResults.map((item, index) => ({
            questionNumber: index + 4,
            question: item.question,
            userAnswer: item.userAnswer,
            isCorrect: item.correct,
            resultLabel: item.correct ? 'Correct' : 'Needs Practice',
            studyTip: item.correct
                ? 'Strong answer. Focus on consistency and response speed.'
                : 'Review the key concept in Lesson 1 and retry Round 2.'
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
    window.location.assign(encodeURI('homepage (1).html'));
}

function retakeRound() {
    window.location.href = 'round2.html';
}

function continueToRound3() {
    window.location.href = 'round3.html';
}

document.addEventListener('DOMContentLoaded', initReview);
