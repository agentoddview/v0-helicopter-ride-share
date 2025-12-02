'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { CheckCircle2, Loader2 } from 'lucide-react'

const TIERS = [
  {
    id: 'beginner',
    name: 'Beginner',
    price: 20,
    features: [
      '$5 per minute flight time',
      '10 mile distance limit',
      '+$150 per extra guest',
      'Standard helicopters',
      'Basic support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 40,
    features: [
      '$3 per minute flight time',
      '25 mile distance limit',
      '+$100 per extra guest',
      'Premium helicopters',
      'Priority support',
      'Weather alerts'
    ],
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 200,
    features: [
      '$2.5 per minute flight time',
      '50 mile distance limit',
      '+$75 per extra guest',
      'Luxury helicopters',
      '24/7 VIP support',
      'Dedicated pilot',
      'Flexible scheduling'
    ]
  }
]

export default function SignUpPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedTier, setSelectedTier] = useState<string>('premium')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    try {
      await signUp(formData.name, formData.email, formData.password, selectedTier)
      router.push('/booking')
    } catch (error) {
      setErrors({ submit: 'Sign up failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="border-b border-border">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <svg className="h-5 w-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
            <span className="text-xl font-semibold">SkyFleet</span>
          </Link>
          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Progress Indicator */}
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <span className="text-sm font-medium">Account Details</span>
            </div>
            <div className={`h-0.5 w-16 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className="flex items-center gap-2">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
              <span className="text-sm font-medium">Choose Membership</span>
            </div>
          </div>

          {step === 1 && (
            <Card className="mx-auto max-w-md p-8">
              <h1 className="mb-2 text-3xl font-bold">Create Your Account</h1>
              <p className="mb-6 text-muted-foreground">Start flying with SkyFleet today</p>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name</label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>

                <Button onClick={handleNextStep} className="w-full" size="lg">
                  Continue to Membership
                </Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <div>
              <div className="mb-8 text-center">
                <h1 className="mb-2 text-3xl font-bold">Choose Your Membership</h1>
                <p className="text-muted-foreground">Select the plan that best fits your flying needs</p>
              </div>

              <div className="mb-8 grid gap-6 md:grid-cols-3">
                {TIERS.map((tier) => (
                  <Card
                    key={tier.id}
                    className={`relative cursor-pointer p-6 transition-all hover:border-primary ${
                      selectedTier === tier.id ? 'border-2 border-primary' : ''
                    }`}
                    onClick={() => setSelectedTier(tier.id)}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Most Popular
                      </div>
                    )}
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold">{tier.name}</h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-4xl font-bold">${tier.price}</span>
                        <span className="text-muted-foreground">/month</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {selectedTier === tier.id && (
                      <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-primary">
                        <CheckCircle2 className="h-4 w-4" />
                        Selected
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="mx-auto flex max-w-md gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="w-full" size="lg">
                  Back
                </Button>
                <Button onClick={handleSignUp} disabled={loading} className="w-full" size="lg">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Complete Sign Up'
                  )}
                </Button>
              </div>

              {errors.submit && (
                <p className="mt-4 text-center text-sm text-red-500">{errors.submit}</p>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
