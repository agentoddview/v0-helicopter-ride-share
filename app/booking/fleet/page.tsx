'use client'

import { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { FleetCard } from '@/components/fleet-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export type Helicopter = {
  id: string
  name: string
  model: string
  tier: string
  capacity: number
  speed: number
  range: number
  features: string[]
  imageQuery: string
}

const helicopters: Helicopter[] = [
  {
    id: 'r44',
    name: 'Robinson R44',
    model: 'Standard',
    tier: 'beginner',
    capacity: 3,
    speed: 110,
    range: 300,
    features: ['Climate Control', 'Noise-Canceling Headsets', 'Leather Seats'],
    imageQuery: 'robinson r44 helicopter side view',
  },
  {
    id: 'bell407',
    name: 'Bell 407',
    model: 'Premium',
    tier: 'premium',
    capacity: 6,
    speed: 133,
    range: 370,
    features: [
      'Climate Control',
      'Noise-Canceling Headsets',
      'Premium Leather Interior',
      'In-Flight Entertainment',
      'Refreshments',
    ],
    imageQuery: 'bell 407 helicopter executive',
  },
  {
    id: 'ec135',
    name: 'Airbus EC135',
    model: 'Luxury',
    tier: 'pro',
    capacity: 6,
    speed: 150,
    range: 400,
    features: [
      'Full Climate Control',
      'Premium Bose Headsets',
      'Luxury Leather Interior',
      'Advanced Entertainment System',
      'Premium Bar Service',
      'WiFi Connectivity',
    ],
    imageQuery: 'airbus ec135 helicopter luxury interior',
  },
  {
    id: 's76',
    name: 'Sikorsky S-76',
    model: 'Executive',
    tier: 'pro',
    capacity: 12,
    speed: 155,
    range: 473,
    features: [
      'VIP Configuration',
      'Premium Sound System',
      'Executive Seating',
      'Full Entertainment Suite',
      'Onboard Attendant',
      'WiFi & Satellite Phone',
      'Private Lavatory',
    ],
    imageQuery: 'sikorsky s76 helicopter vip executive',
  },
]

export default function FleetPage() {
  const [selectedHelicopter, setSelectedHelicopter] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {'Back to Route Selection'}
            </Link>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {'Choose Your Helicopter'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {'Select from our premium fleet of helicopters.'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {helicopters.map((helicopter) => (
              <FleetCard
                key={helicopter.id}
                helicopter={helicopter}
                isSelected={selectedHelicopter === helicopter.id}
                onSelect={() => setSelectedHelicopter(helicopter.id)}
              />
            ))}
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-6">
            <div>
              <p className="font-medium">
                {selectedHelicopter
                  ? `Selected: ${helicopters.find((h) => h.id === selectedHelicopter)?.name}`
                  : 'No helicopter selected'}
              </p>
              <p className="text-sm text-muted-foreground">
                {'Choose a helicopter to continue to confirmation'}
              </p>
            </div>
            <Button size="lg" disabled={!selectedHelicopter} asChild={!!selectedHelicopter}>
              {selectedHelicopter ? (
                <Link href="/booking/confirm">{'Continue to Confirmation'}</Link>
              ) : (
                <span>{'Select Helicopter'}</span>
              )}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
