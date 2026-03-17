document.addEventListener('DOMContentLoaded', () => {
 
    const userData = JSON.parse(localStorage.getItem('motivaUser')) || { firstName: "ACT", lastName: "CANDIDATE" };
    const totalPoints = Number(localStorage.getItem('userPoints')) || 0;

   
    document.getElementById('profName').innerText = `${userData.firstName} ${userData.lastName}`.toUpperCase();
    document.getElementById('profPoints').innerText = totalPoints.toLocaleString();


    const lessons = [
        { id: 1, name: "Hardware Basics", key: "lesson1Completed" },
        { id: 2, name: "Software & OS", key: "lesson2Completed" },
        { id: 3, name: "Networking Hub", key: "lesson3Completed" },
        { id: 4, name: "Troubleshooting", key: "lesson4Completed" },
        { id: 5, name: "Animation Quest", key: "lesson5Completed" }
    ];

    let completedCount = 0;
    const trackerContainer = document.getElementById('lessonTracker');

    lessons.forEach(lesson => {
        const isDone = localStorage.getItem(lesson.key) === 'true';
        if (isDone) {
            completedCount++;
      
            const badge = document.getElementById(`badge${lesson.id}`);
            if (badge) badge.classList.add('unlocked');
        }

      
        const item = document.createElement('div');
        item.style.padding = "10px";
        item.style.borderBottom = "1px solid #222";
        item.innerHTML = `
            <span style="color: ${isDone ? '#FFCC00' : '#555'}">${isDone ? '✅' : '🔒'}</span>
            ${lesson.name}
            <span style="float: right; color: ${isDone ? '#00ff00' : '#ff3333'}">
                ${isDone ? 'COMPLETE' : 'INCOMPLETE'}
            </span>
        `;
        trackerContainer.appendChild(item);
    });


    const percent = (completedCount / 5) * 100;
    document.getElementById('profPercent').innerText = percent + "%";

    const rankTag = document.getElementById('profRank');
    if (totalPoints >= 12000) rankTag.innerText = "ACT GRANDMASTER";
    else if (totalPoints >= 6000) rankTag.innerText = "ACT SENIOR STUDENT";
    else if (totalPoints > 0) rankTag.innerText = "ACT JUNIOR CANDIDATE";
});

function goToHome() {
    window.location.href = 'homepage (1).html';
}