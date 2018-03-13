$(document).ready(function () {


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


  /*  var trains = [{
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
            name: "Tokyo Express",
            destination: "Tokyo",
            firstTime: "8:30",
            frequency: 45,
        },
    ];

/*
    $("#submit-btn").on("click", function () {
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTime = $("#first-input").val().trim();
        var frequency = $("#freq-input").val().trim();

        var newTrain = {
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        };

        trains.push(newTrain);
        displayTrains();
    }); */

    $("#submit-btn").on("click", function () {
        event.preventDefault();
        var name = $("#name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var firstTime = $("#first-input").val().trim();
        var frequency = $("#freq-input").val().trim();

        database.ref().update({
            name: name,
            destination: destination,
            firstTime: firstTime,
            frequency: frequency,
        });

        
    });

    database.ref().on("value", function(snapshot) {
        var data = snapshot.val();
        displayTrains(data);
  
  
        // If any errors are experienced, log them to console.
      }, function(errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

   /* trains.forEach(function(item) {
        database.ref().update({
            name: item.name,
            destination: item.destination,
            firstTime: item.firstTime,
            frequency: item.frequency,  
        })
        
    }); */

    function displayTrains(train) {
      
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
        
    };

   // displayTrains();
    /*

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

    displayTrains(); */

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
        var milMin = parseInt(arr[1]);
        var firstInMin = milHours * 60 + milMin;

        while (firstInMin < z) {
            firstInMin += parseInt(y);
        };
        if (firstInMin >= z) {
            var nextArrival = firstInMin;
            return nextArrival;
        }
    };

    function calcWait(a, b) {
        return a - b;
    }

    function timeConverter(z) {
        //z will be nextArrival
        var convertedHours = Math.floor(z / 60);
        while (convertedHours >= 24) {
            convertedHours -= 24;
        };

        var convertedMinNum = z % 60;
        var convertedMin = convertedMinNum.toString();
        if (convertedMin.length === 1) {
            convertedMin = "0" + convertedMinNum;
        }
        if (convertedHours > 12) {
            convertedHours-=12;
            return convertedHours + ":" + convertedMin + " PM";
        } else if(convertedHours ===0) {
            convertedHours+=12;
            return convertedHours + ":" + convertedMin + " AM";
        } else {
            return convertedHours + ":" + convertedMin + " AM";
        }
    };

});