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
      {/* Yuqori qator: Chapda 3 ta chiziqcha (Sidebar menyu), O'ngda til tanlash - Bir xil balandlik (h-8) va dizaynda */}
      <div className="w-full flex items-center justify-between mb-3">
        {/* Chapdagi 3 ta chiziqcha menyu tugmasi - Aynan til freymi bilan bir xil h-8 balandlikda */}
        <button
          type="button"
          onClick={onOpenSidebar}
          className="h-8 w-8 sm:w-auto sm:px-2.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-800 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs group"
          title={t.menuTitle}
          aria-label={t.menuTitle}
        >
          <Menu className="w-4 h-4 text-zinc-700 group-hover:text-zinc-950 transition-colors" />
          <span className="text-xs font-bold text-zinc-700 hidden sm:inline">
            {t.menuTitle}
          </span>
        </button>

        {/* O'ngdagi til tanlash tugmasi - Aynan h-8 balandlikda */}
        <div className="h-8 inline-flex items-center rounded-lg border border-zinc-200 bg-white p-0.5 text-xs font-semibold shadow-2xs">
          <button
            type="button"
            onClick={() => onSelectLang('uz')}
            className={`h-full px-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${
              lang === 'uz' ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            O‘Z
          </button>
          <button
            type="button"
            onClick={() => onSelectLang('ru')}
            className={`h-full px-2.5 rounded-md text-xs font-bold transition-colors cursor-pointer flex items-center justify-center ${
              lang === 'ru' ? 'bg-zinc-950 text-white' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            RU
          </button>
        </div>
      </div>

      {/* Dumaloq markaziy logo */}
      <div className="mb-3">
        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white p-1 border border-zinc-200 flex items-center justify-center overflow-hidden shadow-2xs">
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
