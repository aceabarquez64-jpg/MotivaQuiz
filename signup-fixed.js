

document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const email = document.getElementById('email')?.value.trim();
    const normalizedEmail = (email || '').toLowerCase();
    const password = document.getElementById('password')?.value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    
    if (!normalizedEmail || !password || !confirmPassword) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('Password must be at least 6 characters', 'error');
        return;
    }
    
   
    const users = JSON.parse(localStorage.getItem('motivaquizUsers')) || {};
    
    if (users[normalizedEmail]) {
        showMessage('Account already exists! Please log in.', 'error');
        return;
    }
    
   
    const userName = normalizedEmail.split('@')[0];
    
   
    users[normalizedEmail] = {
        password: password, 
        userName: userName,
        createdAt: new Date().toISOString()
    };
    
   
    localStorage.setItem('motivaquizUsers', JSON.stringify(users));
    
   
    const keysToRemove = [
        'userPoints',
        'userRank', 
        'lesson1Progress',
        'lesson2Progress',
        'lesson3Progress',
        'lesson4Progress',
        'lesson5Progress',
        'overallProgress',
        'quizHistory',
        'achievements',
        'streak',
        'accuracy',
        'round1Completed',
        'round2Completed',
        'round3Completed',
        'lesson1Completed',
        'lesson2Completed',
        '1v1MatchSettings',
        'teacherLobbySettings'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
   
    localStorage.setItem('currentUser', normalizedEmail);
    localStorage.setItem('userName', userName);
    localStorage.setItem('isLoggedIn', 'false');
    
  
    localStorage.setItem('userPoints', '0');
    localStorage.setItem('userRank', '100');
    localStorage.setItem('lesson1Progress', '0');
    localStorage.setItem('overallProgress', '0');
    
    showMessage('Account created successfully! Redirecting...', 'success');
    
   
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
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
        return;
    }

    
    alert(text);
}
