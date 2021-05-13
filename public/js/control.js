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
      document.getElementById("myonoffswitch").checked = true;
      $("#myonoffswitch4").attr("disabled", "disabled");
      $("#myonoffswitch6").attr("disabled", "disabled");
      $(".box-df-nd").css({
        filter: "grayscale(1)brightness(0.9)",
        transition: "filter 0.2s ease-in",
      });
      $(".box-df-ps").css({
        filter: "grayscale(1)brightness(0.9)",
        transition: "filter 0.2s ease-in",
      });
    } else {
      document.getElementById("myonoffswitch").checked = false;
      $("#myonoffswitch4").attr("disabled", false);
      $("#myonoffswitch6").attr("disabled", false);
      $(".box-df-nd").css({ filter: "", transition: "" });
      $(".box-df-ps").css({ filter: "", transition: "" });
    }
    if (statusLED == "ON") {
      document.getElementById("myonoffswitch2").checked = true;
    } else {
      document.getElementById("myonoffswitch2").checked = false;
    }

    if (statusPS == "ON") {
      document.getElementById("myonoffswitch4").checked = true;
    } else {
      document.getElementById("myonoffswitch4").checked = false;
    }

    if (statusND == "ON") {
      document.getElementById("myonoffswitch6").checked = true;
    } else {
      document.getElementById("myonoffswitch6").checked = false;
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
