// main.js

// ========== Run after DOM is loaded ==========
document.addEventListener("DOMContentLoaded", () => {

    // ========== Navbar Injection ==========
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;

            // Reattach event listeners to dynamic navbar content
            const toggleBtn = document.getElementById('togagleThemeBtn');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', toggleTheme);
            }

            // Attach click to any load-link if needed
            document.querySelectorAll('.load-link').forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const url = this.getAttribute('data-url');
                    if (url) loadPage(url);
                });
            });
        });

    // ========== Dark Mode from Local Storage ==========
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // ========== Showcase Popout Logic ==========
    const showcaseTiles = document.querySelectorAll('.showcase-tile');
    const detailsPanel = document.getElementById('project-details');
    const contentContainer = document.getElementById('project-content');
    const closeBtn = document.getElementById('close-details');

    const projectData = {
        "Inventory Tracker": `
            <h2>Inventory Tracker</h2>
            <p>A fully automated inventory and order system using Excel macros and Google Sheets.</p>
            <ul>
                <li>Realtime stock tracking</li>
                <li>PDF order reports</li>
                <li>Integrated with email</li>
            </ul>
        `,
        "Project 2": `
            <h2>Project 2</h2>
            <p>Some other cool thing with fancy tricks.</p>
        `,
        "Project 3": `
            <h2>Project 3</h2>
            <p>Work in progress with dark magic macros ⚔️</p>
        `
    };

    showcaseTiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            e.preventDefault();
            const title = tile.querySelector('.tile-overlay').textContent.trim();
            if (projectData[title]) {
                contentContainer.innerHTML = projectData[title];
                detailsPanel.classList.remove('hidden');
                detailsPanel.classList.add('show');
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            detailsPanel.classList.remove('show');
            detailsPanel.classList.add('hidden');
        });
    }
});

// ========== Toggle Theme ==========
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// ========== Optional Page Loader Function ==========
function loadPage(url) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("content").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
