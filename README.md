# tinylibs
A aggregation of small utility libraries I have created overtime 🐱‍👤

## 1. Theme Js

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
## 2. Prototyper

## [Demo](https://akhilarjun.github.io/tinylibs/demo/prototyper)

Helps you to create a toolbar that helps you to check your websites responsiveness in different devices

Include the script and style
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/akhilarjun/tinylibs@latest/prototyper/prototyper.min.css">
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/tinylibs@latest/prototyper/prototyper.min.js" onload="init()"></script>
```

If you want to exclude some devices from your demo just pass list of devices to the init function

Eg
```html
<script src="https://cdn.jsdelivr.net/gh/akhilarjun/tinylibs@latest/prototyper/prototyper.min.js" onload="init('watch, mobile')"></script>
```

Supported options for exclude list are `watch`, `mobile`, `tablet`, `desktop`.