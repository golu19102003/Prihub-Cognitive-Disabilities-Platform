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
    left: 20px;
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
    color: #fff;
    font-size: 0.9em;
    margin-top: 5px;
  }
  
  [aria-invalid="true"] {
    border-color: #fff !important;
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

// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navbar = document.querySelector('.navbar');
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');

  function openMenu() {
    navbar.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    menuIcon.style.opacity = '0';
    menuIcon.style.transform = 'rotate(180deg)';
    closeIcon.style.opacity = '1';
    closeIcon.style.transform = 'rotate(0)';
    document.addEventListener('click', handleOutsideClick);

    // Animate nav icons sliding from menu-btn (mobile only)
    if (window.innerWidth <= 768) {
      const navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach((link, i) => {
        link.style.transition = 'none';
        link.style.opacity = '0';
        link.style.transform = 'translateX(-100px)';
        setTimeout(() => {
          link.style.transition = 'opacity 0.5s, transform 0.5s';
          link.style.opacity = '1';
          link.style.transform = 'translateX(0)';
        }, 100 + i * 80);
      });
    }
  }

  function closeMenu() {
    navbar.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    menuIcon.style.opacity = '1';
    menuIcon.style.transform = 'rotate(0)';
    closeIcon.style.opacity = '0';
    closeIcon.style.transform = 'rotate(-180deg)';
    document.removeEventListener('click', handleOutsideClick);

    // Reset nav icon styles (mobile only)
    if (window.innerWidth <= 768) {
      const navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach(link => {
        link.style.transition = '';
        link.style.opacity = '';
        link.style.transform = '';
      });
    }
  }

  function handleOutsideClick(e) {
    if (
      !navbar.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)
    ) {
      closeMenu();
    }
  }

  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the click from bubbling up
    if (navbar.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Prevent clicks on login/signup buttons from closing the menu
  const loginButton = document.querySelector('.login-button');
  const signupButton = document.querySelector('.signup-button');

  if (loginButton) {
    loginButton.addEventListener('click', (e) => {
      e.stopPropagation();
      // Your login logic here
    });
  }

  if (signupButton) {
    signupButton.addEventListener('click', (e) => {
      e.stopPropagation();
      // Your signup logic here
    });
  }
});

