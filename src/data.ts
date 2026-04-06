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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-p3JAtexkjh8hVzmqvCs-lziGMRrrdDca87TxUxpBTRy-UVRSNP_XI-BXK_6LTs1Ibxb1qy2uPLkRUomRdeRVbSPDmdiSZFp7j36j4IXnzhCrKLeIC-9btT57V2LwDyEEK_77Q0Dqamsbi5FSPF3hXBf7GiTcEn5u_gQ7r1ULsuVbtto-AW7dVm5ZuKtnVy-Fr2wrLRkGARUsXM61LVwMZQ-_OoYW-OnLU5N_MCwtzqAZJBvz-qBZbI6RBbO_lEpC9ulBftQCrODF',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJqKitsNIl1uPJfCZrLkfs8WunupdU4fXkDFMRYX3BVNpHU15cfMPx2eUBy-9QP85yj5zhHWmo_0GytYunkpnbDvYdYv_zkBybOiaIlnnIhqUdpqSoK581TBWzoSBs7Q0mAmHiv7Db-oYJSHV4DjNXI2plxG3ukEC6VnjvK7hmy7edusyfpjIsJdbQEum-yZCRcx6b-jNcaVUQ2dvTvyj-3iJhbKeBx3m8cOZZ903qFG0merMYu0Sep4apuGgPWY2c3zK0IiLFRm_k',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8kJv0DJ64423cFZPj4I224eytRuWr0OfVwzvt30NaYGCP4bwh5mOciqoBWZoR6XzPsVO07W64hlCU3rJs8fiDnSj8D9OE64grzA7Bxrb5pikPz_nG_ieMJdHQPRnjKMEDONDS2afjr6lcwyXWTT_W-3bQRPoxYT_4m_t9rwdck0CYjVfsAxtePARu5jPmJCkX_pGsHkP9E1uQppBuXBTfcK0UaYXBrmXcb1-EetARBiWMj2WXtNbMGhQW47PLKJ9QzKrCxsXW6YC_',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABM-zUSHDjqmElyxNnnxl5vMYXP7U9Fw-jxy3rigp4Tembz7Tumq8CVjFR03tUtg2EO71B64wjNVbPiJAt9vP3gEdTBfv9G81SDcSNRmg72K-25xxRPrHldL61zP8dgpu74Wnaemaa0XSl--9mrA83Qb0tHWS6oPNQZCzx_0_CBgXhKsF1akCWMoH8eiJOlOZGrTQ7MS67xQLcf5Q6IO39a---4ldgPHmvw1rqFsge1OQW0-PfQTcyfLjc0_B7gbDpMc_9byXeID5u',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDn0vVGaOqd0F5ax1qGWIbb50SiACGUlvInJMI0BmjLF2tJnvWKlEbClOfPnddAuvDT8PI4i89cDdoewReTMixvstwgciQtTpW9x3cnSFia8avsSFDBoZU7MZwfHMpXkfbise4Qkc7e4H-wdZigNn2tesj2D45yoMUwVMpCsU5HTPD7qdMA9WoiqWqockSLCbxDgil_iaVnf_c1cid0UwDChwDZDvOYkzkf7ByLRGnpGzOteuxBrG8m3Db8fhOqNAYTyvjPNOnhpLvF',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrfg1n1ufUPACAFl6sSrWbcmRvnsKX78DFFSYH06IHzW2Rwcj426ZTcqC7E7orTQXOnqZ8NbynTILJsvN79ykppP3DCKipAYxY5ievP0_2tzXWsVUXYBHnQnqZyTpUQ0tSu33FW7uM6bMbbSl_EW8Np4SI21buOfoGcFnskscg7jTxB3bi-FuIN1kmZcTIELPkEB31ZVm5b3n3sNnia1pLZCjeIInqmDEkuPPAsjyQsWNlkycJcygGwH3N_6CdtIFZ-F4v78NRyuvt',
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
