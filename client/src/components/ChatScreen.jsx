import React, { useState } from 'react';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // Simulate bot response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: 'This is a bot response', sender: 'bot' },
                ]);
            }, 1000);
        }
    };

    return (
        <div className="chat-container">
            <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Chat' : 'Open Chat'}
            </button>
            {isOpen && (
                <div className="chat-screen">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatScreen;