# tinylibs
A aggregation of small utility libraries I have created overtime 🐱‍👤

## Theme Js

## [Demo](https://akhilarjun.github.io/tinylibs/demo/themejs)

Helps you to
- dynamically check what is the preferred color scheme
- override theme in the application if the user wants to
- remember that decision by the user using `localStorage`

Include the script
```html
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/tinylibs@latest/themejs/theme.min.js" onload="setupThemeIcon()"></script>
```

Have an image tag with following id `theme-selector`.

References to both dark and light mode icons could be provided usin `data-light-src` and `data-dark-src` (But this is optional).

Call `switchTheme(this)` to switch between dark and light theme.

```html
<img src="./sun.svg" 
    data-light-src="./sun.svg" 
    data-dark-src="./moon.svg"
    alt="light theme" 
    id="theme-selector"
    onclick="switchTheme(this)">
```
That is it 😀