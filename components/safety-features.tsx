import { Card } from '@/components/ui/card'
import { Shield, Radio, Cloud, Users, Wrench, Award } from 'lucide-react'

export function SafetyFeatures() {
  const features = [
    {
      icon: Shield,
      title: 'Advanced Safety Systems',
      description: 'All aircraft equipped with latest collision avoidance, terrain awareness, and emergency systems.'
    },
    {
      icon: Radio,
      title: 'Real-Time Tracking',
      description: 'Live GPS tracking of every flight, integrated with air traffic control and emergency services.'
    },
    {
      icon: Cloud,
      title: 'Weather Monitoring',
      description: 'Sophisticated weather analysis systems ensure safe flying conditions for every journey.'
    },
    {
      icon: Users,
      title: 'Expert Pilots',
      description: 'All pilots certified with 1000+ flight hours and ongoing training in the latest safety protocols.'
    },
    {
      icon: Wrench,
      title: 'Rigorous Maintenance',
      description: 'Fleet maintained to highest FAA standards with preventive maintenance schedules.'
    },
    {
      icon: Award,
      title: 'Insurance Coverage',
      description: 'Comprehensive insurance protection for passengers and crew on every flight.'
    }
  ]

  return (
    <section className="py-20" id="safety">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {'Safety First, Always'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {'Our commitment to safety is unwavering. Every aspect of our operation is designed with your security and peace of mind as the top priority.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-block p-6 border-primary bg-primary/5">
            <p className="text-sm font-medium">
              {'SkyFleet maintains a perfect safety record with over 10,000 successful flights completed.'}
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
