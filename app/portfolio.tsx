"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

type Language = "en" | "ar";
type Localized = { en: string; ar: string };

type Project = {
  id: string;
  number: string;
  name: string;
  category: Localized;
  headline: Localized;
  summary: Localized;
  challenge: Localized;
  system: Localized;
  outcome: Localized;
  focus: { en: string[]; ar: string[] };
  layers: string[];
  icon: string;
  screens: string[];
  live?: string;
  demo?: boolean;
  apk?: boolean;
};

const pick = (language: Language, value: Localized) => value[language];

const projects: Project[] = [
  {
    id: "phonexa",
    number: "01",
    name: "Phonexa",
    category: { en: "Retail operations platform", ar: "منصة عمليات متاجر" },
    headline: {
      en: "One operating system for the entire phone store.",
      ar: "نظام تشغيل واحد لكل عمليات متجر الهواتف.",
    },
    summary: {
      en: "A live, bilingual platform that connects point of sale, inventory, repair tickets, invoices, people, permissions, and business reporting.",
      ar: "منصة حية وثنائية اللغة تربط نقطة البيع والمخزون والصيانة والفواتير والعملاء والصلاحيات والتقارير.",
    },
    challenge: {
      en: "Phone retailers often run sales, stock, repairs, and accounting in disconnected tools—creating blind spots and duplicated work.",
      ar: "غالباً ما تدير متاجر الهواتف المبيعات والمخزون والصيانة والحسابات بأدوات منفصلة، ما يخلق عملاً مكرراً ونقاطاً عمياء.",
    },
    system: {
      en: "I designed a unified operational model where every sale, stock movement, repair ticket, debt, and user action belongs to one controlled workflow.",
      ar: "صممت نموذج عمليات موحّداً تصبح فيه كل عملية بيع وحركة مخزون وتذكرة صيانة ودَين وإجراء مستخدم جزءاً من مسار مضبوط.",
    },
    outcome: {
      en: "A single source of truth for daily operations—from the counter to management reporting.",
      ar: "مصدر واحد للحقيقة في العمليات اليومية، من نقطة البيع وصولاً إلى تقارير الإدارة.",
    },
    focus: {
      en: ["Role-based access", "Inventory events", "Repair lifecycle", "Multi-currency", "RTL architecture", "Operational reports"],
      ar: ["صلاحيات حسب الأدوار", "حركات المخزون", "دورة الصيانة", "عملات متعددة", "دعم RTL", "تقارير تشغيلية"],
    },
    layers: ["React", "Node.js", "Express", "PostgreSQL", "JWT", "REST API"],
    icon: "/assets/phonexa/icon.png",
    screens: ["/assets/phonexa/screen-1.png", "/assets/phonexa/screen-2.png", "/assets/phonexa/screen-3.png"],
    live: "https://phonexa-web.onrender.com/app/",
    demo: true,
  },
  {
    id: "tapflow",
    number: "02",
    name: "TapFlow AI",
    category: { en: "Android automation engine", ar: "محرك أتمتة Android" },
    headline: {
      en: "A programmable layer above everyday Android apps.",
      ar: "طبقة قابلة للبرمجة فوق تطبيقات Android اليومية.",
    },
    summary: {
      en: "A gesture-driven automation tool that captures nearby text, translates it, sends it to Gemini, opens apps, and executes configurable multi-step workflows.",
      ar: "أداة أتمتة تعتمد على الإيماءات، تسحب النصوص وتترجمها وترسلها إلى Gemini وتفتح التطبيقات وتنفذ مسارات متعددة الخطوات.",
    },
    challenge: {
      en: "Useful actions are scattered across apps. Moving text between a conversation, translation, AI, and another destination creates repetitive friction.",
      ar: "الإجراءات المفيدة موزعة بين التطبيقات، ونقل النص من محادثة إلى الترجمة والذكاء الاصطناعي ثم إلى وجهة أخرى يسبب تكراراً مزعجاً.",
    },
    system: {
      en: "I built a configurable workflow executor with gesture triggers, reusable actions, ordered steps, delays, retries, floating controls, and Android-aware execution.",
      ar: "بنيت منفّذ مسارات قابل للضبط مع إيماءات وإجراءات قابلة لإعادة الاستخدام وخطوات مرتبة وتأخير وإعادة محاولة وأزرار عائمة.",
    },
    outcome: {
      en: "Complex cross-app routines become one deliberate gesture—within the permissions Android safely allows.",
      ar: "تتحول المهام المعقدة بين التطبيقات إلى إيماءة واحدة، ضمن الحدود الآمنة التي يسمح بها Android.",
    },
    focus: {
      en: ["Workflow engine", "Gesture routing", "Accessibility services", "Action retries", "Gemini handoff", "Floating controls"],
      ar: ["محرك مسارات", "توجيه الإيماءات", "خدمات إمكانية الوصول", "إعادة المحاولة", "ربط Gemini", "أزرار عائمة"],
    },
    layers: ["Flutter", "Android", "Accessibility", "Gemini", "State machine", "Local data"],
    icon: "/assets/tapflow/icon.png",
    screens: ["/assets/tapflow/screen-1.png", "/assets/tapflow/screen-2.png", "/assets/tapflow/screen-3.png"],
    apk: true,
  },
  {
    id: "daftar",
    number: "03",
    name: "Daftar",
    category: { en: "Accounting & inventory system", ar: "نظام محاسبة ومخزون" },
    headline: {
      en: "Accounting built around how real inventory moves.",
      ar: "محاسبة مبنية حول حركة المخزون الحقيقية.",
    },
    summary: {
      en: "A multi-user accounting product that connects inventory, sales, invoices, debts, damaged goods, suppliers, customers, expenses, and reports.",
      ar: "منتج محاسبي متعدد المستخدمين يربط المخزون والمبيعات والفواتير والديون والتالف والموردين والعملاء والمصروفات والتقارير.",
    },
    challenge: {
      en: "Small businesses need more than a ledger: quantities, weights, damage, supplier obligations, customer debt, and cash movement must agree.",
      ar: "الأعمال الصغيرة تحتاج أكثر من دفتر قيود؛ يجب أن تتطابق الكميات والأوزان والتالف وحقوق الموردين وديون العملاء وحركة النقد.",
    },
    system: {
      en: "I modelled the commercial lifecycle from inventory intake to sale, invoice, settlement, debt, and reporting—with user roles and smart import flows.",
      ar: "نمذجت الدورة التجارية من إدخال المخزون إلى البيع والفاتورة والتسديد والدَين والتقارير، مع أدوار مستخدمين واستيراد ذكي.",
    },
    outcome: {
      en: "A connected financial picture where operational actions are reflected in the records that matter.",
      ar: "صورة مالية مترابطة تنعكس فيها العمليات اليومية مباشرة في السجلات المهمة.",
    },
    focus: {
      en: ["Transactional flows", "Quantity & weight stock", "Invoice lifecycle", "Debt tracking", "Smart import", "Business reports"],
      ar: ["مسارات المعاملات", "مخزون كمية ووزن", "دورة الفاتورة", "تتبع الديون", "استيراد ذكي", "تقارير أعمال"],
    },
    layers: ["Flutter", "Node.js", "Express", "MongoDB", "JWT", "Reporting"],
    icon: "/assets/daftar/icon.png",
    screens: ["/assets/daftar/screen-1.png", "/assets/daftar/screen-2.png", "/assets/daftar/screen-3.png"],
    live: "https://accounting-pro-node-app3.onrender.com",
    demo: true,
    apk: true,
  },
  {
    id: "maliyati",
    number: "04",
    name: "Maliyati",
    category: { en: "Personal finance system", ar: "نظام إدارة مالية" },
    headline: {
      en: "A controlled view of money across wallets and currencies.",
      ar: "رؤية مضبوطة للأموال عبر المحافظ والعملات.",
    },
    summary: {
      en: "Tracks income, expenses, receivables, payables, and cash flow across wallets with USD/LBP handling, limits, alerts, backups, and a JSON transaction engine.",
      ar: "يتابع الدخل والمصروفات والمستحقات والتدفق النقدي عبر المحافظ مع USD/LBP وحدود وتنبيهات ونسخ احتياطي ومحرك معاملات JSON.",
    },
    challenge: {
      en: "Money spread across cash and digital wallets is difficult to reconcile consistently.",
      ar: "يصعب توحيد الأموال الموزعة بين النقد والمحافظ الرقمية بصورة دقيقة.",
    },
    system: {
      en: "A structured transaction model with manual and scripted input, multi-wallet balances, categorisation, alerts, and portable backups.",
      ar: "نموذج معاملات منظم بإدخال يدوي أو برمجي وأرصدة متعددة وتصنيفات وتنبيهات ونسخ احتياطي قابل للنقل.",
    },
    outcome: {
      en: "A dependable personal control center without pretending to be a banking integration.",
      ar: "مركز تحكم شخصي موثوق من دون الادعاء بأنه تكامل مصرفي مباشر.",
    },
    focus: {
      en: ["Transaction engine", "Multi-wallet model", "USD / LBP", "Spending alerts", "JSON actions", "Drive backup"],
      ar: ["محرك معاملات", "محافظ متعددة", "USD / LBP", "تنبيهات إنفاق", "إجراءات JSON", "نسخ Drive"],
    },
    layers: ["Flutter", "Firebase", "JSON", "Google Drive", "Local auth", "Analytics"],
    icon: "/assets/maliyati/icon.png",
    screens: ["/assets/maliyati/screen-1.png", "/assets/maliyati/screen-2.png", "/assets/maliyati/screen-3.png"],
    apk: true,
  },
  {
    id: "matjari",
    number: "05",
    name: "Matjari",
    category: { en: "App distribution platform", ar: "منصة توزيع تطبيقات" },
    headline: {
      en: "An independent release channel for Android products.",
      ar: "قناة مستقلة لإصدار منتجات Android.",
    },
    summary: {
      en: "A private app marketplace with APK uploads, product listings, screenshots, update delivery, user management, analytics, and storage controls.",
      ar: "متجر تطبيقات خاص يشمل رفع APK وصفحات التطبيقات والصور وتوصيل التحديثات وإدارة المستخدمين والتحليلات والتخزين.",
    },
    challenge: {
      en: "Private Android products still need controlled publishing, discovery, releases, and updates.",
      ar: "حتى تطبيقات Android الخاصة تحتاج نشرًا مضبوطًا واكتشافاً وإصدارات وتحديثات.",
    },
    system: {
      en: "I built both sides of the release lifecycle: the user storefront and an administration surface for apps, versions, assets, users, and downloads.",
      ar: "بنيت جانبي دورة الإصدار: متجر المستخدم ولوحة إدارة للتطبيقات والإصدارات والملفات والمستخدمين والتنزيلات.",
    },
    outcome: {
      en: "A self-owned channel for distributing and maintaining Android software.",
      ar: "قناة مملوكة بالكامل لتوزيع برمجيات Android وصيانتها.",
    },
    focus: {
      en: ["Release management", "APK storage", "Update delivery", "Admin console", "User access", "Download analytics"],
      ar: ["إدارة الإصدارات", "تخزين APK", "توصيل التحديث", "لوحة إدارة", "دخول المستخدم", "تحليلات التنزيل"],
    },
    layers: ["Flutter", "Node.js", "Express", "Supabase", "Storage", "REST API"],
    icon: "/assets/matjari/icon.png",
    screens: ["/assets/matjari/screen-1.png", "/assets/matjari/screen-2.png", "/assets/matjari/screen-3.png"],
    apk: true,
  },
  {
    id: "subtrack",
    number: "06",
    name: "SubTrack",
    category: { en: "Subscription operations", ar: "إدارة الاشتراكات" },
    headline: {
      en: "Renewals, accounts, and outstanding balances—under control.",
      ar: "التجديدات والحسابات والمبالغ المستحقة تحت السيطرة.",
    },
    summary: {
      en: "Built for personal tracking and digital-subscription businesses, with grouped accounts, renewal windows, expiry status, outstanding balances, and cloud sync.",
      ar: "مصمم للتتبع الشخصي وأعمال الاشتراكات الرقمية، مع حسابات مجمعة ومواعيد تجديد وانتهاء ومستحقات ومزامنة سحابية.",
    },
    challenge: {
      en: "Subscription portfolios become operationally risky when renewal dates, account ownership, and payment status live in memory or scattered notes.",
      ar: "تصبح الاشتراكات خطرة تشغيلياً حين تعيش مواعيد التجديد وملكية الحساب وحالة الدفع في الذاكرة أو ملاحظات متفرقة.",
    },
    system: {
      en: "I created a category and account hierarchy with renewal calculations, urgency states, outstanding views, payment actions, and synchronised data.",
      ar: "أنشأت هيكل تصنيفات وحسابات مع حساب التجديد وحالات الاستعجال والمستحقات وإجراءات الدفع والبيانات المتزامنة.",
    },
    outcome: {
      en: "A clear operational queue for what renews next, what is unpaid, and what needs attention.",
      ar: "قائمة تشغيلية واضحة لما سيتجدد وما لم يُدفع وما يحتاج إلى متابعة.",
    },
    focus: {
      en: ["Renewal logic", "Account grouping", "Expiry states", "Outstanding ledger", "Cloud sync", "Business + personal modes"],
      ar: ["منطق التجديد", "تجميع الحسابات", "حالات الانتهاء", "سجل المستحقات", "مزامنة سحابية", "وضع شخصي وتجاري"],
    },
    layers: ["Flutter", "Firebase", "Cloud sync", "Notifications", "Auth", "State management"],
    icon: "/assets/subtrack/icon.png",
    screens: ["/assets/subtrack/screen-1.png", "/assets/subtrack/screen-2.png", "/assets/subtrack/screen-3.png"],
    apk: true,
  },
];

