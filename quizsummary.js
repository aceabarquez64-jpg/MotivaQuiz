document.addEventListener('DOMContentLoaded', () => {
    
  
    const l1 = localStorage.getItem('lesson1Completed') === 'true';
    const l2 = localStorage.getItem('lesson2Completed') === 'true';
    const l3 = localStorage.getItem('lesson3Completed') === 'true';
    const l4 = localStorage.getItem('lesson4Completed') === 'true';
    const l5 = localStorage.getItem('lesson5Completed') === 'true';

    const lessons = [
        { name: "Hardware Basics", status: l1, code: "MOD-01" },
        { name: "Software & OS", status: l2, code: "MOD-02" },
        { name: "Networking Hub", status: l3, code: "MOD-03" },
        { name: "Troubleshooting", status: l4, code: "MOD-04" },
        { name: "Animation Quest", status: l5, code: "MOD-05" }
    ];

  
    const completedCount = lessons.filter(l => l.status).length;
    
    if (completedCount === 0) {
        alert("⚠️ ACCESS DENIED: No performance data found. Complete at least one module to view your summary.");
        window.location.href = 'homepage.html';
        return; 
    }

    const totalPoints = Number(localStorage.getItem('userPoints')) || 0;
    const userData = JSON.parse(localStorage.getItem('motivaUser')) || { firstName: "ACT", lastName: "CANDIDATE" };
    
    document.getElementById('sumName').innerText = `${userData.firstName} ${userData.lastName}`.toUpperCase();
    document.getElementById('sumPoints').innerText = totalPoints.toLocaleString();

   
    const rankDisplay = document.getElementById('sumRank');
    if (totalPoints >= 12000) rankDisplay.innerText = "MASTER ANIMATOR 🏆";
    else if (totalPoints >= 8000) rankDisplay.innerText = "SENIOR TECHNICIAN 🌟";
    else if (totalPoints >= 3000) rankDisplay.innerText = "JOURNEYMAN ⚡";
    else rankDisplay.innerText = "APPRENTICE 🔧";

 
    const grid = document.getElementById('moduleGrid');
    
    lessons.forEach(lesson => {
        const card = document.createElement('div');
        card.className = `module-card ${lesson.status ? 'completed' : ''}`;
        
        const statusText = lesson.status ? "SYSTEM CLEARED" : "AWAITING DATA";
        const statusClass = lesson.status ? "done" : "pending";
        const icon = lesson.status ? "✅" : "❌";

        card.innerHTML = `
            <h3>${lesson.code}: ${lesson.name}</h3>
            <p>Status: <span class="status ${statusClass}">${statusText}</span></p>
            <div style="text-align: right; font-size: 1.5rem;">${icon}</div>
        `;
        
        grid.appendChild(card);
    });
});


function goToHome() {
    window.location.href = 'homepage (1).html';
}