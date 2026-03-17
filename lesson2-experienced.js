const questions = [
    {
        q: "What is the core program of an OS that directly manages the CPU and Memory? (Hint: Heart of the OS)",
        acceptedAnswers: ["kernel", "the kernel"],
        desc: "The Kernel. is the foundational layer that bridges software applications to physical hardware."
    },
    {
        q: "What utility program organizes scattered file fragments on a hard drive to improve speed?",
        acceptedAnswers: ["defragmenter", "disk defragmenter", "defrag"],
        desc: "A Defragmenter. drastically improves read/write speeds on older mechanical hard drives."
    },
    {
        q: "Name the open-source operating system famous for its use in servers and represented by a penguin.",
        acceptedAnswers: ["linux", "gnu/linux"],
        desc: "Linux. is widely used in enterprise environments because of its security, stability, and open-source nature."
    },
    {
        q: "What type of memory uses a portion of the hard drive to simulate extra RAM?",
        acceptedAnswers: ["virtual memory", "virtual", "pagefile", "swap"],
        desc: "Virtual Memory. prevents a system crash when physical RAM is entirely consumed."
    },
    {
        q: "In Windows, what is the main system software that allows you to manage files and folders visually?",
        acceptedAnswers: ["file explorer", "windows explorer", "explorer"],
        desc: "File Explorer. provides the Graphical User Interface (GUI) for navigating your file system."
    }
];

let currentIdx = 0;
let experiencedPoints = 0;
let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
   
    const storedUser = JSON.parse(localStorage.getItem('motivaUser'));
    const userName = (storedUser?.firstName || "BOSS").toUpperCase();
    document.getElementById('displayPlayer').innerText = "ADMIN: " + userName;
    
    
    const inputField = document.getElementById('answerInput');
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            submitAnswer();
        }
    });

    
    runBootSequence(userName);
});

function runBootSequence(name) {
    const terminal = document.getElementById('terminalOutput');
    const sequence = [
        "ACT MAINFRAME SECURE LOGIN...",
        "AUTHENTICATING ADMIN: " + name,
        "WARNING: MANUAL OVERRIDE PROTOCOLS INITIATED.",
        "DISABLING MULTIPLE CHOICE ASSISTANCE...",
        "LOADING COMMAND PROMPT..."
    ];
    
    let i = 0;
    const type = () => {
        if (i < sequence.length) {
            terminal.innerHTML += `<div style="color:#ffcc00; margin-bottom: 5px;">> ${sequence[i]}</div>`;
            i++;
            setTimeout(type, 500);
        } else {
            setTimeout(() => {
                document.getElementById('bootScreen').classList.add('hidden');
                document.getElementById('quizInterface').classList.remove('hidden');
                loadQuestion();
            }, 800);
        }
    };
    type();
}

function loadQuestion() {
    isAnimating = false;
    const qData = questions[currentIdx];
    
    
    document.getElementById('systemMsg').innerText = `[QUERY 0${currentIdx + 1}]: Awaiting Command...`;
    document.getElementById('questionText').innerText = qData.q;
    
   
    const inputField = document.getElementById('answerInput');
    const inputSection = document.getElementById('inputSection');
    inputField.value = "";
    inputField.disabled = false;
    inputSection.className = "input-section"; 
    
   
    inputField.focus();

   
    const progress = Math.round((currentIdx / questions.length) * 100);
    document.getElementById('progValue').innerText = progress;
    document.getElementById('progFill').style.width = progress + "%";
}

function submitAnswer() {
    if (isAnimating) return; 
    const inputField = document.getElementById('answerInput');
    const userAnswer = inputField.value.trim().toLowerCase(); 
    
    if (userAnswer === "") return; 
    
    isAnimating = true;
    inputField.disabled = true; 
    
    const qData = questions[currentIdx];
    const inputSection = document.getElementById('inputSection');
    const systemMsg = document.getElementById('systemMsg');

    
    const isCorrect = qData.acceptedAnswers.includes(userAnswer);

    if (isCorrect) {
        inputSection.classList.add('input-correct');
        experiencedPoints += 40; 
        document.getElementById('displayPoints').innerText = "SYS-POINTS: " + experiencedPoints;
        systemMsg.innerText = "[OVERRIDE ACCEPTED]: Identity Confirmed.";
        systemMsg.style.color = "#4caf50";
    } else {
        inputSection.classList.add('input-wrong');
        systemMsg.innerText = `[ERROR]: Command Rejected. (Expected: ${qData.acceptedAnswers[0].toUpperCase()})`;
        systemMsg.style.color = "#f44336";
    }

   
    setTimeout(() => {
        systemMsg.style.color = "#ffcc00"; 
        currentIdx++;
        
        if (currentIdx < questions.length) {
            loadQuestion();
        } else {
            completeLevel();
        }
    }, 2000);
}

function completeLevel() {
  
    document.getElementById('systemMonitor').classList.add('hidden');
    document.getElementById('reviewSection').classList.remove('hidden');

   
    document.getElementById('progValue').innerText = "100";
    document.getElementById('progFill').style.width = "100%";

   
    const grade = document.getElementById('performanceGrade');
    let rank = "CLASS D";
    
    if (experiencedPoints === 200) rank = "CLASS S";
    else if (experiencedPoints >= 160) rank = "CLASS A";
    else if (experiencedPoints >= 120) rank = "CLASS B";
    
    grade.innerText = rank;
    
  
    const container = document.getElementById('reviewContainer');
    container.innerHTML = ""; 
    questions.forEach((q, i) => {
        container.innerHTML += `
            <div class="review-item">
                <p><strong>LOG 0${i+1} ANALYSIS:</strong></p>
                <p style="color: #fff;">${q.desc}</p>
            </div>`;
    });

   
    let currentTotal = parseInt(localStorage.getItem('userPoints')) || 0;
    localStorage.setItem('userPoints', currentTotal + experiencedPoints);
}

function exitToLobby() {
    window.location.href = 'lesson2-intro.html';
}