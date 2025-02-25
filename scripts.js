// Menu mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Bouton "Retour en haut"
const backToTopBtn = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Slider Témoignages (rotation automatique)
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Navigation par clic sur les points
dots.forEach(dot => {
  dot.addEventListener('click', (e) => {
    currentSlide = Number(e.target.getAttribute('data-index'));
    showSlide(currentSlide);
  });
});

// Auto-rotation toutes les 5 secondes
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 5000);

// Intersection Observer pour appliquer l'animation "fade-in"
const animatedElements = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

animatedElements.forEach((el) => observer.observe(el));

// Envoyer un message
document.addEventListener('DOMContentLoaded', function() {
  emailjs.init('your_user_id');

  document.querySelector('.contact-form form').addEventListener('submit', function(event) {
      event.preventDefault();

      const serviceID = 'your_service_id';
      const templateID = 'your_template_id';

      emailjs.sendForm(serviceID, templateID, this)
        .then(function() {
            alert('Message envoyé avec succès!');
        }, function(error) {
            alert('Erreur lors de l\'envoi du message: ', error);
        });
  });
});
