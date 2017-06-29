app.app_login = function(ctl,passwordcurrent,$scope,$firebaseObject){
  ctl.user = {};
  ctl.user_info = {};
  
  app.check_login = function(){
    ctl.user = firebase.auth().currentUser;
    if (ctl.user) {
      var ref = firebase.database().ref("users/" + ctl.user.uid);
      $firebaseObject(ref).$bindTo($scope, "ctl.user_info");
      // ctl.user_info = $firebaseObject(ref);
    }
    console.log("User", ctl.user);
    ctl.apply();
  };
  setTimeout(app.check_login, 250);
  setTimeout(app.check_login, 650);
  
  //FB LOGIN
  ctl.facebookLogin = function(){
    const prov = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(prov).then(function(result) {
          console.log(result.user)
          alert("sto verificando se sei verificato con fb");
          ctl.user = firebase.auth().currentUser;
          firebase.database().ref("users/" + ctl.user.uid + '/nick').set("ID FACEBOOK NUOVO");
          firebase.database().ref("users/" + ctl.user.uid + '/status').set("Brand new");
          window.location.href = ctl.htmlpage + 'map';
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
     };

//GOOGLE LOGIN
  ctl.googleLogin = function(){
    var providerG = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerG).then(function(result) {
        console.log(result.user);
        console.log(result.user.photoURL);
         alert("sto verificando se sei verificato con google");
        window.location.href = ctl.htmlpage + 'map';
     }).catch(function(error) {
        console.log(error.code)
        console.log(error.message)
     });
  };

//LOGIN PASSW/EMAIL
  ctl.Login = function(){
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;
    const promise = firebase.auth().signInWithEmailAndPassword(txtEmail,txtPassword);

    promise.then(function(result){
          console.log(txtEmail,txtPassword)
          alert("sto verificando se sei verificato");
          console.log("ci sei ma forse non sei autentificato");
          if(firebase.auth().currentUser.emailVerified){
            console.log("entri pure");
            passwordcurrent = txtPassword;
          window.location.href = ctl.htmlpage + 'map';
        }else{
          window.location.href = ctl.htmlpage + 'controllo;'
          firebase.auth().currentUser.sendEmailVerification().then(function(result){
             alert("mail mandata prima verificati poi torna");
                console.log("mail mandata");
                console.log(result)
             }).catch(function(error) {
                console.log(error.code)
                console.log(error.message)
             });
        }
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
  };

  // VERIFICATO LETTURA TERMINI E CONDIZIONI
  ctl.return = function(){
    console.log('verificato?');
    window.location.href = ctl.htmlpage + 'welcome';
  }

  //APERTURA PAGINE TERMINI
  ctl.terms = function(){
    window.location.href = ctl.htmlpage + 'terms';
  }

  //SING IN PASS/EMAIL
  ctl.SingIn = function(){
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;
    const promise = firebase.auth().createUserWithEmailAndPassword(txtEmail,txtPassword);
    promise.then(function(result){
          console.log(result.user)
          console.log("riscrivi tutto e logga");
           alert("ora logga sei registrato");
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
  };

  //PASSW DIMENTICATA LOGIN OAGE
  ctl.passwordForgot = function(){
    var emailAddress = document.getElementById('txtEmail').value;
    firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
       alert("Email mandata guardala e cambia password");
     console.log("Mail mandata a" , firebase.auth().currentUser.email);
    }, function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    }

    //SPOSTAMENTO PAGINE DA MAP
    ctl.bLink = function(string){   
      window.location.href = ctl.htmlpage + string;     
    }   

  
  //CHANGE PASSW SETTINGS TI PORTA LA
  ctl.changepassword = function(){
    window.location.href = ctl.htmlpage + 'changepassword';
  }

  //ALGORITMO CAMBIO PASSWORD
  ctl.change = function(){
     var oldPassword =  document.getElementById("oldP").value;
     var newPassword1 =  document.getElementById("newP").value;
     var newPassword2 =  document.getElementById("confP").value;
     console.log(oldPassword," ",newPassword1," ",newPassword2, " ",passwordcurrent);
     if(newPassword1 === newPassword2 && oldPassword === passwordcurrent){
    ctl.user.updatePassword(newPassword1)
     .then(function(){
       alert("password cambiata con sucesso");
          console.log('Password change successfully ', newPassword1 , ' quella vecchia ', oldPassword);
            },function(error){
               console.log(error.code);
                 console.log(error.message);
    })
     }
  }

    ctl.redirect = function(){
      console.log(ctl.user.providerData["0"].providerId);
      if(ctl.user.providerData["0"].providerId === "facebook.com"){
        window.location.href ="https://www.facebook.com/login/";
      }else{
            if(ctl.user.providerData["0"].providerId === "google.com"){ 
              window.location.href ="https://accounts.google.com/signin/v2";
            }
          }

      }
};