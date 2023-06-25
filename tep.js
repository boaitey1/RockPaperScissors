// variable declaration and initialization
const rule = document.getElementById("rule");
const closeM = document.getElementById("modal_icon");
const modal = document.getElementById("rule_modal");
const choicePane = document.getElementById('choice_pane');
const cpuChoice = document.getElementById('cpu_choice');
const choices = document.querySelectorAll('.choice_btn');
const gameSection = document.getElementById('game_section');
const resultPane = document.getElementById('result_pane');
var score = parseInt(sessionStorage.getItem('score') || 0);
const decTitle = document.getElementById('dec_title');
const decBtn = document.getElementById('dec_btn');



const aniwon = () => {
  setTimeout(() => {
    choicePane.classList.toggle('dec_winner');
    document.getElementById("decWinner").classList.toggle("hide");

    decTitle.innerText = "you win";
    decBtn.style.color = "green";

    score += 1;
    updateScore();

    document.getElementById('playerPicked').classList.toggle('winner');
  }, 500);
};

const anilose = () => {
  setTimeout(() => {
    choicePane.classList.toggle('dec_winner');
    document.getElementById("decWinner").classList.toggle("hide");

    decTitle.innerText = "you lose";
    decBtn.style.color = "red";

    score -= 1;
    updateScore();

    document.getElementById('cpuPicked').classList.toggle('winner');
  }, 500);
};

const anidraw = () => {
  setTimeout(() => {
    choicePane.classList.toggle('dec_winner');
    document.getElementById("decWinner").classList.toggle("hide");
  }, 500);

  decTitle.innerText = "it's a tie";
};

const appendRock = (picked) => {
  const newElement = document.createElement('div');
  newElement.id = picked;

  choicePane.appendChild(newElement);

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
};

// Other append functions: appendScissors and appendPaper

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
  if (choicePane.hasChildNodes()) {
    const playerPicked = document.getElementById('playerPicked');
    const cpuPicked = document.getElementById('cpuPicked');

    if (playerPicked && cpuPicked) {
      choicePane.removeChild(playerPicked);
      choicePane.removeChild(cpuPicked);
    }
  }

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
    // Code for paper choice
  } 
  else if (pChoice === "scissors") {
    // Code for scissors choice
  }
}

const playAgain = () => {
  if (choicePane.hasChildNodes()) {
    const playerPicked = document.getElementById('playerPicked');
    const cpuPicked = document.getElementById('cpuPicked');

    if (playerPicked && cpuPicked) {
      choicePane.removeChild(playerPicked);
      choicePane.removeChild(cpuPicked);
    }
  }

  gameSection.classList.toggle('hide');
  resultPane.classList.toggle('hide');

  choicePane.classList.remove('dec_winner');
  document.getElementById("decWinner").classList.add("hide");
};

const updateScoreFromStorage = () => {
  const storedScore = sessionStorage.getItem('score');
  if (storedScore) {
    score = parseInt(storedScore);
    updateScore();
  }
};

choices.forEach(choice => choice.addEventListener('click', playGame));
decBtn.addEventListener('click', playAgain);
decBtn.addEventListener('click', updateScoreFromStorage);

// open and close rule modal
rule.onclick = () => {
  modal.classList.toggle('hide');
};
closeM.onclick = () => {
  modal.classList.toggle('hide');
};

// Initialize the score from session storage
updateScoreFromStorage();

// 
// 
// 
// 
// 
// 
@media ( max-width:375px ){

    
  .container{
      width: 85%;     }
/*  */
      #header{
          width: 311px ;
          height: 96px;
      }
      #score_box{
          background-color: var(--light_text);
          width: 80px;
          height: 72px;
          flex-direction: column;
          border-radius: 8px;

      }
      #score_title{
          color: var(--score_text);
          font-size: 10px;
          letter-spacing: 1.56px;
      
      }
      #score_number{
          font-size: 40px;
          font-weight: 700;
          color: var(--dark_text);
      }

/*  */

#game_section{
  height: 300px;
  margin-top: 70px ;
  width: 100%;
}
#bg_triangle{
  width:  140px;
  height: 120px;
  top: 100px;
}
img{
  height: 50px;

}
.choice{
  width:  100px;
  height: 100px;
  box-shadow: inset 0 5px rgba(0, 0, 0, 0.158) ;
}

#scissors_out, #paper_out, #rock_out {
   width: 133px;
   height: 130px;
   
}
#rock_out{
   box-shadow: 0 5px var(--rock_grad2) ;
}
#paper_out{
   box-shadow: 0 5px  var(--paper_grad2);
}
#scissors_out{
   box-shadow: 0 5px  var(--scissors_grad2);
}
.choice::after{
  width: 170px;
  height: 170px;
}


/*  */
  #result_pane{
      width: 100%; 
      margin-top: 80px ;
      display: grid;
      grid-template-columns: repeat(2,1fr);
      grid-template-areas:  "playerPicked cpuPicked" "ppheading cpheading";
      place-items: center; 
  }
  #result_pane.col3{    
      width: 100%; 
      margin-top: 80px ;
      display: grid;
      grid-template-columns: repeat(2,1fr) !important;
      grid-template-areas: "playerPicked  cpuPicked"  "ppheading  cpheading" "decWinner decWinner";
      place-items: center; 
  }

  #decWinner{
      padding-top: 0;
  }
  #dec_title{
      font-size: 40px;
  }
  #dec_btn{
      font-size: 16px;
      margin-top: 18px;
  }
  #cpuPicked, #playerPicked{
      scale: 1; 
  }


/*  */
.test{
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

#rule{
  position: unset;
  width: 128px;
  height: 40px;
  margin-bottom: 30px;
  letter-spacing: 1.5px;
  font-size: 12px;
}

.result_title{
  font-size: 11px;
  font-weight: 800;
  margin-top: 40px;

}
/*  */
#modal_content{
height: 100vh;
width: 100%;
border-radius: unset;
}
#modal_text{
font-size: 32px;
margin: 50px ;
justify-content: center;
}
#modal_img img{
margin-top: 90px;
width: 100%;
}
#modal_icon{
height: 32px !important;
position: absolute;
bottom: 10%;
}

.winner .choice::after{
  width: 130px;
  height: 130px;
   box-shadow: 0 0 0 25px rgba(59, 67, 99, 0.692),0 0 0 50px rgba(50, 57, 87, 0.699), 0 0 0 70px rgba(37, 43, 66, 0.7) ;
   z-index: -2;
  animation: zoom 1.6s ease-in-out infinite;
}
  
}