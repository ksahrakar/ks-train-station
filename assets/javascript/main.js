var config = {
    apiKey: "AIzaSyCJnM6R5mO_anIl9bl1b8OPJKXxWZv_eek",
    authDomain: "ks-train-station.firebaseapp.com",
    databaseURL: "https://ks-train-station.firebaseio.com",
    projectId: "ks-train-station",
    storageBucket: "ks-train-station.appspot.com",
    messagingSenderId: "162901958116"
};
firebase.initializeApp(config);

var db=firebase.database();

var name="";
var dest="";
var freq=0;
var first=0000;

var rName;
var rDest;
var rFreq;
var rFirst;


// Add a new train to schedule
$("#subBtn").on("click",function(e){
    e.preventDefault();
    name=$("#tName").val().trim();
    dest=$("#tDest").val().trim();
    freq=$("#tFreq").val();
    first=$("#tFirst").val();

    //console.log(name);

    var train = {
        tName: name,
        tDest:dest,
        tFreq:freq,
        tFirst:first
    };
    db.ref().push(train);

    // Clear Input Boxes
    $("#tName").val("");
    $("#tDest").val("");
    $("#tFreq").val("");
    $("#tFirst").val("");
})

// Detect if new train is added and add to table

db.ref().on("child_added",function(snsh){
       rName = snsh.val().tName;
       rDest = snsh.val().tDest;
       rFreq = parseInt(snsh.val().tFreq);
       rFirst = moment(snsh.val().tFirst,"HH:mm");
       var calced = calcTimes(rFreq,rFirst)

        //Refresh next train info - NOT WORKING
        // var nextTrain = ["",1440];
        // if (parseInt(calced[0])<=nextTrain[1]){
        //     nextTrain[0] = rName;
        //     nextTrain[1] = parseInt(calced[0]);
        //     $("#nextTrain").text(nextTrain[0]+" arrives in "+ nextTrain[1]+" minutes");
        // }

       // Create new row of data
       var newRow = $("<tr>").append(
        $("<th>").text(rName),
        $("<td>").text(rDest),
        $("<td>").text(moment(calced[1]).format("HH:mm")),
        $("<td>").text(rFreq),
        $("<td>").text(calced[0])
        );

        

        // Add row to table
        $("#tTable > tbody").append(newRow);

        // Refresh once a minute - NOT WORKING
        // function refresh(){
        //     calced = calcTimes(rFreq,rFirst);
        // }
        // setInterval(refresh(),60000);

}, function(error){
    console.log("the read failed"+error.code);
});

// Set clock and run every sec
function clock(){
    $("#clock").html(moment().format("MMMM Do YYYY |  HH:mm:ss"));
}
setInterval(clock,1000);

// Calculate time to next train
function calcTimes(freq,first){
var nextTrainMin;
var nextTrainTime;    
var curTime = moment();
var depTime = moment(first,"HH:mm");
var timeDiff = Math.round(moment.duration(curTime.diff(depTime)).as("minutes"));
var nextTrainMin = freq-(timeDiff%freq);
var nextTrainTime = moment().add(nextTrainMin,"minutes");
return[nextTrainMin,nextTrainTime]
}

