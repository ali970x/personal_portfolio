"use client";

import { useEffect, useMemo, useState } from "react";

type Language = "en" | "ar";
type Localized = { en: string; ar: string };

type Project = {
  id: string;
  name: string;
  kicker: Localized;
  description: Localized;
  features: { en: string[]; ar: string[] };
  tags: string[];
  icon: string;
  screens: string[];
  live?: string;
  demo?: boolean;
  apk?: boolean;
  shape: "mobile" | "desktop";
};

const copy = {
  en: {
    nav: ["Work", "Expertise", "About", "Contact"],
    available: "Available for remote work",
    eyebrow: "SOFTWARE ENGINEER · BEIRUT, LEBANON",
    titleA: "I build the systems",
    titleB: "behind the product.",
    hero:
      "I design secure, scalable systems and transform complex ideas into reliable digital products.",
    explore: "Explore my work",
    contact: "Start a conversation",
    years: "Years building",
    products: "Products shipped",
    scope: "Full-cycle engineering",
    workEyebrow: "SELECTED WORK",
    workTitle: "Products built from the database up.",
    workIntro:
      "A selection of production-minded systems spanning operations, finance, automation, distribution, and mobile experiences.",
    viewCase: "View case study",
    liveDemo: "Open live demo",
    demoReady: "Demo access ready",
    apkReady: "APK ready",
    close: "Close",
    engineering: "ENGINEERING RANGE",
    expertiseTitle: "One engineer. The complete product path.",
    expertiseIntro:
      "My strength sits where products become dependable: data models, APIs, permissions, workflows, synchronization, and the mobile or web experience built on top.",
    layers: [
      ["01", "Product engineering", "From ambiguous idea to structured flows, roles, edge cases, and a product people can actually use."],
      ["02", "Backend systems", "Secure APIs, authentication, business logic, background operations, and scalable service boundaries."],
      ["03", "Data architecture", "Relational and document models, reporting pipelines, synchronization, caching, and reliable migrations."],
      ["04", "Mobile & web", "Flutter applications and responsive web platforms designed as complete operating experiences."],
    ],
    stack: "WORKING KNOWLEDGE",
    stackTitle: "Tools change. Engineering judgment compounds.",
    aboutEyebrow: "ABOUT",
    aboutTitle: "Seven years of learning by building.",
    aboutBody:
      "I am Ali Majed Dandash, a software engineer who learned by turning real problems into working products. Across freelance and personal work, I have built more than ten applications and platforms—from operational systems and accounting tools to Android automation and digital distribution. I care about the invisible parts that make software trustworthy: clear architecture, secure access, predictable data, and workflows that survive real use.",
    building: "NOW BUILDING",
    buildingTitle: "The next systems are already in motion.",
    marketKernel: "Automated trading and market intelligence platform.",
    marketBody:
      "A backend-first engine for market data, strategy execution, risk controls, and observable trading workflows.",
    subvanta: "Digital subscription commerce platform.",
    subBody:
      "A complete system for selling, delivering, and managing digital subscriptions, orders, customers, and access.",
    inDevelopment: "In development",
    contactEyebrow: "LET’S BUILD",
    contactTitle: "Have a difficult product problem?",
    contactBody:
      "I am available for remote engineering opportunities, backend-heavy product work, and ambitious systems that need to be designed properly.",
    email: "Email me",
    whatsapp: "WhatsApp",
    location: "Beirut, Lebanon · Remote worldwide",
    footer: "Designed and engineered by Ali Majed Dandash.",
  },
  ar: {
    nav: ["المشاريع", "الخبرات", "نبذة", "تواصل"],
    available: "متاح للعمل عن بُعد",
    eyebrow: "مهندس برمجيات · بيروت، لبنان",
    titleA: "أبني الأنظمة",
    titleB: "التي تقف خلف المنتج.",
    hero:
      "أصمم أنظمة آمنة وقابلة للتوسع، وأحوّل الأفكار المعقدة إلى منتجات رقمية موثوقة.",
    explore: "استكشف أعمالي",
    contact: "ابدأ محادثة",
    years: "سنوات من البناء",
    products: "منتجات أنجزتها",
    scope: "هندسة متكاملة",
    workEyebrow: "أعمال مختارة",
    workTitle: "منتجات بُنيت من قاعدة البيانات إلى الواجهة.",
    workIntro:
      "مجموعة من الأنظمة العملية في الإدارة والمال والأتمتة والتوزيع وتجارب الهاتف.",
    viewCase: "عرض تفاصيل المشروع",
    liveDemo: "فتح النسخة المباشرة",
    demoReady: "حساب تجريبي جاهز",
    apkReady: "ملف APK جاهز",
    close: "إغلاق",
    engineering: "نطاق الخبرة",
    expertiseTitle: "مهندس واحد لمسار المنتج كاملاً.",
    expertiseIntro:
      "تظهر قوتي في الأجزاء التي تجعل المنتج موثوقاً: نمذجة البيانات، وواجهات API، والصلاحيات، وسير العمل، والمزامنة، ثم تجربة الهاتف أو الويب المبنية فوقها.",
    layers: [
      ["01", "هندسة المنتجات", "تحويل الفكرة غير الواضحة إلى تدفقات وصلاحيات وحالات استثنائية ومنتج قابل للاستخدام."],
      ["02", "أنظمة الخادم", "واجهات API آمنة، مصادقة، منطق أعمال، عمليات خلفية، وحدود خدمات قابلة للتوسع."],
      ["03", "هندسة البيانات", "نماذج علائقية ووثائقية، تقارير، مزامنة، تخزين مؤقت، وترحيل بيانات موثوق."],
      ["04", "الهاتف والويب", "تطبيقات Flutter ومنصات ويب متجاوبة مصممة كتجارب تشغيل متكاملة."],
    ],
    stack: "المعرفة العملية",
    stackTitle: "الأدوات تتغير، أما الخبرة الهندسية فتتراكم.",
    aboutEyebrow: "نبذة",
    aboutTitle: "سبع سنوات من التعلّم عبر البناء.",
    aboutBody:
      "أنا علي ماجد دندش، مهندس برمجيات تعلّمت عبر تحويل المشاكل الحقيقية إلى منتجات تعمل. أنجزت في أعمالي الحرة والشخصية أكثر من عشرة تطبيقات ومنصات، من أنظمة التشغيل والمحاسبة إلى أتمتة Android والتوزيع الرقمي. أهتم بالتفاصيل غير المرئية التي تجعل البرمجيات جديرة بالثقة: معمارية واضحة، وصول آمن، بيانات منضبطة، وسير عمل يصمد أمام الاستخدام الحقيقي.",
    building: "قيد التطوير",
    buildingTitle: "الأنظمة القادمة أصبحت قيد التنفيذ.",
    marketKernel: "منصة تداول آلي وذكاء للأسواق.",
    marketBody:
      "محرك يركز على الخادم لمعالجة بيانات السوق وتنفيذ الاستراتيجيات وضبط المخاطر ومراقبة عمليات التداول.",
    subvanta: "منصة تجارة للاشتراكات الرقمية.",
    subBody:
      "نظام متكامل لبيع وتسليم وإدارة الاشتراكات الرقمية والطلبات والعملاء وصلاحيات الوصول.",
    inDevelopment: "قيد التطوير",
    contactEyebrow: "لنبنِ شيئاً",
    contactTitle: "لديك مشكلة منتج صعبة؟",
    contactBody:
      "أنا متاح لفرص هندسية عن بُعد، وللمنتجات التي تعتمد بقوة على الخادم، وللأنظمة الطموحة التي تحتاج إلى تصميم صحيح.",
    email: "راسلني",
    whatsapp: "واتساب",
    location: "بيروت، لبنان · متاح عالمياً عن بُعد",
    footer: "صُمّم وبُني بواسطة علي ماجد دندش.",
  },
};

