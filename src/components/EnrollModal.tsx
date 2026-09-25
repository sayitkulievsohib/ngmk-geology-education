import React, { useState } from 'react';
import { CourseItem, CONTACT_INFO } from '../data/courses';
import { Language, TRANSLATIONS } from '../data/translations';
import { X, CheckCircle, Phone, ShieldCheck } from 'lucide-react';

interface EnrollModalProps {
  course: CourseItem | null;
  lang: Language;
  onClose: () => void;
}

export const EnrollModal: React.FC<EnrollModalProps> = ({ course, lang, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const t = TRANSLATIONS[lang];

  if (!course) return null;

  const title = lang === 'uz' ? course.titleUz : course.titleRu;
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(course.price) + ` ${t.currency}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-150">
        {/* Header */}
        <div className="bg-zinc-900 text-white px-5 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-amber-400 uppercase tracking-wider block">
              {t.modalTitle}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-white mt-0.5 leading-snug">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-zinc-900">{t.modalSuccessTitle}</h4>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1.5 max-w-xs mx-auto">
                {t.modalSuccessDesc}
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href={`tel:${CONTACT_INFO.phones[0].raw}`}
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs sm:text-sm rounded-lg transition flex items-center justify-center gap-2 shadow-xs"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callBtn}: {CONTACT_INFO.phones[0].display}</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium text-xs rounded-lg transition cursor-pointer"
                >
                  {t.modalCloseBtn}
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Kurs Qisqacha Ma'lumoti */}
              <div className="bg-zinc-50 border border-zinc-200/70 rounded-xl p-4 mb-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 font-normal">{t.durationLabel}</span>
                  <span className="font-semibold text-zinc-800">{t.studyDuration}</span>
                </div>
                <div className="pt-2 border-t border-zinc-200/60 flex items-center justify-between">
                  <span className="font-medium text-zinc-600">{t.priceLabel}</span>
                  <span className="text-base font-bold text-zinc-900 font-mono">
                    {formattedPrice}
                  </span>
                </div>
              </div>

              {/* Tezkor Telefon Qo'ng'irog'i (Ikkalasi ham qabul bo'limi) */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                <a
                  href={`tel:${CONTACT_INFO.phones[0].raw}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-mono whitespace-nowrap">{CONTACT_INFO.phones[0].display}</span>
                </a>
                <a
                  href={`tel:${CONTACT_INFO.phones[1].raw}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span className="font-mono whitespace-nowrap">{CONTACT_INFO.phones[1].display}</span>
                </a>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-zinc-200/80"></div>
                <span className="flex-shrink mx-3 text-[11px] font-medium text-zinc-400">
                  {t.orText}
                </span>
                <div className="flex-grow border-t border-zinc-200/80"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 mt-1">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    {t.modalNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.modalNamePlaceholder}
                    className="w-full px-3 py-2 text-sm bg-zinc-50/70 border border-zinc-300 focus:border-zinc-800 focus:bg-white rounded-lg outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    {t.modalPhoneLabel}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.modalPhonePlaceholder}
                    className="w-full px-3 py-2 text-sm bg-zinc-50/70 border border-zinc-300 focus:border-zinc-800 focus:bg-white rounded-lg outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs uppercase tracking-wider rounded-lg transition cursor-pointer mt-1 shadow-xs"
                >
                  {t.modalSubmitBtn}
                </button>
              </form>

              <div className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>{lang === 'uz' ? "Qabul komissiyasi siz bilan tez orada bog'lanadi" : "Приемная комиссия свяжется с вами в ближайшее время"}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
