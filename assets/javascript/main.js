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


// Add a new train to schedule
$("#subBtn").on("click",function(e){
    e.preventDefault();
    name=$("#tName").val().trim();
    dest=$("#tDest").val().trim();
    freq=$("#tFreq").val();
    first=$("#tFirst").val();

    console.log(name);

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
