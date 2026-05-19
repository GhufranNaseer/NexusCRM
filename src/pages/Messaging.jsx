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
                      {convo.lastMessage}
                    </p>
                  </div>

                  {/* Unread badge */}
                  {convo.unread && (
                    <span className="absolute right-4 bottom-4 w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Active chat window */}
        <div className="flex-1 flex flex-col bg-slate-950/20">
          {activeChat ? (
            <>
              {/* Active Chat Header */}
              <div className="px-6 py-3.5 border-b border-slate-800/80 bg-slate-900/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeChat.avatar}
                    alt={activeChat.name}
                    className="w-9 h-9 rounded-full border border-slate-850 bg-slate-900"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white leading-snug">{activeChat.name}</h3>
                    <span className="text-[9px] text-slate-500 font-semibold">{activeChat.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400">
                  <div className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/15 flex items-center gap-1.5 mr-2">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>Real-time Chat Active</span>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-slate-900/50 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-slate-900/50 hover:text-white transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Bubbles Viewport */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {activeChat.chatHistory.map((msg, idx) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={idx}
                      className={`flex gap-3 text-xs animate-page-fade ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {/* Avatar for customer */}
                      {!isUser && (
                        <img
                          src={activeChat.avatar}
                          alt={activeChat.name}
                          className="w-7 h-7 rounded-full border border-slate-850 bg-slate-900 flex-shrink-0 self-end mb-1"
                        />
                      )}

                      {/* Bubble */}
                      <div className="space-y-1">
                        <div
                          className={`p-3 max-w-sm rounded-xl leading-relaxed ${
                            isUser
                              ? 'bg-indigo-650 text-white rounded-br-none shadow shadow-indigo-600/10'
                              : 'bg-slate-900/80 border border-slate-850 text-slate-200 rounded-bl-none'
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>
                        <span className={`text-[9px] text-slate-500 block ${isUser ? 'text-right' : 'text-left'}`}>
                          {msg.time}
                        </span>
                      </div>

                      {/* Avatar for user */}
                      {isUser && (
                        <img
                          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Amna&backgroundColor=10b981"
                          alt="User"
                          className="w-7 h-7 rounded-full border border-slate-850 bg-slate-900 flex-shrink-0 self-end mb-1"
                        />
                      )}
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-slate-800/80 bg-slate-950/30 flex gap-3"
              >
                <input
                  type="text"
                  required
                  placeholder={`Send direct response to ${activeChat.name.split(' ')[0]}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-850 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 placeholder-slate-650"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-indigo-650 hover:bg-indigo-600 rounded-lg text-white shadow shadow-indigo-600/10 flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 text-xs">
              <MessageSquare className="w-10 h-10 opacity-30 mb-2" />
              <span>Select a conversation to communicate</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
