import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import { Menu } from 'lucide-react';

interface HeaderLogoProps {
  lang: Language;
  onSelectLang: (lang: Language) => void;
  onOpenSidebar: () => void;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({
  lang,
  onSelectLang,
  onOpenSidebar,
}) => {
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
      {/* Yuqori qator: Chapda 3 ta chiziqcha (Sidebar menyu), O'ngda til tanlash */}
      <div className="w-full flex items-center justify-between mb-4">
        {/* Chapdagi 3 ta chiziqcha menyu tugmasi */}
        <button
          type="button"
          onClick={onOpenSidebar}
          className="h-8 w-8 sm:w-auto sm:px-2.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs group"
          title={t.menuTitle}
          aria-label={t.menuTitle}
        >
          <Menu className="w-4 h-4 text-zinc-700 group-hover:text-amber-600 transition-colors" />
          <span className="text-xs font-bold text-zinc-700 hidden sm:inline">
            {t.menuTitle}
          </span>
        </button>

        {/* O'ngdagi til tanlash tugmasi */}
        <div className="h-8 inline-flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 text-xs font-semibold shadow-2xs">
          <button
            type="button"
            onClick={() => onSelectLang('uz')}
            className={`h-full px-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${
              lang === 'uz' ? 'bg-zinc-950 text-white shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            O‘Z
          </button>
          <button
            type="button"
            onClick={() => onSelectLang('ru')}
            className={`h-full px-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${
              lang === 'ru' ? 'bg-zinc-950 text-white shadow-2xs' : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            RU
          </button>
        </div>
      </div>

      {/* Dumaloq markaziy logo - Sariq ramka olib tashlangan, toza ko'rinish */}
      <div className="mb-3.5">
        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full bg-white p-1 border border-zinc-200 shadow-sm flex items-center justify-center overflow-hidden transition-transform duration-200 hover:scale-[1.02]">
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

        <p className="mt-1 text-xs sm:text-sm text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto whitespace-nowrap">
          {t.brandSubtitle}
        </p>
      </div>
    </header>
  );
};
