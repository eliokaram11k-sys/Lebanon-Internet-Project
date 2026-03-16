document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- Loading Screen Animation --- //
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        gsap.to(loadingScreen, {
            duration: 1.5, 
            opacity: 0, 
            delay: 2, // Show loading screen for 2 seconds
            ease: "power2.out",
            onComplete: () => {
                loadingScreen.style.display = 'none';
            }
        });
        gsap.from('#loading-screen .relative', { duration: 1, scale: 0.8, opacity: 0, ease: 'elastic.out(1, 0.75)', delay: 0.5 });
    }

    // --- Sidebar & Mobile Menu --- //
    const sidebar = document.getElementById('sidebar');
    const menuToggle = document.getElementById('menu-toggle');
    const mainContent = document.querySelector('main');

    // Initial State: Sidebar hidden for all screen sizes
    gsap.set(sidebar, { xPercent: 100, opacity: 0 });

    let menuOpen = false;

    // Creative Menu Animation
    const toggleMenu = () => {
        if (!menuOpen) {
            // Open Menu
            gsap.to(sidebar, { 
                xPercent: 0, 
                opacity: 1, 
                duration: 0.8, 
                ease: "expo.out" 
            });
            gsap.to(menuToggle, { rotation: 90, color: "#ef4444", duration: 0.5 });
            menuOpen = true;
        } else {
            // Close Menu
            gsap.to(sidebar, { 
                xPercent: 100, 
                opacity: 0, 
                duration: 0.6, 
                ease: "expo.in" 
            });
            gsap.to(menuToggle, { rotation: 0, color: "#ffffff", duration: 0.5 });
            menuOpen = false;
        }
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // --- Nav Links Hover Animations --- //
    const navLinks = sidebar.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { 
                x: -15, 
                backgroundColor: "#334155", 
                color: "#38bdf8", 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active-link')) {
                gsap.to(link, { 
                    x: 0, 
                    backgroundColor: "transparent", 
                    color: "#cbd5e1", 
                    duration: 0.3, 
                    ease: "power2.in" 
                });
            } else {
                gsap.to(link, { 
                    x: 0, 
                    duration: 0.3, 
                    ease: "power2.in" 
                });
            }
        });
    });

    // --- Active Link Highlighting --- //
    const currentPath = decodeURIComponent(window.location.pathname.split('/').pop()) || 'index.html';
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active-link', 'bg-sky-500', 'text-white', 'font-bold');
            link.classList.remove('text-slate-300');
        }
    });

    // --- GSAP Scroll Animations --- //
    // 1. Header Animation
    gsap.from('header h1', { duration: 1.5, y: -100, opacity: 0, ease: 'expo.out', delay: 2.2 });
    gsap.from('header p', { duration: 1.5, y: 100, opacity: 0, ease: 'expo.out', delay: 2.4 });

    // 2. Content Section Scroll-Triggered Animation
    const sections = gsap.utils.toArray('.content-section');
    sections.forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            opacity: 0,
            scale: 0.9,
            y: 100,
            duration: 1.2,
            ease: 'expo.out',
        });
    });
});
