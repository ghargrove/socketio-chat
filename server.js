#!/usr/bin/env node

// Require express, jade & http
var express = require("express");
var jade    = require("jade");
var http = require("http");

// Create the server
var app     = express();
var server = http.createServer(app);

// Require Socket.io & listen to this app
var io = require("socket.io").listen(server);

// Set the views dir & disable layouts
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.set("view options", {layout: false});

// Configure the root
app.configure(function() {
	app.use(express.static(__dirname + "/public"));
});

// Tell the server which template to serve @ the root
app.get("/", function(req, res) {
	res.render("home.jade");
});

// Tell the app to listen to port 3000
server.listen(3000);

// When a client makes a connection w/ the server
io.sockets.on("connection", function(socket) {

	// Set the users pseudo name
	socket.on("setPseudo", function(data) {
		socket.set("pseudo", data);
	});

	// Handle the message
	socket.on("message", function(message) {
		socket.get("pseduo", function(error, name) {
			var data = {message: message, pseudo: name};
			socket.broadcast.emit("message", data);
			console.log("user " + name + " send this: " + message);
		});
	});
});