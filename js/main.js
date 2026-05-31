/**
 * 
 */


const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    if (!themeToggle) {
        return;
    }

    const nextTheme = theme === "dark" ? "light" : "dark";

    themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
}

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle?.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
});


const sectionIds = ["profile", "about", "projects", "skills", "goals", "contact"];

const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

const navLinks = new Map(
    sectionIds.map((id) => [id, document.querySelector(`.nav-link[href="#${id}"]`)])
);

function setActiveSection(activeId) {
    navLinks.forEach((link, id) => {
        if (!link) {
            return;
        }

        const isActive = id === activeId;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "true");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

const observer = new IntersectionObserver(
    (entries) => {
        const visibleEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

        if (!visibleEntry) {
            return;
        }

        setActiveSection(visibleEntry.target.id);
    },
    {
        root: null,
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0
    }
);

sections.forEach((section) => observer.observe(section));
