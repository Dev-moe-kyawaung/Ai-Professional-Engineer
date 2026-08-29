import type { LocalizedText } from './dict'

/* ------------------------------------------------------------------ profile */

export const profile = {
  name: 'Moe Kyaw Aung',
  nameUpper: 'MOE KYAW AUNG',
  initials: 'MK',
  title: 'Senior Mobile / Android Engineer',
  company: 'Microsoft',
  venture: 'E-4Skills',
  email: 'moekyawaung@fastmail.com',
  phone: '+95 9 666 000 050',
  phoneRaw: '+959666000050',
  location: 'Tachileik, Myanmar',
  avatar: '/avatar.jpg',
  gravatar: 'https://gravatar.com/moekyawaung2026',
  github: 'github.com/Moekyawaung',
  githubHandle: 'Moekyawaung',
  linkedin: 'linkedin.com/in/moe-kyaw-aung-2653093a1',
  bluesky: 'bsky.app/profile/moekyawaung96.bsky.social',
  blueskyHandle: '@moekyawaung96.bsky.social',
  tiktok: 'tiktok.com/@moelay262411',
  blog: 'valiantblaze20aa517f1a-xvtkh.wordpress.com',
  calendar: 'cal.com/moekyawaung/intro',
  timezone: 'MMT / UTC+6:30 — full overlap with ICT, SGT & GST',
  responseTime: 'Within 1 business day',
  years: '12',
}

/* ----------------------------------------------------------------- projects */

export type Metric = { label: string; value: string; note?: string }

export type Project = {
  slug: string
  name: string
  client: string
  year: string
  category: string
  accent: 'neon' | 'electric' | 'violet' | 'lime'
  featured: boolean
  tagline: LocalizedText
  summary: LocalizedText
  role: string
  platform: string
  team: string
  duration: string
  tags: string[]
  metrics: Metric[]
  challenge: string
  approach: { title: string; body: string }[]
  outcome: string[]
  stack: string[]
  screens: { title: string; body: string }[]
}

