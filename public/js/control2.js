var db = firebase.firestore();
//var ledPK, ledPN, ledTL, ledPB, ledHL, fan1, fan2;
var statusLED, statusAuto, statusPS, statusND;
// Js nam ======================================================================
function openCl(ev) {
  switch (ev) {
    case 1:
      let modal = document.getElementById("modal-popup-status");
      modal.classList.toggle("activated");
      break;
    case 2:
      let modal2 = document.getElementById("modal-popup-living-room");
      modal2.classList.toggle("activated");
      break;
    case 3:
      let modal3 = document.getElementById("modal-popup-bedroom");
      modal3.classList.toggle("activated");
      break;
    case 4:
      let modal4 = document.getElementById("modal-popup-kitchen");
      modal4.classList.toggle("activated");
      break;
    case 5:
      let modal5 = document.getElementById("modal-popup-toilet");
      modal5.classList.toggle("activated");
      break;
    case 6:
      let modal6 = document.getElementById("modal-popup-lobby");
      modal6.classList.toggle("activated");
  }
}
// document.getElementById("myonoffswitch8").onclick = (e) => {
//   var target = document.getElementById("myonoffswitch8");
//   if (target.checked) {
//     let lon = document.getElementById("display-light-on");
//     lon.classList.toggle("online");
//     document.getElementById("display-light-off").classList.toggle("hidden");
//   } else {
//     let loff = document.getElementById("display-light-off");
//     loff.classList.toggle("online");
//     document.getElementById("display-light-on").classList.toggle("hidden");
//   }
// };

