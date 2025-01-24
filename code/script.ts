const chat = document.getElementById("chat") as HTMLDivElement
const inputWrapper = document.getElementById("input-wrapper") as HTMLDivElement

//Variables:
let userName:string = ""
let correctAnswer:number = 0

//Adds a chat bubble in the correct place based on who the sender is
const showMessage = (message:string, sender:string):void => {
  //Checks if the sender is the user and adds posted message from the user
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
    //Checks if the sender is the bot and adds posted message from the bot
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }
  //Makes the chat scroll to the last message when there are many 
  chat.scrollTop = chat.scrollHeight
}

//Clears the chat window and adds button to start over
const clearWindow = ():void => {
  chat.innerHTML = `
    <section class="bot-msg">
      <img src="assets/bot.png" id="endBot" alt="Bot" />
    </section>
  `
  inputWrapper.innerHTML = `
    <button id="start" class="chat-btn" type="submit">Start over</button>
  `
  const startButton = document.getElementById("start") as HTMLButtonElement
  if (startButton) {
    startButton.addEventListener("click", greetUser)
  }
}

// Adds buttons for yes and no
const addYesNoButtons = (): void => {
  inputWrapper.innerHTML = `
      <button id="yes" class="chat-btn" type="submit">Yes</button>
      <button id="no" class="chat-btn" type="submit">No</button>
    `
  const yesButton = document.getElementById("yes") as HTMLButtonElement
  const noButton = document.getElementById("no") as HTMLButtonElement
  if (yesButton) {
    yesButton.addEventListener("click", handleYes)
  }
  if (noButton) {
    noButton.addEventListener("click", handleNo)
  }
}

//If you answer "no"
const handleNo = ():void => {
  showMessage(`No`, "user")
  showMessage(`Sorry to hear that, ${userName}. You're welcome back anytime!`, "bot")
  inputWrapper.innerHTML = ""
  setTimeout(() => clearWindow(), 4000)
}

//If you answer "yes"
const handleYes = ():void => {
  showMessage(`Yes`, "user")
  setTimeout(() => askMathType(), 1000)
}

// Start the conversation
const greetUser = () => {
  chat.innerHTML = ""
  showMessage("Hey, I'm Mathew, the mathbot. Welcome to my wonderful world of math. What's your name?", "bot")
  inputWrapper.innerHTML = `
    <form id="name-form">
      <label for="name-input">Name</label>
      <input id="name-input" type="text"/>
      <button id="button" class="send-btn" type="submit">
        Send
      </button>
    </form>
  `
  const nameForm = document.getElementById("name-form") as HTMLFormElement
  nameForm.addEventListener("submit", handleNameInput)
}

//Stores the user name
const handleNameInput = (e:Event):void => {
  e.preventDefault()
  const nameInput = document.getElementById("name-input") as HTMLInputElement
  userName = nameInput.value
  showMessage(userName, "user")
  nameInput.value = ""
  setTimeout(() => askStartQuestion(), 1000)
}

//Asks if you want to start
const askStartQuestion = ():void => {
  if (userName == ""){
    showMessage("I need a name to be able to talk to you. Let's try again - What is your name?", "bot")
  } else {
    showMessage(`Nice to meet you, ${userName}. Are you ready to solve some math problems?`, "bot")
    addYesNoButtons()
  }
}

//Ask what type of question you want
const askMathType = ():void => {
  showMessage(`What type of math problem do you want to solve?`, "bot")
  inputWrapper.innerHTML = `
    <button id="add" type="submit" class="choice-btn">Addition</button>
    <button id="subtract" type="submit" class="choice-btn">Subtraction</button>
    <button id="multiply" type="submit" class="choice-btn">Multiplication</button>
    <button id="divide" type="submit" class="choice-btn">Division</button>
  `
  const addButton = document.getElementById("add") as HTMLButtonElement
  const subtractButton = document.getElementById("subtract") as HTMLButtonElement
  const multiplyButton = document.getElementById("multiply") as HTMLButtonElement
  const divideButton = document.getElementById("divide") as HTMLButtonElement
  if (addButton) {addButton.addEventListener("click", () => handleChoice("Addition"))}
  if (subtractButton) {subtractButton.addEventListener("click", () => handleChoice("Subtraction"))}
  if (multiplyButton) {multiplyButton.addEventListener("click", () => handleChoice("Multiplication"))}
  if (divideButton) {divideButton.addEventListener("click", () => handleChoice("Division"))}
}

// Handle math-type-choice
const handleChoice = (choice: string): void => {
  showMessage(choice, "user") 
  setTimeout(() => askMathQuestion(choice), 1000)
}

// Renders a math-question
const renderQuestion = (mathType: string): string => {
  let a: number = 0
  let b: number = 0
  let c: number = 0
  if (mathType === "Addition") {
    a = Math.floor(Math.random() * 100) + 1
    b = Math.floor(Math.random() * 100) + 1
    correctAnswer = a + b
    return `What is ${a}+${b}?`
  } else if (mathType === "Subtraction") {
    a = Math.floor(Math.random() * 100) + 1
    b = Math.floor(Math.random() * 100) + 1
    correctAnswer = a >= b ? a - b : b - a
    return a >= b ? `What is ${a}-${b}?` : `What is ${b}-${a}?`
  } else if (mathType === "Multiplication") {
    a = Math.floor(Math.random() * 11)
    b = Math.floor(Math.random() * 11)
    correctAnswer = a * b
    return `What is ${a}*${b}?`
  } else if (mathType === "Division") {
    a = Math.floor(Math.random() * 10) + 1
    b = Math.floor(Math.random() * 11)
    c = a * b
    correctAnswer = c / a
    return `What is ${c}/${a}?`
  } else {
    return "I have no question for that..."
  }
}

// Asks a math-question
const askMathQuestion = (mathType: string): void => {
  const question: string = renderQuestion(mathType)
  showMessage(question, "bot")
  inputWrapper.innerHTML = `
    <form id="answerForm"> 
      <label>Answer</label>
      <input id="answer" type="text" />  
      <button id="button" class="send-btn" type="submit"> 
          Send
      </button>
    </form>
  `
  const answerForm = document.getElementById("answerForm") as HTMLFormElement
  if (answerForm) {
    answerForm.addEventListener("submit", handleAnswer)
  }
}

//Handle the answer
let handleAnswer = (e: Event): void => {
  e.preventDefault()
  const answerInput = document.getElementById("answer") as HTMLInputElement
  if (answerInput) {
    const answer: string = answerInput.value 
    showMessage(answer, "user")
    const numAnswer: number = Number(answer)
    setTimeout(() => checkAnswer(numAnswer), 1000)
  }  
}

//Checks the answer and replies "correct" or "wrong"
const checkAnswer = (answer: number): void => {
  if (answer == correctAnswer) {
    showMessage ("That's correct, good job! 🥳", "bot")
  } else {
    showMessage (`Nope, that's incorrect. The answer is ${correctAnswer}.`, "bot")
  }
  setTimeout(() => askNewProblem(), 1000)
}

const askNewProblem = () => {
  showMessage("Do you want to solve another math problem?", "bot")
  addYesNoButtons()
}

// Calls for the greeting function one second after the website is loaded.
setTimeout(greetUser, 1000)
