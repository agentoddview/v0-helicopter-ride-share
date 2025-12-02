'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

export function LiveAvailability() {
  const [available, setAvailable] = useState(12)
  const [demandLevel, setDemandLevel] = useState<'low' | 'medium' | 'high'>('medium')

  // Simulate real-time availability updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newAvailable = Math.floor(Math.random() * 8) + 8
      setAvailable(newAvailable)
      
      if (newAvailable >= 12) setDemandLevel('low')
      else if (newAvailable >= 10) setDemandLevel('medium')
      else setDemandLevel('high')
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getDemandColor = () => {
    switch (demandLevel) {
      case 'low': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'high': return 'text-red-500'
    }
  }

  const getDemandBg = () => {
    switch (demandLevel) {
      case 'low': return 'bg-green-500/10'
      case 'medium': return 'bg-yellow-500/10'
      case 'high': return 'bg-red-500/10'
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Live Availability</p>
          <p className="text-2xl font-bold mt-1">{available} Helicopters</p>
        </div>
        <div className={`px-3 py-1 rounded-full ${getDemandBg()}`}>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getDemandColor().replace('text-', 'bg-')} animate-pulse`} />
            <span className={`text-sm font-medium ${getDemandColor()}`}>
              {demandLevel === 'low' && 'Low Demand'}
              {demandLevel === 'medium' && 'Moderate'}
              {demandLevel === 'high' && 'High Demand'}
            </span>
          </div>
        </div>
      </div>
      {demandLevel === 'high' && (
        <div className="mt-3 text-xs text-muted-foreground">
          {'Surge pricing may apply during peak hours'}
        </div>
      )}
    </Card>
  )
}
