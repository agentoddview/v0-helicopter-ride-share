'use client'

import { useState, useEffect, useRef } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface FlightData {
  flightId: string
  pilot: string
  passengers: number
  origin: string
  destination: string
  originCoords: { lat: number; lng: number }
  destinationCoords: { lat: number; lng: number }
  totalDistance: number
  currentDistance: number
  speed: number
  altitude: number
  aircraft: string
  estimatedTime: number
  elapsedTime: number
}

export default function TrackingPage() {
  const params = useParams()
  const flightId = params.flightId as string
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [flight, setFlight] = useState<FlightData>({
    flightId: flightId || 'SF-2847',
    pilot: 'Captain Sarah Chen',
    passengers: 3,
    origin: 'Seattle Downtown',
    destination: 'SeaTac Airport',
    originCoords: { lat: 47.6062, lng: -122.3321 },
    destinationCoords: { lat: 47.4502, lng: -122.3088 },
    totalDistance: 14.2,
    currentDistance: 8.5,
    speed: 145,
    altitude: 1200,
    aircraft: 'Bell 429',
    estimatedTime: 12,
    elapsedTime: 5,
  })

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate real-time position updates
    const interval = setInterval(() => {
      setFlight((prev) => {
        const newElapsed = prev.elapsedTime + 0.1
        const newCurrent = prev.currentDistance + 0.024 // approx 0.024 miles per 6 seconds at 145 mph
        const newProgress = (newCurrent / prev.totalDistance) * 100

        if (newProgress >= 100) {
          clearInterval(interval)
          return prev
        }

        return {
          ...prev,
          elapsedTime: newElapsed,
          currentDistance: newCurrent,
        }
      })
    }, 6000) // Update every 6 seconds

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setProgress((flight.currentDistance / flight.totalDistance) * 100)
  }, [flight.currentDistance, flight.totalDistance])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const drawRoute = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Map coordinates to canvas
      const padding = 60
      const mapWidth = canvas.width - padding * 2
      const mapHeight = canvas.height - padding * 2

      // Calculate bounds
      const minLat = Math.min(flight.originCoords.lat, flight.destinationCoords.lat) - 0.05
      const maxLat = Math.max(flight.originCoords.lat, flight.destinationCoords.lat) + 0.05
      const minLng = Math.min(flight.originCoords.lng, flight.destinationCoords.lng) - 0.05
      const maxLng = Math.max(flight.originCoords.lng, flight.destinationCoords.lng) + 0.05

      const latRange = maxLat - minLat
      const lngRange = maxLng - minLng

      // Convert lat/lng to canvas coordinates
      const toCanvasX = (lng: number) => padding + ((lng - minLng) / lngRange) * mapWidth
      const toCanvasY = (lat: number) => padding + ((maxLat - lat) / latRange) * mapHeight

      const originX = toCanvasX(flight.originCoords.lng)
      const originY = toCanvasY(flight.originCoords.lat)
      const destX = toCanvasX(flight.destinationCoords.lng)
      const destY = toCanvasY(flight.destinationCoords.lat)

      // Draw grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        const x = padding + (mapWidth / 10) * i
        const y = padding + (mapHeight / 10) * i
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, canvas.height - padding)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(canvas.width - padding, y)
        ctx.stroke()
      }

      // Draw completed route (dashed line)
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.3)'
      ctx.lineWidth = 3
      ctx.setLineDash([10, 5])
      ctx.beginPath()
      ctx.moveTo(originX, originY)
      ctx.lineTo(destX, destY)
      ctx.stroke()
      ctx.setLineDash([])

      // Calculate current position
      const progressRatio = progress / 100
      const currentX = originX + (destX - originX) * progressRatio
      const currentY = originY + (destY - originY) * progressRatio

      // Draw completed route (solid line)
      ctx.strokeStyle = '#6366f1'
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(originX, originY)
      ctx.lineTo(currentX, currentY)
      ctx.stroke()

      // Draw origin marker
      ctx.fillStyle = '#10b981'
      ctx.beginPath()
      ctx.arc(originX, originY, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw destination marker
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(destX, destY, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw current position (person icon)
      ctx.fillStyle = '#6366f1'
      ctx.beginPath()
      ctx.arc(currentX, currentY, 12, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = 3
      ctx.stroke()

      // Draw person icon
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(currentX, currentY - 2, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(currentX, currentY + 5, 6, 0, Math.PI, true)
      ctx.fill()

      // Draw labels
      ctx.fillStyle = '#ffffff'
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(flight.origin, originX, originY - 15)
      ctx.fillText(flight.destination, destX, destY - 15)
    }

    drawRoute()

    // Redraw when window resizes
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      drawRoute()
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [flight, progress])

  const remainingDistance = flight.totalDistance - flight.currentDistance
  const remainingTime = (remainingDistance / flight.speed) * 60 // Convert to minutes

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">Flight Tracker</h1>
              <p className="text-muted-foreground">
                Flight {flight.flightId} - {progress >= 100 ? 'Arrived' : 'In Progress'}
              </p>
            </div>
            <Badge variant={progress >= 100 ? 'default' : 'secondary'} className="text-lg px-4 py-2">
              {progress >= 100 ? 'Arrived' : `${Math.round(progress)}% Complete`}
            </Badge>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Live Route</h2>
              <div className="relative bg-muted/30 rounded-lg overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-[500px]" />
              </div>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Flight Details</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Current Distance</div>
                  <div className="text-2xl font-bold">{remainingDistance.toFixed(1)} mi</div>
                  <div className="text-xs text-muted-foreground">remaining</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Estimated Arrival</div>
                  <div className="text-2xl font-bold">{Math.ceil(remainingTime)} min</div>
                  <div className="text-xs text-muted-foreground">
                    {Math.floor(remainingTime / 60)}h {Math.ceil(remainingTime % 60)}m
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Speed</div>
                  <div className="text-2xl font-bold">{flight.speed} mph</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Altitude</div>
                  <div className="text-2xl font-bold">{flight.altitude} ft</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Aircraft Info</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Aircraft</div>
                  <div className="font-semibold">{flight.aircraft}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Pilot</div>
                  <div className="font-semibold">{flight.pilot}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Passengers</div>
                  <div className="font-semibold">{flight.passengers}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Route</div>
                  <div className="font-semibold">
                    {flight.origin} → {flight.destination}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Distance</div>
                  <div className="font-semibold">{flight.totalDistance} mi</div>
                </div>
              </div>
            </Card>

            <Button className="w-full" asChild>
              <Link href={`/pilots/sarah-chen`}>View Pilot Profile & Stats</Link>
            </Button>
          </div>
        </div>

        {/* Trip Timeline */}
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold mb-4">Trip Timeline</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-6">
              <div className="relative flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Flight Booked</div>
                  <div className="text-sm text-muted-foreground">
                    Reservation confirmed for {flight.passengers} passengers
                  </div>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  ✓
                </div>
                <div className="flex-1">
                  <div className="font-semibold">Departed from {flight.origin}</div>
                  <div className="text-sm text-muted-foreground">
                    {Math.floor(flight.elapsedTime)} minutes ago
                  </div>
                </div>
              </div>
              <div className="relative flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">In Flight</div>
                  <div className="text-sm text-muted-foreground">
                    Currently {remainingDistance.toFixed(1)} miles from destination
                  </div>
                </div>
              </div>
              <div className="relative flex gap-4 opacity-50">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background" />
                <div className="flex-1">
                  <div className="font-semibold">Arriving at {flight.destination}</div>
                  <div className="text-sm text-muted-foreground">
                    Expected in {Math.ceil(remainingTime)} minutes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