const projects: Project[] = [
  {
    id: "phonexa",
    name: "Phonexa",
    kicker: {
      en: "Retail operations platform",
      ar: "منصة متكاملة لإدارة متاجر الهواتف",
    },
    description: {
      en: "A bilingual operating system for mobile stores—uniting point of sale, inventory, repairs, invoices, customers, suppliers, permissions, and executive reporting.",
      ar: "نظام تشغيل ثنائي اللغة لمتاجر الهواتف يجمع نقطة البيع والمخزون والصيانة والفواتير والعملاء والموردين والصلاحيات والتقارير.",
    },
    features: {
      en: ["POS and multi-currency invoices", "Inventory and reorder intelligence", "Repair tickets with IMEI tracking", "Role-based administration and reports"],
      ar: ["نقطة بيع وفواتير متعددة العملات", "مخزون وتنبيهات إعادة الطلب", "تذاكر صيانة وتتبع IMEI", "إدارة صلاحيات وتقارير شاملة"],
    },
    tags: ["Full-stack", "Operations", "RBAC", "Reporting"],
    icon: "/assets/phonexa/icon.png",
    screens: [
      "/assets/phonexa/screen-1.png",
      "/assets/phonexa/screen-2.png",
      "/assets/phonexa/screen-3.png",
    ],
    live: "https://phonexa-web.onrender.com/app/",
    demo: true,
    shape: "desktop",
  },
  {
    id: "tapflow",
    name: "TapFlow AI",
    kicker: {
      en: "Android automation engine",
      ar: "محرك أتمتة ذكي لنظام Android",
    },
    description: {
      en: "A programmable floating control layer for Android that turns gestures into reusable workflows—from capturing nearby text to translation, Gemini actions, and cross-app automation.",
      ar: "طبقة تحكم عائمة قابلة للبرمجة تحوّل الإيماءات إلى تدفقات عمل، من التقاط النص وترجمته إلى أوامر Gemini والأتمتة بين التطبيقات.",
    },
    features: {
      en: ["Custom floating controls", "Multi-step workflow builder", "Translation and Gemini actions", "Android accessibility automation"],
      ar: ["أزرار عائمة قابلة للتخصيص", "منشئ تدفقات عمل متعددة الخطوات", "الترجمة وأوامر Gemini", "أتمتة عبر خدمات Android"],
    },
    tags: ["Flutter", "Android", "Automation", "AI"],
    icon: "/assets/tapflow/icon.png",
    screens: [
      "/assets/tapflow/screen-1.png",
      "/assets/tapflow/screen-2.png",
      "/assets/tapflow/screen-3.png",
    ],
    apk: true,
    shape: "mobile",
  },
  {
    id: "daftar",
    name: "Daftar",
    kicker: {
      en: "Accounting & inventory system",
      ar: "نظام محاسبة ومخزون متعدد المستخدمين",
    },
    description: {
      en: "A multi-user business system connecting inventory, weighted goods, sales, invoices, expenses, debt, contacts, damaged stock, and decision-ready reports.",
      ar: "نظام أعمال متعدد المستخدمين يربط المخزون والبضائع الموزونة والمبيعات والفواتير والمصاريف والديون والأسماء والتالف والتقارير.",
    },
    features: {
      en: ["Inventory by quantity and weight", "Sales, invoices, and debt workflows", "Supplier and customer ledgers", "Financial reports and business insights"],
      ar: ["مخزون بالكمية والوزن", "مبيعات وفواتير وديون", "حسابات العملاء والموردين", "تقارير مالية وتحليلات أعمال"],
    },
    tags: ["Accounting", "Inventory", "Analytics", "Multi-user"],
    icon: "/assets/daftar/icon.png",
    screens: [
      "/assets/daftar/screen-1.png",
      "/assets/daftar/screen-2.png",
      "/assets/daftar/screen-3.png",
    ],
    live: "https://accounting-pro-node-app3.onrender.com",
    demo: true,
    apk: true,
    shape: "desktop",
  },
  {
    id: "maliyati",
    name: "Maliyati",
    kicker: {
      en: "Personal finance command center",
      ar: "مركز تحكم مالي متعدد المحافظ",
    },
    description: {
      en: "A multi-wallet finance application for tracking USD and LBP cashflow, debts, receivables, limits, and analytics—with both manual and JSON-driven transaction workflows.",
      ar: "تطبيق مالي متعدد المحافظ لمتابعة الدولار والليرة والتدفق النقدي والديون والمستحقات والحدود والتحليلات، مع إدخال يدوي أو عبر JSON.",
    },
    features: {
      en: ["Multi-wallet USD/LBP overview", "Manual and JSON transaction engine", "Spending limits and alerts", "Google Sheets and Drive backup"],
      ar: ["نظرة موحدة لمحافظ الدولار والليرة", "محرك معاملات يدوي وعبر JSON", "حدود إنفاق وتنبيهات", "نسخ احتياطي إلى Google Sheets وDrive"],
    },
    tags: ["Flutter", "Finance", "JSON workflows", "Backup"],
    icon: "/assets/maliyati/icon.png",
    screens: [
      "/assets/maliyati/screen-1.png",
      "/assets/maliyati/screen-2.png",
      "/assets/maliyati/screen-3.png",
    ],
    apk: true,
    shape: "mobile",
  },
  {
    id: "matjari",
    name: "Matjari",
    kicker: {
      en: "Independent Android distribution",
      ar: "منصة مستقلة لتوزيع تطبيقات Android",
    },
    description: {
      en: "An independent application marketplace and release platform with APK uploads, listings, screenshots, update controls, user management, analytics, and on-device installation.",
      ar: "متجر تطبيقات ومنصة إصدارات مستقلة تشمل رفع APK وصفحات التطبيقات والصور والتحكم بالتحديثات والمستخدمين والتحليلات والتثبيت.",
    },
    features: {
      en: ["APK and release management", "Store listing administration", "Update delivery and installed apps", "Users, analytics, and storage controls"],
      ar: ["إدارة ملفات APK والإصدارات", "إدارة صفحات المتجر", "تسليم التحديثات والتطبيقات المثبتة", "المستخدمون والتحليلات والتخزين"],
    },
    tags: ["Flutter", "Distribution", "Admin", "Releases"],
    icon: "/assets/matjari/icon.png",
    screens: [
      "/assets/matjari/screen-1.png",
      "/assets/matjari/screen-2.png",
      "/assets/matjari/screen-3.png",
    ],
    apk: true,
    shape: "mobile",
  },
  {
    id: "subtrack",
    name: "SubTrack",
    kicker: {
      en: "Subscription operations",
      ar: "إدارة ومتابعة الاشتراكات",
    },
    description: {
      en: "A polished subscription workspace for individuals and digital-subscription businesses, covering renewals, grouped accounts, outstanding balances, expiry, and payment state.",
      ar: "مساحة متكاملة للأفراد وأعمال الاشتراكات الرقمية تغطي التجديدات والحسابات المجمعة والمبالغ المستحقة والانتهاء وحالة الدفع.",
    },
    features: {
      en: ["Renewal calendar and alerts", "Grouped services and accounts", "Outstanding balance workflows", "Cloud-synced account data"],
      ar: ["تقويم تجديدات وتنبيهات", "خدمات وحسابات مجمعة", "إدارة المبالغ المستحقة", "مزامنة بيانات الحساب"],
    },
    tags: ["Flutter", "Subscriptions", "Sync", "Reminders"],
    icon: "/assets/subtrack/icon.png",
    screens: [
      "/assets/subtrack/screen-1.png",
      "/assets/subtrack/screen-2.png",
      "/assets/subtrack/screen-3.png",
    ],
    apk: true,
    shape: "mobile",
  },
];

