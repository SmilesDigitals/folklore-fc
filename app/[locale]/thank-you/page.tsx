'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import { useParams } from 'next/navigation';

const TRANSLATIONS: any = {
  en: {
    back: 'Back to Home',
    title: 'GET IN TOUCH',
    intro: "Have a question about your order or want to collaborate? We'd love to hear from you.",
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    placeholderName: 'Your name',
    placeholderMsg: 'How can we help?',
    successMsg: 'Your request has been sent successfully and we will get back to you as soon as possible.'
  },
  ar: {
    back: 'العودة للرئيسية',
    title: 'تواصل معنا',
    intro: 'لديك استفسار حول طلبك أو ترغب في التعاون؟ نسعد بسماع رأيك.',
    name: 'الاسم',
    email: 'البريد الإلكتروني',
    message: 'الرسالة',
    send: 'إرسال الرسالة',
    sending: 'جاري الإرسال...',
    placeholderName: 'اسمك الكريم',
    placeholderMsg: 'كيف يمكننا مساعدتك؟',
    successMsg: 'لقد تم إرسال طلبك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن.'
  },
  fr: {
    back: "Retour à l'accueil",
    title: 'CONTACTEZ-NOUS',
    intro: 'Vous avez une question sur votre commande ou souhaitez collaborer ? Nous serions ravis de vous entendre.',
    name: 'Nom',
    email: 'E-mail',
    message: 'Message',
    send: 'Envoyer le message',
    sending: 'Envoi en cours...',
    placeholderName: 'Votre nom',
    placeholderMsg: 'Comment pouvons-nous aider ?',
    successMsg: 'Votre demande a été envoyée avec succès et nous vous répondrons dans les plus brefs délais.'
  },
  es: {
    back: 'Volver al Inicio',
    title: 'CONTÁCTANOS',
    intro: '¿Tienes una pregunta sobre tu pedido o quieres colaborar? Nos encantaría saber de ti.',
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    placeholderName: 'Tu nombre',
    placeholderMsg: '¿Cómo podemos ayudarte?',
    successMsg: 'Tu solicitud ha sido enviada con éxito y nos pondremos en contacto contigo lo antes posible.'
  },
  ja: {
    back: 'ホームに戻る',
    title: 'お問い合わせ',
    intro: 'ご注文に関するご質問やコラボレーションのご希望はありますか？ご連絡をお待ちしております。',
    name: '名前',
    email: 'メールアドレス',
    message: 'メッセージ',
    send: 'メッセージを送信',
    sending: '送信中...',
    placeholderName: 'お名前',
    placeholderMsg: 'どのようなご用件でしょうか？',
    successMsg: 'お問い合わせは正常に送信されました。できるだけ早く返信いたします。'
  }
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mnnezrpv", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-5xl mx-auto py-12">
        <Link href={`/${locale}`} className={`inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors`}>
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} /> 
          {t.back}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h1 className="text-5xl font-black tracking-tighter mb-6 uppercase">{t.title}</h1>
            <p className="text-gray-400 mb-8">{t.intro}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-xl border border-[#27272a]">
                <Mail className="text-emerald-500" />
                <span className="font-medium">support@folklorefc.com</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-xl border border-[#27272a]">
                <Phone className="text-emerald-500" />
                <span dir="ltr">+212 707 230 031</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-[#18181b] rounded-xl border border-[#27272a]">
                <MapPin className="text-emerald-500" />
                <span>Casablanca, Morocco</span>
              </div>
            </div>
          </div>

          {/* Form / Success Message */}
          <div className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a]">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-500" size={40} />
                </div>
                <h2 className="text-2xl font-bold">{isRtl ? 'شكراً لك!' : 'Thank you!'}</h2>
                <p className="text-gray-400 leading-relaxed">{t.successMsg}</p>
                <button onClick={() => setStatus('idle')} className="text-sm text-emerald-500 hover:underline">
                  {isRtl ? 'إرسال رسالة أخرى' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-sm font-medium mb-2 text-gray-400">{t.name}</label>
                  <input name="name" type="text" required className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder={t.placeholderName} />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-sm font-medium mb-2 text-gray-400">{t.email}</label>
                  <input name="email" type="email" required className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder="example@gmail.com" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-sm font-medium mb-2 text-gray-400">{t.message}</label>
                  <textarea name="message" rows={4} required className="w-full bg-[#09090b] border border-[#27272a] rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" placeholder={t.placeholderMsg} />
                </div>
                <button 
                  disabled={status === 'submitting'}
                  className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-emerald-500 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                >
                  {status === 'submitting' ? t.sending : t.send}
                </button>
                {status === 'error' && <p className="text-red-500 text-sm mt-2">{isRtl ? 'عذراً، حدث خطأ. حاول ثانية.' : 'Something went wrong. Please try again.'}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}