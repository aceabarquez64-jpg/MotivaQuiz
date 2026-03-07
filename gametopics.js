document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    if (typeof loadUserProgress === 'function') {
        loadUserProgress();
    }

    const storedUserJSON = localStorage.getItem('motivaUser');
    const nameDisplay = document.getElementById('userName');

    if (storedUserJSON && nameDisplay) {
        try {
            const user = JSON.parse(storedUserJSON);
            const fullName = `${user.firstName} ${user.lastName}`.toUpperCase();
            nameDisplay.innerText = fullName;
        } catch (error) {
            console.error('Error parsing user data:', error);
            nameDisplay.innerText = 'STUDENT';
        }
    }

    const points = parseInt(localStorage.getItem('userPoints'), 10) || 0;
    const pointsDisplay = document.getElementById('userPoints');
    if (pointsDisplay) pointsDisplay.innerText = points.toLocaleString();

    const round1ResultsRaw = localStorage.getItem('round1Results');
    let round1Correct = 0;
    if (round1ResultsRaw) {
        try {
            const round1Results = JSON.parse(round1ResultsRaw);
            round1Correct = (round1Results || []).filter(item => item.correct || item.isCorrect).length;
        } catch (error) {
            console.warn('Invalid round1Results JSON:', error);
        }
    }

    if (round1Correct >= 2) {
        localStorage.setItem('lesson1Completed', 'true');
    }

    const isL1Done = localStorage.getItem('lesson1Completed') === 'true';
    const l1Btn = document.getElementById('lesson1Btn');
    if (isL1Done && l1Btn) {
        l1Btn.innerHTML = 'Completed';
    }

    const l2Btn = document.getElementById('lesson2Btn');
    if (isL1Done && l2Btn) {
        l2Btn.disabled = false;
        l2Btn.classList.remove('locked');
        l2Btn.classList.add('continue');
        l2Btn.innerHTML = 'Continue';
    }

    updateTopicProgress();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

function updateTopicProgress() {
    const lesson1 = localStorage.getItem('lesson1Completed') === 'true' ? 20 : 0;
    const lesson2 = parseInt(localStorage.getItem('lesson2Progress'), 10) || 0;
    const lesson3 = parseInt(localStorage.getItem('lesson3Progress'), 10) || 0;
    const lesson4 = parseInt(localStorage.getItem('lesson4Progress'), 10) || 0;
    const lesson5 = parseInt(localStorage.getItem('lesson5Progress'), 10) || 0;

    const total = Math.min(100, lesson1 + lesson2 + lesson3 + lesson4 + lesson5);
    const progressFill = document.getElementById('progressFill');
    const overallProgress = document.getElementById('overallProgress');

    if (progressFill) progressFill.style.width = `${total}%`;
    if (overallProgress) overallProgress.innerText = total;
}

function goHome() {
    window.location.href = 'homepage (1).html';
}

function viewLeaderboard() {
    window.location.href = 'leaderboard.html';
}

function viewProfile() {
    window.location.href = 'profile.html';
}

function logout() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'login.html';
}

function startLesson(lessonNumber) {
    localStorage.setItem('currentLesson', lessonNumber.toString());

    if (lessonNumber === 1) {
        window.location.href = 'round1.html';
        return;
    }

    if (lessonNumber === 2) {
        const isL1Done = localStorage.getItem('lesson1Completed') === 'true';
        if (!isL1Done) {
            alert('Finish Lesson 1 first to unlock Lesson 2.');
            return;
        }
        window.location.href = 'lesson2-intro.html';
    }
}
