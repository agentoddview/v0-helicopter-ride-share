import { Card } from '@/components/ui/card'
import { Briefcase, Plane, Building2, Package, Hospital, GraduationCap } from 'lucide-react'

export function UseCases() {
  const cases = [
    {
      icon: Briefcase,
      title: 'Business Executives',
      description: 'Get to important meetings on time. Travel between offices across the metro area in minutes.',
      color: 'blue'
    },
    {
      icon: Plane,
      title: 'Airport Transfers',
      description: 'Never miss a flight again. Direct service from downtown Seattle to Sea-Tac Airport in under 10 minutes.',
      color: 'purple'
    },
    {
      icon: Building2,
      title: 'Corporate Partnerships',
      description: 'Companies can dedicate landing pads on their property with walkways to buildings for employee convenience.',
      color: 'green'
    },
    {
      icon: Package,
      title: 'Express Deliveries',
      description: 'Time-sensitive packages and documents delivered without delay. Perfect for legal, medical, and business needs.',
      color: 'orange'
    },
    {
      icon: Hospital,
      title: 'Medical Transport',
      description: 'Fast, safe transportation for medical professionals and time-critical medical supplies.',
      color: 'red'
    },
    {
      icon: GraduationCap,
      title: 'University Campuses',
      description: 'Colleges like UW can build landing areas for faculty, visiting scholars, and urgent campus needs.',
      color: 'indigo'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-500/10', text: 'text-blue-500' },
      purple: { bg: 'bg-purple-500/10', text: 'text-purple-500' },
      green: { bg: 'bg-green-500/10', text: 'text-green-500' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-500' },
      red: { bg: 'bg-red-500/10', text: 'text-red-500' },
      indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500' }
    }
    return colors[color] || colors.blue
  }

  return (
    <section className="py-20 bg-muted/30" id="use-cases">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {'Who Flies with SkyFleet?'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {'From business executives to medical professionals, SkyFleet serves everyone who values their time and needs reliable, fast transportation.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((useCase) => {
            const Icon = useCase.icon
            const colors = getColorClasses(useCase.color)
            return (
              <Card key={useCase.title} className="p-6 hover:border-primary transition-colors">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg}`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
