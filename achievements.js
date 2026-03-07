const achievementData = [
    {
        id: "first_steps",
        icon: "🔰",
        title: "First Steps",
        description: "Complete your first quiz or pre-test.",
        pointsRequired: 50
    },
    {
        id: "hardware_novice",
        icon: "💾",
        title: "Hardware Novice",
        description: "Reach 300 points in the Hardware module.",
        pointsRequired: 300
    },
    {
        id: "rising_star",
        icon: "⭐",
        title: "Rising Star",
        description: "Accumulate 600 total points.",
        pointsRequired: 600
    },
    {
        id: "tech_savvy",
        icon: "⚡",
        title: "Tech Savvy",
        description: "Reach 1000 points. You know your stuff!",
        pointsRequired: 1000
    },
    {
        id: "master_builder",
        icon: "🛠️",
        title: "Master Builder",
        description: "Reach 1500 points. PC building expert.",
        pointsRequired: 1500
    },
    {
        id: "quiz_legend",
        icon: "👑",
        title: "Quiz Legend",
        description: "Reach 2000 points. Unstoppable!",
        pointsRequired: 2000
    }
];

document.addEventListener('DOMContentLoaded', () => {
    loadUserProgress(); // Load user-specific data
    const userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    
    
    const pointsDisplay = document.getElementById('userPointsDisplay');
    if (pointsDisplay) pointsDisplay.textContent = userPoints;

    
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';

    achievementData.forEach(badge => {
       
        const isUnlocked = userPoints >= badge.pointsRequired;
        
       
        const card = document.createElement('div');
       
        card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
        
        card.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-title">${badge.title}</div>
            <div class="badge-desc">${badge.description}</div>
            <div class="badge-status">
                ${isUnlocked ? '✅ UNLOCKED' : `🔒 Needs ${badge.pointsRequired} pts`}
            </div>
        `;
        
        grid.appendChild(card);
    });
});


function goBack() {
    window.location.href = 'homepage (1).html';

}
