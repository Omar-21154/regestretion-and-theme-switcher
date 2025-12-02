const resaultname = document.getElementById('resaultname');
const resaultid = document.getElementById('resaultid');
resaultname.textContent =`Username: ${localStorage.getItem('username')}`;
resaultid.textContent =`Id: ${localStorage.getItem('password')}`;

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
