// src/config/contact.ts
export type ContactConfig = {
  email: string;
  phone: string;
  lineOfficial: string;
  serviceArea: string;
  address: string;
  mapEmbed?: string;
  mapOpen?: string;
  officeHours?: string;   // เพิ่ม
  responseSLA?: string;   // เพิ่ม
};

export const CONTACT: ContactConfig = {
  email: 'donlawatlaw@gmail.com',
  phone: '085-0005009',
  lineOfficial: '@128rwwqd',
  serviceArea: 'ทั่วราชอาณาจักร',
  address:
    'สำนักกฎหมายดลวัฒน์และเพื่อน 100/64 ถนนสามวาตะวันตก เขตคลองสามวา กรุงเทพมหานคร 10510',
  mapOpen: 'https://share.google/1G8sdiSTPOn84jU74',
  mapEmbed:
    'https://www.google.com/maps?q=13.853466,100.728149&z=16&output=embed',
  officeHours: 'ทุกวัน 09:00–18:00 (นัดพิเศษนอกเวลาได้)',
  responseSLA: 'ตอบกลับภายใน 24 ชม.',
};
