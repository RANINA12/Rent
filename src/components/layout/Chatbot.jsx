


import React, { useState, useRef, useEffect } from 'react';

const Chatbot = ({ closeChatbot }) => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you with your rental needs today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        // --- Asli AI Logic (Gemini API Call) ---
        try {
            let chatHistory = [];
            // Hum pichle messages ko context ke liye bhej sakte hain, lekin abhi ke liye simple rakhte hain
            chatHistory.push({ role: "user", parts: [{ text: currentInput }] });

            const payload = { contents: chatHistory };
            const apiKey = ""; // Agar aapke paas API key hai to yahan daalein, warna khaali chhod dein
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();

            // API se aaye response ko aasaani se padhne ke liye
            const botText = result.candidates[0].content.parts[0].text;

            const botResponse = { text: botText, sender: 'bot' };
            setMessages(prev => [...prev, botResponse]);

        } catch (error) {
            console.error("Error fetching from AI:", error);
            const errorResponse = { text: "Oops! I'm having trouble connecting to my brain. Please try again.", sender: 'bot' };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-24 right-5 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 animate-fade-in-up">
            {/* Header */}
            <div className="bg-teal-600 text-white p-3 flex justify-between items-center rounded-t-lg">
                <h3 className="font-bold">RentSmart Assistant</h3>
                <button onClick={closeChatbot} className="text-xl font-bold">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg px-3 py-2 max-w-xs ${msg.sender === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-200 text-gray-800 rounded-lg px-3 py-2">...</div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-2 border-t">
                <div className="flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything..."
                        className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <button onClick={handleSend} className="bg-teal-600 text-white px-4 rounded-r-md hover:bg-teal-700 disabled:bg-teal-400" disabled={isLoading}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;