'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Package, UserPlus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const TRANSLATIONS: any = {
  en: {
    back: 'Back to Shop',
    title: 'ORDER CONFIRMED!',
    subtitle: 'Thank you for shopping with Folklore FC.',
    message: 'Your order has been successfully placed. We will send you an email confirmation with your tracking details shortly.',
    createAccountTitle: 'Track Your Order',
    createAccountDesc: 'Create an account to track your orders, save your details for faster checkout, and get exclusive offers.',
    createAccountBtn: 'Create Account',
    continueShopping: 'Continue Shopping'
  },
  ar: {
    back: 'العودة للمتجر',
    title: 'تم تأكيد طلبك!',
    subtitle: 'شكراً لتسوقك مع فولكلور إف سي.',
    message: 'لقد تم تسجيل طلبك بنجاح. سنرسل لك رسالة تأكيد بالبريد الإلكتروني تحتوي على تفاصيل التتبع قريباً.',
    createAccountTitle: 'تتبع طلبك',
    createAccountDesc: 'أنشئ حساباً لتتبع طلباتك، حفظ بياناتك لتجربة دفع أسرع، والحصول على عروض حصرية.',
    createAccountBtn: 'إنشاء حساب',
    continueShopping: 'متابعة التسوق'
  },
  fr: {
    back: 'Retour à la boutique',
    title: 'COMMANDE CONFIRMÉE !',
    subtitle: 'Merci de vos achats chez Folklore FC.',
    message: 'Votre commande a été passée avec succès. Nous vous enverrons bientôt un e-mail de confirmation avec les détails de suivi.',
    createAccountTitle: 'Suivre votre commande',
    createAccountDesc: 'Créez un compte pour suivre vos commandes, enregistrer vos coordonnées et obtenir des offres.',
    createAccountBtn: 'Créer un compte',
    continueShopping: 'Continuer les achats'
  },
  es: {
    back: 'Volver a la Tienda',
    title: '¡PEDIDO CONFIRMADO!',
    subtitle: 'Gracias por comprar en Folklore FC.',
    message: 'Tu pedido se ha realizado con éxito. En breve te enviaremos un correo electrónico de confirmación con los detalles de seguimiento.',
    createAccountTitle: 'Rastrea tu pedido',
    createAccountDesc: 'Crea una cuenta para rastrear tus pedidos, guardar tus detalles para un pago más rápido y recibir ofertas exclusivas.',
    createAccountBtn: 'Crear Cuenta',
    continueShopping: 'Continuar Comprando'
  },
  ja: {
    back: 'ショップに戻る',
    title: 'ご注文完了！',
    subtitle: 'Folklore FCでのショッピングありがとうございます。',
    message: 'ご注文が正常に完了しました。追跡の詳細を記載した確認メールをまもなく送信いたします。',
    createAccountTitle: '注文を追跡',
    createAccountDesc: 'アカウントを作成して注文を追跡し、次回のチェックアウトを迅速に行い、限定オファーを受け取りましょう。',
    createAccountBtn: 'アカウントを作成',
    continueShopping: '買い物を続ける'
  }
};

export default function ThankYouPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';
  const { user, loading, openAuthModal } = useAuth();

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto py-12">
        <Link href={`/${locale}`} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {t.back}
        </Link>

        <div className="bg-[#18181b] p-8 md:p-12 rounded-3xl border border-[#27272a] shadow-2xl text-center relative overflow-hidden">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 mx-auto mb-8 relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-75"></div>
            <CheckCircle2 className="text-emerald-500 relative z-10" size={56} />
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 uppercase text-emerald-500">
            {t.title}
          </h1>
          <h2 className="text-xl md:text-2xl font-bold mb-4">{t.subtitle}</h2>

          <p className="text-gray-400 max-w-lg mx-auto leading-relaxed mb-10">
            {t.message}
          </p>

          {!loading && !user && (
            <div className={`mt-8 mb-8 p-6 bg-[#09090b] rounded-2xl border border-dashed border-gray-600 flex flex-col md:flex-row items-center justify-between gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <UserPlus className="text-emerald-500" size={24} />
                  <h3 className="text-xl font-bold">{t.createAccountTitle}</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  {t.createAccountDesc}
                </p>
              </div>
              <button
                onClick={() => openAuthModal('signup')}
                className="w-full md:w-auto whitespace-nowrap px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg hover:-translate-y-1"
              >
                {t.createAccountBtn}
              </button>
            </div>
          )}

          <div className="mt-8 border-t border-[#27272a] pt-8">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#27272a] hover:bg-[#3f3f46] text-white font-bold rounded-xl transition-colors"
            >
              <Package size={20} />
              {t.continueShopping}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}