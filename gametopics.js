document.addEventListener('DOMContentLoaded', () => {
    
  
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

   
    const storedUserJSON = localStorage.getItem('motivaUser');
    const nameDisplay = document.getElementById('userName');

    if (storedUserJSON && nameDisplay) {
        try {
            const user = JSON.parse(storedUserJSON);
            
            const fullName = `${user.firstName} ${user.lastName}`.toUpperCase();
            nameDisplay.innerText = fullName;
        } catch (error) {
            console.error("Error parsing user data:", error);
           
            nameDisplay.innerText = "STUDENT"; 
        }
    }

    
    const points = parseInt(localStorage.getItem('userPoints')) || 0;
    const pointsDisplay = document.getElementById('userPoints');
    if (pointsDisplay) pointsDisplay.innerText = points.toLocaleString();

    
    const isL1Done = localStorage.getItem('lesson1Completed') === 'true';
    const l2Btn = document.getElementById('lesson2Btn');
    if (isL1Done && l2Btn) {
        l2Btn.disabled = false;
        l2Btn.classList.remove('locked');
        l2Btn.classList.add('continue');
        l2Btn.innerHTML = "Continue"; 
    }
});

function goHome() {
    
    window.location.href = 'homepage (1).html';
}

function startLesson(lessonNumber) {
    localStorage.setItem('currentLesson', lessonNumber);
   if (lessonNumber === 1) { window.location.href = 'round1.html';}
   else if (lessonNumber === 2) {  window.location.href = 'lesson2-intro.html';}
}
