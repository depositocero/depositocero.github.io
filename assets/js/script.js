// DEPÓSITO CERO — Script principal

// TYPING ANIMATION - ESCRIBE UNA VEZ Y QUEDA FIJO
function typeWriter() {
  const titleElement = document.getElementById('typingTitle');
  const subtitleElement = document.getElementById('typingSubtitle');

  const fullTitle = 'DEPÓSITO CERO';
  let currentText = '';
  let index = 0;

  // Esperar 2 segundos antes de empezar
  setTimeout(() => {
    function typeChar() {
      if (index < fullTitle.length) {
        currentText += fullTitle.charAt(index);
        titleElement.textContent = currentText;
        index++;

        // Error simulado en posición 10 (después de "DEPÓSITO C")
        if (index === 10 && titleElement.textContent === 'DEPÓSITO C') {
          setTimeout(() => {
            // Escribir carácter errado
            currentText += 'X';
            titleElement.textContent = currentText;

            // Borrar el carácter errado
            setTimeout(() => {
              currentText = currentText.slice(0, -1);
              titleElement.textContent = currentText;

              // Reescribir el carácter correcto
              setTimeout(() => {
                currentText += 'E';
                titleElement.textContent = currentText;
                index++;
                setTimeout(typeChar, 60);
              }, 150);
            }, 300);
          }, 150);
          return;
        }

        setTimeout(typeChar, Math.random() * 80 + 40);
      } else {
        // Terminó la escritura - cursor parpadea indefinidamente
        // El cursor ya está en el HTML con su animación CSS
      }
    }

    typeChar();
  }, 2000);
}

// MENÚ DROPDOWN
document.addEventListener('DOMContentLoaded', function() {

  // Iniciar animación de escritura
  typeWriter();
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navSubmenuToggle = document.querySelector('.nav-submenu-toggle');
  const submenu = document.querySelector('.submenu');

  // Toggle menú principal
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }

  // Toggle submenu botellas
  if (navSubmenuToggle) {
    navSubmenuToggle.addEventListener('click', function() {
      submenu.classList.toggle('active');
    });
  }

  // Cerrar menú al hacer click afuera
  document.addEventListener('click', function(event) {
    if (!event.target.closest('header') && navMenu) {
      navMenu.classList.remove('active');
    }
  });

  // CAROUSEL - Solo ejecutar si hay slides
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');

  if (slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(n) {
      if (n >= totalSlides) currentSlide = 0;
      if (n < 0) currentSlide = totalSlides - 1;

      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    }

    function nextSlide() {
      currentSlide++;
      showSlide(currentSlide);
    }

    function goToSlide(n) {
      currentSlide = n;
      showSlide(currentSlide);
    }

    // Auto advance carousel every 5 seconds
    setInterval(nextSlide, 5000);

    // Dots click handlers
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Initialize
    showSlide(0);
  }

  // MAP - Si existen datos de ubicaciones
  const waterPointsData = [
    {
      name: 'Arroyo Solís Grande',
      coords: [-33.7167, -55.3667],
      info: 'Límite Canelones/Maldonado'
    },
    {
      name: 'Laguna del Sauce',
      coords: [-34.3167, -55.2667],
      info: 'Agua potable'
    },
    {
      name: 'Playa Solís',
      coords: [-34.3667, -55.3667],
      info: 'Océano'
    },
    {
      name: 'Afluente Las Flores',
      coords: [-34.1667, -55.2333],
      info: 'Curso de agua'
    },
    {
      name: 'Cuneta Ruta 9',
      coords: [-34.25, -55.1833],
      info: 'Infraestructura vial'
    },
    {
      name: 'Cañada de Aparicio',
      coords: [-33.9167, -55.1333],
      info: 'Curso de agua'
    },
    {
      name: 'Playa Brava, José Ignacio',
      coords: [-34.3333, -54.8833],
      info: 'Océano'
    },
    {
      name: 'Laguna Garzón',
      coords: [-34.4, -55.0333],
      info: 'Laguna costera'
    }
  ];

  // Highlight point when clicking on water-point
  const waterPointElements = document.querySelectorAll('.water-point');
  waterPointElements.forEach((element, index) => {
    element.addEventListener('click', () => {
      waterPointElements.forEach(el => el.style.opacity = '0.6');
      element.style.opacity = '1';
    });
  });
});

// CAROUSEL PHOTO NAVIGATION
function nextPhoto(btn) {
  const carousel = btn.closest('.carousel-wrapper');
  if (!carousel) return;

  const currentSpan = carousel.querySelector('.carousel-current');
  const totalSpan = carousel.querySelector('.carousel-total');
  const mainImg = carousel.querySelector('.carousel-image');
  const thumbs = carousel.querySelectorAll('.carousel-thumb');
  const dots = carousel.querySelectorAll('.carousel-dot');

  let current = parseInt(currentSpan.textContent) - 1;
  let next = (current + 1) % thumbs.length;

  // Actualizar imagen
  const nextThumb = thumbs[next];
  const nextSrc = nextThumb.src;
  mainImg.src = nextSrc;

  // Actualizar estados activos
  thumbs.forEach((t, i) => t.classList.toggle('active', i === next));
  dots.forEach((d, i) => d.classList.toggle('active', i === next));
  currentSpan.textContent = next + 1;
}

function previousPhoto(btn) {
  const carousel = btn.closest('.carousel-wrapper');
  if (!carousel) return;

  const currentSpan = carousel.querySelector('.carousel-current');
  const totalSpan = carousel.querySelector('.carousel-total');
  const mainImg = carousel.querySelector('.carousel-image');
  const thumbs = carousel.querySelectorAll('.carousel-thumb');
  const dots = carousel.querySelectorAll('.carousel-dot');

  let current = parseInt(currentSpan.textContent) - 1;
  let total = thumbs.length;
  let prev = (current - 1 + total) % total;

  // Actualizar imagen
  const prevThumb = thumbs[prev];
  const prevSrc = prevThumb.src;
  mainImg.src = prevSrc;

  // Actualizar estados activos
  thumbs.forEach((t, i) => t.classList.toggle('active', i === prev));
  dots.forEach((d, i) => d.classList.toggle('active', i === prev));
  currentSpan.textContent = prev + 1;
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
