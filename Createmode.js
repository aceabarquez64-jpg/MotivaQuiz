
    let lobbyState = {
        rounds: 4,
        timer: 30,
        topic: 'hardware',
        roomCode: '',
        players: [],
        maxPlayers: 20
    };

    const TOPIC_LABELS = {
        hardware:    '💻 Computer Hardware',
        networking:  '🌐 Networking',
        programming: '👨‍💻 Programming',
        software:    '📱 Software',
        security:    '🔒 Security',
        random:      '🎲 Random Mix'
    };

    const COUNTER_LIMITS = {
        rounds: { min: 1,  max: 10 },
        timer:  { min: 10, max: 120, step: 5 }
    };

    function adjustCounter(type, delta) {
        const lim = COUNTER_LIMITS[type];
        if (type === 'rounds') {
            lobbyState.rounds = Math.min(lim.max, Math.max(lim.min, lobbyState.rounds + delta));
            document.getElementById('roundsVal').textContent = lobbyState.rounds;
        } else {
            lobbyState.timer = Math.min(lim.max, Math.max(lim.min, lobbyState.timer + delta));
            document.getElementById('timerVal').textContent = lobbyState.timer;
        }
    }

  
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            lobbyState.topic = chip.dataset.topic;
        });
    });

    
    function generateCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
        return code;
    }

    
    function createLobby() {
        const sessionName = document.getElementById('sessionName').value.trim();
        if (!sessionName) {
            showToast('⚠️ Please enter a session name first!');
            return;
        }

        lobbyState.roomCode   = generateCode();
        lobbyState.maxPlayers = parseInt(document.getElementById('maxPlayers').value);
        const difficulty      = document.getElementById('difficulty').value;

        
        const settings = {
            sessionName,
            topic:      lobbyState.topic,
            rounds:     lobbyState.rounds,
            timer:      lobbyState.timer,
            maxPlayers: lobbyState.maxPlayers,
            difficulty,
            roomCode:   lobbyState.roomCode,
            leaderboard: document.getElementById('toggleLeaderboard').checked,
            chat:        document.getElementById('toggleChat').checked,
            anonymous:   document.getElementById('toggleAnon').checked
        };
        localStorage.setItem('teacherLobbySettings', JSON.stringify(settings));

       
        document.getElementById('roomCodeDisplay').textContent = lobbyState.roomCode;
        document.getElementById('summSession').textContent = sessionName;
        document.getElementById('summTopic').textContent   = TOPIC_LABELS[lobbyState.topic];
        document.getElementById('summRounds').textContent  = lobbyState.rounds + ' rounds';
        document.getElementById('summTimer').textContent   = lobbyState.timer + ' sec';
        document.getElementById('summDiff').textContent    = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
        document.getElementById('summMax').textContent     = lobbyState.maxPlayers + ' players';
        document.getElementById('lobbyMeta').textContent   = `0 / ${lobbyState.maxPlayers} players joined`;

       
        document.getElementById('screenSetup').classList.remove('active');
        document.getElementById('screenLobby').classList.add('active');

        addChatMessage('system', '🏫 Lobby created! Share the room code with your students.');
        showToast('✅ Lobby created! Room code: ' + lobbyState.roomCode);

        
        simulateStudentsJoining();
    }

   
    function simulateStudentsJoining() {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= DEMO_STUDENTS.length) { clearInterval(interval); return; }
            const student = DEMO_STUDENTS[i];
            addPlayer(student);
            addChatMessage('system', `${student.avatar} ${student.name} joined the lobby`);
            i++;
        }, 1400);
    }

   
    function addPlayer(student) {
        const placeholder = document.getElementById('waitingPlaceholder');
        if (placeholder) placeholder.remove();

        const grid = document.getElementById('playersGrid');
        const card = document.createElement('div');
        card.className = 'player-card';
        card.id = 'player-' + student.name.replace(/\s/g, '');
        card.innerHTML = `
            <div class="player-avatar">${student.avatar}</div>
            <div style="min-width:0">
                <div class="player-name">${student.name}</div>
                <div class="player-status">✓ Ready</div>
            </div>
            <button class="kick-btn" onclick="kickPlayer('${student.name}')" title="Remove student">✕</button>
        `;
        grid.appendChild(card);

        lobbyState.players.push(student);
        updatePlayerCount();
    }

   
    function kickPlayer(name) {
        const card = document.getElementById('player-' + name.replace(/\s/g, ''));
        if (card) { card.style.transform = 'scale(0)'; card.style.opacity = '0'; setTimeout(() => card.remove(), 300); }
        lobbyState.players = lobbyState.players.filter(p => p.name !== name);
        addChatMessage('system', `⚠️ ${name} was removed from the lobby`);
        updatePlayerCount();
        showToast(`${name} removed from lobby`);
    }

   
    function updatePlayerCount() {
        const count = lobbyState.players.length;
        document.getElementById('playerCountBadge').textContent = count + ' joined';
        document.getElementById('lobbyMeta').textContent = `${count} / ${lobbyState.maxPlayers} players joined`;

        const startBtn = document.getElementById('startBtn');
        startBtn.disabled = count < 2;
    }

   
    function addChatMessage(type, text) {
        const box = document.getElementById('chatBox');
        const msg = document.createElement('div');
        msg.className = 'chat-msg' + (type === 'system' ? ' system' : '');
        msg.innerHTML = type === 'teacher'
            ? `<strong>👩‍🏫 You:</strong> ${text}`
            : text;
        box.appendChild(msg);
        box.scrollTop = box.scrollHeight;
    }

    function sendChat() {
        const input = document.getElementById('chatInput');
        const msg = input.value.trim();
        if (!msg) return;
        addChatMessage('teacher', msg);
        input.value = '';
    }

   
    function copyCode() {
        navigator.clipboard.writeText(lobbyState.roomCode).catch(() => {});
        showToast('📋 Room code copied: ' + lobbyState.roomCode);
    }

    
    function startQuiz() {
        if (lobbyState.players.length < 2) return;
        showToast('🚀 Starting quiz...');
        addChatMessage('system', '🚀 The teacher is starting the quiz! Good luck everyone!');
        setTimeout(() => {
            alert(`🎮 Quiz Starting!\n\nSession: ${document.getElementById('summSession').textContent}\nPlayers: ${lobbyState.players.length}\nRoom Code: ${lobbyState.roomCode}\n\n(This would redirect to the quiz engine)`);
           
        }, 800);
    }

    
    function endLobby() {
        if (!confirm('Are you sure you want to end and close this lobby?')) return;
        localStorage.removeItem('teacherLobbySettings');
        document.getElementById('screenLobby').classList.remove('active');
        document.getElementById('screenSetup').classList.add('active');
        lobbyState.players = [];
        document.getElementById('playersGrid').innerHTML = `
            <div class="waiting-placeholder" id="waitingPlaceholder">
                <div class="big-icon">⏳</div>
                <p>Waiting for students to join...</p>
            </div>`;
        document.getElementById('chatBox').innerHTML = '';
        showToast('Lobby closed.');
    }

    
    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function startQuiz() {
    window.location.href = 'Createmode-updated.html';
}