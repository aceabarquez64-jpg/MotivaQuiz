const animationQuest = [
    {
        principle: "1. Squash and Stretch",
        info: "This principle gives the illusion of weight and volume to a character or object as it moves. Imagine a bouncing ball flattening when it hits the ground.",
        visualText: "🟢 ➡ 🏈 ➡ 🟢 (Bouncing Ball)",
        q: "If an animator wants to show that a falling anvil is incredibly heavy when it hits the ground, which principle should they apply?",
        choices: ["Staging", "Squash and Stretch", "Solid Drawing"],
        ans: 1,
        desc: "Squash and Stretch emphasizes the weight and physical impact of the object."
    },
    {
        principle: "2. Anticipation",
        info: "Used to prepare the audience for an action, making it look more realistic. A character must pull their arm back before throwing a pitch.",
        visualText: "🧍‍♂️ ➡ 🏌️‍♂️ (Winding up for a swing)",
        q: "Before a cartoon frog leaps across a pond, it crouches down low. This is an example of:",
        choices: ["Anticipation", "Exaggeration", "Follow Through"],
        ans: 0,
        desc: "Anticipation prepares the viewer's eye for the main action (the leap)."
    },
    {
        principle: "3. Staging",
        info: "Staging directs the audience's attention to what is of greatest importance in a scene. It is about the clear presentation of an idea.",
        visualText: "🎬 🔦 (Spotlight on the main character)",
        q: "An animator darkens the background and places a bright light on a single character holding a mysterious key. What principle is at work?",
        choices: ["Timing", "Secondary Action", "Staging"],
        ans: 2,
        desc: "Staging ensures the audience looks exactly where the story needs them to look."
    },
    {
        principle: "4. Straight Ahead Action and Pose to Pose",
        info: "Straight Ahead means drawing out a scene frame by frame from start to finish. Pose to Pose involves planning out the keyframes first and filling in the intervals later.",
        visualText: "🎞️ ➡ 🎞️ ➡ 🎞️ (Keyframes vs Frame-by-Frame)",
        q: "If you draw the start, middle, and end of a jump first, and then fill in the rest, which technique are you using?",
        choices: ["Straight Ahead Action", "Pose to Pose", "Overlapping Action"],
        ans: 1,
        desc: "Pose to Pose gives the animator more control over the timing and structure of the scene."
    },
    {
        principle: "5. Follow Through and Overlapping Action",
        info: "When the main body of a character stops, all other parts (like hair or a cape) continue to catch up to the main mass. Nothing stops all at once.",
        visualText: "🦸‍♂️ 💨 (Cape fluttering after stopping)",
        q: "A character suddenly stops running, but their long hair swings forward over their face. Which principle does this demonstrate?",
        choices: ["Follow Through", "Arcs", "Appeal"],
        ans: 0,
        desc: "Follow Through creates realism by showing that momentum affects different parts of a character differently."
    },
    {
        principle: "6. Slow In and Slow Out",
        info: "Movement in the real world needs time to accelerate and slow down. More frames are drawn near the beginning and end of an action, and fewer in the middle.",
        visualText: "🚗 ... 🚙 . 🚙 (Car accelerating)",
        q: "To make a swinging pendulum look natural, an animator adds more frames at the top of the swing and fewer at the bottom. This is called:",
        choices: ["Slow In and Slow Out", "Timing", "Solid Drawing"],
        ans: 0,
        desc: "Slow In and Slow Out softens the action, making it look organic rather than robotic."
    },
    {
        principle: "7. Arc",
        info: "Most natural action follows an arched trajectory. Moving in straight lines looks stiff and mechanical.",
        visualText: "↗️ ↘️ (A curved throwing motion)",
        q: "When a character turns their head, the chin should dip slightly rather than moving straight across. This uses the principle of:",
        choices: ["Exaggeration", "Arc", "Staging"],
        ans: 1,
        desc: "Arcs give animation a fluid, natural motion."
    },
    {
        principle: "8. Secondary Action",
        info: "Adding secondary actions to the main action gives a scene more life. A person walking might simultaneously swing their arms or whistle.",
        visualText: "🚶‍♂️ 🎵 (Walking while whistling)",
        q: "A character is furiously typing on a keyboard (main action), but is also tapping their foot nervously. The foot tapping is a:",
        choices: ["Secondary Action", "Follow Through", "Squash and Stretch"],
        ans: 0,
        desc: "Secondary Actions enrich the main action and add dimension to the character's mood."
    },
    {
        principle: "9. Timing",
        info: "Timing refers to the number of drawings or frames for a given action. More drawings make an action slower; fewer make it faster.",
        visualText: "⏱️ 🏃‍♂️ (Adjusting frame counts)",
        q: "If an animator wants a character to look like they are struggling to lift a heavy box, how should they adjust the timing?",
        choices: ["Use fewer frames (faster)", "Use more frames (slower)", "Remove the keyframes"],
        ans: 1,
        desc: "More frames mean the action takes longer, perfectly simulating the struggle of lifting a heavy object."
    },
    {
        principle: "10. Exaggeration",
        info: "Remaining true to reality, but presenting it in a wilder, more extreme form to make the point clear. If a character is sad, make them weep buckets of water.",
        visualText: "😲 ➡ 🤯 (Jaw dropping to the floor)",
        q: "To show a character is surprised, the animator makes their eyes pop completely out of their head. This uses:",
        choices: ["Straight Ahead Action", "Exaggeration", "Secondary Action"],
        ans: 1,
        desc: "Exaggeration pushes emotions and physical reactions beyond normal limits for dramatic or comedic effect."
    },
    {
        principle: "11. Solid Drawing",
        info: "This principle means taking into account forms in three-dimensional space, giving them volume and weight. Avoid 'twinning' (creating a perfectly symmetrical, flat pose).",
        visualText: "🧊 ✏️ (Drawing a 3D box)",
        q: "An animator ensures that a character looks like a 3D object with depth, rather than a flat piece of paper. This is:",
        choices: ["Solid Drawing", "Appeal", "Staging"],
        ans: 0,
        desc: "Solid Drawing grounds the character in reality, making them feel tangible."
    },
    {
        principle: "12. Appeal",
        info: "Appeal corresponds to what would be called charisma in an actor. A character should be pleasing to look at, with a clear, simple design.",
        visualText: "✨ 🦸‍♀️ (A well-designed, charismatic hero)",
        q: "A villain is designed with sharp, angular lines to make them look dangerous but interesting to watch. This design choice relates to:",
        choices: ["Arc", "Appeal", "Anticipation"],
        ans: 1,
        desc: "Appeal isn't just about being 'cute'; it's about having a magnetic, readable design that the audience enjoys watching."
    }
];


