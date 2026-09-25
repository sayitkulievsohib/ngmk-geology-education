import React, { useEffect } from 'react';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  X,
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

  if (!isOpen) return null;

  const handleNavClick = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
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
    <div className="fixed inset-0 z-50 flex">
      {/* Orqa qoraytirilgan fon */}
      <div
        className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Chapdan chiquvchi toza, zamonaviy va nafis korporativ panel */}
      <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Yuqori panel */}
        <div className="px-5 py-4 bg-zinc-950 text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="font-extrabold text-xs sm:text-sm tracking-wider uppercase text-zinc-100">
              {t.menuTitle}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Yopish"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bo'limlar ro'yxati - Toza, zamonaviy chiziqli menyu (mos kelmaydigan sariq qutilarsiz) */}
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

        {/* Pastki qism: Ortiqcha telefon raqami va yozuvlar butunlay olib tashlandi */}
      </div>
    </div>
  );
};
