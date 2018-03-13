$(document).ready(function () {


    // Initialize Firebase
    /* var config = {
        apiKey: "AIzaSyAeSEQnspIfuu39mrcXEmVWVUeKe2GKcn8",
        authDomain: "train-schedule-1ec1e.firebaseapp.com",
        databaseURL: "https://train-schedule-1ec1e.firebaseio.com",
        projectId: "train-schedule-1ec1e",
        storageBucket: "",
        messagingSenderId: "708784360533"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    */

    //okay i thik im going to have an array of objects and then
    //do a for loop to add each one to the database
    //and a for loop to display each one

    //1. when you add a train, it adds it to the array.
    //no, it's supposd to be stored as data. well it can be a local variable AND stored as data.
    //okay when you add a train it adds it to the array. 
    //the data object grabs from the array to store data.
    //the display grabs from the data to display.
    //this happens on submit and on page refresh. 

    //currentTime();
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
        },
        {
            name: "a",
            destination: "b",
            firstTime: "4:00",
            frequency: 20,
        },
    ];
/*
    $("#new-btn").on("click", function(){
        var secondDiv = $("<div>");
        secondDiv.text("hey there");
        $("#new-div").append(secondDiv);
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTime =  $("#first-input").val().trim();
        var frequency = $("#freq-input").val().trim();

        var newTrain = {
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        }; 
        trains.push(newTrain);
        console.log(newTrain); 
        displayTrains();

    }) */

    $("#submit-btn").on("click", function () {
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTime =  $("#first-input").val().trim();
      //  console.log("hey first time " + firstTime);
        var frequency = $("#freq-input").val().trim();

        var newTrain = {
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        }; 
        trains.push(newTrain);
       // console.log(newTrain); 
        displayTrains();
    }); 
  


    function displayTrains() {
         $("tbody").empty();
        trains.forEach(function (train) {
            var row = $("<tr>");
            var head = $("<th scope='row'</th>");
            head.text(train.name);
            var dest = $("<td>");
            dest.text(train.destination);
            var freq = $("<td>");
            freq.text(train.frequency);
            var next = $("<td>");
            //calculateNextArrival(train.firstTime, train.frequency);
            var currentTime = calcTime();
            console.log(typeof currentTime);
            var nextArrivalInMin = calculateNextArrival(train.firstTime, train.frequency, currentTime);
           // console.log(nextArrivalInMin);
            var nextArrivalConverted = timeConverter(nextArrivalInMin);
            console.log(nextArrivalConverted);
            next.text(nextArrivalConverted); 
            var wait = $("<td>");
           wait.text(calcWait(nextArrivalInMin, currentTime)); 
            row.append(head, dest, freq, next, wait);

            $("tbody").append(row);
        })
    };

    displayTrains();


    function calcTime() {

        var d = new Date();
        console.log(d.getHours() * 60 + d.getMinutes());
        return d.getHours() * 60 + d.getMinutes();

    }

    function calculateNextArrival(x, y, z) {
        //x will be first train time
        //y will be freq;
        //z will be current Time
        var arr = x.split(":");
        var milHours = parseInt(arr[0]);
        console.log(milHours + " this is hours");
        var milMin = parseInt(arr[1]);
        var firstInMin = milHours * 60 + milMin;
        //console.log("first arrival:" + firstInMin);
        console.log(typeof firstInMin);
       // var currentFrequency = parseInt(y);

        while (firstInMin < z) {
            firstInMin += parseInt(y);
        };
        if (firstInMin >= z) {
            var nextArrival = firstInMin;
            console.log(nextArrival);
            console.log(typeof firstInMin);
            
            return nextArrival;
        }

    };

    function calcWait(a, b) {
        return a - b;
    }

    function timeConverter(z) {
        //z will be nextArrival

        var convertedHours = Math.floor(z / 60);
        while (convertedHours>=24) {
            convertedHours-=24;
        }

        if (z < 60) {
            convertedHours = "00";
        }
        var convertedMinNum = z % 60;
        if (z % 60 < 10) {
            convertedMin = "0" + convertedMinNum;
            return convertedHours + ":" + convertedMin;
        }
        return convertedHours + ":" + convertedMinNum;
    };
    

});
