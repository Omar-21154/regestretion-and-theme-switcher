const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('Id');
const loginButton = document.getElementById('loginButton');
const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('loginForm');
const usernameError = document.getElementById('usernameError');
const idError = document.getElementById('idError');

// populate saved values
if (usernameInput && localStorage.getItem('username')) {
    usernameInput.value = localStorage.getItem('username');
}
if (passwordInput && localStorage.getItem('password')) {
    passwordInput.value = localStorage.getItem('password');
}

function setError(inputEl, message, errorEl) {
    if (!inputEl || !errorEl) return;
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
}

function clearError(inputEl, errorEl) {
    if (!inputEl || !errorEl) return;
    inputEl.removeAttribute('aria-invalid');
    errorEl.textContent = '';
}

function validateInputs() {
    let valid = true;
    const username = usernameInput ? usernameInput.value.trim() : '';
    const id = passwordInput ? passwordInput.value.trim() : '';

    if (!username) {
        setError(usernameInput, 'Please enter a username', usernameError);
        valid = false;
    } else {
        clearError(usernameInput, usernameError);
    }

    if (!id) {
        setError(passwordInput, 'Please enter a user id', idError);
        valid = false;
    } else if (!/^\d+$/.test(id)) {
        setError(passwordInput, 'User ID must contain only digits', idError);
        valid = false;
    } else {
        clearError(passwordInput, idError);
    }

    return valid;
}

function updateSubmitState() {
    if (!loginButton) return;
    const hasValues = (usernameInput && usernameInput.value.trim()) && (passwordInput && passwordInput.value.trim());
    loginButton.disabled = !hasValues;
}

// wire input events to clear errors and manage button state
if (usernameInput) usernameInput.addEventListener('input', () => { clearError(usernameInput, usernameError); updateSubmitState(); });
if (passwordInput) passwordInput.addEventListener('input', () => { clearError(passwordInput, idError); updateSubmitState(); });

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        // save and go to result
        if (usernameInput) localStorage.setItem('username', usernameInput.value.trim());
        if (passwordInput) localStorage.setItem('password', passwordInput.value.trim());
        window.location.href = './resault.html';
    });
}

updateSubmitState();

// THEME: apply saved theme (or system preference), toggle and persist
function applyTheme(theme) {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
}

function updateThemeToggleText() {
    if (!themeToggle) return;
    themeToggle.textContent = document.documentElement.classList.contains('dark') ? '🌙' : '☀️';
}

updateThemeToggleText();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleText();
    });
}
