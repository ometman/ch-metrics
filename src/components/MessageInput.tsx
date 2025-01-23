import React, { useState } from 'react';
import { Message } from '../types/message';
import { analyzeMessage } from '../utils/messageAnalyzer';

interface MessageInputProps {
  onMessageAnalyzed: (message: Message) => void;
}

export default function MessageInput({ onMessageAnalyzed }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      isCondolence: analyzeMessage(message)
    };

    onMessageAnalyzed(newMessage);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Paste WhatsApp Message
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={4}
          placeholder="Paste your WhatsApp message here..."
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Analyze Message
      </button>
    </form>
  );
}