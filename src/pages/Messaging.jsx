import React, { useState, useEffect, useRef } from 'react';
import { useCRMStore } from '../store/useCRMStore';
import { Send, Phone, Video, Search, MessageSquare, ShieldAlert, Sparkles } from 'lucide-react';

export default function Messaging() {
  const conversations = useCRMStore((state) => state.conversations);
  const sendMessage = useCRMStore((state) => state.sendMessage);

  const [activeChatId, setActiveChatId] = useState(conversations[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  const activeChat = conversations.find((c) => c.id === activeChatId);

  // Auto Scroll to Chat Bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.chatHistory]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChatId) return;

    sendMessage(activeChatId, inputText.trim(), 'user');
    setInputText('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Messaging Desk</h2>
        <p className="text-slate-400 text-xs mt-0.5">Communicate with active clients or internal sales channels. Send a message to receive simulated reactive replies.</p>
      </div>

      {/* Double Pane Viewport */}
      <div className="glass-card flex h-[62vh] overflow-hidden">
        
        {/* Left Panel: Conversation Threads */}
        <div className="w-80 border-r border-slate-800/80 flex flex-col bg-slate-900/10">
