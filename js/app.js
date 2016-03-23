$(document).ready(function(){

// firebase Data link--------------------------------------
var gameDATA = new Firebase("https://intense-fire-339.firebaseio.com/");

// Firebase for viewers-----------------------------------
var connectedData 	= new Firebase("https://intense-fire-339.firebaseio.com/viewers");

// Generate a unique ID for each connection-------------------
var userData 		= connectedData.push();
	console.log("userData: " + userData);

// Check if the user is still connected-----------------------------
var presenceRef = new Firebase("https://intense-fire-339.firebaseio.com/.info/connected");

	// Checks for changes in data and out puts variables----------------- 
	gameDATA.on('value',function(snapshot){
		PlayersinGame = snapshot.child('player').numChildren();
		player1= snapshot.child('player').child(0);
		player2= snapshot.child('player').child(1);

		// Allows only for 2 players at a time-----------------------------
		if (PlayersinGame==2) {
				$("#PlayerReg").hide();
				$('#GameOptions').show();
			}else {
				$('#PlayerReg').show();
				$('#GameOptions').hide();
			}
		});

	// On click function for login---------------------
	$("#submitbttn").on('click',function(){

		userNumber = gameDATA.child("player").child(PlayersinGame);
	
		var name =$("#playerName").val().trim();
		PlayerDATA = {
				user: 	name, 
				choice: "",
				wins: 	0,
				loss: 	0,
				}

		// userData.set(PlayerDATA);	
		userNumber.set(PlayerDATA);

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

// rock paper scissors game
$(".choice").on("click",pickRPS);

function pickRPS(){
	UserPicked= $(this).data('pick');
	userNumber.update({choice: UserPicked});
	game();
}

// player1.val().choice
function game() {

		if (player1.val().choice === player2.val().choice) {
			console.log('no winner it is a draw');
			
		}
		if ((player1.val().choice === 'rock') && (player2.val().choice === 'scissors')) {
			GameWinner(player1);
			GameLosser(player2);
		}
		if ((player1.val().choice === 'rock') && (player2.val().choice === 'paper')) {
			GameWinner(player2);
			GameLosser(player1);
		}
		if ((player1.val().choice === 'paper') && (player2.val().choice === 'scissors')) {
			GameWinner(player2);
			GameLosser(player1);
		}
		if ((player1.val().choice === 'paper') && (player2.val().choice === 'rock')) {
			GameWinner(player1);
			GameLosser(player2);
		}
		if ((player1.val().choice === 'scissors') && (player2.val().choice === 'rock')) {
			GameWinner(player2);
			GameLosser(player1);
		}
		if ((player1.val().choice === 'scissors') && (player2.val().choice === 'paper')) {
			GameWinner(player1);
			GameLosser(player2);
		}
	};

function GameWinner(winner) {
	wins = winner.val().wins;
	wins++;
	userNumber.update({wins: wins, choice: ""});
	};

function GameLosser(Losser){
	losses = Losser.val().loss;
	losses++;
	playerCode= parseInt(Losser.key());
	gameDATA.child("player").child(playerCode).update({loss: losses, choice:""})

};

// function softreset(){
// 	pla

// function hardreset(){

// }
// Closing tag for ready function
})