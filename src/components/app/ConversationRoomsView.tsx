import React, { useState } from 'react';
import { Radio, Users, Plus, Globe, Headphones, Mic, X } from 'lucide-react';
import { CONVERSATION_ROOMS } from '../../data/mockData';
import { ConversationRoom } from '../../types';

export const ConversationRoomsView: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [joinedRoom, setJoinedRoom] = useState<ConversationRoom | null>(null);
  const [isMicMuted, setIsMicMuted] = useState(false);

  const filteredRooms = CONVERSATION_ROOMS.filter((r) => {
    if (selectedLevel === 'All') return true;
    return r.level.toLowerCase().includes(selectedLevel.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Peer Conversation Rooms
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
            Low-friction audio spaces with collegiate peers worldwide. Overcome speaking anxiety and practice spontaneous conversations.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-[#E62B1E] text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Start New Audio Room
        </button>
      </div>

      {/* Level Filters */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10 w-fit text-xs font-mono">
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              selectedLevel === lvl ? 'bg-[#E62B1E] text-white font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/20 transition-all space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                  {room.level}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  {room.activeSpeakers}/{room.maxSpeakers} Active
                </span>
              </div>

              <h3 className="font-bold text-base text-white mt-3 leading-snug">{room.title}</h3>
              <p className="text-xs text-neutral-400 mt-1 font-sans">{room.topic}</p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              <div className="text-xs font-mono text-neutral-400">
                Host: <span className="text-white">{room.hostName}</span> ({room.college})
              </div>
              <button
                onClick={() => setJoinedRoom(room)}
                className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-[#E62B1E] text-white text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <Headphones className="w-3.5 h-3.5" /> Join Room
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Joined Audio Room Modal / HUD */}
      {joinedRoom && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm rounded-2xl border border-white/20 bg-[#111319] p-5 shadow-2xl space-y-4 animate-fade-in text-white">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase font-bold text-white truncate max-w-[180px]">
                {joinedRoom.title}
              </span>
            </div>
            <button onClick={() => setJoinedRoom(null)} className="p-1 rounded text-neutral-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-around py-3">
            {[1, 2, 3, 4].map((user) => (
              <div key={user} className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs font-mono ${user === 1 ? 'border-[#E62B1E] bg-[#E62B1E]/20 text-[#E62B1E]' : 'border-white/20 bg-white/5 text-neutral-300'}`}>
                  U{user}
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  {user === 1 ? 'Speaking' : 'Listening'}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 ${
                isMicMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>{isMicMuted ? 'Muted' : 'Mute Mic'}</span>
            </button>
            <button
              onClick={() => setJoinedRoom(null)}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-mono uppercase"
            >
              Leave Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
