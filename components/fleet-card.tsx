import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Helicopter } from '@/app/booking/fleet/page'

type FleetCardProps = {
  helicopter: Helicopter
  isSelected: boolean
  onSelect: () => void
}

export function FleetCard({ helicopter, isSelected, onSelect }: FleetCardProps) {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'beginner':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'premium':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'pro':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card
      className={`overflow-hidden transition-all ${
        isSelected ? 'ring-2 ring-primary shadow-lg' : 'hover:shadow-md'
      }`}
    >
      <div className="aspect-video w-full bg-muted relative overflow-hidden">
        <img
          src={`/.jpg?height=400&width=600&query=${encodeURIComponent(helicopter.imageQuery)}`}
          alt={helicopter.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getTierColor(helicopter.tier)}>
            {helicopter.tier.charAt(0).toUpperCase() + helicopter.tier.slice(1)}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">{helicopter.name}</h3>
          <p className="text-sm text-muted-foreground">{helicopter.model}</p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-4 rounded-lg bg-muted/50 p-4">
          <div>
            <div className="text-sm text-muted-foreground">{'Capacity'}</div>
            <div className="text-lg font-semibold">{helicopter.capacity}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{'Speed'}</div>
            <div className="text-lg font-semibold">{helicopter.speed} mph</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">{'Range'}</div>
            <div className="text-lg font-semibold">{helicopter.range} mi</div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-2 text-sm font-medium">{'Features'}</h4>
          <ul className="space-y-2">
            {helicopter.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
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
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button
          className="w-full"
          variant={isSelected ? 'default' : 'outline'}
          onClick={onSelect}
        >
          {isSelected ? 'Selected' : 'Select Helicopter'}
        </Button>
      </div>
    </Card>
  )
}
