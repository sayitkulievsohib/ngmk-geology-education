import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/courses';
import { Language, TRANSLATIONS } from '../data/translations';
import { Phone, Copy, Check } from 'lucide-react';

interface ContactSectionProps {
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const t = TRANSLATIONS[lang];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <section className="mt-10 sm:mt-14 mb-20 w-full">
      {/* Keng, erkin va nafis kontaktlar paneli (Zichliksiz, qora chiziqlarsiz) */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
        {/* Sarlavha - toza va ixcham */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-amber-400 flex items-center justify-center shrink-0">
            <Phone className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base sm:text-lg text-zinc-900 tracking-tight">
            {t.phonesTitle}
          </h3>
        </div>

        {/* 2 ta Qabul bo'limi raqami - Raqamlar mutlaqo bo'linmaydi, keng va qulay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {CONTACT_INFO.phones.map((phone, idx) => (
            <div
              key={phone.raw}
              className="bg-zinc-50/70 hover:bg-zinc-50 border border-zinc-200/80 rounded-xl p-5 sm:p-6 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block mb-2">
                  {t.admissionsDept}
                </span>

                {/* Raqam hech qachon 2 qatorga bo'linmaydi */}
                <a
                  href={`tel:${phone.raw}`}
                  className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono tracking-tight hover:text-amber-600 transition block whitespace-nowrap tabular-nums"
                >
                  {phone.display}
                </a>
              </div>

              {/* Qo'ng'iroq va Nusxa olish tugmalari - keng, erkin va qulay */}
              <div className="mt-5 flex items-center gap-2.5">
                <a
                  href={`tel:${phone.raw}`}
                  className="flex-1 h-11 px-4 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs sm:text-sm rounded-lg inline-flex items-center justify-center gap-2 transition cursor-pointer shadow-xs active:scale-[0.99]"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.callBtn}</span>
                </a>

                <button
                  onClick={() => handleCopy(phone.display, idx)}
                  className="h-11 px-3.5 bg-white hover:bg-zinc-100 text-zinc-700 text-xs sm:text-sm font-medium rounded-lg border border-zinc-300/80 inline-flex items-center justify-center gap-1.5 transition cursor-pointer"
                  title={t.copyBtn}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-medium text-xs hidden sm:inline">
                        {t.copiedText}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-zinc-500" />
                      <span className="text-xs hidden sm:inline">{t.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