export const projects: Project[] = [
  {
    slug: 'border-pay',
    name: 'BorderPay',
    client: 'Cross-border remittance operator',
    year: '2023 — 2026',
    category: 'Fintech · Regulated',
    accent: 'neon',
    featured: true,
    tagline: [
      'Cross-border payments that settle even when the network does not',
      'ကွန်ရက်ပြတ်တောက်နေချိန်တွင်ပင် အောင်မြင်စွာ ငွေလွှဲနိုင်သော နယ်စပ်ဖြတ်ကျော် ငွေပေးချေမှုစနစ်',
      'การชำระเงินข้ามพรมแดนที่สำเร็จได้แม้เครือข่ายจะล่ม',
    ],
    summary: [
      'A three-currency remittance app for the Myanmar–Thailand corridor: MMK, THB and USD wallets, an offline-durable transfer ledger, hardware-backed key storage, and a weekly release train that has never rolled back.',
      'မြန်မာ–ထိုင်း လမ်းကြောင်းအတွက် ငွေကြေးသုံးမျိုးဖြင့် ငွေလွှဲသည့်အက်ပ် — MMK, THB, USD ပိုက်ဆံအိတ်များ၊ offline တွင်ပါ တည်တံ့သော ငွေလွှဲမှတ်တမ်း၊ hardware-backed key သိမ်းဆည်းမှုနှင့် တစ်ကြိမ်မျှ rollback မလုပ်ရဖူးသော အပတ်စဉ် release train ပါဝင်သည်။',
      'แอปโอนเงินสามสกุลสำหรับเส้นทางเมียนมา–ไทย: กระเป๋าเงิน MMK, THB และ USD, บัญชีธุรกรรมที่ทนต่อการออฟไลน์, การเก็บกุญแจด้วยฮาร์ดแวร์ และ release train รายสัปดาห์ที่ไม่เคยต้องย้อนกลับ',
    ],
    role: 'Lead Android Engineer / Architecture owner',
    platform: 'Android 8–16 · Wear OS companion',
    team: '9 engineers, 2 designers, 1 PM',
    duration: '30 months',
    tags: ['Kotlin', 'Jetpack Compose', 'Offline-first', 'Security', 'Multi-module'],
    metrics: [
      { label: 'Crash-free sessions', value: '99.96%', note: 'from 98.2%' },
      { label: 'Cold start p90', value: '1.1s', note: 'from 3.6s' },
      { label: 'APK size', value: '−38%', note: 'baseline profiles + R8' },
      { label: 'Release cadence', value: 'Weekly', note: 'from 6-weekly' },
    ],
    challenge:
      'The legacy app was a single Gradle module holding 310k lines of mixed Java and Kotlin, a hand-rolled navigation stack, and a six-week manual regression cycle. Traders and migrant workers along the Tachileik–Mae Sai border lost transfer state whenever the connection dropped mid-submission, and the compliance team could not evidence how sensitive data moved through the app.',
    approach: [
      {
        title: 'Strangler-fig modularisation',
        body: 'We drew the module boundary map before writing a line of code: :core (design system, network, storage), :feature:* (one per product surface) and :app as a thin composition root. Legacy screens stayed live behind a navigation façade while features migrated one at a time — no big-bang rewrite, no feature freeze, no roadmap pause.',
      },
      {
        title: 'Offline-durable money ledger',
        body: 'Room became the source of truth. Every money movement is written as an immutable intent with an idempotency key, queued through WorkManager and reconciled against the server ledger on reconnect. The UI renders optimistic state with an explicit "pending settlement" affordance rather than pretending the network exists.',
      },
      {
        title: 'Three currencies, one correct model',
        body: 'MMK, THB and USD are modelled as allocation-safe integer minor units with per-currency rounding rules — never floating point. FX quotes are time-boxed, signed and shown with an explicit expiry countdown, so nobody ever settles against a stale rate.',
      },
      {
        title: 'A release train that never blocks',
        body: 'Trunk-based development with feature flags, 2,800 unit tests, 180 Compose UI tests, macrobenchmark gates on startup and scroll, and a staged rollout with automated halt on crash-rate regression. Any engineer on the team can cut a release on any afternoon.',
      },
    ],
    outcome: [
      'Weekly production releases with automated rollback — median time from merge to 10% rollout is four hours.',
      'Transfer abandonment in low-connectivity border regions dropped 27% after the offline ledger shipped.',
      'Regression suite runtime cut from six weeks of manual testing to 22 minutes on CI.',
      'New engineers ship to production in their first week; module ownership is documented and enforced by Gradle.',
    ],
    stack: [
      'Kotlin', 'Coroutines / Flow', 'Jetpack Compose', 'Navigation 3', 'Hilt', 'Room', 'WorkManager',
      'Retrofit + OkHttp', 'Protobuf DataStore', 'Android Keystore / StrongBox', 'Macrobenchmark',
      'Baseline Profiles', 'Turbine', 'Paparazzi', 'GitHub Actions', 'Firebase Crashlytics',
    ],
    screens: [
      {
        title: 'Multi-currency home',
        body: 'Three wallets, pending settlements, and a scannable activity feed that stays readable from 0.85× to 2× font scale in Burmese, Thai and English.',
      },
      {
        title: 'Transfer flow',
        body: 'Four-step transfer with an explicit confirmation state machine and a live FX expiry countdown — no double submissions, ever.',
      },
      {
        title: 'Offline banner',
        body: 'Honest connectivity state with a queue count and estimated settlement, not a spinner that lies.',
      },
    ],
  },
  {
    slug: 'transit-flow',
    name: 'TransitFlow',
    client: 'Regional mobility operator',
    year: '2021 — 2023',
    category: 'Mobility · Real-time',
    accent: 'electric',
    featured: true,
    tagline: [
      'Real-time transit for two million riders on unreliable networks',
      'ကွန်ရက်မတည်ငြိမ်မှုကြားမှ ခရီးသည် ၂ သန်းအတွက် အချိန်နှင့်တပြေးညီ ခရီးသွားလမ်းညွှန်',
      'ระบบขนส่งเรียลไทม์สำหรับผู้โดยสารสองล้านคนบนเครือข่ายที่ไม่เสถียร',
    ],
    summary: [
      'A rider app that keeps live vehicle positions, route planning and stored-value ticketing usable underground — including a Compose map renderer that holds 60fps while streaming 4,000 vehicle updates a minute.',
      'မြေအောက်တွင်ပင် အသုံးပြုနိုင်သော ယာဉ်တည်နေရာ၊ ခရီးစဉ်စီစဉ်မှုနှင့် လက်မှတ်စနစ် — တစ်မိနစ်လျှင် ယာဉ်အချက်အလက် ၄,၀၀၀ ရရှိစဉ် 60fps ထိန်းနိုင်သော Compose မြေပုံ renderer ပါဝင်သည်။',
      'แอปสำหรับผู้โดยสารที่ยังใช้งานได้ใต้ดิน ทั้งตำแหน่งรถแบบเรียลไทม์ การวางแผนเส้นทาง และตั๋วเงินสด — พร้อม Compose map renderer ที่รักษา 60fps ขณะสตรีมข้อมูล 4,000 คันต่อนาที',
    ],
    role: 'Senior Android Engineer / Performance lead',
    platform: 'Android 7–14 · Android Auto',
    team: '6 engineers, cross-functional squad',
    duration: '19 months',
    tags: ['Realtime', 'Compose', 'Maps', 'Performance', 'Kotlin Multiplatform'],
    metrics: [
      { label: 'Frame rendering', value: '99.2% jank-free', note: 'p95 frame 9.4ms' },
      { label: 'Live updates', value: '4k/min', note: 'sustained' },
      { label: 'Battery drain', value: '−41%', note: 'during 30-min trip' },
      { label: 'Store rating', value: '4.7★', note: 'from 3.6★' },
    ],
    challenge:
      'Riders lost the app exactly when they needed it: in tunnels, on crowded platforms, and on three-year-old devices. The previous implementation redrew the entire map on every websocket frame, drained 18% battery per commute, and shipped a ticket wallet that required connectivity to open.',
    approach: [
      {
        title: 'A rendering budget, written down',
        body: 'We set a hard budget — 8ms per frame on a mid-tier 2019 device — and instrumented against it with Macrobenchmark on every pull request. Vehicle markers moved to a single Canvas layer with a stable key set, and position updates became a conflated Flow so the UI samples state instead of chasing it.',
      },
      {
        title: 'Connectivity as a first-class state',
        body: 'The domain layer models four connectivity postures (live, degraded, cached, offline) and every screen has a defined presentation for each. Tickets are signed locally with a rotating offline key and validated by the gate reader without a network round-trip.',
      },
      {
        title: 'Shared logic, native surfaces',
        body: 'Route planning, fare rules and the trip state machine moved to Kotlin Multiplatform so iOS and Android could not drift. UI stayed 100% native — Compose on Android, SwiftUI on iOS.',
      },
      {
        title: 'Battery as a product feature',
        body: 'Location sampling adapts to trip phase, websockets back off under Doze, and we replaced continuous polling with a foreground service that only exists while the rider is actually travelling.',
      },
    ],
    outcome: [
      'Map interactions hold 60fps on devices back to a 2019 Snapdragon 665.',
      '41% battery reduction across a measured 30-minute commute.',
      'Offline ticketing removed 100% of gate failures attributable to the app.',
      'Store rating moved from 3.6 to 4.7 within two release cycles.',
    ],
    stack: [
      'Kotlin', 'Kotlin Multiplatform', 'Jetpack Compose', 'Compose Canvas', 'MapLibre', 'Ktor',
      'SQLDelight', 'Coroutines / Flow', 'WorkManager', 'Perfetto', 'Macrobenchmark', 'Android Auto',
    ],
    screens: [
      { title: 'Live map', body: 'Custom Compose canvas layer with marker pooling and conflated position streams.' },
      { title: 'Trip planner', body: 'Multi-modal routing with fare preview, computed by shared KMP logic.' },
      { title: 'Offline wallet', body: 'Locally signed passes that open in under 300ms with no network.' },
    ],
  },
  {
    slug: 'clinic-companion',
    name: 'Clinic Companion',
    client: 'Community health network, Shan State',
    year: '2019 — 2021',
    category: 'Health · Accessibility',
    accent: 'violet',
    featured: true,
    tagline: [
      'Clinical care in three languages, built for the cheapest phone in the room',
      'ဘာသာစကားသုံးမျိုးဖြင့် အားအနည်းဆုံးဖုန်းများအတွက် တည်ဆောက်ထားသော ကျန်းမာရေးအက်ပ်',
      'การดูแลผู้ป่วยสามภาษา ออกแบบมาเพื่อเครื่องที่สเปกต่ำที่สุดในห้อง',
    ],
    summary: [
      'Patient records, appointment logistics and medication reminders for community clinics across eastern Shan State and northern Thailand — fully localized, TalkBack-complete, and comfortable on 1GB devices.',
      'ရှမ်းပြည်အရှေ့ပိုင်းနှင့် ထိုင်းမြောက်ပိုင်းရှိ ကျေးလက်ဆေးခန်းများအတွက် လူနာမှတ်တမ်း၊ ချိန်းဆိုမှုနှင့် ဆေးသောက်သတိပေးချက်များ — ဘာသာစကားအပြည့်အဝ ပံ့ပိုးပြီး TalkBack အပြည့်အဝ အလုပ်လုပ်ကာ 1GB စက်များတွင်ပါ အဆင်ပြေစွာ အသုံးပြုနိုင်သည်။',
      'เวชระเบียน การนัดหมาย และการเตือนกินยาสำหรับคลินิกชุมชนในรัฐฉานตะวันออกและภาคเหนือของไทย — รองรับหลายภาษาเต็มรูปแบบ ใช้ TalkBack ได้ครบ และทำงานลื่นบนเครื่อง RAM 1GB',
    ],
    role: 'Principal engineer (contract) / Accessibility owner',
    platform: 'Android 6–13 · Go edition targets',
    team: '4 engineers, 1 clinical advisor',
    duration: '16 months',
    tags: ['Accessibility', 'Localization', 'Low-end devices', 'Offline sync', 'Health data'],
    metrics: [
      { label: 'Install size', value: '11.4MB', note: 'Go-edition target' },
      { label: 'Locales', value: 'my · th · en', note: 'incl. Zawgyi migration' },
      { label: 'A11y audit', value: 'WCAG 2.2 AA', note: 'externally verified' },
      { label: 'Sync conflicts', value: '<0.1%', note: 'CRDT merge' },
    ],
    challenge:
      'Clinic staff share devices, work through intermittent power and connectivity, and read Burmese text that historically rendered incorrectly on older handsets. Records could not be lost, duplicated, or exposed to the wrong patient — and the app had to run on hardware nobody else was targeting.',
    approach: [
      {
        title: 'Design for the worst device in the room',
        body: 'We selected a 1GB Android Go handset as the reference device. Every feature had a measured memory ceiling, images were replaced with vector assets, and the dependency graph was audited monthly — the app ships with 31 direct dependencies, deliberately.',
      },
      {
        title: 'Localization as engineering, not translation',
        body: 'Burmese, Thai and English are first-class: pluralization rules, Zawgyi-to-Unicode detection and conversion, locale-aware date and number formatting, and pseudo-locale screenshot tests that catch truncation before QA does.',
      },
      {
        title: 'Accessibility from the first commit',
        body: 'Semantics are authored alongside layout, not bolted on. Minimum 48dp targets, 4.5:1 contrast enforced by a design-token lint, complete TalkBack traversal, and a monthly session with a low-vision clinic worker who tells us what actually breaks.',
      },
      {
        title: 'Conflict-free record sync',
        body: 'Records use CRDT-style merge semantics with per-field last-writer-wins and a visible audit trail, so two nurses editing the same patient offline never destroy each other\'s work.',
      },
    ],
    outcome: [
      'Deployed to 63 clinics; the median device is a four-year-old 2GB handset.',
      'Patient intake time reduced from nine minutes to three and a half.',
      'Zero data-loss incidents across 14 months of offline-heavy operation.',
      'Independent WCAG 2.2 AA audit passed with no critical findings.',
    ],
    stack: [
      'Kotlin', 'Jetpack Compose', 'Room', 'WorkManager', 'Hilt', 'SQLCipher', 'AndroidX Core i18n',
      'Accessibility Test Framework', 'Firebase App Distribution', 'Fastlane', 'Play App Signing',
    ],
    screens: [
      { title: 'Patient intake', body: 'Three-language form with adaptive text scaling to 200% without truncation.' },
      { title: 'Medication schedule', body: 'Reminders that survive Doze, reboots and aggressive OEM battery managers.' },
      { title: 'Sync audit', body: 'Human-readable merge history so clinicians trust what they see.' },
    ],
  },
  {
    slug: 'ledger-lite',
    name: 'Ledger Lite',
    client: 'Independent SME product',
    year: '2018 — 2019',
    category: 'SME · Offline',
    accent: 'lime',
    featured: false,
    tagline: [
      'Bookkeeping for market traders with no connection assumptions',
      'ကွန်ရက်မလိုအပ်ဘဲ အသုံးပြုနိုင်သော ဈေးသည်များအတွက် စာရင်းကိုင်အက်ပ်',
      'ระบบบัญชีสำหรับพ่อค้าแม่ค้าที่ไม่ต้องพึ่งอินเทอร์เน็ต',
    ],
    summary: [
      'A single-tap bookkeeping app for market vendors in Tachileik: 100% offline, exportable, and understandable without financial literacy training.',
      'တာချီလိတ်ရှိ ဈေးသည်များအတွက် တစ်ချက်နှိပ်ရုံဖြင့် စာရင်းသွင်းနိုင်သောအက်ပ် — အင်တာနက်မလို၊ ထုတ်ယူနိုင်ပြီး ငွေကြေးအသိပညာမလိုဘဲ နားလည်နိုင်သည်။',
      'แอปทำบัญชีแบบแตะเดียวสำหรับพ่อค้าแม่ค้าในท่าขี้เหล็ก: ออฟไลน์ 100% ส่งออกข้อมูลได้ และเข้าใจง่ายโดยไม่ต้องมีความรู้ทางการเงิน',
    ],
    role: 'Solo engineer & product',
    platform: 'Android 6+',
    team: 'Solo, with 12 vendor testers',
    duration: '5 months',
    tags: ['Offline', 'Room', 'Compose', 'Product design'],
    metrics: [
      { label: 'Cold start', value: '480ms', note: 'on 2GB device' },
      { label: 'Install size', value: '6.2MB', note: '' },
      { label: 'Retention D30', value: '54%', note: 'organic' },
      { label: 'Network calls', value: 'Zero', note: 'by design' },
    ],
    challenge:
      'Vendors abandoned every bookkeeping app within a week: too many fields, too much jargon, and a login wall before any value. The product had to be usable one-handed, mid-transaction, in bright border-market sunlight.',
    approach: [
      { title: 'Zero-onboarding', body: 'No account, no permissions on first run. The first screen is a number pad. Value before signup, always.' },
      { title: 'Data that cannot be lost', body: 'Room with WAL, automatic local backups, and one-tap export to CSV or an image receipt for a customer.' },
      { title: 'Sunlight-grade UI', body: 'A high-contrast token set validated outdoors at midday, with 56dp primary targets.' },
    ],
    outcome: [
      '54% day-30 retention with no marketing spend.',
      'Median session length of 11 seconds — the correct number for this product.',
      'Adopted as a recommended tool by a regional SME association.',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Room', 'DataStore', 'WorkManager', 'Play Billing'],
    screens: [
      { title: 'Number pad home', body: 'Record a sale in two taps — no scrolling, no keyboard.' },
      { title: 'Day summary', body: 'Plain-language totals with no accounting vocabulary.' },
    ],
  },
  {
    slug: 'field-ops',
    name: 'FieldOps Toolkit',
    client: 'Border logistics operator',
    year: '2016 — 2018',
    category: 'Enterprise · Devices',
    accent: 'electric',
    featured: false,
    tagline: [
      'Rugged-device operations tooling for 1,800 drivers',
      'ယာဉ်မောင်း ၁,၈၀၀ အတွက် ခံနိုင်ရည်ရှိစက်များပေါ်တွင် လုပ်ငန်းလည်ပတ်ရေးကိရိယာ',
      'เครื่องมือปฏิบัติงานบนอุปกรณ์ทนทานสำหรับคนขับ 1,800 คน',
    ],
    summary: [
      'Barcode-heavy proof-of-delivery, route sheets and device fleet management on locked-down rugged Android hardware crossing three national borders.',
      'နိုင်ငံနယ်နိမိတ်သုံးခုဖြတ်ကျော်သည့် ခံနိုင်ရည်ရှိ Android စက်များပေါ်တွင် Barcode အခြေပြု ပစ္စည်းပို့ဆောင်မှုအထောက်အထား၊ လမ်းကြောင်းစာရွက်နှင့် စက်ပစ္စည်းစီမံခန့်ခွဲမှု။',
      'ระบบยืนยันการส่งของด้วยบาร์โค้ด ใบเส้นทาง และการจัดการอุปกรณ์บนฮาร์ดแวร์ Android แบบทนทานที่ข้ามสามพรมแดน',
    ],
    role: 'Android tech lead',
    platform: 'Zebra / Honeywell rugged Android',
    team: '5 engineers',
    duration: '20 months',
    tags: ['Enterprise', 'MDM', 'Barcode', 'Kiosk mode'],
    metrics: [
      { label: 'Scan throughput', value: '+2.4×', note: '' },
      { label: 'Device downtime', value: '−63%', note: '' },
      { label: 'OTA rollout', value: '<4h fleet-wide', note: '' },
      { label: 'Support tickets', value: '−48%', note: '' },
    ],
    challenge:
      'Drivers used three separate apps and a paper fallback. Devices drifted across four OS versions with no reliable update path, and a failed scan meant a phone call to dispatch from a border checkpoint with no signal.',
    approach: [
      { title: 'One app, kiosk-locked', body: 'A single COSU/kiosk application with role-based surfaces replaced three tools, provisioned by QR-code enrolment.' },
      { title: 'Hardware abstraction', body: 'A thin scanner abstraction isolated OEM SDK differences so the product team never wrote vendor-specific code.' },
      { title: 'Fleet-aware releases', body: 'Staged OTA with device-cohort targeting and automated rollback on scan-failure regression.' },
    ],
    outcome: [
      'Fleet-wide updates in under four hours, down from a two-week manual process.',
      'Proof-of-delivery capture time down 2.4×.',
      'Dispatch support tickets reduced by 48%.',
    ],
    stack: ['Kotlin', 'Android Enterprise', 'DataWedge', 'WorkManager', 'Room', 'gRPC', 'Firebase'],
    screens: [
      { title: 'Route sheet', body: 'Glove-friendly targets and a single-column flow for in-vehicle use.' },
      { title: 'Scan capture', body: 'Hardware-trigger scanning with instant local validation.' },
    ],
  },
  {
    slug: 'compose-motion-lab',
    name: 'Compose Motion Lab',
    client: 'Open source',
    year: '2022 — present',
    category: 'Open source · Library',
    accent: 'neon',
    featured: false,
    tagline: [
      'A motion primitives library for Jetpack Compose',
      'Jetpack Compose အတွက် motion primitives library',
      'ไลบรารี motion primitives สำหรับ Jetpack Compose',
    ],
    summary: [
      'Physics-based transition primitives, shared-element helpers and a frame-budget debug overlay — used in production by teams shipping to millions.',
      'ရူပဗေဒအခြေပြု transition primitives၊ shared-element helper များနှင့် frame-budget debug overlay — သန်းနှင့်ချီသောအသုံးပြုသူများထံ ပို့ဆောင်နေသည့် အဖွဲ့များ production တွင် အသုံးပြုနေသည်။',
      'ไพรมิทีฟทรานซิชันเชิงฟิสิกส์ ตัวช่วย shared-element และโอเวอร์เลย์ดีบัก frame budget — ใช้งานจริงโดยทีมที่ส่งมอบให้ผู้ใช้หลายล้านคน',
    ],
    role: 'Author & maintainer',
    platform: 'Android library (AAR)',
    team: 'Me + 11 contributors',
    duration: 'Ongoing',
    tags: ['Open source', 'Compose', 'Animation', 'Tooling'],
    metrics: [
      { label: 'GitHub stars', value: '2.1k', note: '' },
      { label: 'Monthly downloads', value: '41k', note: 'Maven Central' },
      { label: 'Contributors', value: '11', note: '' },
      { label: 'API stability', value: '1.x since 2024', note: '' },
    ],
    challenge:
      'Compose gives you animation APIs but no opinion about motion systems. Teams end up with inconsistent easing, ad-hoc durations, and no way to see when a transition blows the frame budget.',
    approach: [
      { title: 'Tokens, not magic numbers', body: 'A typed motion token set (duration, easing, spring) that maps to design system language and is testable.' },
      { title: 'Debug overlay', body: 'An in-app overlay that flags any frame over budget during a transition, with the composable name attached.' },
      { title: 'Zero-cost when unused', body: 'Strict API surface, no reflection, no runtime dependency beyond Compose runtime and foundation.' },
    ],
    outcome: [
      '41k monthly Maven Central downloads.',
      'Adopted by three publicly-listed apps with 10M+ installs each.',
      'Semantic-versioned 1.x API with a documented deprecation policy.',
    ],
    stack: ['Kotlin', 'Compose Runtime', 'Compose Foundation', 'Dokka', 'Maven Central', 'GitHub Actions'],
    screens: [
      { title: 'Motion tokens', body: 'A typed vocabulary shared between designers and engineers.' },
      { title: 'Frame budget overlay', body: 'See exactly which composable broke 8ms.' },
    ],
  },
]

export const featuredProjects = projects.filter((p) => p.featured)

export function getProject(slug?: string) {
  return projects.find((p) => p.slug === slug)
}

/* ------------------------------------------------------------- case studies */

export type CaseStudy = {
  slug: string
  project: string
  title: LocalizedText
  discipline: string
  duration: string
  headline: string
  problem: string
  lever: string
  result: Metric[]
  lessons: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'border-pay',
    project: 'BorderPay',
    discipline: 'Architecture · Migration',
    duration: '30 months',
    title: [
      'Rebuilding a payments app without a feature freeze',
      'Feature freeze မလုပ်ဘဲ ငွေပေးချေမှုအက်ပ်တစ်ခုကို ပြန်လည်တည်ဆောက်ခြင်း',
      'รื้อสร้างแอปชำระเงินโดยไม่ต้องหยุดพัฒนาฟีเจอร์',
    ],
    headline: 'From a 310k-line monolith to 42 modules, shipping weekly throughout.',
    problem:
      'A single-module legacy app with a six-week manual regression cycle, and a business that could not pause roadmap delivery for a rewrite.',
    lever:
      'Strangler-fig modularisation behind a navigation façade, with Gradle-enforced boundaries and a per-module migration budget tracked on the same board as feature work.',
    result: [
      { label: 'Modules', value: '42', note: 'from 1' },
      { label: 'Build time', value: '3m10s', note: 'from 11m' },
      { label: 'Release cycle', value: 'Weekly', note: 'from 6-weekly' },
      { label: 'Crash-free', value: '99.96%', note: '' },
    ],
    lessons: [
      'Migration work that is invisible on the roadmap will be deprioritised. Make it a line item with a percentage.',
      'A module boundary is a social contract before it is a build-file entry.',
      'Feature flags are a migration tool, not just a product tool.',
    ],
  },
  {
    slug: 'transit-flow',
    project: 'TransitFlow',
    discipline: 'Performance · Realtime',
    duration: '4 months of the 19',
    title: [
      'Holding 60fps while the world updates 4,000 times a minute',
      'တစ်မိနစ်လျှင် အချက်အလက် ၄,၀၀၀ ဝင်နေစဉ် 60fps ထိန်းသိမ်းခြင်း',
      'รักษา 60fps ขณะข้อมูลอัปเดต 4,000 ครั้งต่อนาที',
    ],
    headline: 'A rendering budget, a conflated stream, and one Canvas layer.',
    problem:
      'Every websocket frame triggered a full recomposition of the map screen. p95 frame time was 42ms on mid-tier devices, and battery drain made the app unusable for a full commute.',
    lever:
      'Set an explicit 8ms budget, moved markers into a single Canvas layer with stable keys, conflated the position Flow, and gated every PR behind a Macrobenchmark regression check.',
    result: [
      { label: 'p95 frame', value: '9.4ms', note: 'from 42ms' },
      { label: 'Jank-free', value: '99.2%', note: 'from 81%' },
      { label: 'Battery / trip', value: '−41%', note: '' },
      { label: 'Rating', value: '4.7★', note: 'from 3.6★' },
    ],
    lessons: [
      'You cannot optimise what you have not budgeted. Write the number down first.',
      'Conflation beats buffering when the UI only cares about the latest truth.',
      'Performance regressions are a CI problem, not a code-review problem.',
    ],
  },
  {
    slug: 'clinic-companion',
    project: 'Clinic Companion',
    discipline: 'Accessibility · Localization',
    duration: '16 months',
    title: [
      'Three languages, one layout, zero truncation',
      'ဘာသာစကားသုံးမျိုး၊ layout တစ်ခု၊ စာလုံးမပြတ်တောက်ခြင်း',
      'สามภาษา หนึ่งเลย์เอาต์ ไม่มีข้อความตกหล่น',
    ],
    headline: 'Localization treated as an engineering constraint, verified in CI.',
    problem:
      'Burmese strings run about 40% longer than English and older devices rendered Zawgyi-encoded text incorrectly. Manual QA missed truncation until it reached clinics.',
    lever:
      'Pseudo-locale screenshot tests in CI, a Zawgyi detection and conversion layer, intrinsic-size-safe Compose layouts, and font-scale test matrices from 0.85× to 2.0×.',
    result: [
      { label: 'Locales', value: '3', note: 'my · th · en' },
      { label: 'Truncation bugs', value: '0', note: 'post-CI gate' },
      { label: 'Font scale', value: '200%', note: 'supported' },
      { label: 'A11y audit', value: 'AA pass', note: 'WCAG 2.2' },
    ],
    lessons: [
      'If your layout only works in English, it does not work.',
      'Screenshot tests in pseudo-locales cost one afternoon and save a release.',
      'Accessibility and localization fail in the same places — test them together.',
    ],
  },
]

