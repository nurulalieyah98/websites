  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAJEIDNaEXNuj17cAOg6pK78Fk_gARp5Wc",
    authDomain: "jasin-smart.firebaseapp.com",
    databaseURL: "https://jasin-smart.firebaseio.com",
    projectId: "jasin-smart",
    storageBucket: "jasin-smart.appspot.com",
    messagingSenderId: "356895521158",
    appId: "1:356895521158:web:23155ad05d934dcf999407"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //Supported types of Auth state persistence
  //firebase.auth.Auth.Persistence.LOCAL;
  firebase.auth.Auth.Persistence.SESSION;

  //login
  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if(email!= " " && password != " ")
      {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);
        result.catch(function(error)
        {
            var errorCode = error.code;
            var errorMessage  =error.message;

            console.log(errorCode);
            console.log(errorMessage);
             
            window.alert("Message: " + errorMessage);
        });
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields");
      }
  });

  //logout
  $("#btn-logout").click(function()
  {
       firebase.auth().signOut();
  });

  //forget password
    $("#btn-resetPassword").click(function()
    {
        var auth = firebase.auth();
        var email = $("#email").val();

        if(email != "")
        {
          auth.sendPasswordResetEmail(email).then(function()
          {
            window.alert("Email has been sent to you. Please check and verify");
          })
          .catch(function(error)
          {
            var errorCode = error.code;
            var errorMessage  =error.message;

            console.log(errorCode);
            console.log(errorMessage);
             
            window.alert("Message: " + errorMessage);
          });
        }
        else
        {
          window.alert("Please write your email first");
        }
    });

  //register
  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmPassword").val();
      if(email!= " " && password != " " && cPassword != " ")
      {
        if(password == cPassword)
        {
          var result = firebase.auth().createUserWithEmailAndPassword(email, password);
          result.catch(function(error)
          {
            var errorCode = error.code;
            var errorMessage  =error.message;

            console.log(errorCode);
            console.log(errorMessage);
             
            window.alert("Message: " + errorMessage);
          });
        }
        else
        {
          window.alert("Password do not match with the Confirm Password.");
        }
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields");
      }
  });

  //update
  $("#btn-update").click(function()
  {
    var phone = $("#phone").val();
    var firstName = $("#firstName").val();
    var secondName = $("#secondName").val();
    var admin_id = $("#admin_id").val();

    var rootRef = firebase.database().ref().child("admin");
    var adminID = firebase.auth().currentUser.uid;
    var adminsRef = rootRef.child(adminID);

    if(firstName!="" && secondName!="" && phone!="" && admin_id!="")
    {
      var adminData = 
      {
        "phone":phone,
        "first_name": firstName,
        "second_name": secondName,
        "admin_id": admin_id,
      };

      adminsRef.set(adminData, function(error)
      {
          if(error)
          {
            var errorCode = error.code;
            var errorMessage  = error.message;

            console.log(errorCode);
            console.log(errorMessage);
             
            window.alert("Message: " + errorMessage);
          }
          else
          {
            window.location.href=" MainPage2.html";
          }
      });
    }
    else
    {
      window.alert("Form is incomplete. Please fill out all fields");
    }
  }
  
);

// var db = firebase.firestore();

// const list_div = document.querySelector("#list_div")
// db.collection("users").get().then(function(querySnapshot)
// {
//   var user = document.getElementById("list_div").innerHTML;
//   querySnapshot.forEach(function(doc)
//   {
//     //console.log(doc.id, " => ", doc.data());
//     user += "<div class='list-item'><h3>"+ doc.data().name +"</h3><p>Email: " + doc.data().email + "</p></div>"
//   });
// });