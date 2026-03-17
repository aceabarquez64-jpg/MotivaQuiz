document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SECURITY CHECK ---
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'Login.html';
        return; 
    }

    // --- 2. USER IDENTITY & GREETING ---
    const welcomeMsg = document.getElementById('welcomeMessage');
    const currentUser = localStorage.getItem('currentUser') || '';
    const userName = localStorage.getItem('userName') || (currentUser ? currentUser.split('@')[0] : 'ACT CANDIDATE');
    const displayName = userName.toUpperCase();

    const hour = new Date().getHours();
    let greeting = "Welcome";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    if (welcomeMsg) {
        welcomeMsg.innerHTML = `${greeting}, <span id="userName">${displayName}</span>`;
    }

    // --- 3. POINTS & RANKING ---
    const points = Number(localStorage.getItem('userPoints')) || 0;
    const pointsDisplay = document.getElementById('userPoints');
    const rankDisplay = document.getElementById('userRank');

    if (pointsDisplay) pointsDisplay.innerText = points.toLocaleString();
    
    if (rankDisplay) {
        let rankNum = 100; 
        
        if (points >= 12000) rankNum = 1;
        else if (points >= 9000) rankNum = 5;
        else if (points >= 6000) rankNum = 15;
        else if (points >= 3000) rankNum = 40;
        else if (points >= 1000) rankNum = 75;
        else if (points > 0) rankNum = 99;
        
        rankDisplay.innerText = rankNum;
    }

    // --- 4. 5-STAGE PROGRESSION LOGIC ---
    const progressDisplay = document.getElementById('lessonProgress');
    const progressFill = document.getElementById('progressFill');
    const currentTopicTitle = document.getElementById('currentTopicTitle');
    const currentLessonLabel = document.getElementById('currentLessonLabel');

    if (progressDisplay && progressFill) {
        const l1 = localStorage.getItem('lesson1Completed') === 'true';
        const l2 = localStorage.getItem('lesson2Completed') === 'true';
        const l3 = localStorage.getItem('lesson3Completed') === 'true';
        const l4 = localStorage.getItem('lesson4Completed') === 'true';
        const l5 = localStorage.getItem('lesson5Completed') === 'true';

        let activeLesson = 1;
        let topicName = 'Introduction to Hardware';
        let totalPercent = 0;

        if (l5) {
            activeLesson = 5;
            topicName = 'Animation Master';
            totalPercent = 100;
        } else if (l4) {
            activeLesson = 5;
            topicName = 'Animation Quest';
            totalPercent = 80;
        } else if (l3) {
            activeLesson = 4;
            topicName = 'Troubleshooting';
            totalPercent = 60;
        } else if (l2) {
            activeLesson = 3;
            topicName = 'Networking Hub';
            totalPercent = 40;
        } else if (l1) {
            activeLesson = 2;
            topicName = 'Software & OS';
            totalPercent = 20;
        }

        if (currentTopicTitle) currentTopicTitle.innerText = topicName;
        
        if (currentLessonLabel) {
            currentLessonLabel.innerText = l5 ? "Level: ACT Expert" : `Current: Lesson ${activeLesson}`;
        }

        progressDisplay.innerText = totalPercent;
        progressFill.style.width = totalPercent + '%';
        
        // --- 4.5 ACHIEVEMENT CELEBRATION ENGINE ---
        
        // Check if the user just completed a specific lesson
        const recentWin = localStorage.getItem('recentAchievement');
        
        if (recentWin) {
            // Delay the pop-up slightly so the user sees the page load first
            setTimeout(() => {
                showAchievementModal("🎉 MODULE CLEARED!", recentWin, "Your ACT System Points have been updated. The next module is now unlocked!");
            }, 500);
            
            // Remove it so it only shows ONCE
            localStorage.removeItem('recentAchievement');
        }

        // Check for 100% GRAND COMPLETION!
        const isGameBeaten = localStorage.getItem('gameBeaten');
        if (l5 && isGameBeaten !== 'true') {
            setTimeout(() => {
                showAchievementModal("🏆 SYSTEM MASTERED!", "All 5 Modules Completed", "You are now officially an ACT Master Animator! Check your profile for your final stats.");
               
                localStorage.setItem('gameBeaten', 'true');
            }, 800);
        }
    }

   
    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.onclick = () => {
            if(confirm("Are you sure you want to logout of MotivaQuiz?")) {
                localStorage.removeItem('isLoggedIn');
                window.location.href = 'index.html';
            }
        };
    }
});


function startSolo() { 
    window.location.href = 'gametopics.html'; 
}

function createLobby() { 
    alert("📢 SYSTEM UPDATE: Teacher Lobby is currently a Proof-of-Concept UI. Real-time server connectivity will be available in ((MotivaQuiz V2.0!)) Yet, you may have an exploration of the possible system function in demo");
    window.location.href = 'Createmode.html'; 
}

function enter1v1() { 
    alert("📢 SYSTEM UPDATE: 1v1 Matchmaking is currently in closed Beta. Its gameplay is still unavailable. This is only a set up feature as of the moment due to strict domain rules. Despite that, Enjoy exploring the UI demonstration!");
    window.location.href = '1v1mode.html'; 
}

function viewPerformance() { window.location.href = 'quizsummary.html'; }
function seeAchievements() { window.location.href = 'achievements.html'; }
function viewLeaderboard() { window.location.href = 'leaderboard.html'; }
function viewProfile() { window.location.href = 'profile.html'; }


function showAchievementModal(title, message, subtext) {
    document.getElementById('achieveTitle').innerText = title;
    document.getElementById('achieveMessage').innerText = message;
    document.getElementById('achieveSubtext').innerText = subtext;
    
   
    const iconEl = document.getElementById('achieveIcon');
    if (message.includes("Hardware")) iconEl.innerText = "🔌";
    else if (message.includes("Software")) iconEl.innerText = "💿";
    else if (message.includes("Network")) iconEl.innerText = "🌐";
    else if (message.includes("Troubleshooting")) iconEl.innerText = "🔧";
    else if (message.includes("Animation") || message.includes("All 5")) iconEl.innerText = "🎓";
    else iconEl.innerText = "⭐";

    document.getElementById('achievementModal').classList.remove('hidden');
}

function closeAchievement() {
    document.getElementById('achievementModal').classList.add('hidden');
}