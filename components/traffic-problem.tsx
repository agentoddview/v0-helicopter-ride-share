import { Card } from '@/components/ui/card'
import { AlertTriangle, Clock, TrendingUp, MapPin } from 'lucide-react'

export function TrafficProblem() {
  return (
    <section className="py-20" id="problem">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {'Seattle Traffic: A Growing Crisis'}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {'Seattle ranks among the worst cities for traffic congestion in the United States. Time lost in traffic means missed meetings, delayed flights, and countless opportunities lost.'}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <Card className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
              <Clock className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">{'63 hrs/year'}</h3>
            <p className="text-sm text-muted-foreground">{'Average time lost in traffic per driver'}</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
              <TrendingUp className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">{'$9 Billion'}</h3>
            <p className="text-sm text-muted-foreground">{'Annual cost of traffic congestion'}</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">{'7am-10am'}</h3>
            <p className="text-sm text-muted-foreground">{'Peak morning traffic hours'}</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">{'4pm-7pm'}</h3>
            <p className="text-sm text-muted-foreground">{'Peak evening commute window'}</p>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="p-8">
            <h3 className="mb-4 text-xl font-bold">{'The Problem'}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-red-500">{'•'}</span>
                <span>{'Low accessibility for pedestrians and commuters in urban centers'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-red-500">{'•'}</span>
                <span>{'Major delays for time-sensitive deliveries and emergency services'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-red-500">{'•'}</span>
                <span>{'Missed flights, meetings, and critical business opportunities'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-red-500">{'•'}</span>
                <span>{'Scheduling chaos affecting pilots, travelers, and airport staff'}</span>
              </li>
            </ul>
          </Card>

          <Card className="p-8 border-primary bg-primary/5">
            <h3 className="mb-4 text-xl font-bold">{'Our Solution'}</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">{'✓'}</span>
                <span>{'Skip traffic entirely with point-to-point helicopter service'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">{'✓'}</span>
                <span>{'Reduce 2-hour commutes to 15-minute flights'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">{'✓'}</span>
                <span>{'Real-time booking and availability like Uber'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-primary">{'✓'}</span>
                <span>{'Multiple membership tiers for every need and budget'}</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
