import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';

interface HeaderLogoProps {
  lang: Language;
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({ lang }) => {
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
    <header className="pt-6 pb-8 sm:pt-10 sm:pb-10 flex flex-col items-center justify-center text-center">
      {/* Dumaloq toza logo - yumshoq soya va xotirjam hoshiya */}
      <div className="mb-5">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white p-1.5 shadow-sm border border-zinc-200/80 flex items-center justify-center overflow-hidden">
          <img
            src={imgSrc}
            onError={handleImgError}
            alt="NGMK Geology Education"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* Asosiy nom - qalinligi me'yorida, ortiqcha qora chiziqlarsiz, erkin va nafis */}
      <div className="w-full max-w-xl px-4 flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-zinc-900 uppercase">
          NGMK GEOLOGY EDUCATION
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-zinc-500 font-normal leading-relaxed max-w-md mx-auto">
          {t.brandSubtitle}
        </p>
      </div>
    </header>
  );
};
