'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Phone, CheckCircle2, Loader2 } from 'lucide-react';
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
    successTitle: 'Thank You!',
    successMsg: 'Your request has been sent successfully and we will get back to you as soon as possible.',
    errorMsg: 'Something went wrong. Please try again.'
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
    successTitle: 'شكراً لك!',
    successMsg: 'لقد تم إرسال طلبك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن.',
    errorMsg: 'عذراً، حدث خطأ. حاول ثانية.'
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
    successTitle: 'Merci !',
    successMsg: 'Votre demande a été envoyée avec succès et nous vous répondrons dans les plus brefs délais.',
    errorMsg: 'Une erreur est survenue. Veuillez réessayer.'
  },
  es: {
    back: 'Volver al Inicio',
    title: 'CONTÁCTANOS',
    intro: '¿Tienes una pregunta sobre tu pedido o quieres colaborar? Nos encantaría saber de ti.',
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Message',
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    placeholderName: 'Tu nombre',
    placeholderMsg: '¿Cómo podemos ayudarte?',
    successTitle: '¡Gracias!',
    successMsg: 'Tu solicitud ha sido enviada con éxito y nos pondremos en contacto contigo lo antes posible.',
    errorMsg: 'Algo salió mal. Por favor, inténtelo de nuevo.'
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
    successTitle: 'ありがとうございました！',
    successMsg: 'お問い合わせは正常に送信されました。できるだけ早く返信いたします。',
    errorMsg: 'エラーが発生しました。もう一度お試しください。'
  }
};

export default function ContactPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // ✅ الدالة المسؤولة عن الإرسال الفعلي
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/mnnezrpv", {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        form.reset(); // تفريغ الحقول بعد النجاح
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
        <Link href={`/${locale}`} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} /> 
          {t.back}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={isRtl ? 'text-right' : 'text-left'}>
            <h1 className="text-5xl font-black tracking-tighter mb-6 uppercase">{t.title}</h1>
            <p className="text-gray-400 mb-8 leading-relaxed">{t.intro}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-5 bg-[#18181b] rounded-2xl border border-[#27272a] hover:border-emerald-500/50 transition-colors">
                <Mail className="text-emerald-500" size={24} />
                <span className="font-semibold">support@folklorefc.com</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-[#18181b] rounded-2xl border border-[#27272a] hover:border-emerald-500/50 transition-colors">
                <Phone className="text-emerald-500" size={24} />
                <span dir="ltr" className="font-semibold">+212 707 230 031</span>
              </div>
              <div className="flex items-center gap-4 p-5 bg-[#18181b] rounded-2xl border border-[#27272a] hover:border-emerald-500/50 transition-colors">
                <MapPin className="text-emerald-500" size={24} />
                <span className="font-semibold">Casablanca, Morocco</span>
              </div>
            </div>
          </div>

          {/* Form / Status Feedback */}
          <div className="bg-[#18181b] p-8 rounded-3xl border border-[#27272a] shadow-2xl relative overflow-hidden">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="text-emerald-500" size={48} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-black">{t.successTitle}</h2>
                  <p className="text-gray-400 max-w-[280px] mx-auto leading-relaxed">{t.successMsg}</p>
                </div>
                <button 
                  onClick={() => setStatus('idle')} 
                  className="px-8 py-3 bg-[#09090b] border border-[#27272a] rounded-xl text-sm font-bold hover:bg-white hover:text-black transition-all"
                >
                  {isRtl ? 'إرسال رسالة أخرى' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-xs font-bold mb-2 text-emerald-500 uppercase tracking-widest">{t.name}</label>
                  {/* ✅ تمت إضافة خاصية name="name" */}
                  <input name="name" type="text" required className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-600" placeholder={t.placeholderName} />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-xs font-bold mb-2 text-emerald-500 uppercase tracking-widest">{t.email}</label>
                  {/* ✅ تمت إضافة خاصية name="email" */}
                  <input name="email" type="email" required className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-600" placeholder="example@gmail.com" />
                </div>
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <label className="block text-xs font-bold mb-2 text-emerald-500 uppercase tracking-widest">{t.message}</label>
                  {/* ✅ تمت إضافة خاصية name="message" */}
                  <textarea name="message" rows={4} required className="w-full bg-[#09090b] border border-[#27272a] rounded-xl p-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-600 resize-none" placeholder={t.placeholderMsg} />
                </div>
                
                <button 
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full bg-white text-black font-black py-5 rounded-xl hover:bg-emerald-500 hover:text-white transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/10"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      {t.sending}
                    </>
                  ) : t.send}
                </button>
                
                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium mt-3 text-center">{t.errorMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}