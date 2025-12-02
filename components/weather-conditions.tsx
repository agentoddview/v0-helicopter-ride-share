'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import type { BookingData } from '@/app/booking/page'

type WeatherConditionsProps = {
  setBookingData: (data: BookingData | ((prev: BookingData) => BookingData)) => void
}

export function WeatherConditions({ setBookingData }: WeatherConditionsProps) {
  const [weather, setWeather] = useState({
    condition: 'Clear',
    temp: 62,
    windSpeed: 8,
    visibility: 10,
  })

  const [impact, setImpact] = useState<'excellent' | 'good' | 'fair'>('excellent')

  useEffect(() => {
    // Simulate weather updates
    const interval = setInterval(() => {
      const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain']
      const newCondition = conditions[Math.floor(Math.random() * conditions.length)]
      const newWind = Math.floor(Math.random() * 15) + 5
      
      setWeather({
        condition: newCondition,
        temp: Math.floor(Math.random() * 10) + 58,
        windSpeed: newWind,
        visibility: Math.floor(Math.random() * 3) + 8,
      })

      let newImpact: 'excellent' | 'good' | 'fair' = 'excellent'
      let weatherMultiplier = 0

      if (newCondition === 'Light Rain' || newWind > 15) {
        newImpact = 'fair'
        weatherMultiplier = 0.15
      } else if (newCondition === 'Cloudy' || newWind > 12) {
        newImpact = 'good'
        weatherMultiplier = 0.08
      }

      setImpact(newImpact)
      setBookingData((prev) => ({ ...prev, weatherImpact: weatherMultiplier }))
    }, 8000)

    return () => clearInterval(interval)
  }, [setBookingData])

  const getImpactColor = () => {
    switch (impact) {
      case 'excellent': return 'text-green-500'
      case 'good': return 'text-yellow-500'
      case 'fair': return 'text-orange-500'
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Weather Conditions</p>
          <p className="text-xl font-bold mt-1">{weather.condition}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {weather.temp}°F • Wind {weather.windSpeed} mph
          </p>
        </div>
        <div className="text-right">
          <p className={`text-sm font-medium ${getImpactColor()}`}>
            {impact.charAt(0).toUpperCase() + impact.slice(1)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Flight Conditions</p>
        </div>
      </div>
    </Card>
  )
}