/* -------------------------------------------------------------- experience */

export type Role = {
  company: string
  title: string
  period: string
  location: string
  summary: LocalizedText
  points: string[]
  stack: string[]
}

export const experience: Role[] = [
  {
    company: 'Microsoft',
    title: 'Senior Android Engineer',
    period: '2023 — Present',
    location: 'Remote — Tachileik, Myanmar',
    summary: [
      'Own Android architecture and release health for a mobile surface used across Asia-Pacific.',
      'အာရှ-ပစိဖိတ်ဒေသတစ်ဝှမ်း အသုံးပြုသည့် mobile surface တစ်ခု၏ Android ဗိသုကာနှင့် release ကျန်းမာရေးကို တာဝန်ယူသည်။',
      'ดูแลสถาปัตยกรรม Android และสุขภาพการปล่อยเวอร์ชันของผลิตภัณฑ์โมบายที่ใช้งานทั่วเอเชียแปซิฟิก',
    ],
    points: [
      'Lead the modularisation of a large Kotlin codebase into Gradle-enforced feature and core modules with named ownership.',
      'Introduced a weekly release train with staged rollout, automated halt rules, and macrobenchmark gates on every pull request.',
      'Reduced cold start p90 from 3.6s to 1.1s and lifted crash-free sessions to 99.96%.',
      'Chair the Android architecture forum and author the platform ADR process.',
    ],
    stack: ['Kotlin', 'Compose', 'Hilt', 'Room', 'GitHub Actions', 'Macrobenchmark'],
  },
  {
    company: 'E-4Skills',
    title: 'Founder & Principal Engineer',
    period: '2021 — Present',
    location: 'Tachileik, Myanmar',
    summary: [
      'An engineering education and consulting practice for Myanmar and Thai border-region teams.',
      'မြန်မာနှင့် ထိုင်းနယ်စပ်ဒေသရှိ အဖွဲ့များအတွက် အင်ဂျင်နီယာပညာရေးနှင့် အတိုင်ပင်ခံလုပ်ငန်း။',
      'สถาบันฝึกอบรมและที่ปรึกษาด้านวิศวกรรมสำหรับทีมในเมียนมาและพื้นที่ชายแดนไทย',
    ],
    points: [
      'Trained 180+ engineers in Kotlin, Jetpack Compose, and modern Android architecture across three cohorts a year.',
      'Delivered architecture audits and release-engineering setups for fintech, logistics, and healthcare clients.',
      'Publish open-source Kotlin libraries and Burmese-language technical material used by regional teams.',
    ],
    stack: ['Kotlin', 'Compose', 'Gradle', 'CI/CD', 'Mentoring'],
  },
  {
    company: 'Regional mobility operator',
    title: 'Senior Android Engineer',
    period: '2021 — 2023',
    location: 'Chiang Rai, Thailand / Remote',
    summary: [
      'Performance and realtime lead on a transit app used by two million riders.',
      'ခရီးသည် ၂ သန်းအသုံးပြုသော transit app ၏ performance နှင့် realtime တာဝန်ခံ။',
      'หัวหน้าด้านประสิทธิภาพและเรียลไทม์ของแอปขนส่งที่มีผู้ใช้สองล้านคน',
    ],
    points: [
      'Rebuilt the live map rendering path in Compose, taking p95 frame time from 42ms to 9.4ms.',
      'Moved fare and routing logic to Kotlin Multiplatform, eliminating iOS/Android behavioural drift.',
      'Designed the offline ticketing model, removing all app-attributable gate failures.',
    ],
    stack: ['Kotlin', 'KMP', 'Compose', 'MapLibre', 'Ktor', 'Perfetto'],
  },
  {
    company: 'Community health network',
    title: 'Principal Engineer (contract)',
    period: '2019 — 2021',
    location: 'Shan State, Myanmar',
    summary: [
      'Built a tri-lingual clinical companion for 63 community clinics.',
      'ကျေးလက်ဆေးခန်း ၆၃ ခုအတွက် ဘာသာသုံးမျိုးပါ ကျန်းမာရေးအက်ပ် တည်ဆောက်ခဲ့သည်။',
      'สร้างแอปดูแลผู้ป่วยสามภาษาสำหรับคลินิกชุมชน 63 แห่ง',
    ],
    points: [
      'Delivered an 11.4MB app running comfortably on 1GB Android Go devices.',
      'Owned accessibility to an externally-audited WCAG 2.2 AA standard.',
      'Designed CRDT-style record merge with a human-readable audit trail.',
    ],
    stack: ['Kotlin', 'Compose', 'Room', 'SQLCipher', 'WorkManager'],
  },
  {
    company: 'Border logistics operator',
    title: 'Android Tech Lead',
    period: '2016 — 2019',
    location: 'Tachileik / Mae Sai',
    summary: [
      'Enterprise Android across a rugged device fleet crossing three borders.',
      'နယ်နိမိတ်သုံးခုဖြတ်ကျော်သည့် ခံနိုင်ရည်ရှိစက်အုပ်စုအတွက် enterprise Android။',
      'Android ระดับองค์กรบนฟลีตอุปกรณ์ทนทานที่ข้ามสามพรมแดน',
    ],
    points: [
      'Consolidated three driver applications into one kiosk-mode enterprise app across 1,800 rugged devices.',
      'Cut fleet-wide OTA rollout from two weeks to under four hours.',
      'Mentored four engineers; two are now leads.',
    ],
    stack: ['Kotlin', 'Java', 'Android Enterprise', 'gRPC', 'Room'],
  },
  {
    company: 'Independent & agency work',
    title: 'Android Developer → Senior',
    period: '2014 — 2016',
    location: 'Yangon / Tachileik',
    summary: [
      'Shipped 14 client applications across commerce, media and education.',
      'ကုန်သွယ်မှု၊ မီဒီယာနှင့် ပညာရေးကဏ္ဍများတွင် client application ၁၄ ခု ထုတ်လွှင့်ခဲ့သည်။',
      'ส่งมอบแอปลูกค้า 14 ตัวในกลุ่มคอมเมิร์ซ สื่อ และการศึกษา',
    ],
    points: [
      'Introduced the first MVVM + Kotlin baseline and CI pipeline to two studios.',
      'Built the shared component library used across all client work.',
      'Ran the internal Android guild and the hiring bar for mobile.',
    ],
    stack: ['Java', 'Kotlin', 'RxJava', 'Dagger', 'Jenkins'],
  },
]

