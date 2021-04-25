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
    };
    let temperatureData = []; // last plotly object to build
    temperatureData.push(temperatureTraces);
    Plotly.newPlot(temperaturePlotDiv, temperatureData);

    let humidityTraces = {
      x: timestamps,
      y: humidities,
      name: "DHT11",
    };
    let humidityData = []; // last plotly object to build
    humidityData.push(humidityTraces);
    Plotly.newPlot(humidityPlotDiv, humidityData);
  });
