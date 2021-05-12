var gas = firebase.database().ref().child("SensorMoisture/data");

gas.on("child_added", function (sanp) {
  var row = sanp.val();
  $("#content").html(row.Moisture + " &deg;%");
});

//var nameType = $.fn.dataTable.absoluteOrderNumber({value: 'Unknown', position: 'top'});

const table = $("#example2").DataTable({
  dom: "Bfrtip",
  buttons: ["copy", "csv", "excel", "pdf", "print"],
  lengthMenu: [10, 20, 30, 50, 100],
  pagingType: "full_numbers",
  //   columnDefs: [
  //     { targets: 0, type: nameType }
  // ]
  order: [[3, "desc"]],
});

$("#example2 tbody").on("click", "tr", function () {
  var data = table.row(this).data();
  Swal.fire({
    title: "<strong>Dữ liệu lần thứ: </strong>" + data[0],
    icon: "success",
    text:
      "Moisture: " +
      data[1] +
      ", " +
      "Time: " +
      data[2] +
      ", " +
      "Date: " +
      data[3],

    showCloseButton: true,
  });
});

var counter = 0;

firebase
  .database()
  .ref("SensorMoisture/")
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

  var pm = addAPM(hours);
  time += hours + ":" + minutes + ":" + seconds + " " + pm;
  return time;
}
function drawToTable(motionData) {
  if (motionData) {
    table.clear();
    updatedData = [];

    Object.keys(motionData).forEach((key) => {
      counter++;
      const gas_value = motionData[key].Moisture;
      const timestamp = motionData[key].time;

      const date2 = new Date(timestamp);

      var day = date2.getDate();
      var month = date2.getMonth(); //Be careful! January is 0 not 1
      var year = date2.getFullYear();
      var dateString = day + "/" + (month + 1) + "/" + year;

      var timeString = displayTime(timestamp);

      updatedData.push([counter, gas_value, timeString, dateString]);
    });
    updatedData.reverse();
    table.rows.add(updatedData).draw(false);
  }
}

function filterColumn(i) {
  $("#example2")
    .DataTable()
    .column(i)
    .search($("#col" + i + "_filter").val())
    .draw();
}

$("input.column_filter").on("keyup click", function () {
  filterColumn($(this).parents("tr").attr("data-column"));
});

var gaugeOptions = {
  chart: {
    type: "solidgauge",
  },

  title: null,

  pane: {
    center: ["50%", "85%"],
    size: "140%",
    startAngle: -90,
    endAngle: 90,
    background: {
      backgroundColor:
        (Highcharts.theme && Highcharts.theme.background2) || "#EEE",
      innerRadius: "60%",
      outerRadius: "100%",
      shape: "arc",
    },
  },

  tooltip: {
    enabled: false,
  },

  // the value axis
  yAxis: {
    stops: [
      [0.1, "#55BF3B"], // green
      [0.5, "#DDDF0D"], // yellow
      [0.9, "#DF5353"], // red
    ],
    lineWidth: 0,
    minorTickInterval: null,
    tickAmount: 2,
    title: {
      y: -70,
    },
    labels: {
      y: 16,
    },
  },

  plotOptions: {
    solidgauge: {
      dataLabels: {
        y: 5,
        borderWidth: 0,
        useHTML: true,
      },
    },
  },
};

var chartSpeed = Highcharts.chart(
  "container-gas",
  Highcharts.merge(gaugeOptions, {
    yAxis: {
      min: 10,
      max: 100,
      title: {
        text: "Moisture",
      },
    },

    credits: {
      enabled: false,
    },

    series: [
      {
        name: "Moisture",
        data: [0],
        dataLabels: {
          format:
            '<div style="text-align:center"><span style="font-size:25px;color:' +
            ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              "black") +
            '">{y}</span><br/>' +
            '<span style="font-size:12px;color:silver">%</span></div>',
        },
        tooltip: {
          valueSuffix: " %",
        },
      },
    ],
  })
);

var myRef = firebase.database().ref("SensorMoisture/data");
myRef.limitToLast(1).on("child_added", function (snapshot) {
  data = snapshot.val();
  var h = data.Moisture;

  var point, newVal, inc;
  if (chartSpeed) {
    point = chartSpeed.series[0].points[0];
    inc = h;
    newVal = point.y + inc;
    point.update(newVal);
    point.y = 0;
  }
});
