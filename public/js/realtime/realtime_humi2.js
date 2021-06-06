const nbOfElts = 750;

const temperaturePlotDiv = document.getElementById("temperaturePlot");
const humidityPlotDiv = document.getElementById("humidityPlot");

const db = firebase.database();

let timestamps;
let temperatures;
let humidities;

db.ref(`DHT/data`)
  .limitToLast(nbOfElts)
  .once("value", (snapshot) => {
    let timestamps = [];
    let temperatures = [];
    let humidities = [];

    snapshot.forEach((childSnapshot) => {
      timestamps.push(
        moment(childSnapshot.val().time).format("YYYY-MM-DD HH:mm:ss")
      );
      temperatures.push(childSnapshot.val().temp);
      humidities.push(childSnapshot.val().humi);
    });

    let temperatureTraces = {
      x: timestamps,
      y: temperatures,
      name: "DHT11",
      mode: "lines+markers",
      type: "scatter",
    };
    var layout = {
      yaxis: {
        title: {
          text: 'Temperature (&#186;C)',
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
          y0: 35.0,
          x1: 1,
          y1: 35.0,
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
          y0: 20.0,
          x1: 1,
          y1: 20.0,
          line: {
            color: "rgb(12, 138, 12)",
            width: 2,
            dash: "lines",
          },
        },
      ],
    };
    let temperatureData = []; // last plotly object to build
    temperatureData.push(temperatureTraces);
    Plotly.newPlot(temperaturePlotDiv, temperatureData, layout);

    let humidityTraces = {
      x: timestamps,
      y: humidities,
      name: "DHT11",
      mode: "lines+markers",
      type: "scatter",
    };
    var layout2 = {
      yaxis: {
        title: {
          text: 'Humidity (%)',
          font: {
            family: 'Courier New, monospace',
            size: 18,
            color: '#7f7f7f'
          }
        }
      }
    };
    let humidityData = []; // last plotly object to build
    humidityData.push(humidityTraces);
    Plotly.newPlot(humidityPlotDiv, humidityData, layout2);
  });
