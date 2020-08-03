/**
 * @version 1.0
 * @author Akhil Arjun
 */


const html = document.getElementsByTagName('html')[0];
const toggleTheme = (theme) => {
    html.dataset.theme = theme;
}

if (localStorage.getItem('theme')) {
    toggleTheme(localStorage.getItem('theme'));
} else if (window.matchMedia('(prefers-color-scheme)').matches) { // check if browser supports prefered color scheme
    //check the default preference on load 
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        toggleTheme('dark');
    } else if (window.matchMedia("(prefers-color-scheme: light)")) {
        toggleTheme('light');
    }
    //If user changes prefered scheme to dark theme
    window.matchMedia("(prefers-color-scheme: dark)").addListener(
        e => {
            if(e.matches) {
                toggleTheme('dark');
                setupThemeIcon();
            }
        }
    );
    //If user changes prefered scheme to dark theme
    window.matchMedia("(prefers-color-scheme: light)").addListener(
        e => {
            if(e.matches) {
                toggleTheme('light');
                setupThemeIcon();
            }
        }
    );
}

/**
 * 
 * @param {HTMLElement} themeElement 
 */
function switchTheme (themeElement) {
    if (themeElement) {
        toggleTheme(themeElement.dataset.activateTheme);
        localStorage.setItem('theme', themeElement.dataset.activateTheme);
    }
    setupThemeIcon();
}

function setupThemeIcon () {
    const themeElement = document.getElementById('theme-selector');
    if (themeElement && html.dataset.theme === 'light') {
        themeElement.dataset.darkSrc && (themeElement.src = themeElement.dataset.darkSrc);
        themeElement.dataset.activateTheme = 'dark';
    } else if (themeElement && html.dataset.theme === 'dark') {
        themeElement.dataset.lightSrc && (themeElement.src = themeElement.dataset.lightSrc);
        themeElement.dataset.activateTheme = 'light';
    }
}