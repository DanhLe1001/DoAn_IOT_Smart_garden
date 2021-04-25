var logDHT = firebase.database().ref().child("DHT/data");

logDHT.on("child_added", function (sanp) {
  var row = sanp.val();
  $("#content").html(sanp.val().temp + " &deg;C");
  $("#content2").text(sanp.val().humi + " %");
});
const table = $("#example2").DataTable({
  lengthMenu: [
    [10, 25, 50, -1],
    [10, 25, 50, "All"],
  ],
  pagingType: "full_numbers",
});
var counter = 0;
firebase
  .database()
  .ref("DHT/")
  .on("value", (snap) => {
    const values = snap.val();
    drawToTable(values.data);
  });

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function addAPM(i) {
  if (i > 11) {
    i = "PM";
  } else {
    i = "AM";
  }
  return i;
}
function displayTime(timestamp) {
  var time = "";
  var currentTime = new Date(timestamp);
  var hours = addZero(currentTime.getHours());
  var minutes = addZero(currentTime.getMinutes());
  var seconds = addZero(currentTime.getSeconds());

  // if (minutes < 10) {
  //     minutes = "0" + minutes
  // }
  // if (seconds < 10) {
  //     seconds = "0" + seconds
  // }
  var pm = addAPM(hours);
  time += hours + ":" + minutes + ":" + seconds + " " + pm;
  // if(hours > 11){
  //     str += "PM"
  // } else {
  //     str += "AM"
  // }

  return time;
}
function drawToTable(motionData) {
  if (motionData) {
    table.clear();
    updatedData = [];

    Object.keys(motionData).forEach((key) => {
      counter++;
      const humidity = motionData[key].humi;
      const temperature = motionData[key].temp;
      const timestamp = motionData[key].time;

      const date2=new Date(timestamp);

      var day = date2.getDate();
      var month = date2.getMonth(); //Be careful! January is 0 not 1
      var year = date2.getFullYear();
      var dateString = day + "/" +(month + 1) + "/" + year;
      var timeString = displayTime(timestamp);
      updatedData.push([
        counter,
        humidity,
        temperature,
        timeString,
        dateString,
      ]);
    });
    updatedData.reverse();
    table.rows.add(updatedData).draw(false);
  }
}
