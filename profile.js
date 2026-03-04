document.addEventListener('DOMContentLoaded', () => {
    
    const userPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    const pretestScore = localStorage.getItem('pretestScore') || "Not Taken";
    const userData = JSON.parse(localStorage.getItem('motivaUser'));

    
    if (userData) {
        document.getElementById('profName').textContent = `${userData.firstName} ${userData.lastName}`.toUpperCase();
        document.getElementById('profEmail').textContent = userData.email || "student@act.edu.ph";
    }

    
    document.getElementById('profPoints').textContent = userPoints.toLocaleString();
    document.getElementById('profPretest').textContent = pretestScore + "/5";

    
    const rankDisplay = document.getElementById('displayRank');
    let rank = 100;
    if (userPoints >= 1000) rank = 1;
    else if (userPoints >= 500) rank = 12;
    else if (userPoints > 0) rank = 88;
    rankDisplay.textContent = rank;

    
    const progress = Math.min(Math.floor((userPoints / 500) * 100), 100);
    document.getElementById('profProgress').style.width = progress + '%';
});

function handleLogout() {
    if(confirm("Logging out will return you to the login screen. Continue?")) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'Login (1).html';
    }
}