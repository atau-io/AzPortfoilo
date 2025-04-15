// ========== GLOBAL STATE ==========
let currentProjectIndex = 0;
const projectTitles = ["Inventory Tracker", "Custom Order Guide", "Weekly Review"];
const urlMap = {
    "Inventory Tracker": "partials/inventorybridge.html",
    "Custom Order Guide": "partials/orderguide.html",
    "Weekly Review": "partials/endofweekreview.html"
};

// ========== LOAD PARTIAL ==========
function loadPartial(url, container) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            updateArrowVisibility();

            // Close button logic after new HTML loads
            const closeBtn = document.getElementById('close-details');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    document.getElementById('project-details').classList.remove('show');
                    document.getElementById('project-details').classList.add('hidden');
                });
            }
        });
}

// ========== SHOW PROJECT ==========
function showProject(index) {
    const contentContainer = document.getElementById('project-content');
    const detailsPanel = document.getElementById('project-details');
    const title = projectTitles[index];
    currentProjectIndex = index;

    if (urlMap[title]) {
        loadPartial(urlMap[title], contentContainer);
        detailsPanel.classList.remove('hidden');
        detailsPanel.classList.add('show');
    }
}

// ========== SHOW/HIDE NAV ARROWS ==========
function updateArrowVisibility() {
    const prev = document.getElementById('prev-project');
    const next = document.getElementById('next-project');

    if (!prev || !next) return;

    prev.style.visibility = currentProjectIndex === 0 ? 'hidden' : 'visible';
    next.style.visibility = currentProjectIndex === projectTitles.length - 1 ? 'hidden' : 'visible';
}

// ========== ATTACH TILE CLICK EVENTS ==========
function attachShowcaseListeners() {
    const showcaseTiles = document.querySelectorAll('.showcase-tile');

    showcaseTiles.forEach((tile, i) => {
        tile.addEventListener('click', (e) => {
            e.preventDefault();
            showProject(i);
        });
    });
}

// ========== THEME TOGGLE ==========
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

// ========== ON PAGE LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
    // Inject navbar
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

            // Theme toggle
            const toggleBtn = document.getElementById('toggleThemeBtn');
            if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);

            // Load-link handling
            document.querySelectorAll('.load-link').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const url = this.getAttribute('data-url');
                    if (url) loadPage(url);
                });
            });
        });

    // Apply stored theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Showcase
    attachShowcaseListeners();

    // Nav arrows
    document.getElementById('prev-project')?.addEventListener('click', () => {
        if (currentProjectIndex > 0) showProject(currentProjectIndex - 1);
    });

    document.getElementById('next-project')?.addEventListener('click', () => {
        if (currentProjectIndex < projectTitles.length - 1) showProject(currentProjectIndex + 1);
    });
});
