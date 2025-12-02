'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'

export function RecentActivity() {
  const [recentFlights, setRecentFlights] = useState(47)
  const [trend, setTrend] = useState('+12%')

  useEffect(() => {
    const interval = setInterval(() => {
      const newFlights = Math.floor(Math.random() * 20) + 40
      const previousFlights = recentFlights
      const change = ((newFlights - previousFlights) / previousFlights * 100).toFixed(0)
      
      setRecentFlights(newFlights)
      setTrend(`${change.startsWith('-') ? '' : '+'}${change}%`)
    }, 6000)

    return () => clearInterval(interval)
  }, [recentFlights])

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Recent Activity</p>
          <p className="text-2xl font-bold mt-1">{recentFlights} Flights</p>
          <p className="text-sm text-muted-foreground mt-1">In the last hour</p>
        </div>
        <div className={`text-right ${trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
          <p className="text-xl font-bold">{trend}</p>
          <p className="text-xs">vs prev hour</p>
        </div>
      </div>
    </Card>
  )
}
