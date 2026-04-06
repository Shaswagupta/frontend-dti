import { Router } from 'express';
import { requireAuth, isOrganizer } from '../middleware/auth';
import { supabase } from '../config/supabase';

const router = Router();

// Secure all routes with auth + organizer middleware
router.use(requireAuth);
router.use(isOrganizer);

// Dashboard stats: count of athletes, events
router.get('/stats', async (req, res) => {
  try {
    const organizerId = req.user.id;
    
    // Count their events
    const { count: eventCount } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })
      .eq('organizer_id', organizerId);

    res.json({
      activeEvents: eventCount || 0,
      totalRegistrations: 0, // In a real app we would join and count registrations
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching stats' });
  }
});

// View their own events
router.get('/events', async (req, res) => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('organizer_id', req.user.id)
    .order('date', { ascending: true });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

// Create event
router.post('/events', async (req, res) => {
  const { title, description, date, capacity } = req.body;
  
  const { data, error } = await supabase
    .from('events')
    .insert([{ 
      title, 
      description, 
      date, 
      capacity, 
      organizer_id: req.user.id 
    }])
    .select();
    
  if (error) return res.status(400).json({ error });
  res.status(201).json(data);
});

export default router;
