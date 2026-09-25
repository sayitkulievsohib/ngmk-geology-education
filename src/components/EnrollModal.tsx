import React, { useState, useEffect } from 'react';
import { CourseItem, CONTACT_INFO } from '../data/courses';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  X,
  MapPin,
  FileText,
  Clock,
  ExternalLink,
  Phone,
  Maximize2,
  CheckCircle2,
  Banknote
} from 'lucide-react';

interface EnrollModalProps {
  course: CourseItem | null;
  lang: Language;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ course, lang, onClose }) => {
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);
  const [imgSrc, setImgSrc] = useState('/manzil/manzil.png');
  const t = TRANSLATIONS[lang];

  // Orqa fondagi sahifa scroll bo'lishini to'xtatish
  useEffect(() => {
    if (course) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [course]);

  // Escape tugmasi bosilganda yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isPhotoZoomed) {
          setIsPhotoZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoZoomed, onClose]);

  if (!course) return null;

  const isBelaz = course.id === 1 || course.titleUz.toLowerCase().includes('belaz');
  const title = lang === 'uz' ? course.titleUz : course.titleRu;
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(course.price) + ` ${t.currency}`;

  const handleImgError = () => {
    if (imgSrc === '/manzil/manzil.png') {
      setImgSrc('/manzil/Screenshot 2026-09-25 151502.png');
    } else if (imgSrc !== '/manzil/default.svg') {
      setImgSrc('/manzil/default.svg');
    }
  };

  return (
    <>
      {/* Asosiy Modal Fon qatlami */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-900/60 backdrop-blur-xs overflow-y-auto"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative w-full max-w-xl bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
          {/* 1. Modal Sarlavhasi (Header) - Ortiqcha "KURS HAQIDA TO'LIQ MA'LUMOT" olib tashlandi, faqat toza sarlavha */}
          <div className="bg-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-zinc-200 shrink-0">
            <h3 className="text-base sm:text-lg font-extrabold text-zinc-950 leading-snug tracking-tight pr-3">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
              aria-label={t.closeBtn}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. Modal Kontent qismi */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-zinc-800">
            {/* Kurs Muddati va Narxi (Frame oq fonda) */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
                  <Clock className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px] font-medium leading-tight mb-0.5">
                    {t.durationLabel}
                  </span>
                  <span className="font-bold text-zinc-900 text-xs sm:text-sm">
                    {t.studyDuration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:border-l sm:border-zinc-200 sm:pl-4">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-600 shrink-0">
                  <Banknote className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="text-zinc-400 block text-[11px] font-medium leading-tight mb-0.5">
                    {t.priceLabel}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-zinc-950 tracking-tight font-mono">
                    {formattedPrice}
                  </span>
                </div>
              </div>
            </div>

            {/* 3. KERAKLI HUJJATLAR BO'LIMI - Rangli chiroyli ikonlar bilan */}
            <div className="border border-zinc-200 rounded-xl p-4 sm:p-5 bg-white shadow-2xs">
              <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-zinc-100">
                <FileText className="w-4 h-4 text-amber-500" />
                <h4 className="font-bold text-xs sm:text-sm text-zinc-900 uppercase tracking-wider">
                  {t.requiredDocsTitle}
                </h4>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700">
                {isBelaz && (
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{t.belazDocNote}</span>
                  </li>
                )}

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t.commonDocPassport}</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t.commonDocPhoto}</span>
                </li>

                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t.commonDocContract}</span>
                </li>
              </ul>
            </div>

            {/* 4. MANZIL RASMI VA JOYI */}
            <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div
                className="relative cursor-pointer group"
                onClick={() => setIsPhotoZoomed(true)}
              >
                <img
                  src={imgSrc}
                  onError={handleImgError}
                  alt={t.buildingPhotoTitle}
                  className="w-full h-44 sm:h-52 object-cover"
                />
              </div>

              {/* 5. MANZIL VA MO'LJAL MATNLARI */}
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

                {/* Google Map orqali borish tugmasi */}
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

            {/* 6. TELEFONLAR */}
            <div className="pt-1">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-2 text-center">
                {t.phonesTitle}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CONTACT_INFO.phones.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    className="h-10 px-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-900 font-bold font-mono text-xs rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>{phone.display}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 7. Modal Pastki qismi (Footer) */}
          <div className="p-3.5 sm:p-4 bg-zinc-50 border-t border-zinc-200 flex justify-end shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold text-xs rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              {t.closeBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Rasm kattalashtirilgan paytdagi toza Lightbox */}
      {isPhotoZoomed && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-zinc-950/85 backdrop-blur-xs"
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
    </>
  );
};
