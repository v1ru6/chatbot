
var username = ""; //defining the username variable before we call it

function sendMessage(message){
	var prevState = $("#container").html();
	if (prevState.length > 3){
		prevState = prevState + "<br/>";
	}
	$("#container").html(prevState +"<span class='currentMessage'>" + "<span class='bot'>ChatBot: </span>" + message +"</span>");// i have added a span class of currentMessage to the already existing span that was targeting the bot in order to manipulate the way in which the textbot appears
	$(".currentMessage").hide(); // this will hide the currentMessage
	$(".currentMessage").delay("800").fadeIn(); //this will show the currentmessage after an 800ms delay making it fadein
	$(".currentMessage").removeClass("currentMessage"); //this will remove the currentMessage class in order for the above to not get removed after the second bot reply
}// this whole thing is making the new messages of the chatbot appear on a new line as opposed to overriding the previous ones
function getUsername(){
	sendMessage("Hello, what is your name?");
} //defining the getUsername as a function and by default the chat will display the Chatbot message when the page loads

function ai(message){
	if (username.length < 3){ //checking if the username length is less than 3
		username = message; //stating that the variable username is equal with the message
		sendMessage("Nice to meet you " + username + ", how are you doing?"); // the bot will take the username that the user provided and display a welcome message
	}

	if (message.indexOf("you")>=0){//matches the word you. it cannot be less that 3 characters
		sendMessage("I am good as well, thank you!"); //finds the word "you" in the user input and replies back
	}

	if(message.indexOf("not good")>=0 || message.indexOf("bad")>=0) {
		sendMessage("Sorry to hear that. What happened?");
	}

	if(message.indexOf("I")>=0) {
		sendMessage("Don't worry " + username + ", I am sure things will get better");
	}
}// this function will get a message from the user input

$(function(){
	getUsername(); //we are calling the above function after we defined it, we're calling it here because every function that has the $ sign in front of it will be called when the page loads
	$("#textbox").keypress(function(event){
		if (event.which == 13){ //13 is the position of the enter key
			if ( $("#enter").prop("checked") ){
				//console.log("enter pressed, checkbox checked"); //every time we press enter the console logs the action
				$("#send").click(); // clears the chatbox when the user is pressing enter
				event.preventDefault(); //pressing enter does not create a new line anymore
			}
		}
	});

	$("#send").click(function(){
		var username = "<span class='username'>You: </span>"; //this is the default username, every message will display You: before it. O have also added a span class to it in order to be able to style it with css
		var newMessage = $("#textbox").val(); //creates a variable to hold the value of the textbox element
		var prevState = $("#container").html(); //stores the previous text instead of replacing it by default with the new input
		//console.log(prevState.length); //we do this to find the length of the prevState element so we can set it higher than x as per below
		if (prevState.length > 3){
			prevState = prevState + "<br/>";
		} // if the prevstate length is higher than 3 then we add a linebreak (this removes the first line break that would appear by default at the top of the container)
		$("#container").html(prevState + username + newMessage); //passes the user message stored in the variable to the container element //also added the "You" variable to make sure the bot is displaying "You" before any message)
		$("#textbox").val(""); //clears the chatbox when the user is pressing "Send" button
		$("#container").scrollTop($("#container").prop("scrollHeight")); //makes the scrollbar go to the bottom automatically, when the max height allowed has been breached
		ai(newMessage); //calling the ai function
	});
});



