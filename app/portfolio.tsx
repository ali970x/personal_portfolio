"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

type Language = "en" | "ar";
type Localized = { en: string; ar: string };
type LocalizedList = { en: string[]; ar: string[] };

type ProjectDetails = {
  status: Localized;
  role: Localized;
  architecture: Localized;
  verified: LocalizedList;
  challenges: LocalizedList;
  boundaries: LocalizedList;
};

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
  details?: ProjectDetails;
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
      en: "Gesture-powered productivity across Android apps.",
      ar: "إنتاجية مدعومة بالإيماءات عبر تطبيقات Android.",
    },
    summary: {
      en: "An Android-only Flutter MVP that places a configurable floating control above other apps, turning taps, drags, and gestures into local actions and multi-step workflows.",
      ar: "نموذج MVP مبني بـFlutter لنظام Android يضع زرًا عائمًا قابلًا للتخصيص فوق التطبيقات، ويحوّل الضغط والسحب والإيماءات إلى أوامر محلية ومسارات متعددة الخطوات.",
    },
    challenge: {
      en: "Useful actions are scattered across apps. Moving text between a conversation, translation, AI, and another destination creates repetitive friction.",
      ar: "الإجراءات المفيدة موزعة بين التطبيقات، ونقل النص من محادثة إلى الترجمة والذكاء الاصطناعي ثم إلى وجهة أخرى يسبب تكراراً مزعجاً.",
    },
    system: {
      en: "I built the Flutter configuration experience and a lightweight native Kotlin overlay, connected through MethodChannel to an action executor, AccessibilityService, app intents, local logs, and bounded workflow retries.",
      ar: "بنيت تجربة الإعداد في Flutter وواجهة عائمة خفيفة بـKotlin، وربطتهما عبر MethodChannel بمنفّذ أوامر وAccessibilityService وapp intents وسجلات محلية وإعادة محاولات محدودة للمسارات.",
    },
    outcome: {
      en: "A working advanced prototype with a configurable overlay, workflow builder, local backup/restore, and practical Google Translate and Gemini handoffs.",
      ar: "نموذج أولي متقدم يعمل فعليًا، مع زر عائم قابل للتخصيص ومنشئ مسارات ونسخ احتياطي محلي وربط عملي مع Google Translate وGemini.",
    },
    focus: {
      en: ["Native overlay", "Gesture routing", "Accessibility actions", "Workflow retries", "Translate / Gemini handoff", "Local configuration"],
      ar: ["واجهة عائمة أصلية", "توجيه الإيماءات", "أوامر Accessibility", "إعادة محاولة المسارات", "ربط Translate وGemini", "إعدادات محلية"],
    },
    layers: ["Flutter", "Kotlin", "MethodChannel", "Accessibility", "Overlay", "SharedPreferences"],
    icon: "/assets/tapflow/icon.png",
    screens: ["/assets/tapflow/screen-1.png", "/assets/tapflow/screen-2.png", "/assets/tapflow/screen-3.png"],
    apk: true,
    details: {
      status: {
        en: "Advanced MVP / prototype · Android only",
        ar: "MVP متقدم / نموذج أولي · Android فقط",
      },
      role: {
        en: "End-to-end product design and implementation: Flutter UI, configuration model, workflow builder, local persistence, platform integration, native Android services, permissions, diagnostics, and APK builds.",
        ar: "تصميم وبناء المنتج من البداية إلى النهاية: واجهات Flutter، نموذج الإعدادات، منشئ المسارات، التخزين المحلي، الربط مع Android، الخدمات الأصلية، الصلاحيات، التشخيص، وبناء ملفات APK.",
      },
      architecture: {
        en: "Flutter UI → Riverpod controller → JSON configuration in SharedPreferences → MethodChannel → Kotlin OverlayService → ActionExecutor → AccessibilityService or app intents.",
        ar: "واجهة Flutter ← متحكم Riverpod ← إعدادات JSON في SharedPreferences ← MethodChannel ← خدمة Overlay بـKotlin ← منفّذ الأوامر ← AccessibilityService أو app intents.",
      },
      verified: {
        en: [
          "Floating control above other Android apps",
          "Copy, paste, click, scroll, select-all, and keyboard actions",
          "Hub mode plus configurable gesture mappings",
          "Multi-step workflows with ordering, delays, retries, and local logs",
          "Google Translate and Gemini handoff",
          "Local clipboard history and JSON backup / restore",
        ],
        ar: [
          "زر عائم فوق تطبيقات Android الأخرى",
          "أوامر النسخ واللصق والضغط والتمرير وتحديد الكل ولوحة المفاتيح",
          "وضع Hub مع تخصيص الإيماءات",
          "مسارات متعددة الخطوات مع ترتيب وتأخير وإعادة محاولة وسجلات محلية",
          "ربط مع Google Translate وGemini",
          "سجل حافظة محلي ونسخ واستعادة عبر JSON",
        ],
      },
      challenges: {
        en: [
          "Filtering chat content so timestamps, read receipts, emoji-only labels, and surrounding UI are not mistaken for the intended message.",
          "Keeping the always-on-top control responsive without running a second Flutter engine by rendering it as a lightweight native Android view.",
          "Executing cross-app workflows where Accessibility actions can fail, using ordered steps, bounded retries, delays, and diagnostics.",
        ],
        ar: [
          "تصفية محتوى المحادثة لمنع التقاط الوقت وحالة القراءة والرموز وعناصر الواجهة بدل الرسالة المطلوبة.",
          "الحفاظ على سلاسة الزر العائم من دون تشغيل Flutter engine إضافي، عبر رسمه كواجهة Android أصلية وخفيفة.",
          "تنفيذ مسارات بين تطبيقات مختلفة رغم احتمال فشل أوامر Accessibility، باستخدام خطوات مرتبة وتأخير وإعادة محاولات محدودة وتشخيص محلي.",
        ],
      },
      boundaries: {
        en: [
          "No backend and no embedded AI model; AI features hand text off to installed apps or configured URLs.",
          "Clipboard history is device-local but not encrypted yet.",
          "Production signing, updated tests, privacy policy, and a complete Accessibility disclosure remain before a public release.",
          "Messenger support is experimental and should not be presented as complete.",
        ],
        ar: [
          "لا يوجد Backend أو نموذج AI مضمّن؛ ميزات الذكاء الاصطناعي ترسل النص إلى تطبيقات مثبتة أو روابط يحددها المستخدم.",
          "سجل الحافظة محلي على الجهاز لكنه غير مشفّر حاليًا.",
          "لا يزال المشروع يحتاج توقيع إصدار رسمي وتحديث الاختبارات وسياسة خصوصية وإفصاح Accessibility كامل قبل النشر العام.",
          "دعم Messenger تجريبي ولا يجب عرضه كميزة مكتملة.",
        ],
      },
    },
  },
  {
    id: "daftar",
    number: "03",
    name: "Daftr",
    category: { en: "Accounting & inventory system", ar: "نظام محاسبة ومخزون" },
    headline: {
      en: "Accounting built around how real inventory moves.",
      ar: "محاسبة مبنية حول حركة المخزون الحقيقية.",
    },
    summary: {
      en: "A web and Android accounting system for small retailers, connecting weight-based sales, inventory, invoices, debts, expenses, damaged goods, and reporting.",
      ar: "نظام محاسبة للويب وAndroid مخصص للمحال الصغيرة، يربط البيع بالوزن والمخزون والفواتير والديون والمصاريف والتالف والتقارير.",
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
      en: "Sold and deployed to a grocery store, where it has supported daily operations for two months.",
      ar: "تم بيع النظام وتشغيله في محل بقالة، ويُستخدم في عملياته اليومية منذ شهرين.",
    },
    focus: {
      en: ["Transactional flows", "Quantity & weight stock", "Invoice lifecycle", "Debt tracking", "Smart import", "Business reports"],
      ar: ["مسارات المعاملات", "مخزون كمية ووزن", "دورة الفاتورة", "تتبع الديون", "استيراد ذكي", "تقارير أعمال"],
    },
    layers: ["Flutter", "Node.js", "Express", "MongoDB", "JWT", "Reporting"],
    icon: "/assets/daftar/icon.png",
    screens: ["/assets/daftar/screen-1.png", "/assets/daftar/screen-2.png", "/assets/daftar/screen-3.png"],
    live: "https://accounting-pro-node-app3.onrender.com/",
    apk: true,
    details: {
      status: {
        en: "Advanced development · about 80% · in daily operational use",
        ar: "قيد التطوير المتقدم · نحو 80% · مستخدم يوميًا في العمل",
      },
      role: {
        en: "Independently designed and built end to end: Flutter web and Android clients, Express API, MongoDB models, business rules, Arabic PDF invoices, administration, deployment, and Android integrations.",
        ar: "صممته وبنيته بشكل مستقل من البداية إلى النهاية: تطبيق Flutter للويب وAndroid، وExpress API، ونماذج MongoDB، وقواعد العمل، وفواتير PDF العربية، والإدارة، والنشر، وتكاملات Android.",
      },
      architecture: {
        en: "Flutter client → ApiClient and SessionStore → JWT-protected Express routes/controllers → owner-scoped Mongoose models → MongoDB Atlas, with local pull/push synchronisation through SharedPreferences.",
        ar: "تطبيق Flutter ← ApiClient وSessionStore ← مسارات ومتحكمات Express محمية بـJWT ← نماذج Mongoose معزولة حسب المالك ← MongoDB Atlas، مع مزامنة محلية pull/push عبر SharedPreferences.",
      },
      verified: {
        en: [
          "Weight- and quantity-based sales with multiple prices in one invoice",
          "Arabic PDF invoices with sharing and printing",
          "Inventory intake, low-stock tracking, damaged goods, customers, and suppliers",
          "Customer and supplier debts in USD and LBP with payment histories",
          "Sales, expenses, profit, monthly comparison, and operational reports",
          "Live web product and API plus an Android APK build",
        ],
        ar: [
          "بيع بالوزن والكمية مع أسعار متعددة داخل الفاتورة نفسها",
          "فواتير PDF عربية قابلة للمشاركة والطباعة",
          "توريد ومخزون منخفض وتالف وعملاء وموردون",
          "ديون عملاء وموردين بعملتي USD وLBP مع سجل دفعات",
          "تقارير المبيعات والمصاريف والأرباح والمقارنة الشهرية",
          "منتج Web وAPI حيان مع نسخة APK لنظام Android",
        ],
      },
      challenges: {
        en: [
          "Modelling real retail sales where weight can be the billable amount instead of item count.",
          "Allowing the same product at different prices in one invoice while validating cumulative stock.",
          "Generating readable Arabic and RTL PDF invoices with an embedded Arabic font.",
        ],
        ar: [
          "نمذجة البيع الواقعي حين يكون الوزن هو أساس الحساب بدل عدد القطع.",
          "السماح ببيع المنتج نفسه بأسعار مختلفة في فاتورة واحدة مع التحقق من إجمالي المخزون.",
          "توليد فواتير PDF عربية واضحة باتجاه RTL وخط عربي مضمّن.",
        ],
      },
      boundaries: {
        en: [
          "Production APK signing and backend rate limiting remain before a wider release.",
          "The safe public demo account still needs to be deployed.",
          "There are no published user-count or time-saved metrics; the verified proof is one paying store using the system daily for two months.",
        ],
        ar: [
          "لا يزال توقيع APK الرسمي وإضافة rate limiting للخادم مطلوبين قبل نشر أوسع.",
          "حساب Demo العام والآمن لم يُنشر بعد.",
          "لا توجد أرقام منشورة لعدد المستخدمين أو الوقت الموفر؛ الدليل المثبت هو محل واحد اشترى النظام ويستخدمه يوميًا منذ شهرين.",
        ],
      },
    },
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
    live: "https://maliyati-finance.onrender.com/",
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
      en: "Subscription and digital-account operations, in one place.",
      ar: "عمليات الاشتراكات والحسابات الرقمية في مكان واحد.",
    },
    summary: {
      en: "A cross-platform Flutter beta for organising multiple service accounts, credentials, renewals, costs, outstanding payments, reminders, and cloud-synchronised records.",
      ar: "نسخة Beta متعددة المنصات مبنية بـFlutter لتنظيم حسابات الخدمات وبياناتها ومواعيد التجديد والتكاليف والمدفوعات المعلقة والتنبيهات والسجلات المتزامنة سحابيًا.",
    },
    challenge: {
      en: "Managing digital accounts through messages and scattered notes makes credentials, renewal dates, costs, and pending payments difficult to track reliably.",
      ar: "إدارة الحسابات الرقمية عبر الرسائل والملاحظات المبعثرة تجعل بيانات الدخول ومواعيد التجديد والتكاليف والمدفوعات المعلقة صعبة المتابعة بثقة.",
    },
    system: {
      en: "The system combines grouped service accounts, renewal calculations, a yearly calendar, spending insights, outstanding-payment workflows, local-first Hive storage, and UID-scoped Firestore synchronisation.",
      ar: "يجمع النظام حسابات الخدمات المجمعة وحساب مواعيد التجديد وتقويمًا سنويًا وتحليلات الإنفاق ومسارات المدفوعات المعلقة وتخزين Hive المحلي ومزامنة Firestore حسب UID.",
    },
    outcome: {
      en: "A functional Android and web beta with nine feature screens, a live web build, clean static analysis, and four passing automated tests at audit time.",
      ar: "نسخة Beta وظيفية على Android والويب، تضم تسع شاشات ميزات ونسخة ويب حية، وتمر بالتحليل وأربعة اختبارات آلية ناجحة وقت التدقيق.",
    },
    focus: {
      en: ["Multiple accounts per service", "Renewal calendar", "Outstanding payments", "Spending insights", "Offline-first storage", "Per-user cloud sync"],
      ar: ["عدة حسابات لكل خدمة", "تقويم التجديد", "مدفوعات معلقة", "تحليلات الإنفاق", "تخزين محلي أولًا", "مزامنة سحابية لكل مستخدم"],
    },
    layers: ["Flutter", "Riverpod", "Hive", "Firebase Auth", "Firestore", "Render"],
    icon: "/assets/subtrack/icon.png",
    screens: ["/assets/subtrack/screen-1.png", "/assets/subtrack/screen-2.png", "/assets/subtrack/screen-3.png"],
    live: "https://subtrack-bmbe.onrender.com/",
    apk: true,
    details: {
      status: {
        en: "Functional beta · Android + Web",
        ar: "نسخة Beta وظيفية · Android + Web",
      },
      role: {
        en: "Implementation scope evidenced in the project: Flutter product development, Firebase integration, local data architecture, platform-aware features, and Render web deployment setup.",
        ar: "نطاق التنفيذ المثبت في المشروع: تطوير منتج Flutter، تكامل Firebase، معمارية البيانات المحلية، الميزات المتكيفة مع المنصة، وإعداد نشر الويب على Render.",
      },
      architecture: {
        en: "Flutter UI → Riverpod providers → SubscriptionRepository → Hive local database → FirebaseSyncService → Firestore users/{uid}/subscriptions/{id}. Writes are local first, then synchronised in the background.",
        ar: "واجهة Flutter ← Riverpod providers ← SubscriptionRepository ← قاعدة Hive محلية ← FirebaseSyncService ← Firestore ضمن users/{uid}/subscriptions/{id}. تتم الكتابة محليًا أولًا ثم المزامنة في الخلفية.",
      },
      verified: {
        en: [
          "Multiple accounts grouped under the same digital service",
          "Renewal progress, yearly calendar, reminders, and urgency states",
          "Outstanding-payment totals, payment methods, and bulk mark-as-paid",
          "Monthly spending, category distribution, and highest-cost insights",
          "Email/password and Google authentication paths with per-user Firestore data",
          "Arabic and English, RTL/LTR, light/dark themes, and seven display currencies",
        ],
        ar: [
          "عدة حسابات مجمعة تحت الخدمة الرقمية نفسها",
          "تقدم التجديد وتقويم سنوي وتنبيهات وحالات استعجال",
          "إجمالي المدفوعات المعلقة وطرق الدفع وتحديد الكل كمدفوع",
          "الإنفاق الشهري والتوزيع حسب الفئة وأعلى الاشتراكات كلفة",
          "مسارات دخول بالبريد وGoogle مع بيانات Firestore منفصلة لكل مستخدم",
          "العربية والإنجليزية وRTL/LTR والوضعان الفاتح والداكن وسبع عملات عرض",
        ],
      },
      challenges: {
        en: [
          "Combining fast offline-first Hive storage with quiet per-user Firestore backup and recovery when the network returns.",
          "Preventing duplicate service-account identifiers from causing edits to affect the wrong record, using UUID migration and ID-based storage keys.",
          "Supporting Android and web from one codebase through platform-aware authentication, notifications, assets, app launching, and web fallbacks.",
        ],
        ar: [
          "الجمع بين تخزين Hive السريع الذي يعمل دون اتصال والنسخ والاستعادة الهادئة في Firestore لكل مستخدم عند عودة الشبكة.",
          "منع تكرار معرّفات حسابات الخدمات من توجيه التعديلات إلى سجل خاطئ، عبر UUID migration ومفاتيح تخزين مبنية على المعرّف.",
          "دعم Android والويب من قاعدة كود واحدة عبر تسجيل الدخول والتنبيهات والملفات وفتح التطبيقات وبدائل الويب حسب المنصة.",
        ],
      },
      boundaries: {
        en: [
          "Account passwords and PINs are stored as plain text in Hive and Firestore; field-level encryption is not implemented yet.",
          "Google sign-in on the Render domain still requires Firebase Authorized Domain configuration.",
          "The Android APK is debug-signed, and release notifications require another R8 validation pass.",
          "Cloud sync has no advanced record-level conflict resolution; a non-empty cloud copy wins during sign-in.",
          "The public repository link is intentionally withheld until logs, screenshots, and Git history are sanitised of personal data.",
        ],
        ar: [
          "تُخزن كلمات مرور الحسابات والـPIN كنص واضح في Hive وFirestore؛ تشفير الحقول غير مطبق بعد.",
          "تسجيل الدخول عبر Google على نطاق Render ما زال يحتاج إعداد Authorized Domain في Firebase.",
          "ملف APK موقّع بمفتاح Debug، وتنبيهات Release تحتاج إعادة تحقق مع R8.",
          "لا توجد معالجة متقدمة لتعارض السجلات؛ النسخة السحابية غير الفارغة تفوز عند تسجيل الدخول.",
          "رابط المستودع محجوب عمدًا إلى أن تُنظف السجلات والصور وسجل Git من البيانات الشخصية.",
        ],
      },
    },
  },
];