export const certifications = [
  { name: 'Associate Android Developer', issuer: 'Google', year: '2019', id: 'AAD-2019-88214' },
  { name: 'Computer Vision with Python', issuer: 'OpenCV University', year: '2022', id: 'CV-PY-2022-4417' },
  { name: 'Cyber Security Essentials', issuer: 'Cisco Networking Academy', year: '2021', id: 'CSE-2021-9903' },
  { name: 'Web Technologies & Modern Front-End', issuer: 'Meta / Coursera', year: '2020', id: 'WEB-2020-2288' },
  { name: 'Fundamentals of Digital Growth Strategy', issuer: 'Google Digital Garage', year: '2023', id: 'DGS-2023-7715' },
  { name: 'Kotlin Coroutines & Concurrency', issuer: 'JetBrains Academy', year: '2021', id: 'KTC-2021-5561' },
]

export const education = [
  { name: 'B.C.Sc. Computer Science', issuer: 'University of Computer Studies, Taunggyi', year: '2010 — 2014' },
  { name: 'Advanced Android Architecture', issuer: 'Continuous professional study', year: '2018 — present' },
]

/* ------------------------------------------------------------------ skills */

export type SkillGroup = {
  title: LocalizedText
  note: LocalizedText
  accent: 'neon' | 'electric' | 'violet' | 'lime'
  skills: { name: string; level: number; years: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    title: ['Languages & core', 'ဘာသာစကားနှင့် အခြေခံ', 'ภาษาและพื้นฐาน'],
    note: ['What I write every day', 'နေ့စဉ်ရေးသားနေသည့်အရာများ', 'สิ่งที่เขียนทุกวัน'],
    accent: 'neon',
    skills: [
      { name: 'Kotlin', level: 98, years: '10 yrs' },
      { name: 'Coroutines & Flow', level: 96, years: '8 yrs' },
      { name: 'Java', level: 84, years: '12 yrs' },
      { name: 'Kotlin Multiplatform', level: 84, years: '4 yrs' },
      { name: 'Python (CV & tooling)', level: 72, years: '5 yrs' },
      { name: 'TypeScript', level: 74, years: '6 yrs' },
    ],
  },
  {
    title: ['UI & interaction', 'UI နှင့် အပြန်အလှန်တုံ့ပြန်မှု', 'UI และการโต้ตอบ'],
    note: ['Compose-first, motion-literate', 'Compose ဦးစားပေး၊ motion နားလည်မှုရှိ', 'เน้น Compose เข้าใจงานโมชัน'],
    accent: 'violet',
    skills: [
      { name: 'Jetpack Compose', level: 97, years: '6 yrs' },
      { name: 'Compose Canvas & graphics', level: 88, years: '5 yrs' },
      { name: 'Material 3 / theming', level: 92, years: '5 yrs' },
      { name: 'Android Views (legacy)', level: 92, years: '12 yrs' },
      { name: 'Motion & transitions', level: 89, years: '7 yrs' },
      { name: 'Adaptive & large screen', level: 86, years: '5 yrs' },
    ],
  },
  {
    title: ['Architecture', 'ဗိသုကာ', 'สถาปัตยกรรม'],
    note: ['Boundaries, contracts, ADRs', 'နယ်နိမိတ်များ၊ စာချုပ်များ၊ ADR များ', 'ขอบเขต สัญญา และ ADR'],
    accent: 'electric',
    skills: [
      { name: 'Multi-module Gradle', level: 95, years: '7 yrs' },
      { name: 'Clean / hexagonal layering', level: 93, years: '8 yrs' },
      { name: 'MVI & unidirectional state', level: 94, years: '7 yrs' },
      { name: 'Offline-first & sync', level: 93, years: '8 yrs' },
      { name: 'Dependency injection (Hilt/Koin)', level: 93, years: '9 yrs' },
      { name: 'API & contract design', level: 88, years: '8 yrs' },
    ],
  },
  {
    title: ['Performance & reliability', 'စွမ်းဆောင်ရည်နှင့် ယုံကြည်စိတ်ချရမှု', 'ประสิทธิภาพและความน่าเชื่อถือ'],
    note: ['Measured, budgeted, gated', 'တိုင်းတာ၊ ဘတ်ဂျက်သတ်မှတ်၊ CI ဖြင့်ကာကွယ်', 'วัดผล ตั้งงบ และกันไว้ใน CI'],
    accent: 'lime',
    skills: [
      { name: 'Macrobenchmark & baseline profiles', level: 94, years: '5 yrs' },
      { name: 'Perfetto / systrace analysis', level: 90, years: '6 yrs' },
      { name: 'Memory & leak forensics', level: 91, years: '8 yrs' },
      { name: 'Startup optimisation', level: 95, years: '7 yrs' },
      { name: 'Crash triage & SLOs', level: 92, years: '7 yrs' },
      { name: 'R8 / size optimisation', level: 89, years: '7 yrs' },
    ],
  },
  {
    title: ['Delivery & security', 'ပို့ဆောင်မှုနှင့် လုံခြုံရေး', 'การส่งมอบและความปลอดภัย'],
    note: ['From merge to rollout', 'Merge မှ rollout အထိ', 'ตั้งแต่ merge จนถึง rollout'],
    accent: 'neon',
    skills: [
      { name: 'GitHub Actions / CI design', level: 93, years: '8 yrs' },
      { name: 'Fastlane & Play publishing', level: 91, years: '9 yrs' },
      { name: 'Staged rollout & feature flags', level: 92, years: '7 yrs' },
      { name: 'Mobile app security & Keystore', level: 88, years: '6 yrs' },
      { name: 'Test strategy (unit → E2E)', level: 90, years: '9 yrs' },
      { name: 'Observability & alerting', level: 87, years: '6 yrs' },
    ],
  },
  {
    title: ['Product & craft', 'ထုတ်ကုန်နှင့် အနုပညာ', 'ผลิตภัณฑ์และงานฝีมือ'],
    note: ['Why before how', 'ဘယ်လိုလုပ်မလဲ မမေးခင် ဘာကြောင့်လဲကို မေးသည်', 'ถาม "ทำไม" ก่อน "อย่างไร"'],
    accent: 'violet',
    skills: [
      { name: 'Design system collaboration', level: 92, years: '7 yrs' },
      { name: 'Accessibility (WCAG 2.2)', level: 90, years: '6 yrs' },
      { name: 'Localization engineering', level: 95, years: '8 yrs' },
      { name: 'Technical writing & ADRs', level: 91, years: '7 yrs' },
      { name: 'Mentoring & training', level: 93, years: '7 yrs' },
      { name: 'Stakeholder communication', level: 88, years: '8 yrs' },
    ],
  },
]

