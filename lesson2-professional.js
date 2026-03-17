const expertQuestions = [
    {
        q: "In your own words, explain the primary role of the Operating System Kernel.",
        keywords: ["manage", "hardware", "software", "bridge", "core"], 
        desc: "The Kernel acts as a bridge, managing communication between hardware and software."
    },
    {
        q: "Why is Virtual Memory essential for modern computing?",
        keywords: ["ram", "hard drive", "space", "simulate", "extension"],
        desc: "Virtual Memory uses hard drive space to simulate extra RAM, preventing system crashes."
    },
    {
        q: "Describe the benefit of an Open Source OS like Linux.",
        keywords: ["modify", "free", "community", "source code", "open"],
        desc: "Open source allows users to view, modify, and share source code freely."
    }
];

let currentIdx = 0;
let expertPoints = 0;
let isBusy = false;

document.addEventListener('DOMContentLoaded', () => {
    try {
        const user = JSON.parse(localStorage.getItem('motivaUser')) || {firstName: "ADMIN"};
        const display = document.getElementById('displayPlayer');
        if (display) display.innerText = "ARCHITECT: " + user.firstName.toUpperCase();
        
       
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !isBusy) {
               
                if(document.activeElement.id === 'sentenceInput') e.preventDefault();
                evaluateSentence();
            }
        });

        startExpertBoot();
    } catch (err) {
        console.error("Critical System Failure during initialization:", err);
    }
});

function startExpertBoot() {
    const out = document.getElementById('terminalOutput');
    const lines = ["> INITIALIZING NEURAL LINK...", "> LOADING ARCHITECT PROTOCOLS...", "> CONSOLE SECURED."];
    let i = 0;
    const interval = setInterval(() => {
        if(out) out.innerHTML += `<p>${lines[i]}</p>`;
        i++;
        if(i >= lines.length) {
            clearInterval(interval);
            setTimeout(() => {
                const boot = document.getElementById('bootScreen');
                const quiz = document.getElementById('quizInterface');
                if(boot) boot.classList.add('hidden');
                if(quiz) quiz.classList.remove('hidden');
                loadExpertQuery();
            }, 800);
        }
    }, 600);
}

function loadExpertQuery() {
    isBusy = false; 
    const q = expertQuestions[currentIdx];
    const qText = document.getElementById('questionText');
    const input = document.getElementById('sentenceInput');
    
    if (qText) qText.innerText = q.q;
    if (input) {
        input.value = "";
        input.focus();
    }
}

function evaluateSentence() {
    if (isBusy) return;
    
    const inputField = document.getElementById('sentenceInput');
    const input = inputField ? inputField.value.toLowerCase().trim() : "";
    
    if (input.length < 15) {
        alert("ANALYSIS TOO BRIEF: Minimum 15 characters required for deep-sync.");
        return;
    }

    isBusy = true; 
    const q = expertQuestions[currentIdx];
    let matchCount = 0;

   
    q.keywords.forEach(word => {
        if (input.includes(word)) matchCount++;
    });

    

    if (matchCount >= 2) {
        expertPoints += 500; 
        alert("CORE SYNC SUCCESSFUL.");
    } else {
        alert("SYNC FAILURE: Technical concepts missing.");
    }

   
    const display = document.getElementById('displayPoints');
    if (display) {
        const progress = Math.round(((currentIdx + 1) / expertQuestions.length) * 100);
        display.innerText = `NEURAL SYNC: ${progress}%`;
    }

    currentIdx++;
    if (currentIdx < expertQuestions.length) {
        loadExpertQuery();
    } else {
        showExpertFinal();
    }
}

function showExpertFinal() {
   
    const monitor = document.getElementById('systemMonitor');
    const review = document.getElementById('reviewSection');
    if (monitor) monitor.classList.add('hidden');
    if (review) review.classList.remove('hidden');

   
    const gradeDisplay = document.getElementById('performanceGrade');
    let rank = "CLASS D"; 
    if (expertPoints === 1500) rank = "CLASS S";      
    else if (expertPoints >= 1000) rank = "CLASS A";   
    else if (expertPoints >= 500) rank = "CLASS B";    

    if (gradeDisplay) {
        gradeDisplay.innerText = rank;
        if(rank === "CLASS S") gradeDisplay.style.color = "#00ff00";
    }

    
    const container = document.getElementById('reviewContainer');
    if (container) {
        container.innerHTML = `<h3 style="color:#ffcc00;">> ARCHITECT LOGS GENERATED:</h3>`;
        expertQuestions.forEach((q, idx) => {
            container.innerHTML += `
                <div style="margin-bottom:15px; border-left:3px solid #ffcc00; padding-left:10px;">
                    <p style="font-size:0.7rem; color:#aaa;">DATA_PACKET_0${idx+1}</p>
                    <p style="color:#fff;">${q.desc}</p>
                </div>`;
        });
    }

    
    try {
        let total = parseInt(localStorage.getItem('userPoints')) || 0;
        localStorage.setItem('userPoints', total + expertPoints);
        console.log("Final score saved: " + (total + expertPoints));
    } catch (e) {
        console.error("Storage error:", e);
    }

    localStorage.setItem('lesson2Completed', 'true');   
    localStorage.setItem('lesson2Progress', '100');
}

function exitToLobby() { 
    window.location.href = 'lesson2-intro.html'; 
}