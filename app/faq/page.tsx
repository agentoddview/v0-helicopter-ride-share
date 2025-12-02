'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'How does SkyFleet work?',
          a: 'SkyFleet operates like Uber for helicopters. Choose your pickup and destination, select your helicopter type, and book instantly. Our pilots will meet you at the designated helipad for your scheduled flight.'
        },
        {
          q: 'What cities do you serve?',
          a: 'Currently, we serve Seattle and surrounding areas. Beginner tier members can access 8 Seattle locations, Premium members add Tacoma and Everett, Pro members can fly to Portland and Vancouver, and Enterprise members have access to West Coast destinations including San Francisco and Los Angeles.'
        },
        {
          q: 'Is it safe?',
          a: 'Absolutely. All our pilots are FAA certified with extensive flight hours. Our helicopters undergo rigorous maintenance checks, and we use advanced weather monitoring systems. Safety is our top priority.'
        }
      ]
    },
    {
      category: 'Membership & Pricing',
      questions: [
        {
          q: 'What membership tiers are available?',
          a: 'We offer four tiers: Beginner ($20/month, 10-mile range, $5/min), Premium ($40/month, 25-mile range, $3/min), Pro ($200/month, 50-mile range, $2.5/min), and Enterprise (custom pricing, up to 250 miles).'
        },
        {
          q: 'Can I change my membership tier?',
          a: 'Yes! You can upgrade or downgrade your membership at any time from your account settings. Changes take effect at the start of your next billing cycle.'
        },
        {
          q: 'Are there any hidden fees?',
          a: 'No hidden fees. Your membership includes the monthly subscription and per-minute flight charges. Additional passengers cost extra based on your tier. All costs are clearly displayed before booking.'
        },
        {
          q: 'How much do extra passengers cost?',
          a: 'Extra passenger fees vary by tier: Beginner +$150, Premium +$100, Pro +$75, Enterprise includes multiple passengers.'
        }
      ]
    },
    {
      category: 'Booking & Flights',
      questions: [
        {
          q: 'How do I book a flight?',
          a: 'Sign up for a membership, select your pickup and destination locations, choose your helicopter type, pick a pilot, and confirm your booking. You can book immediately or schedule for later.'
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Yes, you can cancel up to 24 hours before your scheduled flight for a full refund. Cancellations within 24 hours are subject to a 50% cancellation fee.'
        },
        {
          q: 'What if weather conditions are bad?',
          a: 'Safety first. If weather conditions are unsafe, we will notify you and reschedule your flight at no additional cost. You can also reschedule voluntarily if you are concerned about weather.'
        },
        {
          q: 'Can I bring luggage?',
          a: 'Yes, each passenger can bring one carry-on bag (up to 25 lbs). Larger helicopters have more cargo capacity. Contact us for special cargo requirements.'
        }
      ]
    },
    {
      category: 'Pilots & Safety',
      questions: [
        {
          q: 'Are your pilots certified?',
          a: 'All SkyFleet pilots hold FAA Commercial Pilot Licenses with Rotorcraft-Helicopter ratings, minimum 1,500 flight hours, and clean safety records. Many have military or corporate aviation backgrounds.'
        },
        {
          q: 'Can I choose my pilot?',
          a: 'Yes! During booking, you can view available pilots with their ratings, experience, and passenger reviews. Select your preferred pilot based on their profile.'
        },
        {
          q: 'How are helicopters maintained?',
          a: 'Our fleet undergoes daily pre-flight inspections and follows strict FAA maintenance schedules. All helicopters are serviced by certified mechanics and undergo regular comprehensive overhauls.'
        }
      ]
    },
    {
      category: 'Account & Support',
      questions: [
        {
          q: 'How do I update my account information?',
          a: 'Go to Settings from your dashboard to update your personal information, payment methods, and notification preferences.'
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards (Visa, Mastercard, American Express) and digital payment methods. Payment is processed securely through our platform.'
        },
        {
          q: 'How do I contact customer support?',
          a: 'Visit our Support page or email support@skyfleet.com. For urgent matters during a flight, use the in-app emergency contact feature.'
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="px-4 py-24">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about SkyFleet
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="mb-4 text-2xl font-bold tracking-tight">{category.category}</h2>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => {
                    const index = categoryIndex * 100 + faqIndex
                    const isOpen = openIndex === index
                    
                    return (
                      <Card key={index} className="overflow-hidden">
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-muted/50"
                        >
                          <span className="font-semibold">{faq.q}</span>
                          <ChevronDown
                            className={`h-5 w-5 flex-shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <CardContent className="border-t px-6 pb-6 pt-4">
                            <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
                          </CardContent>
                        )}
                      </Card>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <Card className="mt-12 bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="mb-2 text-xl font-semibold">Still have questions?</h3>
              <p className="mb-4 text-muted-foreground">
                Our support team is here to help
              </p>
              <a
                href="/support"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Contact Support
              </a>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
