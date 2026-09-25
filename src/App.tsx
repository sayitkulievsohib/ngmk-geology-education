import React, { useState } from 'react';
import { COURSES_LIST, CourseItem } from './data/courses';
import { Language, TRANSLATIONS } from './data/translations';
import { HeaderLogo } from './components/HeaderLogo';
import { Sidebar } from './components/Sidebar';
import { CourseTable } from './components/CourseTable';
import { LicenseSection } from './components/LicenseSection';
import { ContactSection } from './components/ContactSection';
import { AddressSection } from './components/AddressSection';
import { EnrollModal } from './components/EnrollModal';

export default function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-amber-400 selection:text-zinc-950">
      {/* 3 ta chiziqcha bosilganda ochiladigan Sidebar (Drawer) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        lang={lang}
      />

      {/* Asosiy konteyner */}
      <main className="max-w-4xl mx-auto px-3.5 sm:px-6 py-3 sm:py-6">
        {/* Yuqori qism: Chapda 3 ta chiziqcha menyu, O'ngda til, markazda logotip va nom */}
        <HeaderLogo
          lang={lang}
          onSelectLang={setLang}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        {/* 1. KATALOG - Rasmiy o'quv kurslari ro'yxati */}
        <section className="mt-1 sm:mt-2">
          <CourseTable
            courses={COURSES_LIST}
            lang={lang}
            onSelectCourse={(course) => setSelectedCourse(course)}
          />
        </section>

        {/* 2. LITSENZIYA - Ochiq varaqlar bilan oldinga-orqaga o'tkazish */}
        <LicenseSection lang={lang} />

        {/* 3. QO'NG'IROQ - Murojaat uchun telefon raqamlari */}
        <ContactSection lang={lang} />

        {/* 4. MANZIL - Siz qo'ygan bino rasmi, aniq manzil, mo'ljal va Google Xarita */}
        <AddressSection lang={lang} />
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
          <span>© 2021-2026 {t.rightsReserved}</span>
        </div>
      </footer>
    </div>
  );
}
