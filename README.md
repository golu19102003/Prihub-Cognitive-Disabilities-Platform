![Screenshot 2025-06-03 215434](https://github.com/user-attachments/assets/a88b79dc-3f98-4244-9c25-eec9d92ce5b7)
Here is a detailed `README.md` for your PriHub Cognitive Disabilities Platform, including an explanation of the main code sequences and project structure:
---
# PriHub – Cognitive Disabilities Platform
PriHub is a web platform designed to support individuals with cognitive disabilities by providing accessible resources, community support, and interactive tools. The platform emphasizes accessibility, clear communication, and user empowerment.
---
## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Main Code Sequences & Architecture](#main-code-sequences--architecture)
  - [Frontend (HTML/CSS/JS)](#frontend-htmlcssjs)
  - [Backend (Node.js/Express/OpenAI)](#backend-nodejsexpressopenai)
- [Accessibility & Cognitive Support](#accessibility--cognitive-support)
- [Authentication](#authentication)
- [Chatbot Integration](#chatbot-integration)
- [Customization](#customization)
- [License](#license)
---

## Features
- **Accessible UI**: High-contrast, dyslexia-friendly, and keyboard-navigable interface.
- **Authentication**: Email/password and social login (Google, Facebook, GitHub) via Firebase.
- **AI Chatbot**: Context-aware assistant powered by OpenAI, tailored for cognitive accessibility.
- **Cognitive Support Tools**: Text-to-speech, simplified text, high-contrast mode, focus mode, reminders, and notes.
- **Resource Directory**: Curated links, educational materials, and support group information.
- **Responsive Design**: Mobile-friendly navigation and layouts.
---

## Project Structure
```
/
├── index.html                # Main HTML file (UI, modals, navigation)
├── stylesheet.css            # All styles (responsive, accessibility, theming)
├── main.js                   # UI logic, accessibility, notifications, utilities
├── auth.js                   # Authentication logic (Firebase)
├── chatbot.js                # Chatbot UI and OpenAI integration
├── cognitive-support.js      # Cognitive support tools (TTS, notes, reminders)
├── server.js                 # Node.js backend (Express, OpenAI API)
├── package.json              # Node.js dependencies and scripts
└── .env                      # (Not included) Your OpenAI API key
```
---
## Setup & Installation
### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/prihub-cognitive-disabilities-platform.git
cd prihub-cognitive-disabilities-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start the Server
```bash
npm start
```
The app will be available at [https://soft-sunflower-5f4497.netlify.app/)].
---

## Main Code Sequences & Architecture
### Frontend (HTML/CSS/JS)
#### `index.html`
- **Layout**: Header with navigation, main content sections (Home, About, Conditions, Support, Resources, Contact), modals for login/signup/forgot password.
- **Accessibility**: Skip links, ARIA labels, semantic HTML, responsive design.
- **Scripts**: Loads `main.js`, `auth.js`, `chatbot.js`, and `cognitive-support.js`.

#### `stylesheet.css`
- **Theming**: Uses CSS variables for colors, high-contrast, and dyslexia-friendly options.
- **Responsive**: Media queries for mobile navigation and layouts.
- **Components**: Styles for modals, buttons, notifications, chatbot, and cognitive support tools.

#### `main.js`
- **UI Enhancements**: Smooth scrolling, scroll-to-top, animated typing, and emergency support button.
- **Accessibility**: Text size controls, reading guide, ARIA attributes, and keyboard navigation.
- **Notifications**: Shows feedback for user actions.
- **Form Validation**: Client-side validation for all forms.

#### `auth.js`
- **Firebase Auth**: Handles login, signup, password reset, and social logins.
- **UI Updates**: Dynamically updates the navbar based on authentication state.
- **Notifications**: Shows success/error messages for all auth actions.

#### `chatbot.js`
- **Chat UI**: Floating chat icon, expandable chat window, message log.
- **OpenAI Integration**: Sends user messages to the backend, receives and displays AI responses.
- **Accessibility**: Keyboard navigation, font size controls, text-to-speech for bot replies.

#### `cognitive-support.js`
- **Support Panel**: Floating button opens a panel with tools for reading, visual adjustments, navigation, and memory aids.
- **Text-to-Speech**: Reads page content aloud.
- **Simplified Text**: Toggles a simplified text mode.
- **High Contrast & Focus Mode**: Visual adjustments for easier reading.
- **Notes & Reminders**: Quick notes and medication reminders with local storage.

---

### Backend (Node.js/Express/OpenAI)
#### `server.js`
- **Express Server**: Serves static files and provides API endpoints.
- **OpenAI Integration**: `/api/chat` endpoint receives chat messages, maintains session context, and returns AI responses.
- **Conversation Management**: Keeps a short history per session for context.
- **Health Check**: `/api/health` endpoint for uptime monitoring.

#### `package.json`
- **Dependencies**: `express`, `openai`, `dotenv` for backend; `nodemon` for development.
---

## Accessibility & Cognitive Support
- **Skip Links**: Jump directly to main content.
- **ARIA Labels**: All interactive elements are labeled for screen readers.
- **Keyboard Navigation**: All features are accessible via keyboard.
- **Text-to-Speech**: Reads content and chatbot replies aloud.
- **High Contrast & Dyslexia Font**: Toggle for users with visual/cognitive needs.
- **Simplified Text**: Reduces reading complexity for easier comprehension.
- **Reminders & Notes**: Helps users remember important tasks.
---

## Authentication
- **Email/Password**: Standard registration and login.
- **Social Login**: Google, Facebook, and GitHub via Firebase.
- **Password Reset**: Users can request a reset link.
- **Session Management**: UI updates based on login state.
---

## Chatbot Integration
- **AI Assistant**: Powered by OpenAI, tailored for cognitive accessibility.
- **Contextual**: Maintains short-term conversation history for relevant responses.
- **Accessible**: Keyboard, screen reader, and TTS support.
---

## Customization
- **Theming**: Easily adjust colors and fonts in `stylesheet.css`.
- **Content**: Update resources, support info, and chatbot prompts in HTML/JS.
- **Backend**: Swap out OpenAI or add more endpoints as needed.
---

## License
This project is for educational and non-commercial use. Please contact the author for other uses.
---

## Contact
For questions, feedback, or accessibility suggestions, please use the contact form on the site or email the developer.
---

**PriHub – Empowering individuals with cognitive disabilities through technology and community.**

---

Great! Here’s how you can expand your README with **example screenshots** and **deployment instructions**. You can copy and paste this into your README and add your own screenshots as needed.

---

## Example Screenshots
### About Page
![Screenshot 2025-06-04 080645](https://github.com/user-attachments/assets/32461f36-7e46-4831-a87b-76d510769282)
*This welcoming the about Cognitive Information for the futuristic Conditions & Scenario.*

### Login & Signup Modal
![Screenshot 2025-06-04 081941](https://github.com/user-attachments/assets/c085735f-31df-40bb-a1d2-923db444b4e6)
![Screenshot 2025-06-04 082002](https://github.com/user-attachments/assets/ba53043b-542e-43cd-a5f2-51e7c1261fea)
*Simple, accessible authentication modals with social login options.*

### Chatbot Assistant
![Screenshot 2025-06-04 082619](https://github.com/user-attachments/assets/55b2d2e0-8dce-4721-a5bd-17f1c6597392)
*AI-powered assistant for support, resources, and guidance.*

### Cognitive Conditions
![Screenshot 2025-06-04 080703](https://github.com/user-attachments/assets/196ea8d4-fa44-46b3-a864-25d0db3f1c8d)
*To define & redirect all type of disabilities with specific Information Provider*

### Cognitive Support Tools
![Screenshot 2025-06-04 080717](https://github.com/user-attachments/assets/d327c888-06f1-48ca-818d-57c3ce2be6f9)
*Floating panel with text-to-speech, high contrast, focus mode, reminders, and notes.*

### Contact Section
![Screenshot 2025-06-04 080750](https://github.com/user-attachments/assets/c6d298ec-b943-4c55-a470-12dab18f0972)
![Screenshot 2025-06-04 080809](https://github.com/user-attachments/assets/cc458e7e-19e5-4718-be9b-1157934877aa)
*For book one to one session & appointment with the doctors.*

> **Tip:**  
> Place your screenshots in a `screenshots/` folder in your project root.  
> Update the image paths above if you use a different folder or filenames.
---
## Deployment Instructions
### Deploying Locally
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/prihub-cognitive-disabilities-platform.git
   cd prihub-cognitive-disabilities-platform
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```
   - (Optional) Set `PORT=your_port` if you want a port other than 3000.
4. **Start the server:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).
---

### Deploying to a Cloud Platform (e.g., Render, Heroku, Vercel)
1. **Push your code to GitHub or another git provider.**
2. **Create a new web service on your chosen platform.**
3. **Set environment variables:**
   - `OPENAI_API_KEY` (required)
   - `PORT` (optional)
4. **Deploy!**  
   The platform will install dependencies and start your server using `npm start`.
---

### Firebase Setup (for Authentication)
- Go to [Firebase Console](https://console.firebase.google.com/).
- Create a new project or use an existing one.
- Enable **Authentication** (Email/Password, Google, Facebook, GitHub as needed).
- Copy your Firebase config into the `<script>` block in `index.html`.
---

## Want More?
- **Add a custom domain:** Configure your DNS and update your cloud platform settings.
- **HTTPS:** Most cloud platforms provide HTTPS by default.
- **Analytics:** Add Google Analytics or similar for usage tracking.
- **Accessibility Audits:** Use tools like Lighthouse or axe to further improve accessibility.
---
If you need help with any specific deployment platform, feel free to connect with me on: Pranjal Khandelwal 
LinkedIn: https://www.linkedin.com/in/pranjal-khandelwal-1a46682a4/ 
GitHub: https://github.com/golu19102003 
Twitter: https://x.com/Pranjal76009498 
Facebook: https://www.facebook.com/profile.php?id=100095370905135 
Instagram: https://www.instagram.com/pranjal19102003_2.0/
