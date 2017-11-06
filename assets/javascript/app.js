// Initialize Firebase
var config = {
    apiKey: "AIzaSyBemAQx9AQis3PwESSZF74pq_pwsyB7JAI",
    authDomain: "train-app-905ef.firebaseapp.com",
    databaseURL: "https://train-app-905ef.firebaseio.com",
    projectId: "train-app-905ef",
    storageBucket: "train-app-905ef.appspot.com",
    messagingSenderId: "162147485181"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";


// on(click) function for adding train info
  $("#submit").on("click", function(snapshot){
  		event.preventDefault();

// Grabs user input
  	trainName = $("#input-name").val().trim();
  	destination = $("#input-destination").val().trim();
  	firstTrain = $("#input-time").val().trim();
  	frequency = $("#input-frequency").val().trim();

// Creates local "Temporary" object for holding train data
  	database.ref().push(newTrain);

  	var newTrain = {
  		name: trainName,
  		destination: destination,
  		firstTrain: firstTrain,
  		frequency: frequency,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	};

// pushes train info to database
  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.firstTrain);
  	console.log(newTrain.frequency);

// Clears input boxes
  $("#input-name").val("");
	$("#input-destination").val("");
	$("#input-time").val("");
	$("#input-frequency").val("");

	$("#table-body").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + "</td></tr>");

	// $("#table-body").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
 //  frequency + "</td><td>" + firstTrain + "</td><td>" + arrival + "</td><td>" + minAway + "</td></tr>");

  });

// Create Firease event for adding trains to database and writing to the HTML 
  database.ref().on("child_added", function(childSnapshot){

  	console.log(childSnapshot.val());

// Store everything into a variable
  	trainName = childSnapshot.val().name;
  	destination = childSnapshot.val().destination;
 	  firstTrain = childSnapshot.val().firstTrain;
  	frequency = childSnapshot.val().frequency;

  	var tFrequency = frequency;
  	var firstTime = firstTrain;

  	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

  	var currentTime = moment();
  	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  	console.log("DIFFERENCE IN TIME: " + diffTime);

  	var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var minAway = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    var nextTrain = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().firstTrain);
	console.log(childSnapshot.val().frequency);
	console.log(childSnapshot.val().dateAdded);

	$("#table-body").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  	frequency + "</td><td>" + moment(nextTrain).format("LT") + "</td><td>" + minAway + "</td></tr>");

}, function(errorObject) {
		console.log("Errors handled: " + errorObject.code);
	});


