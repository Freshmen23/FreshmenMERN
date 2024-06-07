
var popup=document.querySelector(".popup");
function closeForm(){
    popup.classList.add("hidden");
};
function openForm(){
    popup.classList.remove("hidden");
};

var loginbtn=document.querySelector("#login");
var signupbtn=document.querySelector("#signup");

var loginpg=document.querySelector(".login");
var signuppg=document.querySelector(".signup");

function signup(){
    signupbtn.classList.add("active");
    loginbtn.classList.remove("active");
    loginpg.classList.add("hidden");
    signuppg.classList.remove("hidden");
}

function login(){
    signupbtn.classList.remove("active");
    loginbtn.classList.add("active");
    loginpg.classList.remove("hidden");
    signuppg.classList.add("hidden");
}

var timeout=setTimeout(openForm,8000);