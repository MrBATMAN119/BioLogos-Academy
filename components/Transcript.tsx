import React, { useEffect, useRef } from 'react';

interface TranscriptProps {
  text: string;
  source: 'User' | 'Biologiics AI';
}

const Transcript: React.FC<TranscriptProps> = ({ text, source }) => {
  return (
    <div className={`flex flex-col w-full max-w-2xl mx-auto mt-4 p-4 rounded-lg transition-all duration-500 ${source === 'User' ? 'items-end' : 'items-start'}`}>
      <span className="text-xs text-gray-400 mb-1 font-serif uppercase tracking-wider">{source}</span>
      <p className={`text-lg md:text-2xl font-light leading-relaxed ${source === 'User' ? 'text-bio-accent text-right' : 'text-bio-parchment text-left'}`}>
        {text}
      </p>
    </div>
  );
};

export default Transcript;
