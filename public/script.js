// Connect to socket io
var socket = io.connect();

// Listen for messages from socket.io so
// we can update the ui
socket.on("message", function(data) {
	addMessage(data.msg, data.pseudo);
});

// Add a message to the UI
function addMessage(msg, pseudo)
{
	$("#chatEntries").append("<div class='message'><p>" + pseudo + " : " + msg + "</p></div>");
}

// Event handler that sends a message to socket.io
function sendMessage()
{
	// Make sure the user entered a message
	if ($("#messageInput").val() != "") {
		// Push the message
		socket.emit("message", $("#messageInput").val());
		addMessage($("#messageInput").val(), "Me", new Date().toISOString(), true);
		$("#messageInput").val("");
	}
}

// Event handler that sends a users
// pseudo name to socket.io
function setPseudo()
{
	if ($("#pseudoInput").val() != "") {
		// Send the name
		socket.emit("setPseudo", $("#pseudoInput").val());
		// Show chat controls & hide the pseudo stuff
		$("#chatControls").show();
		$("#pseudoInput").hide();
		$("#pseudoSet").hide();
	}
}

$(function() {
	$("#chatControls").hide();
	$("#pseudoSet").click(function() { setPseudo(); });
	$("#submit").click(function() { sendMessage(); });
});