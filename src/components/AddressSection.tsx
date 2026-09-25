import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import { MapPin, ExternalLink, X } from 'lucide-react';

interface AddressSectionProps {
  lang: Language;
}

export const AddressSection: React.FC<AddressSectionProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);
  const [imgSrc, setImgSrc] = useState('/manzil/manzil.png');

  const handleImgError = () => {
    if (imgSrc === '/manzil/manzil.png') {
      setImgSrc('/manzil/Screenshot 2026-09-25 151502.png');
    } else if (imgSrc !== '/manzil/default.svg') {
      setImgSrc('/manzil/default.svg');
    }
  };

  return (
    <section id="manzil" className="mt-6 sm:mt-8 mb-12 w-full scroll-mt-20">
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-2xs">
        {/* Sarlavha paneli: Qat'iy va rasmiy */}
        <div className="bg-zinc-950 text-white px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <h2 className="font-bold text-xs sm:text-sm tracking-wider text-zinc-100 uppercase whitespace-nowrap">
              {t.locationTitle}
            </h2>
          </div>
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider hidden sm:inline-block">
            Navoiy shahar
          </span>
        </div>

        {/* Kontent: Aynan "Batafsil" kabi toza dizayn */}
        <div className="p-4 sm:p-6 bg-white">
          <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            {/* 1. Manzil fotosurati: Ortiqcha qora kattalashtirish buttoni butunlay olib tashlandi */}
            <div
              className="relative cursor-pointer group"
              onClick={() => setIsPhotoZoomed(true)}
            >
              <img
                src={imgSrc}
                onError={handleImgError}
                alt={t.buildingPhotoTitle}
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>

            {/* 2. Manzil va Mo'ljal matnlari */}
            <div className="p-4 sm:p-5 bg-white space-y-3">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-zinc-900 block">{t.addressLabel}</span>
                  <span className="text-zinc-700 font-medium">{t.addressText}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs sm:text-sm pl-6.5">
                <div>
                  <span className="font-bold text-zinc-900 block">{t.landmarkLabel}</span>
                  <span className="text-zinc-600 font-medium">{t.landmarkText}</span>
                </div>
              </div>

              {/* 3. Google Map orqali borish tugmasi: Qora fon, sariq yozuv */}
              <div className="pt-2">
                <a
                  href="https://maps.app.goo.gl/Q9uTa9zHU382LkEw6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-10 inline-flex items-center justify-center gap-2 px-4 bg-zinc-950 hover:bg-zinc-800 text-amber-400 font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{t.mapBtnText}</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-70" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rasm kattalashtirilgan paytdagi toza Lightbox */}
      {isPhotoZoomed && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-xs"
          onClick={() => setIsPhotoZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full flex flex-col items-center">
            <button
              type="button"
              onClick={() => setIsPhotoZoomed(false)}
              className="absolute -top-11 right-0 sm:right-2 text-zinc-300 hover:text-white p-2 text-sm flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
              <span className="hidden sm:inline font-medium">{t.closeBtn}</span>
            </button>
            <img
              src={imgSrc}
              onError={handleImgError}
              alt={t.buildingPhotoTitle}
              className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain border border-zinc-700/80 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
};
