"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";

type Language = "en" | "ar";
type Theme = "light" | "dark";
type Localized = { en: string; ar: string };
type LocalizedList = { en: string[]; ar: string[] };

type ProjectDetails = {
  status: Localized;
  role: Localized;
  audience: Localized;
  architecture: Localized;
  differentiator: Localized;
  verified: LocalizedList;
  security: LocalizedList;
  proof: LocalizedList;
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
  platforms: LocalizedList;
  languages: string[];
  dataStack: string[];
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
    platforms: { en: ["Web", "Android", "Windows"], ar: ["Web", "Android", "Windows"] },
    languages: ["Dart", "TypeScript", "SQL"],
    dataStack: ["Supabase PostgreSQL", "Supabase Auth", "Express API", "Audit log"],
    layers: ["Flutter", "Node.js", "Express", "PostgreSQL", "Supabase", "REST API"],
    icon: "/assets/phonexa/icon.png",
    screens: ["/assets/phonexa/screen-1.png", "/assets/phonexa/screen-2.png", "/assets/phonexa/screen-3.png"],
    live: "https://phonexa-web.onrender.com/app/",
    details: {
      status: {
        en: "Advanced MVP · functional published beta · actively evolving",
        ar: "MVP متقدم · نسخة تجريبية وظيفية منشورة · قيد التطوير",
      },
      role: {
        en: "Independently designed and built end to end: Flutter clients, TypeScript API, PostgreSQL model, operational workflows, security boundaries, testing, and deployment.",
        ar: "صممته وبنيته بشكل مستقل من البداية إلى النهاية: تطبيقات Flutter، وTypeScript API، ونموذج PostgreSQL، والمسارات التشغيلية، وحدود الأمان، والاختبارات، والنشر.",
      },
      audience: {
        en: "Phone and accessories retailers that also manage repairs, including store owners, cashiers, sales staff, and technicians.",
        ar: "متاجر الهواتف والملحقات التي تدير أيضًا خدمات الصيانة، بما يشمل أصحاب المتاجر وموظفي المبيعات والصندوق والفنيين.",
      },
      architecture: {
        en: "Flutter Web / Android / Windows → Dio with Supabase JWT → Express routes and Zod validation → application services and role checks → transactional PostgreSQL repositories → Supabase PostgreSQL.",
        ar: "Flutter للويب وAndroid وWindows ← Dio مع Supabase JWT ← مسارات Express وتحقق Zod ← خدمات التطبيق وفحص الأدوار ← مستودعات PostgreSQL ضمن معاملات ← Supabase PostgreSQL.",
      },
      differentiator: {
        en: "It unifies phone-specific POS, IMEI inventory, repairs, receivables, payables, and operational accounting while protecting stock and financial integrity on the server and database.",
        ar: "يجمع نقطة البيع ومخزون IMEI والصيانة والذمم والمحاسبة التشغيلية الخاصة بمتاجر الهواتف، مع حماية سلامة المخزون والمال داخل الخادم وقاعدة البيانات.",
      },
      verified: {
        en: [
          "Specialised POS with cash, credit, partial payment, instalments, currencies, tax, and discounts",
          "Quantity, IMEI, digital-service, damaged, and branch-scoped inventory",
          "Sales, purchases, returns, receivables, payables, expenses, shifts, and cash settlement",
          "Repair tickets with technicians, parts consumption, partial payments, and status history",
          "Executive reporting, debt ageing, activity, balances, and stock alerts",
          "Arabic and English interfaces across web, Android, and Windows",
        ],
        ar: [
          "نقطة بيع متخصصة للنقد والآجل والدفع الجزئي والأقساط والعملات والضريبة والخصومات",
          "مخزون بالكميات وIMEI والخدمات الرقمية والتالف والفروع",
          "مبيعات ومشتريات ومرتجعات وذمم ومصاريف وورديات وتسوية صندوق",
          "تذاكر صيانة وفنيون واستهلاك قطع ودفعات جزئية وسجل حالات",
          "تقارير تنفيذية وتقادم ديون ونشاط وأرصدة وتنبيهات مخزون",
          "واجهات عربية وإنجليزية على الويب وAndroid وWindows",
        ],
      },
      security: {
        en: [
          "Supabase JWT with server-side role enforcement and active-profile checks",
          "Organisation and branch scoping in repositories plus forced RLS on sensitive tables",
          "Helmet, explicit CORS origins, request limits, rate limiting, and redacted logs",
          "Transactional operations, idempotency keys, version checks, and audit records",
        ],
        ar: [
          "Supabase JWT مع تطبيق الأدوار على الخادم والتحقق من الملف الفعال",
          "عزل المؤسسة والفرع داخل الاستعلامات مع RLS إجباري للجداول الحساسة",
          "Helmet وقائمة CORS محددة وحدود للطلبات وrate limiting وسجلات منقحة",
          "معاملات ذرية ومفاتيح idempotency وفحص الإصدارات وسجلات تدقيق",
        ],
      },
      proof: {
        en: [
          "Live web build and healthy API / database readiness checks at audit time",
          "41 of 41 server tests and 2 of 2 Flutter tests passed at audit time",
          "Production dependency audit reported zero known vulnerabilities at audit time",
        ],
        ar: [
          "نسخة ويب حية وفحوص صحة API وقاعدة البيانات ناجحة وقت التدقيق",
          "نجاح 41 من 41 اختبار خادم و2 من 2 اختبار Flutter وقت التدقيق",
          "فحص مكتبات الإنتاج أعاد صفر ثغرات معروفة وقت التدقيق",
        ],
      },
      challenges: {
        en: [
          "Keeping stock, debt, payments, and accounting entries consistent by executing connected operations in PostgreSQL transactions with row locks and precise decimals.",
          "Preventing duplicate or conflicting mutations through request fingerprints, idempotency keys, optimistic versions, locks, and an ordered change log.",
          "Separating organisations, branches, and roles through scoped request context, repositories, forced RLS, and server-side access checks.",
        ],
        ar: [
          "الحفاظ على تطابق المخزون والذمم والدفعات والقيود عبر معاملات PostgreSQL وأقفال الصفوف والحسابات الدقيقة.",
          "منع العمليات المكررة أو المتعارضة عبر بصمة الطلب ومفاتيح idempotency والإصدارات والأقفال وسجل تغييرات مرتب.",
          "فصل المؤسسات والفروع والأدوار عبر سياق طلب محدد واستعلامات معزولة وRLS وفحص صلاحيات على الخادم.",
        ],
      },
      boundaries: {
        en: [
          "Fine-grained permissions are stored but authorization currently relies on the three implemented roles.",
          "The sync protocol exists on the server, but Flutter has no local database or outbox yet.",
          "Camera barcode scanning, thermal-printer integration, and real notifications are not implemented.",
          "A safe public demo account and sanitised portfolio screenshots are still required.",
        ],
        ar: [
          "الصلاحيات التفصيلية مخزنة، لكن التفويض يعتمد حاليًا على الأدوار الثلاثة المنفذة.",
          "بروتوكول المزامنة موجود في الخادم، لكن Flutter لا يملك قاعدة محلية أو Outbox بعد.",
          "مسح الباركود بالكاميرا وربط الطابعة الحرارية والإشعارات الفعلية غير منفذة.",
          "ما زال المشروع يحتاج حساب Demo عامًا وآمنًا ولقطات Portfolio منقحة.",
        ],
      },
    },
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
    platforms: { en: ["Android"], ar: ["Android"] },
    languages: ["Dart", "Kotlin"],
    dataStack: ["SharedPreferences", "Local JSON", "Device-local logs"],
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
      audience: {
        en: "Advanced Android users, multilingual communicators, support and sales professionals, translators, and freelancers who repeatedly move text between chats, translation, and AI tools.",
        ar: "مستخدمو Android المتقدمون، ومن يعملون بمحادثات متعددة اللغات، والدعم والمبيعات والمترجمون والمستقلون الذين ينقلون النصوص باستمرار بين المحادثات والترجمة وأدوات AI.",
      },
      architecture: {
        en: "Flutter UI → Riverpod controller → JSON configuration in SharedPreferences → MethodChannel → Kotlin OverlayService → ActionExecutor → AccessibilityService or app intents.",
        ar: "واجهة Flutter ← متحكم Riverpod ← إعدادات JSON في SharedPreferences ← MethodChannel ← خدمة Overlay بـKotlin ← منفّذ الأوامر ← AccessibilityService أو app intents.",
      },
      differentiator: {
        en: "Unlike a fixed shortcut, TapFlow combines an always-available overlay, configurable gestures, and a reusable workflow engine that can act across Android apps.",
        ar: "بخلاف الاختصار الثابت، يجمع TapFlow زرًا عائمًا دائمًا وإيماءات قابلة للتخصيص ومحرك مسارات قابلًا لإعادة الاستخدام يعمل بين تطبيقات Android.",
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
      security: {
        en: [
          "Accessibility and overlay access must be enabled explicitly by the user",
          "No hidden backend uploads; configuration, logs, and clipboard history remain device-local",
          "The overlay service does not start when overlay permission is absent",
        ],
        ar: [
          "يجب أن يفعّل المستخدم صلاحيات Accessibility والظهور فوق التطبيقات يدويًا",
          "لا يوجد رفع خفي إلى خادم؛ الإعدادات والسجلات وسجل الحافظة تبقى محلية",
          "لا تبدأ خدمة الزر العائم عند غياب صلاحية الظهور فوق التطبيقات",
        ],
      },
      proof: {
        en: [
          "Working Android builds exist for arm64, armeabi-v7a, and x86_64",
          "Static analysis reported no errors and four warnings at audit time",
          "The app was exercised as an advanced prototype on an Android device",
        ],
        ar: [
          "توجد نسخ Android مبنية لمعالجات arm64 وarmeabi-v7a وx86_64",
          "التحليل الساكن لم يُظهر أخطاء وسجل أربع ملاحظات وقت التدقيق",
          "تم تشغيل التطبيق كنموذج متقدم على جهاز Android",
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
    platforms: { en: ["Web", "Android", "Backend API"], ar: ["Web", "Android", "Backend API"] },
    languages: ["Dart", "JavaScript", "Java"],
    dataStack: ["MongoDB Atlas", "Express API", "SharedPreferences", "JWT"],
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
      audience: {
        en: "Grocery stores, small retailers, goods traders, and distributors that need fast sales, weight or quantity inventory, debts, expenses, and practical reports.",
        ar: "محال البقالة والمتاجر الصغيرة وتجار البضائع والموزعون الذين يحتاجون بيعًا سريعًا ومخزونًا بالوزن أو الكمية وديونًا ومصاريف وتقارير عملية.",
      },
      architecture: {
        en: "Flutter client → ApiClient and SessionStore → JWT-protected Express routes/controllers → owner-scoped Mongoose models → MongoDB Atlas, with local pull/push synchronisation through SharedPreferences.",
        ar: "تطبيق Flutter ← ApiClient وSessionStore ← مسارات ومتحكمات Express محمية بـJWT ← نماذج Mongoose معزولة حسب المالك ← MongoDB Atlas، مع مزامنة محلية pull/push عبر SharedPreferences.",
      },
      differentiator: {
        en: "It models the realities a generic POS or spreadsheet misses: weight-based billing, the same product at different prices in one invoice, debt tied to people and invoices, and damaged stock reflected in results.",
        ar: "ينمذج واقع البيع الذي لا يغطيه POS عام أو Excel: الحساب بالوزن، وبيع المنتج نفسه بأسعار مختلفة في فاتورة واحدة، وربط الدين بالشخص والفاتورة، واحتساب التالف ضمن النتائج.",
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
      security: {
        en: [
          "JWT bearer authentication and bcrypt password hashing",
          "Server-side owner and admin middleware with public registration disabled",
          "Every business record is scoped to its owner",
          "Helmet and controlled account blocking and deletion flows",
        ],
        ar: [
          "مصادقة JWT وتشفير كلمات المرور عبر bcrypt",
          "حماية owner وadmin على الخادم مع تعطيل التسجيل العام",
          "ربط كل سجل تجاري بمالكه لعزل البيانات",
          "Helmet ومسارات مضبوطة لحظر الحسابات وحذفها",
        ],
      },
      proof: {
        en: [
          "Sold to one grocery store and used in daily operations for two months",
          "Live web product and API health endpoint",
          "A lightweight Android APK build and more than 30 API endpoints",
        ],
        ar: [
          "تم بيعه لمحل بقالة واحد ويُستخدم في عملياته اليومية منذ شهرين",
          "نسخة ويب حية وAPI مع health endpoint",
          "نسخة Android APK مخففة وأكثر من 30 endpoint",
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
    platforms: { en: ["Web", "Android"], ar: ["Web", "Android"] },
    languages: ["Dart", "Kotlin"],
    dataStack: ["Cloud Firestore", "Firebase Auth", "Google Drive", "Google Sheets", "JSON backup"],
    layers: ["Flutter", "Firebase", "Firestore", "Google Drive", "OCR", "Analytics"],
    icon: "/assets/maliyati/icon.png",
    screens: ["/assets/maliyati/screen-1.png", "/assets/maliyati/screen-2.png", "/assets/maliyati/screen-3.png"],
    live: "https://maliyati-finance.onrender.com/",
    apk: true,
    details: {
      status: {
        en: "Functional release candidate / pilot · Web + Android",
        ar: "نسخة مرشحة للإطلاق / Pilot · Web + Android",
      },
      role: {
        en: "Independently designed and built end to end: Flutter product, financial data model, Firebase integration, analytics, cloud backup, OCR and smart input, plus native Android quick-entry tooling.",
        ar: "صممته وبنيته بشكل مستقل من البداية إلى النهاية: منتج Flutter، ونموذج البيانات المالية، وتكامل Firebase، والتحليلات، والنسخ السحابي، وOCR والإدخال الذكي، وأداة إدخال سريعة أصلية لنظام Android.",
      },
      audience: {
        en: "Individuals managing income, expenses, personal debts, receivables, and money across cash and digital wallets—especially when USD and LBP must be tracked together.",
        ar: "الأفراد الذين يديرون الدخل والمصاريف والديون والمستحقات والأموال بين النقد والمحافظ الرقمية، خصوصًا عند التعامل مع USD وLBP معًا.",
      },
      architecture: {
        en: "Flutter client → Firebase Auth → UID-scoped Cloud Firestore records and atomic settlement transactions, with analytics, Google Drive / Sheets backup and import, JSON portability, OCR-assisted input, and a native Kotlin quick-entry surface on Android.",
        ar: "تطبيق Flutter ← Firebase Auth ← سجلات Cloud Firestore معزولة حسب UID وتسويات ذرية، مع تحليلات ونسخ واستيراد عبر Google Drive وSheets ونقل JSON وإدخال بمساعدة OCR وواجهة Kotlin سريعة على Android.",
      },
      differentiator: {
        en: "It combines multi-wallet USD/LBP tracking with receivables, payables, partial settlements, analytics, smart import, OCR, and fast Android capture instead of treating personal finance as a simple expense list.",
        ar: "يجمع محافظ متعددة بعملتي USD وLBP مع المستحقات والديون والتسديد الجزئي والتحليلات والاستيراد الذكي وOCR والإدخال السريع على Android، بدل اختزال الإدارة المالية في قائمة مصروفات.",
      },
      verified: {
        en: [
          "Income, expenses, receivables, payables, debts, and linked payment histories",
          "Partial and full settlements protected through atomic Firestore operations",
          "My Wallet and Whish Money balances in USD and LBP",
          "Dashboard analytics, date filters, categories, charts, limits, and alerts",
          "Firebase authentication with data isolated per account",
          "Google Sheets, Google Drive, smart input, OCR, and native Android quick entry",
        ],
        ar: [
          "دخل ومصاريف ومستحقات وديون وسجلات دفعات مترابطة",
          "تسديد جزئي وكامل محمي عبر عمليات Firestore ذرية",
          "محافظ My Wallet وWhish Money بعملتي USD وLBP",
          "تحليلات وفلاتر زمنية وتصنيفات ورسوم وحدود وتنبيهات",
          "Firebase Auth مع عزل بيانات كل حساب",
          "Google Sheets وDrive وإدخال ذكي وOCR وإدخال Android سريع",
        ],
      },
      security: {
        en: [
          "Firebase authentication and per-account Firestore data isolation",
          "Atomic settlement operations reduce partial payment and balance-update failures",
          "Cloud backup remains tied to the authenticated financial account",
        ],
        ar: [
          "Firebase Auth مع عزل بيانات Firestore لكل حساب",
          "عمليات التسوية الذرية تقلل فقدان الدفعات أو فشل تحديث الرصيد",
          "النسخ الاحتياطي السحابي مرتبط بالحساب المالي المسجل",
        ],
      },
      proof: {
        en: [
          "Live web release returned HTTP 200 at audit time",
          "34 of 34 automated tests passed at audit time",
          "Android APK and AAB builds exist",
          "The audited project contained 44 Dart files, 23,334 lines, and 81 commits",
        ],
        ar: [
          "نسخة الويب الحية أعادت HTTP 200 وقت التدقيق",
          "نجاح 34 من 34 اختبارًا آليًا وقت التدقيق",
          "توجد نسختا Android APK وAAB",
          "احتوى المشروع المدقق على 44 ملف Dart و23,334 سطرًا و81 commit",
        ],
      },
      challenges: {
        en: [
          "Keeping debt settlements and wallet balances consistent by applying linked updates atomically in Firestore.",
          "Representing money across multiple wallets and two currencies without presenting it as a direct banking integration.",
          "Combining manual input, OCR, scripted actions, cloud import, and native Android quick entry into one transaction model.",
        ],
        ar: [
          "الحفاظ على تطابق تسويات الديون وأرصدة المحافظ عبر تحديثات مترابطة وذرية في Firestore.",
          "تمثيل الأموال عبر محافظ متعددة وعملتين من دون الادعاء بوجود تكامل مصرفي مباشر.",
          "توحيد الإدخال اليدوي وOCR والإجراءات البرمجية والاستيراد السحابي والإدخال السريع ضمن نموذج معاملات واحد.",
        ],
      },
      boundaries: {
        en: [
          "The audited build still had 42 analyzer notes, especially around asynchronous UI context.",
          "Administrator access is email-based and should move to Firebase Custom Claims.",
          "Firebase App Check and automated Firestore Rules tests are not implemented yet.",
          "A safe demo account, complete localisation, CI, Crashlytics, privacy policy, and public download page remain.",
        ],
        ar: [
          "تضمنت النسخة المدققة 42 ملاحظة Analyzer، خصوصًا حول سياق الواجهة غير المتزامن.",
          "صلاحية المدير مبنية على البريد ويجب نقلها إلى Firebase Custom Claims.",
          "Firebase App Check واختبارات Firestore Rules الآلية غير مطبقة بعد.",
          "ما زال المشروع يحتاج Demo آمنًا وتعريبًا مكتملًا وCI وCrashlytics وسياسة خصوصية وصفحة تحميل عامة.",
        ],
      },
    },
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
    platforms: { en: ["Android", "Backend API"], ar: ["Android", "Backend API"] },
    languages: ["Dart", "JavaScript", "Kotlin"],
    dataStack: ["Supabase PostgreSQL", "Supabase Storage", "Firebase Auth", "Local JSON demo"],
    layers: ["Flutter", "Node.js", "Express", "Supabase", "Firebase", "REST API"],
    icon: "/assets/matjari/icon.png",
    screens: ["/assets/matjari/screen-1.png", "/assets/matjari/screen-2.png", "/assets/matjari/screen-3.png"],
    apk: true,
    details: {
      status: {
        en: "Advanced demo / MVP · live backend · local release APK",
        ar: "Demo متقدم / MVP · Backend حي · APK محلي",
      },
      role: {
        en: "Independently designed and built end to end: Flutter storefront and administration, Express API, authentication and roles, Supabase-backed data and storage, Android APK handling, analytics, and deployment.",
        ar: "صممته وبنيته بشكل مستقل من البداية إلى النهاية: متجر Flutter ولوحة الإدارة، وExpress API، والمصادقة والأدوار، وبيانات وتخزين Supabase، ومعالجة APK على Android، والتحليلات، والنشر.",
      },
      audience: {
        en: "Small development teams, independent developers, and organisations that need a controlled private or experimental Android APK distribution channel.",
        ar: "فرق التطوير الصغيرة والمطورون المستقلون والجهات التي تحتاج قناة مضبوطة وخاصة أو تجريبية لتوزيع تطبيقات Android.",
      },
      architecture: {
        en: "Flutter storefront and admin → Firebase / Google sign-in or standard account flow → JWT-protected Express API with user/admin authorization → JSON demo or Supabase PostgreSQL and Storage. A Kotlin MethodChannel handles APK download, package inspection, installation, and installed-library synchronisation.",
        ar: "متجر Flutter ولوحة الإدارة ← تسجيل Firebase / Google أو الحساب العادي ← Express API محمي بـJWT مع صلاحيات مستخدم ومدير ← JSON للـDemo أو Supabase PostgreSQL وStorage. تتولى MethodChannel بـKotlin تنزيل APK وفحص الحزمة والتثبيت ومزامنة المكتبة.",
      },
      differentiator: {
        en: "It is more than an APK catalogue: it combines release history, forced updates, native package inspection, installation tracking, a user library, reviews, administration, and analytics in a compact private app store.",
        ar: "ليس مجرد كتالوج APK؛ بل يجمع سجل الإصدارات والتحديث الإجباري وفحص الحزم الأصلي وتتبع التثبيت ومكتبة المستخدم والمراجعات والإدارة والتحليلات ضمن متجر خاص مصغر.",
      },
      verified: {
        en: [
          "Flutter storefront with home, charts, search, library, profile, details, and reviews",
          "Native Android APK download, version inspection, installation, and app launch",
          "Administration for apps, assets, APK uploads, versions, and forced updates",
          "REST API for authentication, apps, downloads, library, reviews, categories, users, and analytics",
          "Google sign-in through Firebase alongside the standard account flow",
          "Supabase-backed application data and APK / image storage in the live environment",
          "User and admin roles with account blocking, deletion, editing, and promotion flows",
          "Live Render API using Supabase-backed data and storage",
        ],
        ar: [
          "متجر Flutter يضم الرئيسية والتحليلات والبحث والمكتبة والملف والتفاصيل والمراجعات",
          "تنزيل APK وفحص الإصدار والتثبيت وفتح التطبيق عبر Android الأصلي",
          "إدارة التطبيقات والملفات ورفع APK والإصدارات والتحديثات الإجبارية",
          "REST API للمصادقة والتطبيقات والتنزيلات والمكتبة والمراجعات والفئات والمستخدمين والتحليلات",
          "تسجيل الدخول عبر Google وFirebase إلى جانب الحساب العادي",
          "بيانات التطبيقات وتخزين APK والصور عبر Supabase في البيئة الحية",
          "أدوار مستخدم ومدير مع الحظر والحذف والتعديل والترقية",
          "API حي على Render يستخدم بيانات وتخزين Supabase",
        ],
      },
      security: {
        en: [
          "Firebase Authentication provides Google identity sign-in",
          "Expiring JWTs and bcrypt password hashing",
          "Express authorization middleware separates authenticated users and administrators",
          "Password hashes are omitted from responses and uploads are admin-protected",
          "The final administrator cannot be deleted through the normal flow",
        ],
        ar: [
          "Firebase Authentication يوفر تسجيل الهوية عبر Google",
          "JWT محدد الصلاحية وتشفير كلمات المرور عبر bcrypt",
          "Middleware التفويض في Express يفصل المستخدمين المسجلين عن المديرين",
          "إخفاء password hashes من الردود وحماية الرفع بصلاحية المدير",
          "منع حذف آخر مدير عبر المسار العادي",
        ],
      },
      proof: {
        en: [
          "Live Render API and health endpoint at audit time",
          "The public demo API reported 8 apps, 13 downloads, 21 installs, and 3 reviews at audit time",
          "A local Android release APK exists",
          "These API counts are demo activity, not verified customer or user metrics",
        ],
        ar: [
          "API حي وhealth endpoint على Render وقت التدقيق",
          "أظهر Demo API العام 8 تطبيقات و13 تنزيلًا و21 تثبيتًا و3 مراجعات وقت التدقيق",
          "توجد نسخة Android APK محلية",
          "هذه أرقام نشاط Demo وليست أعداد عملاء أو مستخدمين حقيقيين مثبتة",
        ],
      },
      challenges: {
        en: [
          "Bridging Flutter with native Android APK download, package inspection, installation, and launch through a Kotlin MethodChannel.",
          "Managing release history and forced updates by comparing stored version codes with the installed build.",
          "Supporting both local JSON demo operation and Supabase-backed production data and file storage.",
        ],
        ar: [
          "ربط Flutter بتنزيل APK وفحص الحزمة والتثبيت والفتح عبر MethodChannel بـKotlin.",
          "إدارة سجل الإصدارات والتحديث الإجباري عبر مقارنة version codes بالإصدار المثبت.",
          "دعم تشغيل Demo محلي عبر JSON وبيئة إنتاج تستخدم Supabase للبيانات والملفات.",
        ],
      },
      boundaries: {
        en: [
          "There is no public web storefront or public APK download link yet.",
          "A safe public demo account and documented successful test suite are still missing.",
          "CORS, cleartext traffic, Android package-query permission, and missing rate limiting need hardening.",
          "Privacy terms, CI/CD, and production release documentation remain before wider distribution.",
        ],
        ar: [
          "لا يوجد متجر ويب عام أو رابط تحميل APK عام حتى الآن.",
          "لا يزال حساب Demo العام والآمن وتوثيق نجاح الاختبارات غير موجودين.",
          "تحتاج CORS وcleartext traffic وصلاحية استعلام الحزم وغياب rate limiting إلى تقوية.",
          "تبقى سياسة الخصوصية وCI/CD وتوثيق الإصدار الرسمي قبل توزيع أوسع.",
        ],
      },
    },
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
    platforms: { en: ["Web", "Android", "Windows (configured)"], ar: ["Web", "Android", "Windows (مهيأ)"] },
    languages: ["Dart"],
    dataStack: ["Hive", "Cloud Firestore", "SharedPreferences", "JSON backup", "Firebase Auth"],
    layers: ["Flutter", "Riverpod", "Hive", "Firebase Auth", "Firestore", "Google Sign-In"],
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
      audience: {
        en: "People managing many digital subscriptions, freelancers and small teams tracking service costs, and operators handling multiple customer accounts and renewals.",
        ar: "الأشخاص الذين يديرون اشتراكات رقمية كثيرة، والمستقلون والفرق الصغيرة التي تتابع تكاليف الخدمات، ومن يديرون عدة حسابات وتجديدات للعملاء.",
      },
      architecture: {
        en: "Flutter UI → Riverpod providers → SubscriptionRepository → Hive local database and SharedPreferences settings → FirebaseSyncService → Firebase Auth / Google Sign-In → Cloud Firestore users/{uid}/subscriptions/{id}, with portable JSON backup and restore.",
        ar: "واجهة Flutter ← Riverpod providers ← SubscriptionRepository ← قاعدة Hive محلية وإعدادات SharedPreferences ← FirebaseSyncService ← Firebase Auth / Google Sign‑In ← Cloud Firestore ضمن users/{uid}/subscriptions/{id}، مع نسخ واستعادة JSON.",
      },
      differentiator: {
        en: "It manages the operational account behind each subscription—not only a recurring cost—including credentials, multiple accounts per service, renewal urgency, pending payment, sharing, and direct service access.",
        ar: "يدير الحساب التشغيلي خلف كل اشتراك، لا مجرد تكلفة متكررة، بما يشمل بيانات الدخول وعدة حسابات لكل خدمة والاستعجال والمدفوعات المعلقة والمشاركة والوصول المباشر.",
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
      security: {
        en: [
          "Firebase authentication with per-user Firestore paths",
          "Local-first records are scoped to the signed-in user before cloud synchronisation",
          "Sensitive public repository links are withheld until personal logs and screenshots are sanitised",
        ],
        ar: [
          "Firebase Auth مع مسارات Firestore منفصلة لكل مستخدم",
          "السجلات المحلية مرتبطة بالمستخدم المسجل قبل مزامنتها سحابيًا",
          "رابط المستودع العام محجوب حتى تنظيف السجلات والصور من البيانات الشخصية",
        ],
      },
      proof: {
        en: [
          "Functional Android and web beta with a live Render deployment",
          "Nine feature screens documented in the audited build",
          "Static analysis passed and four automated tests passed at audit time",
        ],
        ar: [
          "نسخة Beta وظيفية على Android والويب مع نشر حي على Render",
          "تسع شاشات ميزات موثقة في النسخة المدققة",
          "نجاح التحليل الساكن وأربعة اختبارات آلية وقت التدقيق",
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
    eyebrow: "FULL-STACK PRODUCT ENGINEER",
    heroLead: "I engineer the",
    heroAccent: "whole product.",
    heroBody:
      "I independently design and build complete products—from business rules, secure APIs, and data models to web, mobile, operations, and deployment.",
    explore: "Explore selected systems",
    contact: "Start a conversation",
    downloadCV: "Download CV",
    clientProducts: "Client products",
    products: "Featured systems",
    subscribers: "Active subscribers",
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
    platforms: "Platforms",
    languages: "Programming languages",
    dataBackend: "Data & backend",
    openCase: "Open case file",
    live: "Open live product",
    demo: "Demo ready",
    apk: "APK build",
    status: "Current status",
    role: "My role",
    audience: "Who it is for",
    architectureFlow: "Architecture flow",
    differentiator: "Why it stands apart",
    verifiedScope: "Verified in the build",
    security: "Security & access",
    proof: "Evidence",
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
    progressTitle: "One regional map system is now in motion.",
    inDevelopment: "80% · IN DEVELOPMENT",
    profileEyebrow: "PROFILE",
    profileTitle: "Built through years of solving real problems.",
    profileBody:
      "I am a full-stack product engineer with commercial delivery and real operations experience. I lead the Flutter frontend of Zouzou for a freelance client, built and sold Daftr for daily grocery-store use, and operate an independent internet service supporting approximately 300 active subscribers.",
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
    downloadCV: "تحميل السيرة الذاتية",
    clientProducts: "منتجات لعملاء",
    products: "أنظمة معروضة",
    subscribers: "مشترك فعّال",
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
    platforms: "المنصات",
    languages: "لغات البرمجة",
    dataBackend: "البيانات والـBackend",
    openCase: "افتح ملف المشروع",
    live: "افتح المنتج الحي",
    demo: "حساب Demo جاهز",
    apk: "نسخة APK",
    status: "الحالة الحالية",
    role: "دوري",
    audience: "لمن صُمم",
    architectureFlow: "تدفق المعمارية",
    differentiator: "ما الذي يميزه",
    verifiedScope: "الموجود فعليًا",
    security: "الأمان والصلاحيات",
    proof: "أدلة قابلة للإثبات",
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
    progressTitle: "نظام خريطة واحد للمنطقة أصبح قيد التنفيذ.",
    inDevelopment: "80% · قيد التطوير",
    profileEyebrow: "الملف المهني",
    profileTitle: "خبرة بُنيت عبر سنوات من حل مشكلات حقيقية.",
    profileBody:
      "أنا مهندس Full-Stack ومنتجات بخبرة في التسليم التجاري والتشغيل الفعلي. أقود تطوير واجهة Flutter لتطبيق Zouzou لعميل مستقل، وبنيت وبعت Daftr ليُستخدم يوميًا في متجر بقالة، وأدير خدمة إنترنت مستقلة تدعم نحو 300 مشترك فعّال.",
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
      name: "AreaMap",
      type: "Interactive regional operations map",
      text: "A focused map-based site for the area I am actively working on, designed to show zones, coverage, local activity, and operational progress in one clear view.",
      progress: 40,
      progressLabel: "40% · IN DEVELOPMENT",
    },
  ],
  ar: [
    {
      name: "AreaMap",
      type: "خريطة تفاعلية للمنطقة",
      text: "موقع مبني حول خريطة للمنطقة التي أعمل عليها حالياً، يعرض المناطق والتغطية والنشاط المحلي وتقدم العمل ضمن واجهة واحدة واضحة.",
      progress: 40,
      progressLabel: "40% · قيد التطوير",
    },
  ],
};

const IconArrow = () => <span aria-hidden="true" className="icon-arrow">→</span>;
const IconExternal = () => <span aria-hidden="true" className="icon-external">↗</span>;

function getSiteOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return "https://ali-dandash-portfolio.onrender.com";
}

function getProjectShareUrl(project: Project) {
  return `${getSiteOrigin()}/#case-${project.id}`;
}

function getWhatsAppUrl(message: string) {
  return `https://wa.me/96176652276?text=${encodeURIComponent(message)}`;
}

function getCaseMessage(project: Project, language: Language) {
  const headline = pick(language, project.headline);
  const intro = language === "en"
    ? `Hi Ali, I want to discuss this portfolio case: ${project.name} — ${headline}`
    : `مرحبا علي، بدي ناقش معك مشروع من البورتفوليو: ${project.name} — ${headline}`;

  return `${intro}\n${getProjectShareUrl(project)}`;
}

function getContactMessage(language: Language) {
  return language === "en"
    ? `Hi Ali, I saw your portfolio and want to talk about an opportunity.\n${getSiteOrigin()}/`
    : `مرحبا علي، شفت البورتفوليو وبدي أحكي معك عن فرصة.\n${getSiteOrigin()}/`;
}

function uniqueItems(items: string[]) {
  return Array.from(new Set(items));
}

function ProjectMeta({
  project,
  language,
  platformsLabel,
  buildStackLabel,
}: {
  project: Project;
  language: Language;
  platformsLabel: string;
  buildStackLabel: string;
}) {
  const buildStack = uniqueItems([...project.languages, ...project.dataStack]);

  return (
    <div className="project-meta">
      <div className="project-meta__group">
        <span>{platformsLabel}</span>
        <div>
          {project.platforms[language].map((platform) => <b key={platform}>{platform}</b>)}
        </div>
      </div>
      <div className="project-meta__group project-meta__group--wide">
        <span>{buildStackLabel}</span>
        <div>
          {buildStack.slice(0, 5).map((technology) => <b key={technology}>{technology}</b>)}
        </div>
      </div>
    </div>
  );
}

function TrustRail({ language }: { language: Language }) {
  const items = language === "en"
    ? [
        ["01", "Case studies show evidence, scope, security, and current boundaries."],
        ["02", "Commercial work includes client products and daily-use business software."],
        ["03", "Every product is framed by real workflow, data, delivery, and operations."],
      ]
    : [
        ["01", "دراسات الحالة تعرض الدليل والنطاق والأمان والحدود الحالية."],
        ["02", "العمل التجاري يشمل منتجات لعملاء وبرمجيات مستخدمة يومياً."],
        ["03", "كل منتج معروض من خلال العمل الحقيقي والبيانات والتشغيل."],
      ];

  return (
    <div className="trust-strip" aria-label={language === "en" ? "Portfolio credibility" : "مصداقية البورتفوليو"}>
      {items.map(([number, text]) => (
        <div key={number}>
          <span>{number}</span>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

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
    window.addEventListener("keydown", handleKey);
    return () => {
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

            <ProjectMeta
              project={project}
              language={language}
              platformsLabel={t.platforms}
              buildStackLabel={language === "en" ? "Build stack" : "حزمة البناء"}
            />

            <div className="case-actions">
              {project.live && (
                <a className="button button--primary" href={project.live} target="_blank" rel="noreferrer">
                  {t.live}<IconExternal />
                </a>
              )}
              <a
                className="button button--ghost"
                href={getWhatsAppUrl(getCaseMessage(project, language))}
                target="_blank"
                rel="noreferrer"
              >
                {t.whatsapp}<IconExternal />
              </a>
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
                <span>{t.audience}</span>
                <p>{pick(language, project.details.audience)}</p>
              </article>
            </div>

            <div className="case-detail-pair">
              <article>
                <span>{t.architectureFlow}</span>
                <p className="architecture-flow">{pick(language, project.details.architecture)}</p>
              </article>
              <article>
                <span>{t.differentiator}</span>
                <p>{pick(language, project.details.differentiator)}</p>
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
                <span>{t.security}</span>
                <ul>
                  {project.details.security[language].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article>
                <span>{t.proof}</span>
                <ul>
                  {project.details.proof[language].map((item) => <li key={item}>{item}</li>)}
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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
  });
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const t = copy[language];
  const rtl = language === "ar";
  const primaryProjects = projects.slice(0, 3);
  const secondaryProjects = projects.slice(3);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }, [language, rtl]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const openProjectFromHash = () => {
      const projectId = window.location.hash.replace("#case-", "");
      const project = projects.find((item) => item.id === projectId);
      if (project) setActiveProject(project);
    };

    openProjectFromHash();
    window.addEventListener("hashchange", openProjectFromHash);
    return () => window.removeEventListener("hashchange", openProjectFromHash);
  }, []);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
    if (window.location.hash.startsWith("#case-")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <main className={rtl ? "portfolio rtl" : "portfolio"} data-theme={theme}>
      <div className="animated-wallpaper" aria-hidden="true">
        <span className="wallpaper-panel wallpaper-panel--one" />
        <span className="wallpaper-panel wallpaper-panel--two" />
        <span className="wallpaper-panel wallpaper-panel--three" />
        <span className="chrome-ribbon chrome-ribbon--one" />
        <span className="chrome-ribbon chrome-ribbon--two" />
      </div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Ali Dandash home">
          <span className="brand-mark">AD</span>
          <span className="brand-copy">
            <b>Ali Dandash</b>
            <small>Full-Stack Product Engineer</small>
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
          <button
            className="theme-button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            <span aria-hidden="true" />
            {theme === "dark" ? "Light" : "Dark"}
          </button>
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
            <a
              className="button button--ghost button--large"
              href="/downloads/Ali_Majed_Dandash_Full_Stack_CV.pdf"
              download
            >
              {t.downloadCV}
            </a>
          </div>
          <div className="hero-links">
            <a href="https://github.com/ali970x" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ali-majed-dandash-37a446255/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
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
          <div><strong>2</strong><span>{t.clientProducts}</span></div>
          <div><strong>6</strong><span>{t.products}</span></div>
          <div><strong>300</strong><span>{t.subscribers}</span></div>
        </div>
      </section>

      <section className="proof-rail">
        <span>{t.proof}</span>
        <p>{t.proofLine}</p>
      </section>

      <TrustRail language={language} />

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

                <ProjectMeta
                  project={project}
                  language={language}
                  platformsLabel={t.platforms}
                  buildStackLabel={language === "en" ? "Build stack" : "حزمة البناء"}
                />

                <div className="case-row__actions">
                  <a className="text-button" href={`#case-${project.id}`} onClick={() => openProject(project)}>
                    {t.openCase}<IconArrow />
                  </a>
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
                <ProjectMeta
                  project={project}
                  language={language}
                  platformsLabel={t.platforms}
                  buildStackLabel={language === "en" ? "Build stack" : "حزمة البناء"}
                />
                <div className="secondary-case__actions">
                  <a className="text-button" href={`#case-${project.id}`} onClick={() => openProject(project)}>
                    {t.openCase}<IconArrow />
                  </a>
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
                <b><i />{project.progressLabel}</b>
              </div>
              <h3>{project.name}</h3>
              <h4>{project.type}</h4>
              <p>{project.text}</p>
              <div className="progress-track" aria-label={project.progressLabel}>
                <span style={{ width: `${project.progress}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section profile-section" id="profile">
        <div className="profile-mark profile-photo-mark">
          <img src="/assets/portrait/ali-dandash.png" alt="Ali Majed Dandash" width={420} height={420} />
        </div>
        <div className="profile-copy">
          <span className="eyebrow">{t.profileEyebrow}</span>
          <h2>{t.profileTitle}</h2>
          <p>{t.profileBody}</p>
          <blockquote>{t.profileQuote}</blockquote>
        </div>
        <div className="profile-timeline">
          <div><span>M1</span><p>{language === "en" ? "Computer Science — Artificial Intelligence, completed in 2022" : "علوم حاسوب — ذكاء اصطناعي، مكتملة عام 2022"}</p></div>
          <div><span>2</span><p>{language === "en" ? "Commercial client products: Zouzou and Daftr" : "منتجان تجاريان لعملاء: Zouzou وDaftr"}</p></div>
          <div><span>300</span><p>{language === "en" ? "Active subscribers supported through independent network operations" : "مشترك فعّال تدعمهم عمليات شبكة مستقلة"}</p></div>
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
          <a className="button button--light button--large" href="mailto:alimjdandash@gmail.com">
            {t.email}<IconArrow />
          </a>
          <a
            className="button button--outline-light button--large"
            href={getWhatsAppUrl(getContactMessage(language))}
            target="_blank"
            rel="noreferrer"
          >
            {t.whatsapp}
          </a>
          <a
            className="button button--outline-light button--large"
            href="/downloads/Ali_Majed_Dandash_Full_Stack_CV.pdf"
            download
          >
            {t.downloadCV}
          </a>
          <span>{t.location}</span>
        </div>
      </section>

      <footer>
        <div>
          <span className="brand-mark">AD</span>
          <p>Ali Majed Dandash<br /><small>Full-Stack Product Engineer</small></p>
        </div>
        <div className="footer-links">
          <a href="https://github.com/ali970x" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/ali-majed-dandash-37a446255/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:alimjdandash@gmail.com">Email</a>
        </div>
        <span>© 2026 / BEIRUT</span>
      </footer>

      {activeProject && (
        <CaseModal
          project={activeProject}
          language={language}
          onClose={closeProject}
        />
      )}
    </main>
  );
}
