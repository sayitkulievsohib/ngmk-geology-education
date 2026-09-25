import React from 'react';
import { CourseItem } from '../data/courses';
import { Language, TRANSLATIONS } from '../data/translations';
import { Clock, ChevronRight } from 'lucide-react';

interface CourseTableProps {
  courses: CourseItem[];
  lang: Language;
  onSelectCourse: (course: CourseItem) => void;
}

export const CourseTable: React.FC<CourseTableProps> = ({ courses, lang, onSelectCourse }) => {
  const t = TRANSLATIONS[lang];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU').format(price) + ` ${t.currency}`;
  };

  return (
    <div className="w-full">
      {/* Seryozniy, keng va havosi ko'p o'quv katalogi */}
      <div className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-xs">
        {/* Yuqori panel: 1 qatorda, qora chiziqlarsiz, xotirjam va salobatli */}
        <div className="bg-zinc-900 text-white px-5 sm:px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <h2 className="font-semibold text-xs sm:text-sm tracking-wider text-zinc-100 uppercase whitespace-nowrap">
              {t.catalogTitle}
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-normal hidden sm:inline-block">
            {lang === 'uz' ? 'Kasbiy ta’lim' : 'Профессиональное образование'}
          </span>
        </div>

        {/* ======================================================== */}
        {/* TELEFON UCHUN KENG VA ERKIN KO'RINISH (MOBILE VIEW)      */}
        {/* Zichliksiz, har bir kurs erkin kartochka sifatida turadi */}
        {/* ======================================================== */}
        <div className="md:hidden divide-y divide-zinc-100 p-2 sm:p-3">
          {courses.map((course, index) => {
            const title = lang === 'uz' ? course.titleUz : course.titleRu;
            return (
              <div
                key={course.id}
                className="p-4 sm:p-5 rounded-xl hover:bg-zinc-50/80 transition-colors"
              >
                {/* 1. Tartib raqami va Kurs Nomi */}
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100 text-zinc-700 font-semibold text-xs shrink-0 mt-0.5 font-mono">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* 2. O'qish muddati */}
                <div className="mt-2.5 flex items-center gap-1.5 text-xs text-zinc-500 pl-10 font-normal">
                  <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>{t.studyDuration}</span>
                </div>

                {/* 3. Kurs to'lovi va Yozilish tugmasi */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3 pl-10">
                  <div>
                    <span className="text-[11px] text-zinc-400 font-medium block leading-none mb-1">
                      {t.priceCol}
                    </span>
                    <span className="text-base font-bold text-zinc-900 font-mono tracking-tight tabular-nums">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="h-9 px-4 inline-flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition shadow-xs cursor-pointer active:scale-98"
                  >
                    <span>{t.enrollBtn}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* DESKTOP TABLE VIEW (Keng ekranlar uchun rasmiy jadval)   */}
        {/* Qora chiziqlarsiz, yumshoq oraliqlar bilan               */}
        {/* ======================================================== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/80 text-zinc-600 text-xs font-semibold uppercase tracking-wider border-b border-zinc-150">
                <th className="py-4 px-5 w-14 text-center font-medium">№</th>
                <th className="py-4 px-6 font-semibold">{t.directionCol}</th>
                <th className="py-4 px-6 font-semibold">{t.durationCol}</th>
                <th className="py-4 px-6 text-right font-semibold">{t.priceCol}</th>
                <th className="py-4 px-6 text-center w-36 font-semibold">{t.actionCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {courses.map((course, index) => {
                const title = lang === 'uz' ? course.titleUz : course.titleRu;
                return (
                  <tr
                    key={course.id}
                    className="hover:bg-zinc-50/70 transition-colors group"
                  >
                    {/* Index */}
                    <td className="py-4 px-5 text-center font-normal text-xs text-zinc-400 group-hover:text-zinc-700">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-100/80 text-zinc-600 font-semibold group-hover:bg-zinc-900 group-hover:text-amber-400 transition font-mono">
                        {index + 1}
                      </span>
                    </td>

                    {/* Course Title */}
                    <td className="py-4 px-6">
                      <span className="text-sm font-semibold text-zinc-900 group-hover:text-amber-700 transition">
                        {title}
                      </span>
                    </td>

                    {/* Study Duration */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-normal">
                        <Clock className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                        <span>{t.studyDuration}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 text-right">
                      <span className="text-base font-bold text-zinc-900 font-mono tabular-nums tracking-tight">
                        {formatPrice(course.price)}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => onSelectCourse(course)}
                        className="w-full inline-flex items-center justify-center gap-1 py-2 px-3.5 bg-zinc-900 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition shadow-xs cursor-pointer active:scale-98"
                      >
                        <span>{t.enrollBtn}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
