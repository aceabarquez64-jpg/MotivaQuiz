document.addEventListener('DOMContentLoaded', () => {
    loadUserProgress();    
    const userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    
    
    const headerPoints = document.getElementById('headerPoints');
    if (headerPoints) headerPoints.textContent = userPoints;

    
    let players = [
        { name: "Sarah Connor", points: 1000000, isMe: false },
        { name: "John Doe", points: 900000, isMe: false },
        { name: "Jane Smith", points: 750000, isMe: false },
        { name: "Mike Johnson", points: 300000, isMe: false },
        { name: "Emily Chen", points: 100000, isMe: false },
        { name: "Chris Evans", points: 50000, isMe: false },
        { name: "Anna Taylor", points: 10000, isMe: false },
       
        { name: "You (Student)", points: userPoints, isMe: true }
    ];

    
    players.sort((a, b) => b.points - a.points);

    
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    players.forEach((player, index) => {
        const rank = index + 1; 
        
       
        let rankDisplay = `#${rank}`;
        if (rank === 1) rankDisplay = '🥇 1st';
        if (rank === 2) rankDisplay = '🥈 2nd';
        if (rank === 3) rankDisplay = '🥉 3rd';

        
        const row = document.createElement('div');
        
        row.className = `rank-row rank-${rank} ${player.isMe ? 'is-me' : ''}`;
        
        row.innerHTML = `
            <div class="col-rank">${rankDisplay}</div>
            <div class="col-name">
                ${player.isMe ? '👤' : '🎓'} ${player.name}
            </div>
            <div class="col-points">${player.points} pts</div>
        `;
        
        leaderboardList.appendChild(row);
    });
});


function goBack() {
    window.location.href = 'homepage (1).html';
}