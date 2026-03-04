document.addEventListener('DOMContentLoaded', () => {
   
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'Login (1).html';
        return;
    }

    
    const storedUserJSON = localStorage.getItem('motivaUser');
    const headerTitle = document.querySelector('.difficulty-header h1');
    
    if (storedUserJSON && headerTitle) {
        try {
            const user = JSON.parse(storedUserJSON);
            const firstName = (user.firstName || "OPERATOR").toUpperCase();
            headerTitle.innerText = `READY, ${firstName}?`;
        } catch (e) {
            console.error("Identity data corrupted.");
        }
    }

    
    const points = localStorage.getItem('userPoints') || 0;
    console.log(`Current System Points: ${points}`);
});





function selectDifficulty(level) {
    localStorage.setItem('lesson2Difficulty', level);
    
    if (level === 'rookie') {
        window.location.href = 'lesson2-rookie.html';
    } 
    else if (level === 'intermediate') {
        
        const currentPoints = parseInt(localStorage.getItem('userPoints')) || 0;
        
        if (currentPoints >= 100) {
            window.location.href = 'lesson2-intermediate.html';
        } else {
            alert(`INSUFFICIENT DATA: You need at least 100 points to unlock INTERMEDIATE protocols! (Current: ${currentPoints})`);
        }
    } 
    else {
        
        alert(`ACCESS DENIED: The ${level.toUpperCase()} protocols are still being encrypted.`);
    }
}


function goHome() { window.location.href = 'homepage (1).html'; }
function viewLeaderboard() { window.location.href = 'leaderboard.html'; }
function viewProfile() { window.location.href = 'profile.html'; }
function goBack() { window.location.href = 'gametopics.html'; }


const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.onclick = () => {
        if (confirm("Terminate session and logout?")) {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'Login (1).html';
        }
    };
}