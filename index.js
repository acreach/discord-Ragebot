var Discord = require("discord.js");

// Get the email and password
var AuthDetails = require("./auth.json");

var bot = new Discord.Client();
var colors = ["DARK", "RED", "BLUE", "GOLDEN", "GREEN", "ORANGE", "WHITE", "PINK", "BROWN", "BLACK"];
var adjs = ["ELECTRICAL", "RADIOACTIVE", "SPACE", "LAZER SHOOTING", "FLYING", "DEAD", "PLASTIC", "SHINING"];
var nationality = ["MEXICAN", "AMERICAN", "FRENCH", "SPANISH", "ITALIAN", "RUSSIAN", "PORTUGUESE", "BRASILIAN", "PINOY", "NAZI", "CHINESE"];
var nouns = ["PONEY", "SNAKE", "GOAT", "COW", "DEMON", "MAN", "GIRL", "BOY", "ROBOT", "HORSE", "PIG", "BIRD", "PIZZAIOLO", "MERLINI", "SPIDER"];

bot.on("ready", function () {
	bot.setPlayingGame(234);
	console.log("Ready to begin ! Serving in " + bot.channels.length + " channels");
});

bot.on("disconnected", function () {
	process.exit(1); //exit node.js with an error
});

bot.on("message", function (msg) {
	var msg_args = msg.content.split(" ");

	if (msg_args[0] === "ping") {
		bot.sendMessage(msg.channel, "Pong !");
	} else if (msg_args[0] === "bot" && msg_args[1] === undefined) {
		bot.sendMessage(msg.channel, "Commandes disponibles : \n - /osfrog \n - /roll [nbDice] [rollMax]");
	} else if (msg_args[0].toLowerCase() === "/osfrog") {
		bot.sendMessage(msg.channel, "LE BALANCED " + randElem(colors) + " " + randElem(adjs) + " " + randElem(nationality) + " " + randElem(nouns));
	} else if (msg_args[0].toLowerCase() === "/roll") {
		if (parseInt(msg_args[1],10) && parseInt(msg_args[2],10) && msg_args[3] === undefined) {
			bot.sendMessage(msg.channel, rollTheDice(parseInt(msg_args[1], 10), parseInt(msg_args[2], 10)));
		} else {
			bot.sendMessage(msg.channel, "Syntaxe incorrecte : /roll [nbDice] [rollMax]");
		}
	}
});

var randElem = function(tab) {
	var max = tab.length - 1;
	var rand = Math.floor(Math.random()*max);
	return tab[rand];
}

var rollTheDice = function(nbRoll, maxRoll) {
	if (maxRoll < 1) maxRoll = 1;
	if (maxRoll > 100) maxRoll = 100;
	if (nbRoll < 1) nbRoll = 1;
	if (nbRoll > 10) nbRoll = 10;

	var rolls = '# (1 - ' + maxRoll  + ') x '  + nbRoll + ' -> ';	
	for (var ii = 0; ii < nbRoll; ii++) {
		rollValue = Math.floor(Math.random()*maxRoll) + 1;
		rolls += '[' + rollValue + '] ';
	}
	return rolls + '#';
}

bot.login(AuthDetails.email, AuthDetails.password);
