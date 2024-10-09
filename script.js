document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.textContent = 'Top';
    scrollTopBtn.classList.add('scroll-top-btn');
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('h2').classList.add('animate');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Light/Dark Mode Switch
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark Mode';
    toggleButton.classList.add('btn');
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleButton.classList.toggle('dark-mode');
        scrollTopBtn.classList.toggle('dark-mode');
        navLinks.forEach(link => {
            link.classList.toggle('dark-mode');
        });
    });

    // AJAX Content Loading Function
    function loadContent(url, target) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector(target).innerHTML = data;
            });
    }

    // Example usage: load additional projects
    loadContent('additional-projects.html', '#projects');

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch('contact.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            formStatus.textContent = data;
            contactForm.reset();
        })
        .catch(error => {
            formStatus.textContent = 'An error occurred. Please try again.';
        });
    });
});
