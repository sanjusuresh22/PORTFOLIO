document.addEventListener("DOMContentLoaded", () => {
    const cursorGlow = document.getElementById("cursor-glow");
    if (cursorGlow) {
        window.addEventListener("mousemove", (event) => {
            cursorGlow.style.opacity = "0.95";
            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;
        });

        window.addEventListener("mouseleave", () => {
            cursorGlow.style.opacity = "0";
        });
    }

    const words = ["Python Developer", "Django Developer", "Frontend Developer", "Web Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typing = document.getElementById("typing");

    function typeEffect() {
        if (!typing) return;
        const current = words[wordIndex];
        typing.textContent = deleting
            ? current.substring(0, charIndex--)
            : current.substring(0, charIndex++);

        if (!deleting && charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

        if (deleting && charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

        setTimeout(typeEffect, deleting ? 40 : 110);
    }

    typeEffect();


    
    const scrollProgress = document.getElementById("scroll-progress");
    const topBtn = document.getElementById("topBtn");

    function updateScrollProgress() {
        if (!scrollProgress) return;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
        scrollProgress.style.width = `${Math.min(progress, 100)}%`;
        if (topBtn) topBtn.style.display = window.scrollY > 400 ? "block" : "none";
    }

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    if (topBtn) {
        topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const sections = document.querySelectorAll("section[id], header[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        let current = "home";
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 140) current = section.getAttribute("id");
        });
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    }

    window.addEventListener("scroll", setActiveLink);
    setActiveLink();

    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    if (entry.target.querySelector(".progress-bar")) {
                        const bar = entry.target.querySelector(".progress-bar");
                        const targetWidth = bar.getAttribute("data-progress") || bar.style.width;
                        requestAnimationFrame(() => {
                            bar.style.width = targetWidth;
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach((item) => observer.observe(item));
    } else {
        reveals.forEach((item) => item.classList.add("show"));
    }

    document.querySelectorAll(".skill-card, .project-card, .hero-panel, .glass-card").forEach((card) => {
        card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            card.style.setProperty("--rotY", `${x * 10}deg`);
            card.style.setProperty("--rotX", `${-y * 10}deg`);
        });

        card.addEventListener("mouseleave", () => {
            card.style.setProperty("--rotY", "0deg");
            card.style.setProperty("--rotX", "0deg");
        });
    });

    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const icon = themeBtn.querySelector("i");
            const isLight = document.body.classList.contains("light-mode");
            icon.classList.toggle("bi-moon-fill", !isLight);
            icon.classList.toggle("bi-sun-fill", isLight);
        });
    }

    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = contactForm.querySelector("input[type='text']")?.value?.trim() || "There";
            const email = contactForm.querySelector("input[type='email']")?.value?.trim() || "your@email.com";
            const subject = contactForm.querySelectorAll("input[type='text']")[1]?.value?.trim() || "Portfolio enquiry";
            const message = contactForm.querySelector("textarea")?.value?.trim() || "Hello";
            const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            window.location.href = `mailto:your@email.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }
});
