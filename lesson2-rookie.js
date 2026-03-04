const questions = [
    {
        q: "What does 'OS' stand for?",
        options: ["Operating System", "Open Software", "Office Suite", "Optical Sensor"],
        correct: 0,
        desc: "The **Operating System** is the 'Boss' of your computer. Without it, your hardware wouldn't know how to talk to your software!"
    },
    {
        q: "Which of these is considered the main 'System Software'?",
        options: ["Microsoft Word", "Windows 11", "Google Chrome", "Adobe Photoshop"],
        correct: 1,
        desc: "Unlike Apps (which do specific tasks for you), **Windows 11** is System Software—it manages the computer itself so your apps can run."
    },
    {
        q: "What is the background screen of an OS called?",
        options: ["Home Screen", "The Wall", "The Desktop", "The Window"],
        correct: 2,
        desc: "The **Desktop** is your digital workspace. Fun fact: It was designed in the 1970s to mimic a real physical desk to make computers easier to use!"
    },
    {
        q: "In software, what is a 'Bug'?",
        options: ["A computer virus", "A small insect", "An error in the code", "A hardware part"],
        correct: 2,
        desc: "A **Bug** is a coding error. The term became famous when Grace Hopper found an *actual moth* stuck in a computer in 1947!"
    },
    {
        q: "Which software allows you to browse the Internet?",
        options: ["Operating System", "Web Browser", "Database", "Word Processor"],
        correct: 1,
        desc: "A **Web Browser** is like a translator—it takes complicated code from the internet and turns it into the websites you see."
    }
];

let currentIdx = 0;
let rookiePoints = 0;
let isAnimating = false; 

document.addEventListener('DOMContentLoaded', () => {
    
    const storedUserJSON = localStorage.getItem('motivaUser');
    let userName = "BOSS";
    if (storedUserJSON) {
        try {
            const user = JSON.parse(storedUserJSON);
            userName = (user.firstName || "BOSS").toUpperCase();
        } catch(e) { console.error("Identity data error."); }
    }

  
    const playerDisplay = document.getElementById('displayPlayer');
    if (playerDisplay) playerDisplay.innerText = "OPERATOR: " + userName;

    
    runBootSequence(userName);
});

function runBootSequence(name) {
    const terminal = document.getElementById('terminalOutput');
    if (!terminal) return;

    const bootSequence = [
        "ACT STARTUP BIOS (C) 2026",
        "CHECKING MEMORY... OK",
        "CONNECTING TO MOTIVAQUIZ MAINFRAME... SECURE",
        "> IDENTIFYING USER...",
        "> WELCOME, OPERATOR " + name,
        "> VERIFYING CLEARANCE...",
        "> CLEARANCE LEVEL: ROOKIE GRANTED",
        "> LOADING OS FOUNDATION MODULE..."
    ];

    let lineIdx = 0;
    const typeLine = () => {
        if (lineIdx < bootSequence.length) {
            terminal.innerHTML += bootSequence[lineIdx] + "\n";
            lineIdx++;
            setTimeout(typeLine, 500); 
        } else {
            setTimeout(() => {
                document.getElementById('bootScreen').classList.add('hidden');
                document.getElementById('quizInterface').classList.remove('hidden');
                loadQuestion();
            }, 800);
        }
    };
    typeLine(); 
}

function loadQuestion() {
    isAnimating = false; 
    const qData = questions[currentIdx];
    
    
    document.getElementById('systemMsg').innerText = `[SYSTEM]: Analyzing Query 0${currentIdx + 1}...`;
    document.getElementById('questionText').innerText = qData.q;
    
    const progressPercent = Math.round((currentIdx / questions.length) * 100);
    document.getElementById('progValue').innerText = progressPercent;
    document.getElementById('progFill').style.width = progressPercent + "%";

    
    const optionsGrid = document.getElementById('optionsGrid');
    optionsGrid.innerHTML = "";

    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = `> ${opt}`;
        btn.onclick = () => checkAnswer(index, btn);
        optionsGrid.appendChild(btn);
    });
}

function checkAnswer(choice, btnElement) {
    if (isAnimating) return; 
    isAnimating = true;

    const isCorrect = (choice === questions[currentIdx].correct);

    if (isCorrect) {
        btnElement.classList.add('btn-correct');
        document.getElementById('systemMsg').innerText = "[SYSTEM]: DATA ACCEPTED. +20 Points.";
        document.getElementById('systemMsg').style.color = "#4CAF50";
        rookiePoints += 20; 
        document.getElementById('displayPoints').innerText = "DATA MINED: " + rookiePoints;
    } else {
        btnElement.classList.add('btn-wrong');
        document.getElementById('systemMsg').innerText = "[SYSTEM]: ERROR. INCORRECT DATA.";
        document.getElementById('systemMsg').style.color = "#F44336";
    }

    setTimeout(() => {
        document.getElementById('systemMsg').style.color = "#00ffcc"; 
        currentIdx++;
        if (currentIdx < questions.length) {
            loadQuestion();
        } else {
            completeLevel();
        }
    }, 1200);
}

function completeLevel() {
   
    const monitor = document.getElementById('systemMonitor'); 
    const options = document.getElementById('optionsGrid');
    const questionBox = document.getElementById('questionBox');
    const review = document.getElementById('reviewSection');

    if (monitor) monitor.classList.add('hidden');
    if (options) options.classList.add('hidden');
    if (questionBox) questionBox.classList.add('hidden');

    
    if (review) {
        review.classList.remove('hidden');
        
       
        const gradeDisplay = document.getElementById('performanceGrade');
        if (gradeDisplay) {
            if (rookiePoints >= 100) gradeDisplay.innerText = "S-RANK";
            else if (rookiePoints >= 80) gradeDisplay.innerText = "A-RANK";
            else if (rookiePoints >= 60) gradeDisplay.innerText = "B-RANK";
            else gradeDisplay.innerText = "C-RANK";
        }

        
        const nameSpan = document.querySelector('.user-name-span');
        const userData = localStorage.getItem('motivaUser');
        if (nameSpan && userData) {
            nameSpan.innerText = JSON.parse(userData).firstName.toUpperCase();
        }

       
        const container = document.getElementById('reviewContainer');
        if (container) {
            container.innerHTML = ""; 
            questions.forEach((item, index) => {
                const reviewDiv = document.createElement('div');
                reviewDiv.className = "review-item";
                reviewDiv.innerHTML = `
                    <span class="review-q">LOG 0${index + 1}: ${item.q}</span>
                    <p class="review-a"><strong>ANALYSIS:</strong> ${item.desc}</p>
                `;
                container.appendChild(reviewDiv);
            });
        }
    }

    
    let totalPoints = parseInt(localStorage.getItem('userPoints')) || 0;
    localStorage.setItem('userPoints', totalPoints + rookiePoints);
}

function exitToLobby() {
    window.location.href = 'lesson2-intro.html';
}