'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Plane, DollarSign, Clock, Heart, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function CareersPage() {
  const benefits = [
    { icon: DollarSign, title: 'Competitive Pay', description: 'Industry-leading compensation with performance bonuses' },
    { icon: Clock, title: 'Flexible Schedule', description: 'Choose your own hours and availability' },
    { icon: Heart, title: 'Health Benefits', description: 'Comprehensive health, dental, and vision coverage' },
    { icon: TrendingUp, title: 'Career Growth', description: 'Advance to premium aircraft and exclusive routes' }
  ]

  const requirements = [
    'Valid Commercial Pilot License with Rotorcraft-Helicopter rating',
    'Minimum 1,500 flight hours (1,000+ hours in helicopters)',
    'FAA Class 2 Medical Certificate (Class 1 preferred)',
    'Instrument Rating (IFR)',
    'Clean safety record and background check',
    'Excellent communication and customer service skills',
    'Night flying experience preferred'
  ]

  const openPositions = [
    {
      title: 'Commercial Helicopter Pilot',
      location: 'Seattle, WA',
      type: 'Full-Time',
      experience: '1,500+ hours',
      salary: '$85,000 - $120,000/year'
    },
    {
      title: 'Senior Helicopter Pilot',
      location: 'Seattle, WA',
      type: 'Full-Time',
      experience: '3,000+ hours',
      salary: '$110,000 - $160,000/year'
    },
    {
      title: 'Charter Pilot',
      location: 'Seattle, WA',
      type: 'Contract',
      experience: '2,000+ hours',
      salary: '$95,000 - $140,000/year'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <Badge className="mb-4" variant="secondary">
              <Plane className="mr-2 h-3 w-3" />
              Join Our Team
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Fly Your Career to{' '}
              <span className="text-primary">New Heights</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Join SkyFleet's elite team of professional helicopter pilots. Experience the future of urban air transportation while building a rewarding career.
            </p>
          </div>

          {/* Why Join Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              Why Join SkyFleet?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader>
                    <benefit.icon className="mb-2 h-10 w-10 text-primary" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Requirements Section */}
          <div className="mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Pilot Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-3 md:grid-cols-2">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Open Positions */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              Open Positions
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {openPositions.map((position, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{position.type}</Badge>
                      <Badge variant="outline">{position.location}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4 space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="font-medium">{position.experience}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-muted-foreground">Salary:</span>
                        <span className="font-medium">{position.salary}</span>
                      </p>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href="/careers/apply">Apply Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <Card className="bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Application Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    1
                  </div>
                  <h3 className="mb-2 font-semibold">Submit Application</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Complete our online application form
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    2
                  </div>
                  <h3 className="mb-2 font-semibold">Initial Review</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We review your credentials and experience
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    3
                  </div>
                  <h3 className="mb-2 font-semibold">Skills Assessment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Flight evaluation and technical interview
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    4
                  </div>
                  <h3 className="mb-2 font-semibold">Onboarding</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Training and orientation to start flying
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button size="lg" asChild>
                  <Link href="/careers/apply">Start Your Application</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
