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
      $(".box-df-nd").css({
        filter: "grayscale(1)brightness(0.9)",
        transition: "filter 0.2s ease-in",
      });
      $(".box-df-ps").css({
        filter: "grayscale(1)brightness(0.9)",
        transition: "filter 0.2s ease-in",
      });
    } else if (statusAuto == "OFF") {
      $("#myonoffswitch").prop("checked", false);
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
