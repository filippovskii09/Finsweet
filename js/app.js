(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const openButtons = document.querySelectorAll("[data-modal]"), closeModalButton = document.querySelector(".modal__close");
    const closeModal = () => {
        document.body.classList.remove("open-modal");
    };
    openButtons.forEach((item => item.addEventListener("click", (() => {
        document.body.classList.add("open-modal");
    }))));
    closeModalButton.addEventListener("click", closeModal);
    window.addEventListener("keydown", (e => {
        if (e.code === "Escape") closeModal();
    }));
    const columns = document.querySelectorAll(".expert-column");
    let currentIndex = 0;
    function animColumns(index) {
        columns[index].style.transform = "scale(1.1)";
        setTimeout((() => {
            columns[index].style.transform = "scale(1)";
            currentIndex = (currentIndex + 1) % columns.length;
            animColumns(currentIndex);
        }), 1500);
    }
    animColumns(currentIndex);
    let time = 2;
    let cc = 1;
    function handleScroll() {
        const counterElement = document.getElementById("counter");
        const numberElements = document.querySelectorAll(".number");
        console.log("counter animation");
        if (!counterElement) return;
        const cPos = counterElement.offsetTop;
        const topWindow = window.scrollY;
        if (cPos < topWindow + 200) if (cc < 2) numberElements.forEach((element => {
            const num = parseInt(element.getAttribute("data-num"));
            const step = 1e3 * time / num;
            let i = 1;
            const interval = setInterval((() => {
                if (i <= num) element.textContent = i; else {
                    cc += 2;
                    clearInterval(interval);
                }
                i++;
            }), step);
        }));
    }
    window.addEventListener("scroll", handleScroll);
    const column = document.querySelector(".services-column");
    const showMoreButton = document.querySelectorAll(".services-column__btn");
    const returnFront = document.querySelectorAll("#return-column");
    showMoreButton.forEach((item => {
        item.addEventListener("click", (() => {
            column.classList.add("expanded");
        }));
    }));
    returnFront.forEach((item => {
        item.addEventListener("click", (() => {
            column.classList.remove("expanded");
        }));
    }));
    window["FLS"] = true;
    isWebp();
    menuInit();
    headerScroll();
})();