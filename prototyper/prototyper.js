
/**
 * @author Akhil Arjun
 * @version 0.1
 */

const svg = {
    DESKTOP: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-desktop" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#444444" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <rect x="3" y="4" width="18" height="12" rx="1" />
        <line x1="7" y1="20" x2="17" y2="20" />
        <line x1="9" y1="16" x2="9" y2="20" />
        <line x1="15" y1="16" x2="15" y2="20" />
    </svg>`,
    MOBILE: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-mobile" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#444444" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <rect x="7" y="4" width="10" height="16" rx="1" />
        <line x1="11" y1="5" x2="13" y2="5" />
        <line x1="12" y1="17" x2="12" y2="17.01" />
    </svg>`,
    TABLET: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-tablet" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#444444" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <circle cx="12" cy="17" r="1" />
    </svg>`,
    WATCH: `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-watch" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#444444" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <rect x="6" y="6" width="12" height="12" rx="3" />
        <path d="M9 18v3h6v-3" />
        <path d="M9 6v-3h6v3" />
    </svg>`,
}

const permittedWidths = {
    WATCH: 368,
    MOBILE: 411,
    TABLET: 768,
    DESKTOP: 1100
}

const Devices = {
    WATCH: "WATCH",
    MOBILE: "MOBILE",
    TABLET: "TABLET",
    DESKTOP: "DESKTOP"
}

 class Prototyper {
     /**
      * Initialize prototyper
      * @param {[Devices]} [include] 
      * @param {[Devices]} [exclude] 
      */
    constructor (include, exclude) {
        this.include = include;
        this.exclude = exclude;
        console.log('Prototyper Initialised', this.include, this.exclude);
    }

    paint = (devicesList) => {
        devicesList = devicesList.filter(device => {
            return window.innerWidth > permittedWidths[device];
        });
        const prototyperDiv = document.createElement('div');
        prototyperDiv.classList.add('prototyper');
        let icons = '';
        devicesList.forEach(device => {
            icons += `<div class="prototyper-nav-icon" data-device="${device}">${svg[device]}</div>`;
        });
        prototyperDiv.innerHTML = `
            <div class="prototyper-nav">
                <div class="prototyper-nav-icons">${icons}</div>
            </div>
            <div class="prototyper-contianer">
                <div class="prototyper-contianer-view"></div>
            </div>
        `;
        const htmlBody = document.getElementsByTagName('body')[0];
        const links = document.querySelectorAll('link');
        const styles = document.querySelectorAll('style');
        htmlBody.childNodes.forEach(childNode => {
            if(childNode.nodeName === 'SCRIPT' && (childNode.src.endsWith('prototyper.js') || childNode.src.endsWith('prototyper.min.js'))) {
                childNode.remove();
            }
        });
        const contentAvailable = htmlBody.innerHTML;
        htmlBody.innerHTML = '';
        
        const iframe = document.createElement('iframe');
        prototyperDiv.querySelector('.prototyper-contianer .prototyper-contianer-view').append(iframe);
        htmlBody.append(prototyperDiv);

        iframe.onload = () => {
            Array.from(links).forEach(link => {
                if (!(link.href.endsWith('prototyper.css') || link.href.endsWith('prototyper.min.css'))) {
                    let newLink = link.cloneNode(true);
                    frames[0].document.head.appendChild(newLink);
                }
            });
            Array.from(styles).forEach(style => {
                let newStyle = style.cloneNode(true);
                frames[0].document.head.appendChild(newStyle);
            });
        }

        iframe.contentWindow.document.open();
        iframe.contentWindow.document.write(contentAvailable);
        iframe.contentWindow.document.close();

        devicesList.forEach(device => {
            document.querySelector(`.prototyper-nav-icon[data-device="${device}"]`).addEventListener('click', () => {
                this.switchToDevice(device);
            })
        });
        this.switchToDevice(devicesList.pop());
    }

    init = () => {
        let devicesList = [];
        if (this.include && this.include.length > 0) {
            devicesList = this.include;
        } else {
            devicesList = [Devices.WATCH, Devices.MOBILE, Devices.TABLET, Devices.DESKTOP];
            if (this.exclude && this.exclude.length > 0) {
                devicesList = devicesList.filter(device => {
                    let toBeExcluded = false;
                    this.exclude.forEach(excludingDevice => {
                        if (device === excludingDevice) {
                            toBeExcluded = true;
                        }
                    })
                    return !toBeExcluded;
                })
            }
        }
        this.paint(devicesList);
    }

    switchToDevice = (device) => {
        const container = document.querySelector('.prototyper-contianer');
        
        document.querySelectorAll(`.prototyper-nav-icon`).forEach(d => {
            if (d.dataset.device === device) {
                d.classList.add('active');
                container.classList.add(`${d.dataset.device.toLowerCase()}`);
            } else {
                d.classList.remove('active');
                container.classList.remove(`${d.dataset.device.toLowerCase()}`);
            }
        });
    }
}

function init(excludeList, includeList) {
    let include = [], exclude = [];
    if (includeList) {
        includeList.split(",").forEach(token => {
            token = token.trim();
            if (Devices[token.toUpperCase()]) {
                include.push(Devices[token.toUpperCase()]);
            }
        })
    }
    if (excludeList) {
        excludeList.split(",").forEach(token => {
            token = token.trim();
            if (Devices[token.toUpperCase()]) {
                exclude.push(Devices[token.toUpperCase()]);
            }
        })
    }

    let p = new Prototyper(include, exclude);
    p.init();
}

function showFloatingIcon() {
    const prototyperScript = document.querySelector('script[src*="prototyper"]');
    const floatingIcon = document.createElement('div');
    floatingIcon.classList.add('floating-icon');
    floatingIcon.textContent = 'P';
    floatingIcon.onclick = () => {
        floatingIcon.remove();
        init(prototyperScript.dataset.exclude, prototyperScript.dataset.include);
    }
    document.body.prepend(floatingIcon);
}