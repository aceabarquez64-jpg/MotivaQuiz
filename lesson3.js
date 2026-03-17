const networkPhases = {
    1: {
        title: "PHASE 1: BASIC PROTOCOLS (Decision)",
        type: "decision",
        points: 100,
        questions: [
            { q: "What does LAN stand for?", choices: ["Large Area Network", "Local Area Network", "Logical Access Node"], ans: 1, desc: "LAN connects computers in a limited area like a home or office." },
            { q: "Which device is primarily used to forward data between different networks?", choices: ["Switch", "Hub", "Router"], ans: 2, desc: "Routers direct traffic between networks, usually connecting LANs to the Internet." }
        ]
    },
    2: {
        title: "PHASE 2: NETWORK SCENARIOS (Decision)",
        type: "decision",
        points: 200,
        questions: [
            { q: "You need to automatically assign IP addresses to 50 new computers. Which protocol do you use?", choices: ["DNS", "DHCP", "FTP"], ans: 1, desc: "DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses." },
            { q: "A user wants to securely browse a banking website. Which protocol ensures the data is encrypted?", choices: ["HTTP", "HTTPS", "SMTP"], ans: 1, desc: "HTTPS encrypts web traffic to secure sensitive data like passwords." }
        ]
    },
    3: {
        title: "PHASE 3: SECURITY & IDENTIFICATION (Short Answer)", 
        type: "identification",
        points: 300,
        questions: [
            { q: "What is the unique, physical address hardcoded into a network card?", keywords: ["mac"], desc: "The MAC address is a unique hardware identifier assigned to a network interface controller." },
            { q: "What system acts as the 'phonebook' of the internet, translating domain names into IP addresses?", keywords: ["dns", "domain name system"], desc: "DNS translates human-readable domain names (like google.com) into machine IP addresses." },
            { q: "What software or hardware security system monitors and controls incoming and outgoing network traffic?", keywords: ["firewall"], desc: "A Firewall acts as a barrier between a trusted network and untrusted networks (like the internet)." }
        ]
    },
    4: {
        title: "PHASE 4: EXPERT ANALYSIS (Sentence Synthesis)",
        type: "sentence",
        points: 500,
        questions: [
            { q: "In your own words, explain the primary difference between TCP and UDP protocols.", keywords: ["reliable", "connection", "fast", "speed", "guarantee"], desc: "TCP guarantees reliable delivery (connection-oriented), while UDP prioritizes speed without guarantees (connectionless)." },
            { q: "Explain the role of a 'Gateway' within a network infrastructure.", keywords: ["exit", "entry", "point", "network", "connect"], desc: "A default gateway serves as an access point or IP router that a networked computer uses to send information to a different network." },
            { q: "Why is an IP Address (v4 or v6) essential for data packet routing?", keywords: ["destination", "identify", "location", "packet", "send"], desc: "An IP address provides the logical location of a device, ensuring data packets are routed to the correct destination on the global web." }
        ]
    }
};


let currentPhase = 1;
let currentIdx = 0;
let sessionPoints = 0;
let reviewLogs = []; 
let isBusy = false;


document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('motivaUser')) || {firstName: "ADMIN"};
    const display = document.getElementById('displayPlayer');
    if (display) display.innerText = "OPERATOR: " + user.firstName.toUpperCase();
    
    startNetworkBoot();
});


function startNetworkBoot() {
    const out = document.getElementById('terminalOutput');
    const lines = [
        "> INITIALIZING 4-STAGE NETWORK UPLINK...", 
        "> LOADING DECISION MATRICES...", 
        "> SECURING TERMINAL...",
        "> READY."
    ];
    let i = 0;
    const interval = setInterval(() => {
        if(out) out.innerHTML += `<p>${lines[i]}</p>`;
        i++;
        if(i >= lines.length) {
            clearInterval(interval);
            setTimeout(() => {
                document.getElementById('bootScreen').classList.add('hidden');
                document.getElementById('quizInterface').classList.remove('hidden');
                loadQuestion();
            }, 800);
        }
    }, 400);
}


