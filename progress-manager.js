// MotivaQuiz - Progress Manager
// Shared progress + page data bridge for:
// - quizsummary.html
// - achievements.html
// - leaderboard.html

const CONNECTED_ROUTES = {
    quizSummary: 'quizsummary.html',
    achievements: 'achievements.html',
    leaderboard: 'leaderboard.html'
};

function toInt(value, fallback) {
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? fallback : parsed;
}

function getCurrentUserId() {
    return localStorage.getItem('currentUser') || '';
}

function getDisplayName() {
    const fromUserName = localStorage.getItem('userName');
    if (fromUserName) return fromUserName;

    const motivaUserRaw = localStorage.getItem('motivaUser');
    if (motivaUserRaw) {
        try {
            const motivaUser = JSON.parse(motivaUserRaw);
            if (motivaUser && motivaUser.firstName) return motivaUser.firstName;
        } catch (error) {
            console.warn('Invalid motivaUser JSON:', error);
        }
    }

    const currentUser = getCurrentUserId();
    return currentUser ? currentUser.split('@')[0] : 'Student';
}

function normalizeRoundAnswers(rawResults) {
    if (!Array.isArray(rawResults)) return [];
    return rawResults.map(item => ({
        question: item.question || '',
        userAnswer: item.userAnswer || '',
        correct: Boolean(item.correct || item.isCorrect)
    }));
}

function getRoundStats(storageKey, lessonLabel, bestRoundLabel) {
    const raw = localStorage.getItem(storageKey);
    let parsedResults = [];
    if (raw) {
        try {
            parsedResults = JSON.parse(raw);
        } catch (error) {
            console.warn(`Invalid JSON in ${storageKey}:`, error);
        }
    }
    const normalized = normalizeRoundAnswers(parsedResults);

    if (normalized.length === 0) {
        return {
            lesson: lessonLabel,
            bestRound: '-',
            total: 0,
            correct: 0,
            accuracy: 0
        };
    }

    const correct = normalized.filter(answer => answer.correct).length;
    const accuracy = Math.round((correct / normalized.length) * 100);
    return {
        lesson: lessonLabel,
        bestRound: bestRoundLabel,
        total: normalized.length,
        correct: correct,
        accuracy: accuracy
    };
}

function getAchievements(points) {
    const milestones = [
        { id: 'first_steps', pointsRequired: 50 },
        { id: 'hardware_novice', pointsRequired: 300 },
        { id: 'rising_star', pointsRequired: 600 },
        { id: 'tech_savvy', pointsRequired: 1000 },
        { id: 'master_builder', pointsRequired: 1500 },
        { id: 'quiz_legend', pointsRequired: 2000 }
    ];

    return milestones.map(item => ({
        id: item.id,
        pointsRequired: item.pointsRequired,
        unlocked: points >= item.pointsRequired
    }));
}

function buildConnectedPageData() {
    const points = toInt(localStorage.getItem('userPoints'), 0);
    const rank = toInt(localStorage.getItem('userRank'), 100);
    const currentUser = getCurrentUserId();
    const displayName = getDisplayName();

    const round1 = getRoundStats('round1Results', 'Hardware', 'Round 1');
    const round2 = getRoundStats('round2Results', 'Hardware', 'Round 2');
    const round3 = getRoundStats('round3Results', 'Hardware', 'Round 3');

    const rounds = [round1, round2, round3];
    const totalQuestions = rounds.reduce((sum, round) => sum + round.total, 0);
    const totalCorrect = rounds.reduce((sum, round) => sum + round.correct, 0);
    const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const totalQuizzes = rounds.filter(round => round.total > 0).length;

    return {
        generatedAt: new Date().toISOString(),
        user: {
            id: currentUser,
            name: displayName,
            points: points,
            rank: rank
        },
        summary: {
            overallAccuracy: overallAccuracy,
            totalQuizzes: totalQuizzes,
            rounds: rounds
        },
        achievements: {
            unlocked: getAchievements(points)
        },
        leaderboard: {
            currentPlayer: {
                name: displayName,
                points: points
            }
        }
    };
}

