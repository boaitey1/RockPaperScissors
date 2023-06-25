
// variable declaration and initialization
const rule = document.getElementById("rule");
const closeM = document.getElementById("modal_icon");
const modal = document.getElementById("rule_modal");
const cpuChoice = document.getElementById('cpu_choice');
const choices = document.querySelectorAll('.choice_btn');
const gameSection = document.getElementById('game_section');
const resultPane = document.getElementById('result_pane');
var score = parseInt(document.getElementById('score_number').innerText) ;
const decTitle  = document.getElementById('dec_title')
const decBtn = document.getElementById('dec_btn')


// Function to execute when player wins
const aniwon = () => {
    setTimeout(() => {
    resultPane.classList.toggle('col3');
    document.getElementById("decWinner").classList.toggle("hide");

    decTitle.innerText = "you win";
    decBtn.style.color = "green";

    score += 1;
    document.getElementById('score_number').innerText= score;
    sessionStorage.setItem('score', score);

    document.getElementById('playerPicked').classList.toggle('winner')
    }, 500);
}

// Function to execute when player loses
const anilose= () => {   
  setTimeout(() => {
    resultPane.classList.toggle('col3')
    document.getElementById("decWinner").classList.toggle("hide");


    decTitle.innerText = "you lose";
    decBtn.style.color = "red";

    score -= 1;
    document.getElementById('score_number').innerText= score;
    sessionStorage.setItem('score', score);

    document.getElementById('cpuPicked').classList.toggle('winner')

    }, 500); 
}

// Function to execute in case of a tie
const anidraw =() => {
  setTimeout(() => {
    document.getElementById("decWinner").classList.toggle("hide");

    resultPane.classList.toggle('col3')
    decBtn.style.color = "var(--text-dark)";
    decTitle.innerText = "it's a tie";

  }, 500);
}

// Function to append rock choice to the result pane
const appendRock = (picked) => {
    const newElement = document.createElement('div');
    newElement.id = picked;
    resultPane.appendChild(newElement);
  
    const outerDiv = document.createElement('div');
    outerDiv.id = 'rock_out';
    outerDiv.classList.add('center');
    newElement.appendChild(outerDiv);
  
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('choice', 'center');
   outerDiv.appendChild(innerDiv);
  
    const image = document.createElement('img');
    image.src = './images/icon-rock.svg';
    image.alt = 'rock';
    innerDiv.appendChild(image);
   
  
  }
  
// Function to append scissors choice to the result pane
  const appendScissors = (picked) => {
    const newElement = document.createElement('div');
    newElement.id = picked;
    resultPane.appendChild(newElement);
  
    const outerDiv = document.createElement('div');
    outerDiv.id = 'scissors_out';
    outerDiv.classList.add('center');
  
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('choice', 'center');
  
    const image = document.createElement('img');
    image.src = './images/icon-scissors.svg';
    image.alt = 'scissors';
  
    innerDiv.appendChild(image);
    outerDiv.appendChild(innerDiv);
    newElement.appendChild(outerDiv);
  }

// Function to append paper choice to the result pane
  const appendPaper = (picked) => {
    const newElement = document.createElement('div');
    newElement.id = picked;
    resultPane.appendChild(newElement);
  
    const outerDiv = document.createElement('div');
    outerDiv.id = 'paper_out';
    outerDiv.classList.add('center');
  
    const innerDiv = document.createElement('div');
    innerDiv.classList.add('choice', 'center');
  
    const image = document.createElement('img');
    image.src = './images/icon-paper.svg';
    image.alt = 'paper';
  
    innerDiv.appendChild(image);
    outerDiv.appendChild(innerDiv);
    newElement.appendChild(outerDiv);
  }

// generate random cpu choice
function cpuRandom() {
  const temp = Math.floor(Math.random() * 3 + 1);
  switch (temp) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
  }
}

// function to play the game
function playGame(event) {
  gameSection.classList.toggle('hide');
  resultPane.classList.toggle('hide');

  const pChoice = event.target.closest('.choice_btn').id;
  const cpuChoice = cpuRandom();

  console.log(`player...${pChoice}
  cpu...${cpuChoice}`);

  if (pChoice === "rock") {
    if (cpuChoice === "rock") {
      appendRock("playerPicked");
      anidraw();
      appendRock("cpuPicked");
    } else if (cpuChoice === "paper") {
      appendRock("playerPicked");
      anilose();
      appendPaper("cpuPicked");
    } else if (cpuChoice === "scissors") {
      appendRock("playerPicked");
      aniwon();
      appendScissors("cpuPicked");
    }
  } 
  else if (pChoice === "paper") {
    if (cpuChoice === "rock") {
      appendPaper("playerPicked");
        aniwon();
      appendRock("cpuPicked");
    } else if (cpuChoice === "paper") {
      appendPaper("playerPicked");
        anidraw();
      appendPaper("cpuPicked");
    } else if (cpuChoice === "scissors") {
      appendPaper("playerPicked");
        anilose();
      appendScissors("cpuPicked");
    }
  } else if (pChoice === "scissors") {
    if (cpuChoice === "rock") {
      appendScissors("playerPicked");
        anilose();
      appendRock("cpuPicked");
    } else if (cpuChoice === "paper") {
      appendScissors("playerPicked");
        aniwon();
      appendPaper("cpuPicked");
    } else if (cpuChoice === "scissors") {
      appendScissors("playerPicked");
        anidraw();
      appendScissors("cpuPicked");
    }
  }
}

// Function to play the game again
const playAgain = () => {
    if (resultPane.hasChildNodes()) {
      const playerPicked = document.getElementById('playerPicked');
      const cpuPicked = document.getElementById('cpuPicked');
  
      if (playerPicked && cpuPicked) {
        resultPane.removeChild(playerPicked);
        resultPane.removeChild(cpuPicked);
      }
    }
  
    gameSection.classList.toggle('hide');
    resultPane.classList.toggle('hide');
    resultPane.classList.toggle('col3')
  
    document.getElementById("decWinner").classList.add("hide");

  }
  
// Event listeners
choices.forEach(choice => choice.addEventListener('click', playGame));
decBtn.addEventListener('click', playAgain);

// open and close rule modal
rule.onclick = () => {
  modal.classList.toggle('hide');
}
closeM.onclick = () => {
  modal.classList.toggle('hide');
}  

// Set score from session storage on page load
document.addEventListener('DOMContentLoaded', () => {
  score = parseInt(sessionStorage.getItem('score')) || 0;
  document.getElementById('score_number').innerText = score;
});