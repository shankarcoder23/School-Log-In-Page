const pages = document.querySelectorAll('.teacher-page');
const navLinks = document.querySelectorAll('.teacher-nav-link, .teacher-sub-link, .teacher-mobile-link');
const classSelect = document.getElementById('classSelect');
const chatClassTitle = document.getElementById('chatClassTitle');
const chatClassStatus = document.getElementById('chatClassStatus');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatList = document.getElementById('chatList');
const mediaUpload = document.getElementById('mediaUpload');
const mediaPreview = document.getElementById('mediaPreview');
const mediaFileName = document.getElementById('mediaFileName');
const mediaFileSize = document.getElementById('mediaFileSize');
const removeMedia = document.getElementById('removeMedia');
const passwordForm = document.getElementById('passwordForm');
const currentPassword = document.getElementById('currentPassword');
const newPassword = document.getElementById('newPassword');
const confirmPassword = document.getElementById('confirmPassword');
const passwordMessage = document.getElementById('passwordMessage');
const passwordToggles = document.querySelectorAll('.password-toggle');
const teacherMenuToggle = document.getElementById('teacherMenuToggle');
const teacherMenuClose = document.getElementById('teacherMenuClose');
const teacherMobileSidebar = document.getElementById('teacherMobileSidebar');
const teacherSidebarOverlay = document.getElementById('teacherSidebarOverlay');

const classChats = {
  'class-10-a': {
    title: 'Class 10 A',
    status: '28 students online',
    messages: [
      {
        type: 'received',
        text: 'Sir, can you share the geometry practice sheet?',
        meta: 'Aman - 08:45 AM',
      },
      {
        type: 'sent',
        text: 'Yes, I will upload it here before lunch.',
        meta: 'You - 08:48 AM',
      },
    ],
  },
  'class-11-a': {
    title: 'Class 11 A',
    status: '32 students online',
    messages: [
      {
        type: 'received',
        text: "Ma'am, should we solve all examples from exercise 5.2?",
        meta: 'Riya - 09:30 AM',
      },
      {
        type: 'sent',
        text: 'Complete questions 1 to 8 today. We will discuss the rest tomorrow.',
        meta: 'You - 09:32 AM',
      },
    ],
  },
  'class-12-b': {
    title: 'Class 12 B',
    status: '24 students online',
    messages: [
      {
        type: 'received',
        text: 'Please confirm the calculus test syllabus.',
        meta: 'Neha - 10:10 AM',
      },
      {
        type: 'sent',
        text: 'Limits, continuity, and differentiation are included.',
        meta: 'You - 10:12 AM',
      },
    ],
  },
};

let selectedMedia = null;

function closeTeacherMenu() {
  if (teacherMobileSidebar) teacherMobileSidebar.classList.remove('active');
  if (teacherSidebarOverlay) teacherSidebarOverlay.classList.remove('active');
}

function openTeacherMenu() {
  if (teacherMobileSidebar) teacherMobileSidebar.classList.add('active');
  if (teacherSidebarOverlay) teacherSidebarOverlay.classList.add('active');
}

function showPage(pageId) {
  pages.forEach((page) => {
    page.classList.remove('active');
  });
  const targetPage = document.getElementById(pageId);

  if (targetPage) {
    targetPage.classList.add('active');
  }

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
}

function scrollChatToBottom() {
  if (chatList) {
    chatList.scrollTop = chatList.scrollHeight;
  }
}

function addChatMessage(text, meta = 'You - Now', type = 'sent') {
  if (!chatList) return;

  const messageEl = document.createElement('div');
  messageEl.className = `teacher-chat-message teacher-${type}`;
  messageEl.innerHTML = `
    <div class="teacher-message-text">${text}</div>
    <div class="teacher-message-meta">${meta}</div>
  `;

  chatList.appendChild(messageEl);
  scrollChatToBottom();
}

function renderClassChat(classId) {
  const chat = classChats[classId];
  if (!chat || !chatList || !chatClassTitle || !chatClassStatus) return;

  chatClassTitle.textContent = chat.title;
  chatClassStatus.textContent = chat.status;
  chatList.innerHTML = '';

  chat.messages.forEach((message) => {
    addChatMessage(message.text, message.meta, message.type);
  });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function clearSelectedMedia() {
  selectedMedia = null;
  if (mediaUpload) mediaUpload.value = '';
  if (mediaPreview) mediaPreview.classList.add('d-none');
}

navLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    showPage(this.dataset.page);
    closeTeacherMenu();
  });
});

if (teacherMenuToggle) {
  teacherMenuToggle.addEventListener('click', openTeacherMenu);
}

