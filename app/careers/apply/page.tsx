'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'

export default function ApplyPage() {
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
              <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-primary" />
              <CardTitle className="text-2xl">Application Submitted!</CardTitle>
              <CardDescription>
                Thank you for your interest in joining SkyFleet. Our team will review your application and contact you within 3-5 business days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a href="/careers">Back to Careers</a>
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Pilot Application</h1>
            <p className="text-muted-foreground">Join our team of elite helicopter pilots</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Tell us about yourself and your experience</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Pilot License Number</Label>
                    <Input id="licenseNumber" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightHours">Total Flight Hours</Label>
                    <Input id="flightHours" type="number" min="0" required />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="helicopterHours">Helicopter Hours</Label>
                    <Input id="helicopterHours" type="number" min="0" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalCertificate">Medical Certificate Class</Label>
                    <select id="medicalCertificate" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" required>
                      <option value="">Select...</option>
                      <option value="class1">Class 1</option>
                      <option value="class2">Class 2</option>
                      <option value="class3">Class 3</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <textarea
                    id="experience"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Tell us about your helicopter flying experience, aircraft types, and notable achievements..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume/CV (Upload Link)</Label>
                  <Input id="resume" type="url" placeholder="https://..." />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Application
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
