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
    var layout2 = {
      yaxis: {
        title: {
          text: 'Moisture (%)',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      },
      shapes: [
        {
          type: "line",
          xref: "paper",
          x0: 0,
          y0: 75.0,
          x1: 1,
          y1: 75.0,
          line: {
            color: "rgb(255, 0, 0)",
            width: 2,
            dash: "lines",
          },
        },
        {
          type: "line",
          xref: "paper",
          x0: 0,
          y0: 55.0,
          x1: 1,
          y1: 55.0,
          line: {
            color: "rgb(12, 138, 12)",
            width: 2,
            dash: "lines",
          },
        },
      ],
    };
    let moiData = [];
    moiData.push(moiTraces);
    Plotly.newPlot(moiPlot, moiData, layout2);
  });