const copy = {
  en: {
    nav: ["Systems", "Method", "Profile", "Contact"],
    available: "Available for remote work",
    eyebrow: "BACKEND-MINDED PRODUCT ENGINEER",
    heroLead: "I engineer the",
    heroAccent: "whole product.",
    heroBody:
      "From business rules and secure APIs to data models, mobile clients, and operational dashboards—I turn complex ideas into reliable systems people can actually run.",
    explore: "Explore selected systems",
    contact: "Start a conversation",
    years: "Years building",
    products: "Products & systems",
    scope: "End-to-end ownership",
    proof: "Built across",
    proofLine: "Retail operations · Android automation · Accounting · Personal finance · Distribution · Subscriptions",
    selectedEyebrow: "SELECTED SYSTEMS",
    selectedTitle: "Not interface concepts. Working product systems.",
    selectedBody:
      "Each case study reveals the operational problem, the system behind the screens, and the engineering decisions that make it dependable.",
    caseStudy: "Case study",
    challenge: "The operational challenge",
    built: "The system I built",
    result: "Result",
    engineered: "What I engineered",
    architecture: "System layers",
    openCase: "Open case file",
    live: "Open live product",
    demo: "Demo ready",
    apk: "APK ready",
    moreEyebrow: "MORE BUILT SYSTEMS",
    moreTitle: "Different domains. The same systems discipline.",
    methodEyebrow: "ENGINEERING SIGNATURE",
    methodTitle: "I don’t stop at screens.",
    methodBody:
      "I model the business, secure the flows, structure the data, and ship the operating product. The interface is only the visible edge of that work.",
    capabilityEyebrow: "CAPABILITY MAP",
    capabilityTitle: "A practical stack, organised by responsibility.",
    progressEyebrow: "NOW BUILDING",
    progressTitle: "The next systems are already in motion.",
    profileEyebrow: "PROFILE",
    profileTitle: "Built through years of solving real problems.",
    profileBody:
      "I have spent more than seven years learning by building—through freelance work, commercial needs, and more than ten personal products. That path taught me to think beyond frameworks: understand the operation, design the model, protect the data, and finish the product.",
    profileQuote: "Strong software is not a pile of technologies. It is a clear model of a real problem.",
    contactEyebrow: "LET’S BUILD SOMETHING USEFUL",
    contactTitle: "Have a complex product in mind?",
    contactBody:
      "I’m available from Beirut for remote product engineering, backend systems, Flutter applications, and full product builds.",
    email: "Email me",
    whatsapp: "WhatsApp",
    location: "Beirut, Lebanon · Remote worldwide",
    close: "Close case study",
    prev: "Previous screenshot",
    next: "Next screenshot",
  },
  ar: {
    nav: ["الأنظمة", "المنهج", "الملف", "التواصل"],
    available: "متاح للعمل عن بُعد",
    eyebrow: "مهندس منتجات بعقلية Backend",
    heroLead: "أهندس المنتج",
    heroAccent: "من جذوره إلى واجهته.",
    heroBody:
      "من منطق العمل وواجهات API الآمنة إلى نماذج البيانات وتطبيقات الهاتف ولوحات التشغيل، أحوّل الأفكار المعقدة إلى أنظمة موثوقة قابلة للاستخدام الفعلي.",
    explore: "استكشف الأنظمة المختارة",
    contact: "ابدأ محادثة",
    years: "سنوات من البناء",
    products: "منتجات وأنظمة",
    scope: "ملكية من البداية للنهاية",
    proof: "خبرة عملية في",
    proofLine: "عمليات المتاجر · أتمتة Android · المحاسبة · الإدارة المالية · توزيع التطبيقات · الاشتراكات",
    selectedEyebrow: "أنظمة مختارة",
    selectedTitle: "ليست أفكار واجهات، بل أنظمة منتجات تعمل.",
    selectedBody:
      "تكشف كل دراسة حالة المشكلة التشغيلية والنظام خلف الشاشات والقرارات الهندسية التي تجعله موثوقاً.",
    caseStudy: "دراسة حالة",
    challenge: "التحدي التشغيلي",
    built: "النظام الذي بنيته",
    result: "النتيجة",
    engineered: "ما قمت بهندسته",
    architecture: "طبقات النظام",
    openCase: "افتح ملف المشروع",
    live: "افتح المنتج الحي",
    demo: "حساب Demo جاهز",
    apk: "ملف APK جاهز",
    moreEyebrow: "أنظمة إضافية",
    moreTitle: "مجالات مختلفة، وانضباط هندسي واحد.",
    methodEyebrow: "بصمتي الهندسية",
    methodTitle: "عملي لا يتوقف عند الشاشات.",
    methodBody:
      "أفهم العمل، وأنمذج قواعده، وأؤمّن المسارات، وأنظم البيانات، ثم أسلّم المنتج التشغيلي. الواجهة ليست سوى الجزء المرئي من هذا العمل.",
    capabilityEyebrow: "خريطة القدرات",
    capabilityTitle: "تقنيات عملية مرتبة حسب مسؤوليتها.",
    progressEyebrow: "قيد البناء الآن",
    progressTitle: "الأنظمة القادمة أصبحت قيد التنفيذ.",
    profileEyebrow: "الملف المهني",
    profileTitle: "خبرة بُنيت عبر سنوات من حل مشكلات حقيقية.",
    profileBody:
      "أمضيت أكثر من سبع سنوات أتعلم من خلال البناء، بين العمل الحر والاحتياجات التجارية وأكثر من عشرة منتجات شخصية. علّمني هذا الطريق أن أفكر أبعد من إطار العمل: أفهم العملية، أصمم النموذج، أحمي البيانات، وأُنهي المنتج.",
    profileQuote: "البرمجيات القوية ليست مجموعة تقنيات، بل نموذج واضح لمشكلة حقيقية.",
    contactEyebrow: "لنبنِ شيئاً مفيداً",
    contactTitle: "لديك فكرة منتج معقدة؟",
    contactBody:
      "متاح من بيروت للعمل عن بُعد في هندسة المنتجات وأنظمة Backend وتطبيقات Flutter وبناء المنتجات الكاملة.",
    email: "راسلني",
    whatsapp: "واتساب",
    location: "بيروت، لبنان · عمل عن بُعد حول العالم",
    close: "إغلاق دراسة الحالة",
    prev: "الصورة السابقة",
    next: "الصورة التالية",
  },
};

