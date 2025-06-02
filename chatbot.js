class ChatBot {
    constructor() {
        this.createChatInterface();
        this.messages = [];
        this.sessionId = this.generateSessionId();
        this.isProcessing = false;
    }

    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9);
    }

    createChatInterface() {
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        chatContainer.innerHTML = `
            <div class="chat-icon" id="chatIcon" role="button" aria-label="Open chat assistant" tabindex="0">
                <i class="fas fa-robot" aria-hidden="true"></i>
                <span class="sr-only">Chat with PriHub Assistant</span>
            </div>
            <div class="chat-box" id="chatBox" role="dialog" aria-labelledby="chatTitle">
                <div class="chat-header">
                    <h3 id="chatTitle">PriHub Assistant</h3>
                    <div class="chat-controls">
                        <button class="font-size-btn" id="decreaseFontBtn" aria-label="Decrease font size">A-</button>
                        <button class="font-size-btn" id="increaseFontBtn" aria-label="Increase font size">A+</button>
                        <button class="minimize-btn" id="minimizeChat" aria-label="Minimize chat">
                            <i class="fas fa-minus" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                <div class="chat-messages" id="chatMessages" role="log" aria-live="polite">
                    <div class="bot-message" role="article">
                        <div class="message-content">
                            <p>Hello! I'm your PriHub assistant. I'm here to help you with:</p>
                            <ul>
                                <li>Information about cognitive disabilities</li>
                                <li>Support resources</li>
                                <li>Daily living guidance</li>
                            </ul>
                            <p>How can I assist you today?</p>
                        </div>
                    </div>
                </div>
                <div class="chat-input">
                    <input 
                        type="text" 
                        id="userInput" 
                        placeholder="Type your message..." 
                        aria-label="Type your message"
                        autocomplete="off"
                    >
                    <button id="sendMessage" aria-label="Send message">
                        <i class="fas fa-paper-plane" aria-hidden="true"></i>
                        <span class="sr-only">Send</span>
                    </button>
                </div>
                <div class="chat-status" id="chatStatus" role="status" aria-live="polite"></div>
                <div class="chat-error" id="chatError" role="alert"></div>
            </div>
        `;
        document.body.appendChild(chatContainer);
        this.setupEventListeners();
        this.setupAccessibilityFeatures();
    }

    setupEventListeners() {
        const chatIcon = document.getElementById('chatIcon');
        const chatBox = document.getElementById('chatBox');
        const minimizeChat = document.getElementById('minimizeChat');
        const sendMessage = document.getElementById('sendMessage');
        const userInput = document.getElementById('userInput');

        chatIcon.addEventListener('click', () => {
            chatBox.style.display = 'flex';
            chatIcon.style.display = 'none';
            userInput.focus();
        });

        minimizeChat.addEventListener('click', () => {
            chatBox.style.display = 'none';
            chatIcon.style.display = 'flex';
        });

        sendMessage.addEventListener('click', () => this.handleUserMessage());
        
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleUserMessage();
            }
        });

        // Add accessibility keyboard support
        chatBox.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                chatBox.style.display = 'none';
                chatIcon.style.display = 'flex';
            }
        });
    }

    setupAccessibilityFeatures() {
        const chatBox = document.getElementById('chatBox');
        const userInput = document.getElementById('userInput');
        const increaseFontBtn = document.getElementById('increaseFontBtn');
        const decreaseFontBtn = document.getElementById('decreaseFontBtn');

        // Font size adjustment
        let currentFontSize = 16;
        const minFontSize = 14;
        const maxFontSize = 24;

        increaseFontBtn.addEventListener('click', () => {
            if (currentFontSize < maxFontSize) {
                currentFontSize += 2;
                chatBox.style.fontSize = `${currentFontSize}px`;
            }
        });

        decreaseFontBtn.addEventListener('click', () => {
            if (currentFontSize > minFontSize) {
                currentFontSize -= 2;
                chatBox.style.fontSize = `${currentFontSize}px`;
            }
        });

        // Keyboard navigation
        document.getElementById('chatIcon').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                chatBox.style.display = 'flex';
                document.getElementById('chatIcon').style.display = 'none';
                userInput.focus();
            }
        });

        // Add progress announcements for screen readers
        this.announceProgress = (message) => {
            const status = document.getElementById('chatStatus');
            status.textContent = message;
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        };
    }

    async handleUserMessage() {
        if (this.isProcessing) {
            return;
        }

        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();

        if (!message) return;

        this.isProcessing = true;
        const sendButton = document.getElementById('sendMessage');
        sendButton.disabled = true;
        userInput.disabled = true;

        try {
            // Clear any previous errors
            this.showError('');

            // Add user message to chat
            this.addMessageToChat('user', message);
            userInput.value = '';

            // Show typing indicator
            const typingIndicator = this.addTypingIndicator();

            // Get AI response
            const response = await this.getAIResponse(message);
            
            // Remove typing indicator and add AI response
            typingIndicator.remove();
            this.addMessageToChat('bot', response);

            // Text-to-speech for accessibility
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(response);
                utterance.rate = 0.9;
                utterance.pitch = 1;
                speechSynthesis.speak(utterance);
            }

        } catch (error) {
            console.error('Chat error:', error);
            typingIndicator?.remove();
            this.showError(error.message || 'Failed to get response. Please try again.');
        } finally {
            this.isProcessing = false;
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus();
        }
    }

    addMessageToChat(sender, message) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
        messageDiv.setAttribute('role', 'article');
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Convert URLs to accessible links and format lists
        const formattedMessage = message
            .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" aria-label="Opens in new tab">$1</a>')
            .replace(/\n- /g, '</li><li>')
            .replace(/\n/g, '<br>');
        
        if (formattedMessage.includes('<li>')) {
            messageContent.innerHTML = `<ul>${formattedMessage}</ul>`;
        } else {
            messageContent.innerHTML = formattedMessage;
        }
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Announce new messages for screen readers
        if (sender === 'bot') {
            this.announceProgress('New message from assistant');
        }
    }

    addTypingIndicator() {
        const chatMessages = document.getElementById('chatMessages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-message typing';
        typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }

    showStatus(message, type = 'info') {
        const statusDiv = document.getElementById('chatStatus');
        statusDiv.textContent = message;
        statusDiv.className = `chat-status ${type}`;
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'chat-status';
        }, 3000);
    }

    showError(message) {
        const errorDiv = document.getElementById('chatError');
        errorDiv.textContent = message;
        errorDiv.style.display = message ? 'block' : 'none';
    }

    async getAIResponse(message) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    message,
                    sessionId: this.sessionId
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get response');
            }

            const data = await response.json();
            if (!data.response) {
                throw new Error('Invalid response from server');
            }

            return data.response;
        } catch (error) {
            console.error('API error:', error);
            throw error;
        }
    }
}

// Initialize chatbot when the page loads
window.addEventListener('load', () => {
    new ChatBot();
}); 