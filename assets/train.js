var config = {
	apiKey: "AIzaSyAbMJ7nracbC7r3sLu_f_zAXO96aKyjohE",
	authDomain: "train-scheduler-d0dde.firebaseapp.com",
	databaseURL: "https://train-scheduler-d0dde.firebaseio.com",
	projectId: "train-scheduler-d0dde",
	storageBucket: "train-scheduler-d0dde.appspot.com",
	messagingSenderId: "840279540342"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#add-train-btn").on("click", function() {
	event.preventDefault();

	var trainName = $("#train-name-input").val().trim();
	var newDest = $("#destination-input").val().trim();
	var newFirstTime = $("#first-time-input").val().trim();
	var freq = $("#frequency-input").val().trim();

	var newTrain = {
		name: trainName,
		destination: newDest,
		firstTrainTime: newFirstTime,
		frequency: freq
	};

	database.ref().push(newTrain);

	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.firstTrainTime);
	console.log(newTrain.frequency);

	alert("Train successfully added");

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-time-input").val("");
	$("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());

	var snapVal = childSnapshot.val();

	var trainName = snapVal.name;
	var trainDest = snapVal.destination;
	var trainStart = snapVal.firstTrainTime;
	var trainFreq = snapVal.frequency;

	var firstTimeConverted = moment(trainStart, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % trainFreq;
	var tMinutesTillTrain = trainFreq - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	console.log(trainName);
	console.log(trainDest);
	console.log(trainStart);
	console.log(trainFreq);

  	$("#train-table tbody").append('<tr><td>' + trainName + '</td><td> ' + trainDest + '</td><td>'
 	+ trainFreq + '</td><td>' + moment(nextTrain).format("hh:mm") + '</td><td>' + tMinutesTillTrain + '</td></tr>');

});








