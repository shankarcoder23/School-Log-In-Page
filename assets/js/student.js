




const pages = document.querySelectorAll(".page");
const studentMenuToggle = document.getElementById("studentMenuToggle");
const studentMenuClose = document.getElementById("studentMenuClose");
const studentMobileSidebar = document.getElementById("studentMobileSidebar");
const studentSidebarOverlay = document.getElementById("studentSidebarOverlay");

function openStudentMenu(){

    studentMobileSidebar?.classList.add("active");
    studentSidebarOverlay?.classList.add("active");

}

function closeStudentMenu(){

    studentMobileSidebar?.classList.remove("active");
    studentSidebarOverlay?.classList.remove("active");

}

function showPage(pageId){

    if(pageId === "logout"){
        window.location.href = "login.html";
        return;
    }

    const targetPage = document.getElementById(pageId);
    if(!targetPage) return;

    pages.forEach(page=>{
        page.classList.remove("active");
    });

    targetPage.classList.add("active");

    document.querySelectorAll(".nav-link").forEach(link=>{
        link.classList.toggle("active", link.dataset.page===pageId);
    });

    document.querySelectorAll(".mobile-link").forEach(link=>{
        link.classList.toggle("active", link.dataset.page===pageId);
    });

}

// Desktop Sidebar
document.querySelectorAll(".nav-link").forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        showPage(this.dataset.page);
        closeStudentMenu();

    });

});

// Mobile Bottom Navigation
document.querySelectorAll(".mobile-link").forEach(link=>{

    link.addEventListener("click",function(e){

        e.preventDefault();

        showPage(this.dataset.page);
        closeStudentMenu();

    });

});

studentMenuToggle?.addEventListener("click", openStudentMenu);
studentMenuClose?.addEventListener("click", closeStudentMenu);
studentSidebarOverlay?.addEventListener("click", closeStudentMenu);


/* Student Profile Update */
const profileUpload = document.getElementById("profileUpload");
const profilePreview = document.getElementById("profilePreview");

profileUpload?.addEventListener("change", function () {

    const file = this.files[0];

    if(file){

        const reader = new FileReader();

        reader.onload = function(e){

            if(profilePreview){
                profilePreview.src = e.target.result;
            }

        }

        reader.readAsDataURL(file);

    }

});


/* Change Password */

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // Show / Hide Password
    // ===============================
    const toggleButtons = document.querySelectorAll(".input-group button");

    toggleButtons.forEach(button => {

        button.addEventListener("click", function () {

            const input = this.parentElement.querySelector("input");
            const icon = this.querySelector("i");

            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("bi-eye");
                icon.classList.add("bi-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("bi-eye-slash");
                icon.classList.add("bi-eye");
            }

        });

    });

    // ===============================
    // Password Strength
    // ===============================
const newPassword = document.getElementById("newPassword");
    const progressBar = document.querySelector("#password .progress-bar");
    const strengthText = document.querySelector("#password .text-success");

    newPassword?.addEventListener("input", function () {

        const password = this.value;

        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if(!progressBar || !strengthText) return;

        progressBar.className = "progress-bar";

        switch (strength) {

            case 0:
            case 1:
                progressBar.style.width = "25%";
                progressBar.classList.add("bg-danger");
                strengthText.innerHTML = "Weak Password";
                strengthText.className = "text-danger";
                break;

            case 2:
                progressBar.style.width = "50%";
                progressBar.classList.add("bg-warning");
                strengthText.innerHTML = "Medium Password";
                strengthText.className = "text-warning";
                break;

            case 3:
                progressBar.style.width = "75%";
                progressBar.classList.add("bg-info");
                strengthText.innerHTML = "Good Password";
                strengthText.className = "text-info";
                break;

            case 4:
                progressBar.style.width = "100%";
                progressBar.classList.add("bg-success");
                strengthText.innerHTML = "Strong Password";
                strengthText.className = "text-success";
                break;

            default:
                progressBar.style.width = "0%";
                strengthText.innerHTML = "";
        }

    });

    // ===============================
    // Confirm Password Validation
    // ===============================
    const confirmPassword = document.getElementById("confirmPassword");

    confirmPassword?.addEventListener("input", function () {

        if (this.value === "") {
            this.classList.remove("is-valid", "is-invalid");
            return;
        }

        if (newPassword && this.value === newPassword.value) {
            this.classList.remove("is-invalid");
            this.classList.add("is-valid");
        } else {
            this.classList.remove("is-valid");
            this.classList.add("is-invalid");
        }

    });

});
