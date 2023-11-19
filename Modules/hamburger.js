export class Hamburger {
    constructor() {
        this.hamburger = document.querySelector(".hamburger");
        this.navMenu = document.querySelector(".nav-menu");
        this.navLink = document.querySelectorAll(".nav-link");
        this.initialize();
    }

    initialize() {
        this.navLink.forEach(link => link.addEventListener('click', () => this.closeMenu()));
        this.hamburger.addEventListener('click', () => this.mobileMenu());
    }

    mobileMenu() {
        this.hamburger.classList.toggle("active");
        this.navMenu.classList.toggle("active");
    }

    closeMenu() {
        this.hamburger.classList.remove("active");
        this.navMenu.classList.remove("active");
    }
}
