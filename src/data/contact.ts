// ปรับ/เพิ่มเฉพาะ field ใหม่ได้ตามต้องการ
export const CONTACT = {
  email: 'donlawatlaw@gmail.com',
  phone: '085-0005009',
  lineOfficial: '@dlaw',
  serviceArea: 'ทั่วราชอาณาจักร',
  address: 'สำนักกฎหมายดลวัฒน์และเพื่อน 100/15 ถนนไทยรามัญ แขวงสามวาตะวันตก เขตคลองสามวา กรุงเทพมหานคร 10510',
  mapEmbed: 'https://www.google.com/maps?q=สำนักกฎหมายดลวัฒน์และเพื่อน%20100/64%20ถนนสามวาตะวันตก%20เขตคลองสามวา%20กรุงเทพมหานคร%2010510&hl=th&z=16&output=embed', // ลิงก์ embed แผนที่ (ถ้ามี)
  mapOpen: 'https://www.google.com/maps/search/?api=1&query=สำนักกฎหมายดลวัฒน์และเพื่อน%20100/64%20ถนนสามวาตะวันตก%20เขตคลองสามวา%20กรุงเทพมหานคร%2010510',
  officeHours: 'ทุกวัน 09:00–18:00 (ยืดหยุ่นนัดพิเศษได้)',
  responseSLA: 'ตอบกลับภายใน 24 ชม.',

  // ✅ เพิ่มรูปหน้าออฟฟิศ (ใส่ได้หลายรูป)
  // ให้วางไฟล์จริงใน /public/images/office/
  officePhotos: [
    '/images/office/front-1.jpg',
	'/images/office/front-3.jpg',
    '/images/office/front-2.jpg',
  ],

  // ✅ เพิ่มเพจ Facebook ได้หลายอัน
  facebookPages: [
    { label: 'Facebook เพจ 1', url: 'https://www.facebook.com/share/16ovZPBAUX/?mibextid=wwXIfr' },
    { label: 'Facebook เพจ 2', url: 'https://www.facebook.com/share/16NKkMCHjr/?mibextid=wwXIfr' },
  ],
} as const;
