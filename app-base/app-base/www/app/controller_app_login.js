app.app_login = function(ctl,auth,usercurrent,passwordcurrent){
  ctl.facebookLogin = function(){
    const prov = new firebase.auth.FacebookAuthProvider();
      auth.signInWithPopup(prov).then(function(result) {
          console.log(result.user)
          alert("sto verificando se sei verificato con fb");
          window.location.href = ctl.htmlpage + 'map';
          usercurrent = firebase.auth().currentUser;
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
     };

  ctl.googleLogin = function(){
    var providerG = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(providerG).then(function(result) {
        console.log(result.user);
        console.log(result.user.photoURL);
        usercurrent = result.user;
         alert("sto verificando se sei verificato con google");
        window.location.href = ctl.htmlpage + 'map';
     }).catch(function(error) {
        console.log(error.code)
        console.log(error.message)
     });
  };

  ctl.Login = function(){
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;
    const promise = auth.signInWithEmailAndPassword(txtEmail,txtPassword);

    promise.then(function(result){
          console.log(txtEmail,txtPassword)
          alert("sto verificando se sei verificato");
          console.log("ci sei ma forse non sei autentificato");
          const user = firebase.auth().currentUser;
          if(user.emailVerified){
            console.log("entri pure");
            passwordcurrent = txtPassword;
            usercurrent = firebase.auth().currentUser;
          window.location.href = ctl.htmlpage + 'map';
        }else{
          window.location.href = ctl.htmlpage + 'controllo;'
          user.sendEmailVerification().then(function(result){
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
  ctl.return = function(){
    console.log('verificato?');
    window.location.href = ctl.htmlpage + 'welcome';
  }
  ctl.terms = function(){
    window.location.href = ctl.htmlpage + 'terms';
  }
  ctl.SingIn = function(){
    const txtEmail = document.getElementById('txtEmail').value;
    const txtPassword = document.getElementById('txtPassword').value;
    const promise = auth.createUserWithEmailAndPassword(txtEmail,txtPassword);
    promise.then(function(result){
          console.log(result.user)
          console.log("riscrivi tutto e logga");
           alert("ora logga sei registrato");
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
  };

  ctl.passwordForgot = function(){
    var emailAddress = document.getElementById('txtEmail').value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
       alert("Email mandata guardala e cambia password");
     console.log("Mail mandata a" , emailAddress);
    }, function(error) {
      console.log(error.code);
      console.log(error.message);
    });
    }

    ctl.bLink = function(string){   
      window.location.href = ctl.htmlpage + string;     
    }   

  ctl.set1 = function(){  
        console.log("settings2");
        console.log(usercurrent);
        if(usercurrent.displayName != null){
        document.getElementById("p1").innerHTML = usercurrent.displayName;
        }else{
         document.getElementById("p1").innerHTML = "la tua Email è:";    
         
        }
        
    }
  ctl.set2 = function(){
        console.log(usercurrent.email);
        document.getElementById("p2").innerHTML = usercurrent.email;

        if(usercurrent.displayName == null){
      document.getElementById("change").style.visibility  = "visible";
     }else{
      document.getElementById("change").style.visibility  = "hidden";
     }
  }
  
  ctl.changepassword = function(){
    window.location.href = ctl.htmlpage + 'changepassword';
  }
  ctl.set3 = function(){
     console.log(usercurrent.displayName);

        if(usercurrent.displayName == null){
          console.log("more visibiile");
      document.getElementById("change").style.visibility  = "visible";
     }else{
      document.getElementById("change").style.visibility  = "hidden";
     }
  }
  
  ctl.changepassword = function(){
    window.location.href = ctl.htmlpage + 'changepassword';
  }

  ctl.change = function(){
     var oldPassword =  document.getElementById("oldP").value;
     var newPassword1 =  document.getElementById("newP").value;
     var newPassword2 =  document.getElementById("confP").value;
     console.log(oldPassword," ",newPassword1," ",newPassword2, " ",passwordcurrent);
     if(newPassword1 === newPassword2 && oldPassword === passwordcurrent){
     auth.currentUser.updatePassword(newPassword1)
     .then(function(){
       alert("password cambiata con sucesso");
          console.log('Password change successfully ', newPassword1 , ' quella vecchia ', oldPassword);
            },function(error){
               console.log(error.code);
                 console.log(error.message);
    })
     }
  }
    ctl.avatar = function(){
      if(usercurrent.photoURL != null){
      var photo =  usercurrent.photoURL;
      console.log(photo);
      document.getElementById("ava").style.visibility = 'visible';
      document.getElementById("ava").src = photo;
      }else{
      document.getElementById("ava").style.visibility = 'hidden';
      document.getElementById("p1").style.textAling = 'center';
      document.getElementById("p2").style.textAling = 'center';
      }

    }

    ctl.SC = function(color){
      document.getElementById('tool').style.backgroundColor = color;
    }
};