const copy = {
  en: {
    nav: ["Systems", "Method", "Profile", "Contact"],
    available: "Open to full-time opportunities",
    eyebrow: "FULL-STACK & PRODUCT SYSTEMS ENGINEER",
    heroLead: "I engineer the",
    heroAccent: "whole product.",
    heroBody:
      "I independently design and build complete products—from business rules, secure APIs, and data models to web, mobile, operations, and deployment.",
    explore: "Explore selected systems",
    contact: "Start a conversation",
    years: "Years building",
    products: "Featured systems",
    scope: "End-to-end ownership",
    proof: "Built across",
    proofLine: "Retail operations · Android automation · Accounting · Personal finance · Distribution · Subscriptions",
    selectedEyebrow: "SELECTED SYSTEMS",
    selectedTitle: "Not interface concepts. Working product systems.",
    selectedBody:
      "Every featured system was independently designed and built end to end. Each case study shows the real problem, architecture, verified scope, and current boundaries.",
    caseStudy: "Case study",
    challenge: "The operational challenge",
    built: "The system I built",
    result: "Result",
    engineered: "What I engineered",
    architecture: "System layers",
    openCase: "Open case file",
    live: "Open live product",
    demo: "Demo ready",
    apk: "APK build",
    status: "Current status",
    role: "My role",
    architectureFlow: "Architecture flow",
    verifiedScope: "Verified in the build",
    technicalChallenges: "Technical challenges",
    boundaries: "Current boundaries",
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
    inDevelopment: "80% · IN DEVELOPMENT",
    profileEyebrow: "PROFILE",
    profileTitle: "Built through years of solving real problems.",
    profileBody:
      "I am a full-stack and product systems engineer with more than seven years of learning through building. I independently take products from operational problem and data model to client, backend, deployment, and real-world use.",
    profileQuote: "Strong software is not a pile of technologies. It is a clear model of a real problem.",
    contactEyebrow: "LET’S BUILD SOMETHING USEFUL",
    contactTitle: "Looking for an engineer who owns the whole product?",
    contactBody:
      "I’m open to full-time opportunities in full-stack engineering and product systems, from Beirut or remotely worldwide.",
    email: "Email me",
    whatsapp: "WhatsApp",
    location: "Beirut, Lebanon · Remote worldwide",
    close: "Close case study",
    prev: "Previous screenshot",
    next: "Next screenshot",
  },
  ar: {
    nav: ["الأنظمة", "المنهج", "الملف", "التواصل"],
    available: "متاح لفرص عمل بدوام كامل",
    eyebrow: "مهندس Full-Stack وأنظمة منتجات",
    heroLead: "أهندس المنتج",
    heroAccent: "من جذوره إلى واجهته.",
    heroBody:
      "أصمم وأبني المنتجات بشكل مستقل من البداية إلى النهاية، من قواعد العمل وواجهات API الآمنة ونماذج البيانات إلى الويب والهاتف والتشغيل والنشر.",
    explore: "استكشف الأنظمة المختارة",
    contact: "ابدأ محادثة",
    years: "سنوات من البناء",
    products: "أنظمة معروضة",
    scope: "ملكية من البداية للنهاية",
    proof: "خبرة عملية في",
    proofLine: "عمليات المتاجر · أتمتة Android · المحاسبة · الإدارة المالية · توزيع التطبيقات · الاشتراكات",
    selectedEyebrow: "أنظمة مختارة",
    selectedTitle: "ليست أفكار واجهات، بل أنظمة منتجات تعمل.",
    selectedBody:
      "صممت وبنيت كل نظام معروض بشكل مستقل من البداية إلى النهاية. وتوضح كل دراسة حالة المشكلة والمعمارية والنطاق المثبت والحدود الحالية.",
    caseStudy: "دراسة حالة",
    challenge: "التحدي التشغيلي",
    built: "النظام الذي بنيته",
    result: "النتيجة",
    engineered: "ما قمت بهندسته",
    architecture: "طبقات النظام",
    openCase: "افتح ملف المشروع",
    live: "افتح المنتج الحي",
    demo: "حساب Demo جاهز",
    apk: "نسخة APK",
    status: "الحالة الحالية",
    role: "دوري",
    architectureFlow: "تدفق المعمارية",
    verifiedScope: "الموجود فعليًا",
    technicalChallenges: "التحديات التقنية",
    boundaries: "الحدود الحالية",
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
    inDevelopment: "80% · قيد التطوير",
    profileEyebrow: "الملف المهني",
    profileTitle: "خبرة بُنيت عبر سنوات من حل مشكلات حقيقية.",
    profileBody:
      "أنا مهندس Full-Stack وأنظمة منتجات بخبرة تعلم عملية تتجاوز سبع سنوات. أبني المنتجات بشكل مستقل من المشكلة التشغيلية ونموذج البيانات إلى الواجهة والخادم والنشر والاستخدام الواقعي.",
    profileQuote: "البرمجيات القوية ليست مجموعة تقنيات، بل نموذج واضح لمشكلة حقيقية.",
    contactEyebrow: "لنبنِ شيئاً مفيداً",
    contactTitle: "تبحث عن مهندس يمتلك المنتج كاملًا؟",
    contactBody:
      "متاح لفرص عمل بدوام كامل في هندسة Full-Stack وأنظمة المنتجات، من بيروت أو عن بُعد حول العالم.",
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

        {project.details && (
          <section className="case-deep-dive">
            <div className="case-deep-dive__intro">
              <span className="eyebrow">{project.name} / {t.caseStudy}</span>
              <h3>{t.status}</h3>
              <p className="case-status">{pick(language, project.details.status)}</p>
            </div>

            <div className="case-detail-pair">
              <article>
                <span>{t.role}</span>
                <p>{pick(language, project.details.role)}</p>
              </article>
              <article>
                <span>{t.architectureFlow}</span>
                <p className="architecture-flow">{pick(language, project.details.architecture)}</p>
              </article>
            </div>

            <div className="case-detail-columns">
              <article>
                <span>{t.verifiedScope}</span>
                <ul>
                  {project.details.verified[language].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article>
                <span>{t.technicalChallenges}</span>
                <ol>
                  {project.details.challenges[language].map((item) => <li key={item}>{item}</li>)}
                </ol>
              </article>
              <article className="case-detail-boundaries">
                <span>{t.boundaries}</span>
                <ul>
                  {project.details.boundaries[language].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
          </section>
        )}
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
            <small>Full-Stack / Product Systems</small>
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
          <div><strong>6</strong><span>{t.products}</span></div>
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
                <div className="secondary-case__actions">
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
                <b><i />{t.inDevelopment}</b>
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
          <div><span>6</span><p>{language === "en" ? "Verified product case studies" : "دراسات حالة موثقة لمنتجات"}</p></div>
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
          <p>Ali Majed Dandash<br /><small>Full-Stack & Product Systems Engineer</small></p>
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
