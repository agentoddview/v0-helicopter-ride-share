'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SettingsPage() {
  const { user, setUser } = useAuth()
  const router = useRouter()
  
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)

  if (!user) {
    router.push('/signin')
    return null
  }

  const handleSave = () => {
    if (user) {
      setUser({ ...user, name, email })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const handleChangePlan = () => {
    router.push('/#pricing')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <div className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Account Settings
            </h1>
            <p className="mt-2 text-muted-foreground">
              Manage your account information and preferences
            </p>
          </div>

          <div className="grid gap-6 max-w-3xl">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (206) 555-0123"
                  />
                </div>
                
                <Button onClick={handleSave} className="w-full sm:w-auto">
                  {saved ? 'Saved!' : 'Save Changes'}
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Subscription</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <div className="font-semibold">{user.tier} Plan</div>
                    <div className="text-sm text-muted-foreground">
                      {user.tier === 'Beginner' && '$20/month • Up to 10 miles'}
                      {user.tier === 'Premium' && '$40/month • Up to 25 miles'}
                      {user.tier === 'Pro' && '$200/month • Up to 50 miles'}
                      {user.tier === 'Enterprise' && 'Custom pricing • Up to 250 miles'}
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleChangePlan}>
                    Change Plan
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Billing Cycle</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="annual">Annual (Save 20%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6">Notifications</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Flight Updates</div>
                    <div className="text-sm text-muted-foreground">
                      Get notified about flight status changes
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      notifications ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        notifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Promotional Emails</div>
                    <div className="text-sm text-muted-foreground">
                      Receive special offers and updates
                    </div>
                  </div>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                  </button>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-destructive/50">
              <h2 className="text-xl font-semibold mb-6 text-destructive">Danger Zone</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Cancel Subscription</div>
                    <div className="text-sm text-muted-foreground">
                      Your subscription will be canceled at the end of the billing period
                    </div>
                  </div>
                  <Button variant="outline">Cancel</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-muted-foreground">
                      Permanently delete your account and all associated data
                    </div>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
