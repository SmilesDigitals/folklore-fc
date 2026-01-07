'use client';

import React, { useState } from 'react';
import { X, Ruler, AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';

// قاموس الترجمة لدليل المقاسات
const TRANSLATIONS: any = {
  en: {
    menTitle: "Men's Size Guide",
    womenTitle: "Women's Size Guide",
    size: "Size",
    width: "Width",
    length: "Length",
    cmUnit: "CM (EU/Asia)",
    inUnit: "Inches (US)",
    euTitle: "Europe & International",
    euTip: "Sizes are generally true to size. If you prefer a loose fit, go one size up.",
    asiaTitle: "Asia Customers",
    asiaTip: "US sizes run larger than Asian sizes. We recommend ordering one size smaller for a fitted look.",
    button: "Continue Order"
  },
  ar: {
    menTitle: "دليل مقاسات الرجال",
    womenTitle: "دليل مقاسات النساء",
    size: "المقاس",
    width: "العرض",
    length: "الطول",
    cmUnit: "سم (أوروبا/آسيا)",
    inUnit: "بوصة (أمريكا)",
    euTitle: "أوروبا والعالم",
    euTip: "المقاسات مطابقة للمعايير العالمية. إذا كنت تحب الملابس الواسعة، اختر مقاساً أكبر.",
    asiaTitle: "عملاء آسيا",
    asiaTip: "المقاسات الأمريكية أكبر من الآسيوية. ننصح بطلب مقاس أصغر للحصول على مظهر متناسق.",
    button: "متابعة الطلب"
  },
  fr: {
    menTitle: "Guide des Tailles Hommes",
    womenTitle: "Guide des Tailles Femmes",
    size: "Taille",
    width: "Largeur",
    length: "Longueur",
    cmUnit: "CM (UE/Asie)",
    inUnit: "Pouces (US)",
    euTitle: "Europe & International",
    euTip: "Les tailles sont standard. Pour une coupe large, prenez une taille au-dessus.",
    asiaTitle: "Clients d'Asie",
    asiaTip: "Les tailles US sont plus grandes que les tailles asiatiques. Nous recommandons une taille en dessous.",
    button: "Continuer la commande"
  },
  es: {
    menTitle: "Guía de Tallas Hombre",
    womenTitle: "Guía de Tallas Mujer",
    size: "Talla",
    width: "Ancho",
    length: "Largo",
    cmUnit: "CM (UE/Asia)",
    inUnit: "Pulgadas (US)",
    euTitle: "Europa e Internacional",
    euTip: "Las tallas son estándar. Si prefieres un ajuste holgado, pide una talla más.",
    asiaTitle: "Clientes de Asia",
    asiaTip: "Las tallas de EE. UU. son más grandes que las asiáticas. Recomendamos una talla menos.",
    button: "Continuar con el pedido"
  },
  ja: {
    menTitle: "メンズ サイズガイド",
    womenTitle: "レディース サイズガイド",
    size: "サイズ",
    width: "身幅",
    length: "着丈",
    cmUnit: "CM (欧州/アジア)",
    inUnit: "インチ (米国)",
    euTitle: "ヨーロッパ & インターナショナル",
    euTip: "通常通りのサイズ感です。ゆったりめが好みの方は1サイズ上をお勧めします。",
    asiaTitle: "アジアのお客様へ",
    asiaTip: "USサイズはアジアサイズより大きめです。ジャストサイズには1サイズ下をお勧めします。",
    button: "注文を続ける"
  }
};

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender?: string;
}

export default function SizeGuideModal({ isOpen, onClose, gender }: SizeGuideModalProps) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';
  const [unit, setUnit] = useState<'inches' | 'cm'>('cm');

  if (!isOpen) return null;

  const menSizeData = [
    { size: 'S', widthIn: '18', lengthIn: '28', widthCm: '46', lengthCm: '71' },
    { size: 'M', widthIn: '20', lengthIn: '29', widthCm: '51', lengthCm: '74' },
    { size: 'L', widthIn: '22', lengthIn: '30', widthCm: '56', lengthCm: '76' },
    { size: 'XL', widthIn: '24', lengthIn: '31', widthCm: '61', lengthCm: '79' },
    { size: '2XL', widthIn: '26', lengthIn: '32', widthCm: '66', lengthCm: '81' },
    { size: '3XL', widthIn: '28', lengthIn: '33', widthCm: '71', lengthCm: '84' },
    { size: '4XL', widthIn: '30', lengthIn: '34', widthCm: '76', lengthCm: '86' },
    { size: '5XL', widthIn: '32', lengthIn: '35', widthCm: '81', lengthCm: '89' },
  ];

  const sizeData = gender === 'women' ? menSizeData : menSizeData; // يمكنك تخصيص بيانات النساء هنا [cite: 26, 27]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#27272a]">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Ruler className="text-emerald-500" /> 
            {gender === 'women' ? t.womenTitle : t.menTitle}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {/* Unit Switcher */}
          <div className="flex justify-center mb-8 bg-[#09090b] p-1 rounded-lg w-fit mx-auto border border-[#27272a]">
            <button onClick={() => setUnit('cm')} className={`px-6 py-2 rounded-md font-bold transition-all ${unit === 'cm' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {t.cmUnit}
            </button>
            <button onClick={() => setUnit('inches')} className={`px-6 py-2 rounded-md font-bold transition-all ${unit === 'inches' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              {t.inUnit}
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#27272a]">
            <table className={`w-full border-collapse ${isRtl ? 'text-right' : 'text-left'}`}>
              <thead>
                <tr className="bg-[#27272a] text-gray-300">
                  <th className="p-4 border-b border-[#3f3f46]">{t.size}</th>
                  <th className="p-4 border-b border-[#3f3f46]">{t.width} ({unit})</th>
                  <th className="p-4 border-b border-[#3f3f46]">{t.length} ({unit})</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {sizeData.map((row, index) => (
                  <tr key={row.size} className={index % 2 === 0 ? 'bg-[#18181b]' : 'bg-[#09090b]'}>
                    <td className="p-4 border-b border-[#27272a] font-bold text-white">{row.size}</td>
                    <td className="p-4 border-b border-[#27272a]">{unit === 'inches' ? row.widthIn : row.widthCm}</td>
                    <td className="p-4 border-b border-[#27272a]">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips */}
          <div className="mt-8 space-y-4">
             <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
                <h4 className="text-blue-400 font-bold mb-1 flex items-center gap-2">
                  <span>🌍 {t.euTitle}</span>
                </h4>
                <p className="text-sm text-gray-300">{t.euTip}</p>
             </div>
             <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
                <h4 className="text-yellow-500 font-bold mb-1 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>🇯🇵 {t.asiaTitle}</span>
                </h4>
                <p className="text-sm text-gray-300">{t.asiaTip}</p>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#27272a] bg-[#09090b]/50">
          <button onClick={onClose} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors">
            {t.button}
          </button>
        </div>
      </div>
    </div>
  );
}