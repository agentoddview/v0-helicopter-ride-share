import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export function PricingTiers() {
  const tiers = [
    {
      name: 'Beginner',
      price: '$20',
      period: 'per month',
      description: 'Perfect for occasional travelers',
      features: [
        '$5 per minute flight time',
        'Up to 10 miles distance',
        '+$150 per extra guest',
        'Standard helicopters',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Premium',
      price: '$40',
      period: 'per month',
      description: 'Best for regular commuters',
      features: [
        '$3 per minute flight time',
        'Up to 25 miles distance',
        '+$100 per extra guest',
        'Premium helicopters',
        'Priority booking',
        '24/7 phone support',
      ],
      cta: 'Go Premium',
      popular: true,
    },
    {
      name: 'Pro',
      price: '$200',
      period: 'per month',
      description: 'For frequent flyers',
      features: [
        '$2.50 per minute flight time',
        'Up to 50 miles distance',
        '+$75 per extra guest',
        'Luxury helicopters',
        'Instant booking',
        'Dedicated account manager',
        'No blackout dates',
      ],
      cta: 'Go Pro',
      popular: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'flexible pricing',
      description: 'For businesses and organizations',
      features: [
        'Flexible per-minute rates',
        'Up to 250 miles distance',
        'Multiple passengers included',
        'Private fleet access',
        'Custom routes',
        'White-glove service',
        'Dedicated support team',
        'Volume discounts',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {'Choose Your Plan'}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {'Flexible subscription tiers designed for every type of traveler.'}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative p-8 ${
                tier.popular ? 'border-primary shadow-lg' : ''
              }`}
            >
              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <div className="mb-4">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                </div>
              </div>
              <ul className="mb-8 space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 shrink-0 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                variant={tier.popular ? 'default' : 'outline'}
                asChild
              >
                <Link href="/booking">{tier.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
