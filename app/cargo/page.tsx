'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Zap, Shield, Clock, Truck, Building2 } from 'lucide-react'
import Link from 'next/link'

export default function CargoPage() {
  const features = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Bypass traffic congestion and deliver cargo in record time'
    },
    {
      icon: Shield,
      title: 'Secure Transport',
      description: 'Climate-controlled and monitored cargo holds for sensitive items'
    },
    {
      icon: Clock,
      title: 'On-Demand Service',
      description: 'Book immediate pickups or schedule deliveries 24/7'
    },
    {
      icon: Truck,
      title: 'Flexible Capacity',
      description: 'From small packages to large cargo loads up to 2,000 lbs'
    }
  ]

  const useCases = [
    {
      title: 'Medical Supplies',
      description: 'Urgent delivery of medical equipment, organs, blood samples, and pharmaceuticals',
      icon: '🏥'
    },
    {
      title: 'E-Commerce',
      description: 'Same-day delivery for high-value products and urgent shipments',
      icon: '📦'
    },
    {
      title: 'Construction',
      description: 'Transport materials and equipment to remote or congested job sites',
      icon: '🏗️'
    },
    {
      title: 'Film & Media',
      description: 'Rush deliveries of equipment, footage, and production materials',
      icon: '🎬'
    },
    {
      title: 'Corporate',
      description: 'Time-sensitive documents, prototypes, and business materials',
      icon: '💼'
    },
    {
      title: 'Emergency Response',
      description: 'Disaster relief supplies, rescue equipment, and humanitarian aid',
      icon: '🚨'
    }
  ]

  const specifications = [
    {
      category: 'Light Cargo',
      weight: 'Up to 500 lbs',
      volume: '20 cubic feet',
      price: 'Starting at $300/flight',
      aircraft: 'Robinson R44'
    },
    {
      category: 'Medium Cargo',
      weight: 'Up to 1,200 lbs',
      volume: '60 cubic feet',
      price: 'Starting at $800/flight',
      aircraft: 'Bell 407'
    },
    {
      category: 'Heavy Cargo',
      weight: 'Up to 2,000 lbs',
      volume: '120 cubic feet',
      price: 'Starting at $1,500/flight',
      aircraft: 'Sikorsky S-76'
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
              <Package className="mr-2 h-3 w-3" />
              Cargo Operations
            </Badge>
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Air Cargo Delivery{' '}
              <span className="text-primary">Redefined</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed text-pretty">
              Skip the traffic, deliver on time. SkyFleet's helicopter cargo service provides rapid, reliable transportation for urgent shipments across Seattle and beyond.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/cargo/quote">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support">Contact Sales</Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              Why Choose SkyFleet Cargo?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <feature.icon className="mb-2 h-10 w-10 text-primary" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              Industries We Serve
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="mb-2 text-4xl">{useCase.icon}</div>
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {useCase.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
              Cargo Capacity Options
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {specifications.map((spec, index) => (
                <Card key={index} className={index === 1 ? 'border-primary' : ''}>
                  <CardHeader>
                    {index === 1 && (
                      <Badge className="mb-2 w-fit" variant="default">
                        Most Popular
                      </Badge>
                    )}
                    <CardTitle className="text-2xl">{spec.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Weight Capacity</p>
                      <p className="text-lg font-semibold">{spec.weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Volume Capacity</p>
                      <p className="text-lg font-semibold">{spec.volume}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Aircraft</p>
                      <p className="text-lg font-semibold">{spec.aircraft}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-2xl font-bold text-primary">{spec.price}</p>
                    </div>
                    <Button className="w-full" variant={index === 1 ? 'default' : 'outline'} asChild>
                      <Link href="/cargo/quote">Get Quote</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16 grid gap-6 md:grid-cols-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-2 text-4xl font-bold text-primary">95%</div>
                <p className="text-sm text-muted-foreground">On-Time Delivery</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-2 text-4xl font-bold text-primary">5,000+</div>
                <p className="text-sm text-muted-foreground">Cargo Deliveries</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-2 text-4xl font-bold text-primary">2 hrs</div>
                <p className="text-sm text-muted-foreground">Average Delivery Time</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-2 text-4xl font-bold text-primary">24/7</div>
                <p className="text-sm text-muted-foreground">Service Availability</p>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <Card className="bg-gradient-to-br from-primary/10 via-background to-background">
            <CardHeader>
              <CardTitle className="text-2xl text-center">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-4">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    1
                  </div>
                  <h3 className="mb-2 font-semibold">Request Quote</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Submit cargo details and delivery requirements
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    2
                  </div>
                  <h3 className="mb-2 font-semibold">Schedule Pickup</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Choose your pickup time and location
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    3
                  </div>
                  <h3 className="mb-2 font-semibold">Track in Real-Time</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Monitor your shipment's progress live
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                    4
                  </div>
                  <h3 className="mb-2 font-semibold">Delivery Confirmed</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Receive confirmation and delivery proof
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="mt-16 border-primary/50 bg-primary/5">
            <CardContent className="p-12 text-center">
              <Building2 className="mx-auto mb-4 h-16 w-16 text-primary" />
              <h3 className="mb-4 text-3xl font-bold tracking-tight">
                Enterprise Cargo Solutions
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-muted-foreground leading-relaxed">
                Need regular cargo service? We offer customized enterprise contracts with dedicated aircraft, priority scheduling, and volume discounts for businesses with ongoing cargo needs.
              </p>
              <Button size="lg" asChild>
                <Link href="/support">Contact Sales Team</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
