'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { useState, useEffect } from 'react'
import { Plane, Clock, Gauge, Users, MapPin } from 'lucide-react'

interface Helicopter {
  id: string
  model: string
  flightNumber: string
  pilot: string
  origin: string
  destination: string
  passengers: number
  speed: number
  altitude: number
  eta: string
  lat: number
  lng: number
  heading: number
  city: 'Seattle' | 'LA' | 'NYC'
}

const cities = {
  Seattle: { lat: 47.6062, lng: -122.3321, zoom: 10 },
  LA: { lat: 34.0522, lng: -118.2437, zoom: 10 },
  NYC: { lat: 40.7128, lng: -74.0060, zoom: 10 }
}

export default function LiveMapPage() {
  const [selectedCity, setSelectedCity] = useState<'Seattle' | 'LA' | 'NYC'>('Seattle')
  const [helicopters, setHelicopters] = useState<Helicopter[]>([])
  const [hoveredHeli, setHoveredHeli] = useState<string | null>(null)
  const [time, setTime] = useState(new Date())

  // Initialize helicopters with realistic Seattle, LA, and NYC positions
  useEffect(() => {
    const initialHelicopters: Helicopter[] = [
      // Seattle helicopters
      {
        id: 'SF-101',
        model: 'Bell 407',
        flightNumber: 'SKY101',
        pilot: 'Sarah Mitchell',
        origin: 'Seattle Downtown',
        destination: 'Bellevue',
        passengers: 3,
        speed: 145,
        altitude: 1200,
        eta: '12 min',
        lat: 47.6062,
        lng: -122.3321,
        heading: 90,
        city: 'Seattle'
      },
      {
        id: 'SF-102',
        model: 'Airbus H125',
        flightNumber: 'SKY102',
        pilot: 'James Chen',
        origin: 'SeaTac Airport',
        destination: 'Pike Place',
        passengers: 2,
        speed: 158,
        altitude: 1500,
        eta: '8 min',
        lat: 47.5480,
        lng: -122.3200,
        heading: 0,
        city: 'Seattle'
      },
      {
        id: 'SF-103',
        model: 'Robinson R44',
        flightNumber: 'SKY103',
        pilot: 'Emily Rodriguez',
        origin: 'Tacoma',
        destination: 'Everett',
        passengers: 1,
        speed: 130,
        altitude: 1000,
        eta: '18 min',
        lat: 47.2529,
        lng: -122.4443,
        heading: 45,
        city: 'Seattle'
      },
      // LA helicopters
      {
        id: 'SF-201',
        model: 'Sikorsky S-76',
        flightNumber: 'SKY201',
        pilot: 'Marcus Thompson',
        origin: 'LAX',
        destination: 'Downtown LA',
        passengers: 5,
        speed: 178,
        altitude: 1800,
        eta: '15 min',
        lat: 33.9425,
        lng: -118.4081,
        heading: 45,
        city: 'LA'
      },
      {
        id: 'SF-202',
        model: 'Bell 407',
        flightNumber: 'SKY202',
        pilot: 'David Park',
        origin: 'Santa Monica',
        destination: 'Beverly Hills',
        passengers: 3,
        speed: 140,
        altitude: 1400,
        eta: '10 min',
        lat: 34.0195,
        lng: -118.4912,
        heading: 90,
        city: 'LA'
      },
      {
        id: 'SF-203',
        model: 'Airbus H145',
        flightNumber: 'SKY203',
        pilot: 'Lisa Wang',
        origin: 'Long Beach',
        destination: 'Burbank',
        passengers: 4,
        speed: 165,
        altitude: 1600,
        eta: '22 min',
        lat: 33.7701,
        lng: -118.1937,
        heading: 315,
        city: 'LA'
      },
      // NYC helicopters
      {
        id: 'SF-301',
        model: 'Bell 429',
        flightNumber: 'SKY301',
        pilot: 'Robert Martinez',
        origin: 'JFK Airport',
        destination: 'Manhattan Heliport',
        passengers: 4,
        speed: 160,
        altitude: 1500,
        eta: '14 min',
        lat: 40.6413,
        lng: -73.7781,
        heading: 315,
        city: 'NYC'
      },
      {
        id: 'SF-302',
        model: 'Airbus H125',
        flightNumber: 'SKY302',
        pilot: 'Jennifer Lee',
        origin: 'Newark',
        destination: 'East River Heliport',
        passengers: 2,
        speed: 155,
        altitude: 1300,
        eta: '11 min',
        lat: 40.7357,
        lng: -74.1724,
        heading: 90,
        city: 'NYC'
      },
      {
        id: 'SF-303',
        model: 'Sikorsky S-76',
        flightNumber: 'SKY303',
        pilot: 'Michael Brown',
        origin: 'Brooklyn',
        destination: 'Central Park',
        passengers: 6,
        speed: 172,
        altitude: 1700,
        eta: '9 min',
        lat: 40.6782,
        lng: -73.9442,
        heading: 0,
        city: 'NYC'
      }
    ]
    setHelicopters(initialHelicopters)
  }, [])

  // Update helicopter positions every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setHelicopters(prev => prev.map(heli => ({
        ...heli,
        lat: heli.lat + (Math.random() - 0.5) * 0.01,
        lng: heli.lng + (Math.random() - 0.5) * 0.01,
        heading: (heli.heading + (Math.random() - 0.5) * 10) % 360
      })))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const filteredHelicopters = helicopters.filter(h => h.city === selectedCity)
  const cityData = cities[selectedCity]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Live Flight Tracker</h1>
            <p className="text-lg text-muted-foreground">
              Track SkyFleet helicopters in real-time across Seattle, Los Angeles, and New York City
            </p>
          </div>

          {/* City Selector */}
          <div className="mb-6 flex gap-2">
            {(['Seattle', 'LA', 'NYC'] as const).map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`rounded-lg px-6 py-3 font-medium transition-all ${
                  selectedCity === city
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {city === 'LA' ? 'Los Angeles' : city === 'NYC' ? 'New York City' : city}
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Flights</span>
                <Plane className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">{filteredHelicopters.length}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Passengers</span>
                <Users className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">
                {filteredHelicopters.reduce((sum, h) => sum + h.passengers, 0)}
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Speed</span>
                <Gauge className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">
                {Math.round(filteredHelicopters.reduce((sum, h) => sum + h.speed, 0) / filteredHelicopters.length)} mph
              </p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Time</span>
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold">
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Map and Flight List */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="relative overflow-hidden rounded-xl border bg-card">
                <div className="absolute left-4 top-4 z-10 rounded-lg bg-background/95 px-3 py-2 text-sm font-medium shadow-lg backdrop-blur">
                  {selectedCity === 'LA' ? 'Los Angeles' : selectedCity === 'NYC' ? 'New York City' : selectedCity}
                </div>
                
                <div className="relative h-[600px] w-full bg-gradient-to-br from-slate-900 to-slate-800">
                  {/* Simplified map visualization */}
                  <svg className="h-full w-full">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Helicopters */}
                    {filteredHelicopters.map((heli, idx) => {
                      const x = 50 + (idx * 25) % 80
                      const y = 20 + (idx * 30) % 70
                      
                      return (
                        <g
                          key={heli.id}
                          onMouseEnter={() => setHoveredHeli(heli.id)}
                          onMouseLeave={() => setHoveredHeli(null)}
                          className="cursor-pointer transition-transform hover:scale-110"
                          style={{ transformOrigin: `${x}% ${y}%` }}
                        >
                          {/* Helicopter icon */}
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="8"
                            fill="#3b82f6"
                            className="animate-pulse"
                          />
                          <path
                            d={`M ${x * 0.95}% ${y * 0.95}% L ${(x + 1) * 0.95}% ${y * 0.95}%`}
                            stroke="#60a5fa"
                            strokeWidth="2"
                            strokeLinecap="round"
                            transform={`rotate(${heli.heading}, ${x * 0.95}, ${y * 0.95})`}
                          />
                          
                          {/* Flight path trail */}
                          <circle
                            cx={`${x}%`}
                            cy={`${y}%`}
                            r="20"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="1"
                            opacity="0.2"
                          />
                          
                          {/* Hover card */}
                          {hoveredHeli === heli.id && (
                            <foreignObject
                              x={`${x + 3}%`}
                              y={`${y - 10}%`}
                              width="280"
                              height="200"
                            >
                              <div className="rounded-lg border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
                                <div className="mb-3 flex items-start justify-between">
                                  <div>
                                    <p className="font-semibold">{heli.flightNumber}</p>
                                    <p className="text-sm text-muted-foreground">{heli.model}</p>
                                  </div>
                                  <span className="rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                                    Active
                                  </span>
                                </div>
                                
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Pilot:</span>
                                    <span className="font-medium">{heli.pilot}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Route:</span>
                                    <span className="font-medium">{heli.origin} → {heli.destination}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Passengers:</span>
                                    <span className="font-medium">{heli.passengers}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Gauge className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Speed:</span>
                                    <span className="font-medium">{heli.speed} mph</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Plane className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">Altitude:</span>
                                    <span className="font-medium">{heli.altitude} ft</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">ETA:</span>
                                    <span className="font-medium">{heli.eta}</span>
                                  </div>
                                </div>
                              </div>
                            </foreignObject>
                          )}
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* Flight List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Active Flights</h2>
              <div className="space-y-3">
                {filteredHelicopters.map(heli => (
                  <div
                    key={heli.id}
                    onMouseEnter={() => setHoveredHeli(heli.id)}
                    onMouseLeave={() => setHoveredHeli(null)}
                    className={`cursor-pointer rounded-lg border p-4 transition-all ${
                      hoveredHeli === heli.id
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'bg-card hover:border-primary/50'
                    }`}
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{heli.flightNumber}</p>
                        <p className="text-sm text-muted-foreground">{heli.model}</p>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary">
                        <Clock className="h-3 w-3" />
                        {heli.eta}
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Pilot</span>
                        <span className="font-medium">{heli.pilot}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Speed</span>
                        <span className="font-medium">{heli.speed} mph</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Passengers</span>
                        <span className="font-medium">{heli.passengers}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{heli.origin} → {heli.destination}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
