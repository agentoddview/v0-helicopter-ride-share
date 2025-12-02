import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/aerial-view-of-seattle-skyline-with-space-needle-a.jpg"
          alt="Seattle skyline"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            {'Skip Traffic.'}
            <br />
            {'Fly Seattle.'}
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {'Experience the future of urban transportation. Book premium helicopter rides across Seattle in minutes. From downtown to the airport, skip the traffic and arrive in style.'}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="min-w-[200px]" asChild>
              <Link href="/booking">Book Your Flight</Link>
            </Button>
            <Button size="lg" variant="outline" className="min-w-[200px]" asChild>
              <Link href="/calculator">View Pricing</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="text-3xl font-bold">{'< 15 min'}</div>
              <div className="mt-2 text-sm text-muted-foreground">{'Average Flight Time'}</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="text-3xl font-bold">{'24/7'}</div>
              <div className="mt-2 text-sm text-muted-foreground">{'Available Service'}</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="text-3xl font-bold">{'50+ mi'}</div>
              <div className="mt-2 text-sm text-muted-foreground">{'Service Range'}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
