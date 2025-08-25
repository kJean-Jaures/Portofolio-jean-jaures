document.addEventListener('DOMContentLoaded', () => {

    // --- GESTION DU MENU MOBILE ---
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // --- EFFET MACHINE À ÉCRIRE ---
    const typedTitle = document.getElementById('typed-title');
    if (typedTitle) {
        const text = "KOUASSI Kouamé Jean-Jaures";
        let index = 0;
        const speed = 100;

        function typeWriter() {
            if (index < text.length) {
                typedTitle.innerHTML += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }

    // --- BOUTON RETOUR EN HAUT ---
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
    }

    // --- MODE SOMBRE (DARK MODE) ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

    // --- EFFET PARALLAXE AU SURVOL DES PROJETS ---
    const projectItems = document.querySelectorAll('.project-item');
    if (projectItems.length > 0) {
        projectItems.forEach(item => {
            const imageContainer = item.querySelector('.project-image-container img');
            const movementStrength = 25;

            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                imageContainer.style.transform = `translate(${-x * movementStrength}px, ${-y * movementStrength}px)`;
            });

            item.addEventListener('mouseleave', () => {
                imageContainer.style.transform = 'translate(0, 0)';
            });
        });
    }

    // --- CURSEUR PERSONNALISÉ ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        });
    }

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('grow'));
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.addEventListener('focus', () => {
                cursorDot.classList.add('hidden');
                cursorOutline.classList.add('hidden');
            });
            el.addEventListener('blur', () => {
                cursorDot.classList.remove('hidden');
                cursorOutline.classList.remove('hidden');
            });
        }
    });

    // --- INITIALISATION D'AOS ---
    AOS.init({
        duration: 800,
        once: true,
    });
});