if (teacherMenuClose) {
  teacherMenuClose.addEventListener('click', closeTeacherMenu);
}

if (teacherSidebarOverlay) {
  teacherSidebarOverlay.addEventListener('click', closeTeacherMenu);
}

if (classSelect) {
  classSelect.addEventListener('change', function () {
    clearSelectedMedia();
    renderClassChat(this.value);
  });
}

if (mediaUpload && mediaPreview && mediaFileName && mediaFileSize) {
  mediaUpload.addEventListener('change', function () {
    selectedMedia = this.files[0] || null;

    if (!selectedMedia) {
      clearSelectedMedia();
      return;
    }

    mediaFileName.textContent = selectedMedia.name;
    mediaFileSize.textContent = formatFileSize(selectedMedia.size);
    mediaPreview.classList.remove('d-none');
  });
}

if (removeMedia) {
  removeMedia.addEventListener('click', clearSelectedMedia);
}

if (chatForm && chatInput && chatList) {
  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const text = chatInput.value.trim();
    if (!text && !selectedMedia) return;

    if (text) {
      addChatMessage(text);
    }

    if (selectedMedia) {
      addChatMessage(
        `<i class="bi bi-paperclip me-1"></i>${selectedMedia.name}`,
        `Media - ${formatFileSize(selectedMedia.size)}`
      );
      clearSelectedMedia();
    }

    chatInput.value = '';
  });
}

function setPasswordFieldError(input, errorId, message) {
  const error = document.getElementById(errorId);

  if (!input || !error) return;

  input.classList.toggle('is-invalid', Boolean(message));
  error.textContent = message;
  error.classList.toggle('d-block', Boolean(message));
}

function validatePasswordForm() {
  const currentValue = currentPassword.value.trim();
  const newValue = newPassword.value.trim();
  const confirmValue = confirmPassword.value.trim();
  const strongPasswordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
  let isValid = true;

  setPasswordFieldError(currentPassword, 'currentPasswordError', '');
  setPasswordFieldError(newPassword, 'newPasswordError', '');
  setPasswordFieldError(confirmPassword, 'confirmPasswordError', '');

  if (!currentValue) {
    setPasswordFieldError(
      currentPassword,
      'currentPasswordError',
      'Current password is required.'
    );
    isValid = false;
  }

  if (!newValue) {
    setPasswordFieldError(newPassword, 'newPasswordError', 'New password is required.');
    isValid = false;
  } else if (!strongPasswordPattern.test(newValue)) {
    setPasswordFieldError(
      newPassword,
      'newPasswordError',
      'Password must include uppercase, lowercase, number, symbol, and 8+ characters.'
    );
    isValid = false;
  } else if (newValue === currentValue) {
    setPasswordFieldError(
      newPassword,
      'newPasswordError',
      'New password must be different from current password.'
    );
    isValid = false;
  }

  if (!confirmValue) {
    setPasswordFieldError(
      confirmPassword,
      'confirmPasswordError',
      'Please confirm your new password.'
    );
    isValid = false;
  } else if (confirmValue !== newValue) {
    setPasswordFieldError(
      confirmPassword,
      'confirmPasswordError',
      'Confirm password does not match new password.'
    );
    isValid = false;
  }

  return isValid;
}

passwordToggles.forEach((toggle) => {
  toggle.addEventListener('click', function () {
    const input = document.getElementById(this.dataset.target);
    const icon = this.querySelector('i');

    if (!input || !icon) return;

    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    icon.classList.toggle('bi-eye-fill', isHidden);
    icon.classList.toggle('bi-eye-slash-fill', !isHidden);
    this.setAttribute(
      'aria-label',
      `${isHidden ? 'Hide' : 'Show'} ${input.placeholder.toLowerCase()}`
    );
  });
});

if (passwordForm && currentPassword && newPassword && confirmPassword) {
  [currentPassword, newPassword, confirmPassword].forEach((input) => {
    input.addEventListener('input', function () {
      if (this.classList.contains('is-invalid')) {
        validatePasswordForm();
      }
    });
  });

  passwordForm.addEventListener('submit', function (e) {
    e.preventDefault();

    passwordMessage.className = 'alert d-none mb-0';
    passwordMessage.textContent = '';

    if (!validatePasswordForm()) {
      passwordMessage.className = 'alert alert-danger mb-0';
      passwordMessage.textContent = 'Please fix the password errors and try again.';
      return;
    }

    passwordMessage.className = 'alert alert-success mb-0';
    passwordMessage.textContent = 'Password updated successfully.';
    passwordForm.reset();
  });
}
