// ========== GLOBAL STATE ==========
let currentProjectIndex = 0;
const projectTitles = ["Inventory Tracker", "Custom Order Guide", "Weekly Review"];
const urlMap = {
    "Inventory Tracker": "partials/inventorybridge.html",
    "Custom Order Guide": "partials/orderguide.html",
    "Weekly Review": "partials/endofweekreview.html"
};

// ========== LOAD AND DISPLAY A PROJECT ==========
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
            attachModalButtons(); // 🔁 ensure listeners on arrows + close
        });
}

// ========== ARROW VISIBILITY ==========
function updateArrowVisibility() {
    const prev = document.getElementById('prev-project');
    const next = document.getElementById('next-project');

    if (!prev || !next) return;

    prev.style.visibility = currentProjectIndex === 0 ? 'hidden' : 'visible';
    next.style.visibility = currentProjectIndex === projectTitles.length - 1 ? 'hidden' : 'visible';
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

// ========== ATTACH ARROWS AND CLOSE TO MODAL ==========
function attachModalButtons() {
    const panel = document.getElementById('project-details');
    const closeBtn = document.getElementById('close-details');
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');

    if (closeBtn && !closeBtn.dataset.attached) {
        closeBtn.addEventListener('click', () => {
            panel.classList.remove('show');
            panel.classList.add('hidden');
        });
        closeBtn.dataset.attached = "true";
    }

    if (prevBtn && !prevBtn.dataset.attached) {
        prevBtn.addEventListener('click', () => {
            showProject(currentProjectIndex - 1);
        });
        prevBtn.dataset.attached = "true";
    }

    if (nextBtn && !nextBtn.dataset.attached) {
        nextBtn.addEventListener('click', () => {
            showProject(currentProjectIndex + 1);
        });
        nextBtn.dataset.attached = "true";
    }
}

// ========== THEME TOGGLE ==========
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ========== PAGE CONTENT LOADER ==========
function loadPage(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("content").innerHTML = this.responseText;
            attachShowcaseListeners(); // 🔁 reattach tile listeners
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// ========== INITIAL SETUP ==========
document.addEventListener("DOMContentLoaded", () => {
    // Inject navbar
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

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    attachShowcaseListeners(); // tiles
    attachModalButtons();      // modal nav buttons
});
document.querySelectorAll('.load-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const url = this.getAttribute('data-url');
        if (url) {
            loadPage(url);

            // Load dragon.js manually if needed
            if (url.includes('rpgPage.html')) {
                const script = document.createElement('script');
                script.src = 'js/dragon.js';
                script.defer = true;
                document.body.appendChild(script);
            }
        }
    });
});
