'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RouteSelector } from '@/components/route-selector'
import { PilotSelector } from '@/components/pilot-selector'
import { BookingMap } from '@/components/booking-map'
import type { BookingData } from '@/app/booking/page'
import Link from 'next/link'

type BookingWizardProps = {
  bookingData: BookingData
  setBookingData: (data: BookingData) => void
  currentStep: number
  setCurrentStep: (step: number) => void
}

export function BookingWizard({
  bookingData,
  setBookingData,
  currentStep,
  setCurrentStep,
}: BookingWizardProps) {
  const steps = [
    { number: 1, title: 'Select Route', description: 'Choose pickup and destination' },
    { number: 2, title: 'Choose Pilot', description: 'Select your experienced pilot' },
    { number: 3, title: 'Confirm Details', description: 'Review and continue' },
  ]

  const canProceed = () => {
    if (currentStep === 1) return bookingData.pickup && bookingData.destination
    if (currentStep === 2) return bookingData.selectedPilot
    return true
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step.number
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.number}
                </div>
                <p className={`mt-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 flex-1 mx-4 rounded transition-all ${
                  currentStep > step.number ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <Card className="p-6">
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{'Where are you going?'}</h2>
              <p className="text-muted-foreground mt-1">
                {'Select your pickup location and destination in Seattle'}
              </p>
            </div>
            <RouteSelector bookingData={bookingData} setBookingData={setBookingData} />
            {bookingData.pickup && bookingData.destination && (
              <BookingMap
                pickup={bookingData.pickup}
                destination={bookingData.destination}
              />
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{'Choose Your Pilot'}</h2>
              <p className="text-muted-foreground mt-1">
                {'All pilots are certified with thousands of flight hours'}
              </p>
            </div>
            <PilotSelector bookingData={bookingData} setBookingData={setBookingData} />
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">{'Review Your Booking'}</h2>
              <p className="text-muted-foreground mt-1">
                {'Check your details before selecting your helicopter'}
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Route</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">From:</span>
                    <span className="font-medium">{bookingData.pickup?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">To:</span>
                    <span className="font-medium">{bookingData.destination?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Passengers:</span>
                    <span className="font-medium">{bookingData.passengers}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Pilot</h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                    {bookingData.selectedPilot?.avatar}
                  </div>
                  <div>
                    <p className="font-medium">{bookingData.selectedPilot?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {bookingData.selectedPilot?.rating} ★ • {bookingData.selectedPilot?.totalFlights.toLocaleString()} flights
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold mb-3">Subscription</h3>
                <p className="text-sm">
                  <span className="font-medium capitalize">{bookingData.selectedTier}</span> tier
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            {'Previous'}
          </Button>
          
          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
            >
              {'Next Step'}
            </Button>
          ) : (
            <Button asChild>
              <Link href="/booking/fleet">{'Choose Helicopter'}</Link>
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
