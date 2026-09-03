import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Droplets, MapPin, Activity, 
  MessageCircle, Phone, QrCode, Share2, 
  Copy, X, Check, UserPlus 
} from 'lucide-react';

// Кастомная иконка Instagram
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

// ==========================================
// ⚙️ НАСТРОЙКИ КОНТЕНТА
// ==========================================
const CONTENT = {
  bgImage: '/bg-beauty.webp', // ФОН: файл bg-nail.jpg в папке public
  avatar: '/avatar-beauty.webp', // АВАТАР: файл avatar-nail.jpg в папке public
  badge: 'Beauty Space',
  name1: 'АЛИНА',
  name2: 'РОУЗ',
  role: 'Бьюти-Эксперт',
  status: 'Запись открыта',
  username: '@alina_beauty',
  subUsername: 'Premium Aesthetics',
  location: 'Ереван, Центр',
  service1: 'Премиум материалы и 100% стерильность',
  service2: 'Приватная эстетичная студия',
  service3: 'Обучение и авторские техники',
  waLink: 'https://wa.me/79990000000',
  instLink: 'https://instagram.com/твой_юзернейм',
  actionText: 'Связаться с мастером',
  actionLink: 'https://wa.me/79990000000'
};

// ==========================================
// 🎨 ГЛОБАЛЬНЫЕ СТИЛИ
// ==========================================
const globalStyles = `
  :root {
    --card-h: calc(min(22rem, 50vh) * 1.6);
  }
  @media (min-width: 640px) {
    :root {
      --card-h: calc(min(22rem, 50vh) * 1.5);
    }
  }
  body {
    background-color: #0a0a0a;
    overscroll-behavior: none;
    overflow-x: hidden;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @keyframes float {
    0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-2deg); }
    100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .card-preserve-3d {
    transform-style: preserve-3d;
    -webkit-transform-style: preserve-3d;
  }
  .card-backface-hidden {
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
  }
  
  /* Искры */
  @keyframes spark-explode {
    0% { transform: translate(0, 0) scale(0.5); opacity: 0.8; }
    100% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
  }
  @keyframes spark-wander {
    0% { transform: translate(var(--tx), var(--ty)) scale(1); opacity: 0.6; }
    33% { transform: translate(calc(var(--tx) * 1.5 + var(--wx1)), calc(var(--ty) * 1.5 + var(--wy1))) scale(1.5); opacity: 0.8; }
    66% { transform: translate(calc(var(--tx) * 2.5 + var(--wx2)), calc(var(--ty) * 2.5 + var(--wy2))) scale(1.2); opacity: 0.5; }
    100% { transform: translate(calc(var(--tx) * 4 + var(--wx3)), calc(var(--ty) * 4 + var(--wy3))) scale(0.8); opacity: 0; }
  }
  .spark-particle {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
    pointer-events: none;
    animation: 
      spark-explode 0.8s cubic-bezier(0.1, 0.8, 0.3, 1) forwards,
      spark-wander var(--wt) linear 0.8s forwards;
  }
  
  /* Эффект сгорающей бумаги */
  @media (max-width: 639px) {
    @keyframes mobile-fade-in {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    .smooth-mask-wipe {
      opacity: 0;
      animation: mobile-fade-in 1.5s ease-out forwards;
    }
    .burn-fire-edge {
      display: none;
    }
  }

  @media (min-width: 640px) {
    @keyframes burn-mask-reveal {
      0% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
      100% { -webkit-mask-position: 0% 100%; mask-position: 0% 100%; }
    }
    @keyframes burn-fire-scan {
      0% { background-position: 100% 0%; opacity: 0; }
      5% { opacity: 1; }
      95% { opacity: 1; }
      100% { background-position: 0% 100%; opacity: 0; }
    }
    .smooth-mask-wipe {
      -webkit-mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      mask-image: linear-gradient(225deg, transparent 47%, rgba(0,0,0,0.6) 49%, black 51%);
      -webkit-mask-size: 300% 300%;
      mask-size: 300% 300%;
      -webkit-mask-position: 100% 0%;
      mask-position: 100% 0%;
      animation: burn-mask-reveal 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: mask-position, -webkit-mask-position;
    }
    .burn-fire-edge {
      background: 
        linear-gradient(224deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1) 49.5%, 
          var(--burn-c2) 50%, 
          var(--burn-c3) 50.2%,
          transparent 51%
        ),
        linear-gradient(226deg, 
          transparent 48.5%, 
          rgba(20, 5, 0, 0.95) 49%, 
          var(--burn-c1) 49.5%, 
          var(--burn-c2) 50%, 
          var(--burn-c3) 50.2%,
          transparent 51%
        );
      background-size: 300% 300%;
      background-position: 100% 0%;
      mix-blend-mode: normal;
      filter: drop-shadow(0 0 8px var(--burn-c2)) blur(0.5px);
      animation: burn-fire-scan 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      will-change: background-position, opacity;
    }
  }
`;

