'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

type User = {
  id: string
  name: string
  email: string
  membershipTier: 'beginner' | 'premium' | 'pro' | 'enterprise'
  joinedDate: string
}

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string, tier: string) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('skyfleet_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }
  }, [])

  const signUp = async (name: string, email: string, password: string, tier: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      membershipTier: tier as User['membershipTier'],
      joinedDate: new Date().toISOString()
    }
    
    localStorage.setItem('skyfleet_user', JSON.stringify(newUser))
    setUser(newUser)
    setIsAuthenticated(true)
  }

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // For demo purposes, create a user
    const existingUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Demo User',
      email,
      membershipTier: 'premium',
      joinedDate: new Date().toISOString()
    }
    
    localStorage.setItem('skyfleet_user', JSON.stringify(existingUser))
    setUser(existingUser)
    setIsAuthenticated(true)
  }

  const signOut = () => {
    localStorage.removeItem('skyfleet_user')
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
