import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const ChatScreen = () => {
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'user' }]);
      const userInput = input;
      setInput('');

      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:5050/api/gemini/generate', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${user.token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: userInput }),
          });

          if (!response.ok) {
            throw new Error('Failed to fetch bot response');
          }

          const data = await response.json();
          const botMessage = data.response.candidates[0].content.parts[0].text;

          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botMessage, sender: 'bot' },
          ]);
        } catch (error) {
          console.error('Error fetching bot response:', error);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Sorry, something went wrong with the bot.', sender: 'bot' },
          ]);
        }
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900">
      <div className="flex items-center justify-between bg-slate-100 px-6 py-4 border-b border-slate-300">
        <h1 className="text-lg font-semibold">Chat</h1>
        <p className="text-sm italic text-slate-600">{user.username}</p>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-md shadow-sm ${
                message.sender === 'user'
                  ? 'bg-slate-200 text-slate-900'
                  : 'bg-white border border-slate-300 text-slate-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="flex items-center p-4 bg-slate-100 border-t border-slate-300">
        <input
          type="text"
          className="flex-grow border border-slate-300 rounded-md py-1.5 px-3 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-4 inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-300 bg-white hover:bg-slate-200 hover:text-slate-800 h-9 rounded-md px-3 cursor-pointer"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
