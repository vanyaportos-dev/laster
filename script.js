/* ===========================================================
   LASTER — PREMIUM PORTFOLIO — script.js
   Form: mailto — открывает почтовый клиент с готовым письмом
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* -----------------------------------------------------------
     1. Lucide icons
  ----------------------------------------------------------- */
  if (window.lucide) lucide.createIcons();

  /* -----------------------------------------------------------
     2. Scroll reveal (fade-in-up)
  ----------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* -----------------------------------------------------------
     3. Tech marquee — inject logos twice for seamless loop
  ----------------------------------------------------------- */
  const techStack = [
    { name: 'JavaScript', slug: 'javascript' },
    { name: 'Next.js',    slug: 'nextdotjs'  },
    { name: 'React',      slug: 'react'      },
    { name: 'Node.js',    slug: 'nodedotjs'  },
    { name: 'MongoDB',    slug: 'mongodb'    },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'Redis',      slug: 'redis'      },
    { name: 'Figma',      slug: 'figma'      },
  ];
  const marqueeTrack = document.getElementById('marqueeTrack');
  if (marqueeTrack) {
    const html = techStack.map(t =>
      `<span class="marquee-item">` +
        `<img src="https://cdn.simpleicons.org/${t.slug}/3b82f6" alt="" loading="lazy" width="18" height="18">` +
        `${t.name}` +
      `</span>`
    ).join('');
    marqueeTrack.innerHTML = html + html; // дублируем для бесшовного цикла
  }

  /* -----------------------------------------------------------
     4. Capsule nav — sliding indicator + scroll-spy
  ----------------------------------------------------------- */
  const capsuleNav  = document.getElementById('capsuleNav');
  const indicator   = document.getElementById('capsuleIndicator');
  const navButtons  = Array.from(document.querySelectorAll('.capsule-item'));
  const HEADER_H    = 88;

  function moveIndicator(btn) {
    if (!btn || !indicator || !capsuleNav) return;
    const navRect = capsuleNav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    indicator.style.width     = `${btnRect.width}px`;
    indicator.style.transform = `translateX(${btnRect.left - navRect.left}px)`;
  }

  function setActiveNav(id) {
    navButtons.forEach(btn => {
      const active = btn.dataset.target === id;
      btn.classList.toggle('is-active', active);
      if (active) moveIndicator(btn);
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_H;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveNav(btn.dataset.target);
    });
  });

  // Scroll-spy: подсвечиваем пункт по ближайшей видимой секции
  const sections = navButtons.map(btn => document.getElementById(btn.dataset.target)).filter(Boolean);
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => sectionObserver.observe(sec));

  // Начальный сдвиг индикатора (после render + загрузки шрифтов)
  const placeIndicator = () => {
    const active = document.querySelector('.capsule-item.is-active') || navButtons[0];
    moveIndicator(active);
  };
  placeIndicator();
  setTimeout(placeIndicator, 200);
  window.addEventListener('resize', placeIndicator);

  /* -----------------------------------------------------------
     5. Ambient spotlight (следит за мышью в hero)
  ----------------------------------------------------------- */
  const heroSection = document.querySelector('.hero-section');
  const spotlight   = document.getElementById('spotlight');
  if (heroSection && spotlight && window.matchMedia('(hover: hover)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const r = heroSection.getBoundingClientRect();
      spotlight.style.setProperty('--mx', `${((e.clientX - r.left) / r.width)  * 100}%`);
      spotlight.style.setProperty('--my', `${((e.clientY - r.top)  / r.height) * 100}%`);
    });
  }

  /* -----------------------------------------------------------
     6. Language switcher (RU / EN)
  ----------------------------------------------------------- */
  const translations = {
    ru: {
      heroEyebrow:          'CRMP STUDIO · ВЕБ-РАЗРАБОТКА',
      heroTitleLine1:       'Привет, я',
      heroSubtitle:         'Владелец CRMP-студии. Разработчик сайтов на HTML и Next.js.',
      ctaApply:             'Оставить заявку',
      ctaTelegram:          'Написать в Telegram',
      statusOpen:           'Открыт для новых заказов',
      skillFrontendTitle:   'Frontend',
      skillFrontendDesc:    'Собираю интерфейсы на React и Next.js — с анимациями, чистой версткой и вниманием к каждой детали.',
      skillBackendTitle:    'Backend',
      skillBackendDesc:     'Проектирую API и базы данных на Node.js, PostgreSQL, MongoDB и Redis. Стабильность и скорость прежде всего.',
      skillDesignTitle:     'Design',
      skillDesignDesc:      'От вайрфрейма в Figma до готового интерфейса — чувствую баланс между эстетикой и удобством.',
      workEyebrow:          'УСЛУГИ',
      workTitle:            'Мои услуги',
      serviceSitesTitle:    'Сайты',
      serviceSitesDesc:     'Многостраничные сайты под бизнес — от концепции до деплоя на сервер.',
      serviceLandingTitle:  'Лендинги',
      serviceLandingDesc:   'Одностраничники с фокусом на конверсию, скорость загрузки и аккуратную анимацию.',
      servicePortfolioTitle:'Портфолио',
      servicePortfolioDesc: 'Личные сайты для дизайнеров, разработчиков и творческих профессий.',
      serviceForumTitle:    'Форумы',
      serviceForumDesc:     'Сообщества и форумы под CRMP-проекты, готовые к нагрузке и росту аудитории.',
      projectsEyebrow:      'ПРОЕКТЫ',
      projectsTitle:        'Проекты',
      projectStatus:        'В разработке',
      projectDesc:          'Laster — новый клиент Telegram. Абсолютно безопасен, так как работает на базе Telegram API, не читает ваши переписки и не требует VPN.',
      ctaSectionTitle:      'Готовы начать проект?',
      ctaSectionSubtitle:   'Опишите задачу в форме — отвечу в Telegram или на почту в течение дня.',
      footerCopy:           '© 2026 Laster. Все права защищены.',
      navAbout:             'О себе',
      navWork:              'Работа',
      navProjects:          'Проекты',
      modalEyebrow:         'НОВАЯ ЗАЯВКА',
      modalTitle:           'Оставить заявку',
      modalSub:             'Заполните форму — откроется ваш почтовый клиент с готовым письмом.',
      formNameLabel:        'Имя',
      formNamePh:           'Как к вам обращаться?',
      formContactLabel:     'Контакт',
      formContactPh:        'Telegram, VK или email',
      formBudgetLabel:      'Бюджет',
      formBudgetPh:         'Например, 15 000 ₽',
      formDescLabel:        'Описание проекта',
      formDescPh:           'Кратко опишите задачу',
      formSubmit:           'Отправить заявку',
      toastOkTitle:         'Письмо готово!',
      toastOkMsg:           'Ваш почтовый клиент открылся с заполненным письмом — просто нажмите «Отправить».',
      toastErrTitle:        'Заполните все поля',
      toastErrMsg:          'Пожалуйста, заполните все поля перед отправкой.',
    },
    en: {
      heroEyebrow:          'CRMP STUDIO · WEB DEVELOPMENT',
      heroTitleLine1:       "Hi, I'm",
      heroSubtitle:         'Owner of a CRMP studio. Website developer working with HTML and Next.js.',
      ctaApply:             'Send a request',
      ctaTelegram:          'Message on Telegram',
      statusOpen:           'Open for new projects',
      skillFrontendTitle:   'Frontend',
      skillFrontendDesc:    'I build interfaces with React and Next.js — smooth animation, clean markup and attention to every detail.',
      skillBackendTitle:    'Backend',
      skillBackendDesc:     'I design APIs and databases with Node.js, PostgreSQL, MongoDB and Redis. Stability and speed come first.',
      skillDesignTitle:     'Design',
      skillDesignDesc:      'From a Figma wireframe to a finished interface — balancing aesthetics with usability.',
      workEyebrow:          'SERVICES',
      workTitle:            'What I do',
      serviceSitesTitle:    'Websites',
      serviceSitesDesc:     'Multi-page websites for businesses — from concept to deployment.',
      serviceLandingTitle:  'Landing pages',
      serviceLandingDesc:   'Single-page sites focused on conversion, load speed and polished motion.',
      servicePortfolioTitle:'Portfolios',
      servicePortfolioDesc: 'Personal websites for designers, developers and creative professionals.',
      serviceForumTitle:    'Forums',
      serviceForumDesc:     'Communities and forums for CRMP projects, built to handle real growth.',
      projectsEyebrow:      'PROJECTS',
      projectsTitle:        'Projects',
      projectStatus:        'In development',
      projectDesc:          'Laster is a new Telegram client. Fully safe — built on the Telegram API, it never reads your chats and works without a VPN.',
      ctaSectionTitle:      'Ready to start a project?',
      ctaSectionSubtitle:   "Describe your task in the form — I'll reply on Telegram or by email within a day.",
      footerCopy:           '© 2026 Laster. All rights reserved.',
      navAbout:             'About',
      navWork:              'Work',
      navProjects:          'Projects',
      modalEyebrow:         'NEW REQUEST',
      modalTitle:           'Send a request',
      modalSub:             'Fill in the form — your email client will open with a ready-to-send message.',
      formNameLabel:        'Name',
      formNamePh:           'What should I call you?',
      formContactLabel:     'Contact',
      formContactPh:        'Telegram, VK or email',
      formBudgetLabel:      'Budget',
      formBudgetPh:         'e.g. $200',
      formDescLabel:        'Project description',
      formDescPh:           'Briefly describe the task',
      formSubmit:           'Send request',
      toastOkTitle:         'Email ready!',
      toastOkMsg:           'Your email client opened with a pre-filled message — just hit Send.',
      toastErrTitle:        'Fill in all fields',
      toastErrMsg:          'Please fill in all fields before sending.',
    }
  };

  const langSwitcher = document.querySelector('.lang-switcher');
  const langToggle   = document.getElementById('langToggle');
  const langCurrent  = document.getElementById('langCurrent');
  const langOptions  = document.querySelectorAll('.lang-option');
  let currentLang    = localStorage.getItem('laster_lang') || 'ru';

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      if (dict[el.dataset.i18n] !== undefined) el.textContent = dict[el.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = dict[el.dataset.i18nPlaceholder];
      if (v !== undefined) el.setAttribute('placeholder', v);
    });
    langOptions.forEach(opt => opt.classList.toggle('is-active', opt.dataset.lang === lang));
    if (langCurrent) langCurrent.textContent = lang.toUpperCase();
    document.documentElement.lang = lang;
    currentLang = lang;
    localStorage.setItem('laster_lang', lang);
  }

  langToggle && langToggle.addEventListener('click', () => {
    const open = langSwitcher.classList.toggle('is-open');
    langToggle.setAttribute('aria-expanded', String(open));
  });

  langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      applyLanguage(opt.dataset.lang);
      langSwitcher.classList.remove('is-open');
      langToggle && langToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (langSwitcher && !langSwitcher.contains(e.target)) {
      langSwitcher.classList.remove('is-open');
      langToggle && langToggle.setAttribute('aria-expanded', 'false');
    }
  });

  applyLanguage(currentLang);

  /* -----------------------------------------------------------
     7. Modal — open / close
  ----------------------------------------------------------- */
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose   = document.getElementById('modalClose');
  const openTriggers = document.querySelectorAll('[data-open-modal]');

  function openModal() {
    modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      const first = modalOverlay.querySelector('input, textarea');
      first && first.focus();
    }, 350);
  }

  function closeModal() {
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openTriggers.forEach(btn => btn.addEventListener('click', openModal));
  modalClose   && modalClose.addEventListener('click', closeModal);
  modalOverlay && modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) closeModal();
  });

  /* -----------------------------------------------------------
     8. Character counters — 0/60 live update
  ----------------------------------------------------------- */
  document.querySelectorAll('#orderForm .field').forEach(field => {
    const input   = field.querySelector('input, textarea');
    const counter = field.querySelector('.count-now');
    if (!input || !counter) return;
    const update = () => {
      const len = input.value.length;
      counter.textContent = len;
      const wrap = counter.parentElement;
      wrap.classList.toggle('is-near', len >= 45 && len < 60);
      wrap.classList.toggle('is-full', len >= 60);
    };
    input.addEventListener('input', update);
    update();
  });

  /* -----------------------------------------------------------
     9. Toast
  ----------------------------------------------------------- */
  const toast        = document.getElementById('toast');
  const toastTitleEl = document.getElementById('toastTitle');
  const toastMsgEl   = document.getElementById('toastMsg');
  let toastTimer;

  function showToast(type, title, message) {
    if (!toast) return;
    const icon = toast.querySelector('.toast-icon');
    toast.classList.toggle('is-error', type === 'error');

    // Меняем иконку через lucide
    if (icon) {
      icon.setAttribute('data-lucide', type === 'error' ? 'alert-circle' : 'check-circle-2');
      if (window.lucide) lucide.createIcons();
    }

    toastTitleEl.textContent = title;
    toastMsgEl.textContent   = message;
    toast.classList.add('is-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-show'), 5200);
  }

  /* -----------------------------------------------------------
     10. Form — mailto отправка
     Собираем letter с именем, контактом, бюджетом и описанием
     и открываем почтовый клиент пользователя через href=mailto:
  ----------------------------------------------------------- */
  const orderForm = document.getElementById('orderForm');
  const submitBtn = document.getElementById('formSubmit');

  orderForm && orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const dict = translations[currentLang];

    // ─── Валидация ───────────────────────────────────────────
    const inputs = Array.from(orderForm.querySelectorAll('[required]'));
    const allOk  = inputs.every(el => el.value.trim().length > 0);

    if (!allOk) {
      // Подсвечиваем пустые поля
      inputs.forEach(el => {
        if (!el.value.trim()) {
          el.style.borderColor = 'var(--danger)';
          el.addEventListener('input', () => el.style.borderColor = '', { once: true });
        }
      });
      showToast('error', dict.toastErrTitle, dict.toastErrMsg);
      return;
    }

    // ─── Собираем данные ─────────────────────────────────────
    const name    = orderForm.querySelector('#f-name').value.trim();
    const contact = orderForm.querySelector('#f-contact').value.trim();
    const budget  = orderForm.querySelector('#f-budget').value.trim();
    const desc    = orderForm.querySelector('#f-desc').value.trim();

    // ─── Формируем письмо ────────────────────────────────────
    const isRu = currentLang === 'ru';

    const subject = isRu
      ? `Заявка с сайта — ${name}`
      : `Website request — ${name}`;

    const body = isRu
      ? [
          `Новая заявка с laster.studio`,
          ``,
          `Имя:      ${name}`,
          `Контакт:  ${contact}`,
          `Бюджет:   ${budget}`,
          ``,
          `Описание:`,
          desc,
          ``,
          `──────────────────────────────`,
          `Отправлено через форму на сайте laster.studio`
        ].join('\n')
      : [
          `New request from laster.studio`,
          ``,
          `Name:     ${name}`,
          `Contact:  ${contact}`,
          `Budget:   ${budget}`,
          ``,
          `Description:`,
          desc,
          ``,
          `──────────────────────────────`,
          `Sent via the contact form at laster.studio`
        ].join('\n');

    // ─── Открываем почтовый клиент ───────────────────────────
    const mailto = `mailto:vanyaportos@gmail.com`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(body)}`;

    // Создаём скрытую ссылку и кликаем — так не блокируют попап-блокеры
    const link = document.createElement('a');
    link.href  = mailto;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // ─── Сброс формы и уведомление ───────────────────────────
    showToast('ok', dict.toastOkTitle, dict.toastOkMsg);
    orderForm.reset();
    document.querySelectorAll('#orderForm .count-now').forEach(c => { c.textContent = '0'; });
    document.querySelectorAll('#orderForm .char-count').forEach(c => {
      c.classList.remove('is-near', 'is-full');
    });

    // Закрываем модалку через небольшую задержку
    setTimeout(closeModal, 1400);
  });

});

/* ===================== ПРЕЛОАДЕР: ЛОГОТИП НА ФОНЕ ===================== */
const brandLoader = document.getElementById('brand-loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    brandLoader.classList.add('hidden');
  }, 3500); // 2 секунды крутится и исчезает
});
