// MotivaQuiz - Fixed Login with User-Specific Progress

document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const normalizedEmail = email.toLowerCase();
    const password = document.getElementById('loginPassword').value;
    
    if (!normalizedEmail || !password) {
        showMessage('Please enter both email and password', 'error');
        return;
    }
    
    // Get all users
    const users = JSON.parse(localStorage.getItem('motivaquizUsers')) || {};
    
    const matchedEmailKey = Object.keys(users).find(key => key.toLowerCase() === normalizedEmail);
    const accountKey = matchedEmailKey || normalizedEmail;
    let account = users[accountKey];

    // Backward compatibility for older single-user storage format.
    if (!account) {
        const legacyUserRaw = localStorage.getItem('motivaUser');
        if (legacyUserRaw) {
            try {
                const legacyUser = JSON.parse(legacyUserRaw);
                if (
                    legacyUser &&
                    (legacyUser.email || '').toLowerCase() === normalizedEmail &&
                    legacyUser.password
                ) {
                    account = {
                        userName: legacyUser.firstName || normalizedEmail.split('@')[0],
                        password: legacyUser.password
                    };
                }
            } catch (error) {
                console.warn('Invalid legacy motivaUser JSON:', error);
            }
        }
    }

    // Check if user exists
    if (!account) {
        showMessage('Account not found. Please sign up first!', 'error');
        return;
    }
    
    // Check password
    if (account.password !== password) {
        showMessage('Incorrect password!', 'error');
        return;
    }
    
    // IMPORTANT: Clear previous user's session data
    const sessionKeys = [
        'currentUser',
        'userName',
        'userPoints',
        'userRank',
        'lesson1Progress',
        'lesson2Progress', 
        'lesson3Progress',
        'lesson4Progress',
        'lesson5Progress',
        'overallProgress',
        'round1Results',
        'round2Results',
        'round3Results',
        'quizSummaryData',
        'achievementsData',
        'leaderboardData'
    ];
    
    sessionKeys.forEach(key => localStorage.removeItem(key));
    
    // Set current user
    localStorage.setItem('currentUser', normalizedEmail);
    localStorage.setItem('userName', account.userName);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('motivaUser', JSON.stringify({
        firstName: account.userName,
        lastName: '',
        email: normalizedEmail
    }));
    
    // Load user-specific progress
    // Check if user has saved progress
    const userProgressKey = `progress_${normalizedEmail}`;
    const savedProgress = localStorage.getItem(userProgressKey);
    
    if (savedProgress) {
        // Load existing progress
        const progress = JSON.parse(savedProgress);
        localStorage.setItem('userPoints', progress.points || '0');
        localStorage.setItem('userRank', progress.rank || '100');
        localStorage.setItem('lesson1Progress', progress.lesson1 || '0');
        localStorage.setItem('lesson2Progress', progress.lesson2 || '0');
        localStorage.setItem('overallProgress', progress.overall || '0');
    } else {
        // New user - initialize fresh progress
        localStorage.setItem('userPoints', '0');
        localStorage.setItem('userRank', '100');
        localStorage.setItem('lesson1Progress', '0');
        localStorage.setItem('lesson2Progress', '0');
        localStorage.setItem('overallProgress', '0');
        
        // Save initial progress
        const initialProgress = {
            points: '0',
            rank: '100',
            lesson1: '0',
            lesson2: '0',
            overall: '0'
        };
        localStorage.setItem(userProgressKey, JSON.stringify(initialProgress));
    }
    
    showMessage('Login successful! Redirecting...', 'success');
    
    setTimeout(() => {
        window.location.href = 'homepage (1).html';
    }, 1000);
});

function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = 'message ' + type;
        messageDiv.style.display = 'block';
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}