// =====================================end js nam=====================
$(document).ready(function () {
  db.collection("device-configs")
    .doc("deviceled")
    .onSnapshot(function (doc) {
      // ledPK = doc.data().led1;
      // ledPN = doc.data().led2;
      // ledPB = doc.data().led3;
      // ledTL = doc.data().led4;
      // ledHL = doc.data().led5;
      // fan1 = doc.data().fan1;
      // fan2 = doc.data().fan2;
      statusLED = doc.data().led1;
      statusPS = doc.data().statusps;
      statusND = doc.data().statusnd;
      statusAuto = doc.data().statusauto;

      // Phong Khach
      if (statusAuto == 1) {
        // $(".lightStatus").text("Đèn  đang bật");
        // $(".lightStatus").css({ color: "green" });
        $("#myonoffswitch").attr("checked", "checked");
        // $("#btnLedPK2").addClass("active").removeClass("disabled");
      } else {
        // $(".lightStatus").text("Đèn đang tắt");
        // $(".lightStatus").css({ color: "red" });
        // $("#btnLedPK1").addClass("active").removeClass("disabled");
        // $("#btnLedPK2").addClass("disabled").removeClass("active");
        $("#myonoffswitch").prop("checked", false);
      }
      if (statusLED == 1) {
        // $(".fanStatus").text("Quạt đang bật");
        // $(".fanStatus").css({ color: "green" });
        // $("#btnQuatPK1").addClass("disabled").removeClass("active");
        // $("#btnQuatPK2").addClass("active").removeClass("disabled");
        $("#myonoffswitch2").attr("checked", "checked");
      } else {
        // $(".fanStatus").text("Quạt đang tắt");
        // $(".fanStatus").css({ color: "red" });
        // $("#btnQuatPK1").addClass("active").removeClass("disabled");
        // $("#btnQuatPK2").addClass("disabled").removeClass("active");
        $("#myonoffswitch2").prop("checked", false);
      }

      // Phong ngu
      if (statusPS == 1) {
        // $(".lightStatus2").text("Đèn đang bật");
        // $(".lightStatus2").css({ color: "green" });
        // $("#btnLedPN1").addClass("disabled").removeClass("active");
        // $("#btnLedPN2").addClass("active").removeClass("disabled");
        $("#myonoffswitch4").attr("checked", "checked");
      } else {
        // $(".lightStatus2").text("Đèn đang tắt");
        // $(".lightStatus2").css({ color: "red" });
        // $("#btnLedPN1").addClass("active").removeClass("disabled");
        // $("#btnLedPN2").addClass("disabled").removeClass("active");
        $("#myonoffswitch4").prop("checked", false);
      }
      if (statusND == 1) {
        // $(".fanStatus2").text("Quạt đang bật");
        // $(".fanStatus2").css({ color: "green" });
        // $("#btnQuatPN1").addClass("disabled").removeClass("active");
        // $("#btnQuatPN2").addClass("active").removeClass("disabled");
        $("#myonoffswitch6").attr("checked", "checked");
      } else {
        // $(".fanStatus2").text("Quạt đang tắt");
        // $(".fanStatus2").css({ color: "red" });
        // $("#btnQuatPN1").addClass("active").removeClass("disabled");
        // $("#btnQuatPN2").addClass("disabled").removeClass("active");
        $("#myonoffswitch6").prop("checked", false);
      }
      // //Phong bep
      // if (ledPB == 1) {
      //   $(".lightStatus3").text("Đèn đang bật");
      //   $(".lightStatus3").css({ color: "green" });
      //   $("#btnLedPB1").addClass("disabled").removeClass("active");
      //   $("#btnLedPB2").addClass("active").removeClass("disabled");
      // } else {
      //   $(".lightStatus3").text("Đèn đang tắt");
      //   $(".lightStatus3").css({ color: "red" });
      //   $("#btnLedPB1").addClass("active").removeClass("disabled");
      //   $("#btnLedPB2").addClass("disabled").removeClass("active");
      // }
      // // Phong Toilet
      // if (ledTL == 1) {
      //   $(".toiletStatus").text("Đèn phòng toilet đang bật");
      //   $(".toiletStatus").css({ color: "green" });
      // } else {
      //   $(".toiletStatus").text("Đèn phòng toilet đang tắt");
      //   $(".toiletStatus").css({ color: "red" });
      // }

      // // Hanh Lang
      // if (ledHL == 1) {
      //   $(".hanhLangStatus").text("Đèn phòng hành lang đang bật");
      //   $(".hanhLangStatus").css({ color: "green" });
      // } else {
      //   $(".hanhLangStatus").text("Đèn hành lang đang tắt");
      //   $(".hanhLangStatus").css({ color: "red" });
      // }

      // ALL
      //   if (
      //     (statusND == 1) &
      //     (sta == 1) &
      //     (ledPB == 1) &
      //     (fan1 == 1) &
      //     (fan2 == 1)
      //   ) {
      //     $(".lightStatusAll").text("Tất cả thiết bị đã bật");
      //     $(".lightStatusAll").css({ color: "green" });
      //     $("#btnALL1").addClass("disabled").removeClass("active");
      //     $("#btnALL2").addClass("active").removeClass("disabled");
      //   } else {
      //     $(".lightStatusAll").text("Tất cả thiết bị đã tắt");
      //     $(".lightStatusAll").css({ color: "red" });
      //     $("#btnALL1").addClass("active").removeClass("disabled");
      //     $("#btnALL2").addClass("disabled").removeClass("active");
      //   }
      // });

      updata_firebase();
    });

  function updata_firebase() {
    //////////// phong khách
    $('#myonoffswitch[name="auto"]:checked').click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusAuto: 1,
      });
    });
    $("#myonoffswitch:checkbox:not(:checked)").click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusAuto: 0,
      });
    });

    $('#myonoffswitch2[name="stLed"]:checked').click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusLED: 1,
      });
    });
    $("#myonoffswitch2:checkbox:not(:checked)").click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusLED: 0,
      });
    });

    $('#myonoffswitch4[name="stPS"]:checked').click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusPS: 1,
      });
    });
    $("#myonoffswitch4:checkbox:not(:checked)").click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusPS: 0,
      });
    });

    $('#myonoffswitch6[name="stND"]:checked').click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusND: 1,
      });
    });
    $("#myonoffswitch6:checkbox:not(:checked)").click(function () {
      var ref = db.collection("device-configs").doc("deviceled");
      ref.update({
        statusND: 0,
      });
    });
    // ////////// phong bep

    // $("#btnLedPB1").click(function () {
    //   var ref = db.collection("device-configs").doc("deviceled");

    //   ref.update({
    //     led3: 1,
    //   });
    // });

    // $("#btnLedPB2").click(function () {
    //   var ref = db.collection("device-configs").doc("deviceled");

    //   ref.update({
    //     led3: 0,
    //   });
    // });

    // // Tất cả
    // $("#btnALL1").click(function () {
    //   var ref = db.collection("device-configs").doc("deviceled");
    //   ref.update({
    //     led1: 1,
    //     led2: 1,
    //     led3: 1,
    //     fan1: 1,
    //     fan2: 1,
    //   });
    // });

    // $("#btnALL2").click(function () {
    //   var ref = db.collection("device-configs").doc("deviceled");
    //   ref.update({
    //     led1: 0,
    //     led2: 0,
    //     led3: 0,
    //     fan1: 0,
    //     fan2: 0,
    //   });
    // });
  }
});
