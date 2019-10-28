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

    database.ref().on('child_added', function (snapshot) {
 
        let table = snapshot.val();
    
        let newRow = $('<tr>');

        let newCol = $('<td>');
        newCol.text(table.trainName)
        newRow.append(newCol)

        let newCol2 = $('<td>');
        newCol2.text(table.destination)
        newRow.append(newCol2)

        let newCol3 = $('<td>');
        newCol3.text(table.frequency)
        newRow.append(newCol3)

        //write the math to finish the code
        let time = table.trainTime
        let diff = moment().diff(moment(time, "HH:mm"), "m")
        let nextArrival;
        let minAway;

        if (diff <= 0) {
            nextArrival = time
            minAway = diff
        } else {
            let remainder = diff % table.frequency
            // equation to get the remainder and time incase it is in the future---------------------------
            console.log('remainder: ' + remainder)
        }

        ////// DISPLAY NEXT ARRIVAL IN "HH:mm a"-------------------------------

        let newCol4 = $('<td>');
        newCol4.text(nextArrival) // next arrival HH:mm am/pm
        newRow.append(newCol4)

        let newCol5 = $('<td>');
        newCol5.text(Math.abs(minAway))
        newRow.append(newCol5)

        $('#train-table').append(newRow)

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    $('.btn').on('click', function() {
        event.preventDefault();

        let trainName = $('#train-name').val().trim();
        let destination = $('#destination').val().trim();
        let trainTime = $('#inputTime').val().trim();
        let frequency = $('#frequency').val().trim();
 
        database.ref().push({
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