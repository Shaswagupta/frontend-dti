import { Event, Achievement, Match } from './types';

export const EVENTS: Event[] = [
  {
    id: '1',
    title: 'Elite Street 3x3 Series',
    sport: 'Basketball',
    category: 'Power',
    date: 'AUG 24',
    time: '09:00 AM',
    location: 'The Cage, Brooklyn NYC',
    entryFee: '$45 Entry',
    image: '/images/realistic_basketball_1775459751255.png',
    status: 'upcoming',
    description: 'The premier 3x3 basketball tournament in the city. High intensity, high stakes.',
    organizer: 'City Sports League',
    prizePool: '$5,000'
  },
  {
    id: '2',
    title: 'Midnight League Open',
    sport: 'Soccer',
    category: 'Agility',
    date: 'AUG 28',
    time: '10:00 PM',
    location: 'Riverside Field, London',
    entryFee: 'Free',
    image: '/images/realistic_soccer_1775459770385.png',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Clay Court Masterclass',
    sport: 'Tennis',
    category: 'Precision',
    date: 'SEPT 02',
    time: '08:00 AM',
    location: 'Grand Alpine Resort, Zurich',
    entryFee: '$120 Entry',
    image: '/images/realistic_tennis_1775459786989.png',
    status: 'upcoming'
  },
  {
    id: '4',
    title: 'Pacific Barrel Fest',
    sport: 'Aquatics',
    category: 'Endurance',
    date: 'SEPT 15',
    time: '06:00 AM',
    location: 'Pipeline, Oahu Hawaii',
    entryFee: '$200 entry',
    image: '/images/realistic_aquatics_1775459805638.png',
    status: 'live',
    prizePool: '$250,000'
  },
  {
    id: '5',
    title: 'Urban Sprint 10K',
    sport: 'Agility',
    category: 'Speed',
    date: 'AUG 30',
    time: '07:30 AM',
    location: 'Downtown Loop, Tokyo',
    entryFee: '$25 entry',
    image: '/images/realistic_sprint_1775459823168.png',
    status: 'upcoming',
    registrations: '142 / 150'
  },
  {
    id: '6',
    title: 'Concrete Jungle Jam',
    sport: 'Agility',
    category: 'Tech',
    date: 'SEPT 12',
    time: '01:00 PM',
    location: 'Southbank, London',
    entryFee: 'Free',
    image: '/images/realistic_agility_1775459843081.png',
    status: 'upcoming'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'Neon Pioneer', description: 'First to join a tournament', icon: 'auto_awesome', color: 'primary' },
  { id: '2', title: '7 Day Streak', description: 'Active for 7 consecutive days', icon: 'local_fire_department', color: 'secondary' },
  { id: '3', title: 'Top Contributor', description: 'Helped organize an event', icon: 'star', color: 'tertiary' },
  { id: '4', title: 'Event Maven', description: 'Participated in 10+ events', icon: 'emoji_events', color: 'neutral-600' },
  { id: '5', title: 'Club Leader', description: 'Led a sports club', icon: 'diversity_3', color: 'neutral-600' },
  { id: '6', title: 'Locked', description: 'Keep playing to unlock', icon: 'lock', color: 'neutral-800', locked: true },
];

export const MATCHES: Match[] = [
  { id: '1', event: 'Sunset Open Prelims', result: 'Win', score: '18.50', points: '+120', date: 'Sep 22' },
  { id: '2', event: 'Urban Sprints Cup', result: 'Rank 2', score: '10.42s', points: '+85', date: 'Sep 15' },
  { id: '3', event: 'City Half-Pipe Final', result: 'Rank 4', score: '82.10', points: '+40', date: 'Aug 30' },
];
