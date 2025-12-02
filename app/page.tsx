import { Hero } from '@/components/hero'
import { PricingTiers } from '@/components/pricing-tiers'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { Navigation } from '@/components/navigation'
import { TrafficProblem } from '@/components/traffic-problem'
import { UseCases } from '@/components/use-cases'
import { SafetyFeatures } from '@/components/safety-features'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TrafficProblem />
      <Features />
      <UseCases />
      <SafetyFeatures />
      <PricingTiers />
      <HowItWorks />
      <Footer />
    </main>
  )
}