const methodItems = {
  en: [
    ["01", "Model the operation", "Turn real workflows, edge cases, and permissions into a system that can be reasoned about."],
    ["02", "Protect the boundaries", "Design authentication, roles, validation, and controlled state transitions around the actual risks."],
    ["03", "Make data useful", "Structure records for reliable operations, clear reporting, and maintainable product decisions."],
    ["04", "Ship the whole loop", "Connect service, data, client, administration, deployment, and the feedback needed to operate it."],
  ],
  ar: [
    ["01", "نمذجة العملية", "تحويل المسارات الفعلية والحالات الاستثنائية والصلاحيات إلى نظام يمكن فهمه وتطويره."],
    ["02", "حماية الحدود", "تصميم المصادقة والأدوار والتحقق وانتقالات الحالة المضبوطة حول المخاطر الحقيقية."],
    ["03", "جعل البيانات مفيدة", "تنظيم السجلات لعمليات موثوقة وتقارير واضحة وقرارات منتج قابلة للصيانة."],
    ["04", "تسليم الحلقة كاملة", "ربط الخدمة والبيانات والتطبيق والإدارة والنشر والتغذية الراجعة اللازمة للتشغيل."],
  ],
};

const capabilities = {
  en: [
    ["Product surfaces", "Flutter · React · HTML · CSS · JavaScript"],
    ["Service layer", "Node.js · Express · REST APIs · JSON · JWT"],
    ["Data & cloud", "PostgreSQL · MongoDB · Firebase · Supabase"],
    ["Delivery & signals", "FCM · GitHub · Render · Cloud storage"],
  ],
  ar: [
    ["واجهات المنتج", "Flutter · React · HTML · CSS · JavaScript"],
    ["طبقة الخدمات", "Node.js · Express · REST APIs · JSON · JWT"],
    ["البيانات والسحابة", "PostgreSQL · MongoDB · Firebase · Supabase"],
    ["التسليم والإشارات", "FCM · GitHub · Render · Cloud storage"],
  ],
};

