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
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/20">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-slate-950 border border-slate-850 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-850">
            {conversations.map((convo) => {
              const isActive = convo.id === activeChatId;
              return (
                <button
                  key={convo.id}
                  onClick={() => setActiveChatId(convo.id)}
                  className={`w-full p-4 flex gap-3 text-left transition-colors relative ${
                    isActive ? 'bg-indigo-600/10' : 'hover:bg-slate-900/30'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={convo.avatar}
                      alt={convo.name}
                      className="w-10 h-10 rounded-full border border-slate-800 bg-slate-950"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                  </div>

                  {/* Body details */}
                  <div className="flex-1 min-w-0 text-xs space-y-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-slate-200 truncate pr-2">{convo.name}</h4>
                      <span className="text-[9px] text-slate-500 whitespace-nowrap">Active</span>
                    </div>
                    <p className="text-[10px] text-slate-450 font-medium truncate">{convo.company}</p>
                    <p className={`text-[11px] truncate mt-1 ${convo.unread ? 'text-white font-semibold' : 'text-slate-400'}`}>
