export type Review = {
  id: string;
  nameMasked: string;      // ชื่อที่ปกปิด เช่น "คุณ เจ.*"
  initials: string;        // ตัวอักษรย่อสำหรับ avatar วงกลม
  content: string;         // เนื้อหารีวิว
  rating: 1 | 2 | 3 | 4 | 5;
  caseType?: string;       // ประเภทคดี/งาน (optional)
  date?: string;           // YYYY-MM-DD (optional)
  source?: 'โทรศัพท์' | 'LINE' | 'อีเมล' | 'ฟอร์มเว็บไซต์';
  verified?: boolean;      // ติด badge “ยืนยันแล้ว”
};

// ✏️ ปรับข้อความ/เพิ่มรีวิวได้ที่นี่ตามจริง
export const REVIEWS: Review[] = [
  {
    id: 'r1',
    nameMasked: 'คุณ เจ.*',
    initials: '',
    content: 'ติดตามงานต่อเนื่อง ไม่ทิ้งลูกความ',
    caseType: 'คดีแพ่ง',
    date: '2025-10-03',
    source: 'LINE',
    verified: true,
  },
  {
    id: 'r2',
    nameMasked: 'คุณ เอ.*',
    initials: '',
    content: 'ให้คำปรึกษาชัดเจน ตรงประเด็นมาก ๆ ค่ะ',
    caseType: 'ปรึกษากฎหมายธุรกิจ',
    date: '2025-10-02',
    source: 'ฟอร์มเว็บไซต์',
    verified: true,
  },
  {
    id: 'r3',
    nameMasked: 'คุณ บี.*',
    initials: '',
    content: 'ดำเนินงานรวดเร็ว มืออาชีพสุด ๆ',
    caseType: 'แรงงาน',
    date: '2025-09-28',
    source: 'โทรศัพท์',
    verified: true,
  },
  {
    id: 'r4',
    nameMasked: 'คุณ ซี.*',
    initials: '',
    content: 'อธิบายขั้นตอนละเอียด เข้าใจง่าย',
    caseType: 'อาญา',
    date: '2025-09-26',
    source: 'อีเมล',
  },
  {
    id: 'r5',
    nameMasked: 'คุณ แอล.*',
    initials: '',
    content: 'แนะนำแนวทางที่ดีที่สุดให้เรา',
    caseType: 'ครอบครัว',
    date: '2025-09-25',
    source: 'LINE',
  },
  {
    id: 'r6',
    nameMasked: 'คุณ เอ็ม.*',
    initials: '',
    content: 'ประสานงานศาลได้เป็นระบบ',
    caseType: 'บังคับคดี',
    date: '2025-09-22',
    source: 'โทรศัพท์',
  },
  {
    id: 'r7',
    nameMasked: 'คุณ เอ็น.*',
    initials: '',
    content: 'ละเอียดรอบคอบ แก้ปัญหาได้จริง',
    caseType: 'ผู้บริโภค',
    date: '2025-09-20',
    source: 'ฟอร์มเว็บไซต์',
  },
  {
    id: 'r8',
    nameMasked: 'คุณ โอ.*',
    initials: '',
    content: 'ให้ข้อมูลสิทธิทางกฎหมายครบถ้วน',
    caseType: 'ต่างชาติ',
    date: '2025-09-18',
    source: 'LINE',
  },
];

// ใช้คำนวณค่าเฉลี่ยเพื่อ schema.org
export function getAverageRating() {
  if (!REVIEWS.length) return 0;
  return Math.round(
    (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length) * 10
  ) / 10;
}
