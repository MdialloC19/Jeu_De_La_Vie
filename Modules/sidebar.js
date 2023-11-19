
export class SidebarModalManager {
    constructor(openBtnSelector, closeBtnSelector, modalSelector, modal1Selector, navbarSelector) {

        this.openBtn = document.querySelector("[data-open]");
        this.closeBtn = document.querySelector("[data-close]");
        this.modal = document.querySelector("#modal");
        this.modal1 = document.querySelector("#modal1");
        this.sidebarBtn = document.querySelector(".toggle-btn");
        this.prevScrollPos = window.scrollY;
        this.initialize();
        this.initializeSidebar();
    }

    initialize() {
        this.openBtn.addEventListener('click', () => {
            this.modal.style.display = 'block';
        });

        this.closeBtn.addEventListener('click', () => {
            this.modal.style.display = 'none';
        });

        window.addEventListener('scroll', () => {
            this.manageNavbarVisibility();
        });
    }

    initializeSidebar() {
        this.sidebarBtn.addEventListener("click", () => {
        document.body.classList.toggle("active");
        });
    }

    manageNavbarVisibility() {
        const currScrollPos = window.scrollY;

        if (currScrollPos > this.prevScrollPos) {
            this.navBar.style.transform = `translateY(-105%)`;
        } else {
            this.navBar.style.transform = `translateY(0%)`;
        }
        this.prevScrollPos = currScrollPos;
    }
}