let currentQuest = 0;
let questPoints = 0;
let questLogs = [];

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('motivaUser')) || {firstName: "STUDENT"};
    const statusEl = document.getElementById('playerStatus');
    if (statusEl) statusEl.innerText = "ACT CANDIDATE: " + user.firstName.toUpperCase();
    
   
    triggerInfoPopup();
});


function triggerInfoPopup() {
    const questData = animationQuest[currentQuest];
    
   
    document.getElementById('modalTitle').innerText = `DATA LOG: ${questData.principle}`;
    document.getElementById('modalDesc').innerText = questData.info;
    document.getElementById('modalVisual').innerText = questData.visualText; 
    
   
    document.getElementById('infoModal').classList.remove('hidden');
    document.getElementById('quizInterface').classList.add('hidden');
}

function closePopupAndStart() {
   
    document.getElementById('infoModal').classList.add('hidden');
    document.getElementById('quizInterface').classList.remove('hidden');
    
    loadQuestion();
}


function loadQuestion() {
    const questData = animationQuest[currentQuest];
    document.getElementById('questionText').innerText = questData.q;
    
    const area = document.getElementById('choicesArea');
    area.innerHTML = ""; 

    questData.choices.forEach((choice, index) => {
        const btn = document.createElement('button');
        btn.className = "act-btn";
        btn.innerText = choice;
        btn.onclick = () => evaluateAnswer(index);
        area.appendChild(btn);
    });
}

function evaluateAnswer(selectedIndex) {
    const questData = animationQuest[currentQuest];
    const isCorrect = (selectedIndex === questData.ans);
    
    if (isCorrect) {
        questPoints += 1000;
        alert("✅ EXCELLENT! Principle Mastered.");
    } else {
        alert("❌ INCORRECT. Review the Architect Notes at the end.");
    }
    
    questLogs.push({
        principle: questData.principle,
        status: isCorrect ? "MASTERED" : "NEEDS REVIEW",
        desc: questData.desc
    });

    currentQuest++;
    if (currentQuest < animationQuest.length) {
        triggerInfoPopup(); 
    } else {
        showFinaleReview();
    }
}


function showFinaleReview() {
    document.getElementById('quizInterface').classList.add('hidden');
    document.getElementById('reviewSection').classList.remove('hidden');

   
    const rankDisplay = document.getElementById('finalRank');
    let rank = "ACT APPRENTICE";
    if (questPoints === 12000) {
        rank = "ACT MASTER ANIMATOR 🏆";
        rankDisplay.style.color = "#FFCC00";
    } else if (questPoints >= 9000) {
        rank = "ACT SENIOR ARTIST";
    } else if (questPoints >= 6000) {
        rank = "ACT JOURNEYMAN";
    }
    rankDisplay.innerText = rank;

   
    const tbody = document.getElementById('reviewTableBody');
    questLogs.forEach(log => {
        const rowClass = log.status === "MASTERED" ? "row-success" : "row-fail";
        const statusColor = log.status === "MASTERED" ? "#00ff00" : "#ff3333";
        
        tbody.innerHTML += `
            <tr class="${rowClass}">
                <td style="font-weight: bold; color: var(--act-gold);">${log.principle}</td>
                <td style="color: ${statusColor}; font-weight: bold;">${log.status}</td>
                <td style="color: #ccc; font-size: 0.9rem;">${log.desc}</td>
            </tr>
        `;
    });
}

function completeModule() {
 
    let currentTotal = Number(localStorage.getItem('userPoints')) || 0;

   
    let sessionPoints = Number(questPoints);
    let newTotal = currentTotal + sessionPoints;

   
    console.log(`System: Saving ${sessionPoints} pts to current total of ${currentTotal}. New total: ${newTotal}`);

  
    try {
        localStorage.setItem('userPoints', newTotal.toString());
        localStorage.setItem('lesson5Completed', 'true');
        
       
        window.location.href = 'gametopics.html';
    } catch (error) {
        console.error("Critical Save Error:", error);
        alert("System Error: Failed to save progress. Check storage space.");
    }
}