/* --------------------------------------------------------------- tech stack */

export type StackLayer = {
  name: LocalizedText
  role: LocalizedText
  accent: 'neon' | 'electric' | 'violet' | 'lime'
  items: { name: string; why: string }[]
}

export const stackLayers: StackLayer[] = [
  {
    name: ['Presentation', 'Presentation', 'ชั้นการแสดงผล'],
    role: ['Compose UI, state holders, navigation', 'Compose UI, state holder, navigation', 'Compose UI, state holder, navigation'],
    accent: 'violet',
    items: [
      { name: 'Jetpack Compose', why: 'Declarative UI with a testable state contract.' },
      { name: 'Navigation 3', why: 'Type-safe routes with module-owned graphs.' },
      { name: 'Molecule / StateFlow', why: 'Deterministic UI state, easy to snapshot in tests.' },
      { name: 'Coil', why: 'Coroutine-native image loading with a memory budget.' },
    ],
  },
  {
    name: ['Domain', 'Domain', 'ชั้นโดเมน'],
    role: ['Pure Kotlin business rules', 'Kotlin သီးသန့် လုပ်ငန်းစည်းမျဉ်းများ', 'กฎธุรกิจ Kotlin ล้วน'],
    accent: 'neon',
    items: [
      { name: 'Use cases', why: 'One reason to change, trivially unit testable.' },
      { name: 'Kotlin Multiplatform', why: 'Share rules with iOS without sharing UI.' },
      { name: 'Money & FX types', why: 'Integer minor units per currency — MMK, THB, USD never float.' },
      { name: 'kotlinx.datetime', why: 'Timezone correctness across three markets.' },
    ],
  },
  {
    name: ['Data', 'Data', 'ชั้นข้อมูล'],
    role: ['Source of truth, sync, caching', 'အချက်အလက်မူရင်း၊ sync၊ cache', 'แหล่งข้อมูลจริง การซิงก์ และแคช'],
    accent: 'electric',
    items: [
      { name: 'Room / SQLDelight', why: 'Local database as the source of truth, not the cache.' },
      { name: 'Retrofit + OkHttp / Ktor', why: 'Interceptor-level auth, retry and redaction.' },
      { name: 'Protobuf DataStore', why: 'Typed preferences with schema migration.' },
      { name: 'WorkManager', why: 'Guaranteed execution under Doze and reboots.' },
    ],
  },
  {
    name: ['Platform & DI', 'Platform & DI', 'แพลตฟอร์มและ DI'],
    role: ['Composition, security, device APIs', 'ဖွဲ့စည်းမှု၊ လုံခြုံရေး၊ device API', 'การประกอบ ความปลอดภัย และ API อุปกรณ์'],
    accent: 'lime',
    items: [
      { name: 'Hilt', why: 'Compile-time graph validation across 40+ modules.' },
      { name: 'Android Keystore / StrongBox', why: 'Hardware-backed key material for financial data.' },
      { name: 'Play Integrity', why: 'Attestation without punishing legitimate rooted testers.' },
      { name: 'Firebase / Crashlytics', why: 'Crash SLOs with owner routing.' },
    ],
  },
  {
    name: ['Delivery', 'Delivery', 'การส่งมอบ'],
    role: ['CI, testing, rollout, observability', 'CI၊ စမ်းသပ်မှု၊ rollout၊ observability', 'CI การทดสอบ rollout และ observability'],
    accent: 'neon',
    items: [
      { name: 'GitHub Actions', why: 'Remote build cache, matrix device tests, 12-minute PR loop.' },
      { name: 'Macrobenchmark + Baseline Profiles', why: 'Performance regressions fail the build.' },
      { name: 'Paparazzi / Roborazzi', why: 'Screenshot tests in pseudo-locales and font scales.' },
      { name: 'Fastlane + Play Publisher', why: 'Staged rollout with automated halt rules.' },
    ],
  },
]

/* -------------------------------------------------------------- testimonials */

export type Testimonial = {
  quote: LocalizedText
  name: string
  role: string
  company: string
  tag: string
}

export const testimonials: Testimonial[] = [
  {
    quote: [
      'Moe is the rare engineer who can hold both the Gradle graph and the customer journey in his head at the same time. He turned our rewrite from a risk into a schedule.',
      'Moe သည် Gradle graph နှင့် customer journey နှစ်မျိုးလုံးကို တစ်ပြိုင်နက် စဉ်းစားနိုင်သည့် ရှားပါးအင်ဂျင်နီယာဖြစ်သည်။ ကျွန်ုပ်တို့၏ rewrite ကို အန္တရာယ်မှ အချိန်ဇယားတစ်ခုအဖြစ် ပြောင်းလဲပေးခဲ့သည်။',
      'Moe คือวิศวกรที่หายากซึ่งเก็บทั้ง Gradle graph และเส้นทางลูกค้าไว้ในหัวได้พร้อมกัน เขาเปลี่ยนการรื้อระบบจากความเสี่ยงให้กลายเป็นตารางงานที่ชัดเจน',
    ],
    name: 'Suchada Pongsri',
    role: 'VP Engineering',
    company: 'Cross-border payments',
    tag: 'Architecture',
  },
  {
    quote: [
      'We had been chasing jank for a year. He set a frame budget in week one, and by week six our map was smoother than our competitor\'s native build.',
      'ကျွန်ုပ်တို့ တစ်နှစ်လုံး jank ကို လိုက်ရှာနေခဲ့သည်။ သူသည် ပထမအပတ်တွင် frame budget သတ်မှတ်ခဲ့ပြီး ဆဋ္ဌမအပတ်တွင် ကျွန်ုပ်တို့မြေပုံသည် ပြိုင်ဘက်၏ native build ထက် ချောမွေ့သွားခဲ့သည်။',
      'เราไล่แก้อาการกระตุกมาทั้งปี เขาตั้ง frame budget ตั้งแต่สัปดาห์แรก และสัปดาห์ที่หกแผนที่ของเราลื่นกว่าคู่แข่งที่เป็น native เสียอีก',
    ],
    name: 'Marc Devereux',
    role: 'Head of Product',
    company: 'Regional mobility operator',
    tag: 'Performance',
  },
  {
    quote: [
      'He asked to sit with our nurses for two days before writing any code. That decision shaped the whole product — and it is why clinics actually use it.',
      'ကုဒ်မရေးမီ ကျွန်ုပ်တို့သူနာပြုများနှင့် နှစ်ရက် အတူထိုင်ခွင့်တောင်းခဲ့သည်။ ထိုဆုံးဖြတ်ချက်က ထုတ်ကုန်တစ်ခုလုံးကို ပုံသွင်းခဲ့ပြီး ဆေးခန်းများ တကယ်အသုံးပြုရသည့် အကြောင်းရင်းဖြစ်သည်။',
      'เขาขอไปนั่งกับพยาบาลของเราสองวันก่อนเขียนโค้ดสักบรรทัด การตัดสินใจนั้นกำหนดทิศทางทั้งผลิตภัณฑ์ และเป็นเหตุผลที่คลินิกใช้งานจริง',
    ],
    name: 'Dr. Nwe Nwe Aung',
    role: 'Clinical Director',
    company: 'Community health network',
    tag: 'Product',
  },
  {
    quote: [
      'The handover documentation was better than most companies\' internal wikis. Six months after he left, we were still shipping on the rails he built.',
      'လွှဲပြောင်းစာရွက်စာတမ်းများသည် ကုမ္ပဏီအများစု၏ အတွင်းပိုင်း wiki များထက် ပိုကောင်းသည်။ သူထွက်ခွာပြီး ခြောက်လအကြာတွင်ပင် သူတည်ဆောက်ခဲ့သည့် လမ်းကြောင်းပေါ်တွင် ဆက်လက်ထုတ်လွှင့်နေဆဲဖြစ်သည်။',
      'เอกสารส่งมอบดีกว่า wiki ภายในของหลายบริษัทเสียอีก หกเดือนหลังเขาไป เราก็ยังส่งงานบนรางที่เขาวางไว้',
    ],
    name: 'Adrian Kowalski',
    role: 'CTO',
    company: 'Border logistics operator',
    tag: 'Handover',
  },
  {
    quote: [
      'His E-4Skills cohort changed how our whole team writes Compose. Two of my mid-level engineers came back as genuine architecture owners.',
      'သူ၏ E-4Skills သင်တန်းက ကျွန်ုပ်တို့အဖွဲ့တစ်ခုလုံး Compose ရေးသားပုံကို ပြောင်းလဲပေးခဲ့သည်။ အလယ်အလတ်အဆင့် အင်ဂျင်နီယာနှစ်ဦးမှာ ဗိသုကာတာဝန်ခံအစစ်များအဖြစ် ပြန်လာခဲ့သည်။',
      'คอร์ส E-4Skills ของเขาเปลี่ยนวิธีที่ทีมเราเขียน Compose ทั้งทีม วิศวกรระดับกลางสองคนกลับมาเป็นเจ้าของสถาปัตยกรรมได้จริง',
    ],
    name: 'Priya Raghavan',
    role: 'Engineering Manager',
    company: 'Northwind Digital',
    tag: 'Mentorship',
  },
  {
    quote: [
      'Calm in an incident, precise in a design review, and completely allergic to hand-waving. Exactly what a senior hire should look like.',
      'အရေးပေါ်အခြေအနေတွင် တည်ငြိမ်ပြီး design review တွင် တိကျသည်။ ရေရာမှုမရှိသော ပြောဆိုမှုများကို လုံးဝမနှစ်သက်ပါ။ Senior တစ်ဦး ဖြစ်သင့်သည့် ပုံစံအတိအကျဖြစ်သည်။',
      'สงบเวลาเกิดเหตุ แม่นยำใน design review และไม่ยอมรับคำอธิบายลอย ๆ นี่คือภาพของ senior ที่ควรจะเป็น',
    ],
    name: 'Elena Fischer',
    role: 'Principal Engineer',
    company: 'Contour Labs',
    tag: 'Collaboration',
  },
]

/* ------------------------------------------------------------------ services */

export type Service = {
  slug: string
  title: LocalizedText
  outcome: LocalizedText
  detail: string
  deliverables: string[]
  duration: string
  icon: string
}

