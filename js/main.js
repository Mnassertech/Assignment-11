var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var tableNames = JSON.parse(localStorage.getItem("tableNames")) || [];
var tableEmails = JSON.parse(localStorage.getItem("tableEmails")) || [];
var tablePassword = JSON.parse(localStorage.getItem("tablePassword")) || [];
var userName;

function signUp() {
    var namesVar = signUpName.value;
    var emailVar = signUpEmail.value;
    var passwordsVar = signUpPassword.value;
    if (namesVar && emailVar && passwordsVar) {
        if (emailRegex(emailVar)) {
            if(passwordsVar.length>6){
                if(sameMail(emailVar)){
                tableNames.push(namesVar);
                tableEmails.push(emailVar);
                tablePassword.push(passwordsVar);
                localStorage.setItem("tableNames", JSON.stringify(tableNames));
                localStorage.setItem("tableEmails", JSON.stringify(tableEmails));
                localStorage.setItem("tablePassword", JSON.stringify(tablePassword));
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You Have Successfully Signed Up!",
                    showConfirmButton: false,
                    timer:2500
                  });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Email Already Exists!",
                      });
                }
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Your password must be at least 6 characters long",
                  });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email format.",
              });
        }
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All fields are required.",
          });
    }
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
}

function emailFound(mail) {
    for (var i = 0; i < tableEmails.length; i++) {
        if (mail === tableEmails[i]) {
            userName = tableNames[i]; 
            localStorage.setItem("currentUserName", userName);
          
            return true;
        }
    }
    return false; 
}
function login() {
    var signInEmailVar = document.getElementById("signinEmail").value; 
    var signInPassVar = document.getElementById("signinPassword").value; 
    if (emailFound(signInEmailVar) && passwordFound(signInPassVar)) {
        location.href = "Welcome.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You Have Entered A Wrong Email Or Password",
        });
    }
}

function passwordFound(pass){
    for(var i=0;i<tablePassword.length;i++){
        if(pass==tablePassword[i]){
            var flag=1;
        }
        else{
            flag=0;
        }
    }
    if(flag==1){
        return true;
     }
    else{
        return false;
     }
}


function emailRegex(compare) {
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(compare);
}

function sameMail(newEmail){
    for(var i=0;i<tableEmails.length;i++){
        if(newEmail==tableEmails[i]){
            var flag=1;
        }
        else{
            flag=0;
        }
    }
    if(flag==1){
        return false;
     }
    else{
        return true;
     }
}
document.getElementById("welcomeHome").innerHTML = "Welcome " + localStorage.getItem("currentUserName");
function logOut(){
    location.href = "index.html"
    localStorage.removeItem('currentUserName');
}

