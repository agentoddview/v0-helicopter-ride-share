'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { BookingMap } from '@/components/booking-map'
import { RouteSelector } from '@/components/route-selector'
import { BookingSummary } from '@/components/booking-summary'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { LiveAvailability } from '@/components/live-availability'
import { PilotSelector } from '@/components/pilot-selector'
import { WeatherConditions } from '@/components/weather-conditions'
import { RecentActivity } from '@/components/recent-activity'
import { BookingWizard } from '@/components/booking-wizard'
import { Loader2 } from 'lucide-react'

export type Location = {
  id: string
  name: string
  coordinates: [number, number]
}

export type Pilot = {
  id: string
  name: string
  rating: number
  totalFlights: number
  yearsExperience: number
  avatar: string
  status: 'available' | 'busy' | 'offline'
}

export type BookingData = {
  pickup: Location | null
  destination: Location | null
  passengers: number
  selectedTier: string
  selectedHelicopter: string | null
  selectedPilot: Pilot | null
  scheduledTime: 'now' | 'scheduled'
  scheduledDate?: Date
  weatherImpact: number
}

export default function BookingPage() {
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signup')
    } else {
      setIsChecking(false)
    }
  }, [isAuthenticated, router])

  const [bookingData, setBookingData] = useState<BookingData>({
    pickup: null,
    destination: null,
    passengers: 1,
    selectedTier: user?.membershipTier || 'premium',
    selectedHelicopter: null,
    selectedPilot: null,
    scheduledTime: 'now',
    weatherImpact: 0,
  })

  const [wizardStep, setWizardStep] = useState(1)
  const [showWizard, setShowWizard] = useState(false)

  const [animatePrice, setAnimatePrice] = useState(false)

  useEffect(() => {
    setAnimatePrice(true)
    const timer = setTimeout(() => setAnimatePrice(false), 500)
    return () => clearTimeout(timer)
  }, [bookingData.passengers, bookingData.selectedTier, bookingData.pickup, bookingData.destination])

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {'Book Your Flight'}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {`Welcome, ${user?.name}! Select your route and customize your helicopter experience.`}
              </p>
            </div>
            <button
              onClick={() => setShowWizard(!showWizard)}
              className="text-sm text-primary hover:underline"
            >
              {showWizard ? 'Show Full View' : 'Use Step-by-Step Wizard'}
            </button>
          </div>

          {showWizard ? (
            <BookingWizard
              bookingData={bookingData}
              setBookingData={setBookingData}
              currentStep={wizardStep}
              setCurrentStep={setWizardStep}
            />
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <LiveAvailability />
                <WeatherConditions setBookingData={setBookingData} />
                <RecentActivity />
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                  <RouteSelector
                    bookingData={bookingData}
                    setBookingData={setBookingData}
                  />
                  <BookingMap
                    pickup={bookingData.pickup}
                    destination={bookingData.destination}
                  />
                  <PilotSelector
                    bookingData={bookingData}
                    setBookingData={setBookingData}
                  />
                </div>
                <div className="lg:col-span-1">
                  <BookingSummary 
                    bookingData={bookingData} 
                    setBookingData={setBookingData}
                    animatePrice={animatePrice}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
