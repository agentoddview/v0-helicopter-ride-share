import { Card } from '@/components/ui/card'

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose Your Route',
      description: 'Select your pickup and destination points on our interactive Seattle map.',
    },
    {
      step: '02',
      title: 'Select Your Helicopter',
      description: 'Browse our fleet and choose the helicopter that fits your needs and group size.',
    },
    {
      step: '03',
      title: 'Review & Book',
      description: 'See real-time pricing, estimated flight time, and confirm your booking instantly.',
    },
    {
      step: '04',
      title: 'Fly in Style',
      description: 'Meet your certified pilot at the designated helipad and enjoy your flight.',
    },
  ]

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-balance">
            {'How It Works'}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {'Book your helicopter ride in four simple steps.'}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div key={index} className="relative">
              <Card className="p-6">
                <div className="mb-4 text-5xl font-bold text-muted/20">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 hidden lg:block">
                  <svg
                    className="h-8 w-8 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
