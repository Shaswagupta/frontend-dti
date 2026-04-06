import { Router } from 'express';
import { requireAuth, isStudent } from '../middleware/auth';
import { supabase } from '../config/supabase';

const router = Router();

// Basic feed doesn't necessarily need auth, but registration does
router.get('/feed', async (req, res) => {
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      profiles:organizer_id (full_name)
    `)
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error });
  res.json(data);
});

router.post('/register/:eventId', requireAuth, isStudent, async (req, res) => {
  const { eventId } = req.params;
  const studentId = req.user.id;

  // Insert into registrations table (Unique constraint handles double bookings)
  const { data, error } = await supabase
    .from('registrations')
    .insert([{ student_id: studentId, event_id: eventId }])
    .select();

  if (error) {
    if (error.code === '23505') {
       return res.status(409).json({ error: 'You are already registered for this event.' });
    }
    return res.status(400).json({ error });
  }

  res.status(201).json(data);
});

export default router;
