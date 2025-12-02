'use client'

import { useEffect, useRef } from 'react'
import { Card } from '@/components/ui/card'
import type { Location } from '@/app/booking/page'

type BookingMapProps = {
  pickup: Location | null
  destination: Location | null
}

export function BookingMap({ pickup, destination }: BookingMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * window.devicePixelRatio
    canvas.height = rect.height * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Clear canvas
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw Seattle map outline (simplified)
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(rect.width * 0.3, rect.height * 0.2)
    ctx.lineTo(rect.width * 0.7, rect.height * 0.25)
    ctx.lineTo(rect.width * 0.8, rect.height * 0.6)
    ctx.lineTo(rect.width * 0.5, rect.height * 0.8)
    ctx.lineTo(rect.width * 0.2, rect.height * 0.5)
    ctx.closePath()
    ctx.stroke()

    // Draw grid
    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 1
    for (let i = 0; i < 10; i++) {
      ctx.beginPath()
      ctx.moveTo((rect.width / 10) * i, 0)
      ctx.lineTo((rect.width / 10) * i, rect.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, (rect.height / 10) * i)
      ctx.lineTo(rect.width, (rect.height / 10) * i)
      ctx.stroke()
    }

    // Convert lat/lon to canvas coordinates (simplified projection)
    const latLonToCanvas = (lat: number, lon: number) => {
      const minLat = 47.4
      const maxLat = 47.7
      const minLon = -122.45
      const maxLon = -122.2

      const x = ((lon - minLon) / (maxLon - minLon)) * rect.width
      const y = rect.height - ((lat - minLat) / (maxLat - minLat)) * rect.height

      return { x, y }
    }

    // Draw route line
    if (pickup && destination) {
      const pickupPos = latLonToCanvas(pickup.coordinates[0], pickup.coordinates[1])
      const destPos = latLonToCanvas(destination.coordinates[0], destination.coordinates[1])

      ctx.strokeStyle = '#18181b'
      ctx.lineWidth = 3
      ctx.setLineDash([10, 5])
      ctx.beginPath()
      ctx.moveTo(pickupPos.x, pickupPos.y)
      ctx.lineTo(destPos.x, destPos.y)
      ctx.stroke()
      ctx.setLineDash([])

      // Draw arrow
      const angle = Math.atan2(destPos.y - pickupPos.y, destPos.x - pickupPos.x)
      const arrowSize = 15
      ctx.fillStyle = '#18181b'
      ctx.beginPath()
      ctx.moveTo(destPos.x, destPos.y)
      ctx.lineTo(
        destPos.x - arrowSize * Math.cos(angle - Math.PI / 6),
        destPos.y - arrowSize * Math.sin(angle - Math.PI / 6)
      )
      ctx.lineTo(
        destPos.x - arrowSize * Math.cos(angle + Math.PI / 6),
        destPos.y - arrowSize * Math.sin(angle + Math.PI / 6)
      )
      ctx.closePath()
      ctx.fill()
    }

    // Draw pickup marker
    if (pickup) {
      const pos = latLonToCanvas(pickup.coordinates[0], pickup.coordinates[1])
      ctx.fillStyle = '#22c55e'
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()

      // Label
      ctx.fillStyle = '#18181b'
      ctx.font = '12px sans-serif'
      ctx.fillText('Pickup', pos.x + 15, pos.y + 5)
    }

    // Draw destination marker
    if (destination) {
      const pos = latLonToCanvas(destination.coordinates[0], destination.coordinates[1])
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.stroke()

      // Label
      ctx.fillStyle = '#18181b'
      ctx.font = '12px sans-serif'
      ctx.fillText('Destination', pos.x + 15, pos.y + 5)
    }
  }, [pickup, destination])

  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">{'Flight Route'}</h2>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-muted">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span>{'Pickup'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span>{'Destination'}</span>
        </div>
      </div>
    </Card>
  )
}
