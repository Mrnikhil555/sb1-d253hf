import React from 'react';
import { Gamepad2, Mic, MicOff, Volume2, VolumeX, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  isListening: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleListening: () => void;
  onBack: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({
  isListening,
  isMuted,
  onToggleMute,
  onToggleListening,
  onBack,
  title,
}) => (
  <div className="flex justify-between items-center mb-8">
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Back to game selection"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <Gamepad2 className="w-8 h-8" />
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
    <div className="flex items-center gap-4">
      <button
        onClick={onToggleMute}
        className="p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
      </button>
      <button
        onClick={onToggleListening}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        } transition-colors`}
      >
        {isListening ? (
          <>
            <MicOff className="w-5 h-5" /> Stop
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" /> Start Voice Control
          </>
        )}
      </button>
    </div>
  </div>
);

export default Header;