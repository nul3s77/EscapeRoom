const allItems = [
    {
        type: 'question',
        question: "In which year was France Prešeren born?",
        answers: ["1800", "1797", "1805", "1789", "1795", "1802"],
        correct: 0,
        icon: "book",
        itemName: "Stara knjiga",
        hint: "V Vrbi na Gorenjskem rojen,<br>kjer mati me je zibala,<br>tam prve sem besede tkál..."
    },
    {
        type: 'question',
        question: "What is Prešeren's most famous poem?",
        answers: ["Zdravljica", "Povodni mož", "Krst pri Savici", "Sonetni venec", "Glosa", "Gazele"],
        correct: 0,
        icon: "feather-alt",
        itemName: "Pero",
        hint: "Zdravljica, pesem vseh ljudi,<br>naj v srcu našem večno živi,<br>kot himna svobode doni..."
    },
    {
        type: 'question',
        question: "Where did Prešeren study law?",
        answers: ["Ljubljana", "Vienna", "Graz", "Prague", "Budapest", "Zagreb"],
        correct: 1,
        icon: "university",
        itemName: "Univerza",
        hint: "Na Dunaju učenost iskal,<br>med knjigami življenje bral,<br>pravnik postal..."
    },
    {
        type: 'question',
        question: "Who was Prešeren's unrequited love?",
        answers: ["Ana Jelovšek", "Primicova Julija", "Jerneja Kopitar", "Marija Potočnik", "Katra Prešeren", "Urška Plemel"],
        correct: 1,
        icon: "heart",
        itemName: "Srce",
        hint: "Julija, zvezda vodnica,<br>v srcu večna bolečina,<br>ljubezni neuslišana..."
    },
    {
        type: 'question',
        question: "Which poem by Prešeren became the national anthem of Slovenia?",
        answers: ["Zdravljica", "Krst pri Savici", "Sonetni venec", "Povodni mož", "Neiztrohnjeno srce", "Magistrale"],
        correct: 0,
        icon: "flag",
        itemName: "Zastava",
        hint: "Žive naj vsi narodi,<br>ki hrepene dočakat dan,<br>da, koder sonce hodi..."
    },
    {
        type: 'question',
        question: "In which year did Prešeren die?",
        answers: ["1855", "1848", "1850", "1849", "1847", "1851"],
        correct: 3,
        icon: "clock",
        itemName: "Ura",
        hint: "V Ljubljani, kjer pesmi so spale,<br>februarja osem sto štiriinpetdeset,<br>zadnjič so oči gledale..."
    },
    {
        type: 'question',
        question: "Where did Prešeren work as a lawyer?",
        answers: ["Ljubljana", "Kranj", "Celje", "Maribor"],
        correct: 1,
        icon: "balance-scale",
        itemName: "Tehtnica",
        hint: "V Kranju pravdo sem delil,<br>med ljudmi pravico iskal,<br>a pesmi nikdar ne pozabil..."
    },
    {
        type: 'question',
        question: "Which language did Prešeren use to write some of his poems?",
        answers: ["German", "Latin", "Italian", "French"],
        correct: 0,
        icon: "language",
        itemName: "Jezik",
        hint: "V nemškem jeziku sem pisal tudi,<br>a slovenščina v srcu je bila,<br>materni jezik ljubezni..."
    },
    {
        type: 'question',
        question: "Who was Prešeren's close friend and fellow poet?",
        answers: ["Matija Čop", "Valentin Vodnik", "Jernej Kopitar", "Urban Jarnik"],
        correct: 0,
        icon: "users",
        itemName: "Prijateljstvo",
        hint: "Čop Matija, prijatelj zvesti,<br>z mano si delil učenost,<br>dokler te ni vzela Sava..."
    },
    {
        type: 'decoy',
        icon: "key",
        itemName: "Ključ",
        hint: "Le čemu ta ključ iskati,<br>ko pa nič ne odklepa..."
    },
    {
        type: 'decoy',
        icon: "scroll",
        itemName: "Zvitek",
        hint: "Prazen zvitek, prazne sanje,<br>tu ni prave poti zate..."
    },
    {
        type: 'decoy',
        icon: "wine-bottle",
        itemName: "Steklenica",
        hint: "V vinu resnice ni,<br>drugje jo poišči..."
    },
    {
        type: 'decoy',
        icon: "crown",
        itemName: "Krona",
        hint: "Nisem nosil krone zlate,<br>le z lovorjem sem bil venčan..."
    },
    {
        type: 'decoy',
        icon: "map",
        itemName: "Zemljevid",
        hint: "Pot že poznaš v srcu svojem,<br>zemljevida ti ni treba..."
    },
    {
        type: 'decoy',
        icon: "hourglass",
        itemName: "Peščena ura",
        hint: "Čas ne teče v tej uri,<br>drugje ga moraš najti..."
    }
];

// Function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to shuffle answers within each question
function shuffleQuestionAnswers(item) {
    if (item.type === 'question') {
        const correctAnswer = item.answers[item.correct];
        const shuffledAnswers = shuffleArray([...item.answers]);
        item.correct = shuffledAnswers.indexOf(correctAnswer);
        item.answers = shuffledAnswers;
    }
    return item;
}

