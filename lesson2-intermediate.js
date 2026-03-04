const questions = [
    {
        q: "Which OS kernel part manages the CPU and Memory?",
        options: ["The Shell", "The Kernel", "The BIOS", "The Driver"],
        correct: 1,
        desc: "The **Kernel** is the 'Heart' of the OS. It manages the communication between hardware and software."
    },
    {
        q: "What type of software is 'Linux'?",
        options: ["Proprietary", "Shareware", "Open Source", "Firmware"],
        correct: 2,
        desc: "**Open Source** software allows anyone to see, modify, and distribute the code freely."
    },
    {
        q: "Which utility rearranges files to speed up disk access?",
        options: ["Disk Cleanup", "Defragmenter", "Task Manager", "Registry Editor"],
        correct: 1,
        desc: "A **Defragmenter** organizes the 'scattered' data on a hard drive so the system can read it faster."
    },
    {
        q: "What is the 'Virtual Memory' used for?",
        options: ["Storing Videos", "Simulating RAM", "Backup Data", "Internet Speed"],
        correct: 1,
        desc: "**Virtual Memory/Simulating RAM** tricks the computer into thinking it has more RAM by using space on the hard drive."
    },
    {
        q: "Which file system is standard for modern Windows versions?",
        options: ["FAT32", "NTFS", "EX-DOS", "MAC-FS"],
        correct: 1,
        desc: "**NTFS** is the modern standard, offering better security and larger file support than FAT32."
    }
];

let currentIdx = 0;
let intermediatePoints = 0;
let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    const storedUser = JSON.parse(localStorage.getItem('motivaUser'));
    const userName = (storedUser?.firstName || "BOSS").toUpperCase();
    document.getElementById('displayPlayer').innerText = "SPECIALIST: " + userName;
    runBootSequence(userName);
});

function runBootSequence(name) {
    const terminal = document.getElementById('terminalOutput');
    const sequence = [
        "INITIALIZING INTERMEDIATE KERNEL...",
        "VERIFYING SPECIALIST: " + name,
        "BYPASSING LEVEL 2 FIREWALL... DONE",
        "ACCESSING OS FOUNDATION DEEP LOGS..."
    ];
    let i = 0;
    const type = () => {
        if (i < sequence.length) {
            terminal.innerHTML += `<span style="color:#ff9800">${sequence[i]}</span>\n`;
            i++;
            setTimeout(type, 600);
        } else {
            setTimeout(() => {
                document.getElementById('bootScreen').classList.add('hidden');
                document.getElementById('quizInterface').classList.remove('hidden');
                loadQuestion();
            }, 1000);
        }
    };
    type();
}

function loadQuestion() {
    isAnimating = false;
    const qData = questions[currentIdx];
    document.getElementById('systemMsg').innerText = `[ANALYZING]: Kernel Query 0${currentIdx + 1}...`;
    document.getElementById('questionText').innerText = qData.q;
    
  
    const progress = Math.round((currentIdx / questions.length) * 100);
    document.getElementById('progValue').innerText = progress;
    document.getElementById('progFill').style.width = progress + "%";

    const grid = document.getElementById('optionsGrid');
    grid.innerHTML = "";
    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "option-btn";
        btn.innerText = `>> ${opt}`;
        btn.onclick = () => checkAnswer(idx, btn);
        grid.appendChild(btn);
    });
}

function checkAnswer(choice, btn) {
    if (isAnimating) return;
    isAnimating = true;

    if (choice === questions[currentIdx].correct) {
        btn.classList.add('btn-correct');
        intermediatePoints += 30; 
        document.getElementById('displayPoints').innerText = "ACCESS LEVEL: " + intermediatePoints;
        document.getElementById('systemMsg').innerText = "[SUCCESS]: SECTOR DECRYPTED.";
    } else {
        btn.classList.add('btn-wrong');
        document.getElementById('systemMsg').innerText = "[ERROR]: DATA CORRUPTION DETECTED.";
    }

    setTimeout(() => {
        currentIdx++;
        if (currentIdx < questions.length) loadQuestion();
        else completeLevel();
    }, 1500);
}

function completeLevel() {
    
    document.getElementById('systemMonitor').classList.add('hidden');
    document.getElementById('optionsGrid').classList.add('hidden');
    document.getElementById('reviewSection').classList.remove('hidden');

    
    const grade = document.getElementById('performanceGrade');
    if (intermediatePoints === 150) grade.innerText = "CLASS S";
    else if (intermediatePoints >= 120) grade.innerText = "CLASS A";
    else if (intermediatePoints >= 90) grade.innerText = "CLASS B";
    else grade.innerText = "CLASS D";

   
    const container = document.getElementById('reviewContainer');
    container.innerHTML = "";
    questions.forEach((q, i) => {
        container.innerHTML += `<div class="review-item"><strong>LOG 0${i+1}:</strong> ${q.desc}</div>`;
    });

   
    let total = parseInt(localStorage.getItem('userPoints')) || 0;
    localStorage.setItem('userPoints', total + intermediatePoints);
}

function exitToLobby() { window.location.href = 'lesson2-intro.html'; }