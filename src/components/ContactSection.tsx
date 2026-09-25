import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/courses';
import { Language, TRANSLATIONS } from '../data/translations';
import { Phone, Copy, Check, PhoneCall } from 'lucide-react';

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
    <section className="mt-6 sm:mt-8 mb-16 w-full">
      {/* Katalog bilan 100% bir xil uslubdagi rasmiy panel */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-xs">
        {/* Yuqori panel: Katalog sarlavhasi bilan to'liq bir xil */}
        <div className="bg-zinc-900 text-white px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 translate-y-[1px]" />
            <h2 className="font-semibold text-xs sm:text-sm tracking-wider text-zinc-100 uppercase whitespace-nowrap leading-none">
              {t.phonesTitle}
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-normal hidden sm:inline-block">
            {lang === 'uz' ? 'Qabul va ma’lumot' : 'Прием и справка'}
          </span>
        </div>

        {/* Telefon qatorlari: Katalog qatorlari bilan 100% mutanosib */}
        <div className="divide-y divide-zinc-100">
          {CONTACT_INFO.phones.map((phone, idx) => (
            <div
              key={phone.raw}
              className="p-4 sm:p-5 hover:bg-zinc-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              {/* Chap qism: Raqam belgisi va telefon raqami */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 font-semibold text-xs shrink-0 font-mono">
                  <Phone className="w-3.5 h-3.5 text-zinc-600" />
                </span>

                <div>
                  <span className="text-[11px] text-zinc-400 font-medium block leading-none mb-1">
                    {t.admissionsDept} {idx + 1}
                  </span>
                  <a
                    href={`tel:${phone.raw}`}
                    className="text-base sm:text-lg font-bold text-zinc-900 font-mono tracking-tight hover:text-amber-600 transition block whitespace-nowrap tabular-nums"
                  >
                    {phone.display}
                  </a>
                </div>
              </div>

              {/* O'ng qism: Tugmalar (Katalogdagi "Yozilish" tugmasi bilan bir xil o'lcham va dizaynda) */}
              <div className="flex items-center gap-2 pl-10 sm:pl-0">
                <button
                  onClick={() => handleCopy(phone.display, idx)}
                  className="h-9 px-3 bg-white hover:bg-zinc-100 text-zinc-600 text-xs font-medium rounded-lg border border-zinc-200 inline-flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-98"
                  title={t.copyBtn}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-medium text-xs">
                        {t.copiedText}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500" />
                      <span className="text-xs">{t.copyBtn}</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${phone.raw}`}
                  className="h-9 px-4 inline-flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition shadow-xs cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{t.callBtn}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
