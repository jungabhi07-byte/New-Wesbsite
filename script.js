// ============================================================
// 1. SIDEBAR TOGGLE (Mobile)
// ============================================================
const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('openSidebar');
const closeBtn = document.getElementById('closeSidebar');

if (openBtn) {
    openBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
}

// Close sidebar when clicking outside (on mobile)
document.addEventListener('click', (e) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && sidebar.classList.contains('open')) {
        const isClickInside = sidebar.contains(e.target);
        const isClickOnMenuBtn = openBtn && openBtn.contains(e.target);
        if (!isClickInside && !isClickOnMenuBtn) {
            sidebar.classList.remove('open');
        }
    }
});

// ============================================================
// 2. DARK / LIGHT THEME TOGGLE
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const themeToggleIcon = document.getElementById('themeToggleIcon');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme === 'dark');
} else {
    // Default: system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    updateThemeIcons(prefersDark);
}

function updateThemeIcons(isDark) {
    const icon1 = themeToggle?.querySelector('i');
    const icon2 = themeToggleIcon?.querySelector('i');
    const label = themeToggle?.querySelector('span') || themeToggle;

    if (icon1) {
        icon1.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (icon2) {
        icon2.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (themeToggle && themeToggle.querySelector('span')) {
        themeToggle.querySelector('span').textContent = isDark ? ' Light Mode' : ' Dark Mode';
    }
}

function toggleTheme() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme === 'dark');
}

if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleIcon) themeToggleIcon.addEventListener('click', toggleTheme);

// ============================================================
// 3. ACTIVE NAV LINK HIGHLIGHTING (Scroll Spy)
// ============================================================
const sections = document.querySelectorAll('.chapter');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120; // offset for topbar

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
        }
    });
}

// Throttled scroll listener for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveLink();
            ticking = false;
        });
        ticking = true;
    }
});

// Run once on load
window.addEventListener('load', updateActiveLink);

// ============================================================
// 4. SMOOTH CLOSE ON NAV LINK CLICK (Mobile)
// ============================================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('open');
        }
        // Smooth scroll to section (browser handles anchor)
        // But we'll let default behavior work.
    });
});

// ============================================================
// 5. KEYBOARD SHORTCUT: Ctrl+Shift+D for Dark Mode
// ============================================================
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        toggleTheme();
    }
});

console.log('✅ ML Notes loaded successfully!');
console.log('💡 Press Ctrl+Shift+D to toggle dark/light mode.');
