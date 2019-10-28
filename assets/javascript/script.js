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

    function checkTime (time) {
        let frequency = 35
        console.log(time)

        let diff = moment().diff(moment(time, "X"), "m")
        // let timeNow = moment().format('X')
        // console.log(timeNow)
        console.log(diff)

        // let newTime = time.add(frequency, 'm')
        // console.log(newTime)

        // while (time < timeNow) {
        //     time += moment().add(frequency, 'm')
        //     if(time > moment()) {
        //         return time
        //     }
        // // }
        // time += moment().add(frequency, 'm')

        // time = moment().format(time,"HH:mm a");
        // console.log(time)

        // if (time < timeNow) {
        //     time += moment()
        // }

        // let tempTime = time


        // let trialTime = time.diff(timeNow)
        // console.log(trialTime)
        // while (time < timeNow) {
        //     time += moment().add(35, 'm')
        //     if(time > timeNow) {
        //         return time
        //     }
        // // }
        // for (let i = frequency; time < timeNow; i + frequency){
        //     time = moment(time).add(35, 'm')
        // }

        // console.log(time)
        // console.log(tempTime)
        
        

        // // Prettify the employee start
        // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

        // // Calculate the months worked using hardcore math
        // // To calculate the months worked
        // var empMonths = moment().diff(moment(empStart, "X"), "months");
        // console.log(empMonths);

        // // Calculate the total billed rate
        // var empBilled = empMonths * empRate;
        // console.log(empBilled);


    }

    database.ref().on('child_added', function (snapshot) {
        //create a for loop to go through an array that makes a table row for each item in the array   
        $('#train-table tr').empty();     
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

        checkTime(table.trainTime)

        let newCol4 = $('<td>');
        newCol4.text() // next arrival HH:mm am/pm
        newRow.append(newCol4)

        let newCol5 = $('<td>');
        newCol5.text()
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