const technologies = [
  "Flutter",
  "Node.js",
  "Express",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Supabase",
  "React",
  "REST APIs",
  "JWT",
  "FCM",
  "Java",
  "JavaScript",
  "HTML & CSS",
];

export function Portfolio() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeId, setActiveId] = useState<string | null>(null);
  const t = copy[language];
  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeId) ?? null,
    [activeId],
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    if (!activeProject) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveId(null);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeProject]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="Ali Majed Dandash home">
          <span className="brand-mark">AD</span>
          <span className="brand-name">Ali Dandash</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {[
            ["work", t.nav[0]],
            ["expertise", t.nav[1]],
            ["about", t.nav[2]],
            ["contact", t.nav[3]],
          ].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <span className="availability">
            <span className="pulse-dot" />
            {t.available}
          </span>
          <button
            className="language-toggle"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            aria-label={
              language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"
            }
          >
            {language === "en" ? "عربي" : "EN"}
          </button>
        </div>
      </header>

      <section className="hero section" id="top">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            {t.eyebrow}
          </p>
          <h1>
            {t.titleA}
            <br />
            <span>{t.titleB}</span>
          </h1>
          <p className="hero-lead">{t.hero}</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => scrollTo("work")}>
              {t.explore}
              <span aria-hidden="true">↘</span>
            </button>
            <a className="button button-ghost" href="mailto:labdev99@gmail.com">
              {t.contact}
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-label="Portrait of Ali Majed Dandash">
          <div className="signal-card signal-card-top">
            <span className="signal-label">SYSTEM STATUS</span>
            <strong>READY TO BUILD</strong>
          </div>
          <div className="portrait-frame">
            <div className="portrait-grid" />
            <img
              src="/assets/portrait/ali-dandash.png"
              alt="Ali Majed Dandash"
            />
            <div className="portrait-caption">
              <span>BACKEND-MINDED</span>
              <strong>PRODUCT ENGINEER</strong>
            </div>
          </div>
          <div className="signal-card signal-card-bottom">
            <span className="code-pip">{`{ }`}</span>
            <span>SECURE · SCALABLE · RELIABLE</span>
          </div>
        </div>

        <div className="hero-stats" aria-label="Career highlights">
          <div>
            <strong>7+</strong>
            <span>{t.years}</span>
          </div>
          <div>
            <strong>10+</strong>
            <span>{t.products}</span>
          </div>
          <div>
            <strong>360°</strong>
            <span>{t.scope}</span>
          </div>
        </div>
      </section>

      <section className="section work-section" id="work">
        <SectionHeading
          eyebrow={t.workEyebrow}
          title={t.workTitle}
          intro={t.workIntro}
        />

        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className={`project-card ${index === 0 ? "project-featured" : ""}`}
              key={project.id}
            >
              <button
                className="project-media"
                onClick={() => setActiveId(project.id)}
                aria-label={`${t.viewCase}: ${project.name}`}
              >
                <div className={`screen-stage ${project.shape}`}>
                  {project.screens.slice(0, index === 0 ? 2 : 1).map((screen, screenIndex) => (
                    <img
                      key={screen}
                      className={`screen screen-${screenIndex + 1}`}
                      src={screen}
                      alt={`${project.name} interface ${screenIndex + 1}`}
                      loading="lazy"
                    />
                  ))}
                </div>
                <span className="media-index">0{index + 1}</span>
              </button>
              <div className="project-content">
                <div className="project-heading">
                  <img src={project.icon} alt="" className="project-icon" />
                  <div>
                    <p>{project.kicker[language]}</p>
                    <h3>{project.name}</h3>
                  </div>
                </div>
                <p className="project-description">{project.description[language]}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <button className="case-link" onClick={() => setActiveId(project.id)}>
                  {t.viewCase}
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section expertise-section" id="expertise">
        <SectionHeading
          eyebrow={t.engineering}
          title={t.expertiseTitle}
          intro={t.expertiseIntro}
        />
        <div className="layer-grid">
          {t.layers.map(([number, title, description]) => (
            <article className="layer-card" key={number}>
              <span className="layer-number">{number}</span>
              <div className="layer-line" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="stack-panel">
          <div className="stack-intro">
            <p className="mini-eyebrow">{t.stack}</p>
            <h3>{t.stackTitle}</h3>
          </div>
          <div className="tech-cloud" aria-label="Technology experience">
            {technologies.map((technology, index) => (
              <span key={technology} className={index % 5 === 0 ? "accent-tag" : ""}>
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="about-index">07+</div>
        <div className="about-copy">
          <p className="eyebrow">
            <span />
            {t.aboutEyebrow}
          </p>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
          <div className="about-links">
            <a href="https://github.com/ali970x" target="_blank" rel="noreferrer">
              GitHub <span>↗</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ali-dandash-37a446255/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section building-section">
        <SectionHeading
          eyebrow={t.building}
          title={t.buildingTitle}
          intro=""
        />
        <div className="building-grid">
          <article className="building-card market-card">
            <div className="status-row">
              <span>{t.inDevelopment}</span>
              <span className="status-light" />
            </div>
            <div className="market-visual" aria-hidden="true">
              <div className="market-axis" />
              <div className="market-bars">
                {[34, 58, 43, 76, 64, 91, 72, 100].map((height, index) => (
                  <span key={index} style={{ height: `${height}%` }} />
                ))}
              </div>
              <div className="market-line">↗</div>
            </div>
            <p className="building-kicker">MARKET INTELLIGENCE ENGINE</p>
            <h3>MarketKernel</h3>
            <strong>{t.marketKernel}</strong>
            <p>{t.marketBody}</p>
          </article>

          <article className="building-card subvanta-card">
            <div className="status-row">
              <span>{t.inDevelopment}</span>
              <span className="status-light" />
            </div>
            <div className="subscription-visual" aria-hidden="true">
              <div className="sub-orbit orbit-one" />
              <div className="sub-orbit orbit-two" />
              <div className="sub-core">S</div>
              <span className="sub-node node-one" />
              <span className="sub-node node-two" />
              <span className="sub-node node-three" />
            </div>
            <p className="building-kicker">SUBSCRIPTION COMMERCE</p>
            <h3>SubVanta</h3>
            <strong>{t.subvanta}</strong>
            <p>{t.subBody}</p>
          </article>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <p className="eyebrow">
          <span />
          {t.contactEyebrow}
        </p>
        <h2>{t.contactTitle}</h2>
        <p className="contact-lead">{t.contactBody}</p>
        <div className="contact-actions">
          <a className="contact-card" href="mailto:labdev99@gmail.com">
            <span className="contact-label">{t.email}</span>
            <strong>labdev99@gmail.com</strong>
            <span className="contact-arrow">↗</span>
          </a>
          <a
            className="contact-card"
            href="https://wa.me/96176652276"
            target="_blank"
            rel="noreferrer"
          >
            <span className="contact-label">{t.whatsapp}</span>
            <strong>{t.contact}</strong>
            <span className="contact-arrow">↗</span>
          </a>
        </div>
        <p className="location">{t.location}</p>
      </section>

      <footer className="footer">
        <span>© 2026</span>
        <span>{t.footer}</span>
        <button onClick={() => scrollTo("top")} aria-label="Back to top">
          ↑
        </button>
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setActiveId(null);
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div className="modal-topbar">
              <div className="project-heading">
                <img src={activeProject.icon} alt="" className="project-icon" />
                <div>
                  <p>{activeProject.kicker[language]}</p>
                  <h2 id="project-modal-title">{activeProject.name}</h2>
                </div>
              </div>
              <button className="modal-close" onClick={() => setActiveId(null)}>
                {t.close} ×
              </button>
            </div>
            <div className="modal-gallery">
              {activeProject.screens.map((screen, index) => (
                <div className={`modal-screen ${activeProject.shape}`} key={screen}>
                  <img
                    src={screen}
                    alt={`${activeProject.name} interface ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="modal-details">
              <div>
                <p className="modal-description">{activeProject.description[language]}</p>
                <div className="tag-row">
                  {activeProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <ul>
                {activeProject.features[language].map((feature) => (
                  <li key={feature}>
                    <span>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="modal-actions">
              {activeProject.live && (
                <a
                  className="button button-primary"
                  href={activeProject.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.liveDemo} ↗
                </a>
              )}
              {activeProject.demo && <span className="ready-chip">{t.demoReady}</span>}
              {activeProject.apk && <span className="ready-chip">{t.apkReady}</span>}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <div>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}
