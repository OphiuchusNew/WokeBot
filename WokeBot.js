var info = require("./Woke_Bot_Token.js");
var token = info.token;
console.log(token);

var TelegramBot = require('node-telegram-bot-api'),
    bot = new TelegramBot(token, { polling: true });

console.log("Woke Bot online...")

//--globaL--variables--


var triggerWords = [
	{ word:"autism", value: 20},
	{ word:"autistic", value: -20},
	{ word:"balls", value: -15},
	{ word:"bernie", value: 30},
	{ word:"beyonce", value: 20},
	{ word:"bitch", value: -80},
	{ word:"black", value: -30},
	{ word:"breast", value: 50},
	{ word:"bruce", value:-80},
	{ word:"clitorus", value: 200},
	{ word:"ching", value: -100},
	{ word:"chong", value: -100},
	{ word:"congressmen", value: -40},
	{ word:"cunt", value: -500},
	{ word:"dick", value: -50},
	{ word:"fag", value: -30},
	{ word:"faggot", value: -30},
	{ word:"femimism", value: 100},
	{ word:"free", value: 50},
	{ word:"gay", value: -40},
	{ word:"gun", value: -20},
	{ word:"guns", value: -30},
	{ word:"hillary", value: 80},
	{ word:"huffington", value: 50},
	{ word:"indians", value: -30},
	{ word:"jefferson", value: -10},
	{ word:"labia", value: 100},
	{ word:"lourde", value: 60},
	{ word:"mailman", value: -20},
	{ word:"male", value: -80},
	{ word:"manspreading", value: -100},
	{ word:"men", value: -60},
	{ word:"moody", value: -60},
	{ word:"muscles", value: -80},
	{ word:"nazi", value: -50},
	{ word:"nigga", value: -99},
	{ word:"nigger", value: -100},
	{ word:"nipple", value: 50},
	{ word:"piv", value: -80},
	{ word:"penis", value: -200},
	{ word:"poc", value: 80},
	{ word:"porn", value: -100},
	{ word:"pussy", value: -50},
	{ word:"queer", value: 40},
	{ word:"rape", value: -500},
	{ word:"retarded", value: -100},
	{ word:"roles", value: -75},
	{ word:"rolls", value: -80},
	{ word:"stamps", value: -50},
	{ word:"tard", value: -99},
	{ word:"testicles", value: -60},
	{ word:"testosterone", value: -80},
	{ word:"trump", value: -800},
	{ word:"vagina", value: 300},
	{ word:"washington", value: -40},
	{ word:"welfare", value: 30},
	{ word:"white", value: -20},	
]

var Users = [
	{ UserId: 193300112, username: "implying", value: 0, quotes: [] }
]


bot.onText((/\/help/), function (msg, match) {
  	var fromId = msg.from.id;
  	var chatId = msg.chat.id;
  	var resp = "Available functions: /score_all, /score (username), /quotes (username), /trigger_list, /reset *admin* ";
  	bot.sendMessage(chatId, resp);
});

bot.onText((/\/trigger_list/), function (msg, match) {
  	var fromId = msg.from.id;
  	var chatId = msg.chat.id;
  	var resp = "YOU SHOULD KNOW WHAT IS WOKE AND WHAT IS NOT!!!";
  	bot.sendMessage(chatId, resp);
});

bot.onText(/\/score (.+)/, function (msg, match) {
  	var fromId = msg.from.id;
  	var username = match[1];
  	var chatId = msg.chat.id;
  
  	var x=-1;
	do{		
		x++;
	}while(username != Users[x].username && x<Users.length);
	var resp = Users[x].username + ":"+ Users[x].value;
	bot.sendMessage(chatId,resp);


});

bot.onText(/\/quotes (.+)/, function (msg, match) {
  	var fromId = msg.from.id;
  	var chatId = msg.chat.id;
  	var username = match[1];
  
  	var x=-1;
	do{		
		x++;
	}while(username != Users[x].username && x<Users.length);
	var resp = "Quotes from " + Users[x].username + ":{"+ Users[x].quotes+ "} ";
	bot.sendMessage(chatId,resp);


});

bot.onText((/\/score_all/), function (msg, match) {
  var fromId = msg.from.id;
  var chatId = msg.chat.id;
  console.log("Scores requested!")
  scores_all(chatId);
});

bot.on("message",function(msg) {
	var chatId = msg.chat.id;
  	var string = msg.text; 
  	var UserId = msg.from.id;
  	var Username = msg.from.username;
  	var Name = msg.from.first_name + " " +msg.from.last_name;

  	database(UserId,Username);	
  	analyze(string,UserId,Username,chatId, Name);

  	/*
  	console.log("New Message from " + Username + "(" + UserId + "): " + string);
  	var words = string.split(" ");
  	console.log(words);
	*/
  	
});
//checks to see if user exists in the database, if not then a new user object is created
function database(inUserId,inusername){
	var found = false;
	for(var i=0; i<Users.length; i++){
		if (inUserId == Users[i].UserId){
			found = true; 
		}
	}

	if(!found){
		Users[Users.length] = {UserId: inUserId,username: inusername,value: 0,quotes: []};
	}

}


function analyze(string,inUserId,inUsername,chatId,Name) {
	var x=-1;
	do{
		x++;
	}while(inUserId != Users[x].UserId && x<Users.length);

	for(var i=0;i<triggerWords.length;i++){
		var current_trigger_word_object = triggerWords[i];
		var current_trigger_word = current_trigger_word_object.word;
		var current_trigger_value = current_trigger_word_object.value;

		if (string.toLowerCase().includes(current_trigger_word)){
			Users[x].value += current_trigger_value;
			var push_string = true;
			console.log("Triggered! : " + current_trigger_word);
			console.log("Current Score for  " + Users[x].username + ": " + Users[x].value);
			if(Users[x].value < -3000){
				var msg = Name + ", you are basically satan. Your score is: " + Users[x].value; 
				bot.sendMessage(chatId,msg);
			}
		}


	}
	if(push_string){
		Users[x].quotes.push(string);
	}
}

function scores_all(chatId){
	for(var i=0; i<Users.length; i++){
		var msg = Users[i].username + ":" + Users[i].value;
		bot.sendMessage(chatId,msg);
	}
}



