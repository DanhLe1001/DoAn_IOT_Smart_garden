function chuanhoa(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function xacthuc() {
  firebase.auth().onAuthStateChanged(function (user) {
    //console.log(user);
    if (user) {
      var username = user.email;
      var hoten = chuanhoa(username.replace("@gmail.com", ""));

      console.log(username);
      $("#fullname").text(username);
      $(".hoten").text(hoten);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Vui lòng đăng nhập để tiếp tục",
      }).then((value) => {
        setTimeout(function () {
          window.location.replace("index2.html");
        }, 500);
      });
    }
  });
}

function signUp() {
  var userFullName = document.getElementById("userFullName").value;
  var userEmail = document.getElementById("userEmail").value;
  var userPassword = document.getElementById("userPassword").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPassword)
    .then((success) => {
      var user = firebase.auth().currentUser;
      var uid;
      if (user != null) {
        uid = user.uid;
      }
      var firebaseRef = firebase.database().ref();
      var userData = {
        userFullName: userFullName,
        userEmail: userEmail,
        userPassword: userPassword,
      };
      firebaseRef.child(uid).set(userData);
      swal("Đã tạo tài khoản thành công vui long đăng nhập để tiếp tục").then(
        (value) => {
          setTimeout(function () {
            window.location.replace("main.html");
          }, 1000);
        }
      );
    })
    .catch((error) => {
      // Handle Errors here.
      swal({
        type: "error",
        title: "Error",
        text: "Chưa nhập đủ thông tin vui lòng kiểm tra lại",
      });
    });
}

function signIn() {
  var userSIEmail = document.getElementById("userSIEmail").value;
  var userSIPassword = document.getElementById("userSIPassword").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(userSIEmail, userSIPassword)
    .then((success) => {
      //localStorage.setItem("userSIEmail",userSIEmail);
      window.location.replace("main.html");
      swal({
        type: "successfull",
        title: "Succesfully signed in",
      });
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        type: "error",
        title: "Error",
        text: "Thông tin đăng nhập không đúng vui lòng kiểm tra lại",
      });
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location.replace("index.html");
    });
}
