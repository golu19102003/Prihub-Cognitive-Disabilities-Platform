const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize OpenAI with error handling
let openai;
try {
    if (!process.env.OPENAI_API_KEY) {
        console.error('OPENAI_API_KEY is not set in .env file');
        throw new Error('OpenAI API key is missing');
    }
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY
    });
    openai = new OpenAIApi(configuration);
    console.log('OpenAI initialized successfully');
} catch (error) {
    console.error('Error initializing OpenAI:', error);
}

// Store conversation history (in-memory storage - consider using a database for production)
const conversations = new Map();

const systemPrompt = `You are a helpful assistant for PriHub, a platform dedicated to supporting individuals with cognitive disabilities.

Your responses should follow these guidelines:
- Use simple, clear language (aim for 6th-grade reading level)
- Break information into small, digestible chunks
- Use bullet points for lists
- Avoid jargon or complex terminology
- Provide examples when explaining concepts
- Be patient and supportive
- Keep responses concise and focused
- Use positive, encouraging language
- Offer clear next steps when appropriate

Key areas of support:
- Learning disabilities
- ADHD
- Autism Spectrum
- Memory disorders
- Developmental disorders
- Daily living skills
- Educational strategies
- Emotional support`;

// Chat endpoint with enhanced error handling and conversation management
app.post('/api/chat', async (req, res) => {
    console.log('Received chat request:', req.body);
    
    try {
        const { message, sessionId } = req.body;
        
        if (!message) {
            console.error('No message provided');
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!openai) {
            console.error('OpenAI not initialized');
            return res.status(500).json({ error: 'OpenAI service not available' });
        }

        // Get or initialize conversation history
        let conversationHistory = conversations.get(sessionId) || [];
        
        // Prepare messages for the API call
        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...conversationHistory,
            { role: "user", content: message }
        ];

        // Make API call with error handling
        console.log('Sending request to OpenAI...');
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 250,
            temperature: 0.7,
            presence_penalty: 0.6,
            frequency_penalty: 0.6,
        });

        console.log('Received response from OpenAI');
        
        if (!completion.data || !completion.data.choices || !completion.data.choices[0]) {
            console.error('Invalid response from OpenAI:', completion);
            return res.status(500).json({ error: 'Invalid response from AI service' });
        }

        const assistantResponse = completion.data.choices[0].message;
        console.log('Sending response back to client:', assistantResponse.content);
        
        // Update conversation history
        conversationHistory.push(
            { role: "user", content: message },
            assistantResponse
        );

        // Keep only last 10 messages to manage context window
        if (conversationHistory.length > 10) {
            conversationHistory = conversationHistory.slice(-10);
        }

        // Save updated history
        conversations.set(sessionId, conversationHistory);

        // Send response
        res.json({ 
            response: assistantResponse.content,
            sessionId: sessionId
        });

    } catch (error) {
        console.error('Error in chat endpoint:', error.response?.data || error.message);
        
        // Provide more specific error messages
        if (error.response?.status === 429) {
            res.status(429).json({ error: 'Too many requests. Please try again later.' });
        } else if (error.response?.status === 401) {
            res.status(401).json({ error: 'API key error. Please check your OpenAI API key.' });
        } else {
            res.status(500).json({ 
                error: 'Failed to get AI response',
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 