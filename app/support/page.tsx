'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Phone, MessageSquare, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              How Can We Help?
            </h1>
            <p className="text-lg text-muted-foreground">
              Our support team is here to assist you 24/7
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Methods */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <Mail className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Email Support</CardTitle>
                  <CardDescription>Get a response within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:support@skyfleet.com"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    support@skyfleet.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Phone Support</CardTitle>
                  <CardDescription>Speak with our team directly</CardDescription>
                </CardHeader>
                <CardContent>
                  <a
                    href="tel:+12065551234"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    +1 (206) 555-1234
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MessageSquare className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Live Chat</CardTitle>
                  <CardDescription>Available Mon-Fri, 8am-8pm PST</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday:</span>
                    <span className="font-medium">8am - 8pm PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday - Sunday:</span>
                    <span className="font-medium">9am - 6pm PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Emergency Line:</span>
                    <span className="font-medium">24/7</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="mb-2 h-8 w-8 text-primary" />
                  <CardTitle>Office Location</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="leading-relaxed text-muted-foreground">
                    SkyFleet Headquarters<br />
                    1234 Aviation Way<br />
                    Seattle, WA 98101
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col items-center justify-center p-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
                    <p className="mb-6 text-muted-foreground">
                      Thank you for contacting us. Our support team will get back to you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)}>Send Another Message</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        >
                          <option value="">Select a category...</option>
                          <option value="booking">Booking Issue</option>
                          <option value="payment">Payment & Billing</option>
                          <option value="technical">Technical Support</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <textarea
                          id="message"
                          className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Please describe your issue or question in detail..."
                          required
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <Card className="mt-8 border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="text-destructive">Emergency Contact</CardTitle>
              <CardDescription>
                If you are experiencing an in-flight emergency or immediate safety concern
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm">
                  Call our 24/7 emergency hotline immediately
                </p>
                <Button variant="destructive" size="lg">
                  <Phone className="mr-2 h-4 w-4" />
                  Emergency: 911
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
