import React, { useState } from 'react';
import { COURSES_LIST, CourseItem } from './data/courses';
import { Language, TRANSLATIONS } from './data/translations';
import { HeaderLogo } from './components/HeaderLogo';
import { CourseTable } from './components/CourseTable';
import { ContactSection } from './components/ContactSection';
import { EnrollModal } from './components/EnrollModal';

export default function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* Asosiy konteyner */}
      <main className="max-w-4xl mx-auto px-3.5 sm:px-6 py-3 sm:py-6">
        {/* 1. Dumaloq logo, nom va toza til tanlash tugmasi */}
        <HeaderLogo lang={lang} onSelectLang={setLang} />

        {/* 2. Rasmiy o'quv kurslari katalogi */}
        <section className="mt-1 sm:mt-2">
          <CourseTable
            courses={COURSES_LIST}
            lang={lang}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        </section>

        {/* 3. Murojaat uchun telefonlar paneli */}
        <ContactSection lang={lang} />
      </main>

      {/* Kurs haqida batafsil ma'lumot modal darchasi */}
      <EnrollModal
        course={selectedCourse}
        lang={lang}
        onClose={() => setSelectedCourse(null)}
      />

      {/* Rasmiy toza footer */}
      <footer className="border-t border-zinc-200 bg-white py-5 text-center text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold text-zinc-800">
            {t.footerText}
          </span>
          <span>© {new Date().getFullYear()} {t.rightsReserved}</span>
        </div>
      </footer>
    </div>
  );
}
