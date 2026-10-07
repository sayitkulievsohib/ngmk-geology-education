import React, { useEffect } from 'react';
import { COURSES_LIST } from '../data/courses';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  BookOpen,
  Award,
  PhoneCall,
  MapPin,
  ChevronRight,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  // Orqa fondagi scrollni to'xtatish
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // Escape bosilganda yopish
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const navItems = [
    {
      id: 'katalog',
      label: t.navCatalog,
      icon: BookOpen,
      badge: lang === 'uz' ? `${COURSES_LIST.length} ta kurs` : `${COURSES_LIST.length} курсов`,
      action: () => handleNavClick('katalog')
    },
    {
      id: 'litsenziya',
      label: t.navLicense,
      icon: Award,
      badge: lang === 'uz' ? 'Davlat hujjati' : 'Гос. документ',
      action: () => handleNavClick('litsenziya')
    },
    {
      id: 'qongiroq',
      label: t.navCall,
      icon: PhoneCall,
      badge: lang === 'uz' ? 'Aloqa' : 'Связь',
      action: () => handleNavClick('qongiroq')
    },
    {
      id: 'manzil',
      label: t.navAddress,
      icon: MapPin,
      badge: t.navAddressBadge,
      action: () => handleNavClick('manzil')
    }
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      {/* Orqa qoraytirilgan fon */}
      <div
        className={`fixed inset-0 bg-zinc-950/45 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Chapdan sirg'alib chiquvchi panel */}
      <div
        className={`relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Yuqori panel: Qat'iy va rasmiy sarlavha */}
        <div className="px-5 py-4 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-zinc-100">
              {t.menuTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bo'limlar ro'yxati */}
        <nav className="p-3 flex-1 overflow-y-auto divide-y divide-zinc-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={item.action}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-zinc-50 flex items-center justify-between gap-3 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-amber-100/80 flex items-center justify-center text-zinc-600 group-hover:text-amber-700 transition-colors shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold text-xs sm:text-sm text-zinc-800 group-hover:text-zinc-950 transition-colors">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 group-hover:text-zinc-500 transition-colors">
                    {item.badge}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0" />
                </div>
              </button>
            );
          })}
        </nav>

        {/* Pastki qism: Rasmiy tashkilot imzosi */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-zinc-200 bg-white p-0.5 overflow-hidden flex items-center justify-center shrink-0">
              <img
                src="/logo/logo.png"
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-extrabold text-xs text-zinc-900 truncate">
                NGMK GEOLOGY EDUCATION
              </div>
              <div className="text-[10px] text-zinc-500 truncate">
                {lang === 'uz' ? 'Kasbiy ta’lim markazi' : 'Учебный центр'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
