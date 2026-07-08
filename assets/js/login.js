const studentTab = document.getElementById("studentTab");
const teacherTab = document.getElementById("teacherTab");
const switchBg = document.querySelector(".switch-bg");

studentTab.onclick = () => {

    studentTab.classList.add("active");
    teacherTab.classList.remove("active");

    switchBg.style.transform = "translateX(0)";
};

teacherTab.onclick = () => {

    teacherTab.classList.add("active");
    studentTab.classList.remove("active");

    switchBg.style.transform = "translateX(100%)";
};

// Password Toggle

const toggle = document.querySelector(".toggle-password");
const password = document.getElementById("password");

toggle.onclick = () => {

    if(password.type==="password"){

        password.type="text";

        toggle.innerHTML='<i class="bi bi-eye-slash-fill"></i>';

    }else{

        password.type="password";

        toggle.innerHTML='<i class="bi bi-eye-fill"></i>';

    }

};

// Login Redirect

document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    if(studentTab.classList.contains("active")){

        window.location.href="student.html";

    }else{

        window.location.href="teacher.html";

    }

});