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
    <section id="qongiroq" className="mt-6 sm:mt-8 w-full scroll-mt-20">
      {/* Katalog bilan bir xil uslubdagi toza aloqa paneli */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {/* Yuqori sarlavha */}
        <div className="bg-zinc-950 text-white px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <h2 className="font-bold text-xs sm:text-sm tracking-wider text-zinc-100 uppercase whitespace-nowrap">
              {t.phonesTitle}
            </h2>
          </div>
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider hidden sm:inline-block">
            {lang === 'uz' ? 'Qabul va ma’lumot' : 'Приемная комиссия'}
          </span>
        </div>

        {/* Telefon qatorlari */}
        <div className="divide-y divide-zinc-100">
          {CONTACT_INFO.phones.map((phone, idx) => (
            <div
              key={phone.raw}
              className="p-4 sm:p-5 hover:bg-zinc-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
            >
              {/* Chap qism: Raqam belgisi va telefon raqami */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-100 text-zinc-700 font-bold text-xs shrink-0 font-mono">
                  <Phone className="w-4 h-4 text-zinc-700" />
                </span>

                <div>
                  <span className="text-[10px] text-zinc-400 font-semibold block leading-none mb-1 uppercase tracking-wider">
                    {t.admissionsDept} {idx + 1}
                  </span>
                  <a
                    href={`tel:${phone.raw}`}
                    className="text-base sm:text-lg font-bold text-zinc-950 font-mono tracking-tight hover:text-amber-600 transition-colors block whitespace-nowrap tabular-nums"
                  >
                    {phone.display}
                  </a>
                </div>
              </div>

              {/* O'ng qism: Tugmalar (Mobil qurilmada teng 50/50 simmetriya) */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handleCopy(phone.display, idx)}
                  className="h-9 px-3 bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-lg border border-zinc-200 inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title={t.copyBtn}
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="text-emerald-700 font-semibold text-xs">
                        {t.copiedText}
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                      <span className="text-xs">{t.copyBtn}</span>
                    </>
                  )}
                </button>

                <a
                  href={`tel:${phone.raw}`}
                  className="h-9 px-4 inline-flex items-center justify-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition-colors whitespace-nowrap"
                >
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
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
