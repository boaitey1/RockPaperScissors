// Variable declaration and initialization
const rule = document.getElementById("rule"); // Rule button
const closeM = document.getElementById("modal_icon"); // Close modal button
const modal = document.getElementById("rule_modal"); // Rule modal
const cpuChoice = document.getElementById('cpu_choice'); // CPU choice element
const choices = document.querySelectorAll('.choice_btn'); // Player choice buttons
const gameSection = document.getElementById('game_section'); // Game section
const resultPane = document.getElementById('result_pane'); // Result pane
var score = parseInt(document.getElementById('score_number').innerText); // Score variable
const decTitle = document.getElementById('dec_title'); // Decision title element
const decBtn = document.getElementById('dec_btn'); // Decision button

// Function to execute when player wins
const aniwon = () => {
    setTimeout(() => {
        resultPane.classList.toggle('col3');
        document.getElementById("decWinner").classList.toggle("hide");

        decTitle.innerText = "You win";
        decBtn.style.color = "green";

        score += 1;
        document.getElementById('score_number').innerText = score;
        sessionStorage.setItem('score', score);

        document.getElementById('playerPicked').classList.toggle('winner');
    }, 500);
}

// Function to execute when player loses
const anilose = () => {
    setTimeout(() => {
        resultPane.classList.toggle('col3');
        document.getElementById("decWinner").classList.toggle("hide");

        decTitle.innerText = "You lose";
        decBtn.style.color = "red";

        score -= 1;
        document.getElementById('score_number').innerText = score;
        sessionStorage.setItem('score', score);

        document.getElementById('cpuPicked').classList.toggle('winner');
    }, 500);
}

// Function to execute in case of a tie
const anidraw = () => {
    setTimeout(() => {
        document.getElementById("decWinner").classList.toggle("hide");

        resultPane.classList.toggle('col3');
        decBtn.style.color = "var(--text-dark)";
        decTitle.innerText = "It's a tie";
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

// Generate random CPU choice
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

// Function to play the game
function playGame(event) {
    gameSection.classList.toggle('hide');
    resultPane.classList.toggle('hide');

    const pChoice = event.target.closest('.choice_btn').id; // Player choice
    const cpuChoice = cpuRandom(); // CPU choice

    console.log(`Player...${pChoice}
CPU...${cpuChoice}`);

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
    } else if (pChoice === "paper") {
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
    resultPane.classList.toggle('col3');

    document.getElementById("decWinner").classList.add("hide");
}

// Event listeners
choices.forEach(choice => choice.addEventListener('click', playGame)); // Listen for player choice clicks
decBtn.addEventListener('click', playAgain); // Listen for decision button click

// Open and close rule modal
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


// bounus @ media 
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
#bg_pentagon{
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
  #cpuPicked.winner, #playerPicked.winner{
      z-index: -1; 
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
  
  // Function to append spock choice to the result pane
  const appendSpock = (picked) => {
      const newElement = document.createElement('div');
      newElement.id = picked;
      resultPane.appendChild(newElement);
    
      const outerDiv = document.createElement('div');
      outerDiv.id = 'spock_out';
      outerDiv.classList.add('center');
      newElement.appendChild(outerDiv);
    
      const innerDiv = document.createElement('div');
      innerDiv.classList.add('choice', 'center');
     outerDiv.appendChild(innerDiv);
    
      const image = document.createElement('img');
      image.src = './images/icon-spock.svg';
      image.alt = 'spock';
      innerDiv.appendChild(image);
     
    
    }
  
  // Function to append lizard choice to the result pane
  const appendLizard = (picked) => {
      const newElement = document.createElement('div');
      newElement.id = picked;
      resultPane.appendChild(newElement);
    
      const outerDiv = document.createElement('div');
      outerDiv.id = 'lizard_out';
      outerDiv.classList.add('center');
      newElement.appendChild(outerDiv);
    
      const innerDiv = document.createElement('div');
      innerDiv.classList.add('choice', 'center');
     outerDiv.appendChild(innerDiv);
    
      const image = document.createElement('img');
      image.src = './images/icon-lizard.svg';
      image.alt = 'lizard';
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
  