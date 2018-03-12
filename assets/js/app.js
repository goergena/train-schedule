// Initialize Firebase
var config = {
    apiKey: "AIzaSyAeSEQnspIfuu39mrcXEmVWVUeKe2GKcn8",
    authDomain: "train-schedule-1ec1e.firebaseapp.com",
    databaseURL: "https://train-schedule-1ec1e.firebaseio.com",
    projectId: "train-schedule-1ec1e",
    storageBucket: "",
    messagingSenderId: "708784360533"
};
firebase.initializeApp(config);

var database = firebase.database();

//okay i thik im going to have an array of objects and then
//do a for loop to add each one to the database
//and a for loop to display each one

//1. when you add a train, it adds it to the array.
//no, it's supposd to be stored as data. well it can be a local variable AND stored as data.
//okay when you add a train it adds it to the array. 
//the data object grabs from the array to store data.
//the display grabs from the data to display.
//this happens on submit and on page refresh. 
var trains = [{
        name: "Thomas the Tank Engine",
        destination: "Lazy Town",
        firstTime: "8:00",
        frequency: 120,
    },
    {
        name: "Cali Express",
        destination: "San Francisco",
        firstTime: "6:00",
        frequency: 30,
    }
];

$("#submit-Btn").on("click", function () {
    var newTrain = {
        name: $("#name-input").val().trim(),
        destination: $("#destination-input").val().trim(),
        firstTime: $("#first-input").val().trim(),
        frequency: $("#freq-input").val().trim(),
    };
    trains.push(newTrain);
});

$("#time").append(Date());

function currentTime() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var timeDisplay = h + ":" + m + " AM";
    if (m < 10) {
        var newM = "0" + m;
        console.log(newM);
    }

    if (h > 12) {
        var newH = h - 12;
        timeDisplay = newH + ":" + m + " PM";
    }
    console.log(timeDisplay);
    return timeDisplay;
};

currentTime();

var nextArrival = 0;
var minAway = 0;


function calculateNextArrival(x, y) {
    //x will be first train time
    //y will be freq;
    var arr = x.split(":");
    var milHours = parseInt(arr[0]);
    var milMin = parseInt(arr[1]);
    var firstInMin = milHours * 60 + milMin;
    console.log("first arrival:" + firstInMin);
    //console.log(typeof firstInMin);

    var date = new Date();
    var curTimeInMin = date.getHours() * 60 + date.getMinutes();
    console.log("current time in min" + curTimeInMin);


    while (firstInMin < curTimeInMin) {
        firstInMin += y;
    };
    if (firstInMin >= curTimeInMin) {
        nextArrival = firstInMin;
        minAway = nextArrival - curTimeInMin;
    }

    console.log("next arrival in min" + nextArrival);

};

function timeConverter(z) {
    //z will be nextArrival
    if(z >= 60) {
        var convertedHours = Math.floor(z / 60);
        var convertedMin = z % 60;
        console.log(convertedHours + ":" + convertedMin);
    }
}
timeConverter(912);

var testArrival = "5:00";
var testFreq = 60;
var testArrival2 = "15:00";
var testArrival3 = "14:52";
calculateNextArrival(testArrival, testFreq);
calculateNextArrival(testArrival2, testFreq);
calculateNextArrival(testArrival3, 7);




