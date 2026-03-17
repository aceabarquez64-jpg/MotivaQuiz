  let selectedTopicValue = 'random';
        let userPoints = parseInt(localStorage.getItem('userPoints')) || 455;

        document.getElementById('userPoints').textContent = userPoints;

        
        function generateMatchCode() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let code = '';
            for (let i = 0; i < 6; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return code;
        }

        document.getElementById('matchCode').textContent = generateMatchCode();

        function selectMode(mode) {
            document.getElementById('modeSelection').style.display = 'none';
            document.getElementById('matchSetup').style.display = 'block';
        }

        function selectTopic(button, topic) {
            document.querySelectorAll('.topic-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
            selectedTopicValue = topic;
        }

        function backToSelection() {
            document.getElementById('matchSetup').style.display = 'none';
            document.getElementById('modeSelection').style.display = 'block';
        }

        function startMatch() {
            window.location.href = '1v1mode-updated.html';
        }