document.addEventListener('DOMContentLoaded', function() {
    initSummary();
});

function initSummary() {
    
    const userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    const round2Data = JSON.parse(localStorage.getItem('round2Results'));
    const pretestScore = localStorage.getItem('pretestScore');
    
    
    document.getElementById('userPoints').textContent = userPoints;
    updateRank(userPoints);
    
    
    let accuracy = 0;
    let totalQuestions = 0;
    let correctAnswers = 0;

    
    if (round2Data) {
        totalQuestions += round2Data.length;
        correctAnswers += round2Data.filter(r => r.correct).length;
    }
    
    
    if (totalQuestions > 0) {
        accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    } else {
       
        accuracy = userPoints > 0 ? Math.min(100, Math.round((userPoints / 500) * 100)) : 0;
    }

    document.getElementById('overallAccuracy').textContent = accuracy + "%";
    document.getElementById('totalQuizzes').textContent = totalQuestions > 0 ? "1" : "0";

    
    const performanceData = [
        { lesson: "Hardware", score: accuracy, bestRound: "Round 3" },
        { lesson: "Networking", score: 0, bestRound: "-" },
        { lesson: "Software", score: 0, bestRound: "-" },
        { lesson: "Security", score: 0, bestRound: "-" },
        { lesson: "Programming", score: 0, bestRound: "-" }
    ];

    renderChart(performanceData);
    renderTable(performanceData);
    generateRecommendation(accuracy);
}

function updateRank(points) {
    const rankBadge = document.getElementById('rankBadge');
    let rankTitle = "ICT APPRENTICE";
    let color = "#4169E1"; 
    if (points > 1000) {
        rankTitle = "ICT MASTER";
        color = "#FFD700"; 
    } else if (points > 600) {
        rankTitle = "ICT EXPERT";
        color = "#FF4500"; 
    } else if (points > 400) {
        rankTitle = "ICT ADVANCED";
        color = "#9932CC"; 
    } else if (points > 200) {
        rankTitle = "ICT INTERMEDIATE";
        color = "#32CD32"; 
    }

    rankBadge.textContent = rankTitle;
    rankBadge.style.background = color;
}

function renderChart(data) {
    const container = document.getElementById('chartContainer');
    container.innerHTML = '';

    data.forEach(item => {
        const barWrapper = document.createElement('div');
        barWrapper.className = 'bar-wrapper';

       
        let height = item.score; 
        let displayHeight = Math.max(height, 5); 

        barWrapper.innerHTML = `
            <div class="bar-container">
                <div class="bar" style="height: ${displayHeight}%; opacity: ${height === 0 ? 0.3 : 1}">
                    <span class="bar-value">${height}%</span>
                </div>
            </div>
            <div class="bar-label">${item.lesson}</div>
        `;
        container.appendChild(barWrapper);
    });
}

function renderTable(data) {
    const tbody = document.getElementById('performanceTableBody');
    tbody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.lesson}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 100px; height: 8px; background: #eee; border-radius: 4px; overflow: hidden;">
                        <div style="width: ${item.score}%; height: 100%; background: #4169E1;"></div>
                    </div>
                    ${item.score}%
                </div>
            </td>
            <td>${item.bestRound}</td>
        `;
        tbody.appendChild(row);
    });
}

function generateRecommendation(accuracy) {
    const recText = document.getElementById('recommendationText');
    
    if (accuracy >= 90) {
        recText.innerHTML = "<strong>Outstanding!</strong> You have mastered Computer Hardware. You are ready to proceed to the Networking module.";
        recText.style.borderLeftColor = "#32CD32";
    } else if (accuracy >= 70) {
        recText.innerHTML = "<strong>Great job!</strong> Your knowledge is solid. Review specific hardware components in Round 2 to achieve mastery.";
        recText.style.borderLeftColor = "#4169E1";
    } else if (accuracy >= 50) {
        recText.innerHTML = "<strong>Good start.</strong> You understand the basics, but struggled with Identification questions. Try re-reading the Lesson 1 materials.";
        recText.style.borderLeftColor = "#FFD700";
    } else {
        recText.innerHTML = "<strong>Keep practicing.</strong> Focus on distinguishing between Input and Output devices. Don't worry, hardware concepts take time to memorize!";
        recText.style.borderLeftColor = "#FF4500";
    }
}


function exportReport() {
    alert("Downloading PDF Report...\n\n(This feature would connect to a backend in a live app)");
}

function openFilterModal() {
    document.getElementById('filterModal').classList.add('active');
}

function closeFilterModal() {
    document.getElementById('filterModal').classList.remove('active');
}

function applyFilter() {
    alert("Filters applied!");
    closeFilterModal();
}