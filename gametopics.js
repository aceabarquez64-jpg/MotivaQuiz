document.addEventListener('DOMContentLoaded', () => {
   
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const storedUser = JSON.parse(localStorage.getItem('motivaUser')) || {firstName: "STUDENT", lastName: ""};
    const nameDisplay = document.getElementById('userName');
    if (nameDisplay) nameDisplay.innerText = `${storedUser.firstName} ${storedUser.lastName}`.toUpperCase();

    const points = parseInt(localStorage.getItem('userPoints')) || 0;
    const pointsDisplay = document.getElementById('userPoints');
    if (pointsDisplay) pointsDisplay.innerText = points.toLocaleString();

   
    refreshLessonStates();
    updateProgressBar();
});


function refreshLessonStates() {
    
    const status = {
        l1: localStorage.getItem('lesson1Completed') === 'true',
        l2: localStorage.getItem('lesson2Completed') === 'true',
        l3: localStorage.getItem('lesson3Completed') === 'true',
        l4: localStorage.getItem('lesson4Completed') === 'true',
        l5: localStorage.getItem('lesson5Completed') === 'true'
    };

    
    const updateBtn = (id, isUnlocked, isDone, defaultText) => {
        const btn = document.getElementById(id);
        if (!btn) return;

        if (!isUnlocked) {
            btn.disabled = true;
            btn.innerHTML = '🔒 LOCKED';
            btn.className = 'topic-btn locked'; 
        } else {
            btn.disabled = false;
            btn.innerHTML = isDone ? '✓ COMPLETED' : defaultText;
            btn.className = isDone ? 'topic-btn completed' : 'topic-btn active';
        }
    };

    updateBtn('lesson1Btn', true, status.l1, 'START LESSON 1');        
    updateBtn('lesson2Btn', status.l1, status.l2, 'CONTINUE TO L2');    
    updateBtn('lesson3Btn', status.l2, status.l3, 'CONTINUE TO L3');  
    updateBtn('lesson4Btn', status.l3, status.l4, 'REPAIR SYSTEM (L4)');
    updateBtn('lesson5Btn', status.l4, status.l5, 'GRAND FINALE (L5)'); 
}


function updateProgressBar() {
    const lessons = ['lesson1Completed', 'lesson2Completed', 'lesson3Completed', 'lesson4Completed', 'lesson5Completed'];
    let completedCount = 0;

    lessons.forEach(key => {
        if (localStorage.getItem(key) === 'true') completedCount++;
    });

    const percentage = completedCount * 20; 
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('overallProgress');

    if (fill) fill.style.width = `${percentage}%`;
    if (text) text.innerText = percentage;

   
    if (percentage === 100) console.log("CORE MODULES COMPLETE. STANDING BY FOR CERTIFICATION.");
}


function startLesson(num) {
    const status = {
        l1: localStorage.getItem('lesson1Completed') === 'true',
        l2: localStorage.getItem('lesson2Completed') === 'true',
        l3: localStorage.getItem('lesson3Completed') === 'true',
        l4: localStorage.getItem('lesson4Completed') === 'true'
    };

   
    if (num === 1) window.location.href = 'round1.html';
    else if (num === 2 && status.l1) window.location.href = 'lesson2-intro.html';
    else if (num === 3 && status.l2) window.location.href = 'lesson3.html';
    else if (num === 4 && status.l3) window.location.href = 'lesson4.html';
    else if (num === 5 && status.l4) window.location.href = 'lesson5.html';
    else {
        alert("⚠️ ACCESS DENIED: Complete the previous module to unlock this sector.");
    }
}


function goHome() { window.location.href = 'homepage (1).html'; }
function logout() { localStorage.clear(); window.location.href = 'login.html'; }
function viewLeaderboard() { window.location.href = 'leaderboard.html'; }
function viewProfile() { window.location.href= 'profile.html'; }