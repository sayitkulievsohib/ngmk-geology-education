import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeaderLogoProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ lang, onSelectLang }) => {
  const [imgSrc, setImgSrc] = useState('/logo/logo.png');
  const t = TRANSLATIONS[lang];

  const handleImgError = () => {
    if (imgSrc === '/logo/logo.png') {
      setImgSrc('/logo/ChatGPT Image Sep 25, 2026, 02_29_01 PM.png');
    } else if (imgSrc !== '/logo/logo.svg') {
      setImgSrc('/logo/logo.svg');
    }
  };

  return (
    <header className="relative pt-2 pb-5 sm:pt-3 sm:pb-6 flex flex-col items-center justify-center text-center">
      {/* Tabiiy, toza til almashtirish tugmasi - suzuvchi AI vidjetsiz, sahifaning o'ng tepasida */}
      <div className="w-full flex justify-end mb-2">
        <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 text-xs font-semibold shadow-2xs">
          <button
            type="button"
            onClick={() => onSelectLang('uz')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
              lang === 'uz' ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            O‘Z
          </button>
          <button
            type="button"
            onClick={() => onSelectLang('ru')}
            className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
              lang === 'ru' ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            RU
          </button>
        </div>
      </div>

      {/* Dumaloq markaziy logo */}
      <div className="mb-3">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white p-1 border border-zinc-200 flex items-center justify-center overflow-hidden">
          <img
            src={imgSrc}
            onError={handleImgError}
            alt="NGMK Geology Education"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Asosiy nom - rasmiy va qat'iy */}
      <div className="w-full max-w-xl px-2 flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-950 uppercase whitespace-nowrap">
          NGMK GEOLOGY EDUCATION
        </h1>

        <p className="mt-1 text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed max-w-md mx-auto">
          {t.brandSubtitle}
        </p>
      </div>
    </header>
  );
};
