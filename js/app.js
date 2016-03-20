$(document).ready(function(){

var rock = "rock";
var paper= "paper";
var scissors="scissors";


var Player1 = {
			name: "player1",
			choice: [],
			wins: 	0,
			loss: 	0,
			}

var Player2 = {
			name: "player2",
			choice: [],
			wins: 	0,
			loss: 	0,
			}

// rock paper scissors game
$(".choice").on("click",pickRPS)


function pickRPS(){
	if (Player1.choice.length>0 && Player2.choice.length==0){
		choiceP2= $(this).data('pick');
		Player2.choice.push(choiceP2);
		game();

	} else if (Player1.choice.length==0){
		choiceP1= $(this).data('pick');
		Player1.choice.push(choiceP1);

	} else {
		console.log("everyone made a choice.")
	};
};

function updateCounts(winner) {
	console.log(winner.name)
	winner.wins++;
	console.log(winner.wins)
	reseter();
	};

function game() {
	console.log(Player1.choice[0]+"player2" + Player2.choice[0]);

		if (Player1.choice[0] === Player2.choice[0] ) {
			console.log('no winner it is a draw');
			updateCounts();
		}
		if ((Player1.choice[0] === 'rock') && (Player2.choice[0] === 'scissors')) {
			updateCounts(Player1);
		}
		if ((Player1.choice[0] === 'rock') && (Player2.choice[0] === 'paper')) {
			updateCounts(Player2);
		}
		if ((Player1.choice[0] === 'paper') && (Player2.choice[0] === 'scissors')) {
			updateCounts(Player2);
		}
		if ((Player1.choice[0] === 'paper') && (Player2.choice[0] === 'rock')) {
			updateCounts(Player1);;
		}
		if ((Player1.choice[0] === 'scissors') && (Player2.choice[0] === 'rock')) {
			updateCounts(Player2);
		}
		if ((Player1.choice[0] === 'scissors') && (Player2.choice[0] === 'paper')) {
			updateCounts(Player1);
		}
};


function reseter(){
	Player1.choice = [];
	Player2.choice = [];
};
// paper beats rock 
// rock beats scissors
// scissors beats paper
// both playes pick the same it is a draw 


// Closing tag for ready function
})