export const services: Service[] = [
  {
    slug: 'architecture-audit',
    title: ['Architecture & performance audit', 'ဗိသုကာနှင့် စွမ်းဆောင်ရည် စစ်ဆေးမှု', 'ตรวจสอบสถาปัตยกรรมและประสิทธิภาพ'],
    outcome: [
      'A ranked, costed plan for the next two quarters.',
      'နောက်လာမည့် သုံးလပတ်နှစ်ခုအတွက် အဆင့်သတ်မှတ်ထားပြီး ကုန်ကျစရိတ်တွက်ချက်ထားသော အစီအစဉ်။',
      'แผนงานที่จัดลำดับและประเมินต้นทุนสำหรับสองไตรมาสข้างหน้า',
    ],
    detail:
      'Two weeks inside your codebase and your CI. I profile real devices, map module boundaries, review the release pipeline, and interview the team. You get a findings document that a CTO can read and an engineer can execute.',
    deliverables: [
      'Module dependency and ownership map',
      'Startup, frame, memory and size benchmark baseline',
      'Ranked remediation backlog with effort estimates',
      'Two-hour walkthrough with your engineering leadership',
    ],
    duration: '2 weeks',
    icon: 'radar',
  },
  {
    slug: 'build',
    title: ['End-to-end Android build', 'အစအဆုံး Android တည်ဆောက်ခြင်း', 'พัฒนาแอป Android ครบวงจร'],
    outcome: [
      'A production app your team can own from day one.',
      'ပထမနေ့မှစ၍ သင့်အဖွဲ့ တာဝန်ယူနိုင်သည့် production အက်ပ်။',
      'แอปพร้อมโปรดักชันที่ทีมคุณเป็นเจ้าของได้ตั้งแต่วันแรก',
    ],
    detail:
      'Discovery, architecture, implementation, release engineering and handover. I work as an embedded senior engineer inside your squad, not a black-box vendor — your team reviews every pull request and inherits a documented system.',
    deliverables: [
      'Architecture decision records for every significant choice',
      'Modularised Compose codebase with test coverage targets',
      'CI/CD with staged rollout and automated rollback',
      'Handover workshops and a 30-day support window',
    ],
    duration: '3 — 6 months',
    icon: 'layers',
  },
  {
    slug: 'rescue',
    title: ['Release rescue', 'Release ကယ်တင်ရေး', 'กู้สถานการณ์การปล่อยเวอร์ชัน'],
    outcome: [
      'Ship the release that is currently blocked.',
      'ယခုပိတ်ဆို့နေသော release ကို ထုတ်လွှင့်နိုင်စေရန်။',
      'ปล่อยเวอร์ชันที่ติดอยู่ให้ออกได้',
    ],
    detail:
      'For teams with a crash spike, an ANR cliff, a store rejection, or a deadline that has stopped moving. I embed fast, triage ruthlessly and stabilise — then leave behind the guardrails that stop it recurring.',
    deliverables: [
      'Incident triage with a prioritised fix list within 72 hours',
      'Crash/ANR root-cause analysis and patches',
      'Release gate hardening (flags, staged rollout, halt rules)',
      'Post-incident review document',
    ],
    duration: '2 — 6 weeks',
    icon: 'lifebuoy',
  },
  {
    slug: 'fractional',
    title: ['Fractional mobile lead', 'အချိန်ပိုင်း mobile ခေါင်းဆောင်', 'หัวหน้าทีมโมบายแบบพาร์ตไทม์'],
    outcome: [
      'Senior technical direction without a full-time hire.',
      'အချိန်ပြည့်ဝန်ထမ်းမခန့်ဘဲ အဆင့်မြင့် နည်းပညာလမ်းညွှန်မှု။',
      'ทิศทางเทคนิคระดับซีเนียร์โดยไม่ต้องจ้างเต็มเวลา',
    ],
    detail:
      'Two to three days a week owning architecture direction, code review standards, hiring bar and release health for your mobile team. Ideal for scale-ups between their first and fifth Android engineer.',
    deliverables: [
      'Weekly architecture forum and ADR ownership',
      'Code review standards and PR templates',
      'Interview loop design and technical hiring support',
      'Monthly release health and performance report',
    ],
    duration: 'Rolling, 3-month minimum',
    icon: 'compass',
  },
]

export type PricingTier = {
  slug: string
  name: LocalizedText
  blurb: LocalizedText
  usd: number
  unit: 'engagement' | 'month' | 'day'
  popular?: boolean
  features: LocalizedText[]
}

export const pricingTiers: PricingTier[] = [
  {
    slug: 'audit',
    name: ['Audit sprint', 'စစ်ဆေးမှု sprint', 'สปรินต์ตรวจสอบ'],
    blurb: [
      'Two weeks. A complete picture of where your Android product actually stands.',
      'နှစ်ပတ်။ သင့် Android ထုတ်ကုန်၏ လက်ရှိအခြေအနေ အပြည့်အစုံ။',
      'สองสัปดาห์ เห็นภาพจริงของผลิตภัณฑ์ Android ของคุณทั้งหมด',
    ],
    usd: 7500,
    unit: 'engagement',
    features: [
      ['Codebase & module boundary review', 'Codebase နှင့် module နယ်နိမိတ် သုံးသပ်ချက်', 'รีวิวโค้ดเบสและขอบเขตโมดูล'],
      ['Device-matrix performance baseline', 'စက်အမျိုးမျိုးပေါ် စွမ်းဆောင်ရည် baseline', 'วัดประสิทธิภาพบนอุปกรณ์หลายรุ่น'],
      ['CI/CD and release pipeline review', 'CI/CD နှင့် release pipeline သုံးသပ်ချက်', 'รีวิว CI/CD และไปป์ไลน์'],
      ['Ranked remediation roadmap', 'အဆင့်ခွဲထားသော ပြင်ဆင်ရေးလမ်းပြမြေပုံ', 'โรดแมปแก้ไขแบบจัดลำดับ'],
      ['Leadership walkthrough session', 'ခေါင်းဆောင်ပိုင်းအတွက် ရှင်းလင်းတင်ပြမှု', 'เซสชันนำเสนอผู้บริหาร'],
    ],
  },
  {
    slug: 'build',
    name: ['Product build', 'ထုတ်ကုန်တည်ဆောက်ခြင်း', 'สร้างผลิตภัณฑ์'],
    blurb: [
      'Embedded senior engineering for a full release cycle, ending in a documented handover.',
      'Release cycle တစ်ခုလုံးအတွက် အဖွဲ့တွင်းပါဝင်သော senior အင်ဂျင်နီယာလုပ်ငန်း — စာရွက်စာတမ်းအပြည့်အစုံဖြင့် လွှဲပြောင်းပေးသည်။',
      'วิศวกรซีเนียร์ประจำทีมตลอดรอบการพัฒนา จบด้วยการส่งมอบพร้อมเอกสาร',
    ],
    usd: 14000,
    unit: 'month',
    popular: true,
    features: [
      ['Full-time embedded senior engineer', 'အချိန်ပြည့် အဖွဲ့တွင်း senior အင်ဂျင်နီယာ', 'วิศวกรซีเนียร์ประจำทีมเต็มเวลา'],
      ['Architecture ownership & ADRs', 'ဗိသုကာတာဝန်ယူမှုနှင့် ADR များ', 'เป็นเจ้าของสถาปัตยกรรมและ ADR'],
      ['CI/CD, testing and rollout setup', 'CI/CD၊ စမ်းသပ်မှုနှင့် rollout စနစ်', 'ตั้งค่า CI/CD การทดสอบ และ rollout'],
      ['Design system & accessibility support', 'ဒီဇိုင်းစနစ်နှင့် accessibility ပံ့ပိုးမှု', 'สนับสนุนดีไซน์ซิสเต็มและการเข้าถึง'],
      ['Weekly stakeholder reporting', 'အပတ်စဉ် သက်ဆိုင်သူများထံ အစီရင်ခံမှု', 'รายงานผู้มีส่วนได้ส่วนเสียรายสัปดาห์'],
      ['30-day post-handover support', 'လွှဲပြောင်းပြီးနောက် ရက် ၃၀ ပံ့ပိုးမှု', 'ซัพพอร์ต 30 วันหลังส่งมอบ'],
    ],
  },
  {
    slug: 'fractional',
    name: ['Fractional lead', 'အချိန်ပိုင်း ခေါင်းဆောင်', 'หัวหน้าแบบพาร์ตไทม์'],
    blurb: [
      'Two days a week of senior direction, review and release health ownership.',
      'တစ်ပတ်လျှင် နှစ်ရက် — လမ်းညွှန်မှု၊ code review နှင့် release ကျန်းမာရေး တာဝန်ယူမှု။',
      'สองวันต่อสัปดาห์สำหรับทิศทาง รีวิว และดูแลสุขภาพการปล่อยเวอร์ชัน',
    ],
    usd: 6200,
    unit: 'month',
    features: [
      ['Two days per week, fixed cadence', 'တစ်ပတ် နှစ်ရက် ပုံမှန်', 'สองวันต่อสัปดาห์แบบคงที่'],
      ['Architecture forum facilitation', 'ဗိသုကာဆွေးနွေးပွဲ ဦးဆောင်မှု', 'นำการประชุมสถาปัตยกรรม'],
      ['Code review standards & PR gates', 'Code review စံနှုန်းများနှင့် PR gate', 'มาตรฐานรีวิวโค้ดและ PR gate'],
      ['Hiring loop & interview design', 'ဝန်ထမ်းခေါ်ယူရေးနှင့် အင်တာဗျူးဒီဇိုင်း', 'ออกแบบกระบวนการสัมภาษณ์'],
      ['Monthly release health report', 'လစဉ် release ကျန်းမာရေးအစီရင်ခံစာ', 'รายงานสุขภาพการปล่อยรายเดือน'],
    ],
  },
]

export const pricingAddons: { name: LocalizedText; usd: number; unit: 'day' | 'engagement' }[] = [
  {
    name: ['Compose performance workshop (team of 10)', 'Compose စွမ်းဆောင်ရည် အလုပ်ရုံဆွေးနွေးပွဲ (၁၀ ဦး)', 'เวิร์กช็อป Compose performance (ทีม 10 คน)'],
    usd: 3200,
    unit: 'engagement',
  },
  {
    name: ['Accessibility audit & remediation plan', 'Accessibility စစ်ဆေးမှုနှင့် ပြင်ဆင်ရေးအစီအစဉ်', 'ตรวจสอบการเข้าถึงและแผนแก้ไข'],
    usd: 4400,
    unit: 'engagement',
  },
  {
    name: ['Localization engineering setup (3 locales)', 'Localization engineering စနစ်တည်ဆောက်မှု (၃ ဘာသာ)', 'ตั้งระบบ localization (3 ภาษา)'],
    usd: 3800,
    unit: 'engagement',
  },
  {
    name: ['On-site day (Myanmar / Thailand)', 'နေရာတွင်း တစ်ရက် (မြန်မာ / ထိုင်း)', 'ทำงานออนไซต์รายวัน (เมียนมา / ไทย)'],
    usd: 1400,
    unit: 'day',
  },
]

/* ---------------------------------------------------------------- open source */

