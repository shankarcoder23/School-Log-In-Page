




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

    const passwordForm = document.getElementById("studentPasswordForm");
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordMessage = document.getElementById("studentPasswordMessage");
    const strengthBar = document.getElementById("passwordStrengthBar");
    const strengthText = document.getElementById("passwordStrengthText");
    const passwordRules = {
        length: document.getElementById("passwordRuleLength"),
        upper: document.getElementById("passwordRuleUpper"),
        lower: document.getElementById("passwordRuleLower"),
        number: document.getElementById("passwordRuleNumber"),
        special: document.getElementById("passwordRuleSpecial")
    };
    const passwordChecks = [
        { key: "length", test: value => value.length >= 8 },
        { key: "upper", test: value => /[A-Z]/.test(value) },
        { key: "lower", test: value => /[a-z]/.test(value) },
        { key: "number", test: value => /\d/.test(value) },
        { key: "special", test: value => /[^A-Za-z0-9]/.test(value) }
    ];

    function setPasswordError(input, errorId, message) {
        const error = document.getElementById(errorId);
        if(!input || !error) return;

        input.classList.toggle("is-invalid", Boolean(message));
        input.classList.toggle("is-valid", !message && input.value.trim().length > 0);
        error.textContent = message;
        error.classList.toggle("d-block", Boolean(message));
    }

    function getPasswordScore(value) {
        return passwordChecks.filter(rule => rule.test(value)).length;
    }

    function updatePasswordRules(value) {
        passwordChecks.forEach(rule => {
            const ruleItem = passwordRules[rule.key];
            if(!ruleItem) return;

            const isValid = rule.test(value);
            const icon = ruleItem.querySelector("i");

            ruleItem.classList.toggle("valid", isValid);

            if(icon){
                icon.classList.toggle("bi-check-circle-fill", isValid);
                icon.classList.toggle("bi-circle", !isValid);
            }
        });
    }

    function updatePasswordStrength(value) {
        if(!strengthBar || !strengthText) return;

        const strengthMap = [
            { width: "0%", className: "", text: "Password strength" },
            { width: "20%", className: "bg-danger", text: "Very weak" },
            { width: "40%", className: "bg-warning", text: "Weak" },
            { width: "60%", className: "bg-info", text: "Good" },
            { width: "80%", className: "bg-primary", text: "Strong" },
            { width: "100%", className: "bg-success", text: "Very strong" }
        ];
        const score = getPasswordScore(value);
        const strength = strengthMap[score];

        strengthBar.className = `progress-bar ${strength.className}`.trim();
        strengthBar.style.width = strength.width;
        strengthText.textContent = strength.text;
        strengthText.className = score >= 5 ? "text-success" : "text-muted";
    }

    function validateStudentPasswordForm(showCurrentError = true, showEmptyErrors = true) {
        const currentValue = currentPassword?.value.trim() || "";
        const newValue = newPassword?.value.trim() || "";
        const confirmValue = confirmPassword?.value.trim() || "";
        const isStrong = getPasswordScore(newValue) === passwordChecks.length;

        if(showCurrentError){
            setPasswordError(
                currentPassword,
                "currentPasswordError",
                currentValue ? "" : "Current password is required."
            );
        }

        let newPasswordError = "";

        if(!newValue && showEmptyErrors){
            newPasswordError = "New password is required.";
        } else if(newValue && !isStrong){
            newPasswordError = "Password must match all requirements.";
        } else if(currentValue && newValue === currentValue){
            newPasswordError = "New password must be different from current password.";
        }

        let confirmPasswordError = "";

        if(!confirmValue && showEmptyErrors){
            confirmPasswordError = "Please confirm your new password.";
        } else if(confirmValue && confirmValue !== newValue){
            confirmPasswordError = "Confirm password does not match new password.";
        }

        setPasswordError(newPassword, "newPasswordError", newPasswordError);
        setPasswordError(confirmPassword, "confirmPasswordError", confirmPasswordError);

        return Boolean(currentValue) && !newPasswordError && !confirmPasswordError;
    }

    document.querySelectorAll(".password-toggle").forEach(button => {
        button.addEventListener("click", function () {
            const input = document.getElementById(this.dataset.target);
            const icon = this.querySelector("i");
            if(!input || !icon) return;

            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";
            icon.classList.toggle("bi-eye-slash", isHidden);
            icon.classList.toggle("bi-eye", !isHidden);
        });
    });

    newPassword?.addEventListener("input", function () {
        updatePasswordRules(this.value);
        updatePasswordStrength(this.value);
        validateStudentPasswordForm(false, false);
    });

    currentPassword?.addEventListener("input", function () {
        validateStudentPasswordForm(false, false);
    });

    confirmPassword?.addEventListener("input", function () {
        validateStudentPasswordForm(false, false);
    });

    passwordForm?.addEventListener("submit", function (e) {
        e.preventDefault();

        if(passwordMessage){
            passwordMessage.className = "alert d-none mb-0";
            passwordMessage.textContent = "";
        }

        if(!validateStudentPasswordForm(true, true)){
            if(passwordMessage){
                passwordMessage.className = "alert alert-danger mb-0";
                passwordMessage.textContent = "Please fix the highlighted password fields.";
            }
            return;
        }

        if(passwordMessage){
            passwordMessage.className = "alert alert-success mb-0";
            passwordMessage.textContent = "Password updated successfully.";
        }

        [currentPassword, newPassword, confirmPassword].forEach(input => {
            if(input) input.value = "";
        });
        updatePasswordRules("");
        updatePasswordStrength("");
        [currentPassword, newPassword, confirmPassword].forEach(input => {
            input?.classList.remove("is-valid", "is-invalid");
        });
    });

    passwordForm?.addEventListener("reset", function () {
        setTimeout(() => {
            updatePasswordRules("");
            updatePasswordStrength("");
            [currentPassword, newPassword, confirmPassword].forEach(input => {
                input?.classList.remove("is-valid", "is-invalid");
            });
            document.querySelectorAll("#password .invalid-feedback").forEach(error => {
                error.textContent = "";
                error.classList.remove("d-block");
            });
            if(passwordMessage){
                passwordMessage.className = "alert d-none mb-0";
                passwordMessage.textContent = "";
            }
        }, 0);
    });

    updatePasswordRules("");
    updatePasswordStrength("");

});