// Add new accessibility features
document.addEventListener('DOMContentLoaded', function() {
    // Create Quick Access Toolbar
    const quickAccessBar = document.createElement('div');
    quickAccessBar.className = 'quick-access-bar';
    quickAccessBar.innerHTML = `
        <button class="quick-btn theme-toggle" aria-label="Toggle dark mode">
            <i class="fas fa-moon"></i>
        </button>
        <button class="quick-btn dyslexia-font" aria-label="Toggle dyslexia-friendly font">
            <i class="fas fa-font"></i>
        </button>
        <button class="quick-btn translate-btn" aria-label="Translate page">
            <i class="fas fa-language"></i>
        </button>
        <button class="quick-btn reminder-btn" aria-label="Set medication reminder">
            <i class="fas fa-pills"></i>
        </button>
    `;
    document.body.appendChild(quickAccessBar);

    // Add styles for new features
    const newStyles = document.createElement('style');
    newStyles.textContent = `
        .quick-access-bar {
            position: fixed;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 10px;
            background: #012290f7;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 999;
        }

        .quick-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #fff;
            background: transparent;
            color: #fff;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            transition: all 0.3s ease;
        }

        .quick-btn:hover {
            background: #fff;
            color: #012290f7;
            transform: scale(1.1);
        }

        .quick-btn.active {
            background: #fff;
            color: #012290f7;
        }

        .dark-mode {
            background-color: #1a1a1a;
            color: #ffffff;
        }

        .dark-mode .header {
            background: #2d2d2d;
        }

        .dyslexic-font {
            font-family: 'OpenDyslexic', Arial, sans-serif !important;
        }

        @media (max-width: 768px) {
            .quick-access-bar {
                left: 10px;
                transform: translateY(-50%) scale(0.9);
            }
        }

        .reminder-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1001;
            max-width: 350px;
            width: 90%;
        }

        .reminder-modal.show {
            display: block;
            animation: modalPop 0.3s ease;
        }

        @keyframes modalPop {
            0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }

        .reminder-modal h3 {
            color: #012290f7;
            margin-bottom: 20px;
            text-align: center;
            font-size: 1.5rem;
            position: relative;
        }

        .reminder-modal .close-modal {
            position: absolute;
            top: -10px;
            right: -10px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: #000000;
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .reminder-modal .close-modal:hover {
            background: #cc0000;
            transform: scale(1.1);
        }

        .reminder-modal form {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        .reminder-modal input {
            padding: 12px;
            border: 2px solid #e1e1e1;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .reminder-modal input:focus {
            border-color: #012290f7;
            outline: none;
        }

        .reminder-modal button[type="submit"] {
            background: #012290f7;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .reminder-modal button[type="submit"]:hover {
            background: #0053b8f7;
            transform: translateY(-2px);
        }

        .reminder-modal .reminder-options {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }

        .reminder-modal .reminder-option {
            flex: 1;
            padding: 10px;
            border: 2px solid #e1e1e1;
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .reminder-modal .reminder-option:hover,
        .reminder-modal .reminder-option.active {
            border-color: #012290f7;
            background: #f0f7ff;
        }
    `;
    document.head.appendChild(newStyles);

    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('darkMode', isDark);
    });

    // Dyslexia Font Toggle
    const dyslexiaToggle = document.querySelector('.dyslexia-font');
    let dyslexiaActive = false;
    dyslexiaToggle.addEventListener('click', () => {
        dyslexiaActive = !dyslexiaActive;
        document.body.classList.toggle('dyslexic-font', dyslexiaActive);
        if (dyslexiaActive) {
            addDyslexiaStyles();
            localStorage.setItem('dyslexicFont', true);
            showNotification('Dyslexia-friendly font enabled', 'info');
        } else {
            removeDyslexiaStyles();
            localStorage.setItem('dyslexicFont', false);
            showNotification('Dyslexia-friendly font disabled', 'info');
        }
    });

    // Add text-to-speech button to quick-access-bar
    let ttsBtn = document.querySelector('.tts-btn');
    if (!ttsBtn) {
        ttsBtn = document.createElement('button');
        ttsBtn.className = 'quick-btn tts-btn';
        ttsBtn.setAttribute('aria-label', 'Read selected text aloud');
        ttsBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        document.querySelector('.quick-access-bar').appendChild(ttsBtn);
    }
    // Add stop button for TTS
    let ttsStopBtn = document.querySelector('.tts-stop-btn');
    if (!ttsStopBtn) {
        ttsStopBtn = document.createElement('button');
        ttsStopBtn.className = 'quick-btn tts-stop-btn';
        ttsStopBtn.setAttribute('aria-label', 'Stop text-to-speech');
        ttsStopBtn.innerHTML = '<i class="fas fa-stop"></i>';
        document.querySelector('.quick-access-bar').appendChild(ttsStopBtn);
    }
    ttsStopBtn.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            showNotification('Text-to-speech stopped.', 'info');
        }
    });
    ttsBtn.addEventListener('click', () => {
        const selection = window.getSelection().toString();
        if (selection) {
            speakText(selection);
        } else {
            showNotification('Select text to read aloud.', 'info');
        }
    });

    function speakText(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1;
            utterance.lang = document.documentElement.lang || 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            showNotification('Text-to-speech not supported in this browser.', 'error');
        }
    }

    function addDyslexiaStyles() {
        if (document.getElementById('dyslexia-style')) return;
        const style = document.createElement('style');
        style.id = 'dyslexia-style';
        style.textContent = `
            body.dyslexic-font, body.dyslexic-font *:not(button):not(i):not(.fa):not([class*='icon']):not([class*='btn']) {
                font-family: 'OpenDyslexic', Arial, sans-serif !important;
                background-color: #f6f6e9 !important;
                color: #222 !important;
                letter-spacing: 0.08em !important;
                word-spacing: 0.16em !important;
                line-height: 1.7 !important;
                transition: background 0.3s, color 0.3s;
            }
            body.dyslexic-font ::selection {
                background: #ffe066 !important;
                color: #222 !important;
            }
        `;
        document.head.appendChild(style);
    }
    function removeDyslexiaStyles() {
        const style = document.getElementById('dyslexia-style');
        if (style) style.remove();
    }
    // Restore user preference
    if (localStorage.getItem('dyslexicFont') === 'true') {
        dyslexiaActive = true;
        document.body.classList.add('dyslexic-font');
        addDyslexiaStyles();
    }

    // Translation Button
    const translateBtn = document.querySelector('.translate-btn');
    translateBtn.addEventListener('click', () => {
        const languages = ['en', 'es', 'fr', 'de', 'hi'];
        const currentLang = document.documentElement.lang || 'en';
        const nextLang = languages[(languages.indexOf(currentLang) + 1) % languages.length];
        document.documentElement.lang = nextLang;
        showNotification(`Language changed to ${nextLang.toUpperCase()}`, 'info');
    });

    // Enhanced Medication Reminder
    const reminderBtn = document.querySelector('.reminder-btn');
    reminderBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'reminder-modal';
        modal.innerHTML = `
            <button class="close-modal" aria-label="Close reminder modal">
                <i class="fas fa-times"></i>
            </button>
            <h3>
                <i class="fas fa-pills" style="margin-right: 10px; color: #012290f7;"></i>
                Medication Reminder
            </h3>
            <div class="reminder-options">
                <div class="reminder-option" data-frequency="daily">
                    <i class="fas fa-calendar-day"></i>
                    <p>Daily</p>
                </div>
                <div class="reminder-option" data-frequency="weekly">
                    <i class="fas fa-calendar-week"></i>
                    <p>Weekly</p>
                </div>
                <div class="reminder-option" data-frequency="custom">
                    <i class="fas fa-calendar-alt"></i>
                    <p>Custom</p>
                </div>
            </div>
            <form id="reminderForm">
                <input type="text" placeholder="Medication Name" required>
                <div class="time-input">
                    <input type="time" required>
                    <select class="reminder-repeat" style="display: none;">
                        <option value="1">Every Day</option>
                        <option value="2">Every 2 Days</option>
                        <option value="3">Every 3 Days</option>
                        <option value="7">Every Week</option>
                        <option value="14">Every 2 Weeks</option>
                        <option value="30">Every Month</option>
                        <option value="custom">Custom Days</option>
                    </select>
                </div>
                <div class="custom-days" style="display: none;">
                    <div class="weekday-selector">
                        <label><input type="checkbox" value="1"> Mon</label>
                        <label><input type="checkbox" value="2"> Tue</label>
                        <label><input type="checkbox" value="3"> Wed</label>
                        <label><input type="checkbox" value="4"> Thu</label>
                        <label><input type="checkbox" value="5"> Fri</label>
                        <label><input type="checkbox" value="6"> Sat</label>
                        <label><input type="checkbox" value="0"> Sun</label>
                    </div>
                </div>
                <div class="custom-interval" style="display: none;">
                    <div class="interval-input">
                        <label>Repeat every</label>
                        <input type="number" min="1" max="30" value="1" class="interval-number">
                        <label>days</label>
                    </div>
                    <div class="duration-input">
                        <label>For</label>
                        <input type="number" min="1" max="365" value="30" class="duration-number">
                        <label>days</label>
                    </div>
                </div>
                <button type="submit">
                    <i class="fas fa-bell"></i>
                    Set Reminder
                </button>
            </form>
        `;
        document.body.appendChild(modal);
        
        // Add styles for custom reminder options
        const customStyles = document.createElement('style');
        customStyles.textContent = `
            .time-input {
                display: flex;
                gap: 10px;
            }
            
            .reminder-repeat {
                flex: 1;
                padding: 12px;
                border: 2px solid #e1e1e1;
                border-radius: 8px;
                font-size: 1rem;
                background: white;
                color: #333;
            }
            
            .weekday-selector {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }
            
            .weekday-selector label {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 8px;
                border: 2px solid #e1e1e1;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                background: white;
                color: #333;
            }
            
            .weekday-selector label:hover {
                border-color: #012290f7;
                background: #f0f7ff;
                color: #012290f7;
            }
            
            .weekday-selector input[type="checkbox"] {
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
            
            .weekday-selector label.active {
                background: #012290f7;
                color: white;
                border-color: #012290f7;
            }
            
            .interval-input, .duration-input {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 10px 0;
                color: #333;
            }
            
            .interval-number, .duration-number {
                width: 60px;
                padding: 8px;
                border: 2px solid #e1e1e1;
                border-radius: 6px;
                text-align: center;
                background: white;
                color: #333;
            }

            .reminder-modal {
                background: white;
            }

            .reminder-modal h3 {
                color: #012290f7;
            }

            .reminder-modal form {
                color: #333;
            }

            .reminder-modal input[type="text"],
            .reminder-modal input[type="time"] {
                background: white;
                color: #333;
                border: 2px solid #e1e1e1;
            }

            .reminder-modal input[type="text"]::placeholder {
                color: #666;
            }

            .custom-days, .custom-interval {
                background: white;
                padding: 15px;
                border-radius: 8px;
                border: 2px solid #e1e1e1;
                margin-top: 10px;
            }

            .reminder-options {
                background: white;
                padding: 10px;
                border-radius: 8px;
                margin-bottom: 15px;
            }

            .reminder-option {
                background: white;
                color: #333;
            }

            .reminder-option:hover,
            .reminder-option.active {
                background: #f0f7ff;
                color: #012290f7;
            }

            .reminder-option i {
                color: #012290f7;
            }
        `;
        document.head.appendChild(customStyles);

        setTimeout(() => modal.classList.add('show'), 10);

        // Reminder options functionality
        const options = modal.querySelectorAll('.reminder-option');
        const repeatSelect = modal.querySelector('.reminder-repeat');
        const customDays = modal.querySelector('.custom-days');
        const customInterval = modal.querySelector('.custom-interval');

        options.forEach(option => {
            option.addEventListener('click', () => {
                options.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
                
                const frequency = option.dataset.frequency;
                repeatSelect.style.display = frequency === 'custom' ? 'block' : 'none';
                customDays.style.display = 'none';
                customInterval.style.display = 'none';
                
                if (frequency === 'custom') {
                    repeatSelect.value = '1';
                    updateCustomOptions('1');
                }
            });
        });

        // Handle custom repeat selection
        repeatSelect.addEventListener('change', (e) => {
            updateCustomOptions(e.target.value);
        });

        function updateCustomOptions(value) {
            customDays.style.display = value === 'custom' ? 'block' : 'none';
            customInterval.style.display = value === 'custom' ? 'block' : 'none';
        }

        // Weekday selector functionality
        const weekdayLabels = modal.querySelectorAll('.weekday-selector label');
        weekdayLabels.forEach(label => {
            label.addEventListener('click', () => {
                label.classList.toggle('active');
            });
        });

        const form = modal.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const [med, time] = form.querySelectorAll('input');
            const frequency = modal.querySelector('.reminder-option.active')?.dataset.frequency || 'daily';
            let reminderConfig = {
                medication: med.value,
                time: time.value,
                frequency: frequency
            };

            if (frequency === 'custom') {
                const repeatValue = repeatSelect.value;
                if (repeatValue === 'custom') {
                    const selectedDays = Array.from(modal.querySelectorAll('.weekday-selector input:checked'))
                        .map(cb => parseInt(cb.value));
                    const interval = modal.querySelector('.interval-number').value;
                    const duration = modal.querySelector('.duration-number').value;
                    
                    reminderConfig.customConfig = {
                        type: 'custom',
                        selectedDays,
                        interval: parseInt(interval),
                        duration: parseInt(duration)
                    };
                } else {
                    reminderConfig.customConfig = {
                        type: 'repeat',
                        days: parseInt(repeatValue)
                    };
                }
            }

            if (Notification.permission === 'granted') {
                setReminder(reminderConfig);
            } else {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        setReminder(reminderConfig);
                    }
                });
            }
            
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        function setReminder(config) {
            const now = new Date();
            const [hours, minutes] = config.time.split(':');
            const reminderTime = new Date(now.setHours(hours, minutes));
            
            if (reminderTime > now) {
                const delay = reminderTime - now;
                
                // Set initial reminder
                setTimeout(() => {
                    showMedicationNotification(config);
                }, delay);

                // Set up recurring reminders based on frequency
                if (config.frequency === 'custom' && config.customConfig) {
                    setupCustomReminders(config);
                } else if (config.frequency === 'daily') {
                    // Repeat daily
                    setInterval(() => {
                        showMedicationNotification(config);
                    }, 24 * 60 * 60 * 1000);
                } else if (config.frequency === 'weekly') {
                    // Repeat weekly
                    setInterval(() => {
                        showMedicationNotification(config);
                    }, 7 * 24 * 60 * 60 * 1000);
                }

                showNotification(`Reminder set for ${config.medication}`, 'success');
            }
        }

        function setupCustomReminders(config) {
            if (config.customConfig.type === 'custom') {
                // Set up reminders for specific days
                const checkAndNotify = () => {
                    const today = new Date().getDay();
                    if (config.customConfig.selectedDays.includes(today)) {
                        showMedicationNotification(config);
                    }
                };
                
                // Check daily at the specified time
                setInterval(checkAndNotify, 24 * 60 * 60 * 1000);
                
            } else if (config.customConfig.type === 'repeat') {
                // Set up reminders for interval-based schedule
                setInterval(() => {
                    showMedicationNotification(config);
                }, config.customConfig.days * 24 * 60 * 60 * 1000);
            }
        }

        function showMedicationNotification(config) {
            new Notification('Medication Reminder', {
                body: `Time to take ${config.medication}`,
                icon: '/favicon.ico'
            });
        }

        // Close button functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            }
        });
    });

    // Add active state for quick access buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('reminder-btn')) {
                btn.classList.toggle('active');
            }
        });
    });

    // Show notification function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // Restore user preferences
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    if (localStorage.getItem('dyslexicFont') === 'true') {
        dyslexiaActive = true;
        document.body.classList.add('dyslexic-font');
        addDyslexiaStyles();
    }

   
    // Add Accessibility Feedback Button
    let feedbackBtn = document.querySelector('.feedback-btn');
    if (!feedbackBtn) {
        feedbackBtn = document.createElement('button');
        feedbackBtn.className = 'quick-btn feedback-btn';
        feedbackBtn.setAttribute('aria-label', 'Accessibility feedback');
        feedbackBtn.innerHTML = '<i class="fas fa-comment-dots"></i>';
        document.querySelector('.quick-access-bar').appendChild(feedbackBtn);
    }
    feedbackBtn.addEventListener('click', () => {
        showFeedbackModal();
    });
    function showFeedbackModal() {
        let modal = document.getElementById('accessibilityFeedbackModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'accessibilityFeedbackModal';
            modal.className = 'modal show';
            modal.innerHTML = `
                <div class="modal-content" style="max-width:400px;">
                    <span class="close" onclick="document.getElementById('accessibilityFeedbackModal').remove()">&times;</span>
                    <h2>Accessibility Feedback</h2>
                    <form id="feedbackForm">
                        <div class="form-group">
                            <label for="feedbackText" style="text-align:center">Your feedback or suggestions:</label>
                            <textarea id="feedbackText" required style="min-height:80px;width:100%;box-sizing:border-box;bottom-margin:10px;padding:2.25rem 1.5rem;"></textarea>
                        </div>
                        <button type="submit" class="submit-btn" style="width:100%">Send</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
            document.getElementById('feedbackForm').addEventListener('submit', function(e) {
                e.preventDefault();
                showNotification('Thank you for your feedback!', 'info');
                modal.remove();
            });
        }
    }
});

// Newsletter Subscribe Functionality
// Wait for DOMContentLoaded to ensure footer exists

document.addEventListener('DOMContentLoaded', function() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (!emailInput.value.trim()) {
        showNewsletterNotification('Please enter your email address.', 'error');
        return;
      }
      // Optionally, add email validation here
      showNewsletterNotification('Successfully subscribed!', 'success');
      emailInput.value = '';
    });
  }

  function showNewsletterNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = 'newsletter-success-msg';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '18px';
    notification.style.right = '10px';
    notification.style.left = '75%';
    notification.style.textAlign = 'center' ;
    notification.style.animation = 'slideLeft .5s ease forwards';
    notification.style.animationDelay = 'calc(.2s * var(--i))';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = '#012290f7';
    notification.style.color = '#fff';
    notification.style.padding = '1rem 2rem';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '2000';
    notification.style.fontSize = '1.1rem';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }
});

// Contact form submit handler for custom success message
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  if (validateForm(form)) {
    // Show custom success message
    showContactNotification(
      'Message is successfully submitted, Thanks for choosing Prihub! our team will shortly Contact to you!',
      '#012290f7',
      '#fff'
    );
    // Remove error styles from all fields
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.removeAttribute('aria-invalid');
      const errorDiv = input.parentElement.querySelector('.error-message');
      if (errorDiv) errorDiv.remove();
      input.style.borderColor = '';
    });
    // Optionally, reset the form
    form.reset();
  }
}

function showContactNotification(message, bgColor, color) {
  const notification = document.createElement('div');
  notification.className = 'contact-success-msg';
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.bottom = '18px';
  notification.style.right = '10px';
  notification.style.left = '20%';
  notification.style.textAlign = 'center';
  notification.style.animation = 'slideLeft .5s ease forwards';
    notification.style.animationDelay = 'calc(.2s * var(--i))';
    notification.style.transform = 'translateX(-50%)';
  notification.style.background = '#012290f7';
  notification.style.color = '#fff';
  notification.style.padding = '1rem 2rem';
  notification.style.borderRadius = '8px';
  notification.style.zIndex = '2000';
  notification.style.fontSize = '1.1rem';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  notification.style.animation = 'slideLeft .5s ease forwards';
  notification.style.animationDelay = 'calc(.2s * var(--i))';
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 4000);
}

// Breadcrumb update logic
function updateBreadcrumb() {
  const pathMap = {
    '#home': 'Home',
    '#about': 'Home > About',
    '#conditions': 'Home > Conditions',
    '#support': 'Home > Support',
    '#resources': 'Home > Resources',
    '#contact': 'Home > Contact'
  };
  let hash = window.location.hash || '#home';
  const breadcrumb = document.getElementById('breadcrumb-path');
  if (breadcrumb) {
    breadcrumb.textContent = pathMap[hash] || 'Home';
  }
}
window.addEventListener('hashchange', updateBreadcrumb);
document.addEventListener('DOMContentLoaded', updateBreadcrumb);

// Auto-save and restore for contact form fields
function setupContactFormAutoSave() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const fields = form.querySelectorAll('input, textarea, select');
  // Restore
  fields.forEach(field => {
    const saved = localStorage.getItem('contact_' + field.id);
    if (saved) field.value = saved;
    field.addEventListener('input', () => {
      localStorage.setItem('contact_' + field.id, field.value);
    });
  });
  // Clear on submit
  form.addEventListener('submit', () => {
    fields.forEach(field => localStorage.removeItem('contact_' + field.id));
  });
}
document.addEventListener('DOMContentLoaded', setupContactFormAutoSave);