export const ossProjects = [
  {
    name: 'compose-motion-lab',
    role: 'Author & maintainer',
    desc: 'Physics-based motion primitives, shared-element helpers and a frame-budget debug overlay for Jetpack Compose.',
    stars: 2114,
    forks: 138,
    language: 'Kotlin',
    license: 'Apache-2.0',
  },
  {
    name: 'kmp-money',
    role: 'Author & maintainer',
    desc: 'Allocation-safe money and currency types for Kotlin Multiplatform, with locale-aware formatting for MMK, THB and 140 other currencies.',
    stars: 864,
    forks: 61,
    language: 'Kotlin',
    license: 'MIT',
  },
  {
    name: 'zawgyi-unicode-kt',
    role: 'Author',
    desc: 'Fast Burmese encoding detection and Zawgyi→Unicode conversion with zero allocations on the hot path.',
    stars: 512,
    forks: 44,
    language: 'Kotlin',
    license: 'MIT',
  },
  {
    name: 'androidx (Compose)',
    role: 'Contributor',
    desc: 'Patches to Compose Foundation lazy layout prefetch behaviour and documentation for baseline profile generation.',
    stars: 0,
    forks: 0,
    language: 'Kotlin',
    license: 'Apache-2.0',
  },
  {
    name: 'gradle-module-graph',
    role: 'Contributor',
    desc: 'Gradle plugin that renders and lints module dependency graphs; added ownership annotations and CI failure modes.',
    stars: 397,
    forks: 33,
    language: 'Kotlin',
    license: 'Apache-2.0',
  },
  {
    name: 'a11y-lint-android',
    role: 'Author',
    desc: 'Custom lint rules that fail the build on missing content descriptions, sub-48dp targets and low-contrast token pairs.',
    stars: 286,
    forks: 21,
    language: 'Kotlin',
    license: 'Apache-2.0',
  },
]

export const githubStats = {
  contributionsYear: 1842,
  currentStreak: 46,
  longestStreak: 168,
  prsMerged: 412,
  issuesClosed: 297,
  reviews: 1104,
  languages: [
    { name: 'Kotlin', pct: 71, color: '#22e0f5' },
    { name: 'Java', pct: 9, color: '#4c86ff' },
    { name: 'Python', pct: 8, color: '#9a6bff' },
    { name: 'TypeScript', pct: 5, color: '#c8ff4d' },
    { name: 'Shell / Groovy', pct: 7, color: '#6b7f9e' },
  ],
  recent: [
    { repo: 'compose-motion-lab', type: 'release', text: 'Released v1.4.0 — shared-element bounds transform', when: '2 days ago' },
    { repo: 'kmp-money', type: 'pr', text: 'Merged #212 — MMK formatting for narrow symbol display', when: '4 days ago' },
    { repo: 'borderpay/android', type: 'review', text: 'Reviewed 6 pull requests in the payments module', when: '5 days ago' },
    { repo: 'a11y-lint-android', type: 'issue', text: 'Closed #88 — false positive on decorative images', when: '1 week ago' },
    { repo: 'androidx', type: 'pr', text: 'Opened patch for LazyLayout prefetch scheduling', when: '2 weeks ago' },
    { repo: 'zawgyi-unicode-kt', type: 'release', text: 'Released v0.9.2 — 18% faster detection path', when: '3 weeks ago' },
  ],
}

/* ------------------------------------------------------------------ writing */

export const posts = [
  {
    slug: 'frame-budget',
    title: 'Write the frame budget down before you optimise anything',
    date: '2026-01-18',
    read: 9,
    tag: 'Performance',
    excerpt:
      'Most Compose performance work fails because nobody agreed on the target. Here is the one-page budget document I bring to every engagement, and how it changes code review.',
  },
  {
    slug: 'module-boundaries',
    title: 'Module boundaries are social contracts',
    date: '2025-11-04',
    read: 12,
    tag: 'Architecture',
    excerpt:
      'A Gradle module is not an organisational unit until someone owns it. On ownership annotations, dependency lint rules, and how to make boundaries survive a reorg.',
  },
  {
    slug: 'offline-is-a-feature',
    title: 'Offline is a feature, not a fallback',
    date: '2025-08-22',
    read: 11,
    tag: 'Architecture',
    excerpt:
      'Modelling four connectivity postures in the domain layer, and why an honest "pending" state beats an optimistic lie every single time.',
  },
  {
    slug: 'burmese-layouts',
    title: 'Your layout does not work until it works in Burmese',
    date: '2025-06-09',
    read: 8,
    tag: 'Localization',
    excerpt:
      'Burmese strings run 40% longer than English, Thai has no word spacing, and both break naive Compose layouts. A practical CI recipe for catching it early.',
  },
  {
    slug: 'three-currencies',
    title: 'Money is an integer: MMK, THB and USD in one domain model',
    date: '2025-04-14',
    read: 10,
    tag: 'Architecture',
    excerpt:
      'Minor units, per-currency rounding, signed FX quotes with expiry, and the allocation bug that cost a client three days of reconciliation.',
  },
  {
    slug: 'release-train',
    title: 'The weekly release train that nobody has to drive',
    date: '2025-03-30',
    read: 14,
    tag: 'Delivery',
    excerpt:
      'Trunk-based development, feature flags, staged rollout, automated halt rules — and the cultural changes that matter more than any of the tooling.',
  },
]

export const talks = [
  {
    title: 'Frame budgets: making Compose performance a team sport',
    event: 'Droidcon Bangkok',
    year: '2025',
    type: 'Conference talk',
    length: '38 min',
    desc: 'How to turn subjective "it feels laggy" reports into a CI-enforced contract, with live Perfetto traces from a production transit app.',
  },
  {
    title: 'Modularising a payments app without stopping the roadmap',
    event: 'Android Worldwide',
    year: '2025',
    type: 'Conference talk',
    length: '30 min',
    desc: 'The strangler-fig pattern applied to a 310k-line monolith, and the organisational agreements that made it possible.',
  },
  {
    title: 'Burmese, Thai, English: localization as engineering',
    event: 'Yangon Android Meetup',
    year: '2024',
    type: 'Community talk',
    length: '25 min',
    desc: 'Encoding migration, pseudo-locale screenshot testing, and layout resilience for scripts that behave nothing like Latin.',
  },
  {
    title: 'Offline-first for real networks',
    event: 'E-4Skills Open Workshop',
    year: '2024',
    type: 'Workshop',
    length: '3 hrs',
    desc: 'Hands-on session building an idempotent sync queue with Room and WorkManager, including conflict resolution strategies.',
  },
  {
    title: 'Reading a Perfetto trace without fear',
    event: 'Android Broadcast (podcast)',
    year: '2023',
    type: 'Podcast',
    length: '52 min',
    desc: 'A guided tour of the traces that actually matter for startup and scroll performance.',
  },
]

export const awards = [
  {
    name: 'Google Play Best Apps — Editors\' Choice (regional)',
    org: 'Google Play',
    year: '2025',
    detail: 'TransitFlow recognised for accessibility and offline resilience in the regional editorial selection.',
  },
  {
    name: 'Kotlin Community Contributor',
    org: 'JetBrains',
    year: '2024',
    detail: 'Recognised for open-source contributions to Kotlin Multiplatform tooling and community education across Southeast Asia.',
  },
  {
    name: 'Fintech Product of the Year — Engineering',
    org: 'SEA Fintech Awards',
    year: '2025',
    detail: 'BorderPay cited for release engineering practice and measurable reliability improvements.',
  },
  {
    name: 'Digital Inclusion Award',
    org: 'Myanmar Tech Association',
    year: '2023',
    detail: 'Clinic Companion recognised for accessibility and low-end device support in rural healthcare.',
  },
  {
    name: 'Speaker of the Year (community vote)',
    org: 'Droidcon Bangkok',
    year: '2025',
    detail: 'Highest-rated technical session across the two-day programme.',
  },
]

export const labs = [
  {
    name: 'Predictive back choreography',
    status: 'Active',
    desc: 'Exploring gesture-driven shared-element choreography with predictive back, targeting a single motion spec that degrades gracefully to API 33.',
    tags: ['Compose', 'Motion'],
  },
  {
    name: 'On-device receipt parsing',
    status: 'Active',
    desc: 'ML Kit plus a small custom model for extracting structured line items from crumpled market receipts, entirely offline, under 8MB.',
    tags: ['ML Kit', 'Computer vision'],
  },
  {
    name: 'Gradle module graph budget',
    status: 'Shipped',
    desc: 'A CI check that fails when a module gains a dependency crossing a declared architectural boundary. Now part of gradle-module-graph.',
    tags: ['Gradle', 'Tooling'],
  },
  {
    name: 'Compose for Wear glanceability study',
    status: 'Paused',
    desc: 'Measuring time-to-comprehension for payment glances at three complication densities. Interesting data, no product need yet.',
    tags: ['Wear OS', 'Research'],
  },
  {
    name: 'Burmese text shaping benchmark',
    status: 'Shipped',
    desc: 'A benchmark harness comparing text-shaping cost for Burmese, Thai and Latin in Compose text. Findings fed into zawgyi-unicode-kt.',
    tags: ['i18n', 'Performance'],
  },
  {
    name: 'Zero-jank list prefetch',
    status: 'Active',
    desc: 'Adaptive prefetch distance for LazyColumn based on measured fling velocity and device tier. Early results: 30% fewer dropped frames on low-tier.',
    tags: ['Compose', 'Performance'],
  },
]

