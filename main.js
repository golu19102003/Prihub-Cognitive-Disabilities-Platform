var typed = new Typed(".text", {
  strings: [ "Expert Support",
    "Learning Resources",
    "Cognitive Strategies",
    "Community Support",
    "Professional Help"],
  typeSpeed: 100,
  backSpeed:100,
  backDelay: 1000,
  loop: true
});
document.addEventListener('DOMContentLoaded', function() {
  // Add skip link for keyboard navigation
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);

 // Add ARIA labels to all interactive elements
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  interactiveElements.forEach(element => {
    if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
      element.setAttribute('aria-label', element.textContent || element.placeholder || '');
    }
  });
    // Add role attributes to main landmarks
  document.querySelector('header').setAttribute('role', 'banner');
  document.querySelector('nav').setAttribute('role', 'navigation');
  document.querySelector('main').setAttribute('role', 'main');
  document.querySelector('footer').setAttribute('role', 'contentinfo');
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Text Size Adjustment
function createTextSizeControls() {
  const controls = document.createElement('div');
  controls.className = 'text-size-controls';
  controls.innerHTML = `
    <button aria-label="Decrease text size" onclick="adjustTextSize(-1)">A-</button>
    <button aria-label="Reset text size" onclick="resetTextSize()">Reset</button>
    <button aria-label="Increase text size" onclick="adjustTextSize(1)">A+</button>
  `;
  document.body.appendChild(controls);
}

let currentTextSize = 100;
function adjustTextSize(direction) {
  currentTextSize += direction * 10;
  currentTextSize = Math.max(70, Math.min(150, currentTextSize));
  document.body.style.fontSize = `${currentTextSize}%`;
  localStorage.setItem('textSize', currentTextSize);
}

function resetTextSize() {
  currentTextSize = 100;
  document.body.style.fontSize = '100%';
  localStorage.removeItem('textSize');
}
// Reading Guide
function createReadingGuide() {
  const guide = document.createElement('div');
  guide.className = 'reading-guide';
  guide.style.display = 'none';
  document.body.appendChild(guide);

  document.addEventListener('mousemove', (e) => {
    if (guide.style.display === 'block') {
      guide.style.top = `${e.pageY - 20}px`;
    }
  });
}

// Toggle Reading Guide
function toggleReadingGuide() {
  const guide = document.querySelector('.reading-guide');
  guide.style.display = guide.style.display === 'none' ? 'block' : 'none';
}

// Emergency Support Button
const emergencyBtn = document.createElement('button');
emergencyBtn.innerHTML = '🆘 24/7 Crisis Support';
emergencyBtn.className = 'emergency-button';
emergencyBtn.setAttribute('aria-label', 'Access emergency crisis support');
emergencyBtn.onclick = function() {
  window.location.href = 'tel:988';
};
document.body.appendChild(emergencyBtn);
// Form Validation with Clear Error Messages
function validateForm(formElement) {
  const inputs = formElement.querySelectorAll('input, textarea, select');
  let isValid = true;
  
  inputs.forEach(input => {
    if (input.hasAttribute('required') && !input.value.trim()) {
      isValid = false;
      showError(input, 'This field is required');
    } else if (input.type === 'email' && input.value) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(input.value)) {
        isValid = false;
        showError(input, 'Please enter a valid email address');
      }
    }
  });
  
  return isValid;
}
function showError(input, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.setAttribute('role', 'alert');
  errorDiv.textContent = message;
  
  const existingError = input.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  input.parentElement.appendChild(errorDiv);
  input.setAttribute('aria-invalid', 'true');
}

// Initialize Accessibility Features
document.addEventListener('DOMContentLoaded', function() {
  createTextSizeControls();
  createReadingGuide();
   // Restore text size preference
  const savedTextSize = localStorage.getItem('textSize');
  if (savedTextSize) {
    document.body.style.fontSize = `${savedTextSize}%`;
    currentTextSize = parseInt(savedTextSize);
  }
  
  // Add form validation
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(form)) {
        // Process the form
        console.log('Form submitted successfully');
      }
    });
  });
});
// Add styles for accessibility features
const style = document.createElement('style');
style.textContent = `
  .text-size-controls {
    position: fixed;
    top: 100px;
    right: 20px;
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 1000;
  }
  
  .text-size-controls button {
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #4A90E2;
    background: white;
    border-radius: 3px;
    cursor: pointer;
  }
  
  .reading-guide {
    position: absolute;
    left: 0;
    right: 0;
    height: 40px;
    background: rgba(255,255,0,0.1);
    pointer-events: none;
    z-index: 999;
  }
  
  .error-message {
    color: #E74C3C;
    font-size: 0.9em;
    margin-top: 5px;
  }
  
  [aria-invalid="true"] {
    border-color: #E74C3C !important;
  }
`;
document.head.appendChild(style);

// Scroll to top functionality
const scrollTopBtn = document.querySelector('.top');

// Show/hide scroll button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Smooth scroll to top when clicked
scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Menu Button Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');

mobileMenuBtn.addEventListener('click', () => {
    // Toggle active class on navbar
    const navbar = mobileMenuBtn.closest('.navbar');
    navbar.classList.toggle('active');

    // Rotate button and toggle icons
    if (navbar.classList.contains('active')) {
        menuIcon.style.opacity = '0';
        menuIcon.style.transform = 'rotate(180deg) scale(0)';
        closeIcon.style.opacity = '1';
        closeIcon.style.transform = 'rotate(0) scale(1)';
        mobileMenuBtn.style.transform = 'rotate(180deg)';
    } else {
        menuIcon.style.opacity = '1';
        menuIcon.style.transform = 'rotate(0) scale(1)';
        closeIcon.style.opacity = '0';
        closeIcon.style.transform = 'rotate(-180deg) scale(0)';
        mobileMenuBtn.style.transform = 'rotate(0)';
    }
});

