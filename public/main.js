// ========== GLOBAL STATE ==========
let currentProjectIndex = 0;
const projectTitles = ["Inventory Tracker", "Custom Order Guide", "Weekly Review"];
const urlMap = {
    "Inventory Tracker": "partials/inventorybridge.html",
    "Custom Order Guide": "partials/orderguide.html",
    "Weekly Review": "partials/endofweekreview.html"
};

// ========== DISPLAY A PROJECT ==========
function showProject(index) {
    if (index < 0 || index >= projectTitles.length) return;

    const title = projectTitles[index];
    const contentContainer = document.getElementById('project-content');
    const detailsPanel = document.getElementById('project-details');

    currentProjectIndex = index;

    fetch(urlMap[title])
        .then(res => res.text())
        .then(html => {
            contentContainer.innerHTML = html;
            detailsPanel.classList.remove('hidden');
            detailsPanel.classList.add('show');
            updateArrowVisibility();
        });
}

// ========== ARROW VISIBILITY ==========
function updateArrowVisibility() {
    const prev = document.getElementById('prev-project');
    const next = document.getElementById('next-project');

    if (prev && next) {
        prev.style.visibility = currentProjectIndex === 0 ? 'hidden' : 'visible';
        next.style.visibility = currentProjectIndex === projectTitles.length - 1 ? 'hidden' : 'visible';
    }
}

// ========== TILE CLICK EVENTS ==========
function attachShowcaseListeners() {
    const tiles = document.querySelectorAll('.showcase-tile');
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', (e) => {
            e.preventDefault();
            showProject(index);
        });
    });
}

// ========== CLOSE + ARROW LISTENERS ==========
function attachOverlayControls() {
    const closeBtn = document.getElementById('close-details');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const panel = document.getElementById('project-details');
            panel.classList.remove('show');
            panel.classList.add('hidden');
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentProjectIndex > 0) {
                showProject(currentProjectIndex - 1);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentProjectIndex < projectTitles.length - 1) {
                showProject(currentProjectIndex + 1);
            }
        });
    }
}

// ========== THEME ==========
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ========== PAGE LOADER ==========
function loadPage(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("content").innerHTML = this.responseText;
            attachShowcaseListeners();
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
    // Load navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

            const toggleBtn = document.getElementById('toggleThemeBtn');
            if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

            document.querySelectorAll('.load-link').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const url = this.getAttribute('data-url');
                    if (url) loadPage(url);
                });
            });
        });

    // Apply dark mode if saved
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    attachShowcaseListeners();
    attachOverlayControls();
});
