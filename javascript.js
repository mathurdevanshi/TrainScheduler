// ///////////////////////////////////////VARIABLES////////////////////////////////////
var trainName;
var trainDestination;
var trainFirstTime;
var trainFrequency;
var database;
var minutesAway;
var nextTrainTime;
// ///////////////////////////////////////ARRAYS & OBJECTS/////////////////////////////
var newTrain={};
// ///////////////////////////////////////FUNCTIONS////////////////////////////////////
// //----------------------------------------------------------------------------------------------  linking to Firebase
var config = {
    apiKey: "AIzaSyBPbpr7m4-ESUt4j8NCxrWRbRwZXia1Q1Y",
    authDomain: "trainschedulerhw7.firebaseapp.com",
    databaseURL: "https://trainschedulerhw7.firebaseio.com",
    projectId: "trainschedulerhw7",
    storageBucket: "trainschedulerhw7.appspot.com",
    messagingSenderId: "415352909317"
  };
  firebase.initializeApp(config);
  database = firebase.database();
// //----------------------------------------------------------------------------------------------  saving form to variables
$("#sumbmitButton").on("click",function(event){
    event.preventDefault();
    trainName=$("#name").val();
    trainDestination=$("#destination").val();
    trainFirstTime=$("#firstTrainTime").val();
        console.log("Train First Time",trainFirstTime);
    trainFrequency=$("#frequency").val();
    //
    $("#name").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");
    //
    var trainFirstTimeConverted= moment(trainFirstTime, "hh:mm").subtract(1,'years');
        console.log("NEW PART HERE TRAIN DEPART CONVERT:", trainFirstTimeConverted);
    var differenceInTime = moment().diff(moment(trainFirstTimeConverted), "minutes");
        console.log(differenceInTime);
    var differenceInTimeRemainder= differenceInTime%trainFrequency;
        console.log(differenceInTimeRemainder);
    minutesAway = trainFrequency-differenceInTimeRemainder;
        console.log(minutesAway);
    minutesAway=moment().startOf('day').add(minutesAway,'minutes').format('HH:mm');
        console.log(minutesAway);
    nextTrainTime=moment().add(minutesAway).format('HH:mm');
        console.log(nextTrainTime);
    //
    newTrain={
        name: trainName,
        destination: trainDestination,
        firstTrainTime: trainFirstTime,
        frequency: trainFrequency,
        nextTrain: minutesAway
    };
    //
    firebase.database().ref().push(newTrain);
})
// //----------------------------------------------------------------------------------------------  getting info from database 
    database.ref().on("child_added", function(childSnapShot){
    var newname=childSnapShot.val().name;
    var newdestination=childSnapShot.val().destination;
    var newfirstTrainTime=childSnapShot.val().firstTrainTime;
    var newfrequency=childSnapShot.val().frequency;
    var newnextTrain=childSnapShot.val().nextTrain;
    var newRow = $("<tr>").append(
        $("<td>").text(newname),
        $("<td>").text(newdestination),
        $("<td>").text(newfirstTrainTime),
        $("<td>").text(newfrequency),
        $("<td>").text(newnextTrain)
      );
    $("#addTrain").append(newRow);
    // $("#addTrain").append(newRow);
    });  
