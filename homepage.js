    document.addEventListener('DOMContentLoaded', () => {
    
   
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'Login.html';
        return; 
    }

    
    const storedUserJSON = localStorage.getItem('motivaUser');
    const welcomeMsg = document.getElementById('welcomeMessage');
    
    if (storedUserJSON) {
        const user = JSON.parse(storedUserJSON);
        const firstName = (user.firstName || "BOSS").toUpperCase();
        
        const hour = new Date().getHours();
        let greeting = "Welcome";
        if (hour < 12) greeting = "Good Morning";
        else if (hour < 18) greeting = "Good Afternoon";
        else greeting = "Good Evening";

        if (welcomeMsg) {
            welcomeMsg.innerHTML = `${greeting}, <span id="userName">${firstName}</span>`;
        }
    }

    
    const points = parseInt(localStorage.getItem('userPoints')) || 0;
    const pointsDisplay = document.getElementById('userPoints');
    const progressDisplay = document.getElementById('lessonProgress');
    const progressFill = document.getElementById('progressFill');
    const rankDisplay = document.getElementById('userRank');

    
    if (pointsDisplay) pointsDisplay.innerText = points.toLocaleString();
    
    
    if (rankDisplay) {
        let rank = 100; 
        if (points >= 1000) rank = 1;
        else if (points >= 800) rank = 5;
        else if (points >= 500) rank = 12;
        else if (points >= 200) rank = 45;
        else if (points > 0) rank = 88;
        rankDisplay.innerText = rank;
    }

    
    if (progressDisplay && progressFill) {
        let progressValue = 0;
        
        progressValue = Math.min(Math.floor((points / 500) * 100), 100);
        
        progressDisplay.innerText = progressValue;
        progressFill.style.width = progressValue + '%'; 
    }

    
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if(confirm("Are you sure you want to logout?")) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'index.html';
            }
        });
    }
});



function startSolo() {
    window.location.href = 'gametopics.html';
}

function createLobby() {
    window.location.href = 'Createmode.html';
}

function enter1v1() {
    window.location.href = '1v1mode.html';
}

function viewPerformance() {
   
    window.location.href = 'quizsummary.html';
}

function seeAchievements() {
    window.location.href = 'achievements.html';
}

function viewLeaderboard() {
    window.location.href = 'leaderboard.html';
}

function viewProfile() {
    window.location.href = 'profile.html';
}

function logout() {
    window.location.href = 'index.html';
}