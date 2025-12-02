import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Star, Award, Clock, MapPin, Shield, Plane } from 'lucide-react'

// Mock pilot data
const pilots = {
  '1': {
    id: '1',
    name: 'Captain Sarah Mitchell',
    rating: 4.9,
    totalFlights: 1247,
    totalHours: 3450,
    yearsExperience: 12,
    certifications: ['FAA Commercial', 'Instrument Rating', 'Night Flying', 'Mountain Operations'],
    specialties: ['Urban Navigation', 'Weather Operations', 'VIP Transport'],
    location: 'Seattle, WA',
    bio: 'Captain Mitchell brings over 12 years of helicopter aviation experience to SkyFleet. Specializing in urban navigation and VIP transport, she has logged over 3,450 flight hours across various aircraft types. Known for her exceptional safety record and customer service.',
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Excellent pilot! Very smooth flight and professional.', date: '2025-01-15' },
      { user: 'Maria S.', rating: 5, comment: 'Captain Mitchell made me feel safe and comfortable throughout the entire journey.', date: '2025-01-10' },
      { user: 'Robert K.', rating: 5, comment: 'Outstanding experience. Highly recommend!', date: '2025-01-05' },
      { user: 'Lisa M.', rating: 4, comment: 'Great flight, arrived on time. Very knowledgeable about the area.', date: '2024-12-28' }
    ]
  },
  '2': {
    id: '2',
    name: 'Captain James Rodriguez',
    rating: 4.8,
    totalFlights: 892,
    totalHours: 2680,
    yearsExperience: 9,
    certifications: ['FAA Commercial', 'Instrument Rating', 'Night Flying'],
    specialties: ['Scenic Tours', 'Corporate Transport', 'Emergency Medical'],
    location: 'Seattle, WA',
    bio: 'Captain Rodriguez is a seasoned helicopter pilot with extensive experience in corporate transport and scenic tours. His attention to detail and friendly demeanor make every flight memorable.',
    reviews: [
      { user: 'Tom B.', rating: 5, comment: 'Amazing scenic tour! James knew all the best spots.', date: '2025-01-12' },
      { user: 'Emily W.', rating: 5, comment: 'Professional and courteous. Will request him again!', date: '2025-01-08' },
      { user: 'David L.', rating: 4, comment: 'Smooth flight, great communication.', date: '2024-12-30' }
    ]
  },
  'sarah-chen': {
    id: 'sarah-chen',
    name: 'Captain Sarah Chen',
    rating: 4.95,
    totalFlights: 1520,
    totalHours: 4200,
    yearsExperience: 15,
    certifications: ['FAA Commercial', 'Instrument Rating', 'Night Flying', 'Mountain Operations', 'Emergency Medical'],
    specialties: ['Urban Navigation', 'VIP Transport', 'Corporate Events', 'Medical Transport'],
    location: 'Seattle, WA',
    bio: 'Captain Chen is one of our most experienced pilots with over 15 years in helicopter aviation. She specializes in high-pressure VIP transport and medical operations, maintaining an exceptional safety record throughout her career. Known for her calm demeanor and exceptional situational awareness.',
    reviews: [
      { user: 'Michael R.', rating: 5, comment: 'Captain Chen handled a difficult weather situation with incredible professionalism. Felt completely safe.', date: '2025-01-18' },
      { user: 'Jennifer L.', rating: 5, comment: 'The best pilot I have ever flown with. Smooth, professional, and very knowledgeable.', date: '2025-01-14' },
      { user: 'David K.', rating: 5, comment: 'Outstanding experience from start to finish. Highly recommend Captain Chen!', date: '2025-01-09' },
      { user: 'Sarah M.', rating: 5, comment: 'Perfect flight for our corporate event. Everyone was impressed.', date: '2025-01-03' },
      { user: 'Robert T.', rating: 4, comment: 'Great flight, very professional pilot.', date: '2024-12-29' }
    ]
  }
}

export default async function PilotProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pilot = pilots[id as keyof typeof pilots] || pilots['sarah-chen']

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="px-4 py-24">
        <div className="container mx-auto max-w-5xl">
          {/* Pilot Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                    {pilot.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">{pilot.name}</h1>
                    <Badge variant="secondary">
                      <Shield className="mr-1 h-3 w-3" />
                      Verified Pilot
                    </Badge>
                  </div>
                  
                  <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {pilot.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {pilot.yearsExperience} years experience
                    </span>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(pilot.rating)
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold">{pilot.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({pilot.reviews.length} reviews)
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pilot.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Flights</CardTitle>
                <Plane className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pilot.totalFlights.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Flight Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pilot.totalHours.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Experience</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pilot.yearsExperience} years</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pilot.certifications.map((cert, index) => (
                    <Badge key={index} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card>
              <CardHeader>
                <CardTitle>Specialties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pilot.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Passenger Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {pilot.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-6 last:border-b-0 last:pb-0">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold">{review.user}</span>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="mb-2 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
