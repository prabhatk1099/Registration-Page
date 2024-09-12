


const questions = {
    easy: [
        "Describe your favorite childhood memory.",
        "What is your dream vacation destination and why?",
        "Explain the plot of your favorite book or movie.",
        "If you could have dinner with any historical figure, who would it be and why?",
        "Describe a perfect day in your life."
    ],
    moderate: [
        "Discuss the impact of social media on modern society.",
        "Explain the importance of environmental conservation.",
        "Analyze the effects of technology on education.",
        "Discuss the role of art in society.",
        "Explain the importance of cultural diversity in the workplace."
    ],
    hard: [
        "Analyze the ethical implications of artificial intelligence.",
        "Discuss the global economic impact of climate change.",
        "Evaluate the effectiveness of current healthcare systems.",
        "Analyze the role of government in regulating emerging technologies.",
        "Discuss the future of space exploration and its potential benefits for humanity."
    ]
};

const modeConfig = {
    easy: { time: 5 * 60, minWords: 100, maxWords: 150 },
    moderate: { time: 10 * 60, minWords: 150, maxWords: 200 },
    hard: { time: 15 * 60, minWords: 200, maxWords: 250 }
};

let timer;
let selectedMode;
let timeRemaining;

document.getElementById('startExam').addEventListener('click', startExam);
document.getElementById('essay').addEventListener('input', updateWordCount);

function startExam() {
    selectedMode = document.querySelector('input[name="mode"]:checked');
    if (!selectedMode) {
        alert('Please select a mode');
        return;
    }
    selectedMode = selectedMode.value;
    
    document.getElementById('modeSelection').style.display = 'none';
    document.getElementById('examContent').style.display = 'block';
    
    const config = modeConfig[selectedMode];
    timeRemaining = config.time;
    document.getElementById('maxCount').textContent = config.maxWords;
    document.getElementById('remaining').textContent = config.maxWords;
    
    const randomQuestion = questions[selectedMode][Math.floor(Math.random() * questions[selectedMode].length)];
    document.getElementById('question').textContent = randomQuestion;
    
    startTimer();
}

function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();
        if (timeRemaining <= 120 && timeRemaining % 60 === 0) {
            showWarning();
        }
        if (timeRemaining <= 0) {
            clearInterval(timer);
            submitExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function showWarning() {
    const modal = document.getElementById('warningModal');
    document.getElementById('warningTime').textContent = `${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`;
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 5000);
}


function updateWordCount() {
    const essay = document.getElementById('essay');
    const wordCount = countWords(essay.value);
    const config = modeConfig[selectedMode];
    
    document.getElementById('currentCount').textContent = wordCount;
    document.getElementById('remaining').textContent = Math.max(0, config.maxWords - wordCount);
    
    if (wordCount > config.maxWords) {
        const words = essay.value.split(/\s+/);
        const exceedingWords = words.slice(config.maxWords).join(' ');
        const validWords = words.slice(0, config.maxWords).join(' ');
        essay.value = validWords + ' <span class="red-text">' + exceedingWords + '</span>';
    }
}

function countWords(text) {
    return text.trim().replace(/[^\w]+/g, ' ').split(/\s+/).length;
}

function submitExam() {
    clearInterval(timer);
    const essay = document.getElementById('essay');
    essay.disabled = true;
    alert('Time\'s up! Your exam has been submitted.');
}