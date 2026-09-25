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
      {/* Seryozniy, nufuzli konchilik o'quv katalogi */}
      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
        {/* Yuqori panel: Qat'iy va rasmiy */}
        <div className="bg-zinc-950 text-white px-5 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <h2 className="font-bold text-xs sm:text-sm tracking-wider text-zinc-100 uppercase whitespace-nowrap">
              {t.catalogTitle}
            </h2>
          </div>
          <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider hidden sm:inline-block">
            {lang === 'uz' ? '12 ta yo‘nalish' : '12 направлений'}
          </span>
        </div>

        {/* ======================================================== */}
        {/* TELEFON UCHUN QULAY KO'RINISH (MOBILE VIEW)              */}
        {/* ======================================================== */}
        <div className="md:hidden divide-y divide-zinc-100">
          {courses.map((course, index) => {
            const title = lang === 'uz' ? course.titleUz : course.titleRu;
            return (
              <div
                key={course.id}
                className="p-4 hover:bg-zinc-50 transition-colors"
              >
                {/* 1. Tartib raqami va Kurs Nomi - Yo'nalish yaxshigina bold */}
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-zinc-100 text-zinc-700 font-bold text-xs shrink-0 mt-0.5 font-mono">
                    {index + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-extrabold text-zinc-950 leading-snug tracking-tight">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* 2. O'qish muddati */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500 pl-9 font-normal">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t.studyDuration}</span>
                </div>

                {/* 3. Kurs to'lovi va Batafsil tugmasi */}
                <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between gap-3 pl-9">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-medium block leading-none mb-1 uppercase tracking-wider">
                      {t.priceCol}
                    </span>
                    <span className="text-sm sm:text-base font-medium text-zinc-700 tracking-normal tabular-nums">
                      {formatPrice(course.price)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectCourse(course)}
                    className="h-9 px-4 inline-flex items-center justify-center gap-1.5 bg-zinc-950 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
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
        {/* DESKTOP TABLE VIEW (Rasmiy jadval)                       */}
        {/* ======================================================== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 text-zinc-600 text-xs font-bold uppercase tracking-wider border-b border-zinc-200">
                <th className="py-3.5 px-4 w-14 text-center font-bold">№</th>
                <th className="py-3.5 px-6 font-bold">{t.directionCol}</th>
                <th className="py-3.5 px-6 font-bold">{t.durationCol}</th>
                <th className="py-3.5 px-6 text-right font-bold">{t.priceCol}</th>
                <th className="py-3.5 px-6 text-center w-36 font-bold">{t.actionCol}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {courses.map((course, index) => {
                const title = lang === 'uz' ? course.titleUz : course.titleRu;
                return (
                  <tr
                    key={course.id}
                    className="hover:bg-zinc-50/80 transition-colors"
                  >
                    {/* Index */}
                    <td className="py-3.5 px-4 text-center font-normal text-xs text-zinc-400">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-zinc-100 text-zinc-700 font-bold font-mono">
                        {index + 1}
                      </span>
                    </td>

                    {/* Course Title - yaxshigina bold */}
                    <td className="py-3.5 px-6">
                      <span className="text-sm font-extrabold text-zinc-950 tracking-tight">
                        {title}
                      </span>
                    </td>

                    {/* Study Duration */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-normal">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{t.studyDuration}</span>
                      </div>
                    </td>

                    {/* Price - nafis va me'yorida */}
                    <td className="py-3.5 px-6 text-right">
                      <span className="text-sm sm:text-base font-medium text-zinc-700 tracking-normal tabular-nums">
                        {formatPrice(course.price)}
                      </span>
                    </td>

                    {/* Action - Batafsil tugmasi */}
                    <td className="py-3.5 px-6 text-center">
                      <button
                        type="button"
                        onClick={() => onSelectCourse(course)}
                        className="w-full inline-flex items-center justify-center gap-1 py-2 px-3.5 bg-zinc-950 hover:bg-zinc-800 text-amber-400 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
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
