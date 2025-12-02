'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { Package } from 'lucide-react'

export default function CargoQuotePage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pt-24">
          <Card className="max-w-md text-center">
            <CardHeader>
              <Package className="mx-auto mb-4 h-16 w-16 text-primary" />
              <CardTitle className="text-2xl">Quote Request Submitted!</CardTitle>
              <CardDescription>
                Thank you for your interest in SkyFleet Cargo. Our team will review your requirements and send you a detailed quote within 2-4 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/cargo">Back to Cargo Services</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="px-4 py-24">
        <div className="container mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Request Cargo Quote</h1>
            <p className="text-muted-foreground">Tell us about your cargo delivery needs</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cargo Details</CardTitle>
              <CardDescription>Provide information about your shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name</Label>
                    <Input id="contactName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pickupLocation">Pickup Location</Label>
                    <Input id="pickupLocation" placeholder="Seattle, WA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryLocation">Delivery Location</Label>
                    <Input id="deliveryLocation" placeholder="Portland, OR" required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (lbs)</Label>
                    <Input id="weight" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensions (L×W×H)</Label>
                    <Input id="dimensions" placeholder="24×18×12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Number of Items</Label>
                    <Input id="quantity" type="number" min="1" defaultValue="1" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargoType">Cargo Type</Label>
                  <select id="cargoType" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                    <option value="">Select type...</option>
                    <option value="general">General Cargo</option>
                    <option value="medical">Medical Supplies</option>
                    <option value="documents">Documents</option>
                    <option value="equipment">Equipment</option>
                    <option value="perishable">Perishable Goods</option>
                    <option value="fragile">Fragile Items</option>
                    <option value="hazmat">Hazardous Materials</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Delivery Urgency</Label>
                  <select id="urgency" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                    <option value="">Select urgency...</option>
                    <option value="immediate">Immediate (ASAP)</option>
                    <option value="sameday">Same Day</option>
                    <option value="nextday">Next Day</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <textarea
                    id="specialRequirements"
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Temperature control, handling instructions, insurance requirements, etc."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Request Quote
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
