$(document).ready(function(){

    var firebaseConfig = {
        apiKey: "AIzaSyCVEbsGelDPYhjqrfMF1GJLEHoi6TWaDSY",
        authDomain: "train-schedule-35894.firebaseapp.com",
        databaseURL: "https://train-schedule-35894.firebaseio.com",
        projectId: "train-schedule-35894",
        storageBucket: "train-schedule-35894.appspot.com",
        messagingSenderId: "392629642116",
        appId: "1:392629642116:web:6433a2dfc9c52c5cda73d1"
    };

    firebase.initializeApp(firebaseConfig);
    let database = firebase.database();

    //set table from database

    database.ref('/trains').on('value', function (snapshot) {
        //create a for loop to go through an array that makes a table row for each item in the array   
        $('#train-table tr').empty();     
        let table = snapshot.val();
        console.log(table) //test

        for (let i = 0; i < snapshot.length; i++) {    
            let trainObject = snapshot[i];

            let newRow = $('<tr>');

            let newCol = $('<td>');
            newCol.text(trainObject.trainName)
            newRow.append(newCol)

            newCol.text(trainObject.destination)
            newRow.append(newCol)

            newCol.text(trainObject.frequency)
            newRow.append(newCol)

            newCol.text() // next arrival HH:mm am/pm
            newRow.append(newCol)

            newCol.text()
            newRow.append(newCol)

            $('#train-table').append(newRow)

        }


    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    $('.btn').on('click', function() {
        event.preventDefault();

        let trainName = $('#train-name').val().trim();
        let destination = $('#destination').val().trim();
        let trainTime = $('#inputTime').val().trim();
        let frequency = $('#frequency').val().trim();

        console.log(trainTime)
 
        database.ref('/trains').push({
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
        })

        $('#train-name').val('');
        $('#destination').val('');
        $('#inputTime').val('');
        $('#frequency').val('');
    })



})