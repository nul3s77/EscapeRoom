const questions = [
    {
        question: "In which year was France Prešeren born?",
        answers: ["1800", "1797", "1805", "1789"],
        correct: 0,
        icon: "book",
        itemName: "Birth Record"
    },
    {
        question: "What is Prešeren's most famous poem?",
        answers: ["Zdravljica", "Povodni mož", "Krst pri Savici", "Sonetni venec"],
        correct: 0,
        icon: "feather-alt",
        itemName: "Famous Poem"
    },
    {
        question: "Where did Prešeren study law?",
        answers: ["Ljubljana", "Vienna", "Graz", "Prague"],
        correct: 1,
        icon: "university",
        itemName: "University Document"
    },
    {
        question: "Who was Prešeren's unrequited love?",
        answers: ["Ana Jelovšek", "Primicova Julija", "Jerneja Kopitar", "Marija Potočnik"],
        correct: 1,
        icon: "heart",
        itemName: "Love Letter"
    },
    {
        question: "Which poem by Prešeren became the national anthem of Slovenia?",
        answers: ["Zdravljica", "Krst pri Savici", "Sonetni venec", "Povodni mož"],
        correct: 0,
        icon: "flag",
        itemName: "National Anthem"
    },
    {
        question: "In which year did Prešeren die?",
        answers: ["1855", "1848", "1850", "1849"],
        correct: 3,
        icon: "clock",
        itemName: "Final Date"
    }
];

let score = 0;
let solvedQuestions = new Set();

// Modal elements
const modal = document.getElementById('question-modal');
const closeModal = document.querySelector('.close-modal');
const remainingCount = document.getElementById('remaining-count');
const solvedList = document.getElementById('solved-list');

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

    if (answerIndex === question.correct) {
        score++;
        solvedQuestions.add(questionIndex);
        feedback.textContent = "Correct!";
        feedback.className = 'feedback-correct';
        
        // Mark item as solved
        const item = document.querySelector(`[data-question="${questionIndex}"]`);
        item.classList.add('solved');
        
        // Update progress panel
        updateProgress(question.itemName);
        
        // Check if game is complete
        if (solvedQuestions.size === questions.length) {
            setTimeout(finishGame, 1500);
        }
    } else {
        feedback.textContent = "Incorrect! Try again.";
        feedback.className = 'feedback-incorrect';
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
    modal.style.display = 'block';
    document.getElementById('question-text').textContent = "This item seems unrelated to Prešeren...";
    document.getElementById('answers-container').innerHTML = '';
    
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1500);
}

function finishGame() {
    // Get player name from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const playerName = urlParams.get('player_name');
    // Redirect to finish page with score and player name
    window.location.href = `/finish?score=${score}&player_name=${playerName}`;
} 