function syncConnectedPagesData() {
    const payload = buildConnectedPageData();
    localStorage.setItem('quizSummaryData', JSON.stringify(payload.summary));
    localStorage.setItem('achievementsData', JSON.stringify(payload.achievements));
    localStorage.setItem('leaderboardData', JSON.stringify(payload.leaderboard));

    const currentUser = getCurrentUserId();
    if (currentUser) {
        localStorage.setItem(`quizSummary_${currentUser}`, JSON.stringify(payload.summary));
        localStorage.setItem(`achievements_${currentUser}`, JSON.stringify(payload.achievements));
        localStorage.setItem(`leaderboard_${currentUser}`, JSON.stringify(payload.leaderboard));
    }
}

// Save user progress to user-specific storage
function saveUserProgress() {
    const currentUser = getCurrentUserId();

    if (!currentUser) {
        syncConnectedPagesData();
        return;
    }

    const userProgress = {
        points: localStorage.getItem('userPoints') || '0',
        rank: localStorage.getItem('userRank') || '100',
        lesson1: localStorage.getItem('lesson1Progress') || '0',
        lesson2: localStorage.getItem('lesson2Progress') || '0',
        lesson3: localStorage.getItem('lesson3Progress') || '0',
        lesson4: localStorage.getItem('lesson4Progress') || '0',
        lesson5: localStorage.getItem('lesson5Progress') || '0',
        overall: localStorage.getItem('overallProgress') || '0',
        lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(`progress_${currentUser}`, JSON.stringify(userProgress));
    syncConnectedPagesData();
}

// Load user progress from user-specific storage
function loadUserProgress() {
    const currentUser = getCurrentUserId();

    if (!currentUser) {
        syncConnectedPagesData();
        return null;
    }

    const savedProgress = localStorage.getItem(`progress_${currentUser}`);
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);

        localStorage.setItem('userPoints', progress.points || '0');
        localStorage.setItem('userRank', progress.rank || '100');
        localStorage.setItem('lesson1Progress', progress.lesson1 || '0');
        localStorage.setItem('lesson2Progress', progress.lesson2 || '0');
        localStorage.setItem('lesson3Progress', progress.lesson3 || '0');
        localStorage.setItem('lesson4Progress', progress.lesson4 || '0');
        localStorage.setItem('lesson5Progress', progress.lesson5 || '0');
        localStorage.setItem('overallProgress', progress.overall || '0');

        syncConnectedPagesData();
        return progress;
    }

    syncConnectedPagesData();
    return null;
}

// Call this when user earns points
function updateUserPoints(pointsEarned) {
    let currentPoints = toInt(localStorage.getItem('userPoints'), 0);
    currentPoints += pointsEarned;
    localStorage.setItem('userPoints', currentPoints.toString());

    let newRank = 100;
    if (currentPoints >= 1000) newRank = 1;
    else if (currentPoints >= 500) newRank = 5;
    else if (currentPoints >= 250) newRank = 10;
    else if (currentPoints >= 100) newRank = 25;
    else if (currentPoints >= 50) newRank = 50;

    localStorage.setItem('userRank', newRank.toString());

    saveUserProgress();
    return currentPoints;
}

// Call this when user completes a lesson
function updateLessonProgress(lessonNumber, progress) {
    localStorage.setItem(`lesson${lessonNumber}Progress`, progress.toString());

    let totalProgress = 0;
    for (let i = 1; i <= 5; i++) {
        totalProgress += toInt(localStorage.getItem(`lesson${i}Progress`), 0);
    }

    localStorage.setItem('overallProgress', Math.floor(totalProgress / 5).toString());
    saveUserProgress();
}

// Route helpers for connected pages
function goToQuizSummary() {
    syncConnectedPagesData();
    window.location.href = CONNECTED_ROUTES.quizSummary;
}

function goToAchievements() {
    syncConnectedPagesData();
    window.location.href = CONNECTED_ROUTES.achievements;
}

// Alias for the user-typed typo version ("achievents")
function goToAchievents() {
    goToAchievements();
}

function goToLeaderboard() {
    syncConnectedPagesData();
    window.location.href = CONNECTED_ROUTES.leaderboard;
}

// Auto-save progress every 30 seconds
setInterval(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        saveUserProgress();
    } else {
        syncConnectedPagesData();
    }
}, 30000);

// Save progress when page unloads
window.addEventListener('beforeunload', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        saveUserProgress();
    } else {
        syncConnectedPagesData();
    }
});
