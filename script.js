// =========================
// Animation de la navigation au chargement
// =========================
window.addEventListener('load', () => {
    const nav = document.getElementById('nav');
    // La nav est maintenant fixe, donc pas besoin d'animation top
    nav.style.opacity = '1';

    // Animation des éléments du header
    setTimeout(() => {
        const header = document.querySelector('.header');
        header.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 300);
});

// =========================
// Menu mobile (hamburger)
// =========================
document.addEventListener('DOMContentLoaded', () => {
    // Créer le menu hamburger
    const nav = document.querySelector('nav');
    const liste1 = document.querySelector('.liste1');

    // Créer le bouton hamburger
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    // Insérer le hamburger dans la nav
    nav.appendChild(hamburger);

    // Toggle menu mobile
    hamburger.addEventListener('click', () => {
        liste1.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.liste1 a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            liste1.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// =========================
// Animation au scroll (Intersection Observer)
// =========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observer toutes les sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observer les cartes de compétences
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Observer les cartes de projets
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });
});

// =========================
// Smooth scroll pour la navigation
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculer l'offset en fonction de la taille d'écran
                const isMobile = window.innerWidth <= 768;
                const navHeight = isMobile ? 80 : 0; // Hauteur de la nav fixe sur mobile
                const offsetTop = targetSection.offsetTop - navHeight - 20; // -20px pour un peu d'espace

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// =========================
// Animation des cartes au hover
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            // Animation légère au survol
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', (e) => {
            // Retour à la position normale
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// =========================
// Validation du formulaire de contact
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation basique
            if (!name || !email || !message) {
                showFormMessage('Veuillez remplir tous les champs.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Veuillez entrer une adresse email valide.', 'error');
                return;
            }

            // Simulation d'envoi
            showFormMessage('Message envoyé avec succès !', 'success');

            // Réinitialiser le formulaire
            contactForm.reset();
        });
    }
});

// Fonction de validation email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction d'affichage des messages du formulaire
function showFormMessage(message, type) {
    // Supprimer les messages existants
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Créer le message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    // Ajouter au formulaire
    const contactForm = document.querySelector('.contact-form');
    contactForm.appendChild(messageDiv);

    // Animation d'entrée
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 10);

    // Supprimer après 5 secondes
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
}

// =========================
// Animation de texte (typing effect) pour le header
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.querySelector('.texte h1');
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = '';

        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100);
    }
});

// =========================
// Animation des compétences (progress bars)
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const skillCards = document.querySelectorAll('.skill-card');

    const animateSkills = () => {
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'skillFadeIn 0.6s ease forwards';
            }, index * 200);
        });
    };

    // Animer quand la section est visible
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillsObserver.observe(skillsSection);
    }
});

// =========================
// Effet de parallaxe subtil pour l'image du header
// =========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    const imageBloc = document.querySelector('.bloc');
    if (imageBloc) {
        imageBloc.style.transform = `translateY(${rate * 0.1}px)`;
    }
});

// =========================
// Animation des boutons au clic
// =========================
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn1, .btn2, .btn-small');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Animation de ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';

            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            button.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// =========================
// Animation de chargement initiale
// =========================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');

    // Supprimer le loader après l'animation
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 1000);
});
