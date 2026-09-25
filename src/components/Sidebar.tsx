import React, { useEffect } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  BookOpen,
  Award,
  PhoneCall,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, lang }) => {
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
      badge: lang === 'uz' ? '12 ta kurs' : '12 курсов',
    },
    {
      id: 'litsenziya',
      label: t.navLicense,
      icon: Award,
      badge: lang === 'uz' ? 'Davlat hujjati' : 'Гос. документ',
    },
    {
      id: 'qongiroq',
      label: t.navCall,
      icon: PhoneCall,
      badge: lang === 'uz' ? 'Aloqa' : 'Связь',
    },
    {
      id: 'manzil',
      label: t.navAddress,
      icon: MapPin,
      badge: 'Navoiy sh.',
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      {/* Orqa qoraytirilgan fon - Mayin ochilib-yopiluvchi animatsiya bilan */}
      <div
        className={`fixed inset-0 bg-zinc-950/45 backdrop-blur-[2px] transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Chapdan mayin sirg'alib chiquvchi panel (X tugmasisiz) */}
      <div
        className={`relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Yuqori panel: Qat'iy va rasmiy sarlavha */}
        <div className="px-5 py-4 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-zinc-100">
              {t.menuTitle}
            </span>
          </div>
        </div>

        {/* Bo'limlar ro'yxati */}
        <nav className="p-3 flex-1 overflow-y-auto divide-y divide-zinc-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="w-full text-left py-3 px-3 rounded-lg hover:bg-zinc-50 flex items-center justify-between gap-3 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 group-hover:bg-amber-100/80 flex items-center justify-center text-zinc-600 group-hover:text-amber-700 transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm text-zinc-800 group-hover:text-zinc-950 transition-colors">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium text-zinc-400 group-hover:text-zinc-500 transition-colors">
                    {item.badge}
                  </span>
                  <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-zinc-500 transition-colors shrink-0" />
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