// Initialize game with shuffled items
function initializeGame() {
    // Shuffle all items and their answers
    const shuffledItems = shuffleArray([...allItems]).map(item => shuffleQuestionAnswers({...item}));
    
    // Create room items HTML
    const room = document.querySelector('.room');
    room.innerHTML = '<div class="room-background"></div>';

    let questionIndex = 0;
    
    // Add all items
    shuffledItems.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        if (item.type === 'decoy') {
            itemDiv.className += ' decoy';
        } else {
            itemDiv.setAttribute('data-question', questionIndex++);
        }
        
        itemDiv.innerHTML = `
            <div class="poetic-hint">
                <div class="parchment">
                    <p>${item.hint}</p>
                </div>
            </div>
            <i class="fas fa-${item.icon}" title="${item.itemName}"></i>
        `;
        room.appendChild(itemDiv);
    });

    // Reinitialize event listeners
    initializeEventListeners();
    
    // Start the timer
    timerInterval = setInterval(updateTimer, 1000);
    
    return shuffledItems.filter(item => item.type === 'question');
}

// Initialize event listeners
function initializeEventListeners() {
    // Add click events to items
    document.querySelectorAll('.item:not(.decoy)').forEach(item => {
        item.addEventListener('click', () => {
            const questionIndex = parseInt(item.dataset.question);
            if (!solvedQuestions.has(questionIndex)) {
                showQuestion(questionIndex);
            }
        });
    });

    // Add click events to decoy items
    document.querySelectorAll('.item.decoy').forEach(item => {
        item.addEventListener('click', () => {
            showDecoyMessage();
        });
    });
}

// Initialize game variables
let score = 0;
let solvedQuestions = new Set();
let currentScore = 100;
let incorrectAttempts = 0;
let timeLeft = 360; // 6 minutes in seconds
let timerInterval;

// Initialize modal elements
const modal = document.getElementById('question-modal');
const closeModal = document.querySelector('.close-modal');
const remainingCount = document.getElementById('remaining-count');
const solvedList = document.getElementById('solved-list');

// Initialize the game and get shuffled items
const questions = initializeGame();

// Close modal when clicking X
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    questionText.textContent = question.question;
    answersContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => checkAnswer(questionIndex, index);
        answersContainer.appendChild(button);
    });

    modal.style.display = 'block';
}

function checkAnswer(questionIndex, answerIndex) {
    const question = questions[questionIndex];
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('current-score');

    if (answerIndex === question.correct) {
        score++;
        solvedQuestions.add(questionIndex);
        feedback.textContent = "Pravilno!";
        feedback.className = 'feedback-correct';
        
        const item = document.querySelector(`[data-question="${questionIndex}"]`);
        item.classList.add('solved');
        
        updateProgress(question.itemName);
        
        if (solvedQuestions.size === questions.length) {
            clearInterval(timerInterval);
            setTimeout(() => finishGame(currentScore), 1500);
        }
    } else {
        feedback.textContent = "Napačno! Poskusi ponovno.";
        feedback.className = 'feedback-incorrect';
        incorrectAttempts++;
        currentScore = Math.max(0, currentScore - 10);
        scoreDisplay.textContent = currentScore;
        
        // Check if score reached 0
        if (currentScore <= 0) {
            gameOver('score');
        }
    }

    setTimeout(() => {
        if (answerIndex === question.correct) {
            modal.style.display = 'none';
        }
        feedback.className = 'feedback-hidden';
    }, 1500);
}

function updateProgress(itemName) {
    remainingCount.textContent = questions.length - solvedQuestions.size;
    
    const listItem = document.createElement('li');
    listItem.innerHTML = `<i class="fas fa-check"></i> ${itemName}`;
    solvedList.appendChild(listItem);
}

function showDecoyMessage() {
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('current-score');
    
    modal.style.display = 'block';
    document.getElementById('question-text').textContent = "Ta predmet ni povezan s Prešernom...";
    document.getElementById('answers-container').innerHTML = '';
    
    // Deduct points for clicking decoys
    currentScore = Math.max(0, currentScore - 5);
    scoreDisplay.textContent = currentScore;
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1500);
}

function finishGame() {
    // Get player name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('player_name');
    // Redirect to finish page with score and player name
    window.location.href = `/finish?score=${currentScore}&player_name=${playerName}`;
}

// Add this function to format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Add this function to handle game over
function gameOver(reason) {
    clearInterval(timerInterval);
    
    // Create and show game over modal
    const gameOverModal = document.createElement('div');
    gameOverModal.className = 'game-over-modal';
    gameOverModal.style.display = 'block';
    
    const content = document.createElement('div');
    content.className = 'game-over-content';
    
    const title = document.createElement('h2');
    title.textContent = 'Igra končana';
    
    const message = document.createElement('p');
    message.textContent = reason === 'time' 
        ? 'Žal vam je zmanjkalo časa!' 
        : 'Vaše točke so padle na 0!';
    
    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = 'Poskusi ponovno';
    button.onclick = () => window.location.href = '/';
    
    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(button);
    gameOverModal.appendChild(content);
    document.body.appendChild(gameOverModal);
}

// Add this function to update the timer
function updateTimer() {
    const timerDisplay = document.getElementById('timer');
    const timerProgress = document.querySelector('.timer-progress');
    
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
    
    // Update progress bar
    const progressWidth = (timeLeft / 360) * 100;
    timerProgress.style.width = `${progressWidth}%`;
    
    // Change color as time runs out
    if (timeLeft <= 60) { // Last minute
        timerProgress.style.background = '#e74c3c';
    }
    
    if (timeLeft <= 0) {
        gameOver('time');
    }
} 