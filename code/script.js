var chat = document.getElementById("chat");
var inputWrapper = document.getElementById("input-wrapper");
//Variables:
var userName = "";
var correctAnswer = 0;
//Adds a chat bubble in the correct place based on who the sender is
var showMessage = function (message, sender) {
    //Checks if the sender is the user and adds posted message from the user
    if (sender === "user") {
        chat.innerHTML += "\n      <section class=\"user-msg\">\n        <div class=\"bubble user-bubble\">\n          <p>".concat(message, "</p>\n        </div>\n        <img src=\"assets/user.png\" alt=\"User\" />  \n      </section>\n    ");
        //Checks if the sender is the bot and adds posted message from the bot
    }
    else if (sender === "bot") {
        chat.innerHTML += "\n      <section class=\"bot-msg\">\n        <img src=\"assets/bot.png\" alt=\"Bot\" />\n        <div class=\"bubble bot-bubble\">\n          <p>".concat(message, "</p>\n        </div>\n      </section>\n    ");
    }
    //Makes the chat scroll to the last message when there are many 
    chat.scrollTop = chat.scrollHeight;
};
//Clears the chat window and adds button to start over
var clearWindow = function () {
    chat.innerHTML = "\n    <section class=\"bot-msg\">\n      <img src=\"assets/bot.png\" id=\"endBot\" alt=\"Bot\" />\n    </section>\n  ";
    inputWrapper.innerHTML = "\n    <button id=\"start\" class=\"chat-btn\" type=\"submit\">Start over</button>\n  ";
    var startButton = document.getElementById("start");
    if (startButton) {
        startButton.addEventListener("click", greetUser);
    }
};
// Adds buttons for yes and no
var addYesNoButtons = function () {
    inputWrapper.innerHTML = "\n      <button id=\"yes\" class=\"chat-btn\" type=\"submit\">Yes</button>\n      <button id=\"no\" class=\"chat-btn\" type=\"submit\">No</button>\n    ";
    var yesButton = document.getElementById("yes");
    var noButton = document.getElementById("no");
    if (yesButton) {
        yesButton.addEventListener("click", handleYes);
    }
    if (noButton) {
        noButton.addEventListener("click", handleNo);
    }
};
//If you answer "no"
var handleNo = function () {
    showMessage("No", "user");
    showMessage("Sorry to hear that, ".concat(userName, ". You're welcome back anytime!"), "bot");
    inputWrapper.innerHTML = "";
    setTimeout(function () { return clearWindow(); }, 4000);
};
//If you answer "yes"
var handleYes = function () {
    showMessage("Yes", "user");
    setTimeout(function () { return askMathType(); }, 1000);
};
// Start the conversation
var greetUser = function () {
    chat.innerHTML = "";
    showMessage("Hey, I'm Mathew, the mathbot. Welcome to my wonderful world of math. What's your name?", "bot");
    inputWrapper.innerHTML = "\n    <form id=\"name-form\">\n      <label for=\"name-input\">Name</label>\n      <input id=\"name-input\" type=\"text\"/>\n      <button id=\"button\" class=\"send-btn\" type=\"submit\">\n        Send\n      </button>\n    </form>\n  ";
    var nameForm = document.getElementById("name-form");
    nameForm.addEventListener("submit", handleNameInput);
};
//Stores the user name
var handleNameInput = function (e) {
    e.preventDefault();
    var nameInput = document.getElementById("name-input");
    userName = nameInput.value;
    showMessage(userName, "user");
    nameInput.value = "";
    setTimeout(function () { return askStartQuestion(); }, 1000);
};
//Asks if you want to start
var askStartQuestion = function () {
    if (userName == "") {
        showMessage("I need a name to be able to talk to you. Let's try again - What is your name?", "bot");
    }
    else {
        showMessage("Nice to meet you, ".concat(userName, ". Are you ready to solve some math problems?"), "bot");
        addYesNoButtons();
    }
};
//Ask what type of question you want
var askMathType = function () {
    showMessage("What type of math problem do you want to solve?", "bot");
    inputWrapper.innerHTML = "\n    <button id=\"add\" type=\"submit\" class=\"choice-btn\">Addition</button>\n    <button id=\"subtract\" type=\"submit\" class=\"choice-btn\">Subtraction</button>\n    <button id=\"multiply\" type=\"submit\" class=\"choice-btn\">Multiplication</button>\n    <button id=\"divide\" type=\"submit\" class=\"choice-btn\">Division</button>\n  ";
    var addButton = document.getElementById("add");
    var subtractButton = document.getElementById("subtract");
    var multiplyButton = document.getElementById("multiply");
    var divideButton = document.getElementById("divide");
    if (addButton) {
        addButton.addEventListener("click", function () { return handleChoice("Addition"); });
    }
    if (subtractButton) {
        subtractButton.addEventListener("click", function () { return handleChoice("Subtraction"); });
    }
    if (multiplyButton) {
        multiplyButton.addEventListener("click", function () { return handleChoice("Multiplication"); });
    }
    if (divideButton) {
        divideButton.addEventListener("click", function () { return handleChoice("Division"); });
    }
};
// Handle math-type-choice
var handleChoice = function (choice) {
    showMessage(choice, "user");
    setTimeout(function () { return askMathQuestion(choice); }, 1000);
};
// Renders a math-question
var renderQuestion = function (mathType) {
    var a = 0;
    var b = 0;
    var c = 0;
    if (mathType === "Addition") {
        a = Math.floor(Math.random() * 100) + 1;
        b = Math.floor(Math.random() * 100) + 1;
        correctAnswer = a + b;
        return "What is ".concat(a, "+").concat(b, "?");
    }
    else if (mathType === "Subtraction") {
        a = Math.floor(Math.random() * 100) + 1;
        b = Math.floor(Math.random() * 100) + 1;
        correctAnswer = a >= b ? a - b : b - a;
        return a >= b ? "What is ".concat(a, "-").concat(b, "?") : "What is ".concat(b, "-").concat(a, "?");
    }
    else if (mathType === "Multiplication") {
        a = Math.floor(Math.random() * 11);
        b = Math.floor(Math.random() * 11);
        correctAnswer = a * b;
        return "What is ".concat(a, "*").concat(b, "?");
    }
    else if (mathType === "Division") {
        a = Math.floor(Math.random() * 10) + 1;
        b = Math.floor(Math.random() * 11);
        c = a * b;
        correctAnswer = c / a;
        return "What is ".concat(c, "/").concat(a, "?");
    }
    else {
        return "I have no question for that...";
    }
};
// Asks a math-question
var askMathQuestion = function (mathType) {
    var question = renderQuestion(mathType);
    showMessage(question, "bot");
    inputWrapper.innerHTML = "\n    <form id=\"answerForm\"> \n      <label>Answer</label>\n      <input id=\"answer\" type=\"text\" />  \n      <button id=\"button\" class=\"send-btn\" type=\"submit\"> \n          Send\n      </button>\n    </form>\n  ";
    var answerForm = document.getElementById("answerForm");
    if (answerForm) {
        answerForm.addEventListener("submit", handleAnswer);
    }
};
//Handle the answer
var handleAnswer = function (e) {
    e.preventDefault();
    var answerInput = document.getElementById("answer");
    if (answerInput) {
        var answer = answerInput.value;
        showMessage(answer, "user");
        var numAnswer_1 = Number(answer);
        setTimeout(function () { return checkAnswer(numAnswer_1); }, 1000);
    }
};
//Checks the answer and replies "correct" or "wrong"
var checkAnswer = function (answer) {
    if (answer == correctAnswer) {
        showMessage("That's correct, good job! 🥳", "bot");
    }
    else {
        showMessage("Nope, that's incorrect. The answer is ".concat(correctAnswer, "."), "bot");
    }
    setTimeout(function () { return askNewProblem(); }, 1000);
};
var askNewProblem = function () {
    showMessage("Do you want to solve another math problem?", "bot");
    addYesNoButtons();
};
// Calls for the greeting function one second after the website is loaded.
setTimeout(greetUser, 1000);
