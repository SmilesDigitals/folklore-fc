'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';
import { useParams } from 'next/navigation';

// قاموس الترجمة لصفحة Contact
const TRANSLATIONS: any = {
  en: {
    back: 'Back to Home',
    title: 'GET IN TOUCH',
    intro: 'Have a question about your order or want to collaborate? We\'d love to hear from you.',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    placeholderName: 'Your name',
    placeholderMsg: 'How can we help?'
  },
  ar: {
    back: 'العودة للرئيسية',
    title: 'تواصل معنا',
    intro: 'لديك استفسار حول طلبك أو ترغب في التعاون؟ نسعد بسماع رأيك.',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    send: 'إرسال الرسالة',
    placeholderName: 'اسمك الكريم',
    placeholderMsg: 'كيف يمكننا مساعدتك؟'
  },
  fr: {
    back: 'Retour à l\'accueil',
    title: 'CONTACTEZ-NOUS',
    intro: 'Vous avez une question sur votre commande ou souhaitez collaborer ? Nous serions ravis de vous entendre.',
    name: 'Nom',
    email: 'E-mail',
    message: 'Message',
    send: 'Envoyer le message',
    placeholderName: 'Votre nom',
    placeholderMsg: 'Comment pouvons-nous aider ?'
  },
  es: {
    back: 'Volver al Inicio',
    title: 'CONTÁCTANOS',
    intro: '¿Tienes una pregunta sobre tu pedido o quieres colaborar? Nos encantaría saber de ti.',
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    placeholderName: 'Tu nombre',
    placeholderMsg: '¿Cómo podemos ayudarte?'
  },
  ja: {
    back: 'ホームに戻る',
    title: 'お問い合わせ',
    intro: 'ご注文に関するご質問やコラボレーションのご希望はありますか？ご連絡をお待ちしております。',
    name: '名前',
    email: 'メールアドレス',
    message: 'メッセージ',
    send: 'メッセージを送信',
    placeholderName: 'お名前',
    placeholderMsg: 'どのようなご用件でしょうか？'
  }
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto py-12">
        <Link href="/" className={`inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} /> 
          {t.back}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-6">{t.title}</h1>
            <p className="text-gray-400 mb-8">{t.intro}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-xl border border-[#27272a]">
                <Mail className="text-emerald-500" />
                <span>support@folklorefc.com</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-xl border border-[#27272a]">
                <Phone className="text-emerald-500" />
                <span>+966 50 000 0000</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-xl border border-[#27272a]">
                <MapPin className="text-emerald-500" />
                <span>Riyadh, Saudi Arabia</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a] space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">{t.name}</label>
              <input type="text" className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder={t.placeholderName} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">{t.email}</label>
              <input type="email" className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="example@gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-400">{t.message}</label>
              <textarea rows={4} className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none" placeholder={t.placeholderMsg} />
            </div>
            <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">
              {t.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}