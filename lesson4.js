const troubleshootingData = [
    { q: "A computer turns on, but the screen is black and it makes 3 long beeps. What is the likely cause?", type: "choice", choices: ["Bad RAM", "Power Supply Failure", "Keyboard Disconnected"], ans: 0, desc: "Beep codes are hardware alerts; 3 long beeps typically indicate a Memory (RAM) issue." },
    { q: "What is the first logical step when a peripheral device (like a printer) stops responding?", type: "choice", choices: ["Replace the motherboard", "Check physical connections/cables", "Reinstall Windows"], ans: 1, desc: "Always start with the simplest solution: checking cables and power." },
    { q: "What tool in Windows allows you to stop a 'Not Responding' application?", type: "id", keywords: ["task manager"], desc: "Task Manager is the primary tool for force-closing frozen processes." },
    { q: "To prevent data loss during a power surge, what device should a PC be plugged into?", type: "id", keywords: ["ups", "uninterruptible power supply", "surge protector"], desc: "A UPS or Surge Protector prevents voltage spikes from frying components." },
    { q: "Describe the purpose of 'Safe Mode' in an Operating System.", type: "sentence", keywords: ["minimal", "drivers", "diagnostic", "fix", "troubleshoot"], desc: "Safe Mode loads the OS with a minimal set of drivers to help isolate and fix software conflicts." },
    { q: "Explain why 'Disk Defragmentation' or 'Optimization' is useful for older HDDs.", type: "sentence", keywords: ["organize", "files", "speed", "performance", "access"], desc: "Defragging reorganizes fragmented data so the drive head can access files faster, improving performance." }
];


let currentIdx = 0;
let points = 0;
let logs = [];

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('motivaUser')) || {firstName: "TECH"};
    document.getElementById('displayPlayer').innerText = "OPERATOR: " + user.firstName.toUpperCase();
    runBootSequence();
});

function runBootSequence() {
    const out = document.getElementById('terminalOutput');
    const msg = ["> INITIATING SYSTEM SCAN...", "> DETECTING HARDWARE CONFLICTS...", "> READY FOR REPAIR."];
    let i = 0;
    const timer = setInterval(() => {
        out.innerHTML += `<p style="color:#ff8c00">${msg[i]}</p>`;
        i++;
        if(i >= msg.length) {
            clearInterval(timer);
            setTimeout(() => {
                document.getElementById('bootScreen').classList.add('hidden');
                document.getElementById('quizInterface').classList.remove('hidden');
                loadQuestion();
            }, 800);
        }
    }, 500);
}


function loadQuestion() {
    const qData = troubleshootingData[currentIdx];
    document.getElementById('displayPhase').innerText = `DIAGNOSTIC_MODE: ${currentIdx + 1}/6`;
    document.getElementById('questionText').innerText = `> ${qData.q}`;
    
    const area = document.getElementById('inputArea');
    area.innerHTML = ""; // Clear

    if(qData.type === "choice") {
        qData.choices.forEach((c, i) => {
            const btn = document.createElement('button');
            btn.className = "action-btn";
            btn.innerText = c;
            btn.onclick = () => validate(i);
            area.appendChild(btn);
        });
    } else {
        area.innerHTML = `
            <textarea id="textIn" style="width:100%; height:80px; background:#000; color:#00ff00; border:1px solid #ff8c00; padding:10px; font-family:inherit;"></textarea>
            <button class="action-btn" onclick="validateText()">RUN DIAGNOSTIC</button>
        `;
        document.getElementById('textIn').focus();
    }
}

function validate(choiceIdx) {
    const q = troubleshootingData[currentIdx];
    const success = choiceIdx === q.ans;
    processResult(success, q);
}

function validateText() {
    const val = document.getElementById('textIn').value.toLowerCase();
    const q = troubleshootingData[currentIdx];
    let match = 0;
    q.keywords.forEach(k => { if(val.includes(k)) match++; });
    
   
    const threshold = q.type === "id" ? 1 : 2;
    processResult(match >= threshold, q);
}

function processResult(isCorrect, qData) {
    if(isCorrect) {
        points += 500;
        alert("SECTOR REPAIRED/you did it.");
    } else {
        alert("REPAIR FAILED: Analyzing discrepancy...");
    }
    logs.push({ q: `Sector ${currentIdx + 1}`, status: isCorrect ? "SUCCESS" : "FAILED", desc: qData.desc });
    
    currentIdx++;
    if(currentIdx < troubleshootingData.length) loadQuestion();
    else finalizeLesson();
}


function finalizeLesson() {
    document.getElementById('quizInterface').classList.add('hidden');
    document.getElementById('reviewSection').classList.remove('hidden');

   
    const rankDisplay = document.getElementById('performanceRank');
    let rank = "TOP 5: TRAINEE";
    if (points >= 3000) rank = "TOP 1: SYSTEM ARCHITECT";
    else if (points >= 2500) rank = "TOP 2: SENIOR TECHNICIAN";
    else if (points >= 2000) rank = "TOP 3: FIELD ENGINEER";
    else if (points >= 1000) rank = "TOP 4: JUNIOR REPAIRMAN";

    rankDisplay.innerText = rank;
    rankDisplay.style.color = (points >= 2500) ? "#00ff00" : "#ff8c00";

   
    const tbody = document.getElementById('reviewTableBody');
    logs.forEach(l => {
        tbody.innerHTML += `
            <tr>
                <td>${l.q}</td>
                <td class="${l.status === 'SUCCESS' ? 'status-success' : 'status-failed'}">${l.status}</td>
                <td>${l.desc}</td>
            </tr>
        `;
    });

   
    let total = parseInt(localStorage.getItem('userPoints')) || 0;
    localStorage.setItem('userPoints', total + points);
    localStorage.setItem('lesson4Completed', 'true');
}

function exitToLobby() { window.location.href = 'gametopics.html'; }