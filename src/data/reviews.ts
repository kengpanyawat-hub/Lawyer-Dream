// src/data/reviews.ts
export type Review = {
  id: string
  nameMasked: string            // ชื่อย่อ/ปิดบางตัวอักษร
  initials: string              // ตัวอักษรย่อสำหรับอะวาตาร์
  content: string               // เนื้อหาความเห็น
  caseType: string              // ประเภทงาน/คดี
  date: string                  // YYYY-MM-DD
  source: 'LINE' | 'Facebook' | 'Google' | 'Phone' | 'Email' | 'Walk-in'
  verified: boolean             // แสดง badge ยืนยัน
  rating: 1 | 2 | 3 | 4 | 5     // ⭐️ คะแนนรีวิว (จำเป็น)
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    nameMasked: 'คุณธนวรรณ ผ่องรักษา',
    initials: 'NJ',
    content:
      'ให้คำแนะนำชัดเจนและเป็นขั้นตอน ติดต่อรวดเร็วมาก ทำให้เรื่องที่กังวลใจคลี่คลาย ขอบคุณทีมทนายมากค่ะ',
    caseType: 'คดีผู้บริโภค',
    date: '2025-01-28',
    source: 'LINE',
    verified: true,
    rating: 5,
  },
  {
    id: 'r2',
    nameMasked: 'คุณเจนจิรา วิชยประเสริฐกุล',
    initials: 'S',
    content:
      'ช่วยตรวจสัญญาและปรับแก้ให้กระชับ เข้าใจง่าย ใช้เจรจาได้จริง งานเร็วและมืออาชีพ',
    caseType: 'สัญญาธุรกิจ',
    date: '2025-02-03',
    source: 'Email',
    verified: true,
    rating: 5,
  },
  {
    id: 'r3',
    nameMasked: 'คุณกิตติเดช สิงห์ขาว',
    initials: 'A',
    content:
      'อธิบายสิทธิและขั้นตอนคดีชัดเจนมาก ค่าบริการโปร่งใส นัดหมายสะดวกครับ',
    caseType: 'อาญา',
    date: '2025-02-10',
    source: 'Phone',
    verified: true,
    rating: 4,
  },
  {
    id: 'r4',
    nameMasked: 'คุณชลาธิป สุขทิพย์',
    initials: 'P',
    content:
      'ช่วยติดตามเงินคืนสำเร็จตามคำพิพากษา ใช้เวลาพอสมควรแต่ได้ครบ ขอบคุณค่ะ',
    caseType: 'บังคับคดี/ยึดทรัพย์',
    date: '2025-01-12',
    source: 'Facebook',
    verified: true,
    rating: 5,
  },
  {
    id: 'r5',
    nameMasked: 'คุณพรพินิต กาญจนอาคม',
    initials: 'K',
    content:
      'ให้ทางเลือกหลายแนวทางและแนะนำข้อควรระวังละเอียดดี ประทับใจการติดตามผล',
    caseType: 'แรงงาน',
    date: '2024-12-20',
    source: 'Google',
    verified: true,
    rating: 4,
  },
]
