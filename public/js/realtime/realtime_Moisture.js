const nbOfElts = 750;
const moiPlot = document.getElementById("mois");
const db = firebase.database();
let moi;

db.ref(`SensorMoisture/data`)
  .limitToLast(nbOfElts)
  .once("value", function (snapshot) {
    let timestamps = [];
    let moi = [];
    snapshot.forEach(function (childSnapshot) {
      timestamps.push(
        moment(childSnapshot.val().time).format("YYYY-MM-DD HH:mm:ss")
      );
      moi.push(childSnapshot.val().Moisture);
    });

    let moiTraces = {
      x: timestamps,
      y: moi,
      name: "Moisture",
    };

    let moiData = [];
    moiData.push(moiTraces);
    Plotly.newPlot(moiPlot, moiData, { responsive: true });
  });
