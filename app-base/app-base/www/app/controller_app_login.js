app.app_login = function(ctl,auth,usercurrent){
  ctl.facebookLogin = function(){
    const prov = new firebase.auth.FacebookAuthProvider();
      auth.signInWithPopup(prov).then(function(result) {
          console.log(result.user)
          window.location.href = ctl.htmlpage + '/page_list';
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
        window.location.href = ctl.htmlpage + '/page_list';
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
          window.location.href = ctl.htmlpage + '/page_list';
        }else{
          window.location.href = ctl.htmlpage + '/controllo.html;'
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
    window.location.href = ctl.htmlpage + '/welcome';
  }
  ctl.terms = function(){
    window.location.href = ctl.htmlpage + '/terms.html';
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
    if(string == 'settings'){
      console.log("settings1");
      window.location.href = ctl.htmlpage +string; 

    }else{
      window.location.href = ctl.htmlpage +string;     
    }
    }   
  ctl.set1 = function(){  
        console.log("settings2");
        console.log(usercurrent);
        if(usercurrent.displayName != null){
        document.getElementById("p1").innerHTML = usercurrent.displayName;
        document.getElementById("change").style.visibility  = "hidden"
        }else{
         document.getElementById("p1").innerHTML = "la tua Email è:";    
         document.getElementById("change").style.visibility  = "visible";
        }
        
    }
  ctl.set2 = function(){
        console.log(usercurrent.email);
        document.getElementById("p2").innerHTML = usercurrent.email;
  }

  ctl.change = function(){

    auth.changePassword(usercurrent.email, oldPassword, newPassword)
    .then(function(){
    console.log('Password change successfully');
    },function(error){
      console.log(error.code);
      console.log(error.message);
    });
  }
};

