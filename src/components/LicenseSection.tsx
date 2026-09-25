import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Award
} from 'lucide-react';

interface LicenseSectionProps {
  lang: Language;
}

export const LicenseSection: React.FC<LicenseSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoomedImg, setZoomedImg] = useState<string | null>(null);

  // Rasmlar manbasi: Foydalanuvchi yuklagan sahifa_1.jpg va sahifa_2.jpg
  const [page1Src, setPage1Src] = useState<string>('/litsenziya/sahifa_1.jpg');
  const [page2Src, setPage2Src] = useState<string>('/litsenziya/sahifa_2.jpg');

  const handlePage1Error = () => {
    if (page1Src === '/litsenziya/sahifa_1.jpg') {
      setPage1Src('/litsenziya/1.jpg');
    } else if (page1Src === '/litsenziya/1.jpg') {
      setPage1Src('/litsenziya/1.png');
    } else if (page1Src !== '/litsenziya/page1.svg') {
      setPage1Src('/litsenziya/page1.svg');
    }
  };

  const handlePage2Error = () => {
    if (page2Src === '/litsenziya/sahifa_2.jpg') {
      setPage2Src('/litsenziya/2.jpg');
    } else if (page2Src === '/litsenziya/2.jpg') {
      setPage2Src('/litsenziya/2.png');
    } else if (page2Src !== '/litsenziya/page2.svg') {
      setPage2Src('/litsenziya/page2.svg');
    }
  };

  const currentImg = currentPage === 1 ? page1Src : page2Src;
  const currentTitle = currentPage === 1 ? '1-sahifa' : '2-sahifa';

  return (
    <section id="litsenziya" className="mt-6 sm:mt-8 w-full scroll-mt-20">
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
        {/* Sarlavha paneli: Qat'iy va rasmiy */}
        <div className="bg-zinc-950 text-white px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <h2 className="font-bold text-xs sm:text-sm tracking-wider text-zinc-100 uppercase whitespace-nowrap">
              {t.licenseTitle}
            </h2>
          </div>
          <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            {t.licenseBadge}
          </span>
        </div>

        {/* Litsenziya varag'i */}
        <div className="p-3.5 sm:p-6 md:p-8 bg-zinc-100/70 flex flex-col items-center">
          <div className="relative w-full max-w-xl md:max-w-2xl flex flex-col items-center">
            {/* Hujjat varag'i - Bosilganda to'liq ochiladi, lekin hech qanday ortiqcha qora knopka yo'q */}
            <div
              onClick={() => setZoomedImg(currentImg)}
              className="relative w-full bg-white rounded-xl overflow-hidden border border-zinc-300 shadow-md cursor-pointer transition-transform duration-150 hover:shadow-lg active:scale-[0.995]"
            >
              <img
                src={currentPage === 1 ? page1Src : page2Src}
                onError={currentPage === 1 ? handlePage1Error : handlePage2Error}
                alt={currentTitle}
                className="w-full h-auto max-h-[720px] object-contain mx-auto bg-white select-none"
              />
            </div>

            {/* Pastki boshqaruv: Faqat toza < 1 / 2 > o'tkazish, ortiqcha kattalashtirish tugmasi olib tashlandi */}
            <div className="mt-3.5 sm:mt-4 inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-zinc-200/90 shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  currentPage === 1
                    ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                    : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer shadow-2xs active:bg-zinc-200'
                }`}
                aria-label={t.prevPage}
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
              </button>

              <span className="px-2 text-xs sm:text-sm font-bold text-zinc-800 font-mono tracking-wide whitespace-nowrap select-none">
                {currentPage} / 2
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage(2)}
                disabled={currentPage === 2}
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                  currentPage === 2
                    ? 'border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50'
                    : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100 cursor-pointer shadow-2xs active:bg-zinc-200'
                }`}
                aria-label={t.nextPage}
              >
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kattalashtirilgan to'liq ekran ko'rish oynasi (Lightbox) */}
      {zoomedImg && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-xs"
          onClick={() => setZoomedImg(null)}
        >
          <div className="relative max-w-4xl max-h-[92vh] w-full flex flex-col items-center">
            <button
              type="button"
              onClick={() => setZoomedImg(null)}
              className="absolute -top-11 right-0 sm:right-2 text-zinc-300 hover:text-white p-2 text-sm flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
              <span className="hidden sm:inline font-medium">{t.closeBtn}</span>
            </button>
            <img
              src={zoomedImg}
              alt="Litsenziya"
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain border border-zinc-700 shadow-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};
