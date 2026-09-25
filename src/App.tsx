import React, { useState } from 'react';
import { COURSES_LIST, CourseItem } from './data/courses';
import { Language, TRANSLATIONS } from './data/translations';
import { HeaderLogo } from './components/HeaderLogo';
import { CourseTable } from './components/CourseTable';
import { ContactSection } from './components/ContactSection';
import { EnrollModal } from './components/EnrollModal';
import { LanguageToggle } from './components/LanguageToggle';

export default function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);

  const t = TRANSLATIONS[lang];

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'uz' ? 'ru' : 'uz'));
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* Asosiy konteyner (Telefon va desktop uchun moslashtirilgan) */}
      <main className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* 1. Dumaloq shakldagi logo (Top barlarsiz va kirish qismlarisiz, markazda) */}
        <HeaderLogo lang={lang} />

        {/* 2. Oq fonda ketma-ketlikdagi konchilik kurslari jadvali */}
        <section className="mt-2 sm:mt-4">
          <CourseTable
            courses={COURSES_LIST}
            lang={lang}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        </section>

        {/* 3. Telefon raqamlar va Telegram manzillari */}
        <ContactSection lang={lang} />
      </main>

      {/* Pastki o'ng burchakdagi suzib yuruvchi dumaloq til tanlash tugmasi (UZ / RU) */}
      <LanguageToggle currentLang={lang} onToggle={handleToggleLang} />

      {/* Kursga yozilish modal darchasi */}
      <EnrollModal
        course={selectedCourse}
        lang={lang}
        onClose={() => setSelectedCourse(null)}
      />

      {/* Rasmiy minimal footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500">
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