const inProgress = {
  en: [
    {
      name: "MarketKernel",
      type: "Automated trading & market intelligence",
      text: "A platform for market data, observable strategy execution, risk controls, and operational automation.",
    },
    {
      name: "SubVanta",
      type: "Digital subscription commerce",
      text: "An end-to-end platform for selling, delivering, and operating digital subscriptions online.",
    },
  ],
  ar: [
    {
      name: "MarketKernel",
      type: "تداول آلي وذكاء أسواق",
      text: "منصة لبيانات السوق وتنفيذ الاستراتيجيات القابل للمراقبة وضوابط المخاطر والأتمتة التشغيلية.",
    },
    {
      name: "SubVanta",
      type: "تجارة الاشتراكات الرقمية",
      text: "منصة متكاملة لبيع الاشتراكات الرقمية وتسليمها وإدارة عملياتها عبر الإنترنت.",
    },
  ],
};

const IconArrow = () => <span aria-hidden="true" className="icon-arrow">→</span>;
const IconExternal = () => <span aria-hidden="true" className="icon-external">↗</span>;

function ProductVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`product-visual ${compact ? "product-visual--compact" : ""}`}>
      <div className="visual-glow" />
      <div className="visual-window">
        <div className="window-bar">
          <span /><span /><span />
          <b>{project.name}</b>
        </div>
        <img
          className="visual-main"
          src={project.screens[0]}
          alt={`${project.name} product interface`}
          width={1000}
          height={700}
        />
      </div>
      {!compact && (
        <div className="visual-phone">
          <img
            src={project.screens[1]}
            alt={`${project.name} mobile interface`}
            width={420}
            height={820}
          />
        </div>
      )}
      <div className="visual-brand">
        <img src={project.icon} alt="" width={54} height={54} />
        <span>{project.name}</span>
      </div>
    </div>
  );
}

