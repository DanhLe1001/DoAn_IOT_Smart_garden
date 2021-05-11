var database = firebase.database();
var statusLED, statusAuto, statusPS, statusND;

$(document).ready(function () {
  database.ref("statusDevice/status/").on("value", function (snap) {
    statusLED = snap.val().statusLED;
    console.log("statusLED: " + statusLED);
    statusND = snap.val().statusND;
    console.log("statusND: " + statusND);
    statusPS = snap.val().statusPS;
    console.log("statusPS: " + statusPS);
    statusAuto = snap.val().statusAuto;
    console.log("statusAuto: " + statusAuto);

    if (statusAuto == "ON") {
      $("#myonoffswitch").attr("checked", "checked");
      $("#myonoffswitch4").attr("disabled", "disabled");
      $("#myonoffswitch6").attr("disabled", "disabled");
      document.getElementById("hidden-nd").classList.toggle("actived");
      document.getElementById("hidden-ps").classList.toggle("actived");
    } else {
      $("#myonoffswitch").prop("checked", false);
      $("#myonoffswitch4").attr("disabled", false);
      $("#myonoffswitch6").attr("disabled", false);
      document.getElementById("hidden-nd").classList.remove("actived");
      document.getElementById("hidden-ps").classList.remove("actived");

    }
    if (statusLED == "ON") {
      $("#myonoffswitch2").attr("checked", "checked");
    } else {
      $("#myonoffswitch2").prop("checked", false);
    }

    if (statusPS == "ON") {
      $("#myonoffswitch4").attr("checked", "checked");
    } else {
      $("#myonoffswitch4").prop("checked", false);
    }

    if (statusND == "ON") {
      $("#myonoffswitch6").attr("checked", "checked");
    } else {
      $("#myonoffswitch6").prop("checked", false);
    }
  });

  return Promise.all([updata_firebase()]);
});

function updata_firebase() {
  $("#myonoffswitch").change(function () {
    var firebaseRef = firebase
      .database()
      .ref("statusDevice/status")
      .child("statusAuto");
    if ($(this).prop("checked") == true) {
      firebaseRef.set("ON");
    } else {
      firebaseRef.set("OFF");
    }
  });

  $("#myonoffswitch2").change(function () {
    var firebaseRef = firebase
      .database()
      .ref("statusDevice/status")
      .child("statusLED");
    if ($(this).prop("checked") == true) {
      firebaseRef.set("ON");
    } else {
      firebaseRef.set("OFF");
    }
  });
  $("#myonoffswitch4").change(function () {
    var firebaseRef = firebase
      .database()
      .ref("statusDevice/status")
      .child("statusPS");
    if ($(this).prop("checked") == true) {
      firebaseRef.set("ON");
    } else {
      firebaseRef.set("OFF");
    }
  });
  $("#myonoffswitch6").change(function () {
    var firebaseRef = firebase
      .database()
      .ref("statusDevice/status")
      .child("statusND");
    if ($(this).prop("checked") == true) {
      firebaseRef.set("ON");
    } else {
      firebaseRef.set("OFF");
    }
  });
}