export const faqs: { q: LocalizedText; a: LocalizedText; group: string }[] = [
  {
    group: 'Engagement',
    q: ['How do we start working together?', 'ဘယ်လိုစတင် ပူးပေါင်းရမလဲ?', 'เราจะเริ่มทำงานร่วมกันอย่างไร'],
    a: [
      'A 30-minute call about your product, constraints and timeline. If it is a fit, I send a short proposal with scope, price and start date within two business days. No sales process, no discovery deck.',
      'သင့်ထုတ်ကုန်၊ အခက်အခဲနှင့် အချိန်ဇယားအကြောင်း မိနစ် ၃၀ ဆွေးနွေးပါ။ ကိုက်ညီပါက အလုပ်နယ်ပယ်၊ စျေးနှုန်းနှင့် စတင်မည့်ရက်ပါသော အဆိုပြုချက်တိုကို လုပ်ငန်းရက် နှစ်ရက်အတွင်း ပေးပို့ပါမည်။',
      'เริ่มด้วยการคุย 30 นาทีเกี่ยวกับผลิตภัณฑ์ ข้อจำกัด และไทม์ไลน์ หากเหมาะสม ผมจะส่งข้อเสนอสั้น ๆ พร้อมขอบเขต ราคา และวันเริ่มงานภายในสองวันทำการ',
    ],
  },
  {
    group: 'Engagement',
    q: ['Do you work with existing teams or replace them?', 'ရှိပြီးသားအဖွဲ့နှင့် အတူလုပ်သလား၊ အစားထိုးသလား?', 'คุณทำงานร่วมกับทีมเดิมหรือมาแทนที่'],
    a: [
      'Always with. My value is highest when your engineers review my pull requests and inherit the system. I write ADRs, run walkthroughs, and deliberately make myself unnecessary.',
      'အမြဲတမ်း အတူတကွ လုပ်ဆောင်ပါသည်။ သင့်အင်ဂျင်နီယာများက ကျွန်ုပ်၏ pull request များကို review လုပ်ပြီး စနစ်ကို ဆက်ခံသည့်အခါ တန်ဖိုးအမြင့်ဆုံးဖြစ်သည်။ ADR များရေးသား၊ ရှင်းလင်းပွဲများပြုလုပ်ပြီး ကျွန်ုပ်မလိုအပ်တော့အောင် ရည်ရွယ်ချက်ရှိရှိ လုပ်ဆောင်ပါသည်။',
      'ทำงานร่วมกันเสมอ คุณค่าของผมสูงสุดเมื่อวิศวกรของคุณรีวิว PR ของผมและรับช่วงระบบต่อ ผมเขียน ADR จัดเซสชันอธิบาย และตั้งใจทำให้ตัวเองไม่จำเป็นในที่สุด',
    ],
  },
  {
    group: 'Technical',
    q: ['Do you do iOS as well?', 'iOS လည်း လုပ်ပေးသလား?', 'ทำ iOS ด้วยไหม'],
    a: [
      'I architect shared logic in Kotlin Multiplatform and review Swift, but I do not claim to be a senior iOS engineer. For iOS-heavy work I bring in a trusted partner and stay accountable for the shared layer.',
      'Kotlin Multiplatform ဖြင့် မျှဝေအသုံးပြုသော logic ကို ဒီဇိုင်းဆွဲပြီး Swift ကို review လုပ်နိုင်သော်လည်း အဆင့်မြင့် iOS အင်ဂျင်နီယာဟု မဆိုလိုပါ။ iOS အလေးထားသောလုပ်ငန်းများအတွက် ယုံကြည်ရသော partner ကိုခေါ်ပြီး shared layer အတွက် တာဝန်ယူပါသည်။',
      'ผมออกแบบลอจิกร่วมด้วย Kotlin Multiplatform และรีวิว Swift ได้ แต่ไม่ได้อ้างว่าเป็นวิศวกร iOS ระดับซีเนียร์ หากงานเน้น iOS ผมจะพาพาร์ตเนอร์ที่ไว้ใจได้เข้ามาและรับผิดชอบชั้นที่ใช้ร่วมกัน',
    ],
  },
  {
    group: 'Technical',
    q: ['What is your position on cross-platform frameworks?', 'Cross-platform framework များအပေါ် သဘောထားက?', 'มองเฟรมเวิร์กข้ามแพลตฟอร์มอย่างไร'],
    a: [
      'Share logic, not UI. Kotlin Multiplatform for domain and data, native UI on each platform. If a product genuinely needs a single UI codebase and can accept the platform-fidelity cost, I will say so honestly rather than sell you Android work.',
      'Logic ကို မျှဝေပါ၊ UI ကို မမျှဝေပါနှင့်။ Domain နှင့် data အတွက် Kotlin Multiplatform၊ platform တစ်ခုချင်းစီအတွက် native UI။ ထုတ်ကုန်တစ်ခုသည် UI codebase တစ်ခုတည်း တကယ်လိုအပ်ပါက ရိုးသားစွာ အကြံပြုပါမည်။',
      'แชร์ลอจิก ไม่แชร์ UI ใช้ Kotlin Multiplatform สำหรับโดเมนและข้อมูล และ UI เนทีฟในแต่ละแพลตฟอร์ม หากผลิตภัณฑ์ต้องการ UI ชุดเดียวจริง ๆ ผมจะบอกตรง ๆ แทนที่จะขายงาน Android',
    ],
  },
  {
    group: 'Commercial',
    q: ['Which currencies can you invoice in?', 'ဘယ်ငွေကြေးဖြင့် ငွေတောင်းခံနိုင်သလဲ?', 'ออกใบแจ้งหนี้เป็นสกุลเงินใดได้บ้าง'],
    a: [
      'USD, THB and MMK. Rates are fixed at contract signing so exchange movement is my risk, not yours. Payment terms are 50% on start and 50% on delivery for fixed-scope work; monthly in arrears for retainers.',
      'USD, THB နှင့် MMK။ ငွေလဲနှုန်းကို စာချုပ်ချုပ်ဆိုချိန်တွင် သတ်မှတ်သဖြင့် နှုန်းအတက်အကျအန္တရာယ်ကို ကျွန်ုပ်ကခံပါသည်။ သတ်မှတ်နယ်ပယ်လုပ်ငန်းများအတွက် စတင်ချိန် ၅၀%၊ ပို့ဆောင်ချိန် ၅၀%။ Retainer များအတွက် လစဉ်နောက်ဆက်တွဲ ပေးချေမှု။',
      'USD, THB และ MMK อัตราแลกเปลี่ยนถูกตรึงตอนเซ็นสัญญา ความเสี่ยงค่าเงินเป็นของผม ไม่ใช่ของคุณ เงื่อนไข: งานขอบเขตคงที่จ่าย 50% เมื่อเริ่ม และ 50% เมื่อส่งมอบ ส่วน retainer ชำระรายเดือน',
    ],
  },
  {
    group: 'Commercial',
    q: ['Are you available for full-time roles?', 'အချိန်ပြည့် ရာထူးများအတွက် အဆင်ပြေပါသလား?', 'รับงานประจำเต็มเวลาไหม'],
    a: [
      'For the right team, yes — senior, staff or principal Android roles with real architecture ownership. Remote-first, with Bangkok and Chiang Mai reachable for on-site cycles. I am not looking for pure people-management tracks.',
      'သင့်တော်သောအဖွဲ့အတွက် ဟုတ်ကဲ့ — ဗိသုကာတာဝန်အစစ်အမှန်ပါသည့် senior, staff သို့မဟုတ် principal Android ရာထူးများ။ Remote ဦးစားပေးပြီး ဘန်ကောက်နှင့် ချင်းမိုင်သို့ on-site သွားနိုင်သည်။ လူစီမံခန့်ခွဲမှုသက်သက် လမ်းကြောင်းကို မရှာဖွေပါ။',
      'สำหรับทีมที่ใช่ ใช่ครับ — ตำแหน่ง senior, staff หรือ principal Android ที่ได้เป็นเจ้าของสถาปัตยกรรมจริง ทำงานรีโมตเป็นหลัก และเดินทางไปกรุงเทพฯ หรือเชียงใหม่ได้ ผมไม่ได้มองหาสายบริหารคนล้วน ๆ',
    ],
  },
  {
    group: 'Working style',
    q: ['How do you handle timezone differences?', 'အချိန်ဇုန်ကွာခြားမှုကို ဘယ်လိုကိုင်တွယ်သလဲ?', 'จัดการเรื่องโซนเวลาอย่างไร'],
    a: [
      'I work from Tachileik on MMT (UTC+6:30), with full overlap for APAC teams and a guaranteed four-hour overlap for European teams. Everything important is written down, so timezone becomes a scheduling detail rather than a dependency.',
      'တာချီလိတ်မှ MMT (UTC+6:30) အချိန်ဇုန်ဖြင့် အလုပ်လုပ်ပါသည်။ APAC အဖွဲ့များနှင့် အပြည့်အဝ ထပ်နေပြီး ဥရောပအဖွဲ့များအတွက် လေးနာရီ ထပ်နေမှုကို အာမခံပါသည်။ အရေးကြီးသည့်အရာအားလုံးကို စာဖြင့်ရေးမှတ်ထားပါသည်။',
      'ผมทำงานจากท่าขี้เหล็กตามเวลา MMT (UTC+6:30) ทับซ้อนเต็มกับทีม APAC และรับประกันสี่ชั่วโมงกับทีมยุโรป ทุกเรื่องสำคัญถูกบันทึกเป็นลายลักษณ์อักษร',
    ],
  },
  {
    group: 'Working style',
    q: ['What do you need from us to be effective?', 'ထိရောက်စွာလုပ်ဆောင်ရန် ကျွန်ုပ်တို့ထံမှ ဘာလိုအပ်သလဲ?', 'คุณต้องการอะไรจากเราเพื่อให้ทำงานได้ผล'],
    a: [
      'Repository access on day one, a named product decision-maker, and permission to say no to scope that will damage the release. That is genuinely the whole list.',
      'ပထမနေ့တွင် repository ဝင်ရောက်ခွင့်၊ ဆုံးဖြတ်ချက်ချနိုင်သည့် ထုတ်ကုန်တာဝန်ခံတစ်ဦးနှင့် release ကို ထိခိုက်စေမည့် scope ကို ငြင်းဆိုခွင့်။ ဤသည်သာ လိုအပ်ချက်အားလုံးဖြစ်သည်။',
      'สิทธิ์เข้าถึง repository ตั้งแต่วันแรก ผู้ตัดสินใจด้านผลิตภัณฑ์ที่ระบุตัวได้ และอนุญาตให้ผมปฏิเสธขอบเขตงานที่จะทำให้การปล่อยเวอร์ชันเสียหาย เท่านี้จริง ๆ',
    ],
  },
]

export const mentorshipTracks = [
  {
    name: 'Mid → Senior Android',
    length: '12 weeks',
    format: 'Fortnightly 60-min 1:1 + async review',
    seats: '3 seats per cohort',
    desc: 'Architecture reasoning, code review skill, technical writing, and the judgement to know which battle matters. We work on your real codebase, not exercises.',
    outcomes: [
      'Own a module end-to-end, including its ADR',
      'Run a design review and defend a trade-off',
      'Write a performance investigation others can follow',
    ],
  },
  {
    name: 'Compose performance intensive',
    length: '4 weeks',
    format: 'Weekly 90-min workshop, small group',
    seats: '8 seats',
    desc: 'From recomposition counting to Perfetto traces and baseline profiles. You bring a laggy screen; you leave with a measured, budgeted fix.',
    outcomes: [
      'Read a Perfetto trace without guessing',
      'Set and enforce a frame budget in CI',
      'Ship baseline profiles with confidence',
    ],
  },
  {
    name: 'E-4Skills career clinic',
    length: 'Single session',
    format: '90 minutes, one-off',
    seats: 'Rolling',
    desc: 'System design practice for mobile roles, portfolio review, and honest feedback on where your level actually sits in the international market.',
    outcomes: [
      'A mobile system design you can defend',
      'A CV that survives a senior screen',
      'A specific, prioritised improvement list',
    ],
  },
]

export const mentorshipStats = [
  { k: '180+', v: 'engineers trained' },
  { k: '11', v: 'promoted to senior' },
  { k: '3', v: 'cohorts per year' },
  { k: 'Free', v: 'for Myanmar-based juniors' },
]
