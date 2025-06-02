class CognitiveSupport {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 1;
        this.isSpeaking = false;
        this.speechUtterance = null;
        this.currentButton = null;
        this.synth = window.speechSynthesis;
        this.createSupportInterface();
        this.setupEventListeners();
    }

    createSupportInterface() {
        const supportContainer = document.createElement('div');
        supportContainer.className = 'cognitive-support-container';
        supportContainer.innerHTML = `
            <button class="support-icon" id="supportIcon" role="button" aria-label="Open cognitive support tools" tabindex="0">
                <i class="fas fa-brain" aria-hidden="true"></i>
                <span class="sr-only">Cognitive Support Tools</span>
            </button>
            <div class="support-panel" id="supportPanel" role="dialog" aria-labelledby="supportTitle">
                <div class="support-header">
                    <h3 id="supportTitle">Cognitive Support Tools</h3>
                    <button class="close-btn" style="width:25px; height:25px;" id="closeSupport" aria-label="Close support panel">
                        <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                </div>
                <div class="support-content">
                    <div class="support-section">
                        <h4>Reading Assistance</h4>
                        <button class="support-btn" id="textToSpeech">
                            <i class="fas fa-volume-up"></i>
                            Read Page Aloud
                        </button>
                        <button class="support-btn" id="stopSpeech" style="display: none;">
                            <i class="fas fa-stop"></i>
                            Stop Reading
                        </button>
                        <button class="support-btn" id="resumeSpeech" style="display: none;">
                            <i class="fas fa-play"></i>
                            Resume Reading
                        </button>
                        <button class="support-btn" id="simplifyText">
                            <i class="fas fa-text-height"></i>
                            Simplify Text
                        </button>
                    </div>
                    <div class="support-section">
                        <h4>Visual Adjustments</h4>
                        <button class="support-btn" id="increaseContrast">
                            <i class="fas fa-adjust"></i>
                            High Contrast
                        </button>
                        <button class="support-btn" id="focusMode">
                            <i class="fas fa-eye"></i>
                            Focus Mode
                        </button>
                    </div>
                    <div class="support-section">
                        <h4>Navigation Help</h4>
                        <div class="breadcrumb" id="pageBreadcrumb" role="navigation">
                            <span>You are here: </span>
                            <span id="currentPath">Home</span>
                        </div>
                        <div class="progress-indicator" role="progressbar" aria-valuemin="1" aria-valuemax="5" aria-valuenow="1">
                            <span>Step <span id="currentStep">1</span> of <span id="totalSteps">5</span></span>
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                    <div class="support-section">
                        <h4>Memory Aids</h4>
                        <button class="support-btn" id="takeNotes">
                            <i class="fas fa-sticky-note"></i>
                            Quick Notes
                        </button>
                        <button class="support-btn" id="reminder">
                            <i class="fas fa-bell"></i>
                            Set Reminder
                        </button>
                    </div>
                </div>
            </div>
            <div class="notes-panel" id="notesPanel" hidden>
                <div class="notes-header">
                    <h4>Quick Notes</h4>
                    <button class="close-btn" id="closeNotes">×</button>
                </div>
                <textarea id="notesArea" placeholder="Type your notes here..."></textarea>
                <button class="save-btn" id="saveNotes">Save Notes</button>
            </div>
        `;
        document.body.appendChild(supportContainer);
    }

    setupEventListeners() {
        const supportIcon = document.getElementById('supportIcon');
        const supportPanel = document.getElementById('supportPanel');
        const closeSupport = document.getElementById('closeSupport');
        const textToSpeech = document.getElementById('textToSpeech');
        const stopSpeech = document.getElementById('stopSpeech');
        const resumeSpeech = document.getElementById('resumeSpeech');
        const simplifyText = document.getElementById('simplifyText');
        const increaseContrast = document.getElementById('increaseContrast');
        const focusMode = document.getElementById('focusMode');
        const takeNotes = document.getElementById('takeNotes');
        const notesPanel = document.getElementById('notesPanel');
        const closeNotes = document.getElementById('closeNotes');
        const saveNotes = document.getElementById('saveNotes');

        supportIcon.addEventListener('click', () => this.togglePanel(supportPanel));
        closeSupport.addEventListener('click', () => this.togglePanel(supportPanel));

        textToSpeech.addEventListener('click', () => this.startReading(textToSpeech));
        stopSpeech.addEventListener('click', () => this.stopReading());
        resumeSpeech.addEventListener('click', () => this.resumeReading());
        simplifyText.addEventListener('click', () => this.toggleSimplifiedText());
        increaseContrast.addEventListener('click', () => this.toggleHighContrast());
        focusMode.addEventListener('click', () => this.toggleFocusMode());
        takeNotes.addEventListener('click', () => this.toggleNotesPanel());
        closeNotes.addEventListener('click', () => this.toggleNotesPanel());
        saveNotes.addEventListener('click', () => this.saveUserNotes());

        // Keyboard navigation
        supportIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.togglePanel(supportPanel);
            }
        });

        // Update breadcrumb on page load and navigation
        this.updateBreadcrumb();
        window.addEventListener('popstate', () => this.updateBreadcrumb());
    }

    togglePanel(panel) {
        panel.classList.toggle('active');
        const isVisible = panel.classList.contains('active');
        panel.setAttribute('aria-hidden', !isVisible);
    }

    startReading(button) {
        if (!('speechSynthesis' in window)) {
            this.showNotification('Text-to-speech is not supported in your browser', 'error');
            return;
        }

        if (this.isSpeaking) {
            return;
        }

        const mainContent = document.querySelector('.home-content, .about-text, .conditions, .services-list');
        if (!mainContent) {
            this.showNotification('No content found to read', 'error');
            return;
        }

        const textToRead = mainContent.textContent.trim();
        if (!textToRead) {
            this.showNotification('No text found to read', 'error');
            return;
        }

        // Create and configure speech utterance
        this.speechUtterance = new SpeechSynthesisUtterance(textToRead);
        this.speechUtterance.rate = 1.0;
        this.speechUtterance.pitch = 1.0;
        this.speechUtterance.volume = 1.0;
        this.speechUtterance.lang = 'en-US';

        // Set up event handlers
        this.speechUtterance.onend = () => {
            this.resetButtons();
        };

        this.speechUtterance.onpause = () => {
            document.getElementById('textToSpeech').style.display = 'none';
            document.getElementById('stopSpeech').style.display = 'none';
            document.getElementById('resumeSpeech').style.display = 'block';
        };

        this.speechUtterance.onresume = () => {
            document.getElementById('textToSpeech').style.display = 'none';
            document.getElementById('resumeSpeech').style.display = 'none';
            document.getElementById('stopSpeech').style.display = 'block';
        };

        this.speechUtterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            this.showNotification('Error while reading text', 'error');
            this.resetButtons();
        };

        // Update button states
        document.getElementById('textToSpeech').style.display = 'none';
        document.getElementById('stopSpeech').style.display = 'block';
        document.getElementById('resumeSpeech').style.display = 'none';

        // Start speaking
        speechSynthesis.speak(this.speechUtterance);
        this.isSpeaking = true;
        this.showNotification('Reading page content...', 'info');
    }

    stopReading() {
        if (this.speechUtterance) {
            this.synth.pause();
            const controls = document.getElementById('textToSpeech').closest('.read-aloud-controls');
            document.getElementById('textToSpeech').style.display = 'none';
            document.getElementById('stopSpeech').style.display = 'none';
            document.getElementById('resumeSpeech').style.display = 'block';
            this.showNotification('Reading paused', 'info');
        }
    }

    resumeReading() {
        if (this.speechUtterance) {
            this.synth.resume();
            document.getElementById('textToSpeech').style.display = 'none';
            document.getElementById('resumeSpeech').style.display = 'none';
            document.getElementById('stopSpeech').style.display = 'block';
            this.isSpeaking = true;
            this.showNotification('Resuming reading...', 'info');
        }
    }

    resetButtons() {
        document.getElementById('textToSpeech').style.display = 'block';
        document.getElementById('stopSpeech').style.display = 'none';
        document.getElementById('resumeSpeech').style.display = 'none';
        this.speechUtterance = null;
        this.isSpeaking = false;
    }

    toggleSimplifiedText() {
        document.body.classList.toggle('simplified-text');
        const isSimplified = document.body.classList.contains('simplified-text');
        this.showNotification(
            isSimplified ? 'Text simplified' : 'Original text restored',
            'info'
        );
    }

    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        const isHighContrast = document.body.classList.contains('high-contrast');
        this.showNotification(
            isHighContrast ? 'High contrast enabled' : 'Normal contrast restored',
            'info'
        );
    }

    toggleFocusMode() {
        document.body.classList.toggle('focus-mode');
        const isFocusMode = document.body.classList.contains('focus-mode');
        this.showNotification(
            isFocusMode ? 'Focus mode enabled' : 'Focus mode disabled',
            'info'
        );
    }

    toggleNotesPanel() {
        const notesPanel = document.getElementById('notesPanel');
        const isHidden = notesPanel.hidden;
        notesPanel.hidden = !isHidden;
        
        if (!isHidden) {
            this.saveUserNotes();
        }
    }

    saveUserNotes() {
        const notesArea = document.getElementById('notesArea');
        const notes = notesArea.value;
        localStorage.setItem('userNotes', notes);
        this.showNotification('Notes saved successfully', 'success');
    }

    updateBreadcrumb() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        const breadcrumb = document.getElementById('currentPath');
        
        if (breadcrumb) {
            breadcrumb.textContent = pathSegments.length ? pathSegments.join(' > ') : 'Home';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cognitive-notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    updateProgress(currentStep, totalSteps) {
        this.currentStep = currentStep;
        this.totalSteps = totalSteps;
        
        const currentStepElement = document.getElementById('currentStep');
        const totalStepsElement = document.getElementById('totalSteps');
        const progressBar = document.querySelector('.progress-bar');
        
        if (currentStepElement && totalStepsElement && progressBar) {
            currentStepElement.textContent = currentStep;
            totalStepsElement.textContent = totalSteps;
            progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
        }
    }
}

// Initialize cognitive support features
window.addEventListener('load', () => {
    window.cognitiveSupport = new CognitiveSupport();
});

// Clean up when leaving the page
window.addEventListener('beforeunload', () => {
    if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
    }
}); 