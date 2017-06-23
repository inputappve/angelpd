app.app_login = function(ctl,passwordcurrent){
  //FB LOGIN
  ctl.facebookLogin = function(){
    const prov = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(prov).then(function(result) {
          console.log(result.user)
          alert("sto verificando se sei verificato con fb");
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
        alert(error);
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

    //SETTINGS IDENTIFICATO FB/ GOOGLE O EMAIL
  ctl.set1 = function(){  
        console.log("settings2");
        console.log(firebase.auth().currentUser);
        if(firebase.auth().currentUser.displayName != null){
        document.getElementById("p1").innerHTML = firebase.auth().currentUser.displayName;
        }else{
         document.getElementById("p1").innerHTML = "la tua Email è:";    
         
        }
        
    }
    //SETTINGS PER LA EMAIL
  ctl.set2 = function(){
        console.log(firebase.auth().currentUser.email);
        document.getElementById("p2").innerHTML = firebase.auth().currentUser.email;

        if(firebase.auth().currentUser.displayName == null){
      document.getElementById("change").style.visibility  = "visible";
     }else{
      document.getElementById("change").style.visibility  = "hidden";
     }
  }
  //CHANGE PASSW SETTINGS TI PORTA LA
  ctl.changepassword = function(){
    window.location.href = ctl.htmlpage + 'changepassword';
  }
  //HIDE O VISIBILE BUTTON CHANGE PASSW
  ctl.set3 = function(){
     console.log(firebase.auth().currentUser.displayName);

        if(firebase.auth().currentUser.displayName == null){
          console.log("more visibiile");
      document.getElementById("change").style.visibility  = "visible";
     }else{
      document.getElementById("change").style.visibility  = "hidden";
     }
  }

  //ALGORITMO CAMBIO PASSWORD
  ctl.change = function(){
     var oldPassword =  document.getElementById("oldP").value;
     var newPassword1 =  document.getElementById("newP").value;
     var newPassword2 =  document.getElementById("confP").value;
     console.log(oldPassword," ",newPassword1," ",newPassword2, " ",passwordcurrent);
     if(newPassword1 === newPassword2 && oldPassword === passwordcurrent){
    firebase.auth().currentUser.updatePassword(newPassword1)
     .then(function(){
       alert("password cambiata con sucesso");
          console.log('Password change successfully ', newPassword1 , ' quella vecchia ', oldPassword);
            },function(error){
               console.log(error.code);
                 console.log(error.message);
    })
     }
  }
  // AVATAR SETTING IMG
    ctl.avatar = function(){
      if(firebase.auth().currentUser.photoURL != null){
      var photo =  firebase.auth().currentUser.photoURL;
      console.log(photo);
      document.getElementById("ava").style.visibility = 'visible';
      document.getElementById("ava").src = photo;
      }else{
      document.getElementById("ava").style.visibility = 'hidden';
      document.getElementById("p1").style.textAling = 'center';
      document.getElementById("p2").style.textAling = 'center';
      }

    }

    ctl.google = function(){
      console.log(firebase.auth().currentUser.providerData["0"].providerId);
      if(firebase.auth().currentUser.providerData["0"].providerId === "facebook.com"){
        window.location.href ="https://www.facebook.com/login/";
      }else{
            if(firebase.auth().currentUser.providerData["0"].providerId === "google.com"){ 
              window.location.href ="https://accounts.google.com/signin/v2";
            }
          }

      }
};