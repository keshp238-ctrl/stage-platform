import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  drillAction?: string;
}

export const CareerCoachView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Hello Alex. I analyzed your last 3 speaking sessions. Your pacing is solid at 142 WPM, but your pitch rises slightly at the end of declarative sentences, creating unintentional uptalk. What upcoming interview or talk can we prepare for today?'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text: inputText };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    setTimeout(() => {
      let reply = 'Got it. For technical system design answers, remember the 3-step formula: Frame the bounds first, propose the high-level architecture diagram, then defend your database partitioning.';
      if (userMsg.text.toLowerCase().includes('interview') || userMsg.text.toLowerCase().includes('google')) {
        reply = 'For Google and Tier-1 interviews, Google L6 interviewers specifically reward candidates who voluntarily bring up trade-offs before being prompted. Let’s do a 60-second drill on defending an in-memory cache.';
      } else if (userMsg.text.toLowerCase().includes('filler') || userMsg.text.toLowerCase().includes('nervous')) {
        reply = 'When you feel the reflex to say "like" or "um", close your lips and take an intentional breath. A 0.8-second silence sounds thoughtful to an executive, whereas filler words sound frantic.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          drillAction: 'Launch 60-Second Drill'
        }
      ]);
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          AI Career & Speaking Coach
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
          Context-aware verbal strategist. Diagnoses inflection habits, suggests speech drills, and builds custom interview roadmaps.
        </p>
      </div>

      {/* Chat Messages Log */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 min-h-[460px] flex flex-col justify-between space-y-4">
        <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.sender === 'ai'
                    ? 'bg-[#E62B1E] text-white'
                    : 'bg-white/10 text-white'
                }`}
              >
                {m.sender === 'ai' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'ai'
                    ? 'bg-white/5 border border-white/10 text-neutral-200'
                    : 'bg-[#E62B1E] text-white font-medium'
                }`}
              >
                {m.text}

                {m.drillAction && (
                  <div className="mt-3 pt-3 border-t border-white/10 flex justify-end">
                    <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono uppercase text-[#FF705E] flex items-center gap-1.5 transition-colors">
                      <Sparkles className="w-3.5 h-3.5" /> {m.drillAction} →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask your coach anything (e.g. 'How do I answer tell me about yourself without rambling?')"
            className="flex-1 bg-[#090A0E] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-[#E62B1E]"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-[#E62B1E] hover:bg-[#FF3E2B] text-white text-xs font-mono uppercase font-bold tracking-wider transition-all shadow-md shadow-[#E62B1E]/30 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
