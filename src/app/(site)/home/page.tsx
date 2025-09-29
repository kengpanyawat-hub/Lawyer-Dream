import Hero from '@/components/sections/Hero'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ExpertiseGrid from '@/components/sections/ExpertiseGrid'
import LawGrid from '@/components/sections/LawGrid'
import ItemsGrid from '@/components/sections/ItemsGrid'
import { BLOG_ITEMS } from '@/data/blog'
import { PORTFOLIO_ITEMS } from '@/data/portfolio'
import Card from '@/components/ui/Card'
import { ButtonLink } from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import Reviews from '@/components/sections/Reviews'

export default function HomePage(){
  return (
    <div className="space-y-12 md:space-y-14">
      <Hero />

      <Section title="บริการของเรา" action={<ButtonLink href="/services" variant="outline">ดูทั้งหมด</ButtonLink>}>
        <ServicesGrid />
      </Section>

      <Section title="ความเชี่ยวชาญ" action={<ButtonLink href="/expertise" variant="outline">ดูทั้งหมด</ButtonLink>}>
        <ExpertiseGrid />
      </Section>
	  
	  <Section title="ผลงานของเรา" action={<ButtonLink href="/portfolio" variant="outline">ดูทั้งหมด</ButtonLink>}>
        <ItemsGrid items={PORTFOLIO_ITEMS.slice(0,6) as any} kind="portfolio" />
      </Section>

      <Section title="กฎหมายที่ควรรู้" action={<ButtonLink href="/law" variant="outline">ดูทั้งหมด</ButtonLink>}>
        <LawGrid />
      </Section>

      <Section title="บทความล่าสุด" action={<ButtonLink href="/blog" variant="outline">ดูทั้งหมด</ButtonLink>}>
        <ItemsGrid items={BLOG_ITEMS.slice(0,6) as any} kind="blog" />
      </Section>

      
		<Section title="รีวิวจากลูกค้า">
		  <Reviews />
		</Section>
      <Card className="text-center rounded-3xl">
        <h3 className="text-xl font-semibold">พร้อมรับคำปรึกษา</h3>
        <p className="mt-2 text-slate-700">ติดต่อเราได้ตลอด 24 ชั่วโมง เพื่อรับคำปรึกษาเบื้องต้นฟรี</p>
        <div className="mt-4 flex justify-center gap-3">
          <ButtonLink href="/contact">โทร/ไลน์/อีเมล</ButtonLink>
		  
        </div>
      </Card>
    </div>
  )
}
