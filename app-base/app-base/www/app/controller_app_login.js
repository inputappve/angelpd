app.app_login = function(ctl,auth,usercurrent){
  ctl.facebookLogin = function(){
    const prov = new firebase.auth.FacebookAuthProvider();
      auth.signInWithPopup(prov).then(function(result) {
          console.log(result.user)
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
        console.log(result.user)
        usercurrent = firebase.auth().currentUser;
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
          console.log("ci sei ma forse non sei autentificato");
          const user = firebase.auth().currentUser;
          if(user.emailVerified){
            console.log("entri pure");
            usercurrent = firebase.auth().currentUser;
          window.location.href = ctl.htmlpage + 'map';
        }else{
          window.location.href = ctl.htmlpage + 'controllo;'
          user.sendEmailVerification().then(function(result){
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
       }).catch(function(error) {
          console.log(error.code)
          console.log(error.message)
       });
  };

  ctl.passwordForgot = function(){
    var emailAddress = document.getElementById('txtEmail').value;
    auth.sendPasswordResetEmail(emailAddress).then(function() {
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

  ctl.change = function(){
     var oldPassword =  document.getElementById("oldP").value;
     var newPassword =  document.getElementById("newP").value;

    auth.changePassword(usercurrent.email, oldPassword, newPassword)
    .then(function(){
    console.log('Password change successfully');
    },function(error){
      console.log(error.code);
      console.log(error.message);
    })
  }
  ctl.showPorco = function(){
      $(usercurrent.photoUrl).show();
    };
};