function loadQuestion() {
    isBusy = false;
    const phaseData = networkPhases[currentPhase];
    const qData = phaseData.questions[currentIdx];
    
    document.getElementById('displayPoints').innerText = `UPLINK: PHASE ${currentPhase}/4`;
    document.getElementById('questionText').innerHTML = `<span style="color:#ffcc00;">[${phaseData.title}]</span><br><br>${qData.q}`;
    
    const inputContainer = document.getElementById('sentenceInput').parentElement;
    let dynamicArea = document.getElementById('dynamicInputArea');
    if (!dynamicArea) {
        document.getElementById('sentenceInput').style.display = 'none';
        document.querySelector('button[onclick="evaluateSentence()"]').style.display = 'none';
        dynamicArea = document.createElement('div');
        dynamicArea.id = 'dynamicInputArea';
        dynamicArea.style.marginTop = '20px';
        inputContainer.appendChild(dynamicArea);
    }
    
    dynamicArea.innerHTML = ""; 

    if (phaseData.type === "decision") {
        qData.choices.forEach((choice, index) => {
            const btn = document.createElement('button');
            btn.innerText = choice;
            btn.style.cssText = "display:block; width:100%; margin-bottom:10px; padding:15px; background:#111; color:#00a8ff; border:1px solid #00a8ff; cursor:pointer; font-weight:bold; text-align:left;";
            btn.onclick = () => evaluateDecision(index);
            dynamicArea.appendChild(btn);
        });
    } 
    else if (phaseData.type === "identification" || phaseData.type === "sentence") {
        const minChars = phaseData.type === "sentence" ? 15 : 2;
        const placeholder = phaseData.type === "sentence" ? "Type detailed analysis..." : "Enter short identifier...";
        
        dynamicArea.innerHTML = `
            <textarea id="tempTextInput" rows="3" style="width:100%; width:-webkit-fill-available; background:#000; color:#00ff00; border:1px solid #00a8ff; padding:15px; font-family:monospace;" placeholder="${placeholder}"></textarea>
            <button onclick="evaluateText(${minChars})" style="margin-top:15px; background:#00a8ff; color:#000; border:none; padding:10px 20px; cursor:pointer; font-weight:bold;">SUBMIT DATA</button>
        `;
        document.getElementById('tempTextInput').focus();
    }
}


function evaluateDecision(selectedIndex) {
    if (isBusy) return;
    isBusy = true;
    const phaseData = networkPhases[currentPhase];
    const qData = phaseData.questions[currentIdx];
    
    if (selectedIndex === qData.ans) {
        sessionPoints += phaseData.points;
        alert("> ACCEPTED: Routing optimal.");
        reviewLogs.push({ q: qData.q, desc: qData.desc, status: "SUCCESS" });
    } else {
        alert("> DENIED: Invalid routing protocol.");
        reviewLogs.push({ q: qData.q, desc: qData.desc, status: "FAILED" });
    }
    advanceProgress();
}

function evaluateText(minChars) {
    if (isBusy) return;
    const input = document.getElementById('tempTextInput').value.toLowerCase().trim();
    if (input.length < minChars) {
        alert(`> ERROR: Input must be at least ${minChars} characters.`);
        return;
    }

    isBusy = true;
    const phaseData = networkPhases[currentPhase];
    const qData = phaseData.questions[currentIdx];
    let matchCount = 0;
    qData.keywords.forEach(word => { if (input.includes(word)) matchCount++; });

    const requiredMatches = phaseData.type === "identification" ? 1 : 2;

    if (matchCount >= requiredMatches) {
        sessionPoints += phaseData.points;
        alert("> ACCEPTED: Data integrity verified.");
        reviewLogs.push({ q: qData.q, desc: qData.desc, status: "SUCCESS" });
    } else {
        alert("> DENIED: Technical discrepancy detected.");
        reviewLogs.push({ q: qData.q, desc: qData.desc, status: "FAILED" });
    }
    advanceProgress();
}

function advanceProgress() {
    currentIdx++;
    const phaseData = networkPhases[currentPhase];
    
    if (currentIdx < phaseData.questions.length) {
        loadQuestion();
    } else {
        currentPhase++;
        currentIdx = 0;
        if (currentPhase > 4) {
            showFinalReview();
        } else {
            alert(`> PHASE ${currentPhase - 1} SECURED. INITIATING PHASE ${currentPhase}...`);
            loadQuestion();
        }
    }
}


function showFinalReview() {
    document.getElementById('quizInterface').classList.add('hidden');
    document.getElementById('reviewSection').classList.remove('hidden');

    const gradeDisplay = document.getElementById('performanceGrade');
    let rank = "CLASS C"; 
   
    if (sessionPoints >= 2700) rank = "CLASS S";      
    else if (sessionPoints >= 2000) rank = "CLASS A";   
    else if (sessionPoints >= 1200) rank = "CLASS B";    

    gradeDisplay.innerText = rank;
    if(rank === "CLASS S") gradeDisplay.style.color = "#00ff00";

    const container = document.getElementById('reviewContainer');
    container.innerHTML = `<h3 style="color:#00a8ff;">> POST-MISSION NETWORK LOGS:</h3>`;
    
    reviewLogs.forEach((log, idx) => {
        const color = log.status === "SUCCESS" ? "#00ff00" : "#ff3333";
        container.innerHTML += `
            <div style="border-left: 3px solid ${color}; padding-left: 15px; margin-bottom: 15px; background: #111; padding: 10px;">
                <p style="font-size:0.8rem; color:${color}; margin: 0 0 5px 0;">[${log.status}] NODE_DATA_0${idx+1}: ${log.q}</p>
                <p style="color:#fff; margin: 0;">${log.desc}</p>
            </div>`;
    });

    try {
        let total = parseInt(localStorage.getItem('userPoints')) || 0;
        localStorage.setItem('userPoints', total + sessionPoints);
        localStorage.setItem('lesson3Completed', 'true');   
        console.log("System Data Saved Successfully.");
    } catch (e) { console.error("Storage error:", e); }
}

function exitToLobby() { window.location.href = 'gametopics.html'; }