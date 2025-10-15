// ไม่ใส่ "use client" — ใช้ฝั่งเซิร์ฟเวอร์
import { redirect } from 'next/navigation';

export default function Root() {
  redirect('/home');
}
