export type Locale = 'en' | 'my' | 'th'

export const LOCALES: { code: Locale; label: string; native: string; short: string; intl: string }[] = [
  { code: 'en', label: 'English', native: 'English', short: 'EN', intl: 'en-US' },
  { code: 'my', label: 'Myanmar', native: 'မြန်မာ', short: 'MM', intl: 'my-MM' },
  { code: 'th', label: 'Thai', native: 'ไทย', short: 'TH', intl: 'th-TH' },
]

export type Tri = [string, string, string]

export const LOCALE_INDEX: Record<Locale, number> = { en: 0, my: 1, th: 2 }

/** Every string in the product surface. [English, Myanmar, Thai] */
export const dict: Record<string, Tri> = {
  // ---------------------------------------------------------------- identity
  'brand.name': ['Moe Kyaw Aung', 'မိုးကျော်အောင်', 'โม จอ ออง'],
  'brand.role': [
    'Senior Mobile / Android Engineer',
    'အဆင့်မြင့် Mobile / Android အင်ဂျင်နီယာ',
    'วิศวกร Mobile / Android ระดับซีเนียร์',
  ],
  'brand.location': [
    'Tachileik, Myanmar · Remote-first',
    'တာချီလိတ်၊ မြန်မာ · အဝေးမှအလုပ်အကိုင်',
    'ท่าขี้เหล็ก เมียนมา · ทำงานรีโมต',
  ],
  'brand.tagline': [
    'Android engineering with architecture discipline.',
    'ဗိသုကာစည်းကမ်းရှိသော Android အင်ဂျင်နီယာလုပ်ငန်း။',
    'วิศวกรรม Android ที่มีวินัยด้านสถาปัตยกรรม',
  ],

  // ---------------------------------------------------------------- nav groups
  'nav.work': ['Work', 'လုပ်ငန်းများ', 'ผลงาน'],
  'nav.expertise': ['Expertise', 'ကျွမ်းကျင်မှု', 'ความเชี่ยวชาญ'],
  'nav.profile': ['Profile', 'ကိုယ်ရေးအချက်အလက်', 'โปรไฟล์'],
  'nav.insights': ['Insights', 'အမြင်များ', 'อินไซต์'],
  'nav.engage': ['Engage', 'ပူးပေါင်းရန်', 'ร่วมงาน'],

  // ---------------------------------------------------------------- pages
  'page.home': ['Home', 'မူလစာမျက်နှာ', 'หน้าแรก'],
  'page.about': ['About', 'အကြောင်း', 'เกี่ยวกับ'],
  'page.resume': ['Resume', 'ကိုယ်ရေးမှတ်တမ်း', 'เรซูเม่'],
  'page.skills': ['Skills', 'ကျွမ်းကျင်မှုများ', 'ทักษะ'],
  'page.stack': ['Tech Stack', 'နည်းပညာစုစည်းမှု', 'เทคสแตก'],
  'page.projects': ['Projects', 'ပရောဂျက်များ', 'โปรเจกต์'],
  'page.caseStudies': ['Case Studies', 'ဖြစ်ရပ်လေ့လာချက်များ', 'กรณีศึกษา'],
  'page.systemDesign': ['System Design', 'စနစ်ဒီဇိုင်း', 'การออกแบบระบบ'],
  'page.architecture': ['Android Architecture', 'Android ဗိသုကာ', 'สถาปัตยกรรม Android'],
  'page.performance': ['Performance', 'စွမ်းဆောင်ရည်', 'ประสิทธิภาพ'],
  'page.openSource': ['Open Source', 'Open Source', 'โอเพนซอร์ส'],
  'page.github': ['GitHub Activity', 'GitHub လှုပ်ရှားမှု', 'กิจกรรม GitHub'],
  'page.testimonials': ['Testimonials', 'အသိအမှတ်ပြုစကားများ', 'คำรับรอง'],
  'page.experience': ['Experience', 'အလုပ်အတွေ့အကြုံ', 'ประสบการณ์'],
  'page.services': ['Services', 'ဝန်ဆောင်မှုများ', 'บริการ'],
  'page.contact': ['Contact', 'ဆက်သွယ်ရန်', 'ติดต่อ'],
  'page.writing': ['Writing', 'ဆောင်းပါးများ', 'บทความ'],
  'page.talks': ['Talks', 'ဟောပြောပွဲများ', 'การบรรยาย'],
  'page.mentorship': ['Mentorship', 'လမ်းညွှန်ပေးခြင်း', 'การเป็นเมนเทอร์'],
  'page.awards': ['Awards', 'ဆုများ', 'รางวัล'],
  'page.labs': ['Labs', 'စမ်းသပ်ခန်း', 'แล็บ'],
  'page.designSystem': ['Design System', 'ဒီဇိုင်းစနစ်', 'ดีไซน์ซิสเต็ม'],
  'page.accessibility': ['Accessibility', 'အားလုံးအသုံးပြုနိုင်မှု', 'การเข้าถึง'],
  'page.localization': ['Localization', 'ဒေသဆိုင်ရာလိုက်လျောညီထွေမှု', 'การรองรับหลายภาษา'],
  'page.pricing': ['Pricing', 'ဈေးနှုန်း', 'ราคา'],
  'page.faq': ['FAQ', 'မေးလေ့ရှိသောမေးခွန်းများ', 'คำถามที่พบบ่อย'],
  'page.legal': ['Legal', 'ဥပဒေဆိုင်ရာ', 'ข้อกฎหมาย'],
  'page.notFound': ['Page not found', 'စာမျက်နှာ မတွေ့ပါ', 'ไม่พบหน้านี้'],

  // ---------------------------------------------------------------- ui
  'ui.language': ['Language', 'ဘာသာစကား', 'ภาษา'],
  'ui.currency': ['Currency', 'ငွေကြေး', 'สกุลเงิน'],
  'ui.menu': ['Menu', 'မီနူး', 'เมนู'],
  'ui.close': ['Close', 'ပိတ်ရန်', 'ปิด'],
  'ui.quickLinks': ['Quick links', 'အမြန်လင့်များ', 'ลิงก์ด่วน'],
  'ui.contactDetails': ['Contact', 'ဆက်သွယ်ရန်', 'ติดต่อ'],
  'ui.skipToContent': ['Skip to content', 'အကြောင်းအရာသို့ ကျော်သွားရန်', 'ข้ามไปยังเนื้อหา'],
  'ui.scroll': ['Scroll', 'အောက်သို့ဆွဲပါ', 'เลื่อนลง'],
  'ui.rights': ['All rights reserved.', 'မူပိုင်ခွင့်အားလုံး လက်ဝယ်ရှိသည်။', 'สงวนลิขสิทธิ์'],
  'ui.builtWith': [
    'Designed & engineered in Kotlin-grade detail.',
    'Kotlin အဆင့် အသေးစိတ်ဖြင့် ဒီဇိုင်းနှင့် တည်ဆောက်ထားသည်။',
    'ออกแบบและพัฒนาด้วยรายละเอียดระดับ Kotlin',
  ],
  'ui.updated': ['Updated', 'နောက်ဆုံးပြင်ဆင်', 'อัปเดต'],
  'ui.minRead': ['min read', 'မိနစ် ဖတ်ရန်', 'นาทีอ่าน'],
  'ui.all': ['All', 'အားလုံး', 'ทั้งหมด'],
  'ui.overview': ['Overview', 'အကျဉ်းချုပ်', 'ภาพรวม'],
  'ui.role': ['Role', 'တာဝန်', 'บทบาท'],
  'ui.timeline': ['Timeline', 'အချိန်ကာလ', 'ระยะเวลา'],
  'ui.platform': ['Platform', 'ပလက်ဖောင်း', 'แพลตฟอร์ม'],
  'ui.team': ['Team', 'အဖွဲ့', 'ทีม'],
  'ui.impact': ['Impact', 'အကျိုးသက်ရောက်မှု', 'ผลลัพธ์'],
  'ui.challenge': ['The challenge', 'စိန်ခေါ်မှု', 'โจทย์'],
  'ui.approach': ['The approach', 'ချဉ်းကပ်ပုံ', 'แนวทาง'],
  'ui.outcome': ['The outcome', 'ရလဒ်', 'ผลลัพธ์'],
  'ui.stackUsed': ['Stack', 'အသုံးပြုနည်းပညာ', 'เทคโนโลยีที่ใช้'],
  'ui.nextProject': ['Next project', 'နောက်ပရောဂျက်', 'โปรเจกต์ถัดไป'],

  // ---------------------------------------------------------------- CTAs
  'cta.startProject': ['Start a project', 'ပရောဂျက်စတင်ရန်', 'เริ่มโปรเจกต์'],
  'cta.viewWork': ['View selected work', 'လုပ်ငန်းများကြည့်ရန်', 'ดูผลงานที่คัดสรร'],
  'cta.contact': ['Get in touch', 'ဆက်သွယ်ရန်', 'ติดต่อเรา'],
  'cta.downloadCv': ['Download CV', 'CV ဒေါင်းလုဒ်', 'ดาวน์โหลด CV'],
  'cta.printCv': ['Print / Save as PDF', 'ပရင့်ထုတ် / PDF သိမ်းရန်', 'พิมพ์ / บันทึกเป็น PDF'],
  'cta.readCase': ['Read case study', 'ဖြစ်ရပ်လေ့လာချက်ဖတ်ရန်', 'อ่านกรณีศึกษา'],
  'cta.viewProject': ['View project', 'ပရောဂျက်ကြည့်ရန်', 'ดูโปรเจกต์'],
  'cta.allProjects': ['All projects', 'ပရောဂျက်အားလုံး', 'โปรเจกต์ทั้งหมด'],
  'cta.bookCall': ['Book an intro call', 'မိတ်ဆက်ခေါ်ဆိုမှု ချိန်းရန်', 'นัดคุยเบื้องต้น'],
  'cta.seePricing': ['See pricing', 'ဈေးနှုန်းကြည့်ရန်', 'ดูราคา'],
  'cta.more': ['Learn more', 'ပိုမိုလေ့လာရန်', 'ดูเพิ่มเติม'],
  'cta.backHome': ['Back to home', 'မူလစာမျက်နှာသို့', 'กลับหน้าแรก'],

  // ---------------------------------------------------------------- availability
  'availability.badge': [
    'Available — Q3 2026 · 2 slots',
    'လက်ခံနေသည် — ၂၀၂၆ Q3 · နေရာ ၂ ခု',
    'ว่างรับงาน — Q3 2026 · 2 ที่',
  ],
  'availability.short': ['Available', 'လက်ခံနေသည်', 'ว่างรับงาน'],

  // ---------------------------------------------------------------- hero
  'hero.eyebrow': [
    'Senior Mobile / Android Engineer — 12 years shipping',
    'အဆင့်မြင့် Mobile / Android အင်ဂျင်နီယာ — ၁၂ နှစ်',
    'วิศวกร Mobile / Android ซีเนียร์ — 12 ปี',
  ],
  'hero.headline': [
    'I build premium Android experiences that stay fast, stable, and scalable.',
    'မြန်ဆန်၊ တည်ငြိမ်ပြီး ချဲ့ထွင်နိုင်သော premium Android အတွေ့အကြုံများကို ကျွန်ုပ် တည်ဆောက်ပေးပါသည်။',
    'ผมสร้างประสบการณ์ Android ระดับพรีเมียมที่เร็ว เสถียร และขยายต่อได้',
  ],
  'hero.sub': [
    'Senior Mobile/Android Developer focused on Kotlin, Jetpack Compose, architecture, performance, and production delivery. I turn complex product ideas into mobile systems teams can confidently ship, maintain, and evolve.',
    'Kotlin, Jetpack Compose, ဗိသုကာ၊ စွမ်းဆောင်ရည်နှင့် production ပို့ဆောင်မှုကို အာရုံစိုက်သည့် အဆင့်မြင့် Mobile/Android Developer ဖြစ်ပါသည်။ ရှုပ်ထွေးသော ထုတ်ကုန်အကြံဉာဏ်များကို အဖွဲ့များ ယုံကြည်စွာ ထုတ်လွှင့်၊ ထိန်းသိမ်း၊ တိုးတက်စေနိုင်သည့် mobile စနစ်များအဖြစ် ပြောင်းလဲပေးပါသည်။',
    'Senior Mobile/Android Developer ที่โฟกัส Kotlin, Jetpack Compose, สถาปัตยกรรม, ประสิทธิภาพ และการส่งมอบระดับโปรดักชัน ผมเปลี่ยนไอเดียผลิตภัณฑ์ที่ซับซ้อนให้เป็นระบบโมบายที่ทีมส่งมอบ ดูแล และต่อยอดได้อย่างมั่นใจ',
  ],
  'hero.card.title': ['Production signal', 'Production အချက်ပြ', 'สัญญาณโปรดักชัน'],
  'hero.card.sub': [
    'Live posture of the systems I own',
    'ကျွန်ုပ်တာဝန်ယူထားသော စနစ်များ၏ လက်ရှိအခြေအနေ',
    'สถานะระบบที่ผมดูแลอยู่',
  ],
  'hero.card.crash': ['Crash-free sessions', 'Crash မဖြစ်သည့် sessions', 'เซสชันไร้แครช'],
  'hero.card.startup': ['Cold start (p90)', 'Cold start (p90)', 'Cold start (p90)'],
  'hero.card.jank': ['Jank-free frames', 'Jank မရှိသော frames', 'เฟรมไม่กระตุก'],
  'hero.card.release': ['Release cadence', 'ဗားရှင်းထုတ်ချိန်', 'รอบปล่อยเวอร์ชัน'],
  'hero.card.weekly': ['Weekly', 'အပတ်စဉ်', 'รายสัปดาห์'],
  'hero.card.pillars': [
    'Production · Android · Kotlin · Jetpack Compose · Offline-first · CI/CD',
    'Production · Android · Kotlin · Jetpack Compose · Offline-first · CI/CD',
    'Production · Android · Kotlin · Jetpack Compose · Offline-first · CI/CD',
  ],

  // ---------------------------------------------------------------- trust strip
  'trust.title': ['Proof, not adjectives', 'စကားလုံးမဟုတ်ဘဲ သက်သေ', 'พิสูจน์ด้วยผลงาน ไม่ใช่คำโฆษณา'],
  'trust.1.k': ['12 years', '၁၂ နှစ်', '12 ปี'],
  'trust.1.v': ['shipping mobile products', 'mobile ထုတ်ကုန်များ ထုတ်လွှင့်ခဲ့', 'ส่งมอบผลิตภัณฑ์โมบาย'],
  'trust.2.k': ['Production Android', 'Production Android', 'Android โปรดักชัน'],
  'trust.2.v': ['at scale, in regulated domains', 'အကြီးစားနှင့် စည်းမျဉ်းတင်းကျပ်သောနယ်ပယ်များတွင်', 'ในระดับสเกลและอุตสาหกรรมที่มีกฎระเบียบ'],
  'trust.3.k': ['Architecture & performance', 'ဗိသုကာနှင့် စွမ်းဆောင်ရည်', 'สถาปัตยกรรมและประสิทธิภาพ'],
  'trust.3.v': ['as a first-class discipline', 'ကို အဓိကစည်းကမ်းအဖြစ် ကျင့်သုံး', 'เป็นวินัยหลักของงาน'],
  'trust.4.k': ['Cross-functional', 'ဌာနစုံပူးပေါင်း', 'ทำงานข้ามสายงาน'],
  'trust.4.v': ['collaboration with product & design', 'ထုတ်ကုန်နှင့် ဒီဇိုင်းအဖွဲ့များနှင့် ပူးပေါင်းဆောင်ရွက်', 'ร่วมกับทีมโปรดักต์และดีไซน์'],

  // ---------------------------------------------------------------- home sections
  'home.featured.eyebrow': ['Selected work', 'ရွေးချယ်ထားသောလုပ်ငန်း', 'ผลงานที่คัดสรร'],
  'home.featured.title': ['Three systems, built to last', 'ရေရှည်ခံရန် တည်ဆောက်ထားသော စနစ်သုံးခု', 'สามระบบที่สร้างมาเพื่ออยู่ยาว'],
  'home.featured.lead': [
    'Each one shipped to production, measured after launch, and still maintained by the teams that own them.',
    'တစ်ခုချင်းစီကို production သို့ ပို့ဆောင်ပြီး ထုတ်လွှင့်ပြီးနောက် တိုင်းတာကာ ယနေ့ထိ အဖွဲ့များက ဆက်လက်ထိန်းသိမ်းနေဆဲဖြစ်သည်။',
    'ทุกโปรเจกต์ถูกส่งขึ้นโปรดักชัน วัดผลหลังเปิดตัว และยังถูกดูแลต่อโดยทีมเจ้าของจนถึงวันนี้',
  ],
  'home.about.eyebrow': ['The short version', 'အတိုချုပ်', 'ฉบับย่อ'],
  'home.skills.eyebrow': ['Capability snapshot', 'စွမ်းရည်အနှစ်ချုပ်', 'ภาพรวมความสามารถ'],
  'home.skills.title': ['What I am accountable for', 'ကျွန်ုပ်တာဝန်ယူသည့်အရာများ', 'สิ่งที่ผมรับผิดชอบ'],
  'home.testimonial.eyebrow': ['Signals from teams', 'အဖွဲ့များထံမှ တုံ့ပြန်ချက်', 'เสียงจากทีม'],
  'home.testimonial.title': ['People who shipped with me', 'ကျွန်ုပ်နှင့်အတူ ထုတ်လွှင့်ခဲ့သူများ', 'คนที่เคยส่งงานร่วมกับผม'],
  'home.cta.title': [
    'Let us make your Android product feel inevitable.',
    'သင့် Android ထုတ်ကုန်ကို မဖြစ်မနေကောင်းမွန်အောင် အတူတည်ဆောက်ကြပါစို့။',
    'มาทำให้โปรดักต์ Android ของคุณรู้สึก “ต้องเป็นแบบนี้”',
  ],
  'home.cta.lead': [
    'Audit, architecture, rescue, or a full build — start with a 30-minute conversation about your constraints.',
    'စစ်ဆေးမှု၊ ဗိသုကာ၊ ကယ်တင်ရေး သို့မဟုတ် အပြည့်အဝတည်ဆောက်ခြင်း — သင့်အခက်အခဲများအကြောင်း မိနစ် ၃၀ စကားပြောခြင်းဖြင့် စတင်ပါ။',
    'ตรวจสอบระบบ วางสถาปัตยกรรม กู้โปรเจกต์ หรือสร้างใหม่ทั้งหมด — เริ่มด้วยการคุย 30 นาทีเรื่องข้อจำกัดของคุณ',
  ],

  // ---------------------------------------------------------------- about
  'about.lead': [
    'I am a senior mobile engineer who treats an Android app as a long-lived system, not a screen collection.',
    'ကျွန်ုပ်သည် Android app ကို screen စုစည်းမှုမဟုတ်ဘဲ ရေရှည်တည်တံ့သော စနစ်တစ်ခုအဖြစ် ရှုမြင်သည့် အဆင့်မြင့် mobile အင်ဂျင်နီယာဖြစ်ပါသည်။',
    'ผมคือวิศวกรโมบายระดับซีเนียร์ที่มองแอป Android เป็นระบบที่มีอายุยาว ไม่ใช่แค่กองหน้าจอ',
  ],
  'about.p1': [
    'Twelve years in, the work has stopped being about frameworks. It is about the decisions that survive: where state lives, what a module is allowed to know, how a release behaves on a three-year-old device with 2 GB of RAM and a network that disappears halfway through a payment.',
    '၁၂ နှစ်ကြာပြီးနောက် ဤအလုပ်သည် framework အကြောင်း မဟုတ်တော့ပါ။ ကျန်ရစ်နိုင်သော ဆုံးဖြတ်ချက်များအကြောင်းသာ ဖြစ်လာသည် — state ဘယ်မှာနေမလဲ၊ module တစ်ခုသည် ဘာကို သိခွင့်ရှိသလဲ၊ RAM 2GB ရှိသည့် သုံးနှစ်သားဖုန်းနှင့် ငွေပေးချေနေစဉ် ပြတ်တောက်သွားသော ကွန်ရက်ပေါ်တွင် release တစ်ခု မည်သို့လုပ်ဆောင်မလဲ ဆိုသည်များ ဖြစ်သည်။',
    'ผ่านมาสิบสองปี งานนี้ไม่ได้เกี่ยวกับเฟรมเวิร์กอีกต่อไป แต่เกี่ยวกับการตัดสินใจที่อยู่รอด: state อยู่ที่ไหน โมดูลรู้อะไรได้บ้าง และรีลีสจะทำงานอย่างไรบนเครื่องอายุสามปี RAM 2GB ที่เน็ตหายกลางคันการจ่ายเงิน',
  ],
  'about.p2': [
    'I work best when I am close to the product. I ask what the business actually needs before I choose a pattern, I prototype the risky part first, and I write the boring code that makes the interesting code safe. I like design partners who argue with me and QA engineers who break things early.',
    'ထုတ်ကုန်နှင့် နီးကပ်စွာ လုပ်ကိုင်ရသည်ကို ကျွန်ုပ် အကောင်းဆုံးလုပ်နိုင်သည်။ pattern မရွေးခင် လုပ်ငန်းလိုအပ်ချက်ကို အရင်မေးသည်၊ အန္တရာယ်အရှိဆုံးအပိုင်းကို အရင် prototype လုပ်သည်၊ စိတ်ဝင်စားဖွယ်ကုဒ်ကို လုံခြုံစေမည့် ငြီးငွေ့ဖွယ်ကုဒ်ကို ရေးသည်။ ကျွန်ုပ်နှင့် ငြင်းခုံသည့် ဒီဇိုင်နာများနှင့် စောစီးစွာ ချိုးဖျက်စမ်းသပ်သည့် QA များကို နှစ်သက်သည်။',
    'ผมทำงานได้ดีที่สุดเมื่ออยู่ใกล้ตัวโปรดักต์ ผมถามว่าธุรกิจต้องการอะไรจริง ๆ ก่อนเลือกแพตเทิร์น ทำต้นแบบส่วนที่เสี่ยงที่สุดก่อน และเขียนโค้ดน่าเบื่อที่ทำให้โค้ดน่าสนใจปลอดภัย ผมชอบดีไซเนอร์ที่เถียงกับผม และ QA ที่พังของได้ตั้งแต่เนิ่น ๆ',
  ],
  'about.p3': [
    'Outside delivery, I run E-4Skills — an engineering practice in Tachileik that has trained more than 180 engineers — maintain a few small Kotlin libraries, and speak about Compose performance. I live on the Myanmar–Thailand border and work with teams across both countries and remote Europe, which is why this site speaks three languages and three currencies.',
    'ပို့ဆောင်မှုအပြင် တာချီလိတ်တွင် E-4Skills ကို တည်ထောင်ထားပြီး အင်ဂျင်နီယာ ၁၈၀ ကျော်ကို သင်ကြားပေးခဲ့ပြီး၊ Kotlin library သေးသေးလေးများ ထိန်းသိမ်းကာ စွမ်းဆောင်ရည်အကြောင်း ဟောပြောပါသည်။ မြန်မာ–ထိုင်း နယ်စပ်တွင် နေထိုင်ပြီး နှစ်နိုင်ငံလုံးနှင့် ဥရောပအဝေးမှအဖွဲ့များနှင့် လုပ်ကိုင်သည် — ထို့ကြောင့် ဤဝဘ်ဆိုက်သည် ဘာသာစကားသုံးမျိုးနှင့် ငွေကြေးသုံးမျိုးကို ပြောဆိုသည်။',
    'นอกจากงานส่งมอบ ผมดูแล E-4Skills — สถาบันวิศวกรรมที่ท่าขี้เหล็กที่ฝึกอบรมวิศวกรมาแล้วกว่า 180 คน — ดูแลไลบรารี Kotlin เล็ก ๆ และบรรยายเรื่องประสิทธิภาพ Compose ผมอยู่ชายแดนเมียนมา–ไทย และทำงานกับทีมทั้งสองประเทศรวมถึงยุโรป — เว็บนี้จึงรองรับสามภาษาและสามสกุลเงิน',
  ],
  'about.principles': ['Operating principles', 'လုပ်ဆောင်မှုမူများ', 'หลักการทำงาน'],
  'about.offhours': ['Away from the IDE', 'IDE ပြင်ပတွင်', 'นอกเวลาหน้าจอ'],

  // ---------------------------------------------------------------- misc section labels
  'sec.metrics': ['Measured outcomes', 'တိုင်းတာထားသောရလဒ်များ', 'ผลลัพธ์ที่วัดได้'],
  'sec.highlights': ['Highlights', 'အဓိကအချက်များ', 'ไฮไลต์'],
  'sec.process': ['How we work', 'အလုပ်လုပ်ပုံ', 'วิธีทำงานร่วมกัน'],
  'sec.deliverables': ['Deliverables', 'ပေးအပ်မည့်အရာများ', 'สิ่งที่ส่งมอบ'],
  'sec.faqShort': ['Common questions', 'မေးလေ့ရှိသောမေးခွန်းများ', 'คำถามที่พบบ่อย'],

  // ---------------------------------------------------------------- pricing / services
  'pricing.lead': [
    'Transparent engagement pricing in the currency you budget in. Every engagement includes architecture notes, handover documentation, and a post-delivery support window.',
    'သင်ဘတ်ဂျက်ရေးဆွဲသည့် ငွေကြေးဖြင့် ပွင့်လင်းမြင်သာသော ဈေးနှုန်း။ ဝန်ဆောင်မှုတိုင်းတွင် ဗိသုကာမှတ်စုများ၊ လွှဲပြောင်းစာရွက်စာတမ်းများနှင့် ပို့ဆောင်ပြီးနောက် ပံ့ပိုးမှုကာလ ပါဝင်သည်။',
    'ราคาชัดเจนในสกุลเงินที่คุณตั้งงบ ทุกงานรวมเอกสารสถาปัตยกรรม เอกสารส่งมอบ และช่วงซัพพอร์ตหลังส่งมอบ',
  ],
  'pricing.switch': ['Show prices in', 'ဈေးနှုန်းပြရန်', 'แสดงราคาเป็น'],
  'pricing.from': ['from', 'စတင်', 'เริ่มต้น'],
  'pricing.perProject': ['per engagement', 'တစ်ကြိမ်လျှင်', 'ต่องาน'],
  'pricing.perMonth': ['per month', 'တစ်လလျှင်', 'ต่อเดือน'],
  'pricing.perDay': ['per day', 'တစ်ရက်လျှင်', 'ต่อวัน'],
  'pricing.popular': ['Most requested', 'အတောင်းဆိုဆုံး', 'ถูกเลือกมากที่สุด'],
  'pricing.includes': ['What is included', 'ပါဝင်သည့်အရာများ', 'สิ่งที่รวมอยู่'],
  'pricing.addons': ['Add-ons', 'ထပ်ဆောင်းဝန်ဆောင်မှုများ', 'บริการเสริม'],
  'pricing.note': [
    'MMK and THB amounts are indicative and fixed at contract signing. Invoices can be issued in USD, THB, or MMK.',
    'MMK နှင့် THB ပမာဏများသည် ခန့်မှန်းချက်ဖြစ်ပြီး စာချုပ်ချုပ်ဆိုချိန်တွင် အတည်ဖြစ်သည်။ ငွေတောင်းခံလွှာကို USD, THB သို့မဟုတ် MMK ဖြင့် ထုတ်ပေးနိုင်သည်။',
    'จำนวนเงิน MMK และ THB เป็นตัวเลขโดยประมาณ และจะตรึงราคาเมื่อเซ็นสัญญา ออกใบแจ้งหนี้ได้ทั้ง USD, THB หรือ MMK',
  ],

  // ---------------------------------------------------------------- contact
  'contact.lead': [
    'Tell me about the product, the constraint, and the deadline. I reply to every serious enquiry within one business day.',
    'ထုတ်ကုန်၊ အခက်အခဲနှင့် သတ်မှတ်ရက်အကြောင်း ပြောပြပါ။ လေးနက်သောစုံစမ်းမှုတိုင်းကို လုပ်ငန်းရက်တစ်ရက်အတွင်း ပြန်လည်ဖြေကြားပါသည်။',
    'เล่าให้ฟังเรื่องโปรดักต์ ข้อจำกัด และเดดไลน์ ผมตอบทุกคำถามที่จริงจังภายในหนึ่งวันทำการ',
  ],
  'contact.name': ['Your name', 'သင့်အမည်', 'ชื่อของคุณ'],
  'contact.email': ['Email', 'အီးမေးလ်', 'อีเมล'],
  'contact.company': ['Company / team', 'ကုမ္ပဏီ / အဖွဲ့', 'บริษัท / ทีม'],
  'contact.budget': ['Budget range', 'ဘတ်ဂျက်အတိုင်းအတာ', 'ช่วงงบประมาณ'],
  'contact.topic': ['What do you need?', 'ဘာလိုအပ်ပါသလဲ?', 'คุณต้องการอะไร'],
  'contact.message': ['Context', 'အသေးစိတ်', 'รายละเอียด'],
  'contact.messagePlaceholder': [
    'Platform, team size, current pain, target date…',
    'ပလက်ဖောင်း၊ အဖွဲ့အရွယ်အစား၊ လက်ရှိအခက်အခဲ၊ ရည်မှန်းရက်…',
    'แพลตฟอร์ม ขนาดทีม ปัญหาปัจจุบัน วันที่ต้องการ…',
  ],
  'contact.send': ['Send enquiry', 'စုံစမ်းမှုပို့ရန်', 'ส่งข้อความ'],
  'contact.sent': ['Message ready — thank you.', 'မက်ဆေ့ချ် အဆင်သင့် — ကျေးဇူးတင်ပါသည်။', 'ข้อความพร้อมส่ง — ขอบคุณครับ'],
  'contact.sentBody': [
    'Your enquiry has been captured. Your mail client will open with the details so nothing is lost in transit.',
    'သင့်စုံစမ်းမှုကို မှတ်တမ်းတင်ပြီးပါပြီ။ အသေးစိတ်များနှင့်အတူ သင့်မေးလ်ပရိုဂရမ် ပွင့်လာပါမည်။',
    'บันทึกคำถามของคุณแล้ว โปรแกรมอีเมลจะเปิดขึ้นพร้อมรายละเอียด เพื่อไม่ให้ข้อมูลตกหล่น',
  ],
  'contact.required': ['Please complete the required fields.', 'လိုအပ်သောအကွက်များ ဖြည့်ပါ။', 'กรุณากรอกข้อมูลที่จำเป็น'],
  'contact.channels': ['Direct channels', 'တိုက်ရိုက်ဆက်သွယ်ရန်', 'ช่องทางตรง'],
  'contact.responseTime': ['Response time', 'ပြန်ကြားချိန်', 'เวลาตอบกลับ'],
  'contact.timezone': ['Working hours', 'အလုပ်ချိန်', 'เวลาทำงาน'],

  // ---------------------------------------------------------------- footer
  'footer.tag': [
    'Premium Android engineering — architecture, performance, and production delivery.',
    'Premium Android အင်ဂျင်နီယာလုပ်ငန်း — ဗိသုကာ၊ စွမ်းဆောင်ရည်နှင့် production ပို့ဆောင်မှု။',
    'วิศวกรรม Android ระดับพรีเมียม — สถาปัตยกรรม ประสิทธิภาพ และการส่งมอบจริง',
  ],
  'footer.newsletter': ['Field notes, monthly', 'လစဉ် မှတ်စုများ', 'บันทึกภาคสนาม รายเดือน'],
  'footer.newsletterSub': [
    'One email a month on Compose performance, architecture, and release engineering.',
    'Compose စွမ်းဆောင်ရည်၊ ဗိသုကာနှင့် release engineering အကြောင်း တစ်လလျှင် အီးမေးလ်တစ်စောင်။',
    'อีเมลเดือนละฉบับ เรื่อง Compose performance สถาปัตยกรรม และ release engineering',
  ],
  'footer.subscribe': ['Subscribe', 'စာရင်းသွင်းရန်', 'สมัครรับ'],
  'footer.subscribed': ['You are on the list.', 'စာရင်းတွင် ပါဝင်ပြီးပါပြီ။', 'คุณอยู่ในรายชื่อแล้ว'],
}

export function translate(key: string, locale: Locale): string {
  const entry = dict[key]
  if (!entry) return key
  return entry[LOCALE_INDEX[locale]] || entry[0]
}

export type LocalizedText = string | Tri

export function pick(value: LocalizedText, locale: Locale): string {
  if (typeof value === 'string') return value
  return value[LOCALE_INDEX[locale]] || value[0]
}
