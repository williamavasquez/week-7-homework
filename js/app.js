$(document).ready(function(){

// Firebase Variables -----------------
var gameDATA = new Firebase("https://intense-fire-339.firebaseio.com/");
// set the counter variable to define players-------
	gameDATA.child("counter");
	gameDATA.update({counter:0});

	var connectedData 	= new Firebase("https://intense-fire-339.firebaseio.com/viewers");

	var userData 		= connectedData.push();

	console.log("userData: " + userData);
	var presenceRef = new Firebase("https://intense-fire-339.firebaseio.com/.info/connected");


	gameDATA.on('value',function(snapshot){
		counterSet = snapshot.child('counter').val();
		PlayersinGame = snapshot.child('player').numChildren();
		if (PlayersinGame>=2) {
			$("#PlayerReg").hide();
		}else {
			$('#PlayerReg').show();
		}

		});

$("#submitbttn").on('click',function(){
		counterSet++;
		userDATA =  gameDATA.child("player");
		playerStore= "Player"+counterSet
		userNumber = gameDATA.child("player").child(playerStore);
		
		gameDATA.child("counter").set(counterSet);

	if (PlayersinGame<2){
		var name =$("#playerName").val().trim();


		PlayerDATA = {
				name: 	name, 
				choice: "",
				wins: 	0,
				loss: 	0,
				}

		// userData.set(PlayerDATA);	
		userNumber.set(PlayerDATA);
		
	} else {
			console.log("Game is Full")
		};

	// clear the input field
	$("#playerName").val("");
	// stop refreshing
	return false;
});

presenceRef.on("value", function(snapshot) {
	if (snapshot.val()) {
    // Remove ourselves when we disconnect.
    userData.onDisconnect().remove();
    userData.set(true);
  };
});
// -----Game variables-----------
var rock = "rock";
var paper= "paper";
var scissors="scissors";


// rock paper scissors game
$(".choice").on("click",pickRPS);

function pickRPS(){
	UserPicked= $(this).data('pick');
	userData.update({choice: UserPicked});
	userNumber.update({choice: UserPicked});
}

// function pickRPS(){
// 	if (Player1.choice.length>0 && Player2.choice.length==0){
// 		choiceP2= $(this).data('pick');
// 		Player2.choice.push(choiceP2);
// 		game();

// 	} else if (Player1.choice.length==0){
// 		choiceP1= $(this).data('pick');
// 		Player1.choice.push(choiceP1);

// 	} else {
// 		console.log("everyone made a choice.")
// 	};
// 	};

// function GameWinner(winner) {
// 	console.log(winner.name)
// 	winner.wins++;
// 	console.log(winner.wins)
// 	reseter();
// 	};

// function GameLosser(Losser){
// 	Losser.loss++;
// 	}

// function game() {
// 	console.log(Player1.choice[0]+"player2" + Player2.choice[0]);

// 		if (Player1.choice[0] === Player2.choice[0] ) {
// 			console.log('no winner it is a draw');
// 			GameWinner();
// 		}
// 		if ((Player1.choice[0] === 'rock') && (Player2.choice[0] === 'scissors')) {
// 			GameWinner(Player1);
// 			GameLosser(Player2);
// 		}
// 		if ((Player1.choice[0] === 'rock') && (Player2.choice[0] === 'paper')) {
// 			GameWinner(Player2);
// 			GameLosser(Player1);
// 		}
// 		if ((Player1.choice[0] === 'paper') && (Player2.choice[0] === 'scissors')) {
// 			GameWinner(Player2);
// 			GameLosser(Player1);
// 		}
// 		if ((Player1.choice[0] === 'paper') && (Player2.choice[0] === 'rock')) {
// 			GameWinner(Player1);
// 			GameLosser(Player2);
// 		}
// 		if ((Player1.choice[0] === 'scissors') && (Player2.choice[0] === 'rock')) {
// 			GameWinner(Player2);
// 			GameLosser(Player1);
// 		}
// 		if ((Player1.choice[0] === 'scissors') && (Player2.choice[0] === 'paper')) {
// 			GameWinner(Player1);
// 			GameLosser(Player2);
// 		}
// 	};

// function reseter(){
// 	counter = 1;
// 	gameDATA.update({counter:1});

// Closing tag for ready function
})