// ==========================================
// 🪄 КОМПОНЕНТ ЭФФЕКТА СГОРАНИЯ
// ==========================================
const BurnRevealImage = ({ src, className, style, imgClassName = "" }) => {
  // Цветовая тема огня жестко зафиксирована под "Бьюти" (Rose/Pink)
  const theme = { 
    c1: 'rgba(159, 18, 57, 0.9)', 
    c2: 'rgba(244, 63, 94, 1)', 
    c3: 'rgba(253, 164, 175, 0.8)' 
  };

  return (
    <div className={`absolute inset-0 pointer-events-none rounded-[2.5rem] ${className}`} style={{ ...style, clipPath: 'inset(0 round 2.5rem)', WebkitClipPath: 'inset(0 round 2.5rem)' }}>
      <div 
        className={`absolute inset-0 bg-cover bg-center smooth-mask-wipe rounded-[2.5rem] ${imgClassName}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      <div 
        className="absolute inset-0 burn-fire-edge rounded-[2.5rem]" 
        style={{
          '--burn-c1': theme.c1,
          '--burn-c2': theme.c2,
          '--burn-c3': theme.c3,
        }}
      />
    </div>
  );
};

// ==========================================
// 🌸 КОМПОНЕНТ ВИЗИТКИ (BEAUTY SPACE)
// ==========================================
const BeautyCard = () => {
  const [view, setView] = useState('services'); // Состояние для переключателя

  return (
    <>
      {/* ЛИЦЕВАЯ СТОРОНА */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(244,114,182,0.3)] overflow-hidden bg-black text-white flex flex-col p-6 group-hover:shadow-[0_20px_80px_rgba(244,114,182,0.5)] transition-shadow duration-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-900 via-pink-800 to-amber-700/50 opacity-80 mix-blend-screen"></div>
        
        {/* Темный градиент для контраста */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-rose-950/50 to-transparent"></div>
        
        {/* Сгорающий фон */}
        <BurnRevealImage src={CONTENT.bgImage} className="opacity-40 grayscale" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div className="flex justify-between items-start">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-pink-300/30 flex items-center gap-2 shadow-[0_0_15px_rgba(244,114,182,0.2)]">
              <Sparkles className="w-4 h-4 text-pink-300" />
              <span className="text-xs font-medium tracking-widest uppercase text-pink-50">{CONTENT.badge}</span>
            </div>
            <Droplets className="w-8 h-8 text-pink-200/80 drop-shadow-[0_0_15px_rgba(244,114,182,0.6)]" />
          </div>

          <div className="text-center pb-2">
            <h2 className="text-3xl sm:text-4xl leading-tight font-serif font-light mb-1 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white to-rose-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
              {CONTENT.name1}
              <br />
              {CONTENT.name2}
            </h2>
            <div className="flex flex-col items-center gap-2 mt-3">
              <p className="text-pink-200 font-serif font-medium text-[10px] uppercase tracking-[0.3em] bg-black/40 px-4 py-1.5 rounded-full border border-pink-300/30">
                {CONTENT.role}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse shadow-[0_0_8px_rgba(251,113,133,0.8)]"></span>
                <span className="text-[8px] font-bold uppercase tracking-widest text-rose-200">{CONTENT.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ОБРАТНАЯ СТОРОНА (Premium Silk & Rose Gold) */}
      <div className="absolute inset-0 w-full h-full card-backface-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(244,114,182,0.3)] overflow-hidden flex flex-col text-white border border-rose-900/50 bg-[#0a0507]" style={{ transform: 'rotateY(180deg)' }}>
        
        {/* Обертка для фона */}
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
          {/* Глубокий премиальный фон с ликвид-свечением */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a0a18] via-[#11050a] to-[#000000] opacity-90 z-0"></div>
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-rose-600/20 blur-[70px] rounded-full z-0 mix-blend-screen"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-56 h-56 bg-amber-500/10 blur-[60px] rounded-full z-0 mix-blend-screen"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full p-6">
          
          {/* Header */}
          <div className="flex flex-col items-center mt-2">
            {/* Изящное кольцо из розового золота вокруг аватара */}
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-br from-amber-200 via-rose-400 to-pink-300 shadow-[0_0_20px_rgba(244,114,182,0.2)] mb-3">
              <img src={CONTENT.avatar} alt={CONTENT.name1} className="w-full h-full object-cover rounded-full border-[2px] border-[#0a0507]" />
            </div>
            <h3 className="text-lg font-serif font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-rose-50 to-rose-200 uppercase leading-none mb-1.5">{CONTENT.username}</h3>
            <p className="text-amber-200/70 text-[8px] uppercase tracking-[0.3em] font-medium">{CONTENT.subUsername}</p>
            
            {/* Тонкая линия локации */}
            <div className="flex items-center gap-1.5 mt-3 border-b border-rose-500/30 pb-1 px-2">
              <MapPin className="w-2.5 h-2.5 text-rose-400" />
              <span className="text-[8px] font-medium text-rose-100/70 uppercase tracking-widest">{CONTENT.location}</span>
            </div>
          </div>

          {/* Воздушные табы (Переключатель) */}
          <div className="flex justify-center gap-6 my-5 relative z-20 no-tilt cursor-default">
            <button 
              onClick={(e) => { e.stopPropagation(); setView('services'); }} 
              className={`pb-1 text-[9px] uppercase tracking-[0.2em] transition-all duration-500 relative ${view === 'services' ? 'text-rose-50 font-bold' : 'text-rose-300/40 hover:text-rose-200/80'}`}
            >
              Экспертиза
              {view === 'services' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent shadow-[0_0_8px_rgba(251,113,133,0.8)]"></span>}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setView('contacts'); }} 
              className={`pb-1 text-[9px] uppercase tracking-[0.2em] transition-all duration-500 relative ${view === 'contacts' ? 'text-rose-50 font-bold' : 'text-rose-300/40 hover:text-rose-200/80'}`}
            >
              Визит
              {view === 'contacts' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent shadow-[0_0_8px_rgba(251,113,133,0.8)]"></span>}
            </button>
          </div>

          {/* Контейнер контента */}
          <div className="flex-1 w-full relative overflow-hidden mb-2">
            
            {/* Вкладка 1: Услуги (Экспертиза) */}
            <div className={`absolute inset-0 flex flex-col gap-3 justify-center transition-all duration-700 ease-in-out ${view === 'services' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6 pointer-events-none'}`}>
              {[CONTENT.service1, CONTENT.service2, CONTENT.service3].map((service, idx) => (
                <div key={idx} className="bg-black/40 backdrop-blur-md border border-rose-500/10 rounded-xl p-4 flex items-center gap-3.5 shadow-inner relative overflow-hidden group">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-300/50 to-rose-400/50"></div>
                  <div className="w-1.5 h-1.5 shrink-0 rounded-full bg-rose-300/80 shadow-[0_0_8px_rgba(251,113,133,0.8)] ml-1"></div>
                  <span className="font-serif font-light text-[12px] leading-tight tracking-wide text-rose-50/90">{service}</span>
                </div>
              ))}
            </div>

            {/* Вкладка 2: Визит (Информация) */}
            <div className={`absolute inset-0 flex flex-col gap-3 justify-center transition-all duration-700 ease-in-out ${view === 'contacts' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6 pointer-events-none'}`}>
              
              <div className="bg-black/40 backdrop-blur-md border border-rose-500/10 rounded-xl p-3.5 flex flex-col gap-1 shadow-inner relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-300/50 to-rose-400/50"></div>
                <div className="flex items-center gap-2 mb-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-300 shrink-0 ml-1" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-rose-300/60 font-medium">Локация</span>
                </div>
                <span className="font-serif font-light text-[12px] leading-tight text-rose-50/90 pl-6">Центр, удобная закрытая парковка</span>
              </div>

              <div className="bg-black/40 backdrop-blur-md border border-rose-500/10 rounded-xl p-3.5 flex flex-col gap-1 shadow-inner relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-300/50 to-rose-400/50"></div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Activity className="w-3.5 h-3.5 text-rose-300 shrink-0 ml-1" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-rose-300/60 font-medium">Время</span>
                </div>
                <span className="font-serif font-light text-[12px] leading-tight text-rose-50/90 pl-6">10:00 — 20:00 (Вт–Вс), строго по записи</span>
              </div>

              <div className="bg-black/40 backdrop-blur-md border border-rose-500/10 rounded-xl p-3.5 flex flex-col gap-1 shadow-inner relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-300/50 to-rose-400/50"></div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-300 shrink-0 ml-1" />
                  <span className="text-[9px] uppercase tracking-[0.2em] text-rose-300/60 font-medium">Сервис</span>
                </div>
                <span className="font-serif font-light text-[12px] leading-tight text-rose-50/90 pl-6">Авторский кофе, зона отдыха, Wi-Fi</span>
              </div>

            </div>

          </div>

          {/* Сквозной нижний бар: 3 красивые круглые кнопки в ряд */}
          <div className="flex justify-center gap-5 w-full mt-auto z-20 no-tilt pb-1">
            <a href={CONTENT.waLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 shrink-0 bg-black/40 backdrop-blur-md border border-rose-500/30 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-emerald-900/30 transition-all active:scale-95 group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform relative z-10" />
            </a>
            <a href={CONTENT.instLink} target="_blank" rel="noopener noreferrer" className="w-12 h-12 shrink-0 bg-black/40 backdrop-blur-md border border-rose-500/30 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-pink-900/30 transition-all active:scale-95 group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <InstagramIcon className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform relative z-10" />
            </a>
            <a href="tel:+79990000000" className="w-12 h-12 shrink-0 bg-black/40 backdrop-blur-md border border-rose-500/30 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-rose-900/40 transition-all active:scale-95 group relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <Phone className="w-5 h-5 text-rose-300 group-hover:scale-110 transition-transform relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

// ==========================================
// 🚀 ОСНОВНОЕ ПРИЛОЖЕНИЕ
// ==========================================
const App = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [sparks, setSparks] = useState([]);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState('RU');
  
  const cardRef = useRef(null);
  const audioCtxRef = useRef(null);
  const isFlippingRef = useRef(false);

  // Настройки цвета темы под Бьюти-сферу
  const glowColor = 'rgba(244,114,182,0.6)'; // Розовый
  const modalTheme = { bg: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.3)', icon: 'text-pink-400' };

  // Параллакс фона
  useEffect(() => {
    const handleGlobalMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = (clientX / window.innerWidth - 0.5) * 80;
      const y = (clientY / window.innerHeight - 0.5) * 80;
      setBgOffset({ x: -x, y: -y });
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('touchmove', handleGlobalMove);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('touchmove', handleGlobalMove);
    };
  }, []);

  // 3D наклон
  const handlePointerMove = (e) => {
    if (isFlippingRef.current || !cardRef.current || isFlipped) return;
    
    if (e.target.closest('.no-tilt')) {
      setRotate({ x: 0, y: 0 });
      setGlare(prev => ({ ...prev, opacity: 0 }));
      return;
    }
    
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -25;
    const rotateY = ((x - centerX) / centerX) * 25;
    
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: glareX, y: glareY, opacity: 1 });
  };

  const handlePointerLeave = () => {
    if (isFlippingRef.current) return;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  // Звук переворота
  const playFlipSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Игнорируем ошибки
    }
  };

  const handleFlip = () => {
    playFlipSound();
    
    isFlippingRef.current = true;
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    
    setTimeout(() => { isFlippingRef.current = false; }, 700);

    if (!isFlipped) {
      const newSparks = Array.from({ length: 35 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 35 + (Math.random() * 0.5);
        const distance = 80 + Math.random() * 100;
        return {
          id: Date.now() + i,
          tx: Math.cos(angle) * distance + 'px',
          ty: Math.sin(angle) * distance + 'px',
          wx1: (Math.random() - 0.5) * 100 + 'px',
          wy1: (Math.random() - 0.5) * 100 + 'px',
          wx2: (Math.random() - 0.5) * 200 + 'px',
          wy2: (Math.random() - 0.5) * 200 + 'px',
          wx3: (Math.random() - 0.5) * 300 + 'px',
          wy3: (Math.random() - 0.5) * 300 + 'px',
          wt: (20 + Math.random() * 20) + 's',
          size: Math.random() * 2.5 + 1.5 + 'px',
        };
      });
      setSparks(newSparks);
    } else {
      setSparks([]);
    }

    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([30, 30, 40]); 
    }
    setIsFlipped(!isFlipped);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Моя цифровая визитка',
          text: 'Привет! Вот моя визитка с контактами:',
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  const downloadVCard = () => {
    let phoneStr = '';
    if (CONTENT.waLink) {
      const match = CONTENT.waLink.match(/\d+/);
      if (match) phoneStr = `+${match[0]}`;
    }

    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${CONTENT.name1} ${CONTENT.name2}`,
      `TITLE:${CONTENT.role}`,
      phoneStr ? `TEL;TYPE=CELL,VOICE:${phoneStr}` : '',
      phoneStr ? `URL;TYPE=WhatsApp:https://wa.me/${phoneStr.replace('+', '')}` : '',
      `URL:${typeof window !== 'undefined' ? window.location.href : ''}`,
      'END:VCARD'
    ].filter(Boolean).join('\n');
    
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-[100dvh] bg-neutral-950 flex flex-col font-sans select-none relative overflow-hidden justify-center items-center p-4 sm:p-8">
      <style>{globalStyles}</style>

      {/* Параллакс-сферы (Тематические цвета Бьюти - Pink/Amber) */}
      <div 
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x}px, ${bgOffset.y}px)` }}
      ></div>
      <div 
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${bgOffset.x * 1.5}px, ${bgOffset.y * 1.5}px)` }}
      ></div>

      {/* ОСНОВНОЙ КОНТЕЙНЕР (отцентрирован идеально) */}
      <div className="w-full flex flex-col items-center relative z-40">
        
        {/* Карточка */}
        <div 
          ref={cardRef}
          className="relative z-10 w-full aspect-[1/1.6] sm:aspect-[1/1.5] cursor-pointer group animate-float touch-none"
          style={{ perspective: '1500px', maxWidth: 'min(22rem, 85vw, 55vh)' }}
          onClick={handleFlip}
          onMouseMove={handlePointerMove}
          onMouseLeave={handlePointerLeave}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerLeave}
        >
          {/* Искры */}
          {sparks.map(spark => (
            <div
              key={spark.id}
              className="spark-particle"
              style={{
                '--tx': spark.tx,
                '--ty': spark.ty,
                '--wx1': spark.wx1,
                '--wy1': spark.wy1,
                '--wx2': spark.wx2,
                '--wy2': spark.wy2,
                '--wx3': spark.wx3,
                '--wy3': spark.wy3,
                '--wt': spark.wt,
                width: spark.size,
                height: spark.size,
                left: '50%',
                top: '50%',
                marginTop: '-' + (parseFloat(spark.size) / 2) + 'px',
                marginLeft: '-' + (parseFloat(spark.size) / 2) + 'px'
              }}
            />
          ))}

          <div
            className="w-full h-full card-preserve-3d transition-transform duration-100 ease-out z-10 relative"
            style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
          >
            <div 
              className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0.2,0.2,1)] card-preserve-3d"
              style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ boxShadow: `0 0 60px ${glowColor}` }} 
              />
              <div 
                className="absolute inset-0 rounded-[2.5rem] pointer-events-none sm:hidden card-backface-hidden" 
                style={{ transform: 'rotateY(180deg)', boxShadow: `0 0 60px ${glowColor}` }} 
              />

              {/* Компонент Визитки */}
              <BeautyCard />

              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden"
                style={{
                  background: `radial-gradient(farthest-corner circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  mixBlendMode: 'overlay',
                  zIndex: 50,
                }}
              />
              <div 
                className="absolute inset-0 w-full h-full rounded-[2.5rem] pointer-events-none transition-opacity duration-300 card-backface-hidden"
                style={{
                  transform: 'rotateY(180deg) translateZ(0)',
                  background: `radial-gradient(farthest-corner circle at ${100 - glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0) 80%)`,
                  opacity: glare.opacity,
                  mixBlendMode: 'overlay',
                  zIndex: 50,
                }}
              />
            </div>
          </div>
        </div>

        {/* ПАНЕЛЬ КНОПОК ПОД ВИЗИТКОЙ */}
        <div className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50 relative">
          <div className="flex items-center gap-0.5 px-1">
            {['RU', 'AM', 'EN'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`relative px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-500 ${lang === l ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
              >
                {lang === l && (
                  <span className="absolute inset-0 bg-white/10 border border-white/20 rounded-full shadow-[inset_0_0_8px_rgba(255,255,255,0.1)] pointer-events-none"></span>
                )}
                <span className="relative z-10">{l}</span>
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-white/20 mx-1"></div>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              setShowShare(true);
            }}
            className="p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <QrCode className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);
              downloadVCard();
            }}
            className="p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <UserPlus className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* МОДАЛЬНОЕ ОКНО ПОДЕЛИТЬСЯ */}
      {showShare && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
          onClick={() => setShowShare(false)}
        >
          <div 
            className="backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 w-full max-w-sm flex flex-col items-center relative shadow-2xl animate-in zoom-in-95 duration-200 border" 
            style={{ backgroundColor: modalTheme.bg, borderColor: modalTheme.border }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowShare(false)} 
              className="absolute top-5 right-5 text-white/40 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className={`w-12 h-12 rounded-full bg-black/20 flex items-center justify-center mb-4 border ${modalTheme.icon.replace('text', 'border').replace('400', '500/30')}`}>
              <QrCode className={`w-6 h-6 ${modalTheme.icon}`} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">Поделиться визиткой</h3>
            <p className="text-sm text-white/60 text-center mb-6 leading-relaxed">Дайте отсканировать QR-код или отправьте ссылку напрямую.</p>
            
            <div className="bg-white p-4 rounded-3xl mb-6 shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center justify-center">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&margin=0&data=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : 'https://nice-app.ru')}`} 
                alt="QR Code" 
                className="w-[180px] h-[180px] object-contain rounded-lg"
              />
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleCopy}
                className="flex-1 bg-black/20 hover:bg-black/40 border border-white/10 text-white font-medium py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Скопировано!' : 'Копировать'}
              </button>
              <button 
                onClick={handleShare}
                className="flex-1 bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition-colors text-sm"
              >
                <Share2 className="w-4 h-4" />
                Отправить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;