function CaseModal({
  project,
  language,
  onClose,
}: {
  project: Project;
  language: Language;
  onClose: () => void;
}) {
  const t = copy[language];
  const [screen, setScreen] = useState(0);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setScreen((value) => (value + 1) % project.screens.length);
      if (event.key === "ArrowLeft") setScreen((value) => (value - 1 + project.screens.length) % project.screens.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, project.screens.length]);

  return (
    <div className="case-modal" role="dialog" aria-modal="true" aria-label={`${project.name} ${t.caseStudy}`}>
      <button className="modal-backdrop" onClick={onClose} aria-label={t.close} />
      <article className="case-sheet">
        <div className="case-sheet__top">
          <div className="case-sheet__identity">
            <img src={project.icon} alt="" width={58} height={58} />
            <div>
              <span>{project.number} / {t.caseStudy}</span>
              <h2>{project.name}</h2>
            </div>
          </div>
          <button className="close-button" onClick={onClose} aria-label={t.close}>×</button>
        </div>

        <div className="case-sheet__grid">
          <div className="case-gallery">
            <div className="gallery-stage">
              <img
                src={project.screens[screen]}
                alt={`${project.name} screenshot ${screen + 1}`}
                width={1100}
                height={720}
                className="gallery-image"
              />
            </div>
            <div className="gallery-controls">
              <button
                onClick={() => setScreen((value) => (value - 1 + project.screens.length) % project.screens.length)}
                aria-label={t.prev}
              >
                <IconArrow />
              </button>
              <div className="gallery-dots">
                {project.screens.map((_, index) => (
                  <button
                    key={index}
                    className={screen === index ? "active" : ""}
                    onClick={() => setScreen(index)}
                    aria-label={`${project.name} screenshot ${index + 1}`}
                  />
                ))}
              </div>
              <button onClick={() => setScreen((value) => (value + 1) % project.screens.length)} aria-label={t.next}>
                <IconArrow />
              </button>
            </div>
          </div>

          <div className="case-sheet__content">
            <span className="eyebrow">{pick(language, project.category)}</span>
            <h3>{pick(language, project.headline)}</h3>
            <p className="case-lead">{pick(language, project.summary)}</p>

            <div className="case-fact">
              <span>{t.challenge}</span>
              <p>{pick(language, project.challenge)}</p>
            </div>
            <div className="case-fact">
              <span>{t.built}</span>
              <p>{pick(language, project.system)}</p>
            </div>
            <div className="case-outcome">
              <span>{t.result}</span>
              <p>{pick(language, project.outcome)}</p>
            </div>

            <div className="case-focus">
              <span>{t.engineered}</span>
              <div>
                {project.focus[language].map((item) => <b key={item}>{item}</b>)}
              </div>
            </div>

            <div className="case-actions">
              {project.live && (
                <a className="button button--primary" href={project.live} target="_blank" rel="noreferrer">
                  {t.live}<IconExternal />
                </a>
              )}
              {project.demo && <span className="status-pill status-pill--green">{t.demo}</span>}
              {project.apk && <span className="status-pill">{t.apk}</span>}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export function Portfolio() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const t = copy[language];
  const rtl = language === "ar";
  const primaryProjects = projects.slice(0, 3);
  const secondaryProjects = projects.slice(3);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [language, rtl]);

  return (
    <main className={rtl ? "portfolio rtl" : "portfolio"}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ali Dandash home">
          <span className="brand-mark">AD</span>
          <span className="brand-copy">
            <b>Ali Dandash</b>
            <small>Systems / Products</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#systems">{t.nav[0]}</a>
          <a href="#method">{t.nav[1]}</a>
          <a href="#profile">{t.nav[2]}</a>
          <a href="#contact">{t.nav[3]}</a>
        </nav>

        <div className="header-actions">
          <span className="availability"><i />{t.available}</span>
          <button className="language-button" onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
            {language === "en" ? "عربي" : "EN"}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" />
        <div className="hero-orbit hero-orbit--one" />
        <div className="hero-orbit hero-orbit--two" />

        <div className="hero-copy">
          <span className="eyebrow"><i />{t.eyebrow}</span>
          <h1>
            {t.heroLead}
            <span>{t.heroAccent}</span>
          </h1>
          <p>{t.heroBody}</p>
          <div className="hero-actions">
            <a className="button button--primary button--large" href="#systems">
              {t.explore}<IconArrow />
            </a>
            <a className="button button--ghost button--large" href="#contact">{t.contact}</a>
          </div>
          <div className="hero-links">
            <a href="https://github.com/ali970x" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ali-dandash-37a446255/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </div>

        <div className="hero-system">
          <div className="portrait-frame">
            <img
              src="/assets/portrait/ali-dandash.png"
              alt="Ali Majed Dandash"
              width={600}
              height={1024}
              className="portrait-image"
            />
            <div className="portrait-vignette" />
            <span className="portrait-label">ALI / BEIRUT</span>
          </div>

          <div className="system-map">
            <div className="system-map__title">
              <span>PRODUCT SYSTEM</span>
              <b>LIVE</b>
            </div>
            <div className="system-flow">
              <div className="system-node"><small>01</small><strong>CLIENT</strong><span>Flutter / React</span></div>
              <i />
              <div className="system-node"><small>02</small><strong>API</strong><span>Node / Express</span></div>
              <i />
              <div className="system-node"><small>03</small><strong>DOMAIN</strong><span>Rules / Access</span></div>
              <i />
              <div className="system-node"><small>04</small><strong>DATA</strong><span>SQL / NoSQL</span></div>
            </div>
          </div>
        </div>

        <div className="hero-metrics">
          <div><strong>7+</strong><span>{t.years}</span></div>
          <div><strong>10+</strong><span>{t.products}</span></div>
          <div><strong>360°</strong><span>{t.scope}</span></div>
        </div>
      </section>

      <section className="proof-rail">
        <span>{t.proof}</span>
        <p>{t.proofLine}</p>
      </section>

      <section className="section systems-section" id="systems">
        <div className="section-heading">
          <span className="eyebrow">{t.selectedEyebrow}</span>
          <h2>{t.selectedTitle}</h2>
          <p>{t.selectedBody}</p>
        </div>

        <div className="primary-cases">
          {primaryProjects.map((project, index) => (
            <article className="case-row" key={project.id}>
              <div className="case-row__copy">
                <div className="case-index">
                  <span>{project.number}</span>
                  <i />
                  <b>{pick(language, project.category)}</b>
                </div>
                <div className="project-identity">
                  <img src={project.icon} alt="" width={62} height={62} />
                  <div>
                    <span>{t.caseStudy}</span>
                    <h3>{project.name}</h3>
                  </div>
                </div>
                <h4>{pick(language, project.headline)}</h4>
                <p>{pick(language, project.summary)}</p>

                <div className="case-result">
                  <span>{t.result}</span>
                  <p>{pick(language, project.outcome)}</p>
                </div>

                <div className="layer-row" aria-label={t.architecture}>
                  {project.layers.map((layer) => <span key={layer}>{layer}</span>)}
                </div>

                <div className="case-row__actions">
                  <button className="text-button" onClick={() => setActiveProject(project)}>
                    {t.openCase}<IconArrow />
                  </button>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer">
                      {t.live}<IconExternal />
                    </a>
                  )}
                </div>
              </div>
              <div className="case-row__visual">
                <ProductVisual project={project} />
                <span className="visual-count">0{index + 1} / 03</span>
              </div>
            </article>
          ))}
        </div>

        <div className="more-heading">
          <span className="eyebrow">{t.moreEyebrow}</span>
          <h2>{t.moreTitle}</h2>
        </div>

        <div className="secondary-grid">
          {secondaryProjects.map((project) => (
            <article className="secondary-case" key={project.id}>
              <div className="secondary-case__visual">
                <ProductVisual project={project} compact />
              </div>
              <div className="secondary-case__body">
                <div className="case-index">
                  <span>{project.number}</span>
                  <i />
                  <b>{pick(language, project.category)}</b>
                </div>
                <h3>{project.name}</h3>
                <h4>{pick(language, project.headline)}</h4>
                <p>{pick(language, project.summary)}</p>
                <button className="text-button" onClick={() => setActiveProject(project)}>
                  {t.openCase}<IconArrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="method-intro">
          <span className="eyebrow">{t.methodEyebrow}</span>
          <h2>{t.methodTitle}</h2>
          <p>{t.methodBody}</p>
        </div>

        <div className="method-stage">
          <div className="architecture-board">
            <div className="architecture-board__head">
              <span>ALI / SYSTEM BLUEPRINT</span>
              <b>END-TO-END</b>
            </div>
            <div className="architecture-board__core">
              <span>DOMAIN</span>
              <strong>BUSINESS<br />LOGIC</strong>
              <small>rules · states · permissions</small>
            </div>
            <div className="architecture-node architecture-node--one"><small>INPUT</small><b>PRODUCT</b><span>mobile / web</span></div>
            <div className="architecture-node architecture-node--two"><small>SERVICE</small><b>API</b><span>auth / validation</span></div>
            <div className="architecture-node architecture-node--three"><small>STATE</small><b>DATA</b><span>models / events</span></div>
            <div className="architecture-node architecture-node--four"><small>CONTROL</small><b>OPS</b><span>admin / reports</span></div>
            <div className="architecture-line architecture-line--one" />
            <div className="architecture-line architecture-line--two" />
            <div className="architecture-line architecture-line--three" />
            <div className="architecture-line architecture-line--four" />
          </div>

          <div className="method-list">
            {methodItems[language].map(([number, title, body]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section capability-section">
        <div className="capability-heading">
          <span className="eyebrow">{t.capabilityEyebrow}</span>
          <h2>{t.capabilityTitle}</h2>
        </div>
        <div className="capability-grid">
          {capabilities[language].map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section progress-section">
        <div className="progress-heading">
          <span className="eyebrow">{t.progressEyebrow}</span>
          <h2>{t.progressTitle}</h2>
        </div>
        <div className="progress-grid">
          {inProgress[language].map((project, index) => (
            <article key={project.name}>
              <div className="progress-card__top">
                <span>0{index + 1}</span>
                <b><i /> IN DEVELOPMENT</b>
              </div>
              <h3>{project.name}</h3>
              <h4>{project.type}</h4>
              <p>{project.text}</p>
              <div className="progress-track"><span /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="section profile-section" id="profile">
        <div className="profile-mark">AD</div>
        <div className="profile-copy">
          <span className="eyebrow">{t.profileEyebrow}</span>
          <h2>{t.profileTitle}</h2>
          <p>{t.profileBody}</p>
          <blockquote>{t.profileQuote}</blockquote>
        </div>
        <div className="profile-timeline">
          <div><span>7+</span><p>{language === "en" ? "Years of continuous learning through building" : "سنوات من التعلم المستمر عبر البناء"}</p></div>
          <div><span>10+</span><p>{language === "en" ? "Personal and commercial products created" : "منتجات شخصية وتجارية تم بناؤها"}</p></div>
          <div><span>∞</span><p>{language === "en" ? "Curiosity beyond any single language or framework" : "فضول يتجاوز أي لغة أو إطار عمل واحد"}</p></div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-glow" />
        <div className="contact-copy">
          <span className="eyebrow">{t.contactEyebrow}</span>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>
        <div className="contact-actions">
          <a className="button button--light button--large" href="mailto:labdev99@gmail.com">
            {t.email}<IconArrow />
          </a>
          <a className="button button--outline-light button--large" href="https://wa.me/96176652276" target="_blank" rel="noreferrer">
            {t.whatsapp}
          </a>
          <span>{t.location}</span>
        </div>
      </section>

      <footer>
        <div>
          <span className="brand-mark">AD</span>
          <p>Ali Majed Dandash<br /><small>Software Engineer / Systems & Products</small></p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/ali970x" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ali-dandash-37a446255/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:labdev99@gmail.com">Email</a>
        </div>
        <span>© 2026 / BEIRUT</span>
      </footer>

      {activeProject && (
        <CaseModal
          project={activeProject}
          language={language}
          onClose={() => setActiveProject(null)}
        />
      )}
    </main>
  );
}
