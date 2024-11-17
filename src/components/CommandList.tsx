import React from 'react';
import { Command } from 'lucide-react';

interface CommandListProps {
  commands: { command: string; description: string }[];
}

const CommandList: React.FC<CommandListProps> = ({ commands }) => (
  <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-6">
    <div className="flex items-center gap-2 mb-3">
      <Command className="w-5 h-5" />
      <h3 className="font-semibold">Voice Commands</h3>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {commands.map(({ command, description }) => (
        <div
          key={command}
          className="bg-white/5 rounded-lg p-3 text-sm"
        >
          <span className="font-mono text-purple-300">{command}</span>
          <p className="text-white/60 text-xs mt-1">{description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CommandList;