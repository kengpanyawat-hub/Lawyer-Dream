// src/config/contact.ts
export type ContactConfig = {
  email: string;
  phone: string;            // เช่น '085-0005009'
  lineOfficial: string;     // เช่น '@128rwwqd'
  serviceArea: string;      // เช่น 'ทั่วราชอาณาจักร'
  address: string;          // ที่อยู่สำนักงาน
  mapEmbed?: string;        // iframe-src ของ Google Maps (ถ้ามี)
  mapOpen?: string;         // ลิงก์เปิด Google Maps
  officeHours?: string;     // <-- เพิ่มฟิลด์นี้
  responseSLA?: string;     // <-- และฟิลด์นี้
};

// แก้ค่าด้านล่างให้ตรงกับของจริง
export const CONTACT: ContactConfig = {
  email: 'donlawatlaw@gmail.com',
  phone: '085-0005009',
  lineOfficial: '@128rwwqd',
  serviceArea: 'ทั่วราชอาณาจักร',
  address:
    'สำนักกฎหมายดลวัฒน์และเพื่อน 100/64 ถนนสามวาตะวันตก เขตคลองสามวา กรุงเทพมหานคร 10510',

  // ใช้ลิงก์แชร์ที่ให้มาก่อนหน้านี้
  mapOpen: 'https://share.google/1G8sdiSTPOn84jU74',

  // ถ้ามี src ของ iframe map ให้ใส่ตรงนี้ (หรือปล่อยว่างได้)
  mapEmbed:
    'https://www.google.com/maps?q=13.853466,100.728149&z=16&output=embed',

  // เพิ่มฟิลด์ใหม่
  officeHours: 'ทุกวัน 09:00–18:00 (นัดพิเศษนอกเวลาได้)',
  responseSLA: 'ตอบกลับภายใน 24 ชม.',
};
