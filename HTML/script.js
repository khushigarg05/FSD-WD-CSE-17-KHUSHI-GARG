let questions = [
    {
        q: "Capital of India?",
        options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
        answer: 0
    },
    {
        q: "Largest planet?",
        options: ["Earth", "Mars", "Jupiter", "Neptune"],
        answer: 2
    },
    {
        q: "National animal of India?",
        options: ["Tiger", "Lion", "Elephant", "Bear"],
        answer: 0
    },
    {
        q: "Fastest bird?",
        options: ["Eagle", "Sparrow", "Falcon", "Peacock"],
        answer: 2
    },
    {
        q: "Which is a programming language?",
        options: ["Python", "Snake", "Lizard", "Crocodile"],
        answer: 0
    }
];

let index = 0;
let answers = Array(questions.length).fill(null);
let timer;
let timeLeft = 30;

function startQuiz() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("quizBox").style.display = "block";
    loadQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerHTML = `Time: ${timeLeft}s`;

        if (timeLeft <= 0) submitQuiz();
    }, 1000);
}

function loadQuestion() {
    let qBox = document.getElementById("questionBox");
    let q = questions[index];

    document.getElementById("progressText").innerHTML =
        `Question ${index + 1} of ${questions.length}`;

    document.getElementById("progressBar").style.width =
        ((index + 1) / questions.length) * 100 + "%";

    qBox.innerHTML = `
        <h2>${q.q}</h2>
        ${q.options.map((opt, i) =>
        `<div class="option" onclick="selectOption(${i}, this)">
            ${opt}
        </div>`
        ).join("")}
    `;

    document.getElementById("submitBtn").style.display =
        (index === questions.length - 1) ? "block" : "none";
}

function selectOption(i, element) {
    answers[index] = i;

    let opts = document.querySelectorAll(".option");

    opts.forEach(opt => opt.style.pointerEvents = "none");

    if (i === questions[index].answer) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function nextQuestion() {
    if (answers[index] === null) return alert("Select an option first!");

    if (index < questions.length - 1) {
        index++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (index > 0) {
        index--;
        loadQuestion();
    }
}

function submitQuiz() {
    clearInterval(timer);

    let score = answers.filter((a, i) => a === questions[i].answer).length;

    document.getElementById("quizBox").style.display = "none";
    document.getElementById("resultScreen").style.display = "block";

    document.getElementById("finalScore").innerHTML =
        `Your Score: ${score} / ${questions.length}`;

    document.getElementById("resultEmoji").innerHTML =
        score >= 4 ? "🎉😊" :
        score >= 2 ? "🙂👍" :
        "😢💔";
}

function restartQuiz() {
    index = 0;
    answers.fill(null);
    timeLeft = 30;

    document.getElementById("resultScreen").style.display = "none";
    document.getElementById("quizBox").style.display = "block";

    loadQuestion();
    startTimer();
}
