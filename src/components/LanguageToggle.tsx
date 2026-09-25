import React from 'react';
import { Language } from '../data/translations';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: () => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={onToggle}
        aria-label="Tilni o'zgartirish / Сменить язык"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-zinc-950 text-white border-2 border-amber-400 shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:bg-zinc-900 hover:border-amber-300 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center leading-none">
          <Globe className="w-3.5 h-3.5 text-amber-400 mb-0.5 group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-xs font-black tracking-wider text-white font-mono uppercase">
            {currentLang === 'uz' ? 'UZ' : 'RU'}
          </span>
        </div>

        {/* Hover Pill hint */}
        <span className="absolute right-16 px-2.5 py-1 bg-zinc-900 text-zinc-100 text-[11px] font-semibold rounded-md shadow-md border border-zinc-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {currentLang === 'uz' ? 'Русский язык' : 'O‘zbek tili'}
        </span>
      </button>
    </div>
  );
};
