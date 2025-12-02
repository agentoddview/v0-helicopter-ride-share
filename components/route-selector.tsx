'use client'

import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { BookingData, Location } from '@/app/booking/page'
import { useAuth } from '@/lib/auth-context'

const seattleLocations: Location[] = [
  { id: 'downtown', name: 'Downtown Seattle', coordinates: [47.6062, -122.3321] },
  { id: 'seatac', name: 'SeaTac Airport', coordinates: [47.4502, -122.3088] },
  { id: 'bellevue', name: 'Bellevue', coordinates: [47.6101, -122.2015] },
  { id: 'spaceneedle', name: 'Space Needle', coordinates: [47.6205, -122.3493] },
  { id: 'uw', name: 'University of Washington', coordinates: [47.6553, -122.3035] },
  { id: 'pike', name: 'Pike Place Market', coordinates: [47.6097, -122.3425] },
  { id: 'fremont', name: 'Fremont District', coordinates: [47.6513, -122.3501] },
  { id: 'alki', name: 'Alki Beach', coordinates: [47.5868, -122.4065] },
]

// Premium tier adds nearby cities
const premiumLocations: Location[] = [
  ...seattleLocations,
  { id: 'tacoma', name: 'Tacoma', coordinates: [47.2529, -122.4443] },
  { id: 'everett', name: 'Everett', coordinates: [47.9790, -122.2021] },
  { id: 'renton', name: 'Renton', coordinates: [47.4829, -122.2171] },
]

// Pro tier adds regional destinations
const proLocations: Location[] = [
  ...premiumLocations,
  { id: 'olympia', name: 'Olympia', coordinates: [47.0379, -122.9007] },
  { id: 'bellingham', name: 'Bellingham', coordinates: [48.7519, -122.4787] },
  { id: 'portland', name: 'Portland, OR', coordinates: [45.5152, -122.6784] },
  { id: 'vancouver', name: 'Vancouver, BC', coordinates: [49.2827, -123.1207] },
]

// Enterprise tier adds all West Coast destinations
const enterpriseLocations: Location[] = [
  ...proLocations,
  { id: 'spokane', name: 'Spokane', coordinates: [47.6588, -117.4260] },
  { id: 'boise', name: 'Boise, ID', coordinates: [43.6150, -116.2023] },
  { id: 'sanfrancisco', name: 'San Francisco, CA', coordinates: [37.7749, -122.4194] },
  { id: 'losangeles', name: 'Los Angeles, CA', coordinates: [34.0522, -118.2437] },
  { id: 'phoenix', name: 'Phoenix, AZ', coordinates: [33.4484, -112.0740] },
]

type RouteSelectorProps = {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
}

export function RouteSelector({ bookingData, setBookingData }: RouteSelectorProps) {
  const { user } = useAuth()
  
  const getAvailableLocations = () => {
    if (!user) return seattleLocations
    
    switch (user.tier) {
      case 'Enterprise':
        return enterpriseLocations
      case 'Pro':
        return proLocations
      case 'Premium':
        return premiumLocations
      default:
        return seattleLocations
    }
  }

  const availableLocations = getAvailableLocations()

  const handlePickupChange = (locationId: string) => {
    const location = availableLocations.find((l) => l.id === locationId)
    if (location) {
      setBookingData({ ...bookingData, pickup: location })
    }
  }

  const handleDestinationChange = (locationId: string) => {
    const location = availableLocations.find((l) => l.id === locationId)
    if (location) {
      setBookingData({ ...bookingData, destination: location })
    }
  }

  const swapLocations = () => {
    setBookingData({
      ...bookingData,
      pickup: bookingData.destination,
      destination: bookingData.pickup,
    })
  }

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Select Your Route</h2>
      {user && user.tier !== 'Beginner' && (
        <div className="mb-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary">
            {user.tier} tier: {availableLocations.length} destinations available
          </p>
        </div>
      )}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup">Pickup Location</Label>
          <Select
            value={bookingData.pickup?.id}
            onValueChange={handlePickupChange}
          >
            <SelectTrigger id="pickup">
              <SelectValue placeholder="Choose pickup location" />
            </SelectTrigger>
            <SelectContent>
              {availableLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center">
          <button
            onClick={swapLocations}
            className="rounded-full p-2 hover:bg-muted transition-colors"
            aria-label="Swap locations"
          >
            <svg
              className="h-5 w-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destination">Destination</Label>
          <Select
            value={bookingData.destination?.id}
            onValueChange={handleDestinationChange}
          >
            <SelectTrigger id="destination">
              <SelectValue placeholder="Choose destination" />
            </SelectTrigger>
            <SelectContent>
              {availableLocations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
}
