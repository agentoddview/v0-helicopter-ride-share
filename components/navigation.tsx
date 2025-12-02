'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { User, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const { user, signOut, isAuthenticated } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg
              className="h-5 w-5 text-primary-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3l14 9-14 9V3z"
              />
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight">SkyFleet</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="/#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/calculator" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Calculator
          </Link>
          <Link href="/careers" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Careers
          </Link>
          <Link href="/cargo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Cargo
          </Link>
          <Link href="/live-map" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Live Map
          </Link>
          <Link href="/support" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Support
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  {user?.name}
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </>
          )}
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 px-4 py-4">
            <Link href="/#features" className="text-sm font-medium">Features</Link>
            <Link href="/#pricing" className="text-sm font-medium">Pricing</Link>
            <Link href="/calculator" className="text-sm font-medium">Calculator</Link>
            <Link href="/careers" className="text-sm font-medium">Careers</Link>
            <Link href="/cargo" className="text-sm font-medium">Cargo</Link>
            <Link href="/live-map" className="text-sm font-medium">Live Map</Link>
            <Link href="/support" className="text-sm font-medium">Support</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
