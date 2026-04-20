export type Screen = 'home' | 'explore' | 'events' | 'stats' | 'profile' | 'director' | 'event-details' | 'event-wizard' | 'manage-event' | 'practice' | 'jobs' | 'network' | 'certificates';

export interface Event {
  id: string;
  title: string;
  sport: string;
  category: string;
  date: string;
  time: string;
  location: string;
  entryFee: string;
  image: string;
  status?: 'live' | 'upcoming' | 'finished';
  description?: string;
  organizer?: string;
  prizePool?: string;
  registrations?: string;
  winner?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  locked?: boolean;
}

export interface Match {
  id: string;
  event: string;
  result: string;
  score: string;
  points: string;
  date: string;
}
